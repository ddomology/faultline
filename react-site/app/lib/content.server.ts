// Generated articles are build/server inputs, never one large client JS bundle.
import catalogData from '../../.generated/catalog.json'
import noteData from '../../.generated/notes.json'
import type { Catalog, Note } from './types'
export const catalog = catalogData as Catalog
const notes = noteData as Record<string, Note>
export function getNote(path: string): Note | undefined {
  const normalized = path.replace(/\/$/, '')
  const canonicalPath = normalized.endsWith('.html') ? normalized : normalized + '.html'
  return notes[canonicalPath]
}
