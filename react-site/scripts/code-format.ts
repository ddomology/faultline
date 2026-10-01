import type { Options, Plugin } from "prettier"
import type { SqlLanguage } from "sql-formatter"

type Engine = "prettier" | "sql" | "ruff" | "gofmt" | "clang" | "rustfmt" | "ktfmt" | "taplo"
type PluginName = "xml" | "php" | "java" | "sh"

export interface CodeFormatLanguage {
  id: string
  aliases: readonly string[]
  engine: Engine
  highlight: string
  parser?: string
  plugin?: PluginName
  filename?: string
  options?: Record<string, unknown>
}

// The language is always supplied by the author. Never guess a language from
// code, run it, resolve project configuration, or replace the stored original.
export const FORMAT_LANGUAGES: readonly CodeFormatLanguage[] = [
  { id: "javascript", aliases: ["js", "mjs", "cjs", "ecmascript"], engine: "prettier", highlight: "javascript", parser: "babel" },
  { id: "jsx", aliases: [], engine: "prettier", highlight: "jsx", parser: "babel" },
  { id: "typescript", aliases: ["ts", "mts", "cts"], engine: "prettier", highlight: "typescript", parser: "typescript" },
  { id: "tsx", aliases: [], engine: "prettier", highlight: "tsx", parser: "typescript" },
  { id: "flow", aliases: [], engine: "prettier", highlight: "javascript", parser: "flow" },
  { id: "json", aliases: [], engine: "prettier", highlight: "json", parser: "json" },
  { id: "jsonc", aliases: [], engine: "prettier", highlight: "jsonc", parser: "jsonc" },
  { id: "json5", aliases: [], engine: "prettier", highlight: "json5", parser: "json5" },
  { id: "css", aliases: [], engine: "prettier", highlight: "css", parser: "css" },
  { id: "scss", aliases: [], engine: "prettier", highlight: "scss", parser: "scss" },
  { id: "less", aliases: [], engine: "prettier", highlight: "less", parser: "less" },
  { id: "html", aliases: ["htm"], engine: "prettier", highlight: "html", parser: "html" },
  { id: "vue", aliases: [], engine: "prettier", highlight: "vue", parser: "vue" },
  { id: "angular", aliases: ["angular-html"], engine: "prettier", highlight: "angular-html", parser: "angular" },
  { id: "markdown", aliases: ["md"], engine: "prettier", highlight: "markdown", parser: "markdown" },
  { id: "mdx", aliases: [], engine: "prettier", highlight: "mdx", parser: "mdx" },
  { id: "yaml", aliases: ["yml"], engine: "prettier", highlight: "yaml", parser: "yaml" },
  { id: "graphql", aliases: ["gql"], engine: "prettier", highlight: "graphql", parser: "graphql" },
  { id: "handlebars", aliases: ["hbs", "glimmer"], engine: "prettier", highlight: "handlebars", parser: "glimmer" },
  { id: "xml", aliases: ["svg", "xsl", "xslt", "xsd"], engine: "prettier", highlight: "xml", parser: "xml", plugin: "xml", options: { xmlWhitespaceSensitivity: "strict", xmlQuoteAttributes: "preserve", xmlSortAttributesByKey: false } },
  { id: "php", aliases: [], engine: "prettier", highlight: "php", parser: "php", plugin: "php", options: { phpVersion: "8.4", trailingCommaPHP: false, tabWidth: 4 } },
  { id: "java", aliases: [], engine: "prettier", highlight: "java", parser: "java", plugin: "java" },
  { id: "toml", aliases: [], engine: "taplo", highlight: "toml" },
  { id: "bash", aliases: ["shell", "shellscript"], engine: "prettier", highlight: "bash", parser: "sh", plugin: "sh", filename: "snippet.bash", options: { variant: 1 } },
  { id: "sh", aliases: ["posix"], engine: "prettier", highlight: "bash", parser: "sh", plugin: "sh", filename: "snippet.sh", options: { variant: 2 } },
  { id: "mksh", aliases: [], engine: "prettier", highlight: "bash", parser: "sh", plugin: "sh", filename: "snippet.mksh", options: { variant: 4 } },
  { id: "dockerfile", aliases: ["docker"], engine: "prettier", highlight: "dockerfile", parser: "dockerfile", plugin: "sh", filename: "Dockerfile" },
  { id: "python", aliases: ["py", "python3", "py3"], engine: "ruff", highlight: "python" },
  { id: "go", aliases: ["golang"], engine: "gofmt", highlight: "go" },
  { id: "rust", aliases: ["rs"], engine: "rustfmt", highlight: "rust" },
  { id: "kotlin", aliases: ["kt", "kts"], engine: "ktfmt", highlight: "kotlin" },
  { id: "c", aliases: ["h"], engine: "clang", highlight: "c", filename: "snippet.c" },
  { id: "cpp", aliases: ["c++", "cc", "cxx", "hpp", "hxx"], engine: "clang", highlight: "cpp", filename: "snippet.cpp" },
  { id: "csharp", aliases: ["cs", "c#"], engine: "clang", highlight: "csharp", filename: "snippet.cs" },
  { id: "objective-c", aliases: ["objc"], engine: "clang", highlight: "objective-c", filename: "snippet.m" },
  { id: "objective-cpp", aliases: ["objcpp", "objc++"], engine: "clang", highlight: "objective-cpp", filename: "snippet.mm" },
  { id: "protobuf", aliases: ["proto"], engine: "clang", highlight: "proto", filename: "snippet.proto" },
  ...([
    ["sql", []], ["postgresql", ["postgres", "pgsql"]], ["mysql", []],
    ["mariadb", []], ["sqlite", ["sqlite3"]], ["plsql", ["oracle", "pl/sql"]],
    ["transactsql", ["tsql", "t-sql", "mssql", "sqlserver"]], ["bigquery", []],
    ["snowflake", []], ["redshift", []], ["duckdb", []], ["clickhouse", []],
    ["db2", []], ["db2i", []], ["hive", []], ["spark", ["sparksql"]],
    ["trino", ["presto"]], ["tidb", []], ["n1ql", ["couchbase"]], ["singlestoredb", ["singlestore"]],
  ] as const).map(([id, aliases]) => ({ id, aliases, engine: "sql" as const, highlight: "sql" })),
]

