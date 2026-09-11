# VAN 공식 홈페이지

VAN(Veritas Academiae Nexus)의 단체 소개, 조직, 활동, 향후 계획, 대표 연례 사업, 철학, 후원 및 연락처를 한곳에서 확인하는 공식 홈페이지입니다.

## 구현 범위

- 한국어 `/ko/` 및 영어 `/en/` 정적 페이지
- HOME: 공식 Hero, 단체 연혁, 추천사, 대표단, 자문위원회, 대표 활동 3개, 향후 활동 계획, VAN Conference 2026 요약, 단체 철학, 후원, 연락처
- 후원 안내 `/{lang}/support/`: 후원금 사용처, 후원 계좌, 문의 채널
- 26-2 리크루팅 `/{lang}/apply/`: 모집 개요, 활동 소개, 조직 구조, 지원 안내
- 두 페이지로 바로 이동하는 QR 코드 (`public/qr/`, 문서는 `docs/QR_CODES.md`)
- Archive: HOME에 우선 노출하지 않은 활동 기록과 상세 페이지
- 공통 Header/Footer, 모바일 메뉴, 반응형 레이아웃
- 페이지별 title, description, canonical, hreflang, Open Graph
- Organization, WebSite, Breadcrumb 구조화 데이터
- 정적 `robots.txt`, `sitemap.xml`, 404 페이지

별도의 콘퍼런스 전용 홈페이지·상세 라우트, 파트너 페이지, 인물 상세 페이지는 만들지 않습니다. 콘퍼런스는 HOME의 대표 연례 사업 섹션으로만 제공합니다.

후원과 26-2 리크루팅은 QR로 직접 배포해야 해서 전용 라우트를 두었습니다. 서브 도메인 대신 사이트 내 고정 경로를 쓰며, 경로에 기수를 넣지 않아 이미 인쇄한 QR이 다음 기수에도 유효합니다.

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

`npm run check`는 코드 검사와 JSON-LD 연동 테스트 후 정적 사이트를 `dist/`에 생성합니다.

3-2 팀의 Organization JSON-LD API는 빌드 시점에 `language=ko/en`으로 연동합니다. `/ko/` 페이지는 한국어 응답을, `/en/` 페이지는 영문 응답을 사용하며 언어마다 한 번만 조회합니다. 적용 범위, 호출 방식, Event API 추가 확인사항과 담당자 답장 초안은 [JSON-LD 연동 정리](docs/JSON_LD_INTEGRATION.md)에 있습니다.

## 배포

프로덕션은 Vercel(`https://www.veritasvan.org`)입니다.

Vercel의 GitHub 연동이 이 저장소를 구독하지 않아, `main`에 푸시해도 배포가 자동으로 일어나지 않습니다. 조직에 Vercel GitHub App은 설치되어 있으나 접근 저장소 목록에 이 저장소가 없고, 지금까지는 수동 배포로 운영돼 왔습니다. 저장소 커밋에 Vercel 체크가 한 건도 없는 것으로 확인됩니다.

해결 방법은 두 가지입니다.

**A. Vercel 연동을 복구한다 (근본 해결)**

Vercel → 프로젝트 → Settings → Git → Connect Git Repository에서 `VAN-AI-Innovation/van_website`를 연결하고 Production Branch를 `main`으로 지정합니다. 이 과정에서 GitHub App의 저장소 접근 권한도 함께 부여됩니다.

**B. GitHub Actions가 Vercel로 밀어넣는다 (`.github/workflows/deploy.yml`)**

A를 고치지 않아도 동작합니다. 아래 시크릿 중 하나만 등록하면 `main` 푸시마다 자동 배포됩니다. 둘 다 없으면 워크플로는 아무것도 하지 않고 성공으로 끝나므로 CI를 깨지 않습니다.

| 시크릿 | 개수 | 발급 위치 |
| --- | --- | --- |
| `VERCEL_DEPLOY_HOOK_URL` | 1개 (권장) | Vercel → 프로젝트 → Settings → Git → Deploy Hooks (브랜치 `main`) |
| `VERCEL_TOKEN` + `VERCEL_ORG_ID` + `VERCEL_PROJECT_ID` | 3개 | 토큰은 Account Settings → Tokens, ID는 프로젝트 Settings → General 또는 `npx vercel link` 후 `.vercel/project.json` |

등록 위치는 저장소 Settings → Secrets and variables → Actions입니다. 등록 후 Actions 탭에서 `Deploy to Vercel` 워크플로를 수동 실행(Run workflow)하면 즉시 배포됩니다.

배포 반영 확인:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://www.veritasvan.org/ko/apply/
```

## 콘텐츠 위치

- 단체·조직·HOME 콘텐츠: `src/data/site.js`
- 후원·지원 페이지 콘텐츠와 26-2 모집 정보: `src/data/pages.js`
- Archive 활동 기록: `src/data/activityArchive.js`
- HOME·Archive 화면: `src/pages/[lang]/[...slug].astro`
- 후원 페이지: `src/pages/[lang]/support/index.astro`
- 지원 페이지: `src/pages/[lang]/apply/index.astro`
- Archive 상세: `src/pages/[lang]/archive/[slug].astro`
- QR 생성 스크립트: `scripts/generate-qr.mjs` (`npm run qr`)
- 공통 레이아웃·SEO: `src/layouts/BaseLayout.astro`
- Header/Footer: `src/components/`
- 반응형 스타일·모션: `src/styles/global.css`
- 인터랙션 스크립트: `src/scripts/interactions.js`
- 이미지 자산: `public/assets/`

## 인터랙션 레이어

`src/scripts/interactions.js`가 스크롤 리빌, 스크롤 진행 표시, 헤더 축소, 섹션 스크롤스파이(상단 내비게이션 + 우측 레일), 히어로 패럴랙스, 포인터 스포트라이트·틸트, 모바일 메뉴, 계좌 복사 피드백, Archive 검색·필터를 담당합니다.

세 가지 규칙을 지킵니다.

- 콘텐츠는 JS 없이도 항상 보입니다. 리빌 대상은 `html.js-ready`가 붙었을 때만 감춰지며, 스크립트가 3초 안에 부팅되지 않으면 해당 클래스를 스스로 해제합니다.
- `prefers-reduced-motion: reduce`에서는 모든 모션을 끄고 최종 상태로 즉시 확정합니다.
- 스크롤·포인터 핸들러는 `requestAnimationFrame`으로 묶어 프레임당 한 번만 실행합니다.

리빌은 `transform` 대신 독립 속성 `translate`/`scale`을 사용합니다. 호버에서 쓰는 `transform`과 서로 덮어쓰지 않고 합성되기 때문입니다.

콘텐츠와 이미지의 기준은 전달받은 `VAN 단체 소개.html` 및 동봉 `assets/`이며, 확인되지 않은 사실·경력·신청 링크·파트너 정보를 임의로 추가하지 않습니다.
