import test from 'node:test'
import assert from 'node:assert/strict'
import { normalizeBasePath } from '../site.config.mjs'
test('one base path supports the current repo, a renamed repo and a custom domain root', () => {
  assert.equal(normalizeBasePath(), '/faultline/')
  assert.equal(normalizeBasePath('/faultline'), '/faultline/')
  assert.equal(normalizeBasePath('/preview/faultline/'), '/preview/faultline/')
  assert.equal(normalizeBasePath('/'), '/')
  for (const value of ['relative', '//other.test/', '/../bad/', '/a/./b', '/a?b', '/a#b', '/a\\b']) assert.throws(()=>normalizeBasePath(value))
})