const languageByName = new Map(
  FORMAT_LANGUAGES.flatMap((language) =>
    [language.id, ...language.aliases].map((name) => [name, language] as const),
  ),
)

export function getCodeFormatLanguage(language: string): CodeFormatLanguage | undefined {
  return languageByName.get(language.trim().toLowerCase())
}

type Formatter = (source: string) => string | Promise<string>
const formatters = new Map<string, Promise<Formatter>>()
const maximumBytes = 64 * 1024
const maximumOutputBytes = 256 * 1024

const prettierOptions: Options = {
  printWidth: 88,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
  embeddedLanguageFormatting: "off",
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "strict",
  quoteProps: "preserve",
  trailingComma: "none",
}

// Keep clause bodies and short lists next to their keyword. Long lists and
// nested expressions still follow the formatter's structural indentation.
function compactSql(formatted: string, format: (source: string) => string): string {
  const lines = formatted.split("\n")
  const compact: string[] = []
  const clause = /^( *)(SELECT(?: ALL| DISTINCT)?|WITH(?: RECURSIVE)?|FROM|WHERE|HAVING|GROUP BY|ORDER BY|LIMIT|OFFSET|RETURNING|SET|VALUES)$/i
  const continuation = /^(?:AND|OR|JOIN|(?:(?:LEFT|RIGHT|FULL)(?: OUTER)?|INNER|CROSS|NATURAL) JOIN)\b/i
  for (let index = 0; index < lines.length; index++) {
    const heading = lines[index].match(clause)
    if (!heading) {
      compact.push(lines[index])
      continue
    }
    const indent = heading[1]
    const bodyIndent = indent + "  "
    const parts: string[] = []
    for (let next = index + 1; next < lines.length; next++) {
      const body = lines[next].startsWith(bodyIndent) ? lines[next].slice(bodyIndent.length) : ""
      if (!body || /^\s|^(?:--|#|\/\*)/.test(body)) break
      parts.push(body)
      if (!body.endsWith(",")) break
    }
    const body = parts.join(" ")
    const following = lines[index + parts.length + 1] ?? ""
    const opensBlock = body.endsWith("(")
    const continues = following.startsWith(bodyIndent) &&
      !continuation.test(following.slice(bodyIndent.length))
    const joined = `${lines[index]} ${body}`
    if (body && !body.endsWith(",") && (!continues || opensBlock) && joined.length <= 88) {
      compact.push(joined)
      index += parts.length
      if (opensBlock) {
        // Moving an opening parenthesis up removes one indentation level from
        // its contents and closing line, but not from later AND/JOIN clauses.
        for (let next = index + 1; next < lines.length && lines[next].startsWith(bodyIndent); next++) {
          const closesBlock = lines[next].slice(bodyIndent.length).startsWith(")")
          lines[next] = lines[next].slice(2)
          if (closesBlock) break
        }
      }
    } else {
      compact.push(lines[index])
    }
  }
  const candidate = compact.join("\n")
  if (candidate === formatted) return formatted
  // A line that looks like a clause can be inside a multiline string/comment.
  // Accept compaction only when the same dialect reproduces the exact original
  // formatter output, including literal contents and comment boundaries.
  try {
    return format(candidate) === formatted ? candidate : formatted
  } catch {
    return formatted
  }
}

async function loadPlugin(name: PluginName): Promise<Plugin> {
  // Some plugins expose a namespace at runtime despite declaring a default.
  const plugin = (module: unknown) => {
    const value = module as { default?: unknown }
    return (value.default ?? module) as Plugin
  }
  switch (name) {
    case "xml": return plugin(await import("@prettier/plugin-xml"))
    case "php": {
      const php = plugin(await import("@prettier/plugin-php"))
      const parser = php.parsers!.php
      // The plugin has a Markdown mode for tagless PHP snippets. It parses an
      // AST directly; it does not evaluate or add an opening tag to the source.
      return {
        ...php,
        parsers: {
          ...php.parsers,
          php: {
            ...parser,
            parse: (text, options) => parser.parse(text, { ...options, parentParser: "markdown" }),
          },
        },
      }
    }
    case "java": return plugin(await import("prettier-plugin-java"))
    case "sh": return plugin(await import("prettier-plugin-sh"))
  }
}

async function loadFormatter(language: CodeFormatLanguage): Promise<Formatter> {
  switch (language.engine) {
    case "prettier": {
      const prettier = await import("prettier")
      const plugins = language.plugin ? [await loadPlugin(language.plugin)] : []
      const options: Options & Record<string, unknown> = {
        ...prettierOptions,
        parser: language.parser,
        plugins,
        // Shell parsing must preserve comments and reject incomplete input.
        ...(language.plugin === "sh" ? { keepComments: true, simplify: false, minify: false } : {}),
        ...language.options,
      }
      if (language.filename) options.filepath = language.filename
      return (source) => prettier.format(source, options)
    }
    case "sql": {
      const sql = await import("sql-formatter")
      const format = (source: string) => sql.format(source, {
        language: language.id as SqlLanguage,
        tabWidth: 2,
        keywordCase: "preserve",
        identifierCase: "preserve",
        dataTypeCase: "preserve",
        functionCase: "preserve",
        expressionWidth: 88,
        linesBetweenQueries: 1,
      })
      return (source) => compactSql(format(source), format)
    }
    case "ruff": {
      const ruff = await import("@wasm-fmt/ruff_fmt")
      return (source) => ruff.format(source, "snippet.py", {
        line_width: 88,
        indent_style: "space",
        indent_width: 4,
        quote_style: "preserve",
      })
    }
    case "gofmt": {
      const gofmt = await import("@wasm-fmt/gofmt")
      return gofmt.format
    }
    case "taplo": {
      const taplo = await import("@wasm-fmt/taplo_fmt")
      const toml = await import("smol-toml")
      return (source) => {
        // Taplo can recover broken input; only offer a formatted view when the
        // document also passes a strict TOML parser.
        toml.parse(source)
        return taplo.format(source, {
          column_width: 88,
          indent_string: "  ",
          reorder_keys: false,
          reorder_arrays: false,
          reorder_inline_tables: false,
        })
      }
    }
    case "clang": {
      const clang = await import("@wasm-fmt/clang-format")
      const style = JSON.stringify({
        BasedOnStyle: "LLVM",
        IndentWidth: 2,
        ColumnLimit: 88,
        SortIncludes: false,
        SortUsingDeclarations: false,
        IncludeBlocks: "Preserve",
        BreakStringLiterals: false,
        FixNamespaceComments: false,
        ReflowComments: false,
      })
      return (source) => clang.format(source, language.filename, style)
    }
    case "rustfmt": {
      const rustfmt = await import("@scalar/rust-fmt")
      await rustfmt.init()
      return (source) => rustfmt.formatSync(source, {
        maxWidth: 88,
        edition: "2021",
        reorderImports: false,
        reorderModules: false,
        removeNestedParens: false,
        formatStrings: false,
        formatCodeInDocComments: false,
      })
    }
    case "ktfmt": {
      const ktfmt = await import("@scalar/kotlin-fmt")
      await ktfmt.init()
      return (source) => ktfmt.formatSync(source, {
        style: "kotlinlang",
        maxWidth: 88,
        removeUnusedImports: false,
        trailingCommas: "none",
      })
    }
  }
}

// Terminal newlines and CRLF alone do not justify a second reading mode.
function comparable(source: string): string {
  return source.replace(/\r\n?/g, "\n").replace(/\n+$/, "")
}

/** Build-time display formatting only; null leaves the original block alone. */
export async function formatCode(source: string, language: string): Promise<string | null> {
  const definition = getCodeFormatLanguage(language)
  if (!definition || !source.trim() || Buffer.byteLength(source, "utf8") > maximumBytes) return null
  if (source.includes("\0")) return null

  let ready = formatters.get(definition.id)
  if (!ready) {
    ready = loadFormatter(definition)
    formatters.set(definition.id, ready)
  }
  // Dependency and initialization errors are build errors, not silent fallbacks.
  const format = await ready
  try {
    const formatted = await format(source)
    if (typeof formatted !== "string" || !formatted.trim()) return null
    if (Buffer.byteLength(formatted, "utf8") > maximumOutputBytes) return null
    if (comparable(formatted) === comparable(source)) return null
    return formatted.replace(/\n$/, "")
  } catch {
    // Incomplete, invalid, or unsupported syntax remains a readable original.
    return null
  }
}
