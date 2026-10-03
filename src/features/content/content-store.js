import { validateValues } from './editor-model.js'

export const CONTENT_DRAFT_VERSION = 1
export const CONTENT_DRAFT_STORAGE_KEY = 'van:content-draft:v1'

function emptyDraft() {
  return { version: CONTENT_DRAFT_VERSION, savedAt: null, values: { ko: {}, en: {} } }
}

function browserStorage() {
  try {
    return typeof window === 'undefined' ? null : window.localStorage
  } catch {
    return null
  }
}

// A malformed or outdated local draft never affects the public page.
export function loadContentDraft(storage = browserStorage()) {
  if (!storage) return emptyDraft()

  try {
    const raw = storage.getItem(CONTENT_DRAFT_STORAGE_KEY)
    if (!raw) return emptyDraft()
    const draft = JSON.parse(raw)
    if (draft?.version !== CONTENT_DRAFT_VERSION) return emptyDraft()
    const { values } = draft
    if (!values || typeof values !== 'object' || Array.isArray(values)) return emptyDraft()
    const result = validateValues(values)
    if (!result.valid) return emptyDraft()
    return {
      version: CONTENT_DRAFT_VERSION,
      savedAt: typeof draft.savedAt === 'string' ? draft.savedAt : null,
      values: { ko: { ...values.ko }, en: { ...values.en } },
    }
  } catch {
    return emptyDraft()
  }
}

// Stores a browser-local draft only. Publishing requires a separate authenticated API/CMS.
export function saveContentDraft(values, storage = browserStorage()) {
  const result = validateValues(values)
  if (!result.valid) {
    const error = new Error('The content draft has invalid fields.')
    error.details = result.errors
    throw error
  }
  if (!storage) throw new Error('Browser storage is unavailable.')

  const previous = loadContentDraft(storage)
  const draft = {
    version: CONTENT_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    values: {
      ko: { ...previous.values.ko, ...(values.ko || {}) },
      en: { ...previous.values.en, ...(values.en || {}) },
    },
  }
  storage.setItem(CONTENT_DRAFT_STORAGE_KEY, JSON.stringify(draft))
  return draft
}

// The editor writes its complete set of changed fields, including removals.
export function replaceContentDraft(values, storage = browserStorage()) {
  const result = validateValues(values)
  if (!result.valid) {
    const error = new Error('The content draft has invalid fields.')
    error.details = result.errors
    throw error
  }
  if (!storage) throw new Error('Browser storage is unavailable.')

  const draft = {
    version: CONTENT_DRAFT_VERSION,
    savedAt: new Date().toISOString(),
    values: { ko: { ...(values.ko || {}) }, en: { ...(values.en || {}) } },
  }
  storage.setItem(CONTENT_DRAFT_STORAGE_KEY, JSON.stringify(draft))
  return draft
}

export function clearContentDraft(storage = browserStorage()) {
  if (!storage) throw new Error('Browser storage is unavailable.')
  storage.removeItem(CONTENT_DRAFT_STORAGE_KEY)
}
