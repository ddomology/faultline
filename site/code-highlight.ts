import { createHighlighter, type ThemeRegistration, type ThemeRegistrationRaw } from "shiki"
import githubLight from "shiki/themes/github-light.mjs"
import githubDark from "shiki/themes/github-dark-default.mjs"
import powershell from "shiki/langs/powershell.mjs"
import rehypePrettyCode, { type Options } from "rehype-pretty-code"
import type { QuartzTransformerPlugin } from "../types"

// Retain GitHub's language-specific scopes, with a clearer reader palette.
// This runs only at build time; the output contains ordinary colored spans.
function readerTheme(base: ThemeRegistration, name: string, dark: boolean): ThemeRegistrationRaw {
  const colors: Record<string, string> = dark ? {
    "#ff7b72": "#c4a5e9", "#79c0ff": "#e6b873", "#a5d6ff": "#a8cc8c",
    "#d2a8ff": "#82baff", "#ffa657": "#82cec3", "#8b949e": "#98a4b3",
  } : {
    "#d73a49": "#8250b8", "#005cc5": "#995719", "#032f62": "#316d32",
    "#6f42c1": "#185fba", "#e36209": "#176b70", "#6a737d": "#626f7e",
  }
  const { tokenColors, ...theme } = base
  return {
    ...theme, name,
    settings: [
      ...(tokenColors ?? []).map(rule => ({
        ...rule,
        settings: { ...rule.settings, foreground: colors[rule.settings.foreground?.toLowerCase() ?? ""] ?? rule.settings.foreground },
      })),
      { scope: ["entity.name.function", "support.function"], settings: { foreground: dark ? "#82baff" : "#185fba" } },
      { scope: ["variable.parameter.option", "variable.parameter.powershell"], settings: { foreground: dark ? "#e6b873" : "#865600", fontStyle: "" } },
      { scope: ["variable.other.readwrite.powershell", "support.variable.powershell"], settings: { foreground: dark ? "#82cec3" : "#176b70" } },
    ],
  }
}

export const readerCodeThemes = {
  light: readerTheme(githubLight, "reader-light", false),
  dark: readerTheme(githubDark, "reader-dark", true),
}

export const createReaderHighlighter: NonNullable<Options["getHighlighter"]> = async options => {
  // Extend a copy: Shiki's bundled grammar is shared and must remain untouched.
  const language = structuredClone(powershell[0])
  const assignment = language.patterns.findIndex(rule => rule.name === "keyword.operator.assignment.powershell")
  if (assignment < 0) throw new Error("PowerShell operator grammar changed")
  // Word operators (-eq, -not, ...) keep priority. Strings, comments and here
  // strings still use their original nested grammars, so their text is untouched.
  language.patterns.splice(assignment, 0, {
    match: "(?<![\\w$.-])--?[\\p{L}_][\\p{L}\\d_-]*\\b",
    name: "variable.parameter.powershell",
  })
  language.patterns.unshift({
    match: "(?:^|(?<=[|;&=]))[ \\t]*\\K(?i:pwsh|powershell|git|node|npm|npx|python|python3|dotnet)(?:\\.exe)?(?=$|[\\s;|&])",
    name: "support.function.powershell",
  })
  return createHighlighter({ ...options, langs: [...(options.langs ?? []), language] })
}

export const ReaderSyntaxHighlighting: QuartzTransformerPlugin = () => ({
  name: "ReaderSyntaxHighlighting",
  htmlPlugins() {
    return [[rehypePrettyCode, {
      theme: readerCodeThemes,
      keepBackground: false,
      getHighlighter: createReaderHighlighter,
    } satisfies Options]]
  },
})
