import { reactRouter } from '@react-router/dev/vite'
import { defineConfig } from 'vite'
import { basePath } from './site.config.mjs'

export default defineConfig({
  base: basePath,
  plugins: [reactRouter()],
})
