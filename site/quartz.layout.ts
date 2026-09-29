import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import NotebookNav from "./quartz/components/NotebookNav"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "GitHub에서 노트 보기": "https://github.com/ddomology/portswigger-lab-notes/tree/main/content",
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
  beforeBody: [NotebookNav(), Component.ArticleTitle(), Component.ContentMeta(), Component.TagList()],
  left,
  right: [Component.DesktopOnly(Component.TableOfContents()), Component.Backlinks()],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [NotebookNav(), Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left,
  right: [],
}
