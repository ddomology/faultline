import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { exportStatic } from "../scripts/export-static.mjs"

async function fixture(t, entries) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "faultline-static-"))
  t.after(() => fs.rm(root, { recursive: true, force: true }))
  const sourceDir = path.join(root, "client")
  const outDir = path.join(root, "dist")
  for (const [name, contents] of Object.entries(entries)) {
    const file = path.join(sourceDir, name)
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, contents)
  }
  return { sourceDir, outDir, read: (name) => fs.readFile(path.join(outDir, name), "utf8") }
}

test("nested basename merges assets, preserves data and flattens exact HTML URLs", async (t) => {
  const f = await fixture(t, {
    "index.html": "generic SPA fallback",
    "preview/faultline/index.html": "prerendered home",
    "preview/faultline/_.data": "home data",
    "preview/faultline/labs/topic/note.html/index.html": "prerendered note",
    "preview/faultline/labs/topic/note.html.data": "exact URL data",
    "preview/faultline/labs/topic/note/index.html": "extensionless note",
    "preview/faultline/labs/topic/note.data": "extensionless data",
    "assets/app.js": "application",
    "images/hero.svg": "hero",
    ".vite/manifest.json": "private build manifest",
  })
  const result = await exportStatic({ ...f, basePath: "/preview/faultline/" })
  assert.equal(await f.read("index.html"), "prerendered home")
  assert.equal(await f.read("labs/topic/note.html"), "prerendered note")
  assert.equal(await f.read("labs/topic/note.html.data"), "exact URL data")
  assert.equal(await f.read("labs/topic/note/index.html"), "extensionless note")
  assert.equal(await f.read("labs/topic/note.data"), "extensionless data")
  assert.equal(await f.read("assets/app.js"), "application")
  assert.equal(await f.read("images/hero.svg"), "hero")
  assert.equal(await f.read(".nojekyll"), "")
  await assert.rejects(f.read(".vite/manifest.json"), { code: "ENOENT" })
  assert.equal(await fs.readFile(path.join(f.sourceDir, "preview/faultline/labs/topic/note.html/index.html"), "utf8"), "prerendered note")
  assert.equal(result.html, 3)
  assert.equal(result.data, 3)
})

test("root basename retains home, removes fallback, and flattens HTML routes", async (t) => {
  const f = await fixture(t, {
    "index.html": "home",
    "__spa-fallback.html": "fallback",
    "note.html/index.html": "note",
    "note.html.data": "data",
    "assets/app.js": "app",
  })
  await exportStatic({ ...f, basePath: "/" })
  assert.equal(await f.read("index.html"), "home")
  assert.equal(await f.read("note.html"), "note")
  await assert.rejects(f.read("__spa-fallback.html"), { code: "ENOENT" })
})

test("collisions fail before overwriting a prior export", async (t) => {
  const f = await fixture(t, {
    "index.html": "fallback",
    "site/index.html": "home",
    "assets/app.js": "vite asset",
    "site/assets/app.js": "conflicting route asset",
  })
  await fs.mkdir(f.outDir)
  await fs.writeFile(path.join(f.outDir, "index.html"), "previous good build")
  await assert.rejects(exportStatic({ ...f, basePath: "/site/" }), /collision/)
  assert.equal(await f.read("index.html"), "previous good build")
})

test("file/directory collisions and missing prerendered home fail explicitly", async (t) => {
  const f = await fixture(t, {
    "index.html": "fallback",
    "site/index.html": "home",
    "site/note.html/index.html": "note",
    "site/note.html/child/index.html": "child",
  })
  await assert.rejects(exportStatic({ ...f, basePath: "/site/" }), /file\/directory collision/)
  await assert.rejects(exportStatic({ ...f, basePath: "/missing/" }), /prerendered homepage/)
})

test("overlapping source/output and unsafe basename are rejected", async (t) => {
  const f = await fixture(t, { "index.html": "home" })
  await assert.rejects(exportStatic({ ...f, outDir: path.join(f.sourceDir, "dist") }), /must not overlap/)
  await assert.rejects(exportStatic({ ...f, basePath: "/../site/" }), /traversal/)
})
