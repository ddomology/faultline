// Strict static preview: no SPA catch-all. Missing paths return HTTP 404.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, join, dirname } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { basePath } from '../site.config.mjs'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const mime = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.json':'application/json', '.data':'text/x-script', '.svg':'image/svg+xml', '.png':'image/png', '.ico':'image/x-icon', '.woff2':'font/woff2', '.csv':'text/csv' }
export function staticServer({ directory = join(root, 'dist'), base = basePath } = {}) {
  return createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost')
      if (base !== '/' && url.pathname === base.slice(0,-1)) { res.writeHead(308,{Location:base+url.search});res.end();return }
      if (!url.pathname.startsWith(base)) throw new Error('Outside base')
      const decoded = decodeURIComponent(url.pathname.slice(base.length))
      const filename = resolve(directory, decoded || 'index.html')
      if (filename !== resolve(directory) && !filename.startsWith(resolve(directory) + '/')) throw new Error('Outside root')
      const info = await stat(filename)
      if (info.isDirectory() && !url.pathname.endsWith('/')) { res.writeHead(308,{Location:url.pathname+'/'+url.search});res.end();return }
      const file = info.isDirectory() ? join(filename,'index.html') : filename
      const body = await readFile(file)
      res.writeHead(200,{'Content-Type':mime[extname(file)] || 'application/octet-stream','Cache-Control':'no-store'})
      res.end(req.method === 'HEAD' ? undefined : body)
    } catch {
      res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'})
      try { res.end(await readFile(join(directory,'404.html'))) } catch { res.end('Not found') }
    }
  })
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 4173)
  staticServer().listen(port,'127.0.0.1',()=>console.log(`Faultline static preview: http://127.0.0.1:${port}${basePath}`))
}
