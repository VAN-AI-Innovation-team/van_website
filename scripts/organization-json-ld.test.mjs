import assert from 'node:assert/strict'
import http from 'node:http'
import test from 'node:test'
import { createOrganizationJsonLdLoader, serializeJsonLd } from '../src/data/organizationJsonLd.js'

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VAN',
  url: 'https://www.veritasvan.org/',
  description: 'API description',
  inLanguage: 'ko-KR',
  logo: { '@type': 'ImageObject', url: 'https://www.veritasvan.org/assets/logo_dark.png' },
}
const fallback = { ...organization, description: 'Local description' }
const englishOrganization = {
  ...organization,
  name: 'VAN (Veritas Academiae Nexus)',
  description: 'A national alliance of university academic societies in Korea.',
  inLanguage: 'en',
}
const englishFallback = { ...englishOrganization, description: 'English page fallback' }

test('one GET serves concurrent pages and preserves the complete API response', async () => {
  const calls = []
  const load = createOrganizationJsonLdLoader({
    baseUrl: 'https://api.example.com/',
    fetchImpl: async (url, options) => {
      calls.push({ url: url.href, options })
      return Response.json(organization)
    },
    warn: () => assert.fail('Successful API must not warn'),
  })
  const pages = await Promise.all([load(fallback), load(fallback, 'ko'), load(fallback)])
  for (const page of pages) assert.deepEqual(page, organization)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://api.example.com/api/json-ld/organization?language=ko')
  assert.equal(calls[0].options.method, 'GET')
  assert.equal(calls[0].options.headers.Accept, 'application/json')
  assert.ok(calls[0].options.signal instanceof AbortSignal)
})

test('concurrent Korean and English pages share requests only within their language', async () => {
  const calls = []
  const load = createOrganizationJsonLdLoader({
    fetchImpl: async (url) => {
      const language = url.searchParams.get('language')
      calls.push(language)
      return Response.json(language === 'en' ? englishOrganization : organization)
    },
    warn: () => assert.fail('Successful API must not warn'),
  })
  const pages = await Promise.all([
    load(englishFallback, 'en'),
    load(fallback, 'ko'),
    load(englishFallback, 'en'),
    load(fallback),
  ])
  assert.deepEqual(pages, [englishOrganization, organization, englishOrganization, organization])
  assert.deepEqual(calls, ['en', 'ko'])
  assert.deepEqual(await load(englishFallback, 'en'), englishOrganization)
  assert.equal(calls.length, 2)
})

test('a failed language does not replace a successful language or another page fallback', async () => {
  const calls = []
  const warnings = []
  const load = createOrganizationJsonLdLoader({
    fetchImpl: async (url) => {
      const language = url.searchParams.get('language')
      calls.push(language)
      return language === 'en' ? new Response('Unavailable', { status: 503 }) : Response.json(organization)
    },
    warn: message => warnings.push(message),
  })
  const pages = await Promise.all([load(englishFallback, 'en'), load(fallback, 'ko')])
  assert.deepEqual(pages, [englishFallback, organization])
  const otherEnglishFallback = { ...englishFallback, description: 'Another local description' }
  assert.deepEqual(await load(otherEnglishFallback, 'en'), otherEnglishFallback)
  assert.deepEqual(await load(fallback, 'ko'), organization)
  assert.deepEqual(calls, ['en', 'ko'])
  assert.equal(warnings.length, 1)
  assert.match(warnings[0], /\(en\).*using local data/)
})

test('API failures preserve each page fallback and warn once per language per build', async (t) => {
  const failures = {
    'HTTP failure': () => new Response('Unavailable', { status: 503 }),
    'invalid JSON': () => new Response('<html>Error</html>'),
    'wrong schema type': () => Response.json({ ...organization, '@type': 'Event' }),
    'missing context': () => Response.json({ name: 'VAN', '@type': 'Organization', url: organization.url }),
    'wrapped response': () => Response.json({ data: organization }),
    'invalid organization URL': () => Response.json({ ...organization, url: 'javascript:alert(1)' }),
    'network failure': () => { throw new Error('Connection refused') },
  }
  for (const [name, fail] of Object.entries(failures)) {
    await t.test(name, async () => {
      let calls = 0
      const warnings = []
      const load = createOrganizationJsonLdLoader({
        fetchImpl: async () => { calls += 1; return fail() },
        warn: message => warnings.push(message),
      })
      const otherFallback = { ...fallback, description: 'Another page fallback' }
      assert.deepEqual(await load(fallback), fallback)
      assert.deepEqual(await load(otherFallback), otherFallback)
      assert.equal(calls, 1)
      assert.equal(warnings.length, 1)
      assert.match(warnings[0], /using local data/)
    })
  }
})

test('an unresponsive API times out so static rendering can continue', async () => {
  const server = http.createServer(() => {})
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve))
  try {
    const warnings = []
    const load = createOrganizationJsonLdLoader({
      baseUrl: `http://127.0.0.1:${server.address().port}`,
      timeoutMs: 50,
      warn: message => warnings.push(message),
    })
    assert.deepEqual(await load(fallback), fallback)
    assert.equal(warnings.length, 1)
    assert.match(warnings[0], /timeout/i)
  } finally {
    server.closeAllConnections()
    await new Promise(resolve => server.close(resolve))
  }
})

test('JSON-LD remains valid JSON and cannot close its script element', () => {
  const payload = [{ ...organization, description: '</script><script>alert("test")</script> 한글 & <markup>' }]
  const serialized = serializeJsonLd(payload)
  assert.equal(serialized.includes('<'), false)
  assert.deepEqual(JSON.parse(serialized), payload)
})
