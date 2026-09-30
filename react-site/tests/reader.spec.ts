import { test, expect } from '@playwright/test'
import { readFileSync } from 'node:fs'
import { basePath } from '../site.config.mjs'
const first = 'labs/sql-injection/lab-retrieve-hidden-data.html'
const second = 'labs/sql-injection/lab-login-bypass.html'
const notes = JSON.parse(readFileSync(new URL('../.generated/notes.json', import.meta.url), 'utf8'))
const walk = (node: any): any[] => [node, ...(node.children || []).flatMap(walk)]
const firstBlocks = walk(notes['/' + first].body).filter(node => node.data?.readerCode)
const formattedIndex = firstBlocks.findIndex(node => node.data.readerCode.formatted !== null)

test.beforeEach(async ({ page }) => {
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort())
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (text: string) => {
      if ((window as any).__denyCopy) throw new Error('Clipboard denied')
      ;(window as any).__copied = text
    } } })
  })
})

test('reader code switches and copies exact variants, handles failure, and follows the theme', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(first)
  expect(formattedIndex).toBeGreaterThanOrEqual(0)
  const pre = page.locator('article pre').nth(formattedIndex)
  const record = firstBlocks[formattedIndex].data.readerCode
  await expect(pre.getByRole('button', { name: '정렬해서 보기', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await pre.getByRole('button', { name: '정렬본 복사', exact: true }).click()
  await expect.poll(() => page.evaluate(() => (window as any).__copied)).toBe(record.formatted)
  await pre.getByRole('button', { name: '원문 보기', exact: true }).click()
  await expect(pre.locator('code:not([hidden])')).toHaveAttribute('data-reader-view', 'source')
  await pre.getByRole('button', { name: '원문 복사', exact: true }).click()
  await expect.poll(() => page.evaluate(() => (window as any).__copied)).toBe(record.source)
  await page.evaluate(() => { (window as any).__denyCopy = true })
  await pre.getByRole('button', { name: '원문 복사', exact: true }).click()
  await expect(pre.locator('.clipboard-feedback')).toHaveText('복사 실패')
  const color = await pre.locator('code:not([hidden]) span[style]').first().evaluate(el => getComputedStyle(el).color)
  await page.locator('.theme-toggle').click()
  await expect.poll(() => pre.locator('code:not([hidden]) span[style]').first().evaluate(el => getComputedStyle(el).color)).not.toBe(color)
  const colors = await pre.locator('code:not([hidden]) span[style]').evaluateAll(elements => [...new Set(elements.map(el => getComputedStyle(el).color))])
  expect(colors.length).toBeGreaterThanOrEqual(3)
  expect(errors).toEqual([])
})

test('code wrapping and image zoom work at narrow widths without document overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto(first)
  const wrap = page.getByRole('button', { name: '긴 코드 줄바꿈' }).first()
  await expect(wrap).toBeVisible()
  await wrap.click()
  await expect(wrap).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await page.goto(second)
  const trigger = page.locator('.reader-image-trigger').first()
  const image = trigger.locator('img')
  expect(Number(await image.getAttribute('width'))).toBeGreaterThan(0)
  expect(Number(await image.getAttribute('height'))).toBeGreaterThan(0)
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: '이미지 크게 보기', exact: true })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByRole('button', { name: '닫기' })).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('')
  await trigger.click()
  await dialog.getByRole('button', { name: '닫기' }).click()
  await expect(trigger).toBeFocused()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('TOC anchors, previous/next and back preserve the shell and list return state', async ({ page }) => {
  let documents = 0
  page.on('request', request => { if (request.resourceType() === 'document') documents++ })
  await page.goto('./?topic=sql-injection&limit=48')
  await page.locator(`.note-title a[href="${basePath + first}"]`).click()
  await page.evaluate(() => { (window as any).__shell = document.querySelector('.topic-browser') })
  await page.locator('.reader-toc summary').click()
  await page.getByRole('navigation', { name: '본문 목차' }).getByRole('link', { name: '배운 점', exact: true }).click()
  await expect.poll(() => page.evaluate(() => decodeURIComponent(location.hash))).toBe('#배운-점')
  await expect(page.locator('article #배운-점')).toBeInViewport()
  await expect(page.locator('.lab-pagination a[rel="prev"]')).toHaveCount(0)
  await page.locator('.lab-pagination a[rel="next"]').click()
  await expect(page).toHaveURL(new RegExp(second + '$'))
  await expect(page.locator('.notebook-return')).toHaveAttribute('href', basePath + '?topic=sql-injection&limit=48')
  await page.locator('.lab-pagination a[rel="prev"]').click()
  await expect(page).toHaveURL(new RegExp(first + '$'))
  await expect(page.locator('.code-toolbar')).toHaveCount(firstBlocks.length)
  await page.goBack()
  await expect(page).toHaveURL(new RegExp(second + '$'))
  await page.locator('.reader-image-trigger').first().click()
  await page.goBack()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect.poll(() => page.evaluate(() => document.documentElement.style.overflow)).toBe('')
  expect(await page.evaluate(() => (window as any).__shell === document.querySelector('.topic-browser'))).toBe(true)
  expect(documents).toBe(1)
})

test('first five notes have stable source views, local images, colored code and no hydration errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  const paths = Object.values(notes).filter((note: any) => note.noteKind === 'solution').sort((a: any, b: any) => a.number.localeCompare(b.number)) as any[]
  expect(paths.length).toBe(5)
  for (const note of paths) {
    await page.goto(note.routePath.slice(1))
    await expect(page.locator('.article-title')).toHaveText(note.title)
    await expect(page.locator('.reader-toc')).toBeVisible()
    const codes = walk(note.body).filter(node => node.data?.readerCode)
    await expect(page.locator('article .code-actions[data-ready="true"]')).toHaveCount(codes.length)
    if (note.html.includes('--shiki-light:')) expect(await page.locator('article span[style*="--shiki-light"]').count()).toBeGreaterThan(0)
    await expect(page.locator('article pre code:not([hidden])')).toHaveCount(codes.length)
    await expect(page.locator('.reader-sources a').last()).toHaveAttribute('href', /github.com\/ddomology\/faultline\/blob\/main\/content\//)
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  expect(errors).toEqual([])
})

test('delayed reader hydration keeps narrow code toolbar geometry stable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  let release!: () => void
  const gate = new Promise<void>(resolve => { release = resolve })
  await page.route('**/assets/*.js', async route => { await gate; await route.continue() })
  try {
    await page.goto(first, { waitUntil: 'commit' })
    await expect(page.locator('.code-toolbar').first()).toBeVisible()
    await page.evaluate(() => document.fonts.ready)
    const before = await page.locator('.code-toolbar').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height))
    release()
    await expect(page.locator('article .code-actions[data-ready="true"]')).toHaveCount(firstBlocks.length)
    const after = await page.locator('.code-toolbar').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().height))
    expect(after).toEqual(before)
  } finally { release() }
})
