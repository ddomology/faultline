import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import Darkmode from "./Darkmode"

export default (() => {
  const ThemeToggle = Darkmode()
  const NotebookNav: QuartzComponent = (props: QuartzComponentProps) => {
    const home = `${pathToRoot(props.fileData.slug!)}/`
    const isHome = props.fileData.slug === "index"
    return (
      <>
        <nav class="notebook-nav" aria-label="기본 탐색">
          <a class="notebook-brand" href={home} aria-label="PortSwigger 풀이 노트 홈">
            <span class="notebook-brand-mark" aria-hidden="true">p<span>.</span></span>
            <span class="notebook-brand-text"><strong>PortSwigger</strong><span>LAB NOTES</span></span>
          </a>
          <div class="notebook-nav-actions">
            {!isHome && <a class="notebook-nav-link" href={home}>풀이 찾기</a>}
            {!isHome && <a class="notebook-nav-link" href={`${home}?view=all`}>전체 실습</a>}
            <a class="notebook-github" href="https://github.com/ddomology/portswigger-lab-notes" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            <span class="notebook-theme"><ThemeToggle {...props} /></span>
          </div>
        </nav>
        {!isHome && <a class="notebook-return" data-note-return href={home}><span aria-hidden="true">←</span> 풀이 목록</a>}
      </>
    )
  }
  NotebookNav.css = ThemeToggle.css
  NotebookNav.beforeDOMLoaded = ThemeToggle.beforeDOMLoaded
  NotebookNav.afterDOMLoaded = ThemeToggle.afterDOMLoaded
  return NotebookNav
}) satisfies QuartzComponentConstructor
