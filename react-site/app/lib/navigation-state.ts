import { useLocation } from 'react-router'
import { useHydrated } from './use-hydrated'
import type { View } from './types'

const listKey = (view: View) => `faultline:last-list:${view}`

export function validListLocation(value: unknown, view: View): string | undefined {
  if (typeof value !== 'string' || !/^\/(?:\?|$)/.test(value) || value.includes('#')) return
  const params = new URLSearchParams(value.slice(1))
  if ((params.get('view') === 'concepts' ? 'concepts' : 'notes') !== view) return
  return value
}

export function rememberListLocation(value: string, view: View) {
  if (!validListLocation(value, view)) return
  try { sessionStorage.setItem(listKey(view), value) } catch { /* Navigation works without storage. */ }
}

export function useListReturn(view: View): string {
  const location = useLocation()
  const hydrated = useHydrated()
  if (hydrated) {
    const fromEntry = validListLocation(location.state?.fromList, view)
    if (fromEntry) return fromEntry
    try {
      const fromSession = validListLocation(sessionStorage.getItem(listKey(view)), view)
      if (fromSession) return fromSession
    } catch { /* Use the regular list if storage is unavailable. */ }
  }
  return view === 'concepts' ? '/?view=concepts' : '/'
}
