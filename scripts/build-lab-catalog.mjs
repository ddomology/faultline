import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, join, dirname, posix } from 'node:path';

const catalog = JSON.parse(readFileSync('data/labs.json', 'utf8'));
const aliases = JSON.parse(readFileSync('site/topic-aliases.json', 'utf8'));
const titles = JSON.parse(readFileSync('site/lab-titles.json', 'utf8'));
const explorerTitles = JSON.parse(readFileSync('site/explorer-titles.json', 'utf8'));
const sourceNotes = JSON.parse(readFileSync('_quartz/note-source-index.json', 'utf8'));
const output = resolve('_quartz/public');
const index = JSON.parse(readFileSync(join(output, 'static/contentIndex.json'), 'utf8'));
const sourcePaths = new Map();
for (const [slug, item] of Object.entries(index)) {
  const sourcePath = String(item.filePath || '').replaceAll('\\', '/');
  // Quartz releases have used both content-relative and content-prefixed paths.
  sourcePaths.set(sourcePath, slug);
  sourcePaths.set(sourcePath.replace(/^(?:.*\/)?content\//, ''), slug);
}
const ids = new Set();
const urls = new Set();
for (const lab of catalog.labs) {
  if (ids.has(lab.id) || urls.has(lab.url)) throw new Error('Duplicate lab: ' + lab.id);
  if (new URL(lab.url).origin !== 'https://portswigger.net') throw new Error('Unexpected lab URL: ' + lab.url);
  if (lab.notePath.startsWith('/') || lab.notePath.split('/').includes('..')) throw new Error('Invalid note path');
  ids.add(lab.id); urls.add(lab.url);
  lab.originalTitle = lab.title;
  lab.title = titles[lab.id] || lab.title;
  lab.noteUrl = null;
  lab.noteStatus = null;
  lab.noteExists = false;
  lab.noteUpdatedAt = null;
  lab.noteSearchText = '';
}
const normalizeUrl = value => {
  try {
    const url = new URL(String(value || ''));
    return url.origin + url.pathname.replace(/\/+$/, '');
  } catch { return ''; }
};
const byUrl = new Map(catalog.labs.map(lab => [normalizeUrl(lab.url), lab]));
const byPath = new Map(catalog.labs.map(lab => [lab.notePath, lab]));
const byCategory = new Map(catalog.categories.map(category => [category.id, category]));

catalog.notes = sourceNotes.map(source => {
  const lab = byUrl.get(normalizeUrl(source.labUrl)) || byPath.get(source.notePath);
  if (lab?.noteExists) throw new Error('Multiple notes link to ' + lab.url + ': ' + lab.notePath + ', ' + source.notePath);
  const slug = sourcePaths.get(source.notePath);
  if (!slug || !existsSync(join(output, slug + '.html'))) throw new Error('Missing rendered note: ' + source.notePath);
  const noteUrl = './' + slug.split('/').map(encodeURIComponent).join('/') + '.html';
  const category = lab?.category || source.category || 'notes';
  const categoryTitle = lab?.categoryTitle || source.categoryTitle || byCategory.get(category)?.title || (category === 'notes' ? '개념 · 메모' : category);
  const originalTitle = source.originalTitle || lab?.originalTitle || '';
  const searchText = [source.title, originalTitle, lab?.title, lab && explorerTitles[lab.id], category, categoryTitle, ...(aliases[category] || []), ...source.tags, source.searchText].filter(Boolean).join(' ').normalize('NFKC');
  const note = {
    id: lab?.id || `note:${source.notePath}`,
    title: source.title, originalTitle, noteUrl, notePath: source.notePath,
    noteKind: source.noteKind || (lab ? 'solution' : 'note'),
    category, categoryTitle,
    difficulty: source.difficulty || lab?.difficulty || '',
    updatedAt: source.updatedAt,
    searchText, tags: source.tags,
    ...(lab ? { labId: lab.id } : {}),
  };
  // Quartz reader search indexes title and content; include the English subtitle too.
  if (originalTitle && !index[slug].content.startsWith(originalTitle + '\n')) {
    index[slug].content = originalTitle + '\n' + index[slug].content;
  }
  if (lab) {
    lab.notePath = source.notePath;
    lab.noteExists = true;
    lab.noteStatus = note.noteKind;
    lab.noteUrl = noteUrl;
    lab.noteUpdatedAt = source.updatedAt;
    lab.noteSearchText = searchText;
  }
  return note;
}).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt) || a.title.localeCompare(b.title) || a.notePath.localeCompare(b.notePath));
catalog.aliases = aliases;
catalog.noteCount = catalog.notes.length;
catalog.solutionCount = catalog.notes.filter(note => note.labId && note.noteKind === 'solution').length;

