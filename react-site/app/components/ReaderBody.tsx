import { Children, Fragment, cloneElement, createContext, createElement, isValidElement, useContext, useEffect, useMemo, useRef, useState, type ComponentProps, type ReactElement } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { Link, useLocation } from 'react-router'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import type { Element, Root } from 'hast'
import { useHydrated } from '../lib/use-hydrated'
import { languageNames } from '../lib/code-language'

type CodeRecord = { source: string; formatted: string | null; initial?: 'source' | 'formatted'; language: string; fragment: boolean }
declare module 'hast' {
  interface ElementData { readerCode?: CodeRecord; readerImage?: boolean }
}
type Zoom = { src: string; alt: string; trigger: HTMLButtonElement }
const ReaderContext = createContext<{ returnTo: string; openImage: (image: Zoom) => void }>({ returnTo: '/', openImage: () => {} })

function useOverflow(ref: React.RefObject<HTMLElement | null>, selector?: string, dependency?: unknown) {
  const [overflow, setOverflow] = useState(false)
  useEffect(() => {
    const container = ref.current
    if (!container) return
    const target = selector ? container.querySelector<HTMLElement>(selector) : container
    if (!target) return
    let disposed = false
    const update = () => { if (!disposed) setOverflow(target.scrollWidth > target.clientWidth + 1) }
    const observer = new ResizeObserver(update)
    observer.observe(container)
    observer.observe(target)
    document.fonts.addEventListener('loadingdone', update)
    void document.fonts.ready.then(update)
    update()
    return () => { disposed = true; observer.disconnect(); document.fonts.removeEventListener('loadingdone', update) }
  }, [ref, selector, dependency])
  return overflow
}

function CodeBlock({ node, children, ...props }: ComponentProps<'pre'> & { node?: Element }) {
  const record = node?.data?.readerCode as CodeRecord | undefined
  const [view, setView] = useState(record?.initial || 'source')
  const [wrapped, setWrapped] = useState(false)
  const [feedback, setFeedback] = useState('복사')
  const pre = useRef<HTMLPreElement>(null)
  const copySequence = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const hydrated = useHydrated()
  const overflowing = useOverflow(pre, 'code:not([hidden])', view)
  useEffect(() => () => { copySequence.current++; clearTimeout(timer.current) }, [])
  if (!record) return <pre {...props}>{children}</pre>
  const language = languageNames[record.language] || record.language
  const selectView = (next: 'source' | 'formatted') => {
    copySequence.current++; clearTimeout(timer.current); setFeedback('복사'); setView(next)
  }
  const copy = async () => {
    const sequence = ++copySequence.current
    clearTimeout(timer.current)
    try {
      await navigator.clipboard.writeText(view === 'formatted' ? record.formatted! : record.source)
      if (sequence !== copySequence.current) return
      setFeedback('복사됨')
    } catch {
      if (sequence !== copySequence.current) return
      setFeedback('복사 실패')
    }
    timer.current = setTimeout(() => setFeedback('복사'), 2000)
  }
  return <pre {...props} ref={pre} className={wrapped ? 'is-wrapped' : undefined}>
    <div className="code-toolbar">
      <span className="code-language">{language}{record.fragment ? ' · 조각' : ''}</span>
      <div className="code-actions" data-ready={hydrated} style={{ visibility: hydrated ? undefined : 'hidden' }}>
        {record.formatted !== null && <div className="code-view-switch" role="group" aria-label="코드 표시">
          <button type="button" className="code-view-button" aria-label="원문 보기" aria-pressed={view === 'source'} onClick={() => selectView('source')}>원문</button>
          <button type="button" className="code-view-button" aria-label="정렬해서 보기" aria-pressed={view === 'formatted'} onClick={() => selectView('formatted')}>정렬</button>
        </div>}
        <button type="button" className="code-wrap-button" style={{ visibility: !hydrated || (!wrapped && !overflowing) ? 'hidden' : undefined }} aria-label="긴 코드 줄바꿈" aria-pressed={wrapped} onClick={() => { if (!wrapped) pre.current?.querySelector('code:not([hidden])')?.scrollTo({ left: 0 }); setWrapped(!wrapped) }}>줄바꿈</button>
        <button type="button" className="clipboard-button" aria-label={view === 'formatted' ? '정렬본 복사' : '원문 복사'} onClick={copy}>
          <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V4H4v12h4"/></svg>
          <span className="clipboard-feedback" aria-live="polite">{feedback}</span>
        </button>
      </div>
    </div>
    {Children.map(children, child => {
      if (!isValidElement(child) || child.type !== 'code') return child
      const code = child as ReactElement<ComponentProps<'code'> & { 'data-reader-view'?: string }>
      const active = (code.props['data-reader-view'] || 'source') === view
      return cloneElement(code, { hidden: !active, tabIndex: active && overflowing ? 0 : undefined, 'aria-label': active && overflowing ? `${language} 코드, 가로로 스크롤 가능` : undefined })
    })}
  </pre>
}

