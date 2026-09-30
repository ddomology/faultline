import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createServer } from 'node:http';

const temporary = mkdtempSync(join(tmpdir(), 'notes-assets-'));
const script = resolve('scripts/fingerprint-assets.mjs');
const files = ['index.css', 'prescript.js', 'postscript.js'];
const fixture = '<link rel="stylesheet" href="../../index.0123456789ab.css?theme=reader&amp;v=old#main">'
  + '<script src="../../prescript.js"></script><script src="../../postscript.js"></script>';
function build(name) {
  const dir = join(temporary, name);
  mkdirSync(join(dir, 'labs', 'example'), { recursive:true });
  for (const file of files) writeFileSync(join(dir, file), `/* ${name}: ${file} */`);
  const page = join(dir, 'labs/example/note.html');
  writeFileSync(page, fixture);
  execFileSync(process.execPath, [script, dir]);
  const html = readFileSync(page, 'utf8');
  execFileSync(process.execPath, [script, dir]);
  assert.equal(readFileSync(page, 'utf8'), html, 'Repeated builds must not duplicate query parameters');
  return { dir, html };
}
let server;
try {
  const old = build('old');
  const current = build('current');
  assert.notEqual(old.html, current.html, 'Changed bytes need a new cache version');
  // Serve ONLY the new deployment, while requesting every URL in cached old HTML.
  server = createServer((req, res) => {
    try {
      const pathname = new URL(req.url, 'http://localhost').pathname;
      const filename = pathname.split('/').pop();
      if (!files.includes(filename)) throw Error('Unknown asset');
      const bytes = readFileSync(join(current.dir, filename));
      res.writeHead(200, { 'Content-Type':filename.endsWith('.css') ? 'text/css' : 'application/javascript' });
      res.end(bytes);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}/faultline/`;
  const urls = [...old.html.matchAll(/(?:href|src)="([^"]+)"/g)]
    .map(match => new URL(match[1].replaceAll('&amp;', '&'), base + 'labs/example/note.html'));
  assert.equal(urls.length, 3);
  assert.equal(urls[0].searchParams.get('theme'), 'reader');
  assert.equal(urls[0].hash, '#main');
  for (const [index, url] of urls.entries()) {
    assert.equal(url.pathname, `/faultline/${files[index]}`);
    assert.match(url.searchParams.get('v'), /^[a-f0-9]{12}$/);
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.equal(await response.text(), `/* current: ${files[index]} */`);
  }
  // Retain the missing-local-asset build gate.
  writeFileSync(join(current.dir, 'broken.html'), '<link rel="stylesheet" href="missing.css">');
  assert.throws(() => execFileSync(process.execPath, [script, current.dir], { stdio:'pipe' }), /Missing local HTML assets/);
  console.log('PASS: cached HTML survives deployment replacement; versions, nested URLs and missing-asset checks');
} finally {
  if (server) await new Promise(resolve => server.close(resolve));
  rmSync(temporary, { recursive:true, force:true });
}
