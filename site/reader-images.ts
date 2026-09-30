import path from "node:path"
import type { Root } from "hast"
import sharp, { type Metadata } from "sharp"
import { visit } from "unist-util-visit"
import type { QuartzTransformerPlugin } from "../types"

// Reserve screenshot space and serve repository attachments from this site.
// Old raw URLs remain supported after the repository rename without editing notes.
export const ReaderImages: QuartzTransformerPlugin = () => ({
  name: "ReaderImages",
  htmlPlugins(ctx) {
    const contentRoot = path.resolve(ctx.argv.directory)
    const metadata = new Map<string, Promise<Metadata>>()
    return [
      () => async (tree: Root, file) => {
        const pending: Promise<void>[] = []
        visit(tree, "element", (node) => {
          const { src, width, height } = node.properties
          if (node.tagName !== "img" || typeof src !== "string") return
          let imagePath: string
          let repositoryImage = false
          try {
            if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) {
              const url = new URL(src)
              const prefix = ["/ddomology/faultline/main/content/", "/ddomology/portswigger-lab-notes/main/content/"]
                .find((candidate) => url.pathname.startsWith(candidate))
              if (url.origin !== "https://raw.githubusercontent.com" || !prefix) return
              imagePath = path.resolve(contentRoot, decodeURIComponent(url.pathname.slice(prefix.length)))
              repositoryImage = true
            } else {
              const relativePath = decodeURIComponent(src.split(/[?#]/, 1)[0])
              imagePath = relativePath.startsWith("/")
                ? path.resolve(contentRoot, "." + relativePath)
                : path.resolve(path.dirname(file.path), relativePath)
            }
          } catch { return }
          if (!imagePath.startsWith(contentRoot + path.sep)) return
          if (repositoryImage) {
            // CrawlLinks' shortest strategy resolves multi-segment paths from
            // the content root, then makes them relative to the rendered page.
            node.properties.src = "./" + path.relative(contentRoot, imagePath).split(path.sep).join("/")
          }
          if (width || height) return
          if (!metadata.has(imagePath)) metadata.set(imagePath, sharp(imagePath).metadata())
          pending.push(metadata.get(imagePath)!.then((size) => {
            if (size.width && size.height) {
              node.properties.width = size.width
              node.properties.height = size.height
            }
          }).catch(() => {
            // Unsupported or missing attachments retain their authored markup.
          }))
        })
        await Promise.all(pending)
      },
    ]
  },
})
