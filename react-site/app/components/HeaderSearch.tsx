import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useHref, useLocation, useNavigate } from 'react-router'
import type { View } from '../lib/types'

export default function HeaderSearch({ view }: { view: View }) {
  const location = useLocation()
  const navigate = useNavigate()
  const action = useHref('/')
  const input = useRef<HTMLInputElement>(null)
  const composing = useRef(false)
  const [query, setQuery] = useState('')
  const committedQuery = location.pathname === '/' ? new URLSearchParams(location.search).get('q') || '' : ''

  // Static index HTML is shared by every query string. Read its query only
  // after hydration, and resynchronise when browser Back/Forward commits.
  useEffect(() => { setQuery(committedQuery) }, [committedQuery, location.key])
  useEffect(() => {
    function shortcut(event: KeyboardEvent) {
      if (event.defaultPrevented || event.isComposing || event.repeat) return
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        // An explicit search shortcut should bring an off-screen field into
        // view. Route focus below uses preventScroll instead.
        input.current?.focus()
        input.current?.select()
      }
    }
    document.addEventListener('keydown', shortcut)
    return () => document.removeEventListener('keydown', shortcut)
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (composing.current) return
    const params = new URLSearchParams()
    if (view === 'concepts') params.set('view', 'concepts')
    if (query.trim()) params.set('q', query.trim())
    navigate({ pathname: '/', search: params.size ? `?${params}` : '' })
  }

  return <form className="header-search" role="search" aria-label="전체 노트 검색" action={action} method="get" onSubmit={submit}>
    {view === 'concepts' && <input type="hidden" name="view" value="concepts" />}
    <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
    <input ref={input} id="header-search" name="q" type="search" value={query} onChange={event => setQuery(event.target.value)}
      aria-label="전체 노트 검색어" placeholder="노트 검색" autoComplete="off" enterKeyHint="search"
      onCompositionStart={() => { composing.current = true }} onCompositionEnd={() => { composing.current = false }}
      onKeyDown={event => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing && !composing.current) {
          event.preventDefault()
          setQuery(committedQuery)
          input.current?.blur()
        }
      }} />
    <kbd className="search-shortcut" aria-hidden="true">⌘ / Ctrl K</kbd>
    <button type="submit" aria-label="검색 실행">검색</button>
  </form>
}
