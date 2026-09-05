/**
 * 배포 없이 페이지 실물을 확인하기 위한 단일 HTML 미리보기 생성기.
 *
 *   npm run build && node scripts/build-standalone-preview.mjs
 *
 * 빌드 산출물(dist/)의 절대 경로 자산을 모두 파일 안에 삽입해서,
 * 더블클릭만으로(file:// 환경) 디자인과 애니메이션이 그대로 보이는
 * 자기완결 HTML을 만듭니다.
 *
 * 왜 필요한가
 * - dist/ 는 `/_astro/...`, `/assets/...` 같은 루트 절대 경로를 씁니다.
 *   압축을 풀어 그냥 열면 CSS·JS·이미지가 전부 404가 되어 글씨만 나옵니다.
 * - 상대 경로로 바꾸는 방법은 중첩 깊이마다 달라져(`/ko/apply/` 는 `../../`)
 *   견고하지 않습니다. 그래서 아예 인라인·데이터URI로 박아 넣습니다.
 *
 * 미리보기 전용이며 배포물이 아닙니다. 산출물은 git에 올리지 않습니다.
 */

import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
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
  { name: '26-2-지원-미리보기.html', from: 'ko/apply/index.html' },
  { name: '후원-안내-미리보기.html', from: 'ko/support/index.html' },
]

/** dist 기준 절대 경로를 data URI로 변환. 실패하면 null. */
async function toDataUri(assetPath) {
  try {
    const buf = await readFile(resolve(distDir, assetPath.replace(/^\//, '')))
    const type = mime[extname(assetPath).toLowerCase()] || 'application/octet-stream'
    return `data:${type};base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

for (const target of targets) {
  let html = await readFile(resolve(distDir, target.from), 'utf8')

  // 1) 스타일시트를 <style>로 인라인
  const cssHref = html.match(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"/)?.[1]
  if (cssHref) {
    const css = await readFile(resolve(distDir, cssHref.replace(/^\//, '')), 'utf8')
    // CSS 안의 폰트·이미지 참조는 절대 URL(구글 폰트)만 남으므로 그대로 둔다.
    html = html.replace(
      new RegExp(`<link rel="stylesheet" href="${cssHref}"[^>]*>`),
      `<style>${css}</style>`,
    )
  }

  // 2) 모듈 스크립트를 인라인 (스크롤 리빌·호버 인터랙션이 동작하게)
  const jsSrcs = [...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+\.js)"[^>]*><\/script>/g)]
  for (const [tag, src] of jsSrcs) {
    const js = await readFile(resolve(distDir, src.replace(/^\//, '')), 'utf8')
    html = html.replace(tag, `<script type="module">${js}</script>`)
  }

  // 3) 이미지·파비콘을 data URI로 치환
  const assetRefs = new Set(
    [...html.matchAll(/(?:src|href)="(\/(?:assets|archive|qr)\/[^"]+|\/favicon\.svg|\/social-card\.svg)"/g)]
      .map((m) => m[1]),
  )
  for (const ref of assetRefs) {
    const uri = await toDataUri(ref)
    if (uri) html = html.replaceAll(`"${ref}"`, `"${uri}"`)
  }

  // 4) 내부 링크는 file:// 에서 열 수 없으므로 비활성화하고 안내를 남긴다.
  html = html.replace(/href="\/(ko|en)\/[^"]*"/g, 'href="#" data-preview-disabled="true"')

  // 5) 미리보기 배너 삽입
  const banner = `
<div style="position:fixed;z-index:9999;top:0;left:0;right:0;padding:10px 16px;
  background:#c4a15b;color:#071320;font:600 13px/1.5 'Noto Sans KR',system-ui,sans-serif;
  text-align:center;box-shadow:0 2px 12px rgba(0,0,0,.3)">
  미리보기 — 실제 주소는 <strong>${target.from.replace('index.html', '')}</strong> 이며 배포 후 접속 가능합니다. 페이지 내 링크는 동작하지 않습니다.
</div>
<div style="height:40px"></div>`
  html = html.replace(/(<body[^>]*>)/, `$1${banner}`)

  await writeFile(resolve(outDir, target.name), html, 'utf8')
  const kb = Math.round(Buffer.byteLength(html) / 1024)
  console.log(`  ${target.name.padEnd(30)} ${String(kb).padStart(6)} KB`)
}

console.log(`\npreview/ 에 ${targets.length}개 파일을 만들었습니다.`)
const left = await readdir(outDir)
console.log('산출물:', left.join(', '))
