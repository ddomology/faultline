import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";

const path = "_quartz/quartz.config.ts";
let config = readFileSync(path, "utf8");
const changes = [
  ['pageTitle: "Quartz 4"', 'pageTitle: "PortSwigger Lab Notes"'],
  ['baseUrl: "quartz.jzhao.xyz"', 'baseUrl: "ddomology.github.io/portswigger-lab-notes"'],
  ['locale: "en-US"', 'locale: "ko-KR"'],
  ['fontOrigin: "googleFonts"', 'fontOrigin: "local"'],
  ['enableSPA: true', 'enableSPA: false'],
  ['ignorePatterns: ["private", "templates", ".obsidian"]', 'ignorePatterns: ["**/private/**", "**/templates/**", "**/.obsidian/**", "**/.trash/**"]'],
  ['analytics: {\n      provider: "plausible",\n    }', 'analytics: null'],
  ['Plugin.CustomOgImages(),', ''],
  ['Plugin.FolderPage(),', ''],
  ['Plugin.TagPage(),', ''],
  ['filters: [Plugin.RemoveDrafts()]', 'filters: []'],
];
for (const [before, after] of changes) {
  if (config.includes(before)) config = config.replace(before, after);
  else if (after && !config.includes(after)) throw new Error("Quartz configuration changed: " + before);
}
cpSync("site/reader-code.ts", "_quartz/quartz/plugins/transformers/reader-code.ts");
cpSync("site/code-format.ts", "_quartz/quartz/plugins/transformers/code-format.ts");
config = config.replace('import { ReaderCode }', 'import { ReaderCode, ReaderCodeViews }');
if (!config.includes('import { ReaderCode, ReaderCodeViews }')) config = 'import { ReaderCode, ReaderCodeViews } from "./quartz/plugins/transformers/reader-code"\n' + config;
if (!config.includes("ReaderCode(),")) {
  const before = "      Plugin.SyntaxHighlighting({";
  if (!config.includes(before)) throw new Error("Quartz code transformer placement changed");
  config = config.replace(before, "      ReaderCode(),\n" + before);
}
if (!config.includes("ReaderCodeViews(),")) {
  const syntax = /      Plugin\.SyntaxHighlighting\(\{[\s\S]*?\n      \}\),/;
  if (!syntax.test(config)) throw new Error("Quartz syntax highlighting placement changed");
  config = config.replace(syntax, "$&\n      ReaderCodeViews(),");
}
cpSync("site/code-highlight.ts", "_quartz/quartz/plugins/transformers/code-highlight.ts");
if (!config.includes('import { ReaderSyntaxHighlighting }')) config = 'import { ReaderSyntaxHighlighting } from "./quartz/plugins/transformers/code-highlight"\n' + config;
if (!config.includes("ReaderSyntaxHighlighting(),")) {
  const syntax = /      Plugin\.SyntaxHighlighting\(\{[\s\S]*?\n      \}\),/;
  if (!syntax.test(config)) throw new Error("Quartz syntax highlighting placement changed");
  config = config.replace(syntax, "      ReaderSyntaxHighlighting(),");
}
cpSync("site/reader-images.ts", "_quartz/quartz/plugins/transformers/reader-images.ts");
if (!config.includes('import { ReaderImages }')) config = 'import { ReaderImages } from "./quartz/plugins/transformers/reader-images"\n' + config;
if (!config.includes("ReaderImages(),")) {
  const before = '      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),';
  if (!config.includes(before)) throw new Error("Quartz image transformer placement changed");
  config = config.replace(before, "      ReaderImages(),\n" + before);
}
// Match the reader palette so the initial paint and generated styles agree.
const palettes = {
  lightMode: { light: "#ffffff", lightgray: "#e2e5e9", gray: "#68717c", darkgray: "#343b43", dark: "#20252b", secondary: "#315d8e", tertiary: "#244b76", highlight: "#f3f5f7", textHighlight: "#dce9f8" },
  darkMode: { light: "#17191c", lightgray: "#34393f", gray: "#a1a9b3", darkgray: "#cbd0d7", dark: "#edf0f3", secondary: "#a1c3ea", tertiary: "#c1d8f3", highlight: "#22262c", textHighlight: "#334c68" },
};
for (const [mode, colors] of Object.entries(palettes)) {
  const block = new RegExp(`${mode}: \\{[^}]*\\}`);
  if (!block.test(config)) throw new Error(`Quartz palette missing: ${mode}`);
  config = config.replace(block, `${mode}: ${JSON.stringify(colors)}`);
}
writeFileSync(path, config);
// Quartz's pinned typecheck uses the legacy Node resolver. Point its type-only
// lookup at declarations exposed solely via exports by these formatter packages.
const tsconfigPath = "_quartz/tsconfig.json";
const tsconfig = JSON.parse(readFileSync(tsconfigPath, "utf8"));
tsconfig.compilerOptions.moduleResolution = "node";
tsconfig.compilerOptions.paths = {
  ...tsconfig.compilerOptions.paths,
  "@prettier/plugin-xml": ["../node_modules/@prettier/plugin-xml/types/plugin.d.ts"],
  "@wasm-fmt/gofmt": ["../node_modules/@wasm-fmt/gofmt/gofmt.d.ts"],
  "@wasm-fmt/clang-format": ["../node_modules/@wasm-fmt/clang-format/clang-format.d.ts"],
};
writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + "\n");
cpSync("site/quartz.layout.ts", "_quartz/quartz.layout.ts");
cpSync("site/NotebookNav.tsx", "_quartz/quartz/components/NotebookNav.tsx");
cpSync("site/LabExplorer.tsx", "_quartz/quartz/components/LabExplorer.tsx");
cpSync("site/TopicExplorer.tsx", "_quartz/quartz/components/TopicExplorer.tsx");
cpSync("site/NoteTitle.tsx", "_quartz/quartz/components/NoteTitle.tsx");
cpSync("site/LabPagination.tsx", "_quartz/quartz/components/LabPagination.tsx");
cpSync("site/lab-pagination.scss", "_quartz/quartz/components/styles/lab-pagination.scss");
cpSync("site/ReaderTools.tsx", "_quartz/quartz/components/ReaderTools.tsx");
cpSync("site/reader-tools.js", "_quartz/quartz/components/scripts/reader-tools.inline.js");
cpSync("site/reader-tools.css", "_quartz/quartz/components/styles/reader-tools.scss");
cpSync("site/Icon.tsx", "_quartz/quartz/components/Icon.tsx");
cpSync("site/TopicIcon.tsx", "_quartz/quartz/components/TopicIcon.tsx");
cpSync("site/topic-icons.ts", "_quartz/quartz/components/scripts/topic-icons.ts");
cpSync("site/topic-icons.scss", "_quartz/quartz/styles/topic-icons.scss");
cpSync("site/DifficultyBars.tsx", "_quartz/quartz/components/DifficultyBars.tsx");
cpSync("site/difficulty-bars.ts", "_quartz/quartz/components/scripts/difficulty-bars.ts");
cpSync("site/difficulty-bars.scss", "_quartz/quartz/styles/difficulty-bars.scss");
cpSync("site/Darkmode.tsx", "_quartz/quartz/components/Darkmode.tsx");
cpSync("site/ui-icons.ts", "_quartz/quartz/components/scripts/ui-icons.ts");
cpSync("site/ui-icons.scss", "_quartz/quartz/styles/ui-icons.scss");
rmSync("_quartz/quartz/components/scripts/topic-explorer.inline.ts", { force: true });
cpSync("site/topic-explorer.js", "_quartz/quartz/components/scripts/topic-explorer.inline.js");
cpSync("site/topic-explorer.css", "_quartz/quartz/components/styles/topic-explorer.scss");
mkdirSync("_quartz/quartz/components/data", { recursive: true });
const iconDirectory = "site/assets/icons/lucide";
const iconPaths = Object.fromEntries(readdirSync(iconDirectory).filter(name => name.endsWith(".svg")).sort().map(name => {
  const svg = readFileSync(`${iconDirectory}/${name}`, "utf8");
  const body = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/)?.[1].trim();
  if (!body || /<(?:script|foreignObject)|\bon\w+=/i.test(body)) throw new Error(`Invalid UI icon: ${name}`);
  return [name.slice(0, -4), body];
}));
writeFileSync("_quartz/quartz/components/data/icon-paths.json", JSON.stringify(iconPaths));
// Keep all topic surfaces on the approved SVG geometry and fail on missing topics.
const topicIconDirectory = "site/assets/icons/topics";
const topicIconPaths = Object.fromEntries(readdirSync(topicIconDirectory).filter(name => name.endsWith(".svg")).sort().map(name => {
  const svg = readFileSync(`${topicIconDirectory}/${name}`, "utf8");
  const body = svg.match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/)?.[1].replace(/<title>[\s\S]*?<\/title>/g, "").trim();
  if (!body || /<(?:script|foreignObject)|\bon\w+=/i.test(body)) throw new Error(`Invalid topic icon: ${name}`);
  return [name.slice(0, -4), body];
}));
const { categories } = JSON.parse(readFileSync("data/labs.json", "utf8"));
for (const { id } of categories) {
  if (!Object.hasOwn(topicIconPaths, id)) throw new Error(`Missing topic icon: ${id}`);
}
writeFileSync("_quartz/quartz/components/data/topic-icon-paths.json", JSON.stringify(topicIconPaths));
mkdirSync("_quartz/quartz/static/fonts", { recursive: true });
cpSync("site/assets/fonts/pretendard", "_quartz/quartz/static/fonts/pretendard", { recursive: true });
mkdirSync("_quartz/quartz/static/icons", { recursive: true });
cpSync(iconDirectory, "_quartz/quartz/static/icons/lucide", { recursive: true });
cpSync(topicIconDirectory, "_quartz/quartz/static/icons/topics", { recursive: true });
// Install the approved split-shield favicon, including non-SVG browser fallbacks.
const faviconDirectory = "site/assets/favicon";
// Share the approved geometry; the inline mark follows the site's theme switch.
const brandBody = readFileSync(`${faviconDirectory}/favicon.svg`, "utf8")
  .match(/<svg\b[^>]*>([\s\S]*?)<\/svg>/)?.[1]
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
  .replace(/<!--[\s\S]*?-->/g, "")
  .replaceAll('id="split"', 'id="notebook-brand-split"')
  .replaceAll("url(#split)", "url(#notebook-brand-split)").trim();
