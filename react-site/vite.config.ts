import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { basePath } from './site.config.mjs'
import { buildId } from './build-version.server.mjs'

export default defineConfig({
  base: basePath,
  plugins: [reactRouter()],
  define: { __FAULTLINE_BUILD_ID__: JSON.stringify(buildId) },
})
