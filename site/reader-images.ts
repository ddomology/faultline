import path from "node:path"
import type { Root } from "hast"
import sharp, { type Metadata } from "sharp"
import { visit } from "unist-util-visit"
import type { QuartzTransformerPlugin } from "../types"

// Reserve screenshot space before the network request completes. Keep the
// original URL, and read metadata only from images already in this repository.
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
          if (node.tagName !== "img" || typeof src !== "string" || width || height) return
          let imagePath: string
          try {
            if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(src)) {
              const url = new URL(src)
              const prefix = "/ddomology/portswigger-lab-notes/main/content/"
              if (url.origin !== "https://raw.githubusercontent.com" || !url.pathname.startsWith(prefix)) return
              imagePath = path.resolve(contentRoot, decodeURIComponent(url.pathname.slice(prefix.length)))
            } else {
              const relativePath = decodeURIComponent(src.split(/[?#]/, 1)[0])
              imagePath = relativePath.startsWith("/")
                ? path.resolve(contentRoot, "." + relativePath)
                : path.resolve(path.dirname(file.path), relativePath)
            }
          } catch { return }
          if (!imagePath.startsWith(contentRoot + path.sep)) return
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
