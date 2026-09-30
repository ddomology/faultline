import type { Config } from '@react-router/dev/config'
import manifest from './.generated/manifest.json'
import { basePath } from './site.config.mjs'

export default {
  ssr: false,
  basename: basePath,
  prerender: {
    paths: ['/', '/404.html', ...manifest.routes.flatMap(path => [path, path.replace(/\.html$/, '')])],
    concurrency: 4,
  },
} satisfies Config
