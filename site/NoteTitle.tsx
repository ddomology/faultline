import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

export default (() => {
  const NoteTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title
    const englishTitle = fileData.frontmatter?.english_title
    if (!title) return null
    return (
      <hgroup class={classNames(displayClass, "note-heading")}>
        <h1 class="article-title">{title}</h1>
        {typeof englishTitle === "string" && englishTitle !== title && (
          <p class="article-subtitle" lang="en">{englishTitle}</p>
        )}
      </hgroup>
    )
  }
  return NoteTitle
}) satisfies QuartzComponentConstructor
