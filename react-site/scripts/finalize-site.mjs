import { createHash } from 'node:crypto'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { sitemapXml, feedXml } from './site-metadata.mjs'
import { siteUrl } from '../site.config.mjs'
import { buildId } from '../build-version.server.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const catalog = JSON.parse(readFileSync(join(root, '.generated/catalog.json'), 'utf8'))
const notes = Object.values(JSON.parse(readFileSync(join(root, '.generated/notes.json'), 'utf8')))
writeFileSync(join(dist, 'sitemap.xml'), sitemapXml(notes))
writeFileSync(join(dist, 'index.xml'), feedXml(notes, catalog.brand))
// On a project path this is advisory only: robots.txt is authoritative at the
// origin root. sitemap.xml can still be submitted directly to Search Console.
writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}sitemap.xml\n`)
const assets = readdirSync(join(dist, 'assets'), { recursive: true }).filter(path => !path.endsWith('/')).flatMap(path => {
  try {
    const bytes = readFileSync(join(dist, 'assets', path))
    return [{ path: 'assets/' + path, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') }]
  } catch (error) { if (error.code === 'EISDIR') return []; throw error }
})
writeFileSync(join(dist, '_deployment.json'), JSON.stringify({ schemaVersion: 1, buildId, releases: [{ id: buildId, assets }] }) + '\n')
console.log(`Release ${buildId}: sitemap ${notes.length + 1} URLs; immutable assets ${assets.length}.`)
