import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useCatalog } from '../lib/catalog-context'
import type { Note } from '../lib/types'
import { TopicIcon } from './Shell'

export function ReaderToc({ toc, returnTo }: { toc: Note['toc']; returnTo: string }) {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(true)
  const entries = toc.filter(item => item.id !== '관련-개념')
  useEffect(() => {
    const headings = toc.filter(item => item.id !== '관련-개념').map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
    let frame = 0
    const update = () => {
      frame = 0
      let current = headings[0]
      for (const heading of headings) {
        if (heading.getBoundingClientRect().top > 100) break
        current = heading
      }
      setActive(current?.id || '')
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    document.addEventListener('scroll', schedule, { passive: true })
    update()
    return () => { document.removeEventListener('scroll', schedule); cancelAnimationFrame(frame) }
  }, [toc])
  if (!entries.length) return null
  const rootDepth = Math.min(...entries.map(item => item.depth))
  return <aside className="reader-toc" aria-label="목차">
    <button className="reader-toc-toggle" type="button" aria-expanded={open} aria-controls="reader-toc-links" onClick={() => setOpen(value => !value)}>목차
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <nav id="reader-toc-links" aria-label="본문 목차" hidden={!open}><ol>{entries.map(item => <li key={item.id} style={{ paddingInlineStart: `${(item.depth - rootDepth) * 10}px` }}>
      <Link to={'#' + encodeURIComponent(item.id)} state={{ fromList: returnTo }} preventScrollReset aria-current={item.id === active ? 'location' : undefined}>{item.text}</Link>
    </li>)}</ol></nav>
  </aside>
}

export function ReaderPagination({ note, returnTo }: { note: Pick<Note, 'view' | 'category' | 'routePath'>; returnTo: string }) {
  const { notes } = useCatalog()
  const siblings = notes.filter(item => item.view === note.view && item.category === note.category)
  const index = siblings.findIndex(item => item.routePath === note.routePath)
  if (index < 0 || siblings.length < 2) return null
  const label = note.view === 'notes' ? '실습' : '노트'
  return <nav className="lab-pagination" aria-label={`같은 주제의 이전·다음 ${label}`}>
    {[{ item: siblings[index - 1], previous: true }, { item: siblings[index + 1], previous: false }].map(({ item, previous }) => item && <Link key={item.routePath} to={item.routePath} state={{ fromList: returnTo }} rel={previous ? 'prev' : 'next'} className={`lab-pagination-link ${previous ? 'is-previous' : 'is-next'}`} aria-label={`${previous ? '이전' : '다음'} ${label} ${item.number}: ${item.title}`}>
      <span className="lab-pagination-direction">{previous ? '← 이전' : '다음'} {label}{previous ? '' : ' →'}</span>
      <span className="lab-pagination-meta"><TopicIcon category={item.category} />{item.number}</span>
      <span className="lab-pagination-title">{item.explorerTitle}</span>
    </Link>)}
  </nav>
}
