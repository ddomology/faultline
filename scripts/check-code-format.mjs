import assert from "node:assert/strict"
import { format as formatSql } from "sql-formatter"
import { FORMAT_LANGUAGES, formatCode, getCodeFormatLanguage } from "../site/code-format.ts"

// These are text-only formatter inputs. No example is evaluated or executed.
const samples = {
  javascript: 'const item={name:"Note",count:2};',
  jsx: 'const item=<div a="b">hello</div>;',
  typescript: 'const item:{name:string,count:number}={name:"Note",count:2};',
  tsx: 'const item=<div a="b">hello</div>;',
  flow: 'const count:number=2;',
  json: '{"title":"note","items":[1,2,3]}',
  jsonc: '{ // Keep this comment\n"count":2}',
  json5: "{title:'Note',count:2}",
  css: '.note{color:red;margin:0 2px}',
  scss: '$color:red;.note{color:$color;&:hover{color:blue}}',
  less: '@color:red;.note{color:@color}',
  html: '<div   class="note"><span>Note</span></div>',
  vue: '<template><div   class="note">Note</div></template>',
  angular: '<div   *ngIf="visible">Note</div>',
  markdown: '# Note\n\n*   first\n*   second',
  mdx: '# Note\n\n*    first\n\n<Button   text="Note" />',
  yaml: 'name: Note\nitems: [1,2,3]',
  graphql: 'query Note{note{id title}}',
  handlebars: '<div   class="note">{{name}}</div>',
  xml: '<note   title="Note"   count="2"/>',
  php: '<?php\n$items=[1,2,3];\nforeach($items as $item){echo $item;}',
  java: 'class Note{public static void main(String[] args){System.out.println("Note");}}',
  toml: 'name="Note"\nitems=[1,2,3]',
  bash: 'for item in one two; do\n     printf "%s\\n" "$item"\ndone',
  sh: 'for item in one two; do\n     printf "%s\\n" "$item"\ndone',
  mksh: 'for item in one two; do\n     print "$item"\ndone',
  dockerfile: 'FROM alpine:3.20\nRUN echo hello && \\\n   echo world',
  python: 'def greet(name):\n return {"message":name,"count":2}',
  go: 'package main\nfunc sum(a,b int)int{return a+b}',
  rust: 'fn sum(a:i32,b:i32)->i32{a+b}',
  kotlin: 'fun sum(a:Int,b:Int):Int{return a+b}',
  c: 'int sum(int a,int b){return a+b;}',
  cpp: 'int sum(int a,int b){return a+b;}',
  csharp: 'class Note{static int Sum(int a,int b){return a+b;}}',
  'objective-c': '@interface Note:NSObject\n@property(nonatomic) int count;\n@end',
  'objective-cpp': '@interface Note:NSObject\n@property(nonatomic) int count;\n@end',
  protobuf: 'syntax="proto3";message Note{string title=1;}',
}
const sql = 'select title,count from notes where count>1 order by title;'

for (const language of FORMAT_LANGUAGES) {
  const source = language.engine === "sql" ? sql : samples[language.id]
  assert.equal(typeof source, "string", `${language.id}: missing regression example`)
  const formatted = await formatCode(source, language.id)
  assert.equal(typeof formatted, "string", `${language.id}: formatter did not produce a view`)
  assert.notEqual(formatted, source, `${language.id}: expected meaningful formatting`)
  assert.equal(await formatCode(formatted, language.id), null, `${language.id}: unstable formatting`)
  for (const alias of language.aliases) {
    assert.equal(getCodeFormatLanguage(alias)?.id, language.id, `${alias}: wrong language`)
  }
}

