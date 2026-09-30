import type { Root as HtmlRoot } from "hast"
import type { Root as MarkdownRoot } from "mdast"
import { visit } from "unist-util-visit"
import type { QuartzTransformerPlugin } from "../types"

const sourceAttribute = "data-reader-code-source"
const languageAttribute = "data-reader-language"

// Run before SyntaxHighlighting: it replaces <code> but preserves <pre>
// properties on the resulting <figure>. Store the Markdown source before the
// HTML conversion adds a newline or the highlighter pads empty lines.
export const ReaderCode: QuartzTransformerPlugin = () => ({
  name: "ReaderCode",
  markdownPlugins() {
    return [
      () => (tree: MarkdownRoot) => {
        visit(tree, "code", (node) => {
          // ObsidianFlavoredMarkdown supplies Mermaid's own clipboard source.
          if (node.lang === "mermaid") return
          node.data ??= {}
          node.data.hProperties = {
            ...node.data.hProperties,
            [sourceAttribute]: JSON.stringify(node.value),
          }
          // Snippets may intentionally start inside a string or statement.
          // Opt out of lexical highlighting without changing their source or
          // language label. Ignore flag-like words inside titles/captions.
          const flags: string[] = node.meta?.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? []
          if (node.lang && flags.includes("nohighlight")) {
            node.data.hProperties[languageAttribute] = node.lang
            node.lang = "text"
          }
        })
      },
    ]
  },
  htmlPlugins() {
    return [
      () => (tree: HtmlRoot) => {
        visit(tree, "element", (node) => {
          if (node.tagName !== "pre") return
          const code = node.children.find(
            (child) => child.type === "element" && child.tagName === "code",
          )
          if (code?.type !== "element") return
          const source = code.properties[sourceAttribute]
          if (typeof source !== "string") return
          node.properties["data-clipboard"] = source
          delete code.properties[sourceAttribute]
          const language = code.properties[languageAttribute]
          if (typeof language === "string") {
            node.properties[languageAttribute] = language
            delete code.properties[languageAttribute]
          }
        })
      },
    ]
  },
})
