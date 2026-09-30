import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import Darkmode from "./Darkmode"
import Icon from "./Icon"
import brandMark from "./data/brand-mark.json"
import catalog from "./data/topic-catalog.json"
import brand from "./data/brand.json"

export default (() => {
  const ThemeToggle = Darkmode()
  const NotebookNav: QuartzComponent = (props: QuartzComponentProps) => {
    const home = `${pathToRoot(props.fileData.slug!)}/`
    const isHome = props.fileData.slug === "index"
    const isLab = catalog.labs.some(lab => lab.notePath.replace(/\.md$/, "") === props.fileData.slug || lab.url.replace(/\/+$/, "") === String(props.fileData.frontmatter?.lab_url || "").replace(/\/+$/, ""))
    const returnUrl = isLab ? home : `${home}?view=concepts`
    return (
      <>
        <nav class="notebook-nav" aria-label="기본 탐색">
          <a class="notebook-brand" href={home} aria-label={`${brand.name} 홈`}>
            <svg class="notebook-brand-mark" viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: brandMark.body }} />
            {brand.name}
          </a>
          <div class="notebook-nav-actions">
            <a class="notebook-github" href="https://github.com/ddomology/portswigger-lab-notes" target="_blank" rel="noopener noreferrer">GitHub <Icon name="arrow-up-right" /></a>
            <span class="notebook-theme"><ThemeToggle {...props} /></span>
          </div>
        </nav>
        {!isHome && <a class="notebook-return" data-note-return href={returnUrl}><Icon name="arrow-left" /> {isLab ? "풀이 목록" : "개념 목록"}</a>}
      </>
    )
  }
  NotebookNav.css = ThemeToggle.css
  NotebookNav.beforeDOMLoaded = ThemeToggle.beforeDOMLoaded
  NotebookNav.afterDOMLoaded = ThemeToggle.afterDOMLoaded
  return NotebookNav
}) satisfies QuartzComponentConstructor
