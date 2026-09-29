import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, existsSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(resolve('_quartz/package.json'));
const matter = require('gray-matter');
const catalog = JSON.parse(readFileSync('data/labs.json', 'utf8'));
const output = resolve('_quartz/public');
const index = JSON.parse(readFileSync(join(output, 'static/contentIndex.json'), 'utf8'));
const contentRoot = resolve('content');
const sourcePaths = new Map(Object.entries(index).map(([slug, item]) => [item.filePath.replaceAll('\\', '/'), slug]));
const ids = new Set();
const urls = new Set();
for (const lab of catalog.labs) {
  if (ids.has(lab.id) || urls.has(lab.url)) throw new Error('Duplicate lab: ' + lab.id);
  if (new URL(lab.url).origin !== 'https://portswigger.net') throw new Error('Unexpected lab URL: ' + lab.url);
  if (lab.notePath.startsWith('/') || lab.notePath.split('/').includes('..')) throw new Error('Invalid note path');
  ids.add(lab.id); urls.add(lab.url);
  lab.noteUrl = null;
  lab.noteStatus = null;
  lab.noteExists = false;
}
const normalizeUrl = value => {
  try {
    const url = new URL(String(value || ''));
    return url.origin + url.pathname.replace(/\/+$/, '');
  } catch { return ''; }
};
const byUrl = new Map(catalog.labs.map(lab => [normalizeUrl(lab.url), lab]));
const byPath = new Map(catalog.labs.map(lab => [lab.notePath, lab]));

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['templates', 'private'].includes(entry.name)) continue;
    const file = join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const notePath = relative(contentRoot, file).replaceAll('\\', '/');
    const { data } = matter(readFileSync(file, 'utf8'));
    const lab = byUrl.get(normalizeUrl(data.lab_url)) || byPath.get(notePath);
    if (!lab) continue;
    if (lab.noteExists) throw new Error('Multiple notes link to ' + lab.url + ': ' + lab.notePath + ', ' + notePath);
    const slug = sourcePaths.get(notePath);
    lab.notePath = notePath;
    lab.noteExists = true;
    lab.noteStatus = slug ? 'published' : 'draft';
    if (slug) {
      if (!existsSync(join(output, slug + '.html'))) throw new Error('Missing rendered note: ' + slug);
      lab.noteUrl = './' + slug.split('/').map(encodeURIComponent).join('/') + '.html';
    }
  }
}
walk(contentRoot);
mkdirSync(join(output, '_dashboard'), { recursive: true });
cpSync('site/index.html', join(output, 'index.html'));
for (const file of ['dashboard.css', 'dashboard.js']) cpSync(join('site', file), join(output, '_dashboard', file));
writeFileSync(join(output, '_dashboard/catalog.json'), JSON.stringify(catalog));
console.log('Dashboard: ' + catalog.labs.length + ' labs, ' + catalog.categories.length + ' topics, ' + catalog.labs.filter(l => l.noteUrl).length + ' published notes.');
