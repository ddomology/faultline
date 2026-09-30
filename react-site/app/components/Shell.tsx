import { useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { Link, useLocation, useNavigation } from "react-router"
import { useHydrated } from "../lib/use-hydrated"
import type { Catalog } from "../lib/types"
import HeaderSearch from "./HeaderSearch"
import NavigationState from "./NavigationState"
import brandSvg from "../../../site/assets/favicon/favicon.svg?raw"
import "../navigation.scss"

type View = "notes" | "concepts"
type Deployment = { basePath: string; siteUrl: string; repositoryUrl: string }
type ShellProps = { catalog: Catalog; deployment: Deployment; children: ReactNode }
type ExplorerState = { expanded: Record<View, string[]>; scroll: Record<View, number> }
const explorerStorageKey = "faultline:explorer:v1"

function loadExplorerState(categories: string[]): ExplorerState | undefined {
  try {
    const stored = JSON.parse(sessionStorage.getItem(explorerStorageKey) || "null")
    if (!stored || typeof stored !== "object") return
    const clean = (view: View) => Array.isArray(stored.expanded?.[view])
      ? stored.expanded[view].filter((id: unknown) => typeof id === "string" && categories.includes(id)) : []
    const position = (view: View) => Number.isFinite(stored.scroll?.[view]) ? Math.max(0, Math.min(stored.scroll[view], 1e7)) : 0
    return { expanded: { notes: clean("notes"), concepts: clean("concepts") }, scroll: { notes: position("notes"), concepts: position("concepts") } }
  } catch { return }
}

function saveExplorerState(state: ExplorerState) {
  try { sessionStorage.setItem(explorerStorageKey, JSON.stringify(state)) } catch { /* Storage is optional. */ }
}

// These SVGs are repository-owned artwork, not Markdown or user input.
const topicArtwork = import.meta.glob<string>("../../../site/assets/icons/topics/*.svg", {
  query: "?raw", import: "default", eager: true,
})
const topicBodies = Object.fromEntries(Object.entries(topicArtwork).map(([path, svg]) => [
  path.split("/").pop()!.replace(/\.svg$/, ""),
  svg.replace(/^.*?<svg\b[^>]*>/s, "").replace(/<\/svg>\s*$/, "")
    .replace(/<title>.*?<\/title>/s, "")
    .replaceAll('stroke="var(--topic-icon-accent, currentColor)"', 'class="topic-icon-accent"'),
]))
const brandBody = brandSvg.replace(/^.*?<svg\b[^>]*>/s, "").replace(/<\/svg>\s*$/, "")
  .replace(/<style\b[^>]*>.*?<\/style>/s, "").replace(/<!--[\s\S]*?-->/g, "")
  .replaceAll('id="split"', 'id="faultline-brand-split"').replaceAll("url(#split)", "url(#faultline-brand-split)")

function Chevron({ open }: { open: boolean }) {
  return <svg className={`explorer-chevron${open ? " is-open" : ""}`} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg>
}

export function TopicIcon({ category }: { category: string }) {
  const body = topicBodies[category]
  return body ? <svg className="topic-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: body }} /> : null
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  useEffect(() => {
    let saved: string | null = null
    try { saved = localStorage.getItem("theme") } catch { /* Storage can be unavailable in private tabs. */ }
    const initial = saved === "dark" || saved === "light" ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    setTheme(initial)
    document.documentElement.setAttribute("saved-theme", initial)
  }, [])
  function toggle() {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("saved-theme", next)
    try { localStorage.setItem("theme", next) } catch { /* The active theme still works without persistence. */ }
  }
  return <button className="theme-toggle" type="button" onClick={toggle} aria-label={theme === "dark" ? "밝은 테마로 전환" : "어두운 테마로 전환"} title={theme === "dark" ? "밝은 테마" : "어두운 테마"}>
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {theme === "dark" ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></> : <path d="M20.8 13A8.5 8.5 0 0 1 11 3.2 8.5 8.5 0 1 0 20.8 13Z" />}
    </svg>
  </button>
}

export default function Shell({ catalog, deployment, children }: ShellProps) {
  const location = useLocation()
  const navigation = useNavigation()
  const pathname = decodeURI(location.pathname).replace(/\/$/, "").replace(/\.html$/, "")
  const activeNote = catalog.notes.find(note => decodeURI(note.routePath).replace(/\/$/, "").replace(/\.html$/, "") === pathname)
  const hydrated = useHydrated()
  const params = new URLSearchParams(hydrated ? location.search : "")
  const view: View = activeNote?.view ?? (params.get("view") === "concepts" ? "concepts" : "notes")
  const selectedCategory = activeNote?.category || params.get("topic") || ""
  const [mobileOpen, setMobileOpen] = useState(false)
  const [compact, setCompact] = useState(false)
  const mobileToggle = useRef<HTMLButtonElement>(null)
  const tree = useRef<HTMLUListElement>(null)
  const currentView = useRef<View>(view)
  const restoredView = useRef<View | null>(null)
  const [storageReady, setStorageReady] = useState(false)
  const [expanded, setExpanded] = useState<Record<View, string[]>>({
    notes: view === "notes" && selectedCategory ? [selectedCategory] : [],
    concepts: view === "concepts" && selectedCategory ? [selectedCategory] : [],
  })
  const savedExplorer = useRef<ExplorerState>({ expanded, scroll: { notes: 0, concepts: 0 } })
  const groups = useMemo(() => catalog.categories.map(category => ({
    ...category,
    notes: catalog.notes.filter(note => note.view === view && note.category === category.id)
      .sort((a, b) => a.number.localeCompare(b.number, "en", { numeric: true })),
  })).filter(group => group.notes.length), [catalog, view])

  useEffect(() => {
    const stored = loadExplorerState(catalog.categories.map(category => category.id))
    if (stored) {
      savedExplorer.current = stored
      setExpanded(previous => ({
        notes: [...new Set([...previous.notes, ...stored.expanded.notes])],
        concepts: [...new Set([...previous.concepts, ...stored.expanded.concepts])],
      }))
    }
    setStorageReady(true)
  }, [])
  useEffect(() => {
    if (!storageReady) return
    savedExplorer.current.expanded = expanded
    saveExplorerState(savedExplorer.current)
  }, [expanded, storageReady])
  useLayoutEffect(() => {
    currentView.current = view
    if (compact && !mobileOpen) {
      restoredView.current = null
      return
    }
    if (!storageReady || restoredView.current === view || !tree.current) return
    // Restore only when switching collections or mounting. No selected-item
    // scrollIntoView, resize listener, or late animation fights user scrolling.
    restoredView.current = view
    tree.current.scrollTop = savedExplorer.current.scroll[view]
  }, [view, storageReady, mobileOpen, compact])

  // Close after the destination commits, not when a request starts.
  useEffect(() => {
    if (mobileOpen && window.matchMedia("(max-width: 900px)").matches) {
      document.getElementById("main-content")?.focus({ preventScroll: true })
    }
    setMobileOpen(false)
  }, [location.key])
  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)")
    setCompact(media.matches)
    function change() { setCompact(media.matches); setMobileOpen(false) }
    media.addEventListener("change", change)
    return () => media.removeEventListener("change", change)
  }, [])
  useEffect(() => {
    if (!mobileOpen) return
    function escape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.isComposing) return
      event.preventDefault()
      setMobileOpen(false)
      mobileToggle.current?.focus({ preventScroll: true })
    }
    document.addEventListener("keydown", escape)
    return () => document.removeEventListener("keydown", escape)
  }, [mobileOpen])
  useEffect(() => {
    if (!selectedCategory) return
    setExpanded(previous => previous[view].includes(selectedCategory) ? previous
      : { ...previous, [view]: [...previous[view], selectedCategory] })
  }, [view, selectedCategory])

  function toggleGroup(category: string) {
    setExpanded(previous => ({ ...previous, [view]: previous[view].includes(category)
      ? previous[view].filter(value => value !== category) : [...previous[view], category] }))
  }
  const label = view === "concepts" ? "개념 노트" : "풀이 노트"
  const pending = navigation.state !== "idle"

  return <div className="page">
    <NavigationState />
    <a className="skip-to-content" href="#main-content">본문 바로가기</a>
    <div className="site-layout">
      <aside className="sidebar" aria-label={`${label} 탐색기`}>
        <section className="topic-browser" data-explorer-mode={view}>
          <button ref={mobileToggle} className="topic-mobile-toggle" type="button" aria-expanded={mobileOpen} aria-controls="topic-note-panel" onClick={() => setMobileOpen(open => !open)}>
            <span>Explorer <small>탐색기</small></span><Chevron open={mobileOpen} />
          </button>
          <div id="topic-note-panel" className={`topic-note-panel${mobileOpen ? " is-open" : ""}`}>
            <div className="topic-heading"><span>Explorer <small>탐색기</small></span><span className="topic-total">{catalog.counts[view]}</span></div>
            <nav className="explorer-shortcuts" aria-label="목록 선택">
              <Link to="/" aria-current={view === "notes" ? "page" : undefined}>풀이 노트 <span>{catalog.counts.notes}</span></Link>
              <Link to="/?view=concepts" aria-current={view === "concepts" ? "page" : undefined}>개념 노트 <span>{catalog.counts.concepts}</span></Link>
            </nav>
            <ul ref={tree} className="topic-tree" aria-label={`${label} 주제`} onScroll={event => {
              if (!storageReady || currentView.current !== view || (compact && !mobileOpen)) return
              savedExplorer.current.scroll[view] = event.currentTarget.scrollTop
              saveExplorerState(savedExplorer.current)
            }}>
              {!groups.length && <li className="topic-empty">등록된 {label}가 없습니다.</li>}
              {groups.map(group => {
                const open = expanded[view].includes(group.id)
                const groupId = `explorer-${view}-${group.id}`
                const to = `/?${view === "concepts" ? "view=concepts&" : ""}topic=${encodeURIComponent(group.id)}`
                return <li className={`topic-entry${selectedCategory === group.id ? " is-current-topic" : ""}`} key={group.id}>
                  <div className="topic-row">
                    <button className="topic-expand" type="button" aria-expanded={open} aria-controls={groupId} aria-label={`${group.title} ${open ? "접기" : "펼치기"}`} onClick={() => toggleGroup(group.id)}><Chevron open={open} /></button>
                    <Link className="topic-name" to={to} aria-current={!activeNote && selectedCategory === group.id ? "page" : undefined}><span className="topic-number">{group.number}</span><TopicIcon category={group.id} /><span>{group.title}</span></Link>
                    <span className="topic-count" aria-label={`${group.notes.length}개 노트`}>{group.notes.length}</span>
                  </div>
                  <ul className="topic-children" id={groupId} hidden={!open}>
                    {open && group.notes.map(note => <li key={note.slug}><Link to={note.routePath} title={[note.title, note.originalTitle].filter(Boolean).join("\n")} aria-current={note.slug === activeNote?.slug ? "page" : undefined}><span className="topic-note-number">{note.number}</span><span>{note.explorerTitle || note.title}</span></Link></li>)}
                  </ul>
                </li>
              })}
            </ul>
          </div>
        </section>
      </aside>
      <div className="site-content">
        <header className="notebook-nav" data-pending={pending}>
          <Link className="notebook-brand" to="/" aria-label={`${catalog.brand.name} 홈`}>
            <svg className="notebook-brand-mark" viewBox="0 0 24 24" width="22" height="22" fill="none" aria-hidden="true" dangerouslySetInnerHTML={{ __html: brandBody }} />{catalog.brand.name}
          </Link>
          <HeaderSearch view={view} />
          <nav className="notebook-nav-actions" aria-label="기본 탐색">
            <a href={deployment.repositoryUrl} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <ThemeToggle />
          </nav>
        </header>
        <span className="navigation-status" role="status" aria-live="polite">{pending ? "페이지를 불러오는 중입니다." : ""}</span>
        <main id="main-content" tabIndex={-1} className="center" aria-busy={pending}>{children}</main>
        <footer className="site-footer"><p>{catalog.brand.name} · {catalog.brand.tagline}</p><a href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">Web Security Academy ↗</a></footer>
      </div>
    </div>
  </div>
}
