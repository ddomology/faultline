import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { gzipSync } from 'node:zlib'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import assert from 'node:assert/strict'
import { basePath, siteOrigin } from '../site.config.mjs'
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..')
const dist=join(root,'dist')
const manifest=JSON.parse(readFileSync(join(root,'.generated/manifest.json'),'utf8'))
const checked=new Set()
for (const route of ['/', '/404.html', ...manifest.routes]) {
  const path=route==='/'?'index.html':decodeURIComponent(route.slice(1))
  const file=join(dist,path)
  assert.ok(existsSync(file) && statSync(file).isFile(), `Missing exact HTML file: ${route}`)
  const html=readFileSync(file,'utf8')
  assert.match(html,/<title>[^<]*Faultline/)
  assert.ok(!html.includes('postscript.js') && !html.includes('notebookSetRoute'), 'Legacy navigation leaked into React')
  if (route.startsWith('/labs/')) {
    assert.match(html,/<article\b/)
    const alias=join(dist,decodeURIComponent(route.slice(1,-5)),'index.html')
    assert.ok(existsSync(alias),`Missing extensionless alias: ${route}`)
    assert.ok(statSync(alias).size < 2000, `Alias repeated a full article: ${route}`)
    assert.ok(existsSync(join(dist,path+'.data')),`Missing route data: ${route}`)
  }
  const current=new URL(basePath+route.slice(1),siteOrigin)
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url=new URL(match[1].replaceAll('&amp;','&'),current)
    if(url.origin!==siteOrigin || !url.pathname.startsWith(basePath))continue
    const relative=decodeURIComponent(url.pathname.slice(basePath.length))
    if(checked.has(relative))continue
    let target=join(dist,relative)
    if(existsSync(target)&&statSync(target).isDirectory())target=join(target,'index.html')
    assert.ok(existsSync(target),`Missing local reference ${match[1]} from ${route}`)
    checked.add(relative)
  }
}
for (const [path,hash] of Object.entries(manifest.sourceHashes)) {
  const { createHash }=await import('node:crypto')
  assert.equal(createHash('sha256').update(readFileSync(join(root,'../content',path))).digest('hex'),hash,`Source changed: ${path}`)
}
console.log(`Static check: ${manifest.routes.length} canonical articles + home/404, ${manifest.routes.length} extensionless aliases, ${checked.size} local references; original Markdown unchanged. Base ${basePath}`)
function bytesIn(directory) {
  return readdirSync(directory, { withFileTypes: true }).reduce((sum, entry) => sum + (entry.isDirectory() ? bytesIn(join(directory, entry.name)) : statSync(join(directory, entry.name)).size), 0)
}
const totalBytes = bytesIn(dist)
const sample = readFileSync(join(dist, 'labs/sql-injection/lab-retrieve-hidden-data.html'))
const home = readFileSync(join(dist, 'index.html'), 'utf8')
assert.equal([...home.matchAll(/class="note-row"/g)].length, Math.min(24, manifest.counts.notes), 'Prerendered home must contain the initial page, not an older full-catalog build')
// A shared catalog must not appear in each route payload. Avoid a total-byte
// cap: future authored screenshots and articles can legitimately grow.
const sampleData = readFileSync(join(dist, 'labs/sql-injection/lab-retrieve-hidden-data.html.data'), 'utf8')
assert.ok(!sampleData.includes('"searchText"'), 'Shared search metadata leaked into a route payload')
console.log(`Static size: ${totalBytes} bytes; representative HTML ${sample.length} bytes (${gzipSync(sample).length} gzip).`)
