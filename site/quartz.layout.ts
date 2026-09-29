import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import NotebookNav from "./quartz/components/NotebookNav"
import LabExplorer from "./quartz/components/LabExplorer"

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

const left = [
  Component.PageTitle(),
  Component.MobileOnly(Component.Spacer()),
  Component.Flex({
    components: [
      { Component: Component.Search(), grow: true },
      { Component: Component.Darkmode() },
      { Component: Component.ReaderMode() },
    ],
  }),
  Component.Explorer(),
]

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    NotebookNav(),
    Component.ConditionalRender({ component: Component.Breadcrumbs({ rootName: "문제", showCurrentPage: false }), condition: (page) => page.fileData.slug !== "index" && page.fileData.slug !== "notes" }),
    Component.ArticleTitle(),
    Component.ConditionalRender({ component: Component.ContentMeta(), condition: (page) => page.fileData.slug !== "index" }),
    Component.TagList(),
    Component.ConditionalRender({ component: LabExplorer(), condition: (page) => page.fileData.slug === "index" }),
  ],
  left,
  right: [
    Component.ConditionalRender({ component: Component.Graph(), condition: (page) => page.fileData.slug !== "index" }),
    Component.ConditionalRender({ component: Component.DesktopOnly(Component.TableOfContents()), condition: (page) => page.fileData.slug !== "index" }),
    Component.ConditionalRender({ component: Component.Backlinks(), condition: (page) => page.fileData.slug !== "index" }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [NotebookNav(), Component.Breadcrumbs({ rootName: "문제", showCurrentPage: false }), Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}
