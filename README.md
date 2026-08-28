# VAN Official Website

VAN(Veritas Academiae Nexus)의 소개, 활동 영역, 컨퍼런스, 소식과 아카이브를 한곳에서 확인하는 공식 홈페이지 프론트엔드입니다. VAN Conference 2026과 향후 공동 포럼도 영구 URL로 축적할 수 있습니다.

## 현재 미리보기

- Vercel 한국어: https://van-website-kappa.vercel.app/ko/
- Vercel English: https://van-website-kappa.vercel.app/en/
- 2026 행사 상세 페이지: https://van-website-kappa.vercel.app/ko/conference/2026/

## 구현 범위

- HOME
- ABOUT
- DEPARTMENTS
- CONFERENCE
- APPLICATION
- PARTNERS
- ARCHIVE
- CONTACT
- VAN Conference 2026 영구 상세 페이지
- 아카이브 콘텐츠 10개, 분류 필터, 검색 및 한·영 상세 페이지
- 짙은 네이비·화이트·블루그레이 기반의 심플한 반응형 디자인
- 한국어 `/ko/` 및 영어 `/en/` 정적 URL
- 휴대폰·태블릿·데스크톱 반응형 화면
- 페이지별 title, description, canonical, hreflang, Open Graph
- Organization, WebSite, Breadcrumb, Event 구조화 데이터
- 정적 `robots.txt`, `sitemap.xml`, 404 페이지

Astro가 빌드 시 각 URL의 완성된 HTML을 생성합니다. 따라서 검색 로봇이 JavaScript를 실행하지 않아도 주요 본문을 읽을 수 있습니다. 모바일 메뉴도 JavaScript가 필요한 커스텀 드로어 대신 브라우저 기본 `details` 요소를 사용합니다.

현재 부서별 담당자, 공식 문의 주소, 행사 일정·장소 등 기획 확정 전 정보는 임의로 만들지 않고 `개발 중` 상태로 명시했습니다.

## 로컬 실행

### 준비물

- Node.js 24
- npm

```bash
git clone https://github.com/VAN-AI-Innovation/van_website.git
cd van_website
npm ci
npm run dev
```

브라우저에서 `http://localhost:4321/ko/`를 엽니다.

같은 Wi-Fi의 휴대폰에서 확인하려면 아래 명령을 실행한 뒤 터미널의 `Network` 주소 뒤에 `/ko/`를 붙여 접속합니다.

```bash
npm run dev:share
```

Windows PowerShell 실행 정책 때문에 `npm`이 차단되면 `npm.cmd`를 사용합니다.

## 검사 및 빌드

```bash
npm run check
```

- `npm run check`: 코드 검사 후 공식 도메인 기준 정적 빌드

`main` 브랜치에 병합하면 GitHub Actions가 코드 검사와 정적 빌드를 실행합니다. 현재 공개 화면은 위 Vercel 주소에서 확인하며, Vercel 빌드 설정은 `vercel.json`에 고정되어 있습니다.

## 콘텐츠 수정 위치

- 공통 한·영 문구와 일반 페이지 설명: `src/data/conference.js`
- 연도별 행사 정보, 연사, 프로그램, 파트너, FAQ: `src/data/conferenceEditions.js`
- 아카이브 콘텐츠와 상세 본문: `src/data/archive.js`
- 전체 레이아웃과 SEO: `src/layouts/BaseLayout.astro`
- 헤더·모바일 메뉴: `src/components/SiteHeader.astro`
- Conference 재사용 UI: `src/components/SpeakerCard.astro`, `ProgrammeList.astro`, `PartnerGrid.astro`, `FaqList.astro`, `ConferenceArchiveCard.astro`
- 페이지 조합: `src/pages/[lang]/[...slug].astro`
- 디자인과 반응형: `src/styles/global.css`

기획팀용 수정 안내와 확정이 필요한 항목은 [기획팀 전달 가이드](docs/PLANNING_HANDOFF.md)를 참고합니다.

## 연도별 Conference 추가

`src/data/conferenceEditions.js`의 `conferenceEditions` 배열에 새 연도 객체를 추가하면 해당 연도의 한국어·영어 영구 URL과 Conference 목록 카드가 함께 생성됩니다. 예를 들어 `year`와 `slug`를 `2027`로 지정하면 `/ko/conference/2027/`, `/en/conference/2027/` 경로를 같은 화면 구조로 사용할 수 있습니다.

새 연도 추가 시 다음 원칙을 지킵니다.

1. 기존 연도 객체를 덮어쓰지 않고 새 객체를 추가합니다.
2. 한국어와 영어의 `meta`, `hero`, `facts`, `overview`, `speakers`, `programme`, `partners`, `faq`, `archive`를 함께 작성합니다.
3. 날짜·장소·연사·파트너처럼 확정되지 않은 값은 `status: 'development'`, `value: null`로 둡니다.
4. 확정된 정보만 `status: 'confirmed'`로 변경합니다.
5. 검색용 Event 구조화 데이터는 날짜와 장소가 확정된 이후에만 `structuredEvent`에 추가합니다.

## 공식 도메인 연결

현재 대표 배포는 `van-website-kappa.vercel.app`에서 확인합니다. 공식 도메인 연결 시 Vercel Domains에 도메인을 추가하고, 빌드 환경의 `SITE_URL`을 확정된 HTTPS 도메인으로, `BASE_PATH`를 `/`로 설정합니다.

기획안에 전달된 도메인 문자열이 인코딩된 형태이므로 실제 사용할 정확한 영문 도메인과 HTTPS 적용 여부를 확인한 뒤 연결해야 합니다. 도메인 연결 전 canonical 기본값은 현재 작동하는 Vercel 주소이며, 공식 도메인 확정 후 `SITE_URL` 환경변수로 교체합니다.

아카이브 일정과 활동 글은 확정 전까지 화면에 `개발 중`으로 표시하며, 운영팀 확인 후 실제 기록으로 업데이트합니다.

## 기술 구성

- Astro 7 정적 사이트 생성
- HTML / CSS
- oxlint
- GitHub Actions / Vercel
