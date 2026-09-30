import { posix } from 'node:path';
import { slug } from 'github-slugger';

const text = value => ({ type: 'text', value });
const block = (tag, properties, children) => ({ type: 'blockquote', data: { hName: tag, hProperties: properties }, children });
const element = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
const calloutNames = { note: '참고', info: '정보', tip: '팁', success: '완료', warning: '주의', danger: '경고', question: '질문', example: '예시', quote: '인용', failure: '실패', bug: '문제' };

export function remarkNotebook({ sourcePath, knownNotes, assets }) {
  const paths = [...knownNotes, ...assets];
  const wikiUrl = target => {
    const [path, ...heading] = target.split('#');
    const suffix = heading.length ? '#' + encodeURIComponent(slug(heading.join('#'))) : '';
    if (!path) return suffix;
    const relative = posix.normalize(posix.join(posix.dirname(sourcePath), path));
    const root = path.replace(/^\//, '');
    const candidates = [relative, relative + '.md', root, root + '.md'];
    let found = candidates.find(candidate => knownNotes.has(candidate) || assets.has(candidate));
    if (!found) {
      const basename = paths.filter(candidate => posix.basename(candidate).replace(/\.md$/, '') === posix.basename(path).replace(/\.md$/, ''));
      if (basename.length === 1) found = basename[0];
    }
    return (found ? '/' + found : path) + suffix;
  };
  const transform = (parent, inLink = false) => {
    parent.children = parent.children?.flatMap(node => {
      if (node.type === 'text' && !inLink) {
        const parts = [];
        let offset = 0;
        for (const match of node.value.matchAll(/(!?)\[\[([^\]\n]+)\]\]/g)) {
          parts.push(text(node.value.slice(offset, match.index)));
          const [target, ...labelParts] = match[2].split('|');
          const label = labelParts.join('|') || target;
          const url = wikiUrl(target.trim());
          if (match[1] && /\.(?:png|jpe?g|gif|webp|avif|svg)(?:#|$)/i.test(target)) parts.push({ type: 'image', url, alt: label });
          else parts.push({ type: 'link', url, children: [text(label)] });
          offset = match.index + match[0].length;
        }
        if (parts.length) return [...parts, text(node.value.slice(offset))];
      }
      if (node.type === 'blockquote') {
        const first = node.children[0];
        const marker = first?.type === 'paragraph' && first.children[0]?.type === 'text'
          ? first.children[0].value.match(/^\[!([\w-]+)\]([+-])?(?:[ \t]+([^\n]*))?(?:\n|$)/) : null;
        if (marker) {
          const type = marker[1].toLowerCase();
          const title = marker[3]?.trim() || calloutNames[type] || type;
          first.children[0].value = first.children[0].value.slice(marker[0].length);
          if (first.children.every(child => child.type === 'text' && !child.value)) node.children.shift();
          transform(node);
          const heading = { type: 'paragraph', data: { hName: marker[2] ? 'summary' : 'div', hProperties: { className: ['callout-title'] } }, children: [text(title)] };
          return [block(marker[2] ? 'details' : 'aside', { className: ['callout'], 'data-callout': type, ...(marker[2] === '+' ? { open: true } : {}) }, [heading, block('div', { className: ['callout-content'] }, node.children)])];
        }
      }
      if (node.children) transform(node, inLink || node.type === 'link');
      return [node];
    });
  };
  return tree => transform(tree);
}

// These wrappers are added after sanitization; authored HTML cannot opt into
// privileged reader components. Tables and figures reserve their space in SSR.
export function rehypeReaderStructure() {
  const transform = (parent, linked = false) => {
    parent.children = parent.children?.map(node => {
      if (node.type !== 'element') return node;
      if (node.tagName === 'img' && !linked && node.properties.role !== 'presentation') node.data = { readerImage: true };
      if (node.children) transform(node, linked || ['a', 'button'].includes(node.tagName));
      if (node.tagName === 'table') return element('div', { className: ['table-container'] }, [node]);
      if (node.tagName === 'p') {
        const significant = node.children.filter(child => child.type !== 'text' || child.value.trim());
        const image = significant[0];
        if (significant.length === 1 && image?.tagName === 'img') {
          const caption = String(image.properties.alt || '').trim();
          const descriptive = caption && !/^(?:image|img|screenshot|이미지|스크린샷|화면\s*캡처)(?:[\s_-]*\d+)?$/i.test(caption) && !/\.(?:png|jpe?g|gif|webp|avif|svg)$/i.test(caption);
          return element('figure', { className: ['reader-screenshot'] }, [element('div', { className: ['reader-image-frame'] }, [image]), ...(descriptive ? [element('figcaption', {}, [text(caption)])] : [])]);
        }
      }
      return node;
    });
  };
  return tree => transform(tree);
}

export function compactTree(tree) {
  // Locations are useful while building, but repeat every source position in
  // route data. Only the reader component's explicit data needs to survive.
  delete tree.position;
  if (tree.data) {
    const { readerCode, readerImage } = tree.data;
    tree.data = { ...(readerCode ? { readerCode } : {}), ...(readerImage ? { readerImage } : {}) };
    if (!Object.keys(tree.data).length) delete tree.data;
  }
  for (const child of tree.children || []) compactTree(child);
  return tree;
}

export function rehypeReaderFootnotes() {
  return tree => {
    const all = [];
    const walk = node => { all.push(node); for (const child of node.children || []) walk(child); };
    walk(tree);
    const sections = all.filter(node => Object.hasOwn(node.properties || {}, 'dataFootnotes'));
    if (!sections.length) return;
    const targets = new Map();
    for (const node of all.filter(node => Object.hasOwn(node.properties || {}, 'dataFootnoteRef'))) {
      const key = node.properties.href;
      if (!targets.has(key)) targets.set(key, { id: `reader-footnote-${targets.size + 1}`, references: [] });
      const target = targets.get(key);
      const reference = `${target.id}-ref-${target.references.length + 1}`;
      target.references.push(reference);
      Object.assign(node.properties, { id: reference, href: '#' + target.id, ariaDescribedBy: ['reader-footnote-label'] });
    }
    for (const section of sections) {
      const heading = section.children.find(node => node.tagName === 'h2');
      if (heading) heading.properties.id = 'reader-footnote-label';
      const items = section.children.find(node => node.tagName === 'ol')?.children.filter(node => node.tagName === 'li') || [];
      const entries = [...targets.values()];
      items.forEach((item, index) => {
        const target = entries[index];
        if (!target) return;
        item.properties.id = target.id;
        let back = 0;
        const rewrite = node => {
          if (Object.hasOwn(node.properties || {}, 'dataFootnoteBackref')) node.properties.href = '#' + target.references[back++];
          for (const child of node.children || []) rewrite(child);
        };
        rewrite(item);
      });
    }
  };
}
