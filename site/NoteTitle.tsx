import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import catalog from "./data/topic-catalog.json"
import TopicIcon from "./TopicIcon"
import DifficultyBars from "./DifficultyBars"

const levels: Record<string, string> = { Apprentice: "입문", Practitioner: "실전", Expert: "심화" }

export default (() => {
  const NoteTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title
    const englishTitle = fileData.frontmatter?.english_title
    const lab = catalog.labs.find(lab => lab.notePath.replace(/\.md$/, "") === fileData.slug)
    const category = lab && catalog.categories.find(category => category.id === lab.category)
    const number = lab && category ? `${String(catalog.categories.indexOf(category) + 1).padStart(2, "0")}.${String(catalog.labs.filter(item => item.category === lab.category).sort((a,b) => a.order - b.order || a.id.localeCompare(b.id)).findIndex(item => item.id === lab.id) + 1).padStart(2, "0")}` : ""
    if (!title) return null
    return (
      <div id="main-content" tabIndex={-1} class={classNames(displayClass, "note-heading")}>
        {lab && category && <div class="reader-meta" aria-label="실습 정보"><span class="reader-number">{number}</span><span class="reader-topic"><TopicIcon category={category.id} /><span>{category.title}</span></span><span class="reader-level"><DifficultyBars difficulty={lab.difficulty} /><span>{levels[lab.difficulty] || lab.difficulty}</span></span></div>}
        <h1 class="article-title">{title}</h1>
        {typeof englishTitle === "string" && englishTitle !== title && (
          <p class="article-subtitle" lang="en">{englishTitle}</p>
        )}
      </div>
    )
  }
  return NoteTitle
}) satisfies QuartzComponentConstructor
