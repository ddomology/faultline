import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { siteUrl } from '../site.config.mjs'

const sha = bytes => createHash('sha256').update(bytes).digest('hex')
const validId = value => typeof value === 'string' && /^[a-zA-Z0-9-]{1,64}$/.test(value)
const assetPath = value => typeof value === 'string' && /^assets\/[\w./-]+$/.test(value) && value.split('/').every(part => part && part !== '.' && part !== '..')

export async function retainAssets({ directory, fromUrl = siteUrl, fetcher = fetch } = {}) {
  const root = resolve(directory || fileURLToPath(new URL('../dist', import.meta.url)))
  const current = JSON.parse(readFileSync(join(root, '_deployment.json'), 'utf8'))
  if (!validId(current.buildId) || current.releases.length !== 1) throw new Error('Start from a fresh static export')
  const source = new URL(fromUrl)
  if (!['http:', 'https:'].includes(source.protocol) || source.username || source.password || !source.pathname.endsWith('/')) throw new Error('Invalid previous site URL')
  const get = async path => {
    const url = new URL(path, source)
    if (url.origin !== source.origin || !url.pathname.startsWith(source.pathname)) throw new Error('Asset escaped previous site')
    url.searchParams.set('_retain', current.buildId)
    let last
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetcher(url, { redirect: 'error', signal: AbortSignal.timeout(15000), cache: 'no-store' })
        if (response.status >= 500) throw new Error(`HTTP ${response.status}: ${path}`)
        if (response.status === 404) return null
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`)
        const bytes = Buffer.from(await response.arrayBuffer())
        if (bytes.length > 20 * 1024 * 1024) throw new Error('Previous asset exceeds 20 MiB')
        return bytes
      } catch (error) { last = error; if (attempt < 2) await new Promise(resolve => setTimeout(resolve, 300 * (attempt + 1))) }
    }
    throw last
  }
  const write = (path, bytes) => { mkdirSync(dirname(join(root, path)), { recursive: true }); writeFileSync(join(root, path), bytes) }
  const validate = item => {
    if (!item || !/^[a-f0-9]{64}$/.test(item.sha256) || !Number.isSafeInteger(item.bytes) || item.bytes < 0 || item.bytes > 20 * 1024 * 1024) throw new Error('Invalid previous asset descriptor')
  }
  const copy = async item => {
    validate(item)
    const bytes = existsSync(join(root, item.path)) ? readFileSync(join(root, item.path)) : await get(item.path)
    if (!bytes || bytes.length !== item.bytes || sha(bytes) !== item.sha256) throw new Error(`Previous asset missing or changed: ${item.path}`)
    write(item.path, bytes)
  }
  const previousBytes = await get('_deployment.json')
  let retained = 0
  if (previousBytes) {
    const previous = JSON.parse(previousBytes.toString('utf8'))
    if (previous.schemaVersion !== 1 || !Array.isArray(previous.releases) || previous.releases.length > 3) throw new Error('Invalid previous deployment manifest')
    const releases = previous.releases.filter(release => release.id !== current.buildId).slice(0, 2)
    const assets = new Map()
    for (const release of releases) {
      if (!validId(release.id) || !Array.isArray(release.assets) || release.assets.length > 1000) throw new Error('Invalid retained release')
      for (const item of release.assets) {
        if (!assetPath(item.path)) throw new Error('Invalid retained asset path')
        validate(item)
        if (assets.has(item.path) && assets.get(item.path).sha256 !== item.sha256) throw new Error('Conflicting immutable asset')
        assets.set(item.path, item)
      }
    }
    if ([...assets.values()].reduce((sum, item) => sum + item.bytes, 0) > 100 * 1024 * 1024) throw new Error('Retained assets exceed 100 MiB')
    const pending = [...assets.values()]
    for (let index = 0; index < pending.length; index += 6) await Promise.all(pending.slice(index, index + 6).map(copy))
    retained = pending.length
    current.releases.push(...releases)
  } else {
    const home = await get('')
    if (home) throw new Error('Published site has no usable deployment manifest')
  }
  write('_deployment.json', JSON.stringify(current) + '\n')
  console.log(`Retained ${retained} immutable assets across ${current.releases.length} releases.`)
  return current
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const index = process.argv.indexOf('--from-url')
  await retainAssets({ fromUrl: index < 0 ? siteUrl : process.argv[index + 1] })
}
