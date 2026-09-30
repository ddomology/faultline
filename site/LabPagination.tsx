import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import catalog from "./data/topic-catalog.json"
import shortTitles from "./data/explorer-titles.json"
import Icon from "./Icon"
import TopicIcon from "./TopicIcon"
import style from "./styles/lab-pagination.scss"

const pad = (value: number) => String(value).padStart(2, "0")

export default (() => {
  const LabPagination: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
    const lab = catalog.labs.find(item => item.notePath.replace(/\.md$/, "") === fileData.slug)
    if (!lab) return null

    const categoryIndex = catalog.categories.findIndex(category => category.id === lab.category)
    const files = new Map(allFiles.map(file => [String(file.slug), file]))
    // Match Explorer order and numbering; only link to notes in this build.
    const sequence = catalog.labs.filter(item => item.category === lab.category)
      .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
      .map((item, index) => ({ item, index, file: files.get(item.notePath.replace(/\.md$/, "")) }))
      .filter(entry => entry.file?.slug)
    const currentIndex = sequence.findIndex(entry => entry.item.id === lab.id)
    if (categoryIndex < 0 || currentIndex < 0) return null

    const previous = sequence[currentIndex - 1]
    const next = sequence[currentIndex + 1]
    if (!previous && !next) return null
    const root = pathToRoot(fileData.slug!)

    const link = (entry: typeof previous, direction: "previous" | "next") => {
      if (!entry?.file?.slug) return null
      const label = direction === "previous" ? "이전 실습" : "다음 실습"
      const number = `${pad(categoryIndex + 1)}.${pad(entry.index + 1)}`
      const fullTitle = String(entry.file.frontmatter?.title || entry.item.title)
      const title = shortTitles[entry.item.id as keyof typeof shortTitles] || fullTitle
      const href = `${root}/${entry.file.slug.split("/").map(encodeURIComponent).join("/")}.html`
      return (
        <a class={`lab-pagination-link is-${direction}`} href={href} rel={direction === "previous" ? "prev" : "next"} aria-label={`${label} ${number}: ${fullTitle}`} title={fullTitle}>
          <span class="lab-pagination-direction">
            {direction === "previous" && <Icon name="arrow-left" />}
            <span>{label}</span>
            {direction === "next" && <Icon name="arrow-left" className="lab-pagination-forward" />}
          </span>
          <span class="lab-pagination-meta"><TopicIcon category={entry.item.category} /><span>{number}</span></span>
          <span class="lab-pagination-title">{title}</span>
        </a>
      )
    }

    return <nav class="lab-pagination" aria-label="같은 주제의 이전·다음 실습">{link(previous, "previous")}{link(next, "next")}</nav>
  }
  LabPagination.css = style
  return LabPagination
}) satisfies QuartzComponentConstructor
