import { useSyncExternalStore } from 'react'
const subscribe = () => () => {}
// Static hosts serve the same index.html for every query. Hydrate its default
// markup first, then apply the browser's filters without an SSR mismatch.
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false)
}
