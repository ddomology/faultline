import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router'
import { useCatalog } from '../lib/catalog-context'
import type { Note } from '../lib/types'
import { TopicIcon } from './Shell'

export function ReaderToc({ toc, returnTo }: { toc: Note['toc']; returnTo: string }) {
  const location = useLocation()
  const [position, setPosition] = useState<{ active: string; visible: string[] }>({ active: '', visible: [] })
  const [open, setOpen] = useState(true)
  const entries = toc.filter(item => item.id !== '관련-개념')
  useEffect(() => {
    const sections = toc.filter(item => item.id !== '관련-개념').flatMap(item => {
      const element = document.getElementById(item.id)
      return element ? [{ ...item, element }] : []
    })
    const article = sections[0]?.element.closest('article')
    if (!article) return
    // A parent section includes its subsections, even after its own heading
    // has scrolled away. Several sections can be visible at the same time.
    const ends = sections.map((item, index) => sections.slice(index + 1).find(next => next.depth <= item.depth)?.element)
    let anchorId = ''
    try { anchorId = decodeURIComponent(location.hash.slice(1)) } catch { /* Ignore malformed fragments. */ }
    let anchor = sections.find(item => item.id === anchorId)
    const wide = window.matchMedia('(min-width: 1440px)')
    let frame = 0
    const update = () => {
      frame = 0
      if (!wide.matches) return
      const tops = sections.map(item => item.element.getBoundingClientRect().top)
      const articleBottom = article.getBoundingClientRect().bottom
      const visible = sections.filter((_, index) => tops[index] < innerHeight && (ends[index]?.getBoundingClientRect().top ?? articleBottom) > 0).map(item => item.id)
      let current = sections[0]
      for (let index = 0; index < sections.length; index++) {
        if (tops[index] > 100) break
        current = sections[index]
      }
      const maxScroll = Math.max(0, document.documentElement.scrollHeight - innerHeight)
      if (maxScroll > 0 && scrollY >= maxScroll - 2) current = sections[sections.length - 1]
      // Near the page bottom, several anchors land at the same clamped scroll
      // position. Respect the chosen fragment until the reader scrolls away.
      if (anchor) {
        const margin = parseFloat(getComputedStyle(anchor.element).scrollMarginTop) || 0
        const target = Math.max(0, Math.min(maxScroll, scrollY + anchor.element.getBoundingClientRect().top - margin))
        if (Math.abs(scrollY - target) <= 2) current = anchor
        else anchor = undefined
      }
      const active = current?.id || ''
      setPosition(previous => previous.active === active && previous.visible.length === visible.length && previous.visible.every((id, index) => id === visible[index]) ? previous : { active, visible })
    }
    const schedule = () => { if (wide.matches && !frame) frame = requestAnimationFrame(update) }
    const observer = new ResizeObserver(schedule)
    // Observe only the article while the TOC is displayed. Watching the root
    // also reacts to unrelated route/layout changes and can loop in WebKit.
    const observeArticle = () => {
      observer.disconnect()
      if (wide.matches) { observer.observe(article); schedule() }
    }
    document.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    wide.addEventListener('change', observeArticle)
    observeArticle()
    return () => {
      document.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      wide.removeEventListener('change', observeArticle)
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [toc, location.key, location.hash])
  if (!entries.length) return null
  const rootDepth = Math.min(...entries.map(item => item.depth))
  return <aside className="reader-toc" aria-label="목차">
    <button className="reader-toc-toggle" type="button" aria-expanded={open} aria-controls="reader-toc-links" onClick={() => setOpen(value => !value)}>목차
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    <nav id="reader-toc-links" aria-label="본문 목차" hidden={!open}><ol>{entries.map(item => <li key={item.id} style={{ paddingInlineStart: `${(item.depth - rootDepth) * 10}px` }}>
      <Link to={'#' + encodeURIComponent(item.id)} state={{ fromList: returnTo }} preventScrollReset data-visible={position.visible.includes(item.id) || undefined} aria-current={item.id === position.active ? 'location' : undefined}>{item.text}</Link>
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
