import { supportPage, applyPage } from '../../data/pages.js'
import { content } from '../../data/site.js'

export const CONTENT_LANGUAGES = ['ko', 'en']

// The key is also the public page's data-content-key. Keep existing keys stable.
export const EDITABLE_SECTIONS = [
  {
    id: 'hero', label: '첫 화면', fields: [
      { key: 'site.home.hero.kicker', label: '상단 문구', maxLength: 200 },
      { key: 'site.home.hero.title', label: '제목', maxLength: 200 },
      { key: 'site.home.hero.label', label: '소개 라벨', maxLength: 200 },
      { key: 'site.home.hero.lead', label: '소개 문구', multiline: true, maxLength: 4000 },
    ],
  },
  {
    id: 'about', label: '단체 소개', fields: [
      { key: 'site.home.about.title', label: '섹션 제목', maxLength: 200 },
    ],
  },
  {
    id: 'activities', label: '활동', fields: [
      { key: 'site.home.activities.title', label: '섹션 제목', maxLength: 200 },
      { key: 'site.home.activities.intro', label: '소개 문구', multiline: true, maxLength: 4000 },
    ],
  },
  {
    id: 'future', label: '향후 계획', fields: [
      { key: 'site.home.future.title', label: '섹션 제목', maxLength: 200 },
    ],
  },
  {
    id: 'philosophy', label: '단체 철학', fields: [
      { key: 'site.home.philosophy.title', label: '섹션 제목', maxLength: 200 },
    ],
  },
  {
    id: 'home-support', label: '홈 후원 안내', fields: [
      { key: 'site.home.support.title', label: '섹션 제목', maxLength: 200 },
    ],
  },
  {
    id: 'contact', label: '연락처', fields: [
      { key: 'site.home.contact.title', label: '섹션 제목', maxLength: 200 },
    ],
  },
  {
    id: 'support-page', label: '후원 페이지', fields: [
      { key: 'pages.support.title', label: '페이지 제목', maxLength: 200 },
      { key: 'pages.support.lead', label: '상단 소개', multiline: true, maxLength: 4000 },
      { key: 'pages.support.waysTitle', label: '후원 방식 제목', maxLength: 200 },
      { key: 'pages.support.waysLead', label: '후원 방식 안내', multiline: true, maxLength: 4000 },
    ],
  },
  {
    id: 'apply-page', label: '모집 페이지', fields: [
      { key: 'pages.apply.title', label: '페이지 제목', maxLength: 200 },
      { key: 'pages.apply.lead', label: '상단 소개', multiline: true, maxLength: 4000 },
      { key: 'pages.apply.overviewTitle', label: '모집 개요 제목', maxLength: 200 },
      { key: 'pages.apply.deptTitle', label: '모집 부서 제목', maxLength: 200 },
      { key: 'pages.apply.deptLead', label: '모집 부서 안내', multiline: true, maxLength: 4000 },
    ],
  },
]

export const EDITABLE_FIELDS = EDITABLE_SECTIONS.flatMap((section) => section.fields)
const fieldByKey = new Map(EDITABLE_FIELDS.map((field) => [field.key, field]))

function sourceForKey(key, language) {
  const parts = key.split('.')
  if (parts[0] === 'site') return [content[language], parts.slice(1)]
  if (parts[0] === 'pages' && parts[1] === 'support') return [supportPage[language], parts.slice(2)]
  if (parts[0] === 'pages' && parts[1] === 'apply') return [applyPage[language], parts.slice(2)]
  return [undefined, []]
}

export function getDefaultValues(language) {
  if (!CONTENT_LANGUAGES.includes(language)) throw new Error(`Unsupported language: ${language}`)

  return Object.fromEntries(EDITABLE_FIELDS.map(({ key }) => {
    const [source, path] = sourceForKey(key, language)
    const value = path.reduce((current, segment) => current?.[segment], source)
    if (typeof value !== 'string') throw new Error(`Editable field has no text default: ${language}.${key}`)
    return [key, value]
  }))
}

export function getResolvedValues(language, overrides = {}) {
  const values = getDefaultValues(language)
  if (!overrides || typeof overrides !== 'object' || Array.isArray(overrides)) return values

  for (const [key, value] of Object.entries(overrides)) {
    if (fieldByKey.has(key) && typeof value === 'string') values[key] = value
  }
  return values
}

// Partial changes for each language are valid. Only supported non-empty text can be saved.
export function validateValues(values) {
  const errors = []
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    return { valid: false, errors: [{ message: 'Language values must be an object.' }] }
  }

  for (const [language, fields] of Object.entries(values)) {
    if (!CONTENT_LANGUAGES.includes(language)) {
      errors.push({ language, message: 'Unsupported language.' })
      continue
    }
    if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
      errors.push({ language, message: 'Fields must be an object.' })
      continue
    }
    for (const [key, value] of Object.entries(fields)) {
      const field = fieldByKey.get(key)
      if (!field) errors.push({ language, key, message: 'Unsupported field.' })
      else if (typeof value !== 'string' || !value.trim()) errors.push({ language, key, message: 'Enter text.' })
      else if (value.length > field.maxLength) errors.push({ language, key, message: `Use ${field.maxLength} characters or fewer.` })
    }
  }

  return { valid: errors.length === 0, errors }
}
