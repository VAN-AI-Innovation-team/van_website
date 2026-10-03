import { loadContentDraft } from './content-store.js'

// This runs only for ?content-preview=1. Public pages never read browser drafts.
export function applyContentPreview() {
  if (new URLSearchParams(window.location.search).get('content-preview') !== '1') return

  const language = document.documentElement.lang
  const values = loadContentDraft().values[language] || {}
  document.querySelectorAll('[data-content-key]').forEach((node) => {
    const value = values[node.getAttribute('data-content-key')]
    if (typeof value === 'string') {
      node.textContent = value
      delete node.dataset.splitDone
      node.removeAttribute('aria-label')
    }
  })

  // Keep the preview flag when moving between pages inside the admin iframe.
  document.querySelectorAll('a[href]').forEach((link) => {
    const original = link.getAttribute('href')
    if (!original || original.startsWith('#')) return
    const url = new URL(original, window.location.href)
    if (url.origin !== window.location.origin) return
    url.searchParams.set('content-preview', '1')
    link.href = url.href
  })
}
