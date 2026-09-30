import assert from "node:assert/strict";
import { createReaderHighlighter, readerCodeThemes } from "../_quartz/quartz/plugins/transformers/code-highlight.ts";

const highlighter = await createReaderHighlighter({
  themes: Object.values(readerCodeThemes),
  langs: ["javascript", "typescript", "json", "python", "bash", "http", "sql", "html", "css"],
});
const samples = {
  javascript: 'const note = { title: "Memo", count: 3 }; console.log(note);',
  typescript: 'const title: string = "Memo";',
  json: '{"title":"Memo","count":3,"visible":true}',
  python: 'def label(name):\n    return "Hello " + name # greeting',
  bash: 'printf "%s\\n" "$name" # greeting',
  http: 'GET /notes HTTP/1.1\nHost: example.com\nAccept: application/json',
  sql: "SELECT title FROM notes WHERE visible = 1;",
  html: '<article class="note"><h2>Memo</h2></article>',
  css: '.note { color: #334155; padding: 16px; }',
};
try {
  for (const theme of Object.values(readerCodeThemes)) {
    for (const [lang, source] of Object.entries(samples)) {
      const lines = highlighter.codeToTokensBase(source, { lang, theme });
      assert.equal(lines.map(line => line.map(token => token.content).join("")).join("\n"), source);
      assert.ok(new Set(lines.flat().map(token => token.color)).size >= 3, `${lang}: distinct syntax colors`);
    }
    for (const lang of ["powershell", "ps", "ps1"]) {
      await highlighter.loadLanguage(lang);
      const source = "pwsh -File .\\format-demo.ps1 `\n  -Name 'sample' `\n  -OutputPath 'report.json'\n$items = 3";
      const lines = highlighter.codeToTokensBase(source, { lang, theme, includeExplanation: true });
      const all = lines.flat();
      const scopeOf = text => all.find(token => token.content === text)?.explanation?.flatMap(part => part.scopes.map(scope => scope.scopeName)) ?? [];
      assert.equal(lines.map(line => line.map(token => token.content).join("")).join("\n"), source);
      assert.ok(scopeOf("pwsh").includes("support.function.powershell"));
      assert.ok(scopeOf("-File").includes("variable.parameter.powershell"));
      assert.ok(scopeOf("-OutputPath").includes("variable.parameter.powershell"));
      assert.equal(new Set(["pwsh", "-File", "'sample'", "$items"].map(text => all.find(token => token.content === text)?.color)).size, 4);
    }
    const protectedSource = [
      "# pwsh -Name sample",
      "<# pwsh -Name sample #>",
      "'pwsh -Name sample'",
      '"pwsh -Name sample"',
      "@'", "pwsh -Name sample", "'@",
      '@"', "pwsh -Name sample", '"@',
    ].join("\n");
    const protectedTokens = highlighter.codeToTokensBase(protectedSource, { lang: "powershell", theme, includeExplanation: true });
    for (const token of protectedTokens.flat()) {
      const scopes = token.explanation?.flatMap(part => part.scopes.map(scope => scope.scopeName)) ?? [];
      assert.ok(!scopes.includes("variable.parameter.powershell"), "Strings and comments must not contain options");
      assert.ok(!scopes.includes("support.function.powershell"), "Strings and comments must not contain commands");
    }
    for (const operator of ["-eq", "-ne", "-like", "-not", "-and", "-band", "-is", "-join", "-f"]) {
      const tokens = highlighter.codeToTokensBase(`$a ${operator} $b`, { lang: "powershell", theme, includeExplanation: true }).flat();
      const token = tokens.find(token => token.content === operator);
      assert.ok(token?.explanation?.some(part => part.scopes.some(scope => scope.scopeName.startsWith("keyword.operator."))), `${operator}: operator priority`);
    }
  }
  console.log("PASS: light/dark syntax, PowerShell commands/options/aliases, preserved strings/comments/operators and exact text");
} finally {
  highlighter.dispose();
}
