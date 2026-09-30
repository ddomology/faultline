import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { basePath, siteOrigin } from './site.config.mjs'

let revision = process.env.GITHUB_SHA || 'local'
try { if (revision === 'local') revision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim() } catch { /* Source archives still build. */ }
export const buildId = process.env.FAULTLINE_BUILD_ID || createHash('sha256').update(`${revision}|${basePath}|${siteOrigin}`).digest('hex').slice(0, 16)
if (!/^[a-zA-Z0-9-]{1,64}$/.test(buildId)) throw new Error('Invalid FAULTLINE_BUILD_ID')
