import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, copyFileSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative, join, sep } from 'node:path';

const output = resolve('_quartz/public');
const site = new URL('https://ddomology.github.io/portswigger-lab-notes/');
const assets = new Map();
for (const filename of ['index.css', 'prescript.js', 'postscript.js']) {
  const bytes = readFileSync(join(output, filename));
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
  const dot = filename.lastIndexOf('.');
  const versioned = `${filename.slice(0, dot)}.${hash}${filename.slice(dot)}`;
  copyFileSync(join(output, filename), join(output, versioned));
  assets.set(filename, versioned);
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(file);
    else if (entry.isFile() && entry.name.endsWith('.html')) yield file;
  }
}
function localUrl(value, page) {
  try {
    const url = new URL(value.replaceAll('&amp;', '&'), page);
    return url.origin === site.origin && url.pathname.startsWith(site.pathname) ? url : null;
  } catch { return null; }
}
const versions = /^(index)(?:\.[a-f0-9]{8,64})?\.css$|^(prescript|postscript)(?:\.[a-f0-9]{8,64})?\.js$/;
const missing = new Set();
let count = 0;
for (const file of htmlFiles(output)) {
  const page = new URL(relative(output, file).replaceAll('\\', '/'), site);
  const original = readFileSync(file, 'utf8');
  const html = original.replace(/\b(href|src)\s*=\s*(["'])(.*?)\2/gi, (attribute, name, quote, value) => {
    const url = localUrl(value, page);
    if (!url) return attribute;
    const match = url.pathname.slice(site.pathname.length).match(versions);
    if (!match) return attribute;
    const originalName = match[1] ? 'index.css' : `${match[2]}.js`;
    const [path] = value.split(/[?#]/, 1);
    const next = path.slice(0, path.lastIndexOf('/') + 1) + assets.get(originalName) + value.slice(path.length);
    return `${name}=${quote}${next}${quote}`;
  });
  if (html !== original) writeFileSync(file, html);
  count++;
  // Check local resources only: navigation, canonical links and remote URLs are not assets.
  for (const tag of html.matchAll(/<(script|link|img|source|video|audio)\b[^>]*>/gi)) {
    const kind = tag[1].toLowerCase();
    if (kind === 'link' && !/\brel\s*=\s*["'][^"']*\b(?:stylesheet|icon|manifest|preload|modulepreload)\b/i.test(tag[0])) continue;
    for (const attribute of tag[0].matchAll(/\b(src|href|poster)\s*=\s*(["'])(.*?)\2/gi)) {
      const url = localUrl(attribute[3], page);
      if (!url) continue;
      const target = resolve(output, decodeURIComponent(url.pathname.slice(site.pathname.length)));
      if (!target.startsWith(output + sep) || !existsSync(target)) missing.add(`${relative(output, file)}: ${attribute[3]}`);
    }
  }
}
if (missing.size) throw new Error('Missing local HTML assets:\n' + [...missing].join('\n'));
console.log(`Fingerprinted ${assets.size} assets across ${count} HTML pages; local asset references verified.`);
console.log(JSON.stringify(Object.fromEntries(assets)));
