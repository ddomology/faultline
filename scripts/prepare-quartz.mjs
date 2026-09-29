import { readFileSync, writeFileSync, cpSync, rmSync } from "node:fs";

const path = "_quartz/quartz.config.ts";
let config = readFileSync(path, "utf8");
const changes = [
  ['pageTitle: "Quartz 4"', 'pageTitle: "PortSwigger Lab Notes"'],
  ['baseUrl: "quartz.jzhao.xyz"', 'baseUrl: "ddomology.github.io/portswigger-lab-notes"'],
  ['analytics: {\n      provider: "plausible",\n    }', 'analytics: null'],
  ['Plugin.CustomOgImages(),', ''],
];
for (const [before, after] of changes) {
  if (!config.includes(before)) throw new Error("Quartz configuration changed: " + before);
  config = config.replace(before, after);
}
writeFileSync(path, config);
rmSync("_quartz/content", { recursive: true, force: true });
cpSync("content", "_quartz/content", { recursive: true });
