import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

const NotebookNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <nav class="notebook-nav" aria-label="노트 탐색">
      <a class="notebook-home" href={`${root}/`}>← 전체 문제</a>
      <a href={`${root}/notes.html`}>노트 모아보기</a>
      <a href={`${root}/guide.html`}>작성 안내</a>
    </nav>
  )
}

export default (() => NotebookNav) satisfies QuartzComponentConstructor
