import assert from "node:assert/strict";
import { createReaderHighlighter, readerCodeThemes } from "../scripts/code-highlight.ts";

const highlighter = await createReaderHighlighter({
  themes: Object.values(readerCodeThemes),
  langs: ["javascript", "typescript", "json", "python", "bash", "http", "sql", "sql-fragment", "html", "css"],
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
    const fragments = [
      "' title = 'Memo' AND count = 2 -- reader's note",
      "' title LIKE '%Memo%'",
      "title = 'unfinished",
      "SELECT title, 3 FROM notes",
      "'SELECT FROM' AS label",
      "title = 'It''s SELECT'",
      "title = E'It\\'s SELECT'",
      'SELECT "FROM", [WHERE], `ORDER` FROM notes',
      "SELECT $$SELECT 'Memo'$$, $tag$WHERE 2$tag$",
      "SELECT q'[WHERE 'Memo']' FROM notes",
      "/* SELECT 'Memo'",
      "FROM notes */",
      "SELECT title FROM notes # SELECT is a comment here",
      '\tSELECT title   ',
      "' title = 'Memo' # reader's note",
    ];
    const source = fragments.join("\n");
    const lines = highlighter.codeToTokensBase(source, { lang: "sql-fragment", theme, includeExplanation: true });
    assert.equal(lines.map(line => line.map(token => token.content).join("")).join("\n"), source, "Fragment source must be exact");
    const scopesAt = (row, column) => {
      let offset = 0;
      for (const token of lines[row]) {
        if (column < offset + token.content.length) return token.explanation?.flatMap(part => part.scopes.map(scope => scope.scopeName)) ?? [];
        offset += token.content.length;
      }
      return [];
    };
    const hasScope = (row, text, prefix) => scopesAt(row, fragments[row].indexOf(text)).some(scope => scope.startsWith(prefix));
    assert.ok(!scopesAt(0, 0).some(scope => /^(string|invalid)/.test(scope)), "Leading fragment delimiter stays neutral");
    assert.ok(hasScope(0, "'Memo'", "string."));
    assert.ok(hasScope(0, "AND", "keyword."));
    assert.ok(hasScope(0, "reader's", "comment."));
    assert.ok(hasScope(1, "'%Memo%'", "string."));
    assert.ok(!hasScope(2, "unfinished", "string."));
    assert.ok(hasScope(3, "SELECT", "keyword."), "Unclosed strings cannot spill to the next line");
    for (const [row, text] of [[4, "SELECT"], [5, "SELECT"], [6, "SELECT"], [7, "FROM"], [7, "ORDER"], [8, "'Memo'"], [8, "WHERE"], [9, "WHERE"]]) {
      assert.ok(hasScope(row, text, "string."), `Fragment literal protected at ${row}: ${text}`);
      assert.ok(!hasScope(row, text, "keyword."));
    }
    assert.ok(!hasScope(7, "WHERE", "keyword."), "Quoted identifiers cannot become keywords");
    assert.ok(hasScope(10, "SELECT", "comment."));
    assert.ok(hasScope(11, "FROM", "comment."));
    assert.ok(hasScope(12, "# SELECT", "comment."));
    assert.ok(!scopesAt(14, 0).some(scope => scope.startsWith("string.")));
    assert.ok(hasScope(14, "'Memo'", "string."));
    assert.ok(hasScope(14, "reader's", "comment."));
    const normal = highlighter.codeToTokensBase("SELECT 'first\nsecond' FROM notes", { lang: "sql", theme, includeExplanation: true });
    assert.ok(normal[1][0].explanation.some(part => part.scopes.some(scope => scope.scopeName.startsWith("string."))), "Ordinary SQL keeps multiline strings");
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
  console.log("PASS: light/dark syntax, SQL fragments without string spill, protected literals/comments, PowerShell scopes and exact text");
} finally {
  highlighter.dispose();
}
