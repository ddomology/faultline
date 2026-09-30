import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { rememberListLocation } from '../lib/navigation-state'
import { useHydrated } from '../lib/use-hydrated'

// Run before React Router's initial saved-position script. Without JavaScript
// this attribute is never set, so static readers retain normal anchoring.
const prepareInitialScroll = "document.documentElement.setAttribute('data-initial-scroll', 'pending')"

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
      if (mounted) document.documentElement.removeAttribute('data-initial-scroll')
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
