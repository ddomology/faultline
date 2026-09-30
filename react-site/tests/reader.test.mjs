import assert from 'node:assert/strict';
import { test } from 'node:test';
import { renderMarkdown } from '../scripts/build-content.mjs';
import { basePath } from '../site.config.mjs';

const render = (markdown, options = {}) => renderMarkdown(markdown, { sourcePath: 'labs/demo/current.md', knownNotes: new Set(), assets: new Set(), ...options });
const nodes = tree => [tree, ...(tree.children || []).flatMap(nodes)];
const blocks = result => nodes(result.body).filter(node => node.data?.readerCode);
const fence = (language, source, meta = '') => '```' + language + ' ' + meta + '\n' + source + '\n```';
const textOf = node => node.type === 'text' ? node.value : (node.children || []).map(textOf).join('');

test('multilanguage highlighting and display formatting preserve the exact fenced source', async () => {
  const fixtures = {
    js: 'const note={title:"Memo",count:3};',
    ts: 'const title:string="Memo";', json: '{"title":"Memo","count":3}',
    python: 'def label(name):\n return "Hello " + name',
    sql: 'SELECT title,count FROM notes WHERE visible=1;',
    html: '<article><h2>Memo</h2></article>', css: '.note{color:#334155;padding:16px;}',
    bash: 'printf "%s\\n" "$name" # greeting', http: 'GET /notes HTTP/1.1\nHost: example.test',
    powershell: 'Get-Content -Path "notes.txt" # read text',
  };
  for (const [language, source] of Object.entries(fixtures)) {
    const result = await render(fence(language, source));
    const block = blocks(result)[0];
    assert.equal(block.data.readerCode.source, source, language);
    assert.ok(result.html.includes('--shiki-light:') && result.html.includes('--shiki-dark:'), language);
    assert.equal(textOf(block.children[0]), source, language);
    if (block.data.readerCode.formatted !== null) {
      assert.equal(block.data.readerCode.initial, 'formatted');
      assert.equal(textOf(block.children[1]), block.data.readerCode.formatted);
    }
  }
});

test('fragments, invalid syntax, unknown labels and author opt-outs remain readable originals', async () => {
  for (const [language, source, meta] of [
    ['sql', "title = 'unfinished\nSELECT title FROM notes", 'fragment'],
    ['sql-fragment', 'SELECT title, 3 FROM notes', ''],
    ['js', 'const title = {', ''], ['unknown-reader-language', '\tTitle  \n  Value\n', ''],
    ['js', 'const n={a:1};', 'noformat'], ['js', 'const n={a:1};', 'nohighlight'],
    ['', '\tText  \n  Second line', ''],
  ]) {
    const result = await render(fence(language, source, meta));
    const block = blocks(result)[0];
    assert.equal(block.data.readerCode.source, source);
    assert.equal(block.data.readerCode.formatted, null);
    assert.equal(block.children.filter(node => node.tagName === 'code').length, 1);
    if (meta === 'nohighlight') assert.ok(!result.html.includes('--shiki-light:'));
  }
});

test('fence titles, source line annotations and line numbers stay with their intended view', async () => {
  const result = await render(fence('js', 'const n={a:1};', 'title="note.js" caption="Example" showLineNumbers {1}'));
  const block = blocks(result)[0];
  assert.equal(block.data.readerCode.initial, 'source');
  assert.match(result.html, /data-rehype-pretty-code-title[^>]*>note.js/);
  assert.match(result.html, /data-rehype-pretty-code-caption[^>]*>Example/);
  assert.ok(result.html.includes('data-line-numbers'));
  assert.ok(nodes(block.children[0]).some(node => Object.hasOwn(node.properties || {}, 'data-highlighted-line')));
  assert.ok(!nodes(block.children[1]).some(node => Object.hasOwn(node.properties || {}, 'data-highlighted-line')));
});

test('callouts use native details; wiki paths, nested notes and image embeds respect the base', async () => {
  const result = await render('> [!tip]+ 읽기 안내\n> 첫 문단\n>\n> > [!warning]- 주의\n> > 두 번째 문단\n\n[[next#큰 제목|다음]]\n\n![[images/shot.png|설명]]\n\n`[[unchanged]]`', {
    knownNotes: new Set(['labs/demo/next.md']), assets: new Set(['labs/demo/images/shot.png']),
  });
  assert.match(result.html, /<details class="callout" data-callout="tip" open>/);
  assert.match(result.html, /<details class="callout" data-callout="warning">/);
  assert.ok(result.html.includes(`href="${basePath}labs/demo/next.html#${encodeURIComponent('큰-제목')}"`));
  assert.ok(result.html.includes(`src="${basePath}labs/demo/images/shot.png"`));
  assert.ok(result.html.includes('<code>[[unchanged]]</code>'));
  assert.ok(nodes(result.body).some(node => node.data?.readerImage));
  assert.deepEqual(result.unresolvedLinks, []);
});

test('math is rendered after sanitization with untrusted commands disabled', async () => {
  const result = await render('$x^2$\n\n$$\n\\frac{1}{2}\n$$\n\n$\\href{javascript:alert(1)}{x}$\n\n<span style="color:red" onclick="bad()">text</span>');
  assert.ok(result.html.includes('class="katex"'));
  assert.ok(result.html.includes('class="katex-display"'));
  assert.ok(result.html.includes('<math'));
  assert.ok(!/href="javascript:|onclick=|style="color:red"/.test(result.html));
  assert.ok(nodes(result.body).every(node => !node.position));
});

test('local images reserve intrinsic size; authored links are not converted to zoom triggers', async () => {
  const path = 'labs/sql-injection/images/lab-login-bypass/01-login-request-headers.png';
  const result = await render(`![요청 화면](/${path})\n\n[![linked](/${path})](https://example.test)\n\n|Column|Value|\n|---|---|\n|A|B|`, { assets: new Set([path]) });
  const images = nodes(result.body).filter(node => node.tagName === 'img');
  assert.ok(images.every(image => image.properties.width > 0 && image.properties.height > 0));
  assert.equal(images[0].data.readerImage, true);
  assert.equal(images[1].data, undefined);
  assert.ok(result.html.includes('class="reader-screenshot"'));
  assert.ok(result.html.includes('class="table-container"'));
});

test('footnote references, repeated backlinks and their accessible label resolve after sanitization', async () => {
  const result = await render('note[^a] and again[^a], next[^b].\n\n[^a]: First note.\n[^b]: Second note.');
  const elements = nodes(result.body).filter(node => node.type === 'element');
  const ids = elements.map(node => node.properties.id).filter(Boolean);
  assert.equal(ids.length, new Set(ids).size);
  for (const node of elements) {
    if (node.properties.href?.startsWith('#')) assert.ok(ids.includes(node.properties.href.slice(1)), node.properties.href);
    for (const id of node.properties.ariaDescribedBy || []) assert.ok(ids.includes(id));
  }
  assert.ok(result.html.includes('본문으로 돌아가기'));
});
