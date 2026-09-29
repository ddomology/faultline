import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import catalog from "./data/topic-catalog.json"
import style from "./styles/topic-explorer.scss"
// @ts-ignore
import script from "./scripts/topic-explorer.inline"

const normalizeUrl = (value: unknown) => {
  try {
    const url = new URL(String(value || ""))
    return url.origin + url.pathname.replace(/\/+$/, "")
  } catch { return "" }
}
const byUrl = new Map(catalog.labs.map((lab) => [normalizeUrl(lab.url), lab]))
const bySlug = new Map(catalog.labs.map((lab) => [lab.notePath.replace(/\.md$/, ""), lab]))

export default (() => {
  const TopicExplorer: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const root = pathToRoot(fileData.slug!)
    type Note = { slug: string, title: string, order: number }
    type NoteGroup = { id: string, title: string, notes: Note[] }
    const groups: NoteGroup[] = catalog.categories.map((category) => ({ id: category.id, title: category.title, notes: [] }))
    const grouped = new Map(groups.map((group) => [group.id, group]))
    for (const file of allFiles) {
      if (!file.slug || ["index", "guide", "notes"].includes(file.slug) || /(?:^|\/)(?:templates|private)(?:\/|$)/.test(file.slug)) continue
      const lab = byUrl.get(normalizeUrl(file.frontmatter?.lab_url)) || bySlug.get(file.slug)
      if (lab) {
        grouped.get(lab.category)?.notes.push({ slug: file.slug, title: String(file.frontmatter?.title || lab.title), order: lab.order })
        continue
      }
      const category = String(file.frontmatter?.category || file.frontmatter?.topic || "notes")
      let group = grouped.get(category)
      if (!group) {
        const title = String(file.frontmatter?.category_title || (category === "notes" ? "개념 · 메모" : category))
        group = { id: category, title, notes: [] }
        grouped.set(category, group)
        groups.push(group)
      }
      group.notes.push({ slug: file.slug, title: String(file.frontmatter?.title || file.slug.split("/").pop()), order: Number.MAX_SAFE_INTEGER })
    }
    const noteGroups = groups.filter((group) => group.notes.length > 0)
    const total = noteGroups.reduce((count, group) => count + group.notes.length, 0)
    return (
      <section class="topic-browser" aria-label="실습과 노트 목록">
        <button class="topic-mobile-toggle" type="button" aria-expanded="false" aria-controls="topic-note-panel">
          <span>실습 · 노트 <span class="topic-total">{total}</span></span><span class="topic-toggle-arrow" aria-hidden="true">⌄</span>
        </button>
        <div class="topic-note-panel" id="topic-note-panel">
          <div class="topic-heading"><span>실습 · 노트</span><span class="topic-total">{total}</span></div>
          <ul class="topic-tree">
            {noteGroups.map((group) => (
              <li class="topic-entry">
                <a class="topic-name" href={`${root}/?topic=${encodeURIComponent(group.id)}`}><span>{group.title}</span><span class="topic-count">{group.notes.length}</span></a>
                <ul class="topic-children">
                  {group.notes.sort((a, b) => a.order - b.order).map((note) => (
                    <li><a href={`${root}/${note.slug.split("/").map(encodeURIComponent).join("/")}.html`} aria-current={note.slug === fileData.slug ? "page" : undefined}>
                      {Number.isSafeInteger(note.order) && note.order < Number.MAX_SAFE_INTEGER ? <span class="topic-item-index" aria-hidden="true">{String(note.order).padStart(3, "0")}</span> : null}
                      <span class="topic-item-title">{note.title}</span>
                    </a></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <a class="topic-all" href={`${root}/?view=all`}>전체 실습 보기 <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    )
  }
  TopicExplorer.css = style
  TopicExplorer.afterDOMLoaded = script
  return TopicExplorer
}) satisfies QuartzComponentConstructor
