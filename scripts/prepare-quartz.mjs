import { readFileSync, writeFileSync, cpSync, rmSync } from "node:fs";

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
cpSync("site/quartz.layout.ts", "_quartz/quartz.layout.ts");
cpSync("site/NotebookNav.tsx", "_quartz/quartz/components/NotebookNav.tsx");
writeFileSync("_quartz/quartz/styles/custom.scss", readFileSync("site/reader.scss", "utf8"));
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
