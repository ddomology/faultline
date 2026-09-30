import { getFullSlug } from "../../util/path"

// Progressive navigation: keep the sidebar, header, fonts and styles mounted.
// Every destination remains a normal static HTML page when JavaScript is absent.
const cleanupFns = new Set<() => void>()
window.addCleanup = (fn) => cleanupFns.add(fn)
const home = new URL(document.querySelector<HTMLAnchorElement>("[data-explorer-view='notes']")!.href)
const parser = new DOMParser()
const routeKey = "__notebookNav"
type Position = { x: number, y: number }
type CachedPage = { text: string, url: string, time: number }
const pages = new Map<string, CachedPage>()
const pendingPages = new Map<string, { promise: Promise<CachedPage>, signal?: AbortSignal }>()
const positions = new Map<string, Position>()
const lists = new Map<string, { position: Position, limit: number }>()
let currentUrl = new URL(location.href)
let currentKey = ""
let sequence = 0
let controller: AbortController | undefined
let navigating = false
let swapping = false
let restoringInitial = false
let scrollFrame = 0
let prefetchTimer: ReturnType<typeof setTimeout>
const newKey = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`

function rememberScroll(write = true) {
  if (!currentKey) return
  const position = { x: scrollX, y: scrollY }
  positions.set(currentKey, position)
  if (write && history.state?.[routeKey]?.key === currentKey) {
    history.replaceState({ ...history.state, [routeKey]: { key: currentKey, ...position } }, "")
    if (document.body.dataset.slug === "index") {
      lists.set(currentUrl.pathname + currentUrl.search, { position, limit: history.state?.__notebookList?.limit || 24 })
      while (lists.size > 20) lists.delete(lists.keys().next().value!)
    }
  }
}
function adoptHistory() {
  const saved = history.state?.[routeKey]
  currentKey = typeof saved?.key === "string" ? saved.key : newKey()
  if (!positions.has(currentKey)) positions.set(currentKey, {
    x: Number.isFinite(saved?.x) ? saved.x : 0,
    y: Number.isFinite(saved?.y) ? saved.y : 0,
  })
  history.replaceState({ ...history.state, [routeKey]: { key: currentKey, ...positions.get(currentKey) } }, "")
}
function commitRoute(url: URL, replace = false) {
  rememberScroll()
  if (replace) {
    history.replaceState({ ...history.state }, "", url)
  } else if (url.href !== currentUrl.href) {
    currentKey = newKey()
    positions.set(currentKey, { x: 0, y: 0 })
    const state = { ...history.state, [routeKey]: { key: currentKey, x: 0, y: 0 } }
    delete state.__notebookList
    history.pushState(state, "", url)
  }
  currentUrl = new URL(url)
}
Object.assign(window, {
  notebookSetRoute(value: string | URL, options: { replace?: boolean } = {}) {
    if (navigating && !swapping) {
      sequence++
      controller?.abort()
      navigating = false
      delete document.documentElement.dataset.navigating
      document.querySelector(".center")?.removeAttribute("aria-busy")
    }
    commitRoute(new URL(value, location.href), options.replace)
  },
})
history.scrollRestoration = "manual"
const initialPosition = history.state?.[routeKey]
const initialNavigation = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type
adoptHistory()

function normalizeLinks(root: Document | Element, base: string | URL) {
  for (const attribute of ["href", "src", "poster", "action"]) {
    root.querySelectorAll(`[${attribute}]`).forEach(element => {
      const value = element.getAttribute(attribute)!
      if (value.startsWith("#") || /^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value)) return
      try { element.setAttribute(attribute, new URL(value, base).href) } catch { /* Preserve authored values. */ }
    })
  }
  root.querySelectorAll("[srcset]").forEach(element => {
    const value = element.getAttribute("srcset")!
    if (value.includes("data:")) return
    element.setAttribute("srcset", value.split(",").map(candidate => {
      const [source, ...descriptor] = candidate.trim().split(/\s+/)
      try { return [new URL(source, base).href, ...descriptor].join(" ") } catch { return candidate }
    }).join(", "))
  })
}
normalizeLinks(document, currentUrl)

function isPage(url: URL) {
  return url.origin === home.origin && url.pathname.startsWith(home.pathname)
    && (url.pathname.endsWith("/") || url.pathname.endsWith(".html") || !url.pathname.split("/").pop()!.includes("."))
}
function cacheKey(url: URL) { return url.origin + url.pathname }
function cachePage(key: string, page: CachedPage) {
  pages.delete(key)
  pages.set(key, page)
  while (pages.size > 10) pages.delete(pages.keys().next().value!)
}
async function loadPage(url: URL, signal?: AbortSignal, redirects = 0): Promise<CachedPage> {
  const key = cacheKey(url)
  const cached = pages.get(key)
  if (cached && Date.now() - cached.time < 60_000) {
    cachePage(key, cached)
    return cached
  }
  const pending = pendingPages.get(key)
  if (pending && !pending.signal?.aborted) return pending.promise
  const promise = (async () => {
    const response = await fetch(key, { signal, cache: "no-cache", credentials: "same-origin" })
    if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) throw new Error("Not an HTML page")
    const text = await response.text()
    const document = parser.parseFromString(text, "text/html")
    if (!document.querySelector("#quartz-body > .center")) {
      const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.getAttribute("href")
      const destination = canonical && new URL(canonical, response.url)
      if (destination && isPage(destination) && redirects < 2 && cacheKey(destination) !== key) {
        const resolved = await loadPage(destination, signal, redirects + 1)
        const finalUrl = new URL(resolved.url)
        if (!finalUrl.search) finalUrl.search = destination.search
        if (!finalUrl.hash) finalUrl.hash = destination.hash
        const page = { ...resolved, url: finalUrl.href }
        cachePage(key, page)
        return page
      }
      throw new Error("Not a notebook page")
    }
    const page = { text, url: response.url, time: Date.now() }
    cachePage(key, page)
    return page
  })()
  pendingPages.set(key, { promise, signal })
  try { return await promise } finally {
    if (pendingPages.get(key)?.promise === promise) pendingPages.delete(key)
  }
}
function assetVersions(document: Document, base: string | URL) {
  return [...document.querySelectorAll('link[rel="stylesheet"],script[src]')].map(element =>
    new URL(element.getAttribute(element.tagName === "SCRIPT" ? "src" : "href")!, base).href,
  ).sort().join("\n")
}
const assets = assetVersions(document, currentUrl)
function explorerRevision(document: Document) {
  return [...document.querySelectorAll('.topic-tree .topic-children a')].map(link => `${link.getAttribute("href")} ${link.textContent}`).join("\n")
}
const explorer = explorerRevision(document)
const metadataSelector = 'meta[name="description"],meta[name^="twitter:"],meta[property^="og:"],meta[property^="twitter:"],link[rel="canonical"]'
function updateHead(incoming: Document) {
  document.title = incoming.title
  document.head.querySelectorAll(metadataSelector).forEach(element => element.remove())
  incoming.head.querySelectorAll(metadataSelector).forEach(element => document.head.append(element))
}
function notifyNav() {
  document.dispatchEvent(new CustomEvent("nav", { detail: { url: getFullSlug(window) } }))
}
const announcer = document.createElement("div")
announcer.className = "navigation-announcer"
announcer.setAttribute("role", "status")
announcer.setAttribute("aria-live", "polite")
announcer.setAttribute("aria-atomic", "true")
document.body.append(announcer)

function scrollToRoute(url: URL, position?: Position) {
  if (position) { window.scrollTo(position.x, position.y); return }
  if (url.hash) {
    try {
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
      if (target) { target.scrollIntoView(); if (target.id === "main-content") target.focus({ preventScroll: true }); return }
    } catch { /* Invalid escapes should not interrupt navigation. */ }
  }
  window.scrollTo(0, 0)
}
const frame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
async function ready(id: number, timeout = 2000, signal?: AbortSignal) {
  await Promise.resolve()
  const start = performance.now()
  while (id === sequence && !signal?.aborted && document.querySelector('.lab-explorer:not([data-ready="true"])') && performance.now() - start < timeout) await frame()
  await frame()
}
function swapContent(incoming: Document) {
  const body = document.querySelector("#quartz-body")!
  const center = body.querySelector(":scope > .center")!
  const nextCenter = incoming.querySelector("#quartz-body > .center")!
  const header = center.querySelector(".notebook-nav")!
  const nextHeader = nextCenter.querySelector(".notebook-nav")!
  if (!header || !nextHeader || !incoming.body.dataset.slug) throw new Error("Missing notebook layout")
  // No await between these operations: the existing header never paints detached.
  nextHeader.replaceWith(header)
  center.replaceWith(nextCenter)
  for (const selector of [":scope > .sidebar.right", ":scope > footer"]) {
    const previous = body.querySelector(selector)
    const next = incoming.querySelector("#quartz-body")!.querySelector(selector)
    if (previous && next) previous.replaceWith(next)
    else if (previous) previous.remove()
    else if (next) body.append(next)
  }
  document.body.dataset.slug = incoming.body.dataset.slug
  updateHead(incoming)
}
async function navigate(url: URL, isBack = false, keepFocus = false, returnToList = false) {
  if (!isPage(url)) { location.assign(url); return }
  const id = ++sequence
  controller?.abort()
  controller = new AbortController()
  const signal = controller.signal
  const outgoingUrl = new URL(currentUrl)
  if (isBack) { if (!navigating) rememberScroll(false); adoptHistory() }
  else rememberScroll()
  let restore = isBack ? positions.get(currentKey) : undefined
  navigating = true
  const progress = setTimeout(() => {
    if (id !== sequence) return
    document.documentElement.dataset.navigating = "true"
    document.querySelector(".center")?.setAttribute("aria-busy", "true")
  }, 180)
  try {
    const sameDocument = url.pathname === outgoingUrl.pathname
    const sameQuery = url.search === outgoingUrl.search
    if (sameDocument && (sameQuery || document.body.dataset.slug === "index")) {
      swapping = true
      if (!isBack) commitRoute(url)
      else currentUrl = new URL(url)
      if (!sameQuery) document.dispatchEvent(new CustomEvent("notebook:route-update"))
      await ready(id)
      if (id !== sequence) return
      if (isBack || sameQuery) scrollToRoute(url, restore)
      announcer.textContent = document.querySelector(".library-title")?.textContent || document.title
      return
    }
    const page = await loadPage(url, signal)
    if (id !== sequence || signal.aborted) return
    const incoming = parser.parseFromString(page.text, "text/html")
    // A deployment can replace the entire site. Load its matching CSS/JS together.
    if (assetVersions(incoming, page.url) !== assets) { location.assign(url); return }
    normalizeLinks(incoming, page.url)
    if (explorerRevision(incoming) !== explorer) { location.assign(url); return }
    const resolved = new URL(page.url)
    if (resolved.pathname !== url.pathname) {
      if (!resolved.search) resolved.search = url.search
      if (!resolved.hash) resolved.hash = url.hash
      url = resolved
      if (isBack) history.replaceState(history.state, "", url)
    }
    const previousList = lists.get(url.pathname + url.search)
    swapping = true
    document.dispatchEvent(new CustomEvent("prenav", { detail: {} }))
    cleanupFns.forEach(fn => { try { fn() } catch (error) { console.error("Navigation cleanup:", error) } })
    cleanupFns.clear()
    // Save the pristine response, never an already-enhanced or searched DOM tree.
    if (!isBack) commitRoute(url)
    else currentUrl = new URL(url)
    if (!isBack && returnToList && incoming.body.dataset.slug === "index" && previousList) {
      history.replaceState({ ...history.state, __notebookList: { limit: previousList.limit } }, "")
      restore = previousList.position
    }
    swapContent(incoming)
    notifyNav()
    if (!isBack && !url.hash) window.scrollTo(0, 0)
    await ready(id)
    if (id !== sequence) return
    scrollToRoute(url, restore)
    if (!isBack && !keepFocus) document.getElementById("main-content")?.focus({ preventScroll: true })
    announcer.textContent = document.querySelector(".article-title,.library-title")?.textContent || document.title
  } catch (error) {
    if (id === sequence && !signal.aborted) location.assign(url)
  } finally {
    clearTimeout(progress)
    if (id === sequence) {
      navigating = false
      swapping = false
      delete document.documentElement.dataset.navigating
      document.querySelector(".center")?.removeAttribute("aria-busy")
      rememberScroll()
      document.dispatchEvent(new CustomEvent("notebook:navigation-end"))
    }
  }
}
window.spaNavigate = (url: URL, isBack = false) => navigate(new URL(url, location.href), isBack)

function anchorFrom(event: Event) {
  const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null
  if (!anchor || anchor.hasAttribute("download") || (anchor.target && anchor.target !== "_self") || "routerIgnore" in anchor.dataset) return
  const url = new URL(anchor.href)
  return isPage(url) ? { anchor, url } : undefined
}
document.addEventListener("click", event => {
  if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return
  const target = anchorFrom(event)
  if (!target) return
  event.preventDefault()
  void navigate(target.url, false, !!target.anchor.closest(".sidebar.left"), target.anchor.hasAttribute("data-note-return"))
})
window.addEventListener("popstate", () => { void navigate(new URL(location.href), true) })
window.addEventListener("scroll", () => {
  if (navigating || restoringInitial || scrollFrame) return
  scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; if (!navigating && !restoringInitial) rememberScroll() })
}, { passive: true })
window.addEventListener("pagehide", () => rememberScroll())

function prefetch(event: Event) {
  clearTimeout(prefetchTimer)
  const target = anchorFrom(event)
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean, effectiveType?: string } }).connection
  if (!target || connection?.saveData || connection?.effectiveType?.includes("2g") || pendingPages.size >= 2) return
  if (cacheKey(target.url) === cacheKey(currentUrl)) return
  prefetchTimer = setTimeout(() => { void loadPage(target.url).catch(() => {}) }, 90)
}
document.addEventListener("pointerover", prefetch, { passive: true })
document.addEventListener("focusin", prefetch)
// Global components have registered their listeners before this router executes.
notifyNav()
if (initialPosition && (initialNavigation === "reload" || initialNavigation === "back_forward")) {
  restoringInitial = true
  const interaction = new AbortController()
  const initialSequence = sequence
  const cancel = () => { restoringInitial = false; interaction.abort(); rememberScroll() }
  for (const event of ["pointerdown", "touchstart", "wheel", "keydown"]) {
    window.addEventListener(event, cancel, { capture: true, passive: true, signal: interaction.signal })
  }
  void (async () => {
    await ready(initialSequence, 10_000, interaction.signal)
    if (initialSequence === sequence && !interaction.signal.aborted) {
      scrollToRoute(new URL(location.href), { x: initialPosition.x || 0, y: initialPosition.y || 0 })
    }
    restoringInitial = false
    interaction.abort()
    if (initialSequence === sequence) rememberScroll()
  })()
}
// Reuse the initial page on the first Back without caching an enhanced DOM tree.
const initialUrl = new URL(location.href)
setTimeout(() => {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (!connection?.saveData) void loadPage(initialUrl).catch(() => {})
}, 250)
