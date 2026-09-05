/**
 * 배포 없이 페이지 실물을 확인하기 위한 단일 HTML 미리보기 생성기.
 *
 *   npm run build && npm run preview:html
 *
 * 빌드 산출물(dist/)의 절대 경로 자산을 모두 파일 안에 삽입해서,
 * 더블클릭만으로(file:// 환경) 디자인·애니메이션이 그대로 보이는
 * 자기완결 HTML을 만듭니다.
 *
 * 왜 필요한가
 * - dist/ 는 `/_astro/...`, `/assets/...` 같은 루트 절대 경로를 씁니다.
 *   압축을 풀어 그냥 열면 CSS·JS·이미지가 전부 404가 되어 글씨만 나옵니다.
 * - 상대 경로 변환은 중첩 깊이마다 달라져(`/ko/apply/`는 `../../`) 견고하지 않습니다.
 *   그래서 아예 인라인·데이터URI로 박아 넣습니다.
 *
 * 미리보기 전용이며 배포물이 아닙니다.
 */

import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distDir = resolve(projectRoot, 'dist')
const outDir = resolve(projectRoot, 'preview')

const mime = {
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
}

const targets = [
  { name: '1-홈.html', from: 'ko/index.html', label: 'HOME · /ko/' },
  { name: '2-26-2지원.html', from: 'ko/apply/index.html', label: '26-2 지원 · /ko/apply/' },
  { name: '3-후원안내.html', from: 'ko/support/index.html', label: '후원 안내 · /ko/support/' },
  { name: '4-활동기록.html', from: 'ko/archive/index.html', label: '활동 기록 · /ko/archive/' },
  { name: '5-활동기록-상세.html', from: 'ko/archive/academic-networking/index.html', label: '활동 기록 상세' },
  { name: '6-EN-home.html', from: 'en/index.html', label: 'HOME (English) · /en/' },
]

const cache = new Map()

/** dist 기준 절대 경로를 data URI로 변환. 실패하면 null. */
async function toDataUri(assetPath) {
  if (cache.has(assetPath)) return cache.get(assetPath)
  let uri = null
  try {
    const buf = await readFile(resolve(distDir, assetPath.replace(/^\//, '')))
    const type = mime[extname(assetPath).toLowerCase()] || 'application/octet-stream'
    uri = `data:${type};base64,${buf.toString('base64')}`
  } catch {
    uri = null
  }
  cache.set(assetPath, uri)
  return uri
}

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

for (const target of targets) {
  let html = await readFile(resolve(distDir, target.from), 'utf8')

  // 1) 스타일시트를 <style>로 인라인
  for (const [tag, href] of [...html.matchAll(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"[^>]*>/g)]) {
    const css = await readFile(resolve(distDir, href.replace(/^\//, '')), 'utf8')
    html = html.replace(tag, `<style>${css}</style>`)
  }

  // 2) 모듈 스크립트를 인라인 (리빌·호버·티커 등 인터랙션이 살아있게)
  for (const [tag, src] of [...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+\.js)"[^>]*><\/script>/g)]) {
    const js = await readFile(resolve(distDir, src.replace(/^\//, '')), 'utf8')
    html = html.replace(tag, `<script type="module">${js}</script>`)
  }

  // 3) src/href 자산을 data URI로 치환
  const attrRefs = new Set(
    [...html.matchAll(/(?:src|href)="(\/(?:assets|archive|qr)\/[^"]+|\/favicon\.svg)"/g)].map((m) => m[1]),
  )
  for (const ref of attrRefs) {
    const uri = await toDataUri(ref)
    if (uri) html = html.replaceAll(`"${ref}"`, `"${uri}"`)
  }

  // 4) style 속성 안의 url() 도 치환 — 홈 히어로 배경(--hero-image)이 여기 해당한다.
  const urlRefs = new Set(
    [...html.matchAll(/url\('(\/(?:assets|archive)\/[^']+)'\)/g)].map((m) => m[1]),
  )
  for (const ref of urlRefs) {
    const uri = await toDataUri(ref)
    if (uri) html = html.replaceAll(`url('${ref}')`, `url('${uri}')`)
  }

  // 5) 내부 링크는 file:// 에서 열 수 없으므로 비활성화한다.
  html = html.replace(/href="\/(?:ko|en)\/[^"]*"/g, 'href="#" data-preview-disabled="true"')

  // 6) 미리보기 배너
  const banner = `
<div style="position:fixed;z-index:9999;top:0;left:0;right:0;padding:9px 16px;
  background:#c4a15b;color:#071320;font:600 13px/1.5 'Noto Sans KR',system-ui,sans-serif;
  text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.3)">
  미리보기 · ${target.label} — 배포 후 실제 주소로 접속 가능합니다. 페이지 내 링크는 비활성입니다.
</div>
<div style="height:38px"></div>`
  html = html.replace(/(<body[^>]*>)/, `$1${banner}`)

  await writeFile(resolve(outDir, target.name), html, 'utf8')

  const kb = Math.round(Buffer.byteLength(html) / 1024)
  const leftover = (html.match(/(?:src|href)="\/(?:_astro|assets|archive|qr|favicon)[^"]*"/g) || []).length
  console.log(`  ${target.name.padEnd(24)} ${String(kb).padStart(6)} KB   남은 절대경로 ${leftover}건`)
}

console.log(`\npreview/ 에 ${targets.length}개 파일을 만들었습니다.`)
