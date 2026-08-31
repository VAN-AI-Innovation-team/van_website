# VAN 공식 홈페이지

VAN(Veritas Academiae Nexus)의 단체 소개, 조직, 활동, 향후 계획, 대표 연례 사업, 철학, 후원 및 연락처를 한곳에서 확인하는 공식 홈페이지입니다.

## 구현 범위

- 한국어 `/ko/` 및 영어 `/en/` 정적 페이지
- HOME: 공식 Hero, 단체 연혁, 추천사, 대표단, 자문위원회, 대표 활동 3개, 향후 활동 계획, VAN Conference 2026 요약, 단체 철학, 후원, 연락처
- Archive: HOME에 우선 노출하지 않은 활동 기록과 상세 페이지
- 공통 Header/Footer, 모바일 메뉴, 반응형 레이아웃
- 페이지별 title, description, canonical, hreflang, Open Graph
- Organization, WebSite, Breadcrumb 구조화 데이터
- 정적 `robots.txt`, `sitemap.xml`, 404 페이지

별도의 콘퍼런스 전용 홈페이지·상세 라우트, 신청 페이지, 파트너 페이지, 인물 상세 페이지는 만들지 않습니다. 콘퍼런스는 HOME의 대표 연례 사업 섹션으로만 제공합니다.

## 로컬 실행

```bash
npm ci
npm run dev
```

브라우저에서 `http://localhost:4321/ko/`를 엽니다.

## 검사 및 빌드

```bash
npm run check
```

`npm run check`는 코드 검사 후 정적 사이트를 `dist/`에 생성합니다.

## 콘텐츠 위치

- 단체·조직·HOME 콘텐츠: `src/data/site.js`
- Archive 활동 기록: `src/data/activityArchive.js`
- HOME·Archive 화면: `src/pages/[lang]/[...slug].astro`
- Archive 상세: `src/pages/[lang]/archive/[slug].astro`
- 공통 레이아웃·SEO: `src/layouts/BaseLayout.astro`
- Header/Footer: `src/components/`
- 반응형 스타일: `src/styles/global.css`
- 이미지 자산: `public/assets/`

콘텐츠와 이미지의 기준은 전달받은 `VAN 단체 소개.html` 및 동봉 `assets/`이며, 확인되지 않은 사실·경력·신청 링크·파트너 정보를 임의로 추가하지 않습니다.
