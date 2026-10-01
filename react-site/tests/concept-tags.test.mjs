import test from 'node:test'
import assert from 'node:assert/strict'
import { lstatSync, readFileSync } from 'node:fs'
import { conceptTags, conceptTagGroups, getConceptTag, normalizeConceptTags } from '../app/lib/concept-tags.ts'

test('every registered tag and alias resolves unambiguously to its canonical tag', () => {
  assert.ok(conceptTags.length > 0)
  assert.equal(new Set(conceptTags.map(tag => tag.id)).size, conceptTags.length)
  assert.equal(new Set(conceptTagGroups.map(group => group.id)).size, conceptTagGroups.length)
  const groups = new Set(conceptTagGroups.map(group => group.id))
  const validId = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  for (const group of conceptTagGroups) {
    assert.match(group.id, validId)
    assert.ok(group.label.trim(), `Missing group label: ${group.id}`)
  }
  for (const tag of conceptTags) {
    assert.match(tag.id, validId)
    assert.ok(tag.label.trim(), `Missing tag label: ${tag.id}`)
    assert.ok(groups.has(tag.group), `Unknown group for ${tag.id}`)
    assert.ok(Array.isArray(tag.aliases), `Invalid aliases for ${tag.id}`)
    for (const name of [tag.id, tag.label, ...tag.aliases]) {
      assert.equal(typeof name, 'string')
      assert.ok(name.trim(), `Empty alias for ${tag.id}`)
      assert.equal(getConceptTag(`  ${name.toUpperCase()}  `), tag, `Ambiguous alias: ${name}`)
    }
  }
})

test('each registered icon resolves to a titled 24px vector with nonempty geometry', () => {
  const assetRoot = new URL('../../site/assets/icons/', import.meta.url)
  const vectorElements = new Set(['svg', 'title', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon'])
  for (const tag of conceptTags) {
    assert.match(tag.icon, /^(?:topics|concepts)\/[a-z0-9]+(?:-[a-z0-9]+)*\.svg$/, `Invalid icon path for ${tag.id}`)
    const asset = new URL(tag.icon, assetRoot)
    assert.ok(lstatSync(asset).isFile(), `Icon must be a local file: ${tag.icon}`)
    const svg = readFileSync(asset, 'utf8')
    assert.match(svg, /<svg\b[^>]*\bviewBox=["']0\s+0\s+24\s+24["'][^>]*>/, `Wrong viewBox: ${tag.icon}`)
    assert.ok(svg.match(/<title\b[^>]*>([^<]+)<\/title>/)?.[1].trim(), `Missing title: ${tag.icon}`)
    assert.match(svg, /<\/svg>\s*$/, `Incomplete SVG: ${tag.icon}`)
    const elements = [...svg.matchAll(/<([\w:-]+)\b([^>]*)>/g)]
    assert.ok(elements.every(([, name]) => vectorElements.has(name)), `Unexpected non-vector element: ${tag.icon}`)
    assert.ok(!/\s(?:on[\w-]+|(?:xlink:)?href)\s*=/i.test(svg), `Interactive or external artwork: ${tag.icon}`)
    const hasGeometry = elements.some(([, name, raw]) => {
      const attributes = Object.fromEntries([...raw.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map(([, key, value]) => [key, value]))
      const positive = key => Number(attributes[key]) > 0
      if (name === 'path') return /[MLHVCSQTAZ]/i.test(attributes.d || '') && /\d/.test(attributes.d || '')
      if (name === 'rect') return positive('width') && positive('height')
      if (name === 'circle') return positive('r')
      if (name === 'ellipse') return positive('rx') && positive('ry')
      if (name === 'line') return Number(attributes.x1 || 0) !== Number(attributes.x2 || 0) || Number(attributes.y1 || 0) !== Number(attributes.y2 || 0)
      if (name === 'polyline' || name === 'polygon') return (attributes.points || '').trim().split(/[\s,]+/).filter(Boolean).length >= 4
      return false
    })
    assert.ok(hasGeometry, `Empty vector geometry: ${tag.icon}`)
  }
})

test('frontmatter tags normalize aliases and NFKC once without changing the author input', () => {
  const tag = conceptTags[0]
  const fullWidthId = tag.id.replace(/[!-~]/g, char => String.fromCodePoint(char.charCodeAt(0) + 0xfee0))
  const source = [tag.id, tag.label, ...tag.aliases, fullWidthId, '  내 노트 Ａ  ', '내 노트 A', '', null, 42, {}, ['nested']]
  const original = structuredClone(source)
  assert.deepEqual(normalizeConceptTags(source), [tag.id, '내 노트 A'])
  assert.deepEqual(source, original)
  assert.deepEqual(normalizeConceptTags(tag.label), [tag.id])
})

test('missing and unfamiliar tags stay safe, optional and author controlled', () => {
  for (const value of [undefined, null, false, 42, {}, ['', '  ']]) assert.deepEqual(normalizeConceptTags(value), [])
  assert.equal(getConceptTag('__proto__'), undefined)
  assert.equal(getConceptTag('constructor'), undefined)
  assert.deepEqual(normalizeConceptTags(['  내 주제 & C++  ', '내 주제 & c++', '<example>', '__proto__']), ['내 주제 & C++', '<example>', '__proto__'])
  assert.deepEqual(normalizeConceptTags('태그 하나, 쉼표 포함'), ['태그 하나, 쉼표 포함'])
})
