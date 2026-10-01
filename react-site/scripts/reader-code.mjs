import rehypePrettyCode from 'rehype-pretty-code';
import { formatCode, getCodeFormatLanguage } from './code-format.ts';
import { createReaderHighlighter, readerCodeThemes } from './code-highlight.ts';

const walk = (node, fn) => { fn(node); for (const child of node.children || []) walk(child, fn); };
const element = (tagName, properties, children) => ({ type: 'element', tagName, properties, children });
const codeOf = node => node.children?.find(child => child.type === 'element' && child.tagName === 'code');
const preOf = node => node.tagName === 'pre' ? node : node.children?.find(child => child.tagName === 'pre');
const aliases = {
  psm1: 'powershell', psd1: 'powershell', pwsh: 'powershell', ps1: 'powershell', https: 'http',
  env: 'dotenv', 'shell-session': 'shellsession', plain: 'text', txt: 'text', plaintext: 'text',
  lwc: 'html', mjml: 'html', kotlin_script: 'kotlin', objcpp: 'objective-cpp', 'objective-c++': 'objective-cpp',
};

// One collection per document. Source strings come from the Markdown AST, never
// from highlighted DOM text or an authored data-* attribute.
export function readerCode() {
  const records = new Map();
  const remark = () => async tree => {
    const jobs = [];
    walk(tree, node => {
      if (node.type !== 'code') return;
      const language = node.lang?.toLowerCase() || 'text';
      const flags = node.meta?.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
      const definition = getCodeFormatLanguage(language);
      const fragment = flags.includes('fragment') || language === 'sql-fragment';
      const plain = flags.includes('nohighlight') || Buffer.byteLength(node.value) > 64 * 1024;
      const highlight = plain ? 'text' : fragment && (definition?.engine === 'sql' || language === 'sql-fragment')
        ? 'sql-fragment' : aliases[language] || definition?.highlight || language;
      const record = { source: node.value, language: language === 'sql-fragment' ? 'sql' : language, fragment, highlight, meta: node.meta || '', formatted: null };
      records.set(node.position.start.offset, record);
      if (!plain && !fragment && !flags.includes('noformat')) jobs.push(formatCode(node.value, language).then(value => { record.formatted = value; }));
    });
    await Promise.all(jobs);
  };
  const prepare = () => tree => {
    const transform = parent => {
      parent.children = parent.children?.flatMap(node => {
        if (node.tagName === 'pre' && codeOf(node)) {
          const code = codeOf(node);
          const key = node.position?.start.offset;
          const record = records.get(key);
          if (record) {
            node.properties.dataReaderKey = String(key);
            code.properties.className = ['language-' + record.highlight];
            code.data = { meta: record.meta };
            if (record.formatted !== null) {
              const meta = /(?:^|\s)showLineNumbers(?:\{\d+\})?(?:\s|$)/.test(record.meta) ? 'showLineNumbers' : '';
              const variant = element('code', { className: code.properties.className }, [{ type: 'text', value: record.formatted + '\n' }]);
              variant.data = { meta };
              return [node, element('pre', { dataReaderVariant: String(key) }, [variant])];
            }
          }
        }
        if (node.children) transform(node);
        return [node];
      });
    };
    transform(tree);
  };
  const finish = () => tree => {
    const originals = new Map();
    walk(tree, node => {
      const key = node.properties?.dataReaderKey;
      if (key === undefined) return;
      const pre = preOf(node);
      const record = records.get(Number(key));
      if (!pre || !record) throw new Error('Reader code source was lost');
      delete node.properties.dataReaderKey;
      delete pre.properties.tabIndex;
      pre.data = { readerCode: record };
      codeOf(pre).properties['data-reader-view'] = 'source';
      originals.set(String(key), pre);
    });
    const transform = parent => {
      parent.children = parent.children?.filter(node => {
        const key = node.properties?.dataReaderVariant;
        if (key !== undefined) {
          const pre = originals.get(String(key));
          const formatted = codeOf(preOf(node) || {});
          if (!pre || !formatted) throw new Error('Reader code variant was lost');
          const source = codeOf(pre);
          let annotated = false;
          walk(source, child => { if (child.properties && (Object.hasOwn(child.properties, 'data-highlighted-line') || Object.hasOwn(child.properties, 'data-highlighted-chars'))) annotated = true; });
          source.properties.hidden = !annotated;
          formatted.properties.hidden = annotated;
          formatted.properties['data-reader-view'] = 'formatted';
          pre.data.readerCode.initial = annotated ? 'source' : 'formatted';
          pre.children.push(formatted);
          return false;
        }
        if (node.children) transform(node);
        return true;
      });
    };
    transform(tree);
  };
  return { remark, prepare, finish, highlight: [rehypePrettyCode, { theme: readerCodeThemes, keepBackground: false, getHighlighter: createReaderHighlighter, bypassInlineCode: true }] };
}
