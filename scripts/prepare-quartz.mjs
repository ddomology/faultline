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
];
for (const [before, after] of changes) {
  if (!config.includes(before)) throw new Error("Quartz configuration changed: " + before);
  config = config.replace(before, after);
}
writeFileSync(path, config);
// Keep opening a note at its title. The default Explorer scrolls the whole page
// while trying to reveal the active file; scroll only its file list instead.
const explorerPath = "_quartz/quartz/components/scripts/explorer.inline.ts";
let explorer = readFileSync(explorerPath, "utf8");
explorer = explorer.replace(
  'activeElement.scrollIntoView({ behavior: "smooth" })',
  'explorerUl.scrollTop = Math.max(0, (activeElement as HTMLElement).offsetTop - explorerUl.offsetTop - 16)',
);
writeFileSync(explorerPath, explorer);
cpSync("site/quartz.layout.ts", "_quartz/quartz.layout.ts");
cpSync("site/NotebookNav.tsx", "_quartz/quartz/components/NotebookNav.tsx");
cpSync("site/LabExplorer.tsx", "_quartz/quartz/components/LabExplorer.tsx");
cpSync("site/TopicExplorer.tsx", "_quartz/quartz/components/TopicExplorer.tsx");
cpSync("site/topic-explorer.js", "_quartz/quartz/components/scripts/topic-explorer.inline.ts");
cpSync("site/topic-explorer.css", "_quartz/quartz/components/styles/topic-explorer.scss");
mkdirSync("_quartz/quartz/components/data", { recursive: true });
cpSync("data/labs.json", "_quartz/quartz/components/data/topic-catalog.json");
cpSync("site/topic-aliases.json", "_quartz/quartz/components/data/topic-aliases.json");
cpSync("site/dashboard.js", "_quartz/quartz/components/scripts/lab-explorer.inline.ts");
cpSync("site/dashboard.css", "_quartz/quartz/components/styles/lab-explorer.scss");
writeFileSync("_quartz/quartz/styles/custom.scss", readFileSync("site/reader.scss", "utf8"));
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
