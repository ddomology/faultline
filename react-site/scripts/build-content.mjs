import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, posix, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { imageSize } from 'image-size';
import { readerCode } from './reader-code.mjs';
import { remarkNotebook, rehypeReaderStructure, rehypeReaderFootnotes, compactTree } from './reader-markdown.mjs';
import { basePath, repositoryUrl } from '../site.config.mjs';
import { legacyRedirects } from './site-metadata.mjs';

const appRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = resolve(appRoot, '..');
const contentRoot = join(repoRoot, 'content');
const omittedPages = new Set(['index.md', 'notes.md', 'guide.md']);
const omittedDirectories = new Set(['private', 'templates']);
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const readJson = path => JSON.parse(readFileSync(join(repoRoot, path), 'utf8'));
const pad = number => String(number).padStart(2, '0');
const encodedPath = path => path.split('/').map(encodeURIComponent).join('/');
const routeFor = path => '/' + encodedPath(path.replace(/\.md$/i, '')) + '.html';
const publicUrl = path => basePath + encodedPath(path.replace(/^\//, ''));
const walkTree = (node, callback) => { callback(node); for (const child of node.children || []) walkTree(child, callback); };
const textOf = node => typeof node.value === 'string' ? node.value : (node.children || []).map(textOf).join('');
const normalizeLabUrl = value => {
  try { const url = new URL(String(value || '')); return url.origin + url.pathname.replace(/\/+$/, ''); }
  catch { return ''; }
};

function listContent(directory = contentRoot) {
  const files = [];
  for (const entry of readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name, 'en'))) {
    if (entry.name.startsWith('.') || omittedDirectories.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...listContent(path));
    else if (entry.isFile()) files.push(relative(contentRoot, path).replaceAll('\\', '/'));
    // Symlinks are deliberately not followed outside the public content tree.
  }
  return files;
}

