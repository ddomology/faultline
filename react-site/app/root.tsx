import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, useLoaderData } from 'react-router'
import type { ReactNode } from 'react'
import type { Route } from './+types/root'
import { catalog } from './lib/content.server'
import { basePath, siteUrl, repositoryUrl } from '../site.config.mjs'
import Shell from './components/Shell'
import { CatalogProvider, useCatalog } from './lib/catalog-context'
import styleHref from './styles.scss?url'

export function loader() {
  return { brand: catalog.brand, deployment: { basePath, siteUrl, repositoryUrl } }
}
export function shouldRevalidate() { return false }
const assetBase = import.meta.env.BASE_URL
export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: styleHref },
  { rel: 'stylesheet', href: `${assetBase}static/fonts.css` },
  { rel: 'icon', type: 'image/svg+xml', href: `${assetBase}static/favicon.svg` },
  { rel: 'apple-touch-icon', href: `${assetBase}static/apple-touch-icon.png` },
]
export const meta: Route.MetaFunction = ({ loaderData: data }) => [
  { title: `${data?.brand.name || 'Faultline'} · 웹 보안 노트` },
  { name: 'description', content: data?.brand.description || '' },
  { property: 'og:site_name', content: data?.brand.name || 'Faultline' },
  { property: 'og:image', content: `${data?.deployment.siteUrl || assetBase}static/og-image.png` },
  { name: 'twitter:card', content: 'summary_large_image' },
]
export function Layout({ children }: { children: ReactNode }) {
  return <html lang="ko" suppressHydrationWarning>
    <head><meta charSet="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><Meta /><Links /></head>
    <body>{children}<ScrollRestoration /><Scripts /></body>
  </html>
}
function AppShell() {
  const { deployment } = useLoaderData<typeof loader>()
  const catalog = useCatalog()
  return <Shell catalog={catalog} deployment={deployment}><Outlet /></Shell>
}
export default function App() { return <CatalogProvider><AppShell /></CatalogProvider> }
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const missing = isRouteErrorResponse(error) && error.status === 404
  return <main className="error-page"><h1>{missing ? '페이지를 찾을 수 없습니다.' : '페이지를 불러오지 못했습니다.'}</h1><p><a href={assetBase}>Faultline으로 돌아가기</a></p></main>
}
