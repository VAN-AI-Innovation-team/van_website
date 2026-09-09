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
  const pages = await Promise.all([load(fallback), load(fallback), load(fallback)])
  for (const page of pages) assert.deepEqual(page, organization)
  assert.equal(calls.length, 1)
  assert.equal(calls[0].url, 'https://api.example.com/api/json-ld/organization')
  assert.equal(calls[0].options.method, 'GET')
  assert.equal(calls[0].options.headers.Accept, 'application/json')
  assert.ok(calls[0].options.signal instanceof AbortSignal)
})

test('API failures preserve each page fallback and warn once per build', async (t) => {
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
      const englishFallback = { ...fallback, description: 'English page fallback' }
      assert.deepEqual(await load(fallback), fallback)
      assert.deepEqual(await load(englishFallback), englishFallback)
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
