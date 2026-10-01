import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve, dirname, join } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(join(root, 'site/concept-tags.json'), 'utf8'))
const topicCount = new Set(registry.tags.filter(tag => tag.icon.startsWith('topics/')).map(tag => tag.icon)).size
const conceptCount = new Set(registry.tags.filter(tag => tag.icon.startsWith('concepts/')).map(tag => tag.icon)).size
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')
const parts = []
let y = 116
for (const group of registry.groups) {
  const tags = registry.tags.filter(tag => tag.group === group.id)
  parts.push(`<text x="28" y="${y}" font-size="15" font-weight="600" fill="#20252b">${escape(group.label)}</text>`)
  y += 18
  for (const [index, tag] of tags.entries()) {
    const x = 28 + index % 3 * 264
    const rowY = y + Math.floor(index / 3) * 50
    const svg = readFileSync(join(root, 'site/assets/icons', tag.icon), 'utf8')
    const body = svg.replace(/^.*?<svg\b[^>]*>/s, '').replace(/<\/svg>\s*$/, '').replace(/<title>.*?<\/title>/s, '')
      .replaceAll('var(--topic-icon-accent, currentColor)', '#c33b43')
    parts.push(`<g transform="translate(${x} ${rowY})"><rect width="248" height="38" rx="4" fill="#f8f9fa" stroke="#e2e5e9"/><g transform="translate(11 9) scale(.833333)" color="#68717c" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${body}</g><text x="40" y="24" font-size="13" font-weight="500" fill="#343b43">${escape(tag.label)}</text></g>`)
  }
  y += Math.ceil(tags.length / 3) * 50 + 24
}
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" width="840" height="${y + 12}" viewBox="0 0 840 ${y + 12}" role="img" aria-labelledby="title description" font-family="'Pretendard Variable', Pretendard, 'Noto Sans KR', 'Malgun Gothic', sans-serif">
<title id="title">Faultline 개념 태그 ${registry.tags.length}종</title>
<desc id="description">웹의 동작, 브라우저와 상태, 데이터와 문법, 인증과 암호, 취약점, 방어와 분석의 아이콘 태그 모음.</desc>
<rect width="840" height="${y + 12}" fill="#ffffff"/>
<text x="28" y="46" font-size="24" font-weight="650" fill="#20252b">개념 태그</text>
<text x="28" y="72" font-size="13" fill="#68717c">${registry.tags.length}개 주제 · 필요한 태그만 골라서 사용</text>
${parts.join('\n')}
</svg>\n`
writeFileSync(join(root, 'docs/assets/concept-tags.svg'), sheet)

const guide = [
  '# 개념 태그', '',
  `개념 노트에 사용할 SVG 아이콘 태그 ${registry.tags.length}종을 준비했습니다. 기존 주제 아이콘 ${topicCount}종과 새 기반 지식·방어 아이콘 ${conceptCount}종을 함께 사용합니다.`, '',
  `![Faultline 개념 태그 ${registry.tags.length}종](assets/concept-tags.svg)`, '',
  '## 사용하기', '',
  '개념 노트의 맨 위 메타데이터에 필요한 태그만 적습니다. 한 글에 여러 개를 달 수 있습니다.', '',
  '```yaml', 'tags:', '  - HTTP', '  - 쿠키', '  - 세션', '```', '',
  '등록된 이름·ID·별칭을 모두 인식합니다. 예를 들어 `cookie`와 `쿠키`는 같은 태그로 표시됩니다. 태그를 클릭하면 같은 태그가 붙은 개념 글로 이동합니다.', '',
  '`tags: []` 또는 생략한 경우 태그 영역이 생기지 않습니다. 목록에 없는 이름도 `#` 표시가 붙은 텍스트 태그로 사용할 수 있습니다. 기존 풀이 노트에는 태그를 자동으로 달지 않으며, 글 끝의 **관련 개념** 링크는 계속 직접 작성합니다.', '',
  '[개념 노트 템플릿](../content/templates/concept.md)은 사이트에 글로 발행되지 않습니다. 실제로 작성할 때 `content/` 안의 원하는 폴더로 복사하세요.', '',
  '## 준비된 태그', '',
]
for (const group of registry.groups) {
  guide.push(`### ${group.label}`, '', '| 태그 이름 | ID | 함께 인식하는 표기 |', '| --- | --- | --- |')
  for (const tag of registry.tags.filter(tag => tag.group === group.id)) guide.push(`| ${tag.label} | \`${tag.id}\` | ${tag.aliases.map(alias => `\`${alias}\``).join(', ') || '—'} |`)
  guide.push('')
}
guide.push('## 에셋 관리', '',
  '- [태그 목록](../site/concept-tags.json)에 표시 이름, 별칭, SVG 경로를 한 번만 등록합니다.',
  '- [새 개념 SVG](../site/assets/icons/concepts/)와 [기존 주제 SVG](../site/assets/icons/topics/)는 24×24 벡터입니다.',
  '- 기존 태그 ID는 링크 주소에 쓰이므로 유지하고, 이름 변경은 `label`과 `aliases`로 처리합니다.',
  '- 목록이나 SVG를 수정했다면 저장소 루트에서 `node scripts/generate-concept-tag-sheet.mjs`를 실행해 이 안내와 미리보기를 갱신합니다.', '')
writeFileSync(join(root, 'docs/concept-tags.md'), guide.join('\n'))
console.log(`Generated ${registry.tags.length} concept tag previews and author guide.`)
