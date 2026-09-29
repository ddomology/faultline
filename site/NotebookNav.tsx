import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const NotebookNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  const current = fileData.slug === "index" ? "problems" : fileData.slug === "guide" ? "guide" : "notes"
  return (
    <nav class="notebook-nav" aria-label="노트 탐색">
      <a class="notebook-home" href={`${root}/`} aria-current={current === "problems" ? "page" : undefined}>문제</a>
      <a href={`${root}/notes.html`} aria-current={current === "notes" ? "page" : undefined}>노트</a>
      <a href={`${root}/guide.html`} aria-current={current === "guide" ? "page" : undefined}>작성 안내</a>
    </nav>
  )
}

export default (() => NotebookNav) satisfies QuartzComponentConstructor
