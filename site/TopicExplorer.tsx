import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import catalog from "./data/topic-catalog.json"
import style from "./styles/topic-explorer.scss"
import Icon from "./Icon"
import TopicIcon from "./TopicIcon"
// @ts-ignore
import script from "./scripts/topic-explorer.inline"

const normalizeUrl = (value: unknown) => {
  try { const url = new URL(String(value || "")); return url.origin + url.pathname.replace(/\/+$/, "") } catch { return "" }
}
const byUrl = new Map(catalog.labs.map((lab) => [normalizeUrl(lab.url), lab]))
const bySlug = new Map(catalog.labs.map((lab) => [lab.notePath.replace(/\.md$/, ""), lab]))
const pad = (value: number) => String(value).padStart(2, "0")
type View = "notes" | "concepts"
const viewNames: Record<View, string> = { notes: "풀이 노트", concepts: "개념 노트" }
type Note = { slug: string, path: string, title: string, originalTitle: string, order: number, number: string, view: View }
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
      const title = String(file.frontmatter?.title || lab?.title || file.slug.split("/").pop())
      group.notes.push({ slug: file.slug, path, title, originalTitle: lab?.title || "", order: numbering?.order ?? Number.MAX_SAFE_INTEGER, number: numbering?.number || "", view: lab ? "notes" : "concepts" })
    }
    groups.filter(group => !group.number).sort((a,b) => a.id.localeCompare(b.id)).forEach((group,index) => { group.number = pad(catalog.categories.length + index + 1) })
    groups.forEach(group => {
      group.notes.filter(note => !note.number).sort((a,b) => a.path.localeCompare(b.path)).forEach((note,index) => { note.number = `${group.number}.${pad(group.labCount + index + 1)}`; note.order = group.labCount + index })
      group.notes.sort((a,b) => a.order - b.order)
    })
    const visible = groups.filter(group => group.notes.length).sort((a,b) => a.number.localeCompare(b.number))
    const trees = (["notes", "concepts"] as const).map(view => {
      const topics = visible.map(group => ({ ...group, notes: group.notes.filter(note => note.view === view) })).filter(group => group.notes.length)
      return { view, topics, total: topics.reduce((sum,group) => sum + group.notes.length, 0) }
    })
    const currentView = visible.flatMap(group => group.notes).find(note => note.slug === fileData.slug)?.view || "notes"
    const total = trees.find(tree => tree.view === currentView)!.total
    const conceptCount = trees.find(tree => tree.view === "concepts")!.total
    return (
      <section class="topic-browser" data-explorer-mode={currentView} aria-label={`${viewNames[currentView]} 탐색기`}>
        <a class="skip-to-content" href="#main-content">본문 바로가기</a>
        <button class="topic-mobile-toggle" type="button" aria-expanded="false" aria-controls="topic-note-panel"><span>Explorer <small>탐색기</small></span><Icon name="chevron-down" className="topic-toggle-arrow" /></button>
        <div class="topic-note-panel" id="topic-note-panel">
          <div class="topic-heading"><span>Explorer <small>탐색기</small></span><span class="topic-total">{total}</span></div>
          <nav class="explorer-shortcuts" aria-label="목록 선택">
            <a data-explorer-view="notes" href={`${root}/`}>풀이 노트 <span>{catalog.labs.length}</span></a>
            <a data-explorer-view="concepts" href={`${root}/?view=concepts`}>개념 노트 <span>{conceptCount}</span></a>
          </nav>
          {trees.map(tree => <ul class="topic-tree" data-explorer-tree={tree.view} data-total={tree.total} aria-label={`${viewNames[tree.view]} 주제`} hidden={tree.view !== currentView}>
            {!tree.topics.length && <li class="topic-empty">등록된 {viewNames[tree.view]}가 없습니다.</li>}
            {tree.topics.map(group => {
              const expanded = group.notes.some(note => note.slug === fileData.slug)
              const childrenId = `topic-${tree.view}-${group.id}`
              const query = `${tree.view === "concepts" ? "view=concepts&" : ""}topic=${encodeURIComponent(group.id)}`
              return (
              <li class={`topic-entry${expanded ? " is-current-topic" : ""}`} data-topic={group.id}>
                <div class="topic-row">
                  <button class="topic-expand" type="button" aria-expanded={expanded} aria-controls={childrenId} aria-label={`${group.title} ${expanded ? "접기" : "펼치기"}`}><Icon name="chevron-down" /></button>
                  <a class="topic-name" href={`${root}/?${query}`}><span class="topic-number">{group.number}</span><TopicIcon category={group.id} /><span>{group.title}</span></a>
                  <span class="topic-count" aria-label={`${group.notes.length}개 노트`}>{group.notes.length}</span>
                </div>
                <ul class="topic-children" id={childrenId} hidden={!expanded}>
                  {group.notes.map(note => <li><a href={`${root}/${note.slug.split("/").map(encodeURIComponent).join("/")}.html`} title={[...new Set([note.title, note.originalTitle].filter(Boolean))].join("\n")} aria-current={note.slug === fileData.slug ? "page" : undefined}><span class="topic-note-number">{note.number}</span><span class="topic-note-title">{note.title}</span></a></li>)}
                </ul>
              </li>
            )})}
          </ul>)}
        </div>
      </section>
    )
  }
  TopicExplorer.css = style
  TopicExplorer.afterDOMLoaded = script
  return TopicExplorer
}) satisfies QuartzComponentConstructor
