import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { QuartzComponent, QuartzComponentProps } from "./quartz/components/types"
import { Root } from "hast"
import NotebookNav from "./quartz/components/NotebookNav"
import LabExplorer from "./quartz/components/LabExplorer"
import TopicExplorer from "./quartz/components/TopicExplorer"

const isHome = (page: QuartzComponentProps) => page.fileData.slug === "index"
const onReader = (component: QuartzComponent) => Component.ConditionalRender({
  component,
  condition: (page) => !isHome(page),
})

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ddomology/portswigger-lab-notes",
      "Web Security Academy": "https://portswigger.net/web-security",
    },
  }),
}

const left = [onReader(Component.Search()), TopicExplorer()]

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    NotebookNav(),
    // Existing notes already have their own Markdown h1. Render one title only.
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => !isHome(page) && !(page.tree as Root).children.some((node) => node.type === "element" && node.tagName === "h1"),
    }),
    Component.ConditionalRender({ component: LabExplorer(), condition: isHome }),
  ],
  left,
  right: [onReader(Component.DesktopOnly(Component.TableOfContents()))],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [NotebookNav(), Component.ArticleTitle()],
  left,
  right: [],
}
