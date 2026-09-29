import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(resolve('_quartz/package.json'));
const matter = require('gray-matter');
const root = resolve('_quartz/content');
const notes = [];
function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['private','templates'].includes(entry.name)) continue;
    const file = join(dir,entry.name);
    if (entry.isDirectory()) { walk(file); continue; }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue;
    const notePath = relative(root,file).replaceAll('\\','/');
    if (['index.md','guide.md'].includes(notePath)) continue;
    const { data, content } = matter(readFileSync(file,'utf8'));
    if (data.draft === true || data.draft === 'true') continue;
    const title = String(data.title || content.match(/^#\s+(.+)$/m)?.[1] || entry.name.slice(0,-3));
    notes.push({path: notePath, title, topic: notePath.includes('/') ? notePath.split('/').slice(0,-1).join('/') : '노트'});
  }
}
walk(root);
notes.sort((a,b)=>a.topic.localeCompare(b.topic)||a.title.localeCompare(b.title));
const escape = value => value.replace(/[\\\[\]<>|]/g, '\\$&');
let body = readFileSync('content/index.md','utf8').trimEnd() + '\n\n## 노트 · ' + notes.length + '\n\n';
if (!notes.length) body += '아직 공개된 풀이 노트가 없습니다. `content/`에 `.md` 파일을 넣고 GitHub에 올리면 여기에 자동으로 표시됩니다.\n';
let topic='';
for(const note of notes) {
  if(note.topic!==topic){topic=note.topic;body+='\n### '+escape(topic)+'\n\n';}
  body+='- ['+escape(note.title)+']('+note.path.split('/').map(encodeURIComponent).join('/')+')\n';
}
writeFileSync(join(root,'index.md'),body);
console.log('Indexed '+notes.length+' public Obsidian notes.');
