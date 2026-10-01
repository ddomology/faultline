import { useEffect, useMemo, useRef } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router'
import type { ShouldRevalidateFunctionArgs } from 'react-router'
import type { loader as rootLoader } from '../root'
import { useCatalog } from '../lib/catalog-context'
import { useHydrated } from '../lib/use-hydrated'
import { filterLibrary, formatUpdatedDate, hasLibraryFilters, libraryHref, PAGE_SIZE, readLibraryQuery, resetLibraryQuery, writeLibraryQuery } from '../lib/library-query'
import type { LibraryQuery } from '../lib/library-query'
import type { NoteMeta } from '../lib/types'
import LibraryControls from '../components/LibraryControls'
import Difficulty from '../components/Difficulty'
import { TopicIcon } from '../components/Shell'
import type { Route } from './+types/home'
import '../library.scss'
import { buildId } from '../../build-version.server.mjs'
import { loadCurrentVersion } from '../lib/route-version'
import { socialMeta } from '../lib/seo'
import RouteFailure from '../components/RouteFailure'

export function loader() { return { buildId } }
export function clientLoader({ serverLoader, request }: Route.ClientLoaderArgs) { return loadCurrentVersion(serverLoader, request) }
export function shouldRevalidate({ currentUrl, nextUrl, defaultShouldRevalidate }: ShouldRevalidateFunctionArgs) { return currentUrl.pathname === nextUrl.pathname && currentUrl.search !== nextUrl.search ? false : defaultShouldRevalidate }
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) { return <RouteFailure error={error} /> }

export const meta: Route.MetaFunction = ({ matches }) => {
  const root = matches[0]?.loaderData as ReturnType<typeof rootLoader> | undefined
  const name = root?.brand.name || 'Faultline'
  return [
    ...socialMeta({ title: `${name} · 웹 보안 노트`, description: root?.brand.description || '', url: root?.deployment.siteUrl || '', image: `${root?.deployment.siteUrl}static/og-image.png`, brand: name }),
    { 'script:ld+json': { '@context': 'https://schema.org', '@type': 'WebSite', name, url: root?.deployment.siteUrl, description: root?.brand.description, inLanguage: 'ko' } },
  ]
}

