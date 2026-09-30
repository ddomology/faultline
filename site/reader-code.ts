import type { Element, Root as HtmlRoot } from "hast"
import type { Root as MarkdownRoot } from "mdast"
import { visit } from "unist-util-visit"
import type { QuartzTransformerPlugin } from "../types"
import { formatCode, getCodeFormatLanguage } from "./code-format"

const sourceAttribute = "data-reader-code-source"
const formattedAttribute = "data-reader-formatted-source"
const languageAttribute = "data-reader-language"
const fragmentAttribute = "data-reader-fragment"
const pairAttribute = "data-reader-pair"
const variantAttribute = "data-reader-variant"

// Extend common author-facing labels without guessing a language from its text.
const highlightAliases: Record<string, string> = {
  psm1: "powershell", psd1: "powershell", pwsh: "powershell", https: "http", svg: "xml", env: "dotenv",
  "shell-session": "shellsession", shell: "shellscript", plain: "text",
  mysql: "sql", mariadb: "sql", postgresql: "sql", postgres: "sql", pgsql: "sql",
  sqlite: "sql", tsql: "sql", mssql: "sql", transactsql: "sql", sqlserver: "sql",
  oracle: "plsql", plsql: "plsql", db2: "sql", db2i: "sql", redshift: "sql", snowflake: "sql",
  bigquery: "sql", duckdb: "sql", clickhouse: "sql", hive: "sql", spark: "sql",
  trino: "sql", presto: "sql", tidb: "sql", singlestoredb: "sql", n1ql: "sql",
  angular: "angular-html", lwc: "html", mjml: "html", flow: "javascript",
  cxx: "cpp", hpp: "cpp", cc: "cpp", objc: "objective-c", objcpp: "objective-cpp",
  "objective-c++": "objective-cpp", protobuf: "proto", kotlin_script: "kotlin",
}
const directCode = (node: Element) => node.children.find(
  (child): child is Element => child.type === "element" && child.tagName === "code",
)
const codeContainer = (node: Element) => node.tagName === "pre" ? node : node.children.find(
  (child): child is Element => child.type === "element" && child.tagName === "pre",
)

// Preserve the original before Markdown-to-HTML adds a final newline. Generate
// a separate display version; no formatter or code execution runs in the browser.
export const ReaderCode: QuartzTransformerPlugin = () => ({
  name: "ReaderCode",
  markdownPlugins() {
    return [
      () => async (tree: MarkdownRoot) => {
        const jobs: Promise<void>[] = []
        visit(tree, "code", (node) => {
          if (node.lang?.toLowerCase() === "mermaid") {
            node.lang = "mermaid"
            return
          }
          const language = node.lang?.toLowerCase()
          const flags: string[] = node.meta?.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) ?? []
          const plain = flags.includes("nohighlight")
          const fragment = flags.includes("fragment") || language === "sql-fragment"
          node.data ??= {}
          const properties: NonNullable<typeof node.data.hProperties> = node.data.hProperties = {
            ...node.data.hProperties,
            [sourceAttribute]: JSON.stringify(node.value),
          }
          if (!language) return
          const definition = getCodeFormatLanguage(language)
          const sqlFragment = fragment && (definition?.engine === "sql" || language === "sql-fragment")
          node.lang = plain ? "text" : sqlFragment ? "sql-fragment" : highlightAliases[language] ?? definition?.highlight ?? language
          if (node.lang !== language || language === "sql-fragment") properties[languageAttribute] = language === "sql-fragment" ? "sql" : language
          if (fragment) properties[fragmentAttribute] = true
          if (plain || fragment || flags.includes("noformat")) return
          jobs.push(formatCode(node.value, language).then((formatted) => {
            if (formatted !== null) properties[formattedAttribute] = JSON.stringify(formatted)
          }))
        })
        await Promise.all(jobs)
      },
    ]
  },
  htmlPlugins() {
    return [
      () => (tree: HtmlRoot) => {
        let nextPair = 0
        const pending: Array<() => void> = []
        visit(tree, "element", (node, _, parent) => {
          if (node.tagName !== "pre") return
          const code = directCode(node)
          if (!code) return
          const source = code.properties[sourceAttribute]
          if (typeof source !== "string") return
          node.properties["data-clipboard"] = source
          delete code.properties[sourceAttribute]
          const language = code.properties[languageAttribute]
          if (typeof language === "string") {
            node.properties[languageAttribute] = language
            delete code.properties[languageAttribute]
          }
          if (code.properties[fragmentAttribute]) {
            node.properties[fragmentAttribute] = true
            delete code.properties[fragmentAttribute]
          }
          const formatted = code.properties[formattedAttribute]
          delete code.properties[formattedAttribute]
          if (typeof formatted !== "string" || !parent) return
          const pair = String(++nextPair)
          node.properties[pairAttribute] = pair
          const variant: Element = {
            type: "element", tagName: "pre",
            properties: { [variantAttribute]: pair, "data-clipboard": formatted },
            children: [{
              type: "element", tagName: "code",
              properties: { className: code.properties.className },
              // Original line/word highlights refer to original positions only.
              data: { meta: /(?:^|\s)showLineNumbers(?:\{\d+\})?(?:\s|$)/.test(String(code.data?.meta ?? "")) ? "showLineNumbers" : "" },
              children: [{ type: "text", value: JSON.parse(formatted) + "\n" }],
            }],
          }
          pending.push(() => {
            const index = parent.children.indexOf(node)
            parent.children.splice(index + 1, 0, variant)
          })
        })
        // Let the existing highlighter process both versions in one pass.
        for (const insert of pending) insert()
      },
    ]
  },
})

