import { Link } from 'react-router'
import type { Route } from './+types/note'
import { getNote } from '../lib/content.server'
import { canonicalUrl } from '../../site.config.mjs'
import { useListReturn } from '../lib/navigation-state'

export function loader({ params }: Route.LoaderArgs) {
  const source = getNote('/' + (params['*'] || ''))
  if (!source) throw new Response('Not found', { status: 404 })
  const { searchText: _searchText, ...note } = source
  return { note, canonical: canonicalUrl(note.routePath) }
}
export const meta: Route.MetaFunction = ({ loaderData: data, matches }) => {
  const parent = matches[0]?.loaderData as { brand: { name: string }, deployment: { siteUrl: string } } | undefined
  const brand = parent?.brand.name || 'Faultline'
  if (!data) return [{ title: `페이지 없음 · ${brand}` }]
  return [
    { title: `${data.note.title} · ${brand}` },
    { name: 'description', content: `${data.note.categoryTitle} — ${data.note.title}` },
    { property: 'og:title', content: data.note.title },
    { property: 'og:site_name', content: brand },
    { property: 'og:image', content: `${parent?.deployment.siteUrl}static/og-image.png` },
    { tagName: 'link', rel: 'canonical', href: data.canonical },
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
    </header>
    <article data-note-source={note.sourcePath} dangerouslySetInnerHTML={{ __html: note.html }} />
    {note.labUrl && <p className="source-link"><a href={note.labUrl} target="_blank" rel="noopener noreferrer">공식 실습 ↗</a></p>}
  </>
}
