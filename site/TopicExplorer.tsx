import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import catalog from "./data/topic-catalog.json"
import style from "./styles/topic-explorer.scss"
// @ts-ignore
import script from "./scripts/topic-explorer.inline"

const normalizeUrl = (value: unknown) => {
  try { const url = new URL(String(value || "")); return url.origin + url.pathname.replace(/\/+$/, "") } catch { return "" }
}
const byUrl = new Map(catalog.labs.map((lab) => [normalizeUrl(lab.url), lab]))
const bySlug = new Map(catalog.labs.map((lab) => [lab.notePath.replace(/\.md$/, ""), lab]))
const pad = (value: number) => String(value).padStart(2, "0")
type Note = { slug: string, path: string, title: string, order: number, number: string }
type Group = { id: string, title: string, number: string, labCount: number, notes: Note[] }

export default (() => {
  const TopicExplorer: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const root = pathToRoot(fileData.slug!)
    const groups: Group[] = catalog.categories.map((category, index) => ({ id: category.id, title: category.title, number: pad(index + 1), labCount: catalog.labs.filter(lab => lab.category === category.id).length, notes: [] }))
    const grouped = new Map(groups.map(group => [group.id, group]))
    const labNumbers = new Map<string, { number: string, order: number }>()
    groups.forEach(group => catalog.labs.filter(lab => lab.category === group.id).sort((a,b) => a.order - b.order || a.id.localeCompare(b.id)).forEach((lab,index) => labNumbers.set(lab.id, { number: `${group.number}.${pad(index + 1)}`, order: index })))
    for (const file of allFiles) {
      if (!file.slug || ["index", "guide", "notes"].includes(file.slug) || /(?:^|\/)(?:templates|private)(?:\/|$)/.test(file.slug)) continue
      const lab = byUrl.get(normalizeUrl(file.frontmatter?.lab_url)) || bySlug.get(file.slug)
      const category = lab?.category || String(file.frontmatter?.category || file.frontmatter?.topic || "notes")
      let group = grouped.get(category)
      if (!group) {
        group = { id: category, title: String(file.frontmatter?.category_title || (category === "notes" ? "개념 · 메모" : category)), number: "", labCount: 0, notes: [] }
        grouped.set(category, group); groups.push(group)
      }
      const numbering = lab ? labNumbers.get(lab.id) : undefined
      const path = String(file.filePath || file.slug).replaceAll("\\", "/").replace(/^(?:.*\/)?content\//, "")
      group.notes.push({ slug: file.slug, path, title: String(file.frontmatter?.title || lab?.title || file.slug.split("/").pop()), order: numbering?.order ?? Number.MAX_SAFE_INTEGER, number: numbering?.number || "" })
    }
    groups.filter(group => !group.number).sort((a,b) => a.id.localeCompare(b.id)).forEach((group,index) => { group.number = pad(catalog.categories.length + index + 1) })
    groups.forEach(group => {
      group.notes.filter(note => !note.number).sort((a,b) => a.path.localeCompare(b.path)).forEach((note,index) => { note.number = `${group.number}.${pad(group.labCount + index + 1)}`; note.order = group.labCount + index })
      group.notes.sort((a,b) => a.order - b.order)
    })
    const visible = groups.filter(group => group.notes.length).sort((a,b) => a.number.localeCompare(b.number))
    const total = visible.reduce((sum,group) => sum + group.notes.length, 0)
    return (
      <section class="topic-browser" aria-label="실습과 노트 탐색기">
        <button class="topic-mobile-toggle" type="button" aria-expanded="true" aria-controls="topic-note-panel"><span>Explorer <small>탐색기</small></span><span class="topic-toggle-arrow" aria-hidden="true">⌄</span></button>
        <div class="topic-note-panel" id="topic-note-panel">
          <div class="topic-heading"><span>Explorer <small>탐색기</small></span><span class="topic-total">{total}</span></div>
          <nav class="explorer-shortcuts" aria-label="목록 선택">
            <a data-explorer-view="notes" href={`${root}/`}>풀이 노트</a>
            <a data-explorer-view="all" href={`${root}/?view=all`}>전체 실습 <span>{catalog.labs.length}</span></a>
          </nav>
          <ul class="topic-tree">
            {visible.map(group => (
              <li class="topic-entry">
                <div class="topic-row">
                  <button class="topic-expand" type="button" aria-expanded="true" aria-controls={`topic-${group.id}`} aria-label={`${group.title} 접기`}><span aria-hidden="true">⌄</span></button>
                  <a class="topic-name" href={`${root}/?topic=${encodeURIComponent(group.id)}`}><span class="topic-number">{group.number}</span><span>{group.title}</span></a>
                </div>
                <ul class="topic-children" id={`topic-${group.id}`}>
                  {group.notes.map(note => <li><a href={`${root}/${note.slug.split("/").map(encodeURIComponent).join("/")}.html`} aria-current={note.slug === fileData.slug ? "page" : undefined}><span class="topic-note-number">{note.number}</span><span>{note.title}</span></a></li>)}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>
    )
  }
  TopicExplorer.css = style
  TopicExplorer.afterDOMLoaded = script
  return TopicExplorer
}) satisfies QuartzComponentConstructor
