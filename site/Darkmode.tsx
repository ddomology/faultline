// @ts-ignore
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import Icon from "./Icon"

const Darkmode: QuartzComponent = ({ displayClass }: QuartzComponentProps) => (
  <button type="button" class={classNames(displayClass, "darkmode")} aria-label="밝은 테마와 어두운 테마 전환" title="테마 전환">
    <Icon name="sun" className="dayIcon" />
    <Icon name="moon" className="nightIcon" />
  </button>
)
Darkmode.beforeDOMLoaded = darkmodeScript
Darkmode.css = styles
export default (() => Darkmode) satisfies QuartzComponentConstructor