if (!brandBody || /<(?:script|foreignObject)|\bon\w+=/i.test(brandBody)) throw new Error("Invalid brand SVG");
writeFileSync("_quartz/quartz/components/data/brand-mark.json", JSON.stringify({ body: brandBody }));
for (const name of ["favicon.svg", "favicon-32.png", "favicon.ico", "apple-touch-icon.png"]) {
  cpSync(`${faviconDirectory}/${name}`, `_quartz/quartz/static/${name}`);
}
cpSync(`${faviconDirectory}/favicon-32.png`, "_quartz/quartz/static/icon.png");
const faviconVersion = createHash("sha256").update(readFileSync(`${faviconDirectory}/favicon.svg`)).digest("hex").slice(0, 12);
const headPath = "_quartz/quartz/components/Head.tsx";
let head = readFileSync(headPath, "utf8");
const iconPathPattern = /const iconPath = [^\n]+/;
const iconLinksPattern = /        \{\/\* Notebook favicon \*\/\}[\s\S]*?\{\/\* End notebook favicon \*\/\}|        <link rel="icon" href=\{iconPath\} \/>/;
if (!iconPathPattern.test(head) || !iconLinksPattern.test(head)) throw new Error("Quartz favicon markup changed");
head = head.replace(iconPathPattern, `const iconPath = joinSegments(baseDir, "static/favicon.svg") + "?v=${faviconVersion}"`);
head = head.replace(iconLinksPattern, `        {/* Notebook favicon */}
        <link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48" href={joinSegments(baseDir, "static/favicon.ico?v=${faviconVersion}")} />
        <link rel="icon" type="image/png" sizes="32x32" href={joinSegments(baseDir, "static/favicon-32.png?v=${faviconVersion}")} />
        <link rel="icon" type="image/svg+xml" sizes="any" href={iconPath} />
        <link rel="apple-touch-icon" sizes="180x180" href={joinSegments(baseDir, "static/apple-touch-icon.png?v=${faviconVersion}")} />
        {/* End notebook favicon */}`);
