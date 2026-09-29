import { cloneElement, isValidElement, toChildArray, VNode } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import Explorer from "./Explorer"
import { pathToRoot } from "../util/path"
import { concatenateResources } from "../util/resources"
import catalog from "./data/topic-catalog.json"
import aliases from "./data/topic-aliases.json"
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
  const BaseExplorer = Explorer({ title: "주제별 탐색" })
  const TopicExplorer: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, allFiles } = props
    const root = pathToRoot(fileData.slug!)
    const home = `${root}/`
    const groups = catalog.categories.map((category) => ({ ...category, notes: [] as { slug: string, title: string }[] }))
    const grouped = new Map(groups.map((group) => [group.id, group]))
    let currentTopic = ""
    for (const file of allFiles) {
      if (!file.slug || file.frontmatter?.draft === true || file.frontmatter?.draft === "true") continue
      const lab = byUrl.get(normalizeUrl(file.frontmatter?.lab_url)) || bySlug.get(file.slug)
      if (!lab) continue
      grouped.get(lab.category)?.notes.push({ slug: file.slug, title: String(file.frontmatter?.title || lab.title) })
      if (file.slug === fileData.slug) currentTopic = lab.category
    }
    const topics = (
      <section class="topic-browser" data-current-topic={currentTopic} data-home={home} aria-label="보안 주제별 탐색">
        <div class="topic-shortcuts">
          <a class="topic-link" data-topic="all" href={home}><span>전체 문제</span><span class="topic-count">{catalog.labs.length}</span></a>
          <a href={`${root}/notes.html`} aria-current={fileData.slug === "notes" ? "page" : undefined}>풀이 노트 모아보기</a>
        </div>
        <label class="topic-search"><span>주제 찾기</span><input type="search" placeholder="SQL, XSS, 인증…" aria-label="보안 주제 검색" autoComplete="off" /></label>
        <p class="topic-search-status" role="status" aria-live="polite">{groups.length}개 주제 · 문제 수 / 공개 풀이</p>
        <ul class="topic-tree">
          {groups.map((group) => {
            const expanded = currentTopic === group.id && group.notes.length > 0
            const id = `topic-notes-${group.id}`
            const keywords = (aliases as Record<string, string[]>)[group.id] || []
            return (
              <li class="topic-entry" data-topic={group.id} data-search={`${group.title} ${group.id} ${keywords.join(" ")}`.toLocaleLowerCase()}>
                <div class="topic-row">
                  {group.notes.length > 0 ? <button type="button" class="topic-expand" aria-expanded={expanded} aria-controls={id} aria-label={`${group.title} 풀이 목록 ${expanded ? "접기" : "펼치기"}`}>›</button> : <span class="topic-spacer" aria-hidden="true" />}
                  <a class={`topic-link${currentTopic === group.id ? " active" : ""}`} data-topic={group.id} href={`${home}?topic=${encodeURIComponent(group.id)}`} aria-current={currentTopic === group.id ? "page" : undefined} title={`${group.title}: 문제 ${group.count}개, 공개 풀이 ${group.notes.length}개`}>
                    <span class="topic-name">{group.title}</span><span class="topic-count">{group.count}</span>
                    {group.notes.length > 0 && <span class="topic-note-count">풀이 {group.notes.length}</span>}
                  </a>
                </div>
                {group.notes.length > 0 && <ul class="topic-children" id={id} hidden={!expanded}>
                  {group.notes.map((note) => <li><a href={`${root}/${note.slug.split("/").map(encodeURIComponent).join("/")}.html`} class={note.slug === fileData.slug ? "active" : undefined} aria-current={note.slug === fileData.slug ? "page" : undefined}>{note.title}</a></li>)}
                </ul>}
              </li>
            )
          })}
        </ul>
      </section>
    )
    const tree = (BaseExplorer as (props: QuartzComponentProps) => VNode)(props)
    const children = toChildArray(tree.props.children).map((child) => {
      if (!isValidElement(child) || child.props.class !== "explorer-content") return child
      return cloneElement(child, {}, topics, <details class="topic-file-browser"><summary>노트 폴더로 탐색</summary>{child.props.children}</details>)
    })
    return cloneElement(tree, {}, ...children)
  }
  TopicExplorer.css = concatenateResources(BaseExplorer.css, style)
  TopicExplorer.beforeDOMLoaded = BaseExplorer.beforeDOMLoaded
  TopicExplorer.afterDOMLoaded = concatenateResources(BaseExplorer.afterDOMLoaded, script)
  return TopicExplorer
}) satisfies QuartzComponentConstructor
