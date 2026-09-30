// One deployment path for build output, navigation, assets and canonical URLs.
// Change these environment variables when the repository/domain is renamed.
export function normalizeBasePath(value = '/faultline/') {
  if (!value.startsWith('/') || value.startsWith('//') || /[?#\\\\]/.test(value)
    || value.split('/').some(segment => segment === '.' || segment === '..')) {
    throw new Error(`Invalid FAULTLINE_BASE_PATH: ${value}`)
  }
  return value === '/' ? '/' : `/${value.split('/').filter(Boolean).join('/')}/`
}
export const basePath = normalizeBasePath(process.env.FAULTLINE_BASE_PATH)
const originUrl = new URL(process.env.FAULTLINE_SITE_ORIGIN || 'https://ddomology.github.io')
if (!['https:', 'http:'].includes(originUrl.protocol) || originUrl.username || originUrl.password || originUrl.pathname !== '/' || originUrl.search || originUrl.hash) {
  throw new Error('FAULTLINE_SITE_ORIGIN must be an HTTP(S) origin without a path')
}
export const siteOrigin = originUrl.origin
export const siteUrl = new URL(basePath, siteOrigin).href
export const repositoryUrl = process.env.FAULTLINE_REPOSITORY_URL || 'https://github.com/ddomology/faultline'
export function assetUrl(path) { return basePath + path.replace(/^\/+/, '') }
export function canonicalUrl(routePath) { return new URL(basePath + routePath.replace(/^\/+/, ''), siteOrigin).href }
