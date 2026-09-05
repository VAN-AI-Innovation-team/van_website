/**
 * 후원 페이지와 26-2 지원 페이지로 바로 이동하는 QR을 생성합니다.
 *
 *   npm run qr
 *
 * 출력물은 `public/qr/`에 쌓이므로 배포 후 다음 주소로도 바로 내려받을 수 있습니다.
 *   https://www.veritasvan.org/qr/apply-ko.png
 *
 * 설계 메모
 * - 도착 경로(`/ko/support/`, `/ko/apply/`)는 기수와 무관한 고정 주소입니다.
 *   인쇄한 QR은 회수할 수 없으므로 기수별 경로를 쓰지 않습니다.
 * - 오류 정정 수준은 Q(약 25% 복원). 인쇄물이 접히거나 번져도 읽히도록
 *   기본값 M보다 한 단계 올렸습니다.
 * - 색은 브랜드 네이비와 흰색만 씁니다. 골드(#c4a15b)는 흰 배경 대비가
 *   약 2.6:1로 스캐너가 명암을 구분하지 못합니다.
 * - 여백(quiet zone)은 규격이 요구하는 4모듈을 유지합니다.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import QRCode from 'qrcode'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDir = resolve(projectRoot, 'public/qr')
const siteUrl = (process.env.SITE_URL || 'https://www.veritasvan.org').replace(/\/+$/, '')

const targets = [
  { name: 'apply-ko', path: '/ko/apply/', label: '26-2 지원 (한국어)' },
  { name: 'apply-en', path: '/en/apply/', label: '26-2 Recruitment (English)' },
  { name: 'support-ko', path: '/ko/support/', label: '후원 안내 (한국어)' },
  { name: 'support-en', path: '/en/support/', label: 'Support VAN (English)' },
]

const baseOptions = {
  errorCorrectionLevel: 'Q',
  margin: 4,
  color: { dark: '#122542ff', light: '#ffffffff' },
}

await mkdir(outputDir, { recursive: true })

const rows = []

for (const target of targets) {
  const url = `${siteUrl}${target.path}`

  const svg = await QRCode.toString(url, { ...baseOptions, type: 'svg' })
  await writeFile(resolve(outputDir, `${target.name}.svg`), svg, 'utf8')

  // 1024px: 인스타그램 스토리와 A4 인쇄(약 8cm) 모두 커버하는 크기.
  await QRCode.toFile(resolve(outputDir, `${target.name}.png`), url, { ...baseOptions, width: 1024 })

  rows.push({ 파일: `${target.name}.svg / .png`, 용도: target.label, 주소: url })
}

console.log(`\nQR ${targets.length}종을 public/qr/ 에 생성했습니다.\n`)
console.table(rows)
