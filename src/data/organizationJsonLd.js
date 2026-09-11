export const DEFAULT_JSON_LD_API_BASE_URL = 'https://3-2-search-ai-optimization-production.up.railway.app'

function isOrganization(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  if (!['https://schema.org', 'https://schema.org/'].includes(value['@context'])) return false
  if (value['@type'] !== 'Organization' || typeof value.name !== 'string' || !value.name.trim()) return false

  try {
    return ['https:', 'http:'].includes(new URL(value.url).protocol)
  } catch {
    return false
  }
}

/** Share one request per language across prerendered pages, including failures. */
export function createOrganizationJsonLdLoader({
  baseUrl = DEFAULT_JSON_LD_API_BASE_URL,
  fetchImpl = globalThis.fetch,
  timeoutMs = 8000,
  warn = console.warn,
} = {}) {
  const requests = new Map()

  async function fetchOrganization(language) {
    try {
      const endpoint = new URL('/api/json-ld/organization', baseUrl)
      endpoint.searchParams.set('language', language)
      const response = await fetchImpl(endpoint, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(timeoutMs),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)

      const organization = await response.json()
      if (!isOrganization(organization)) throw new Error('Invalid Organization JSON-LD response')
      return organization
    } catch (error) {
      warn(`[json-ld] Organization API (${language}) unavailable; using local data. ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    }
  }

  return async function getOrganization(fallback, requestedLanguage = 'ko') {
    const language = requestedLanguage === 'en' ? 'en' : 'ko'
    if (!requests.has(language)) requests.set(language, fetchOrganization(language))
    return (await requests.get(language)) ?? fallback
  }
}

// Imported only from Astro frontmatter: this request runs during the build, not in visitors' browsers.
export const getOrganizationJsonLd = createOrganizationJsonLdLoader({
  baseUrl: import.meta.env?.JSON_LD_API_BASE_URL || process.env.JSON_LD_API_BASE_URL || DEFAULT_JSON_LD_API_BASE_URL,
})

/** Keep API strings from closing the application/ld+json script element. */
export function serializeJsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}
