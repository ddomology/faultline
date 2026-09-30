import test from 'node:test'
import assert from 'node:assert/strict'
import { filterLibrary, formatUpdatedDate, hasLibraryFilters, libraryHref, normalizeSearch, readLibraryQuery, resetLibraryQuery, writeLibraryQuery } from '../app/lib/library-query.ts'

const base = { slug: '', originalTitle: '', explorerTitle: '', category: 'a', categoryTitle: '웹 보안', difficulty: 'Apprentice', noteKind: 'solution', labUrl: '', view: 'notes', sourcePath: '', updatedAt: null, searchText: '' }
const note = (id, extra = {}) => ({ ...base, title: id, number: id, routePath: `/${id}.html`, ...extra })
const catalog = {
  brand: { name: 'Faultline', tagline: '', description: '' }, counts: { notes: 5, concepts: 1 },
  categories: [{ id: 'a', title: '웹 보안', number: '01', count: 4 }, { id: 'b', title: '다른 주제', number: '02', count: 1 }],
  notes: [
    note('01.03', { title: '다 문서', originalTitle: 'Oracle login overview', difficulty: 'Expert', updatedAt: '2026-09-30T01:00:00Z', searchText: '본문에만 있는 관찰기록' }),
    note('01.02', { title: '나 문서', difficulty: 'Practitioner', updatedAt: '2026-09-29T14:00:00Z' }),
    note('02.01', { title: '가 다른 주제', category: 'b', categoryTitle: '다른 주제', updatedAt: '2026-10-01T00:00:00Z' }),
    note('01.01', { title: '가 문서', originalTitle: 'Hidden data notes', updatedAt: 'invalid' }),
    note('01.04', { title: '라 문서', difficulty: '', updatedAt: null }),
    note('01.05', { title: '개념 기초', view: 'concepts' }),
  ],
}
const query = patch => ({ ...resetLibraryQuery('notes'), ...patch })
const ids = patch => filterLibrary(catalog, query(patch)).map(note => note.number)

test('legacy all/saved view and invalid enum/limit safely return known defaults', () => {
  assert.deepEqual(readLibraryQuery(new URLSearchParams('view=all&level=nope&sort=nope&limit=-3')), resetLibraryQuery('notes'))
  assert.equal(readLibraryQuery(new URLSearchParams('view=saved')).view, 'notes')
  assert.equal(readLibraryQuery(new URLSearchParams('limit=9007199254740992')).limit, 24)
  assert.equal(readLibraryQuery(new URLSearchParams('limit=48.5')).limit, 24)
  assert.equal(readLibraryQuery(new URLSearchParams('limit=999'), 273).limit, 273)
  assert.equal(readLibraryQuery(new URLSearchParams('limit=48'), 0).limit, 24)
})

test('query parameters round-trip Korean, reserved characters, filters and list length', () => {
  const state = query({ view: 'concepts', query: '관찰 & C++ #01.03', topic: 'a', level: 'Expert', sort: 'recent', limit: 48 })
  assert.deepEqual(readLibraryQuery(writeLibraryQuery(state)), state)
  assert.equal(libraryHref(resetLibraryQuery('notes')), '/')
  assert.equal(libraryHref(resetLibraryQuery('concepts')), '/?view=concepts')
  assert.equal(hasLibraryFilters(resetLibraryQuery('notes')), false)
  assert.equal(hasLibraryFilters(query({ limit: 48 })), false)
  assert.equal(hasLibraryFilters(query({ sort: 'recent' })), true)
})

test('search handles normalized English, Korean aliases, body text and note numbers', () => {
  assert.equal(normalizeSearch(' ＯＲＡＣＬＥ  기록\n'), 'oracle 기록')
  assert.deepEqual(ids({ query: 'ＯＲＡＣＬＥ' }), ['01.03'])
  assert.deepEqual(ids({ query: '오라클 로그인' }), ['01.03'])
  assert.deepEqual(ids({ query: '관찰기록' }), ['01.03'])
  assert.deepEqual(ids({ query: '#01.03' }), ['01.03'])
  assert.deepEqual(ids({ query: '웹 보안 심화' }), ['01.03'])
  assert.deepEqual(ids({ query: '숨겨진' }), ['01.01'])
  assert.deepEqual(ids({ query: '오라클 없는문자' }), [])
})

test('view, topic, level and keywords intersect without mutating catalog order', () => {
  const before = catalog.notes.map(note => note.number)
  assert.deepEqual(ids({ topic: 'a', level: 'Practitioner', query: '문서' }), ['01.02'])
  assert.deepEqual(ids({ topic: 'b', level: 'Expert' }), [])
  assert.deepEqual(ids({ topic: 'unknown' }), [])
  assert.deepEqual(ids({ view: 'concepts' }), ['01.05'])
  assert.deepEqual(catalog.notes.map(note => note.number), before)
})

test('all sort modes preserve category groups and use stable number fallbacks', () => {
  assert.deepEqual(ids({ sort: 'number' }), ['01.01', '01.02', '01.03', '01.04', '02.01'])
  assert.deepEqual(ids({ sort: 'recent' }), ['01.03', '01.02', '01.01', '01.04', '02.01'])
  assert.deepEqual(ids({ sort: 'difficulty' }), ['01.01', '01.02', '01.03', '01.04', '02.01'])
  assert.deepEqual(ids({ sort: 'title' }), ['01.01', '01.02', '01.03', '01.04', '02.01'])
})

test('displayed update date uses Korea time independently of build or browser zone', () => {
  assert.equal(formatUpdatedDate('2026-09-30T23:00:00Z'), '2026.10.01')
  assert.equal(formatUpdatedDate('2026-10-01T01:00:00+09:00'), '2026.10.01')
  assert.equal(formatUpdatedDate('invalid'), '')
})
