import { defineConfig, devices } from '@playwright/test'
import { basePath } from './site.config.mjs'
const port = Number(process.env.PORT || 4173)
const externalChromium = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
const chromiumLaunch = externalChromium ? {
      executablePath: externalChromium,
      args: process.env.PLAYWRIGHT_CHROMIUM_ARGS ? JSON.parse(process.env.PLAYWRIGHT_CHROMIUM_ARGS) : [],
    } : undefined
export default defineConfig({
  testDir: './tests', testMatch: '**/*.spec.ts', fullyParallel: false, workers: 1,
  reporter: 'list', timeout: 30_000,
  use: {
    baseURL: `http://127.0.0.1:${port}${basePath}`,
    trace: 'retain-on-failure',

  },
  projects: [
    { name: 'desktop', use: { launchOptions: chromiumLaunch, viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { launchOptions: chromiumLaunch, ...devices['Pixel 7'] } },
    { name: 'safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: { command: 'npm run preview', url: `http://127.0.0.1:${port}${basePath}`, reuseExistingServer: !process.env.CI },
})
