import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useCatalog } from '../lib/catalog-context'
import type { Note } from '../lib/types'
import { TopicIcon } from './Shell'

export function ReaderToc({ toc, returnTo }: { toc: Note['toc']; returnTo: string }) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const headings = toc.map(item => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node))
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
  if (!toc.length) return null
  return <details className="reader-toc">
    <summary>이 글의 순서 <span>{toc.filter(item => item.depth <= 2).length}</span></summary>
    <nav aria-label="본문 목차"><ol>{toc.map(item => <li key={item.id} className={item.depth > 2 ? 'is-subheading' : undefined}>
      <Link to={'#' + encodeURIComponent(item.id)} state={{ fromList: returnTo }} preventScrollReset aria-current={item.id === active ? 'location' : undefined}>{item.text}</Link>
    </li>)}</ol></nav>
  </details>
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
