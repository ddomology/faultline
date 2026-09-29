import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const require = createRequire(resolve('_quartz/package.json'));
const matter = require('gray-matter');
const root = resolve('_quartz/content');
const catalog = JSON.parse(readFileSync('data/labs.json', 'utf8'));
const titles = JSON.parse(readFileSync('site/lab-titles.json', 'utf8'));
const normalizeUrl = value => {
  try {
    const url = new URL(String(value || ''));
    return url.origin + url.pathname.replace(/\/+$/, '');
  } catch { return ''; }
};
const byUrl = new Map(catalog.labs.map(lab => [normalizeUrl(lab.url), lab]));
const byPath = new Map(catalog.labs.map(lab => [lab.notePath, lab]));
const notes = [];
const legacyPages = new Set(['index.md', 'notes.md', 'guide.md']);

function isoDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.valueOf()) ? null : date.toISOString();
}

function updatedAt(notePath, data) {
  // Git history survives a fresh checkout; filesystem mtimes do not.
  try {
    const committed = execFileSync('git', ['log', '-1', '--format=%cI', '--', `content/${notePath}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    if (isoDate(committed)) return isoDate(committed);
  } catch { /* Local, uncommitted notebooks can still be built. */ }
  return isoDate(data.updated) || isoDate(data.modified) || isoDate(data.lastmod) || isoDate(data.date) || isoDate(catalog.snapshotDate) || '1970-01-01T00:00:00.000Z';
}

function textContent(markdown) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/^[ \t]*(?:#{1,6}\s|`{3,}.*$|~{3,}.*$)/gm, ' ')
    .replace(/\s+/g, ' ').trim();
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name.startsWith('.') || ['private', 'templates'].includes(entry.name)) continue;
    const file = join(dir, entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const notePath = relative(root, file).replaceAll('\\', '/');
    if (legacyPages.has(notePath)) continue;
    const { data, content } = matter(readFileSync(file, 'utf8'));
    const lab = byUrl.get(normalizeUrl(data.lab_url)) || byPath.get(notePath);
    const originalTitle = lab?.title || String(data.english_title || '');
    const title = String((lab && titles[lab.id]) || data.title || content.match(/^#\s+(.+)$/m)?.[1] || entry.name.slice(0, -3));
    // Localize the copied build input, preserving authored note bodies and paths.
    const body = content.replace(/^\s*# ([^\r\n]+)(?:\r?\n|$)/, (heading, text) =>
      [data.title, originalTitle, title].some(value => value && text.trim() === String(value).trim()) ? '' : heading);
    const localized = lab && typeof titles[lab.id] === 'string';
    if (body !== content || localized) {
      writeFileSync(file, matter.stringify(body, {
        ...data,
        ...(localized ? { title, english_title: originalTitle } : {}),
      }));
    }
    const tags = (Array.isArray(data.tags) ? data.tags : typeof data.tags === 'string' ? [data.tags] : []).map(String);
    const labUrl = String(data.lab_url || '');
    const noteKind = String(data.note_kind || (labUrl ? 'solution' : 'note'));
    if (!['problem', 'solution', 'note'].includes(noteKind)) throw new Error(`Invalid note_kind in ${notePath}: ${noteKind}`);
    if (noteKind === 'problem' && !labUrl) throw new Error(`Problem page is missing lab_url: ${notePath}`);
    notes.push({
      notePath, title, originalTitle, tags,
      labUrl, noteKind,
      category: String(data.category || data.topic || ''),
      categoryTitle: String(data.category_title || ''),
      difficulty: String(data.difficulty || ''),
      updatedAt: updatedAt(notePath, data),
      searchText: textContent(content),
    });
  }
}

walk(root);
writeFileSync('_quartz/note-source-index.json', JSON.stringify(notes, null, 2) + '\n');
console.log(`Indexed ${notes.length} public notes, including standalone notes.`);
