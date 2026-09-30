import { Link, useRouteLoaderData, useSearchParams } from 'react-router'
import type { loader as rootLoader } from '../root'
import { useHydrated } from '../lib/use-hydrated'
import type { Route } from './+types/home'

export const meta: Route.MetaFunction = ({ matches }) => {
  const root = matches[0]?.loaderData as ReturnType<typeof rootLoader> | undefined
  const name = root?.catalog.brand.name || 'Faultline'
  return [
    { title: `${name} · 웹 보안 노트` },
    { name: 'description', content: root?.catalog.brand.description || '' },
    { property: 'og:title', content: name },
    { property: 'og:site_name', content: name },
    { property: 'og:image', content: `${root?.deployment.siteUrl}static/og-image.png` },
    { tagName: 'link', rel: 'canonical', href: root?.deployment.siteUrl },
  ]
}
export default function Home() {
  const data = useRouteLoaderData<typeof rootLoader>('root')!
  const [browserParams] = useSearchParams()
  const hydrated = useHydrated()
  const params = hydrated ? browserParams : new URLSearchParams()
  const concepts = params.get('view') === 'concepts'
  const view = concepts ? 'concepts' : 'notes'
  const topic = params.get('topic')
  const notes = data.catalog.notes.filter(note => note.view === view && (!topic || note.category === topic))
  const groups = data.catalog.categories.map(category => ({ ...category, notes: notes.filter(note => note.category === category.id) })).filter(group => group.notes.length)
  return <section className="lab-explorer" aria-label={concepts ? '개념 노트' : '풀이 노트'}>
    <h1 className="library-title">{concepts ? '개념 노트' : '풀이 노트'}</h1>
    <p className="library-description">{data.catalog.brand.tagline}</p>
    <nav className="view-switch" aria-label="목록 선택">
      <Link to="/" aria-current={!concepts ? 'page' : undefined}>풀이 노트 <span>{data.catalog.counts.notes}</span></Link>
      <Link to="/?view=concepts" aria-current={concepts ? 'page' : undefined}>개념 노트 <span>{data.catalog.counts.concepts}</span></Link>
    </nav>
    {topic && <p className="category-filter"><Link to={concepts ? '/?view=concepts' : '/'}>모든 주제 보기</Link></p>}
    {!notes.length && <p className="empty-state">{concepts ? '등록된 개념 노트가 없습니다.' : '이 주제에 등록된 풀이가 없습니다.'}</p>}
    {groups.map(group => <section className="lab-group" key={group.id}>
      <h2 className="lab-group-title">{group.title} <span>{group.notes.length}</span></h2>
      <div className="note-list">{group.notes.map(note => <div className="note-row" key={note.routePath}>
        <span className="note-number">{note.number}</span>
        <div className="note-row-content"><h3 className="note-title"><Link to={note.routePath}>{note.title}</Link>{note.noteKind === 'problem' && <span className="note-status">작성 중</span>}</h3>
          {note.originalTitle && note.title !== note.originalTitle && <p className="note-subtitle" lang="en">{note.originalTitle}</p>}
        </div>
      </div>)}</div>
    </section>)}
  </section>
}
