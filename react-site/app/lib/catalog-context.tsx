import { createContext, useContext, type ReactNode } from 'react'
import catalogData from '../../.generated/catalog.json'
import type { Catalog } from './types'

// Vite emits one shared, cacheable module. Do not return the entire catalog from
// a route loader: that would repeat it in every prerendered document and .data.
const catalog = catalogData as Catalog
const CatalogContext = createContext(catalog)
export function CatalogProvider({ children }: { children: ReactNode }) {
  return <CatalogContext.Provider value={catalog}>{children}</CatalogContext.Provider>
}
export function useCatalog() { return useContext(CatalogContext) }
