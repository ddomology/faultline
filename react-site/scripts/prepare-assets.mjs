import { cpSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { basePath } from '../site.config.mjs'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repo = resolve(root, '..')
const publicDir = join(root, 'public')
mkdirSync(join(publicDir, 'static'), { recursive: true })
for (const name of ['favicon.svg', 'favicon.ico', 'favicon-32.png', 'apple-touch-icon.png']) {
  cpSync(join(repo, 'site/assets/favicon', name), join(publicDir, 'static', name))
}
cpSync(join(repo, 'site/assets/favicon/favicon.ico'), join(publicDir, 'favicon.ico'))
cpSync(join(repo, 'site/assets/og-image.png'), join(publicDir, 'static/og-image.png'))
cpSync(join(repo, 'site/assets/fonts'), join(publicDir, 'static/fonts'), { recursive: true })
cpSync(join(repo, 'site/assets/icons'), join(publicDir, 'static/icons'), { recursive: true })
writeFileSync(join(publicDir, 'static/fonts.css'), `@font-face{font-family:"Pretendard Variable";src:url("${basePath}static/fonts/pretendard/PretendardVariable.woff2") format("woff2");font-weight:100 900;font-style:normal;font-display:swap}\n`)
console.log('Prepared existing Faultline logo, fonts, icons and share image.')