function localPath(url, sourcePath) {
  let value = String(url || '');
  if (!value || value.startsWith('#')) return null;
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(value)) {
    try {
      const parsed = new URL(value);
      const repositoryPath = new URL(repositoryUrl).pathname.replace(/\/$/, '');
      // Existing source files can keep their raw GitHub image links. The build
      // uses a checked-in local copy; it never downloads or executes a sample.
      const prefixes = [repositoryPath, '/ddomology/portswigger-lab-notes'];
      const prefix = prefixes.find(path => parsed.pathname.startsWith(path + '/main/content/'));
      if (parsed.origin !== 'https://raw.githubusercontent.com' || !prefix) return null;
      value = parsed.pathname.slice((prefix + '/main/content/').length) + parsed.search + parsed.hash;
      sourcePath = 'index.md';
    } catch { return null; }
  }
  const match = value.match(/^([^?#]*)([?#].*)?$/);
  if (!match) return null;
  let path;
  try { path = decodeURIComponent(match[1]); } catch { return null; }
  if (path.startsWith(basePath)) path = '/' + path.slice(basePath.length);
  const resolved = posix.normalize(path.startsWith('/') ? path.slice(1) : posix.join(posix.dirname(sourcePath), path));
  if (resolved === '..' || resolved.startsWith('../') || resolved.includes('\\')) return null;
  return { path: resolved, suffix: match[2] || '' };
}

function resolveContentUrl(value, sourcePath, knownNotes, assets, unresolved) {
  const local = localPath(value, sourcePath);
  if (!local) return value;
  const { path, suffix } = local;
  const notePath = path.endsWith('.html') ? path.slice(0, -5) + '.md' : path;
  if (knownNotes.has(notePath)) return basePath.replace(/\/$/, '') + routeFor(notePath) + suffix;
  if (knownNotes.has(notePath + '.md')) return basePath.replace(/\/$/, '') + routeFor(notePath + '.md') + suffix;
  if (['index.md', 'index.html', 'notes.md', 'notes.html', '.', ''].includes(path)) return basePath + suffix;
  if (assets.has(path)) return publicUrl(path) + suffix;
  // Do not invent a route for a draft/private note or silently hide a broken link.
  unresolved.add(String(value));
  return value;
}

// Authored raw HTML is restricted to ordinary article markup. Samples in fenced
// blocks remain escaped text. Raw active HTML samples are shown as code too.
function inertHtmlSamples() {
  return tree => walkTree(tree, node => {
    if (node.type === 'html' && /<\/?(?:script|style|iframe|object|embed|form|base|meta|link)\b/i.test(node.value)) {
      node.type = 'text';
    }
  });
}

const articleSchema = {
  ...defaultSchema,
  tagNames: [...defaultSchema.tagNames, 'aside'],
  attributes: {
    ...defaultSchema.attributes,
    '*': (defaultSchema.attributes['*'] || []).filter(attribute => attribute !== 'id' && attribute !== 'name'),
    img: [...(defaultSchema.attributes.img || []), 'loading', 'decoding'],
    code: [['className', /^language-[\w+-]+$/, 'math-inline', 'math-display']],
    aside: [['className', 'callout'], 'dataCallout'],
    details: ['open', ['className', 'callout'], 'dataCallout'],
    summary: [['className', 'callout-title']],
    div: [['className', 'callout-title', 'callout-content']],
  },
};
const imageDimensions = new Map();

export async function renderMarkdown(markdown, { sourcePath, knownNotes, assets }) {
  const toc = [];
  const code = readerCode();
  let body;
  const unresolved = new Set();
  const rewriteLinks = () => tree => walkTree(tree, node => {
    if (node.type !== 'element') return;
    if (node.tagName === 'img') {
      const local = localPath(node.properties.src, sourcePath);
      if (local && assets.has(local.path)) {
        if (!imageDimensions.has(local.path)) {
          try { imageDimensions.set(local.path, imageSize(readFileSync(join(contentRoot, local.path)))); }
          catch { imageDimensions.set(local.path, null); }
        }
        const dimensions = imageDimensions.get(local.path);
        if (dimensions && !node.properties.width && !node.properties.height) {
          node.properties.width = dimensions.width;
          node.properties.height = dimensions.height;
        }
      }
    }
    for (const attribute of ['href', 'src', 'poster']) {
      if (typeof node.properties?.[attribute] === 'string') {
        node.properties[attribute] = resolveContentUrl(node.properties[attribute], sourcePath, knownNotes, assets, unresolved);
      }
    }
    if (node.tagName === 'img') {
      node.properties.loading = 'lazy';
      node.properties.decoding = 'async';
    }
  });
  const collectHeadings = () => tree => walkTree(tree, node => {
    if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
      toc.push({ id: String(node.properties.id), text: textOf(node), depth: Number(node.tagName.slice(1)) });
    }
  });
  const html = String(await unified()
    .use(remarkParse).use(remarkGfm).use(remarkMath)
    .use(remarkNotebook, { sourcePath, knownNotes, assets }).use(code.remark).use(inertHtmlSamples)
    .use(remarkRehype, { allowDangerousHtml: true, footnoteLabel: '각주', footnoteBackLabel: '본문으로 돌아가기' })
    .use(rehypeRaw).use(rewriteLinks).use(rehypeSanitize, articleSchema)
    // Generate our heading IDs after sanitization. This preserves the existing
    // Korean anchor URLs without allowing authored id/name DOM clobbering.
    .use(rehypeSlug).use(rehypeReaderFootnotes).use(collectHeadings)
    .use(code.prepare).use(...code.highlight).use(code.finish)
    .use(rehypeKatex, { trust: false, strict: 'ignore', maxSize: 20, maxExpand: 1000 })
    .use(rehypeReaderStructure)
    .use(() => tree => { body = compactTree(tree); }).use(rehypeStringify)
    .process(markdown));
  return { html, body, toc, unresolvedLinks: [...unresolved].sort() };
}

function compatibilityNotes(markdown) {
  const features = [];
  if (/^\s*>\s*\[![\w-]+\]/m.test(markdown)) features.push('obsidian-callout');
  if (/!?\[\[[^\]\n]+\]\]/.test(markdown)) features.push('obsidian-wikilink-or-embed');
  if (/^\s*(?:`{3,}|~{3,})\s*mermaid\b/m.test(markdown)) features.push('mermaid');
  if (/^\s*(?:`{3,}|~{3,})\S+\s+\S+/m.test(markdown)) features.push('code-fence-metadata');
  if (/\$\$|\\\(|\\\[/.test(markdown)) features.push('math');
  return features;
}

export function searchableText(markdown) {
  const values = [];
  walkTree(unified().use(remarkParse).use(remarkGfm).parse(markdown), node => {
    if (['text', 'inlineCode', 'code'].includes(node.type)) values.push(node.value);
    else if (node.type === 'image') values.push(node.alt || '');
  });
  return values.join(' ').replace(/\s+/g, ' ').trim();
}

export function descriptionText(markdown) {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(markdown);
  const paragraph = tree.children.find(node => node.type === 'paragraph');
  return textOf(paragraph || { children: [] }).replace(/\s+/g, ' ').trim().slice(0, 160);
}

export function validUpdatedAt(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isFinite(date.getTime()) ? date.toISOString() : null;
}

function contentDates() {
  const dates = new Map();
  try {
    // Full history in CI avoids treating every note as updated at checkout time.
    const history = execFileSync('git', ['-c', 'core.quotepath=false', 'log', '--format=%x1e%cI', '--name-only', '--', 'content'], {
      cwd: repoRoot, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
    });
    for (const commit of history.split('\x1e').slice(1)) {
      const [date, ...paths] = commit.trim().split('\n');
      for (const path of paths) {
        if (path.startsWith('content/') && !dates.has(path.slice(8))) dates.set(path.slice(8), validUpdatedAt(date));
      }
    }
  } catch { /* A source archive can omit Git; dates then remain explicitly unknown. */ }
  return dates;
}

export async function buildContent({ outputDir = join(appRoot, '.generated') } = {}) {
  const labCatalog = readJson('data/labs.json');
  const titles = readJson('site/lab-titles.json');
  const explorerTitles = readJson('site/explorer-titles.json');
  const brand = readJson('site/brand.json');
  const dates = contentDates();
  const byLabUrl = new Map(labCatalog.labs.map(lab => [normalizeLabUrl(lab.url), lab]));
  const byLabPath = new Map(labCatalog.labs.map(lab => [lab.notePath, lab]));
  const categories = labCatalog.categories.map((category, index) => ({ id: category.id, title: category.title, number: pad(index + 1), count: 0 }));
  const byCategory = new Map(categories.map(category => [category.id, category]));
  const labNumbers = new Map();
  for (const category of categories) {
    labCatalog.labs.filter(lab => lab.category === category.id)
      .sort((a, b) => (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) || a.id.localeCompare(b.id, 'en'))
      .forEach((lab, index) => labNumbers.set(lab.id, `${category.number}.${pad(index + 1)}`));
  }
  const allFiles = listContent();
  const assetPaths = allFiles.filter(path => !path.toLowerCase().endsWith('.md'));
  const assets = new Set(assetPaths);
  const sources = [];
  for (const sourcePath of allFiles.filter(path => path.endsWith('.md') && !omittedPages.has(path))) {
    const raw = readFileSync(join(contentRoot, sourcePath));
    const parsed = matter(raw.toString('utf8'));
    // The published notebook no longer uses draft frontmatter to hide articles.
    // Preserve that behavior; only the designated private/template paths omit files.
    sources.push({ sourcePath, data: parsed.data, markdown: parsed.content, sourceHash: sha256(raw) });
  }
  const knownNotes = new Set(sources.map(source => source.sourcePath));
  const notes = [];
  const rendered = {};
  const compatibility = [];
  const unresolvedLinks = [];
  const linkedLabIds = new Set();
  for (const source of sources) {
    const { sourcePath, data, markdown } = source;
    const lab = byLabUrl.get(normalizeLabUrl(data.lab_url)) || byLabPath.get(sourcePath);
    if (lab && linkedLabIds.has(lab.id)) throw new Error(`Multiple notes link to ${lab.id}`);
    if (lab) linkedLabIds.add(lab.id);
    const originalTitle = String(lab?.title || data.english_title || '');
    const title = String((lab && titles[lab.id]) || data.title || markdown.match(/^#\s+(.+)$/m)?.[1] || posix.basename(sourcePath, '.md'));
    const category = String(lab?.category || data.category || data.topic || 'notes');
    const categoryTitle = String(lab?.categoryTitle || data.category_title || byCategory.get(category)?.title || (category === 'notes' ? '개념 · 메모' : category));
    if (!byCategory.has(category)) {
      const item = { id: category, title: categoryTitle, number: '', count: 0 };
      categories.push(item); byCategory.set(category, item);
    }
    const noteKind = String(data.note_kind || (lab ? 'solution' : 'note'));
    if (!['problem', 'solution', 'note'].includes(noteKind)) throw new Error(`Invalid note_kind in ${sourcePath}: ${noteKind}`);
    const metadata = {
      slug: sourcePath.replace(/\.md$/, ''), routePath: routeFor(sourcePath), title, originalTitle,
      explorerTitle: String((lab && explorerTitles[lab.id]) || title),
      number: lab ? labNumbers.get(lab.id) : '', category, categoryTitle,
      difficulty: String(data.difficulty || lab?.difficulty || ''), noteKind,
      labUrl: String(data.lab_url || lab?.url || ''), view: lab ? 'notes' : 'concepts', sourcePath,
      updatedAt: validUpdatedAt(data.updated || data.modified) || dates.get(sourcePath) || null,
      searchText: searchableText(markdown),
    };
    if (Object.hasOwn(rendered, metadata.routePath)) throw new Error(`Duplicate route: ${metadata.routePath}`);
    const body = markdown.replace(/^\s*# ([^\r\n]+)(?:\r?\n|$)/, (heading, text) =>
      [data.title, originalTitle, title].some(value => value && text.trim() === String(value).trim()) ? '' : heading);
    const renderedNote = await renderMarkdown(body, { sourcePath, knownNotes, assets });
    rendered[metadata.routePath] = { ...metadata, description: descriptionText(body) || title, html: renderedNote.html, body: renderedNote.body, toc: renderedNote.toc };
    notes.push(metadata);
    byCategory.get(category).count++;
    const features = compatibilityNotes(body);
    if (features.length) compatibility.push({ sourcePath, features });
    if (renderedNote.unresolvedLinks.length) unresolvedLinks.push({ sourcePath, links: renderedNote.unresolvedLinks });
  }
  categories.filter(category => !category.number).sort((a, b) => a.id.localeCompare(b.id, 'en'))
    .forEach((category, index) => { category.number = pad(labCatalog.categories.length + index + 1); });
  for (const category of categories) {
    const labCount = labCatalog.labs.filter(lab => lab.category === category.id).length;
    notes.filter(note => !note.number && note.category === category.id).sort((a, b) => a.sourcePath.localeCompare(b.sourcePath, 'en'))
      .forEach((note, index) => { note.number = `${category.number}.${pad(labCount + index + 1)}`; rendered[note.routePath].number = note.number; });
  }
  notes.sort((a, b) => a.number.localeCompare(b.number, 'en', { numeric: true }) || a.sourcePath.localeCompare(b.sourcePath, 'en'));
  categories.sort((a, b) => a.number.localeCompare(b.number, 'en'));
  const counts = { notes: notes.filter(note => note.view === 'notes').length, concepts: notes.filter(note => note.view === 'concepts').length };
  const sourceHashes = Object.fromEntries(sources.map(source => [source.sourcePath, source.sourceHash]));
  const assetHashes = Object.fromEntries(assetPaths.map(path => [path, sha256(readFileSync(join(contentRoot, path)))]));
  const manifest = {
    schemaVersion: 1, routes: notes.map(note => note.routePath), assets: assetPaths, counts,
    sourceHashes, assetHashes,
    contentHash: sha256(JSON.stringify({ sourceHashes, assetHashes })),
    legacyRedirects: legacyRedirects(sources, notes),
    renderer: { features: ['commonmark', 'gfm', 'heading-anchors', 'safe-raw-html', 'local-attachments', 'canonical-markdown-links', 'syntax-highlighting', 'code-format-and-copy', 'obsidian-callouts', 'wikilinks-and-image-embeds', 'math', 'image-dimensions', 'reader-interactions'], pending: ['mermaid-diagrams', 'note-transclusion'] },
    compatibility, unresolvedLinks,
  };
  mkdirSync(outputDir, { recursive: true });
  // Remove only attachments copied by the previous build; public branding assets
  // are managed separately. A deleted source must not survive in public output.
  const previousPath = join(outputDir, 'manifest.json');
  if (existsSync(previousPath)) {
    const previous = JSON.parse(readFileSync(previousPath, 'utf8'));
    for (const path of previous.assets || []) {
      if (!assets.has(path) && typeof path === 'string' && !path.startsWith('/') && !path.split('/').includes('..')) {
        rmSync(join(appRoot, 'public', path), { force: true });
      }
    }
  }
  for (const path of assetPaths) {
    const destination = join(appRoot, 'public', path);
    mkdirSync(dirname(destination), { recursive: true });
    copyFileSync(join(contentRoot, path), destination);
  }
  for (const [filename, data] of Object.entries({ 'catalog.json': { schemaVersion: 1, brand, notes, categories, counts }, 'notes.json': rendered, 'manifest.json': manifest })) {
    writeFileSync(join(outputDir, filename), JSON.stringify(data, null, 2) + '\n');
  }
  console.log(`React content: ${notes.length} articles (${counts.notes} notes, ${counts.concepts} concepts), ${assetPaths.length} attachments, ${categories.length} categories.`);
  if (compatibility.length) console.log(`${compatibility.length} articles use enhanced reader syntax; see manifest.compatibility.`);
  if (unresolvedLinks.length) console.warn(`${unresolvedLinks.length} articles have unresolved local links; see manifest.unresolvedLinks.`);
  return manifest;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const outputFlag = process.argv.indexOf('--output-dir');
  if (outputFlag >= 0 && !process.argv[outputFlag + 1]) throw new Error('--output-dir requires a path');
  await buildContent(outputFlag >= 0 ? { outputDir: resolve(process.argv[outputFlag + 1]) } : undefined);
}