// Compact SQL must remain readable beyond short examples, without touching
// literal text or changing the formatter's interpretation of comments.
const shortSql = "SELECT *\nFROM products\nWHERE category = 'Gifts'\n  AND released = 1"
assert.equal(await formatCode(shortSql, "sql"), null, "already readable clauses should stay unchanged")
assert.equal(await formatCode(shortSql.replaceAll("\n", " "), "sql"), shortSql)
const complexSql = "WITH recent AS (SELECT id,title FROM notes WHERE archived=0) SELECT n.id,n.title,count(t.id) AS tag_count FROM recent n LEFT JOIN tags t ON n.id=t.note_id WHERE n.id IN (SELECT note_id FROM favorites WHERE active=1) GROUP BY n.id,n.title HAVING count(t.id)>1 ORDER BY n.title;"
const sqlCases = [
  ["sql", complexSql],
  ["sql", "SELECT CASE WHEN published=1 THEN 'ready' ELSE 'draft' END AS status FROM notes WHERE archived=0;"],
  ["sql", "SELECT title FROM notes; SELECT id FROM tags WHERE active=1;"],
  ["sql", "SELECT title, -- keep title first\n author FROM notes WHERE active=1;"],
  ["sql", "/*\nFROM\n  notes\n*/\nSELECT title FROM notes;"],
  ["sql", "SELECT 'line one\nSELECT\n  literal text\nFROM\n  more text' AS body FROM notes;"],
  ["postgresql", "SELECT $note$line one\nSELECT\n  literal text\nFROM\n  more text$note$ AS body FROM notes;"],
  ["mysql", "SELECT `line one\nFROM\n  literal name` FROM notes;"],
  ["transactsql", "SELECT [line one\nFROM\n  literal name] FROM notes;"],
  ["plsql", "SELECT q'[line one\nFROM\n  literal text]' AS body FROM notes;"],
  ["sql", `SELECT ${"long_column_name_".repeat(7)} FROM notes;`],
  ["sql", `SELECT ${Array.from({ length: 12 }, (_, i) => `column_${i}`).join(",")} FROM notes;`],
]
for (const [language, source] of sqlCases) {
  const formatted = await formatCode(source, language) ?? source
  const options = { language, tabWidth: 2, expressionWidth: 88, linesBetweenQueries: 1 }
  assert.equal(formatSql(formatted, options), formatSql(source, options), `${language}: SQL content changed`)
  assert.equal(await formatCode(formatted, language), null, `${language}: compact layout is unstable`)
}
const complexView = await formatCode(complexSql, "sql")
assert.match(complexView, /SELECT n\.id, n\.title, count\(t\.id\) AS tag_count/)
assert.match(complexView, /FROM recent n/)
assert.match(complexView, /SELECT note_id\n\s+FROM favorites/)
assert.match(complexView, /WHERE active = 1/)
assert.match(complexView, /^WITH recent AS \(\n  SELECT id, title\n  FROM notes/m)
const longListView = await formatCode(sqlCases.at(-1)[1], "sql")
assert.match(longListView, /SELECT\n  column_0,\n  column_1,/)

// Source data and embedded strings remain meaningful, and no prettified view is
// offered when formatting fails or only terminal newlines would change.
const comment = await formatCode(samples.jsonc, "jsonc")
assert.match(comment, /Keep this comment/)
const originalObject = { note: "two  spaces", items: ["한글", 3] }
assert.deepEqual(JSON.parse(await formatCode(JSON.stringify(originalObject), "json")), originalObject)
assert.equal(await formatCode('const note = "Ready";\r\n\r\n', "js"), null)
assert.equal(await formatCode('const note={count:2};', " JS "), await formatCode('const note={count:2};', "javascript"))
assert.match(await formatCode('$items=[1,2,3];', "php"), /\$items = \[1, 2, 3\];/)
assert.equal(await formatCode('const note = html`<div   title="same">  same  </div>`;', "js"), null)

for (const [language, invalid] of [
  ["json", '{"missing":}'], ["javascript", 'const broken = ;'],
  ["sql", "select 'unterminated"], ["python", 'def missing(:\n return 1'],
  ["go", 'package main\nfunc missing( {'], ["rust", 'fn missing( {'],
  ["kotlin", 'fun missing( {'], ["php", '<?php $missing = ;'],
  ["bash", 'if true; then'], ["toml", 'name=   "unterminated'],
]) {
  assert.equal(await formatCode(invalid, language), null, `${language}: invalid source should stay original`)
}
assert.equal(await formatCode("sample", "unknown-language"), null)
assert.equal(await formatCode("Write-Output 'Ready'", "powershell"), null)
assert.equal(await formatCode(" ", "json"), null)
assert.equal(await formatCode('"' + "a".repeat(65536) + '"', "json"), null)
assert.equal(await formatCode('"before\0after"', "json"), null)

console.log(`Code formatting: ${FORMAT_LANGUAGES.length} languages/dialects, aliases and fallback checks passed.`)
