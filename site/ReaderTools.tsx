import { QuartzComponent, QuartzComponentConstructor } from "./types"
import style from "./styles/reader-tools.scss"
// @ts-ignore
import script from "./scripts/reader-tools.inline"

export default (() => {
  const ReaderTools: QuartzComponent = () => null
  ReaderTools.css = style
  ReaderTools.afterDOMLoaded = script
  return ReaderTools
}) satisfies QuartzComponentConstructor
