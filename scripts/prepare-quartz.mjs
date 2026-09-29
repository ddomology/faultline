import { readFileSync, writeFileSync, cpSync, rmSync, mkdirSync } from "node:fs";

const path = "_quartz/quartz.config.ts";
let config = readFileSync(path, "utf8");
const changes = [
  ['pageTitle: "Quartz 4"', 'pageTitle: "PortSwigger Lab Notes"'],
  ['baseUrl: "quartz.jzhao.xyz"', 'baseUrl: "ddomology.github.io/portswigger-lab-notes"'],
  ['locale: "en-US"', 'locale: "ko-KR"'],
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
writeFileSync(path, config);
cpSync("site/quartz.layout.ts", "_quartz/quartz.layout.ts");
cpSync("site/NotebookNav.tsx", "_quartz/quartz/components/NotebookNav.tsx");
cpSync("site/LabExplorer.tsx", "_quartz/quartz/components/LabExplorer.tsx");
cpSync("site/TopicExplorer.tsx", "_quartz/quartz/components/TopicExplorer.tsx");
rmSync("_quartz/quartz/components/scripts/topic-explorer.inline.ts", { force: true });
cpSync("site/topic-explorer.js", "_quartz/quartz/components/scripts/topic-explorer.inline.js");
cpSync("site/topic-explorer.css", "_quartz/quartz/components/styles/topic-explorer.scss");
mkdirSync("_quartz/quartz/components/data", { recursive: true });
cpSync("data/labs.json", "_quartz/quartz/components/data/topic-catalog.json");
cpSync("site/topic-aliases.json", "_quartz/quartz/components/data/topic-aliases.json");
rmSync("_quartz/quartz/components/scripts/lab-explorer.inline.ts", { force: true });
cpSync("site/dashboard.js", "_quartz/quartz/components/scripts/lab-explorer.inline.js");
cpSync("site/dashboard.css", "_quartz/quartz/components/styles/lab-explorer.scss");
writeFileSync("_quartz/quartz/styles/custom.scss", readFileSync("site/reader.scss", "utf8"));
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
// These legacy addresses become redirects after rendering, not searchable notes.
rmSync("_quartz/content/notes.md", { force: true });
rmSync("_quartz/content/guide.md", { force: true });
