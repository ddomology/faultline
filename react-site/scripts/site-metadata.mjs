import { posix } from 'node:path'
import { basePath, canonicalUrl, repositoryUrl, siteUrl } from '../site.config.mjs'

export const escapeXml = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[char]))

export function legacyRedirects(sources, notes) {
  const routes = new Set(notes.map(note => note.routePath.slice(1)))
  const bySource = new Map(notes.map(note => [note.sourcePath, note]))
  const redirects = new Map()
  const folders = new Map()
  const tags = new Map()
  const add = (path, target) => {
    if (!routes.has(path)) redirects.set(path, { path, target })
  }
  add('notes.html', '/')
  add('guide.html', repositoryUrl + '#노트-작성')
  for (const source of sources) {
    const note = bySource.get(source.sourcePath)
    const parts = source.sourcePath.split('/')
    for (let count = 1; count < parts.length; count++) {
      const folder = parts.slice(0, count).join('/')
      if (!folders.has(folder)) folders.set(folder, new Set())
      folders.get(folder).add(note.category)
    }
    for (const tag of Array.isArray(source.data.tags) ? source.data.tags : []) {
      const parts = String(tag).split('/')
      for (let count = 1; count <= parts.length; count++) {
        const raw = parts.slice(0, count).join('/')
        const slug = raw.replace(/\s/g, '-').replace(/&/g, '-and-').replace(/%/g, '-percent').replace(/[?#]/g, '').replace(/\/$/, '')
        if (slug && !slug.includes('\\') && slug.split('/').every(part => part && part !== '.' && part !== '..')) tags.set(slug, raw)
      }
    }
  }
  for (const [folder, categories] of folders) add(`${folder}/index.html`, categories.size === 1 ? '/?topic=' + encodeURIComponent([...categories][0]) : '/')
  for (const [tag, raw] of tags) add(`tags/${tag}.html`, '/?q=' + encodeURIComponent(raw))
  add('tags/index.html', '/')
  for (const item of [...redirects.values()]) {
    if (posix.basename(item.path) !== 'index.html') add(item.path.slice(0, -5) + '/index.html', item.target)
  }
  return [...redirects.values()].sort((a, b) => a.path.localeCompare(b.path))
}

export function redirectHtml(target, { preserveLocation = true, base = basePath } = {}) {
  const url = target.startsWith('/') ? base + target.slice(1) : target
  const literal = JSON.stringify(url).replaceAll('<', '\\u003c')
  const script = preserveLocation ? `const target=new URL(${literal},location.origin);for(const [key,value] of new URLSearchParams(location.search)){if(!target.searchParams.has(key))target.searchParams.append(key,value)}if(!target.hash)target.hash=location.hash;location.replace(target.href)` : `location.replace(${literal})`
  return `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Faultline · 페이지 이동</title><link rel="canonical" href="${escapeXml(url)}"><meta name="robots" content="noindex"><script>${script}</script><meta http-equiv="refresh" content="0;url=${escapeXml(url)}"></head><body><a href="${escapeXml(url)}">노트로 이동</a></body></html>`
}

export function sitemapXml(notes) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    [{ routePath: '/' }, ...notes].map(note => `<url><loc>${escapeXml(canonicalUrl(note.routePath))}</loc>${note.updatedAt ? `<lastmod>${escapeXml(note.updatedAt)}</lastmod>` : ''}</url>`).join('\n') + '\n</urlset>\n'
}

export function feedXml(notes, brand) {
  const entries = notes.filter(note => note.noteKind !== 'problem').sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')) || a.number.localeCompare(b.number)).slice(0, 30)
  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(brand.name)}</title><link>${escapeXml(siteUrl)}</link><description>${escapeXml(brand.description)}</description><language>ko</language><atom:link href="${escapeXml(siteUrl + 'index.xml')}" rel="self" type="application/rss+xml"/>${entries.map(note => `<item><title>${escapeXml(note.title)}</title><link>${escapeXml(canonicalUrl(note.routePath))}</link><guid isPermaLink="true">${escapeXml(canonicalUrl(note.routePath))}</guid><description>${escapeXml(note.description || note.title)}</description></item>`).join('')}</channel></rss>\n`
}