// Run immediately after SyntaxHighlighting. Move the formatted version into the
// original block so the title/caption/toolbar belong to one stable container.
export const ReaderCodeViews: QuartzTransformerPlugin = () => ({
  name: "ReaderCodeViews",
  htmlPlugins() {
    return [
      () => (tree: HtmlRoot) => {
        // Shiki makes every outer pre focusable, but our horizontal scroll area
        // is the inner code. The toolbar adds a tab stop there only on overflow.
        visit(tree, "element", (node) => {
          if (node.tagName === "pre" && directCode(node) &&
            Object.hasOwn(node.properties, "data-theme")) {
            delete node.properties.tabIndex
            delete node.properties.tabindex
          }
        })
        const originals = new Map<string, Element>()
        visit(tree, "element", (node) => {
          const pair = node.properties[pairAttribute]
          if (typeof pair === "string") originals.set(pair, node)
        })
        const remove: Array<() => void> = []
        visit(tree, "element", (node, _, parent) => {
          const pair = node.properties[variantAttribute]
          if (typeof pair !== "string" || !parent) return
          const original = originals.get(pair)
          const pre = original && codeContainer(original)
          const originalCode = pre && directCode(pre)
          const variantPre = codeContainer(node)
          const formattedCode = variantPre && directCode(variantPre)
          if (!original || !pre || !originalCode || !formattedCode) {
            throw new Error("Code view pair was lost during syntax highlighting")
          }
          originalCode.properties["data-reader-view"] = "source"
          formattedCode.properties["data-reader-view"] = "formatted"
          formattedCode.properties["data-clipboard"] = node.properties["data-clipboard"]
          // Show readable code on the first paint, before the toolbar loads.
          // Explicit line/word annotations refer to source positions, so keep
          // those blocks on the source view until the reader chooses otherwise.
          let hasSourceAnnotations = false
          visit(originalCode, "element", element => {
            if (Object.hasOwn(element.properties, "data-highlighted-line") ||
              Object.hasOwn(element.properties, "data-highlighted-chars")) hasSourceAnnotations = true
          })
          originalCode.properties.hidden = !hasSourceAnnotations
          formattedCode.properties.hidden = hasSourceAnnotations
          pre.children.push(formattedCode)
          delete original.properties[pairAttribute]
          remove.push(() => { parent.children.splice(parent.children.indexOf(node), 1) })
        })
        for (const cleanup of remove) cleanup()
      },
    ]
  },
})
