import { Link } from 'react-router'
import type { Route } from './+types/note'
import { getNote } from '../lib/content.server'
import { canonicalUrl, repositoryUrl } from '../../site.config.mjs'
import { useListReturn } from '../lib/navigation-state'
import ReaderBody from '../components/ReaderBody'
import { ReaderPagination, ReaderToc } from '../components/ReaderNavigation'
import readerStyleHref from '../reader.scss?url'
import katexStyleHref from 'katex/dist/katex.min.css?url'
import { buildId } from '../../build-version.server.mjs'
import { loadCurrentVersion } from '../lib/route-version'
import { socialMeta } from '../lib/seo'
import RouteFailure from '../components/RouteFailure'
import ConceptTags from '../components/ConceptTags'

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: readerStyleHref },
  { rel: 'stylesheet', href: katexStyleHref },
]

export function loader({ params }: Route.LoaderArgs) {
  const source = getNote('/' + (params['*'] || ''))
  if (!source) throw new Response('Not found', { status: 404 })
  const { searchText: _searchText, html: _html, ...note } = source
  return { note, buildId, canonical: canonicalUrl(note.routePath), sourceUrl: repositoryUrl + '/blob/main/content/' + note.sourcePath.split('/').map(encodeURIComponent).join('/') }
}
export function clientLoader({ serverLoader, request }: Route.ClientLoaderArgs) { return loadCurrentVersion(serverLoader, request) }
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) { return <RouteFailure error={error} /> }
export const meta: Route.MetaFunction = ({ loaderData: data, matches }) => {
  const parent = matches[0]?.loaderData as { brand: { name: string }, deployment: { siteUrl: string } } | undefined
  const brand = parent?.brand.name || 'Faultline'
  if (!data) return [{ title: `페이지 없음 · ${brand}` }, { name: 'robots', content: 'noindex' }]
  return [
    ...socialMeta({ title: `${data.note.title} · ${brand}`, description: data.note.description, url: data.canonical, image: `${parent?.deployment.siteUrl}static/og-image.png`, brand, article: true }),
    ...(data.note.updatedAt ? [{ property: 'article:modified_time', content: data.note.updatedAt }] : []),
    { 'script:ld+json': { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: data.note.title, description: data.note.description, url: data.canonical, mainEntityOfPage: data.canonical, inLanguage: 'ko', image: `${parent?.deployment.siteUrl}static/og-image.png`, ...(data.note.updatedAt ? { dateModified: data.note.updatedAt } : {}) } },
  ]
}
export default function Note({ loaderData }: Route.ComponentProps) {
  const { note } = loaderData
  const returnTo = useListReturn(note.view)
  return <>
    <Link className="notebook-return" to={returnTo}>← {note.view === 'notes' ? '풀이 목록' : '개념 목록'}</Link>
    <header className="note-heading" tabIndex={-1}>
      <div className="reader-meta"><span className="reader-number">{note.number}</span><span>{note.categoryTitle}</span>{note.difficulty && <span>{note.difficulty}</span>}</div>
      <div className="note-title-group"><h1 className="article-title">{note.title}</h1>
        {note.originalTitle && note.originalTitle !== note.title && <p className="article-subtitle" lang="en">{note.originalTitle}</p>}
      </div>
      {note.view === 'concepts' && <ConceptTags tags={note.tags} />}
    </header>
    <ReaderToc key={note.routePath + ':toc'} toc={note.toc} returnTo={returnTo} />
    <ReaderBody key={note.routePath} body={note.body} sourcePath={note.sourcePath} returnTo={returnTo} />
    <div className="reader-sources">
      {note.labUrl && <a href={note.labUrl} target="_blank" rel="noopener noreferrer">공식 실습 ↗</a>}
      <a href={loaderData.sourceUrl} target="_blank" rel="noopener noreferrer">Markdown 원문 ↗</a>
    </div>
    <ReaderPagination note={note} returnTo={returnTo} />
  </>
}
