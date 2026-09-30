import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { rememberListLocation } from '../lib/navigation-state'
import { useHydrated } from '../lib/use-hydrated'

// The static home has 24 rows even when a saved URL asks for 48+. Reserve
// enough height for the router's initial restoration; WebKit otherwise clamps
// the saved position before those additional rows hydrate. This never scrolls.
const prepareInitialScroll = "document.documentElement.setAttribute('data-initial-scroll','pending');history.scrollRestoration='manual';try{const y=JSON.parse(sessionStorage.getItem('react-router-scroll-positions')||'{}')[history.state?.key];if(Number.isFinite(y)&&y>0&&y<1e7)document.documentElement.style.setProperty('--initial-scroll-height',(y+innerHeight)+'px')}catch{}"

/** React Router's ScrollRestoration owns document scroll. This component does
 * not scroll on resize, visibility changes, or delayed content callbacks. */
export default function NavigationState() {
  const location = useLocation()
  const hydrated = useHydrated()
  const previousPath = useRef(location.pathname)
  useEffect(() => {
    if (!hydrated) return
    let mounted = true
    // Query hydration may add rows whose Korean glyphs load another font
    // subset. Native scroll anchoring must not offset an already restored
    // pixel position during that first font swap. This never calls scrollTo.
    void document.fonts.ready.then(() => {
      if (mounted) {
        document.documentElement.style.removeProperty('--initial-scroll-height')
        document.documentElement.removeAttribute('data-initial-scroll')
      }
    })
    return () => { mounted = false }
  }, [hydrated])
  useEffect(() => {
    if (location.pathname === '/') {
      const view = new URLSearchParams(location.search).get('view') === 'concepts' ? 'concepts' : 'notes'
      rememberListLocation(location.pathname + location.search, view)
    }
    if (previousPath.current !== location.pathname) {
      document.getElementById('main-content')?.focus({ preventScroll: true })
      previousPath.current = location.pathname
    }
  }, [location.key, location.pathname, location.search])
  return <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: prepareInitialScroll }} />
}
