import type { Catalog, NoteMeta, View } from './types'
import { getConceptTag, normalizeConceptTags } from './concept-tags.ts'

export const PAGE_SIZE = 24
export const LEVEL_NAMES: Record<string, string> = { Apprentice: '입문', Practitioner: '실전', Expert: '심화' }
const levels: Record<string, number> = { Apprentice: 0, Practitioner: 1, Expert: 2 }
const sorts = ['number', 'recent', 'title', 'difficulty'] as const
export type LibrarySort = typeof sorts[number]
export interface LibraryQuery {
  view: View
  query: string
  topic: string
  tag: string
  level: string
  sort: LibrarySort
  limit: number
}

export function readLibraryQuery(params: URLSearchParams, total = Number.MAX_SAFE_INTEGER): LibraryQuery {
  const sort = params.get('sort')
  const level = params.get('level') || 'all'
  const requested = Number(params.get('limit'))
  const view = params.get('view') === 'concepts' ? 'concepts' : 'notes'
  return {
    view,
    query: params.get('q') || '',
    topic: params.get('topic') || 'all',
    tag: view === 'concepts' ? normalizeConceptTags(params.get('tag'))[0] || '' : '',
    level: Object.hasOwn(levels, level) ? level : 'all',
    sort: sorts.includes(sort as LibrarySort) ? sort as LibrarySort : 'number',
    limit: Number.isSafeInteger(requested) && requested >= PAGE_SIZE
      ? Math.min(requested, Math.max(PAGE_SIZE, total)) : PAGE_SIZE,
  }
}

export function writeLibraryQuery(query: LibraryQuery): URLSearchParams {
  const params = new URLSearchParams()
  if (query.view === 'concepts') params.set('view', query.view)
  if (query.query) params.set('q', query.query)
  if (query.topic !== 'all') params.set('topic', query.topic)
  const tag = query.view === 'concepts' ? normalizeConceptTags(query.tag)[0] : ''
  if (tag) params.set('tag', tag)
  if (query.level !== 'all') params.set('level', query.level)
  if (query.sort !== 'number') params.set('sort', query.sort)
  if (query.limit > PAGE_SIZE) params.set('limit', String(query.limit))
  return params
}

export function libraryHref(query: LibraryQuery): string {
  const search = writeLibraryQuery(query).toString()
  return search ? `/?${search}` : '/'
}

export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase('ko').replace(/\s+/g, ' ').trim()
}

const dateFormatter = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' })
export function formatUpdatedDate(value: string): string {
  const date = new Date(value)
  return Number.isFinite(date.getTime()) ? dateFormatter.format(date).replaceAll('-', '.') : ''
}

function searchableText(note: NoteMeta): string {
  const title = `${note.title} ${note.originalTitle}`
  const aliases = [
    /oracle/i.test(title) ? '오라클' : '',
    /mysql/i.test(title) ? '마이에스큐엘' : '',
    /microsoft/i.test(title) ? '마이크로소프트' : '',
    /login/i.test(title) ? '로그인' : '',
    /bypass/i.test(title) ? '우회' : '',
    /hidden/i.test(title) ? '숨김 숨겨진' : '',
  ]
  const tags = note.view === 'concepts' ? normalizeConceptTags(note.tags).flatMap(value => {
    const tag = getConceptTag(value)
    return tag ? [tag.id, tag.label, ...tag.aliases] : [value]
  }) : []
  return normalizeSearch([
    note.number, title, note.explorerTitle, note.category, note.categoryTitle,
    note.difficulty, LEVEL_NAMES[note.difficulty] || '', note.searchText || '', ...aliases, ...tags,
  ].join(' '))
}

const searchCache = new WeakMap<NoteMeta, string>()
function searchText(note: NoteMeta): string {
  let value = searchCache.get(note)
  if (value === undefined) { value = searchableText(note); searchCache.set(note, value) }
  return value
}

export function filterLibrary(catalog: Catalog, query: LibraryQuery): NoteMeta[] {
  const tokens = normalizeSearch(query.query).split(' ').filter(Boolean).map(token => /^#\d/.test(token) ? token.slice(1) : token)
  const tag = query.view === 'concepts' ? normalizeConceptTags(query.tag)[0] : ''
  const categoryOrder = new Map(catalog.categories.map((category, index) => [category.id, index]))
  const numberOrder = (a: NoteMeta, b: NoteMeta) => a.number.localeCompare(b.number, 'en', { numeric: true }) || a.routePath.localeCompare(b.routePath, 'en')
  const updated = (note: NoteMeta) => {
    const value = Date.parse(note.updatedAt || '')
    return Number.isFinite(value) ? value : 0
  }
  return catalog.notes.filter(note => note.view === query.view
    && (query.topic === 'all' || note.category === query.topic)
    && (query.level === 'all' || note.difficulty === query.level)
    && (!tag || normalizeConceptTags(note.tags).some(value => normalizeSearch(value) === normalizeSearch(tag)))
    && tokens.every(token => searchText(note).includes(token)))
    .sort((a, b) => {
      const groupOrder = (categoryOrder.get(a.category) ?? Number.MAX_SAFE_INTEGER) - (categoryOrder.get(b.category) ?? Number.MAX_SAFE_INTEGER)
      if (groupOrder) return groupOrder
      if (a.category !== b.category) return a.category.localeCompare(b.category, 'ko')
      if (query.sort === 'recent') return updated(b) - updated(a) || numberOrder(a, b)
      if (query.sort === 'difficulty') return (levels[a.difficulty] ?? 3) - (levels[b.difficulty] ?? 3) || numberOrder(a, b)
      if (query.sort === 'title') return a.title.localeCompare(b.title, 'ko') || numberOrder(a, b)
      return numberOrder(a, b)
    })
}

export function hasLibraryFilters(query: LibraryQuery): boolean {
  return !!query.query || query.topic !== 'all' || query.level !== 'all' || query.sort !== 'number'
    || (query.view === 'concepts' && !!normalizeConceptTags(query.tag).length)
}

export function resetLibraryQuery(view: View): LibraryQuery {
  return { view, query: '', topic: 'all', tag: '', level: 'all', sort: 'number', limit: PAGE_SIZE }
}
