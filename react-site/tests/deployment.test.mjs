import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import vm from 'node:vm'
import { retainAssets, legacyBridge } from '../scripts/retain-assets.mjs'
import { legacyRedirects, redirectHtml, sitemapXml, feedXml } from '../scripts/site-metadata.mjs'
const descriptor = (path, text) => ({ path, bytes: Buffer.byteLength(text), sha256: createHash('sha256').update(text).digest('hex') })

function fixture(t, release = 'new') {
  const root = mkdtempSync(join(tmpdir(), 'faultline-release-'))
  t.after(() => rmSync(root, { recursive: true, force: true }))
  mkdirSync(join(root, 'assets'))
  writeFileSync(join(root, 'assets/new.js'), 'new')
  writeFileSync(join(root, '_deployment.json'), JSON.stringify({ schemaVersion: 1, buildId: release, releases: [{ id: release, assets: [descriptor('assets/new.js', 'new')] }] }))
  return root
}
const fetcher = files => async url => {
  const path = new URL(url).pathname.replace('/site/', '')
  return new Response(files[path] ?? 'not found', { status: Object.hasOwn(files, path) ? 200 : 404 })
}

test('retains two older immutable asset sets and bounds the release history', async t => {
  const directory = fixture(t)
  const previous = { schemaVersion: 1, buildId: 'old', releases: ['old', 'older', 'expired'].map(id => ({ id, assets: [descriptor('assets/' + id + '.js', id)] })) }
  const result = await retainAssets({ directory, fromUrl: 'https://example.test/site/', fetcher: fetcher({ '_deployment.json': JSON.stringify(previous), 'assets/old.js': 'old', 'assets/older.js': 'older' }) })
  assert.deepEqual(result.releases.map(r => r.id), ['new', 'old', 'older'])
  assert.equal(readFileSync(join(directory, 'assets/old.js'), 'utf8'), 'old')
  assert.equal(readFileSync(join(directory, 'assets/new.js'), 'utf8'), 'new')
});

test('retention refuses missing, altered or escaping assets instead of publishing a broken snapshot', async t => {
  for (const [asset, content] of [[descriptor('assets/old.js', 'expected'), 'changed'], [descriptor('../outside.js', 'expected'), 'expected'], [descriptor('assets/missing.js', 'expected'), null]]) {
    const directory = fixture(t)
    const previous = { schemaVersion: 1, releases: [{ id: 'old', assets: [asset] }] }
    await assert.rejects(retainAssets({ directory, fromUrl: 'https://example.test/site/', fetcher: fetcher({ '_deployment.json': JSON.stringify(previous), ...(content ? { [asset.path]: content } : {}) }) }), /asset|path/)
    assert.equal(JSON.parse(readFileSync(join(directory, '_deployment.json'))).releases.length, 1)
  }
});

test('Quartz cached HTML keeps its CSS and gets one versioned document transition', async t => {
  const directory = fixture(t)
  const result = await retainAssets({ directory, fromUrl: 'https://example.test/site/', fetcher: fetcher({ '': '<link href="index.css"><script src="prescript.js"></script>', 'index.css': 'body{color:#222}', 'prescript.js': 'old pre', 'postscript.js': 'old post' }) })
  assert.equal(readFileSync(join(directory, 'index.css'), 'utf8'), 'body{color:#222}')
  assert.ok(result.legacy)
  let moved = ''
  const location = { href: 'https://example.test/site/note.html?topic=notes#한글', replace: value => { moved = value } }
  vm.runInNewContext(legacyBridge('new'), { URL, window: {}, location })
  const target = new URL(moved)
  assert.equal(target.searchParams.get('topic'), 'notes')
  assert.equal(target.searchParams.get('_flv'), 'new')
  assert.equal(decodeURIComponent(target.hash), '#한글')
  moved = ''
  vm.runInNewContext(legacyBridge('new'), { URL, window: {}, location: { ...location, href: target.href } })
  assert.equal(moved, '')
});

test('missing React release manifest is an error, while a genuinely new site is supported', async t => {
  await assert.rejects(retainAssets({ directory: fixture(t), fromUrl: 'https://example.test/site/', fetcher: fetcher({ '': '<meta name="faultline-build" content="old">' }) }), /manifest/)
  const result = await retainAssets({ directory: fixture(t), fromUrl: 'https://example.test/site/', fetcher: fetcher({}) })
  assert.equal(result.releases.length, 1)
});

test('legacy folder/tag redirects preserve query/hash and never replace authored pages', () => {
  const notes = [{ sourcePath: 'labs/topic/note.md', routePath: '/labs/topic/note.html', category: 'topic' }, { sourcePath: 'tags/authored.md', routePath: '/tags/authored.html', category: 'notes' }]
  const redirects = legacyRedirects([{ sourcePath: notes[0].sourcePath, data: { tags: ['topic', 'authored'] } }, { sourcePath: notes[1].sourcePath, data: {} }], notes)
  assert.equal(redirects.find(item => item.path === 'labs/topic/index.html').target, '/?topic=topic')
  assert.equal(redirects.find(item => item.path === 'tags/topic.html').target, '/?q=topic')
  assert.ok(!redirects.some(item => item.path === 'tags/authored.html'))
  const html = redirectHtml('/?topic=topic', { base: '/preview/site/' })
  let moved
  vm.runInNewContext(html.match(/<script>(.*?)<\/script>/s)[1], { URL, URLSearchParams, location: { origin: 'https://example.test', search: '?level=Expert', hash: '#section', replace: value => { moved = value } } })
  assert.equal(moved, 'https://example.test/preview/site/?topic=topic&level=Expert#section')
});

test('sitemap contains canonical notes; feed includes authored writing and escapes XML', () => {
  const notes = [{ routePath: '/note.html', title: 'A & B', noteKind: 'solution', number: '01', updatedAt: '2026-09-30T00:00:00.000Z' }, { routePath: '/empty.html', title: 'Unwritten', noteKind: 'problem', number: '02' }]
  const sitemap = sitemapXml(notes)
  assert.equal([...sitemap.matchAll(/<loc>/g)].length, 3)
  assert.ok(sitemap.includes('<lastmod>2026-09-30T00:00:00.000Z</lastmod>'))
  const feed = feedXml(notes, { name: 'Faultline', description: 'Notes' })
  assert.ok(feed.includes('A &amp; B'))
  assert.ok(!feed.includes('Unwritten'))
});
