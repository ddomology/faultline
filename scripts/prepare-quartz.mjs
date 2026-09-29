import { readFileSync, writeFileSync, cpSync, rmSync } from "node:fs";

const path = "_quartz/quartz.config.ts";
let config = readFileSync(path, "utf8");
const changes = [
  ['pageTitle: "Quartz 4"', 'pageTitle: "PortSwigger Lab Notes"'],
  ['baseUrl: "quartz.jzhao.xyz"', 'baseUrl: "ddomology.github.io/portswigger-lab-notes"'],
  ['locale: "en-US"', 'locale: "ko-KR"'],
  ['analytics: {\n      provider: "plausible",\n    }', 'analytics: null'],
  ['Plugin.CustomOgImages(),', ''],
];
for (const [before, after] of changes) {
  if (!config.includes(before)) throw new Error("Quartz configuration changed: " + before);
  config = config.replace(before, after);
}
writeFileSync(path, config);
writeFileSync("_quartz/quartz/styles/custom.scss", readFileSync("site/reader.scss", "utf8"));
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