// Keep reference numbers independent of list filtering, sorting and note dates.
// Original catalog categories retain their position; note-only categories follow.
const newCategories = [...new Set([...catalog.labs, ...catalog.notes].map(entry => entry.category))]
  .filter(id => !byCategory.has(id)).sort((a, b) => a.localeCompare(b));
for (const id of newCategories) {
  const entry = catalog.notes.find(note => note.category === id) || catalog.labs.find(lab => lab.category === id);
  const category = { id, title: entry?.categoryTitle || id, count: catalog.labs.filter(lab => lab.category === id).length, solved: catalog.labs.filter(lab => lab.category === id && lab.solved).length };
  catalog.categories.push(category);
  byCategory.set(id, category);
}
const padNumber = value => String(value).padStart(2, '0');
catalog.categories.forEach((category, index) => {
  category.number = padNumber(index + 1);
  const labs = catalog.labs.filter(lab => lab.category === category.id)
    .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id));
  labs.forEach((lab, position) => { lab.number = `${category.number}.${padNumber(position + 1)}`; });
  const standalone = catalog.notes.filter(note => !note.labId && note.category === category.id)
    .sort((a, b) => a.notePath.localeCompare(b.notePath));
  standalone.forEach((note, position) => { note.number = `${category.number}.${padNumber(labs.length + position + 1)}`; });
});
const byLabId = new Map(catalog.labs.map(lab => [lab.id, lab]));
for (const note of catalog.notes) {
  if (note.labId) note.number = byLabId.get(note.labId).number;
}

mkdirSync(join(output, '_dashboard'), { recursive: true });
writeFileSync(join(output, 'static/contentIndex.json'), JSON.stringify(index));
writeFileSync(join(output, '_dashboard/catalog.json'), JSON.stringify(catalog));
writeFileSync(join(output, '_dashboard/notes.json'), JSON.stringify({ schemaVersion: 1, notes: catalog.notes, aliases }));

function legacyRedirect(filename, destination, title) {
  // A real Markdown page takes precedence over any former generated index.
  if (Object.hasOwn(index, filename.replace(/\.html$/, ''))) return;
  const escape = value => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  mkdirSync(dirname(join(output, filename)), { recursive: true });
  writeFileSync(join(output, filename), `<!doctype html>\n<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${escape(destination)}"><meta name="robots" content="noindex"><link rel="canonical" href="${escape(destination)}"><title>${escape(title)}</title></head><body><p><a href="${escape(destination)}">${escape(title)} →</a></p></body></html>\n`);
}
legacyRedirect('notes.html', './', '풀이 노트');
legacyRedirect('guide.html', 'https://github.com/ddomology/faultline#노트-작성', '노트 작성 안내');

const folderCategories = new Map();
const legacyTags = new Map();
const slugTag = tag => tag.split('/').map(segment => segment.replace(/\s/g, '-').replace(/&/g, '-and-').replace(/%/g, '-percent').replace(/[?#]/g, '')).join('/').replace(/\/$/, '');
const homeFrom = filename => (posix.relative(posix.dirname(filename), '.') || '.') + '/';
for (const note of catalog.notes) {
  const slug = sourcePaths.get(note.notePath);
  const segments = slug.split('/');
  for (let count = 1; count < segments.length; count++) {
    const folder = segments.slice(0, count).join('/');
    if (!folderCategories.has(folder)) folderCategories.set(folder, new Set());
    folderCategories.get(folder).add(note.category);
  }
  for (const tag of note.tags) {
    const parts = String(tag).split('/');
    for (let count = 1; count <= parts.length; count++) {
      const raw = parts.slice(0, count).join('/');
      const normalized = slugTag(raw);
      if (normalized && !normalized.split('/').some(segment => !segment || segment === '.' || segment === '..')) legacyTags.set(normalized, raw);
    }
  }
}
for (const [folder, categories] of folderCategories) {
  const filename = `${folder}/index.html`;
  const topic = categories.size === 1 ? [...categories][0] : '';
  legacyRedirect(filename, homeFrom(filename) + (topic ? `?topic=${encodeURIComponent(topic)}` : ''), '풀이 노트');
}
for (const [tag, raw] of legacyTags) {
  const filename = `tags/${tag}.html`;
  legacyRedirect(filename, homeFrom(filename) + `?q=${encodeURIComponent(raw)}`, '태그로 풀이 찾기');
}
legacyRedirect('tags/index.html', '../', '풀이 노트');
console.log(`Quartz catalog: ${catalog.labs.length} labs, ${catalog.notes.length} public notes; legacy links preserved.`);