// Keep tabs compact: topic and within-topic number, e.g. "SQLi #3 · Notes".
cpSync("site/tab-title.ts", "_quartz/quartz/components/tab-title.ts");
if (!head.includes('import { tabTitle } from "./tab-title"')) head = 'import { tabTitle } from "./tab-title"\n' + head;
const titlePattern = /<title>[\s\S]*?<\/title>/;
if (!titlePattern.test(head)) throw new Error("Quartz title markup changed");
head = head.replace(titlePattern, '<title>{tabTitle(fileData.slug!, title)}</title>');
writeFileSync(headPath, head);
// Keep Quartz's search, TOC and clipboard behavior; use the same SVG set throughout.
const searchPath = "_quartz/quartz/components/Search.tsx";
let search = readFileSync(searchPath, "utf8");
if (!search.includes('import Icon from "./Icon"')) search = 'import Icon from "./Icon"\n' + search;
search = search.replace(/<svg\b[\s\S]*?<\/svg>/, '<Icon name="search" />');
writeFileSync(searchPath, search);
const tocPath = "_quartz/quartz/components/TableOfContents.tsx";
let toc = readFileSync(tocPath, "utf8");
if (!toc.includes('import Icon from "./Icon"')) toc = 'import Icon from "./Icon"\n' + toc;
toc = toc.replace(/<svg\b[\s\S]*?<\/svg>/, '<Icon name="chevron-down" className="fold" />');
writeFileSync(tocPath, toc);
const clipboardPath = "_quartz/quartz/components/scripts/clipboard.inline.ts";
cpSync("site/clipboard.inline.ts", clipboardPath);
cpSync("data/labs.json", "_quartz/quartz/components/data/topic-catalog.json");
cpSync("site/explorer-titles.json", "_quartz/quartz/components/data/explorer-titles.json");
cpSync("site/topic-aliases.json", "_quartz/quartz/components/data/topic-aliases.json");
rmSync("_quartz/quartz/components/scripts/lab-explorer.inline.ts", { force: true });
cpSync("site/dashboard.js", "_quartz/quartz/components/scripts/lab-explorer.inline.js");
cpSync("site/dashboard.css", "_quartz/quartz/components/styles/lab-explorer.scss");
writeFileSync("_quartz/quartz/styles/custom.scss", readFileSync("site/reader.scss", "utf8"));
cpSync("site/markdown.scss", "_quartz/quartz/styles/markdown.scss");
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
// These legacy addresses become redirects after rendering, not searchable notes.
rmSync("_quartz/content/notes.md", { force: true });
rmSync("_quartz/content/guide.md", { force: true });