export default function Home() {
  const catalog = useCatalog()
  const location = useLocation()
  const [browserParams, setSearchParams] = useSearchParams()
  const hydrated = useHydrated()
  const query = useMemo(() => readLibraryQuery(hydrated ? browserParams : new URLSearchParams(), catalog.notes.length), [browserParams, hydrated, catalog.notes.length])
  const notes = useMemo(() => filterLibrary(catalog, query), [catalog, query])
  const shown = notes.slice(0, query.limit)
  const groups = new Map<string, { title: string; notes: NoteMeta[]; total: number }>()
  const totals = new Map<string, number>()
  for (const note of notes) totals.set(note.category, (totals.get(note.category) || 0) + 1)
  for (const note of shown) {
    if (!groups.has(note.category)) groups.set(note.category, { title: note.categoryTitle, notes: [], total: totals.get(note.category)! })
    groups.get(note.category)!.notes.push(note)
  }
  const concepts = query.view === 'concepts'
  const title = concepts ? '개념 노트' : '포트스위거 풀이 노트'
  const emptyConcepts = concepts && !catalog.counts.concepts
  const pendingFocus = useRef<number | null>(null)
  const list = useRef<HTMLDivElement>(null)
  const changeQuery = (patch: Partial<LibraryQuery>, replace = false) => {
    const next = writeLibraryQuery({ ...query, ...patch })
    if (next.toString() === browserParams.toString()) return
    setSearchParams(next, { replace, preventScrollReset: true })
  }
  const reset = () => {
    changeQuery(resetLibraryQuery(query.view))
    document.getElementById('library-search')?.focus({ preventScroll: true })
  }
  useEffect(() => {
    const index = pendingFocus.current
    if (index === null || shown.length <= index) return
    list.current?.querySelectorAll<HTMLAnchorElement>('.note-title a')[index]?.focus({ preventScroll: true })
    pendingFocus.current = null
  }, [shown.length])
  return <section className="lab-explorer" aria-label={`${title} 목록`}>
    <h1 className="library-title">{title}</h1>
    <nav className="view-switch" aria-label="목록 선택">
      <Link to={libraryHref({ ...query, view: 'notes', limit: PAGE_SIZE })} aria-current={!concepts ? 'page' : undefined}>포트스위거 풀이 노트 <span>{catalog.counts.notes}</span></Link>
      <Link to={libraryHref({ ...query, view: 'concepts', limit: PAGE_SIZE })} aria-current={concepts ? 'page' : undefined}>개념 노트 <span>{catalog.counts.concepts}</span></Link>
    </nav>
    {!emptyConcepts && <LibraryControls catalog={catalog} query={query} onChange={changeQuery} />}
    <div className="results-heading">
      <p id="library-result-count" role="status" aria-live="polite" aria-atomic="true">{title} {notes.length}개{query.query && !emptyConcepts ? ` · “${query.query}” 검색 결과` : ''}</p>
      {!emptyConcepts && hasLibraryFilters(query) && <button type="button" onClick={reset}>필터 초기화 <span aria-hidden="true">↺</span></button>}
    </div>
    <div ref={list} id="library-results" aria-label="검색 결과">
      {!notes.length && <div className="empty-state">
        <h2>{emptyConcepts ? '아직 개념 노트가 없습니다.' : '검색 결과가 없습니다.'}</h2>
        <p>{emptyConcepts ? '개념을 정리한 글이 이곳에 표시됩니다.' : '검색어를 바꾸거나 주제·난이도 필터를 해제해 보세요.'}</p>
        {!emptyConcepts && hasLibraryFilters(query) && <button className="empty-action" type="button" onClick={reset}>필터 초기화</button>}
      </div>}
      {Array.from(groups, ([id, group]) => <section className="lab-group" key={id} aria-labelledby={`lab-group-${id}`}>
        <header className="lab-group-header"><h2 className="lab-group-title" id={`lab-group-${id}`}>
          <TopicIcon category={id} /><span>{group.title}</span>
        </h2><span className="lab-group-count" aria-label={`${group.total}개 중 ${group.notes.length}개 표시`}>{group.notes.length < group.total ? `${group.notes.length} / ${group.total}` : group.total}</span></header>
        <div className="note-list">{group.notes.map(note => <div className="note-row" key={note.routePath}>
          <span className="note-number" aria-label={`노트 번호 ${note.number}`}>{note.number}</span>
          <div className="note-row-content"><h3 className="note-title"><Link to={note.routePath} state={{ fromList: location.pathname + location.search }}>{note.title}</Link>{note.noteKind === 'problem' && <span className="note-status" title="풀이 기록을 아직 작성하지 않은 노트입니다.">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 16v5m14-5v5M3 7h18v9H3z" /><path className="construction-accent" d="m5 7 5 9m4-9 5 9" /></svg>작성 중</span>}</h3>
            {note.originalTitle && note.title !== note.originalTitle && <p className="note-subtitle" lang="en">{note.originalTitle}</p>}
            {query.sort === 'recent' && note.updatedAt && <p className="note-updated">수정 <time dateTime={note.updatedAt}>{formatUpdatedDate(note.updatedAt)}</time></p>}
          </div>
          <div className="note-row-meta"><Difficulty level={note.difficulty} />{note.labUrl && <a className="note-source" href={note.labUrl} target="_blank" rel="noopener noreferrer" aria-label={`${note.title} 공식 문제 (새 탭)`}>공식 문제 <span aria-hidden="true">↗</span></a>}</div>
        </div>)}</div>
      </section>)}
    </div>
    {shown.length < notes.length && <button className="load-more" type="button" aria-controls="library-results" onClick={() => { pendingFocus.current = shown.length; changeQuery({ limit: Math.min(query.limit + PAGE_SIZE, notes.length) }, true) }}>더 보기 · {shown.length} / {notes.length}</button>}
    {!concepts && <p className="library-caption">‘작성 중’은 문제 조건을 먼저 정리하고 풀이 기록을 준비하는 노트입니다.</p>}
    <noscript><p className="library-caption">검색과 더 보기는 JavaScript를 켜면 사용할 수 있습니다.</p></noscript>
  </section>
}