function ReaderImage({ node, ...props }: ComponentProps<'img'> & { node?: Element }) {
  const { openImage } = useContext(ReaderContext)
  const hydrated = useHydrated()
  const image = <img {...props} />
  if (!node?.data?.readerImage) return image
  return <button type="button" className="reader-image-trigger" disabled={!hydrated} aria-haspopup="dialog" aria-label={`이미지 크게 보기${props.alt ? ': ' + props.alt : ''}`} onClick={event => {
    const trigger = event.currentTarget
    const source = trigger.querySelector('img')!
    openImage({ src: source.currentSrc || source.src, alt: source.alt, trigger })
  }}>{image}</button>
}

function ReaderLink({ node: _node, href, children, ...props }: ComponentProps<'a'> & { node?: Element }) {
  const { returnTo } = useContext(ReaderContext)
  const base = import.meta.env.BASE_URL
  if (href?.startsWith(base) && !props.download && !props.target) {
    return <Link {...props} to={'/' + href.slice(base.length)} state={{ fromList: returnTo }}>{children}</Link>
  }
  if (href?.startsWith('#')) return <Link {...props} to={href} preventScrollReset state={{ fromList: returnTo }}>{children}</Link>
  return <a {...props} href={href}>{children}</a>
}

function ReaderDiv({ node: _node, children, ...props }: ComponentProps<'div'> & { node?: Element }) {
  const ref = useRef<HTMLDivElement>(null)
  const overflow = useOverflow(ref, props.className === 'table-container' ? undefined : ':scope > table')
  return <div {...props} ref={ref} {...(props.className === 'table-container' && overflow ? { tabIndex: 0, role: 'region', 'aria-label': '표, 가로로 스크롤 가능' } : {})}>{children}</div>
}

const heading = (tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => function ReaderHeading({ node: _node, children, ...props }: ComponentProps<'h2'> & { node?: Element }) {
  const { returnTo } = useContext(ReaderContext)
  return createElement(tag, props, children, props.id && <Link to={'#' + encodeURIComponent(props.id)} state={{ fromList: returnTo }} preventScrollReset className="heading-anchor" aria-label={`${props.id.replaceAll('-', ' ')} 제목 링크`}>#</Link>)
}
const components = { pre: CodeBlock, img: ReaderImage, a: ReaderLink, div: ReaderDiv, h1: heading('h1'), h2: heading('h2'), h3: heading('h3'), h4: heading('h4'), h5: heading('h5'), h6: heading('h6') }

function Lightbox({ image, close }: { image: Zoom; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const backdropDown = useRef(false)
  const backdrop = (event: React.PointerEvent | React.MouseEvent) => {
    const box = dialog.current!.getBoundingClientRect()
    return event.target === dialog.current && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)
  }
  useEffect(() => {
    const element = dialog.current!
    const root = document.documentElement
    const overflow = root.style.overflow
    element.showModal()
    root.style.overflow = 'hidden'
    return () => {
      element.close()
      root.style.overflow = overflow
      if (image.trigger.isConnected) image.trigger.focus({ preventScroll: true })
    }
  }, [image])
  return <dialog ref={dialog} className="reader-lightbox" aria-label="이미지 크게 보기" onCancel={event => { event.preventDefault(); close() }} onPointerDown={event => { backdropDown.current = backdrop(event) }} onClick={event => { if (backdropDown.current && backdrop(event)) close(); backdropDown.current = false }}>
    <div className="reader-lightbox-toolbar"><span>이미지 크게 보기</span><button type="button" className="reader-lightbox-close" autoFocus onClick={close}>닫기</button></div>
    <figure className="reader-lightbox-figure"><img className="reader-lightbox-image" src={image.src} alt={image.alt}/>{image.alt && <figcaption>{image.alt}</figcaption>}</figure>
  </dialog>
}

export default function ReaderBody({ body, sourcePath, returnTo }: { body: Root; sourcePath: string; returnTo: string }) {
  const [image, setImage] = useState<Zoom | null>(null)
  const location = useLocation()
  useEffect(() => { setImage(null) }, [location.key])
  const content = useMemo(() => toJsxRuntime(body, { Fragment, jsx, jsxs, components, passNode: true }), [body])
  return <ReaderContext.Provider value={{ returnTo, openImage: setImage }}>
    <article data-note-source={sourcePath}>{content}</article>
    {image && <Lightbox image={image} close={() => setImage(null)} />}
  </ReaderContext.Provider>
}
