import { test, expect } from '@playwright/test'
import { basePath, siteUrl } from '../site.config.mjs'
const first = 'labs/sql-injection/lab-retrieve-hidden-data.html'

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort())
})

test('legacy folder/tag routes preserve filters and Korean hash', async ({ page }) => {
  await page.goto('labs/sql-injection/?level=Practitioner#'+encodeURIComponent('목록'))
  await expect(page.locator('.library-title')).toHaveText('풀이 노트')
  expect(new URL(page.url()).searchParams.get('topic')).toBe('sql-injection')
  expect(new URL(page.url()).searchParams.get('level')).toBe('Practitioner')
  expect(decodeURIComponent(new URL(page.url()).hash)).toBe('#목록')
  await page.goto('tags/sql-injection')
  await expect(page.locator('.library-title')).toHaveText('풀이 노트')
  expect(new URL(page.url()).searchParams.get('q')).toBe('sql-injection')
  await page.goto('notes.html?topic=sql-injection')
  await expect(page.locator('.lab-group')).toHaveCount(1)
})

test('SEO, sitemap, feed and a real unknown-page 404 work without a SPA fallback', async ({ page, request }) => {
  await page.goto(first)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', siteUrl + first)
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', siteUrl + first)
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
  expect(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent() || '{}')['@type']).toBe('BlogPosting')
  expect((await request.get('sitemap.xml')).status()).toBe(200)
  expect((await request.get('index.xml')).status()).toBe(200)
  let documents = 0
  page.on('request', req => { if (req.resourceType() === 'document') documents++ })
  expect((await page.goto('missing-note.html'))?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: '페이지를 찾을 수 없습니다.' })).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  expect(documents).toBe(1)
})

test('failed route data keeps the Explorer and can be retried after reconnection', async ({ page }) => {
  let fail = true
  await page.route('**/lab-retrieve-hidden-data.html.data*', route => fail ? route.abort() : route.continue())
  await page.goto('./')
  await page.evaluate(() => { (window as any).__explorer = document.querySelector('.topic-browser') })
  await page.locator(`.note-title a[href="${basePath+first}"]`).click()
  await expect(page.getByRole('button', { name: '다시 시도', exact: true })).toBeVisible()
  expect(await page.evaluate(() => (window as any).__explorer === document.querySelector('.topic-browser'))).toBe(true)
  fail = false
  await page.getByRole('button', { name: '다시 시도', exact: true }).click()
  await expect(page.locator('article')).toBeVisible()
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('mixed deployment data reloads the destination once without losing the destination', async ({ page }) => {
  await page.goto('./')
  const build = await page.locator('meta[name="faultline-build"]').getAttribute('content')
  await page.route('**/lab-retrieve-hidden-data.html.data*', async route => {
    const response = await route.fetch()
    await route.fulfill({ response, body: (await response.text()).replaceAll(build!, 'next-release') })
  })
  let documents = 0
  page.on('request', req => { if (req.resourceType() === 'document') documents++ })
  await page.locator(`.note-title a[href*="${first}"]`).click()
  await expect.poll(() => new URL(page.url()).searchParams.get('_flv')).toBe('next-release')
  await expect(page.locator('article')).toBeVisible()
  expect(new URL(page.url()).pathname).toBe(basePath + first)
  expect(documents).toBe(1)
})

test('saved dark theme applies while application scripts are delayed', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('theme', 'dark'))
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  await page.route('**/assets/*.js', async route => { await gate; await route.continue() })
  try {
    await page.goto(first, { waitUntil: 'commit' })
    await expect(page.locator('html')).toHaveAttribute('saved-theme', 'dark')
    await expect(page.locator('article')).toBeVisible()
    release()
    await expect(page.getByRole('button', { name: '밝은 테마로 전환' })).toBeVisible()
  } finally { release() }
})
