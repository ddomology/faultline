import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { buildId } from '../build-version.server.mjs'
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
  assert.ok(html.includes(`name="faultline-build" content="${buildId}"`), `Mixed HTML release: ${route}`)
  if (route === '/404.html') {
    assert.match(html, /name="robots" content="noindex"/)
    assert.ok(!html.includes('window.__reactRouterContext'), 'Static 404 must not hydrate against an unknown URL')
  } else {
    const canonical = siteOrigin + basePath + route.slice(1)
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `Missing canonical: ${route}`)
    assert.ok(html.includes(`property="og:url" content="${canonical}"`), `Missing sharing URL: ${route}`)
    assert.match(html, /name="description" content="[^"]+"/)
    assert.match(html, /type="application\/ld\+json"/)
  }
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
const dataFiles = readdirSync(dist, { recursive: true }).filter(path => path.endsWith('.data'))
assert.equal(dataFiles.length, manifest.routes.length + 2, 'Old route data survived the static export')
const sample = readFileSync(join(dist, 'labs/sql-injection/lab-retrieve-hidden-data.html'))
const home = readFileSync(join(dist, 'index.html'), 'utf8')
assert.equal([...home.matchAll(/class="note-row"/g)].length, Math.min(24, manifest.counts.notes), 'Prerendered home must contain the initial page, not an older full-catalog build')
// A shared catalog must not appear in each route payload. Avoid a total-byte
// cap: future authored screenshots and articles can legitimately grow.
const sampleData = readFileSync(join(dist, 'labs/sql-injection/lab-retrieve-hidden-data.html.data'), 'utf8')
assert.ok(!sampleData.includes('"searchText"'), 'Shared search metadata leaked into a route payload')
console.log(`Static size: ${totalBytes} bytes; representative HTML ${sample.length} bytes (${gzipSync(sample).length} gzip).`)

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
assert.equal([...sitemap.matchAll(/<loc>/g)].length, manifest.routes.length + 1)
for (const route of ['/', ...manifest.routes]) assert.ok(sitemap.includes(`<loc>${siteOrigin + basePath + route.slice(1)}</loc>`))
for (const redirect of manifest.legacyRedirects) {
  const html = readFileSync(join(dist, redirect.path), 'utf8')
  assert.match(html, /name="robots" content="noindex"/)
  assert.match(html, /location.replace/)
}
const release = JSON.parse(readFileSync(join(dist, '_deployment.json'), 'utf8'))
assert.equal(release.buildId, buildId)
assert.equal(release.releases[0].id, buildId)
assert.ok(release.releases.length >= 1 && release.releases.length <= 3)
for (const item of release.releases.flatMap(release => release.assets)) {
  const bytes = readFileSync(join(dist, item.path))
  assert.equal(bytes.length, item.bytes)
  assert.equal(createHash('sha256').update(bytes).digest('hex'), item.sha256)
}
assert.equal(Object.hasOwn(release, 'legacy'), false, 'Obsolete deployment adapter metadata survived')
assert.ok(!readdirSync(dist).some(path => /^(index(?:\.[a-f0-9]+)?\.css|(?:pre|post)script(?:\.[a-f0-9]+)?\.js)$/.test(path)), 'Obsolete deployment assets survived')
console.log(`SEO and release check: ${manifest.legacyRedirects.length} legacy redirects; ${release.releases.length} retained release(s).`)
