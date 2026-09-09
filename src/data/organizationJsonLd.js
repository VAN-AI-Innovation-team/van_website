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

/** Share one request across prerendered pages, including when the API is unavailable. */
export function createOrganizationJsonLdLoader({
  baseUrl = DEFAULT_JSON_LD_API_BASE_URL,
  fetchImpl = globalThis.fetch,
  timeoutMs = 8000,
  warn = console.warn,
} = {}) {
  let request

  async function fetchOrganization() {
    try {
      const endpoint = new URL('/api/json-ld/organization', baseUrl)
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
      warn(`[json-ld] Organization API unavailable; using local data. ${error instanceof Error ? error.message : 'Unknown error'}`)
      return null
    }
  }

  return async function getOrganization(fallback) {
    request ??= fetchOrganization()
    return (await request) ?? fallback
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
