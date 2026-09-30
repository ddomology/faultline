import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const projectRoot = fileURLToPath(new URL("../", import.meta.url))

function isWithin(parent, child) {
  const relative = path.relative(parent, child)
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative))
}

function normalizeBase(basePath) {
  if (typeof basePath !== "string" || !basePath.startsWith("/") || /[?#\\]/.test(basePath)) {
    throw new Error("basePath must be an absolute URL path without query, hash, or backslash")
  }
  const segments = basePath.split("/").filter(Boolean)
  if (segments.some((segment) => segment === "." || segment === ".." || /%2f|%5c|%2e/i.test(segment))) {
    throw new Error("basePath must not contain traversal or encoded path separators")
  }
  return segments.join("/")
}

/**
 * React Router emits prerendered routes beneath basename, while Vite assets stay
 * at the client root. Produce a host-independent document root and real .html
 * files for the existing GitHub Pages URLs. No SPA rewrite or runtime is needed.
 */
export async function exportStatic({
  sourceDir = path.join(projectRoot, "build/client"),
  outDir = path.join(projectRoot, "dist"),
  basePath = "/",
  aliasRoutes = [],
} = {}) {
  const source = path.resolve(sourceDir)
  const destination = path.resolve(outDir)
  if (isWithin(source, destination) || isWithin(destination, source)) {
    throw new Error("Static source and output directories must not overlap")
  }
  if (!(await fs.stat(source)).isDirectory()) throw new Error("Static source must be a directory")
  const base = normalizeBase(basePath)
  const files = new Map()
  const generated = new Map()

  async function collect(directory, prefix = "") {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name
      const absolute = path.join(directory, entry.name)
      if (relative === ".vite" || relative.startsWith(".vite/")) continue
      if (entry.isSymbolicLink()) throw new Error(`Symbolic links are not supported in static output: ${relative}`)
      if (entry.isDirectory()) {
        await collect(absolute, relative)
        continue
      }
      if (!entry.isFile()) throw new Error(`Unsupported static entry: ${relative}`)

      const inBase = base && relative.startsWith(`${base}/`)
      let target = inBase ? relative.slice(base.length + 1) : relative
      // Non-root basename puts a generic fallback at client/index.html. The
      // actual homepage is client/<basename>/index.html and must win explicitly.
      if (base && !inBase && relative === "index.html") continue
      if (target === "__spa-fallback.html" || target.startsWith(".vite/")) continue
      target = target.replace(/\.html\/index\.html$/, ".html")
      if (files.has(target)) throw new Error(`Static export collision: ${target}`)
      files.set(target, absolute)
    }
  }

  await collect(source)
  if (!files.has("index.html")) throw new Error("A prerendered homepage is required; SPA fallback cannot be deployed")
  for (const route of aliasRoutes) {
    if (typeof route !== "string" || !route.startsWith("/") || !route.endsWith(".html") || /[?#\\]/.test(route) || route.split("/").some(part => part === ".." || part === ".")) {
      throw new Error(`Invalid canonical alias route: ${route}`)
    }
    const canonical = route.slice(1)
    if (!files.has(canonical)) throw new Error(`Alias target missing: ${route}`)
    const target = canonical.slice(0, -5) + "/index.html"
    if (files.has(target)) throw new Error(`Static export collision: ${target}`)
    const url = `/${base ? base + "/" : ""}${canonical}`
    const escaped = url.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")
    const literal = JSON.stringify(url).replaceAll("<", "\\u003c")
    generated.set(target, `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Faultline · 페이지 이동</title><link rel="canonical" href="${escaped}"><meta name="robots" content="noindex"><script>const target=new URL(${literal},location.origin);target.search=location.search;target.hash=location.hash;location.replace(target.href)</script><meta http-equiv="refresh" content="0;url=${escaped}"></head><body><a href="${escaped}">노트로 이동</a></body></html>`)
    files.set(target, null)
  }
  for (const target of files.keys()) {
    let ancestor = path.posix.dirname(target)
    while (ancestor !== ".") {
      if (files.has(ancestor)) throw new Error(`Static file/directory collision: ${ancestor} and ${target}`)
      ancestor = path.posix.dirname(ancestor)
    }
  }

  // Validate the entire output plan before replacing an existing successful build.
  await fs.mkdir(path.dirname(destination), { recursive: true })
  const temporary = await fs.mkdtemp(`${destination}.tmp-`)
  try {
    for (const [relative, sourceFile] of files) {
      const target = path.join(temporary, relative)
      await fs.mkdir(path.dirname(target), { recursive: true })
      if (generated.has(relative)) await fs.writeFile(target, generated.get(relative))
      else await fs.copyFile(sourceFile, target)
    }
    await fs.writeFile(path.join(temporary, ".nojekyll"), "")
    await fs.rm(destination, { recursive: true, force: true })
    await fs.rename(temporary, destination)
  } finally {
    await fs.rm(temporary, { recursive: true, force: true })
  }
  return {
    outDir: destination,
    files: files.size,
    html: [...files.keys()].filter((file) => file.endsWith(".html")).length,
    data: [...files.keys()].filter((file) => file.endsWith(".data")).length,
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const { basePath } = await import("../site.config.mjs")
  const manifest = JSON.parse(await fs.readFile(path.join(projectRoot, ".generated/manifest.json"), "utf8"))
  const result = await exportStatic({ basePath, aliasRoutes: manifest.routes })
  console.log(`Static export: ${result.html} HTML pages, ${result.data} data files -> ${result.outDir}`)
}
