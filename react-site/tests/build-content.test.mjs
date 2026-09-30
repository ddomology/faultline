import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, test } from 'node:test';
import { buildContent, renderMarkdown, searchableText, validUpdatedAt } from '../scripts/build-content.mjs';
import { basePath } from '../site.config.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(appRoot, '..');
const expectedLabs = JSON.parse(readFileSync(join(repoRoot, 'data/labs.json'), 'utf8')).labs;
const hashFile = path => createHash('sha256').update(readFileSync(path)).digest('hex');
const outputDir = mkdtempSync(join(tmpdir(), 'faultline-content-'));
let manifest;
let notes;
const beforeHashes = Object.fromEntries(expectedLabs.map(lab => [lab.notePath, hashFile(join(repoRoot, 'content', lab.notePath))]));

before(async () => {
  manifest = await buildContent({ outputDir });
  notes = JSON.parse(readFileSync(join(outputDir, 'notes.json'), 'utf8'));
});
after(() => rmSync(outputDir, { recursive: true, force: true }));

test('every catalog lab retains its .html route and source bytes', () => {
  assert.equal(manifest.counts.notes, expectedLabs.length);
  for (const lab of expectedLabs) {
    const route = '/' + lab.notePath.replace(/\.md$/, '.html');
    assert.ok(notes[route], `Missing original route: ${route}`);
    assert.equal(notes[route].sourcePath, lab.notePath);
    assert.equal(manifest.sourceHashes[lab.notePath], beforeHashes[lab.notePath]);
    assert.equal(hashFile(join(repoRoot, 'content', lab.notePath)), beforeHashes[lab.notePath]);
  }
  assert.ok(!manifest.routes.some(route => /(?:^|\/)(?:private|templates|notes|guide|index)(?:\/|\.html$)/.test(route)));
});

test('public attachments are copied without changing bytes and image URLs use deployment base', () => {
  assert.ok(manifest.assets.length > 0);
  for (const path of manifest.assets) {
    const destination = join(appRoot, 'public', path);
    assert.ok(existsSync(destination), `Missing attachment ${path}`);
    assert.equal(hashFile(destination), manifest.assetHashes[path]);
    assert.equal(hashFile(join(repoRoot, 'content', path)), manifest.assetHashes[path]);
  }
  const login = notes['/labs/sql-injection/lab-login-bypass.html'];
  assert.ok(login.html.includes(`src="${basePath}labs/sql-injection/images/lab-login-bypass/01-login-request-headers.png"`));
  assert.ok(!login.html.includes('src="https://raw.githubusercontent.com'));
});

test('reader title is not duplicated and existing Korean section anchors remain stable', () => {
  const first = notes['/labs/sql-injection/lab-retrieve-hidden-data.html'];
  assert.ok(!/<h1\b/.test(first.html));
  assert.ok(first.html.includes('id="문제-조건과-설명"'));
  assert.ok(first.html.includes('id="탐색-및-풀이-기록"'));
  assert.ok(first.toc.some(heading => heading.id === '배운-점' && heading.depth === 2));
  assert.ok(first.html.includes('<table>'));
  assert.equal(first.number, '01.01');
  assert.notEqual(first.title, first.originalTitle);
  assert.equal(first.explorerTitle, '숨겨진 데이터 조회');
});

test('code and active raw HTML are inert text; event and javascript attributes are removed', async () => {
  const source = '```html\n<script>globalThis.fixture = 1</script>\n```\n\n<script>globalThis.fixture = 2</script>\n\n<img src="https://example.test/a.png" onerror="fixture()">\n\n[bad](javascript:fixture())';
  const result = await renderMarkdown(source, { sourcePath: 'fixture.md', knownNotes: new Set(), assets: new Set() });
  assert.ok(!/<script\b/i.test(result.html));
  assert.ok(!/\sonerror=/i.test(result.html));
  assert.ok(!/href="javascript:/i.test(result.html));
  assert.ok(result.html.includes('globalThis.fixture = 1'));
  assert.ok(result.html.includes('globalThis.fixture = 2'));
  assert.ok(result.html.includes('<code class="language-html">'));
});

test('relative Markdown links and attachments resolve with encoded fragments and queries retained', async () => {
  const result = await renderMarkdown('[next](./next.md?mode=read#section)\n\n![image](./images/shot.png)\n\n## 같은 제목\n\n## 같은 제목', {
    sourcePath: 'labs/example/current.md', knownNotes: new Set(['labs/example/next.md']), assets: new Set(['labs/example/images/shot.png']),
  });
  assert.ok(result.html.includes(`href="${basePath}labs/example/next.html?mode=read#section"`));
  assert.ok(result.html.includes(`src="${basePath}labs/example/images/shot.png"`));
  assert.deepEqual(result.toc.map(heading => heading.id), ['같은-제목', '같은-제목-1']);
  assert.deepEqual(result.unresolvedLinks, []);
});

test('enhanced syntax still pending is recorded instead of claiming Quartz feature parity', () => {
  assert.ok(manifest.compatibility.some(entry => entry.sourcePath.endsWith('lab-retrieve-hidden-data.md') && entry.features.includes('obsidian-callout')));
  assert.ok(manifest.renderer.pending.includes('syntax-highlighting'));
  assert.ok(manifest.renderer.pending.includes('code-format-and-copy'));
  assert.deepEqual(manifest.unresolvedLinks, []);
});

test('search metadata indexes readable Markdown and records genuine modification dates', () => {
  assert.equal(searchableText('# Heading\n\nA **word** and `code`.\n\n<!-- hidden guidance -->'), 'Heading A word and code .');
  assert.equal(validUpdatedAt('invalid date'), null);
  assert.equal(validUpdatedAt(undefined), null);
  assert.equal(validUpdatedAt('2026-09-30T10:00:00+09:00'), '2026-09-30T01:00:00.000Z');
  for (const note of Object.values(notes)) {
    assert.ok(note.searchText.length > 0);
    if (note.updatedAt) assert.equal(validUpdatedAt(note.updatedAt), note.updatedAt);
  }
});
