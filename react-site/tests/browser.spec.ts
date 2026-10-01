import { test, expect } from '@playwright/test'
import { basePath } from '../site.config.mjs'
const first = 'labs/sql-injection/lab-retrieve-hidden-data.html'
const second = 'labs/sql-injection/lab-login-bypass.html'
const errors: string[] = []
test.beforeEach(async ({ page }) => {
  errors.length = 0
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if(message.type() === 'error') errors.push(message.text()) })
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort())
})
test.afterEach(() => expect(errors).toEqual([]))

test('existing HTML URL loads and reloads with local images and one heading', async ({ page }) => {
  const response = await page.goto(second)
  expect(response?.status()).toBe(200)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('.article-title')).toContainText('로그인')
  await expect(page.locator('#main-content')).toHaveCount(1)
  await expect(page.locator('.topic-children a[aria-current="page"]')).toHaveCount(1)
  const images = page.locator('article img')
  expect(await images.count()).toBeGreaterThan(0)
  for (const image of await images.all()) {
    expect(new URL((await image.getAttribute('src'))!, page.url()).pathname).toMatch(new RegExp('^'+basePath))
    await image.scrollIntoViewIfNeeded()
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true)
  }
  expect((await page.reload())?.status()).toBe(200)
  await expect(page.locator('.article-title')).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('client navigation keeps header and Explorer; browser back works', async ({ page, isMobile }) => {
  let documents = 0
  page.on('request', req => { if (req.resourceType() === 'document') documents++ })
  await page.goto('./?topic=sql-injection')
  await expect(page.locator('.lab-group')).toHaveCount(1)
  await page.evaluate(() => { (window as any).__shell = [document.querySelector('.notebook-nav'),document.querySelector('.topic-browser')] })
  if (isMobile) {
    await page.locator('.topic-mobile-toggle').click()
    await page.locator('.topic-children a').filter({ hasText: '숨겨진' }).first().click()
    await expect(page.locator('.topic-mobile-toggle')).toHaveAttribute('aria-expanded','false')
  } else await page.locator(`.note-title a[href="${basePath+first}"]`).click()
  await expect(page.locator('article')).toBeVisible()
  await expect.poll(() => page.evaluate(() => (window as any).__shell[0] === document.querySelector('.notebook-nav') && (window as any).__shell[1] === document.querySelector('.topic-browser'))).toBe(true)
  expect(documents).toBe(1)
  await page.goBack()
  await expect(page.locator('.library-title')).toHaveText('포트스위거 풀이 노트')
  await expect(page.locator('.lab-group')).toHaveCount(1)
})

test('query hydration, extensionless alias and Korean hash remain valid', async ({ page }) => {
  await page.goto('./?view=concepts')
  await expect(page.locator('.library-title')).toHaveText('개념 노트')
  await expect(page.locator('.topic-browser')).toHaveAttribute('data-explorer-mode','concepts')
  await page.goto(first.replace(/\.html$/, '')+'#'+encodeURIComponent('문제-조건과-설명'))
  await expect(page.locator('article #문제-조건과-설명')).toHaveCount(1)
  await expect(page.locator('.topic-children a[aria-current="page"]')).toHaveCount(1)
  expect((await page.reload())?.status()).toBe(200)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href',new RegExp(first+'$'))
})

test('static response contains article without JavaScript; unknown path is 404', async ({ browser, baseURL, request }) => {
  const context = await browser.newContext({ javaScriptEnabled:false })
  const page = await context.newPage()
  const response = await page.goto(new URL(first,baseURL).href)
  expect(response?.status()).toBe(200)
  await expect(page.locator('article')).toContainText('문제 조건과 설명')
  await expect(page.locator('article pre code').first()).not.toBeEmpty()
  expect((await request.get(new URL('does-not-exist.html',baseURL).href)).status()).toBe(404)
  await context.close()
})
