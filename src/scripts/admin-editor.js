import { EDITABLE_SECTIONS, getDefaultValues, getResolvedValues, validateValues } from '../features/content/editor-model.js'
import { clearContentDraft, loadContentDraft, replaceContentDraft } from '../features/content/content-store.js'

const root = document.querySelector('[data-admin-root]')

if (root instanceof HTMLElement) {
  const languageSelect = root.querySelector('[data-language]')
  const pageSelect = root.querySelector('[data-preview-page]')
  const groups = root.querySelector('[data-field-groups]')
  const preview = root.querySelector('[data-preview]')
  const status = root.querySelector('[data-status]')
  const fieldCount = root.querySelector('[data-field-count]')
  const saveButton = root.querySelector('[data-save]')
  const resetButton = root.querySelector('[data-reset]')
  const exportButton = root.querySelector('[data-export]')
  const refreshButton = root.querySelector('[data-preview-refresh]')
  const initial = loadContentDraft()
  const working = { ko: { ...initial.values.ko }, en: { ...initial.values.en } }
  let dirty = false

  function setStatus(message, tone = 'normal') {
    status.textContent = message
    status.dataset.tone = tone
  }

  function changedCount() {
    return ['ko', 'en'].reduce((count, language) => {
      const defaults = getDefaultValues(language)
      return count + Object.entries(working[language]).filter(([key, value]) => value !== defaults[key]).length
    }, 0)
  }

  function previewUrl() {
    const language = languageSelect.value
    const slug = pageSelect.value === 'home' ? '' : `${pageSelect.value}/`
    const url = new URL(`${root.dataset.siteBase}${language}/${slug}`, window.location.origin)
    url.searchParams.set('content-preview', '1')
    url.searchParams.set('draft', String(Date.now()))
    return url.href
  }

  function refreshPreview() {
    preview.src = previewUrl()
  }

  function fieldError(field, value) {
    if (!value.trim()) return '문구를 입력해 주세요.'
    if (value.length > field.maxLength) return `${field.maxLength}자 이내로 입력해 주세요.`
    return ''
  }

  function renderFields() {
    const language = languageSelect.value
    const defaults = getDefaultValues(language)
    const values = getResolvedValues(language, working[language])
    const fragment = document.createDocumentFragment()

    EDITABLE_SECTIONS.forEach((section, sectionIndex) => {
      const details = document.createElement('details')
      details.className = 'admin-section'
      details.open = sectionIndex === 0
      const summary = document.createElement('summary')
      summary.textContent = section.label
      details.append(summary)
      const fields = document.createElement('div')
      fields.className = 'admin-section__fields'

      section.fields.forEach((field) => {
        const wrapper = document.createElement('div')
        wrapper.className = 'admin-field'
        const head = document.createElement('div')
        head.className = 'admin-field__head'
        const label = document.createElement('label')
        const id = `field-${language}-${field.key.replaceAll('.', '-')}`
        label.htmlFor = id
        label.textContent = field.label
        const counter = document.createElement('small')
        const control = document.createElement(field.multiline ? 'textarea' : 'input')
        control.id = id
        control.name = field.key
        control.maxLength = field.maxLength
        control.value = values[field.key]
        if (field.multiline) control.rows = 3
        else control.type = 'text'
        const error = document.createElement('p')
        error.className = 'admin-field__error'
        error.id = `${id}-error`
        control.setAttribute('aria-describedby', error.id)

        function updateState() {
          const value = control.value
          const message = fieldError(field, value)
          error.textContent = message
          control.setAttribute('aria-invalid', String(Boolean(message)))
          counter.textContent = `${value.length}/${field.maxLength}`
          counter.classList.toggle('admin-field__changed', value !== defaults[field.key])
        }

        control.addEventListener('input', () => {
          if (control.value === defaults[field.key]) delete working[language][field.key]
          else working[language][field.key] = control.value
          dirty = true
          updateState()
          setStatus(`저장되지 않은 변경이 있습니다 · 변경 문구 ${changedCount()}개`, 'dirty')
        })

        updateState()
        head.append(label, counter)
        wrapper.append(head, control, error)
        fields.append(wrapper)
      })

      details.append(fields)
      fragment.append(details)
    })

    groups.replaceChildren(fragment)
    fieldCount.textContent = `문구 ${Object.keys(defaults).length}개`
  }

  function save() {
    const snapshot = {
      ko: { ...working.ko },
      en: { ...working.en },
    }
    const result = validateValues(snapshot)
    if (!result.valid) {
      setStatus('빈 문구가 있습니다. 입력값을 확인해 주세요.', 'error')
      const firstInvalid = groups.querySelector('[aria-invalid="true"]')
      firstInvalid?.focus()
      return
    }

    try {
      const draft = replaceContentDraft(snapshot)
      dirty = false
      setStatus(`브라우저 초안을 저장했습니다 · ${new Date(draft.savedAt).toLocaleString('ko-KR')} · 변경 문구 ${changedCount()}개`)
      refreshPreview()
    } catch {
      setStatus('초안을 저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.', 'error')
    }
  }

  function reset() {
    if (!window.confirm('이 브라우저에 저장된 한국어·영어 초안을 모두 지울까요?')) return
    try {
      clearContentDraft()
      working.ko = {}
      working.en = {}
      dirty = false
      renderFields()
      refreshPreview()
      setStatus('브라우저 초안을 초기화했습니다. 기본 문구가 표시됩니다.')
    } catch {
      setStatus('초안을 초기화하지 못했습니다.', 'error')
    }
  }

  function exportJson() {
    const snapshot = {
      version: 1,
      exportedAt: new Date().toISOString(),
      values: { ko: { ...working.ko }, en: { ...working.en } },
    }
    const validation = validateValues(snapshot.values)
    if (!validation.valid) {
      setStatus('빈 문구가 있습니다. 내보내기 전에 입력값을 확인해 주세요.', 'error')
      return
    }
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'van-content-draft.json'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    setStatus('현재 편집 내용을 JSON 파일로 내보냈습니다. 실제 게시에는 별도 연결이 필요합니다.')
  }

  languageSelect.addEventListener('change', () => {
    renderFields()
    refreshPreview()
    if (dirty) setStatus('저장되지 않은 변경이 있습니다. 미리보기에는 마지막 저장본이 보입니다.', 'dirty')
  })
  pageSelect.addEventListener('change', refreshPreview)
  refreshButton.addEventListener('click', refreshPreview)
  saveButton.addEventListener('click', save)
  resetButton.addEventListener('click', reset)
  exportButton.addEventListener('click', exportJson)

  renderFields()
  refreshPreview()
  if (initial.savedAt) setStatus(`마지막 저장 ${new Date(initial.savedAt).toLocaleString('ko-KR')} · 변경 문구 ${changedCount()}개`)
  else setStatus('저장된 초안이 없습니다. 문구를 수정한 뒤 초안을 저장해 주세요.')
}
