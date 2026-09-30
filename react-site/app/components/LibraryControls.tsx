import { useEffect, useRef, useState } from 'react'
import type { Catalog } from '../lib/types'
import { LEVEL_NAMES, PAGE_SIZE } from '../lib/library-query'
import type { LibraryQuery, LibrarySort } from '../lib/library-query'

type Props = {
  catalog: Catalog
  query: LibraryQuery
  onChange: (patch: Partial<LibraryQuery>, replace?: boolean) => void
}

export default function LibraryControls({ catalog, query, onChange }: Props) {
  const [draft, setDraft] = useState(query.query)
  const input = useRef<HTMLInputElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const composing = useRef(false)
  const submittedQuery = useRef<string | null>(null)
  const change = useRef(onChange)
  change.current = onChange
  const clearTimer = () => { if (timer.current !== null) clearTimeout(timer.current); timer.current = null }
  const commitQuery = (value: string) => {
    submittedQuery.current = value
    change.current({ query: value, limit: PAGE_SIZE }, true)
  }
  const schedule = (value: string) => {
    clearTimer()
    timer.current = setTimeout(() => commitQuery(value), 140)
  }
  useEffect(() => {
    // An earlier debounced navigation may commit after another keystroke.
    // Keep the newer draft and its timer; only external navigation resets it.
    if (submittedQuery.current === query.query) { submittedQuery.current = null; return }
    submittedQuery.current = null
    clearTimer()
    composing.current = false
    setDraft(query.query)
  }, [query])
  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !event.isComposing
        && !target?.closest('input,textarea,select,[contenteditable]')) {
        event.preventDefault(); input.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', focusSearch)
    return () => { clearTimer(); document.removeEventListener('keydown', focusSearch) }
  }, [])
  const filter = (patch: Partial<LibraryQuery>) => { clearTimer(); submittedQuery.current = null; onChange({ ...patch, query: draft, limit: PAGE_SIZE }) }
  const counts = new Map<string, number>()
  for (const note of catalog.notes) if (note.view === query.view) counts.set(note.category, (counts.get(note.category) || 0) + 1)
  const categories = catalog.categories.filter(category => counts.has(category.id) || category.id === query.topic)
  const unknownTopic = query.topic !== 'all' && !categories.some(category => category.id === query.topic)
  return <form className="library-toolbar" role="search" aria-label="노트 검색과 필터" onSubmit={event => {
    event.preventDefault()
    if (composing.current) return
    clearTimer(); commitQuery(draft)
  }}>
    <div className="note-search">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
      <label className="lab-sr-only" htmlFor="library-search">제목, 본문, 번호 검색</label>
      <input ref={input} id="library-search" name="q" type="search" placeholder="제목, 본문, 번호 검색" autoComplete="off" value={draft}
        onChange={event => { setDraft(event.target.value); if (!composing.current && !(event.nativeEvent as InputEvent).isComposing) schedule(event.target.value) }}
        onCompositionStart={() => { composing.current = true; clearTimer() }}
        onCompositionEnd={event => { composing.current = false; setDraft(event.currentTarget.value); schedule(event.currentTarget.value) }}
        onKeyDown={event => { if (event.key === 'Escape' && !composing.current) { clearTimer(); setDraft(''); commitQuery('') } }} />
      <kbd aria-hidden="true">/</kbd>
    </div>
    <div className="library-filters">
      <label><span className="lab-sr-only">주제</span><select name="topic" aria-label="주제" value={query.topic} onChange={event => filter({ topic: event.target.value })}>
        <option value="all">모든 주제</option>
        {categories.map(category => <option key={category.id} value={category.id}>{category.number} {category.title} ({counts.get(category.id) || 0})</option>)}
        {unknownTopic && <option value={query.topic}>알 수 없는 주제</option>}
      </select></label>
      <label><span className="lab-sr-only">난이도</span><select name="level" aria-label="난이도" value={query.level} onChange={event => filter({ level: event.target.value })}>
        <option value="all">모든 난이도</option>
        {Object.entries(LEVEL_NAMES).map(([level, title]) => <option key={level} value={level}>{title}</option>)}
      </select></label>
      <label><span className="lab-sr-only">주제 안 정렬</span><select name="sort" aria-label="주제 안 정렬" title="각 주제 안에서 정렬" value={query.sort} onChange={event => filter({ sort: event.target.value as LibrarySort })}>
        <option value="number">번호순</option><option value="recent">최근 수정순</option><option value="title">제목순</option><option value="difficulty">난이도순</option>
      </select></label>
    </div>
  </form>
}
