import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import Darkmode from "./Darkmode"
import Icon from "./Icon"
import brandMark from "./data/brand-mark.json"

export default (() => {
  const ThemeToggle = Darkmode()
  const NotebookNav: QuartzComponent = (props: QuartzComponentProps) => {
    const home = `${pathToRoot(props.fileData.slug!)}/`
    const isHome = props.fileData.slug === "index"
    return (
      <>
        <nav class="notebook-nav" aria-label="기본 탐색">
          <a class="notebook-brand" href={home} aria-label="PortSwigger 풀이 노트 홈">
            <svg class="notebook-brand-mark" viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: brandMark.body }} />
            PortSwigger <span aria-hidden="true">/</span> Notes
          </a>
          <div class="notebook-nav-actions">
            <a class="notebook-github" href="https://github.com/ddomology/portswigger-lab-notes" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow-up-right" /></a>
            <span class="notebook-theme"><ThemeToggle {...props} /></span>
          </div>
        </nav>
        {!isHome && <a class="notebook-return" data-note-return href={home}><Icon name="arrow-left" /> 풀이 목록</a>}
      </>
    )
  }
  NotebookNav.css = ThemeToggle.css
  NotebookNav.beforeDOMLoaded = ThemeToggle.beforeDOMLoaded
  NotebookNav.afterDOMLoaded = ThemeToggle.afterDOMLoaded
  return NotebookNav
}) satisfies QuartzComponentConstructor
