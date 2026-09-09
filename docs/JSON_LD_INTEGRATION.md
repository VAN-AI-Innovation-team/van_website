# 3-2 검색·AI 노출 최적화 API 연동

## 어떤 작업인가요?

3-2 팀이 제공하는 단체 정보를 공홈의 HTML `<head>` 안에 JSON-LD로 넣는 작업입니다. JSON-LD는 검색엔진이 페이지의 단체·행사 정보를 이해하는 데 사용하는 데이터입니다. 화면에 새로운 입력창이나 메뉴를 추가할 필요는 없습니다.

현재 작업 대상은 2-3 VAN 공식 홈페이지입니다. 업무 배정 회의록에서 컨퍼런스 사이트는 별도 업무인 2-1로 구분됩니다. 별도 컨퍼런스 사이트의 Event API 연동은 해당 담당자가 요청 형식과 대상 저장소를 확인해 진행할 항목입니다.

## 확정된 요구사항과 적용 상태

| 항목 | 내용 |
| --- | --- |
| API 주소 | `https://3-2-search-ai-optimization-production.up.railway.app` |
| 공홈 API | `GET /api/json-ld/organization` — 요청 본문 없음 |
| 응답 | `@context`, `@type: Organization`, `name`, `url`, `description`, `inLanguage`, `logo`가 있는 JSON 객체 |
| 호출 시점 | 정적 사이트 빌드 시점. 개발 서버에서는 서버 쪽 페이지 렌더링 시점 |
| 호출 횟수 | 빌드 프로세스 안에서 한 번 요청하고 여러 페이지가 같은 응답을 사용 |
| 삽입 위치 | 공통 레이아웃의 `<head>` → `<script type="application/ld+json">` |
| 기존 데이터 | 기존 Organization 객체를 API 응답으로 교체. WebSite·BreadcrumbList와 홈의 기존 Event 데이터는 유지 |
| API 장애 | 8초 시간 초과·HTTP 오류·잘못된 응답이면 기존 로컬 Organization 데이터를 사용하고 빌드 로그에 경고 |
| 정보 갱신 | API 정보가 변경되면 사이트를 다시 빌드·배포해야 반영됨 |
| CORS | 브라우저에서 API를 호출하지 않으므로 이번 방식에는 추가 CORS 허용 작업이 필요 없음 |

API 응답은 필드 값을 변경하지 않고 삽입합니다. 단, HTML의 script 태그를 안전하게 유지하도록 `<` 문자를 JSON 유니코드 이스케이프로 직렬화합니다. JSON 데이터의 의미는 동일합니다.

## 담당자에게 확인할 사항

1. **Event API 요청 예시**: `POST /api/json-ld/event`의 요청 JSON, 필수·선택 필드, 성공·오류 응답 예시.
2. **별도 컨퍼런스 업무와의 경계**: Event API 연동은 2-1 담당자와 조율. 공홈에 이미 들어 있는 행사 JSON-LD도 API로 전환할 경우에는 추가 범위를 먼저 확인.
3. **다국어 정책**: 현재 Organization 응답의 설명은 영어이고 `inLanguage`는 `ko-KR`입니다. 공홈은 한국어·영어 페이지 모두 같은 응답을 사용합니다. 언어별 응답이 필요한지 확인.
4. **정보 수정 후 재배포 담당**: 단체명·소개·로고 등이 API에서 바뀔 때 공홈 재빌드·배포를 누가 요청하고 실행할지 정하기.

Event API 요청 형식은 추측해서 구현하지 않습니다. 공홈의 기존 Event 데이터는 그대로 유지합니다.

## 담당자에게 보낼 수 있는 답장 초안

> 공유 감사합니다. VAN 공식 홈페이지는 Astro 정적 사이트라 빌드 시점에 Organization API를 호출하고, 응답을 공통 head의 JSON-LD에 반영하는 방식으로 연동하겠습니다. 기존 WebSite와 BreadcrumbList는 유지하고 Organization 중복은 제거합니다. 브라우저에서 호출하지 않으므로 이번 연동에는 CORS 추가 설정이 필요하지 않습니다. API 정보 변경 후에는 공홈 재빌드·배포가 필요합니다. Event 연동 범위도 확인 중이니, 요청 JSON 및 필수 필드 예시를 공유 부탁드립니다. Organization의 언어별 응답 지원 여부도 알려주시면 감사하겠습니다.

이 초안은 문서에만 작성했으며 메시지를 전송하지 않았습니다.

## 개발자가 확인할 파일과 검사

- `src/data/organizationJsonLd.js`: API 호출, 응답 확인, 시간 제한, 요청 공유, 장애 시 로컬 데이터 사용, JSON 직렬화.
- `src/layouts/BaseLayout.astro`: 기존 Organization을 API 결과로 교체하고 head에 삽입.
- `.env.example`: API 주소 변경용 `JSON_LD_API_BASE_URL`. 기본 주소가 있어 별도 설정 없이 실행 가능.
- `scripts/organization-json-ld.test.mjs`: 성공·실패·잘못된 응답·시간 초과·script 종료 문자열 검사.

```powershell
npm.cmd run check
```

빌드 후 `dist/ko/index.html`, `dist/en/index.html` 및 하위 페이지에서 JSON-LD가 HTML에 포함되어 있는지 확인합니다. 배포 후에는 실제 URL로 [Google Rich Results Test](https://search.google.com/test/rich-results)를 실행하고 Search Console에서 수집 결과를 확인합니다.

2026-09-10 로컬 검증 결과:

- 배포된 Organization API와 응답에 포함된 로고 URL 모두 HTTP 200 확인.
- 코드 검사와 자동 테스트 11개 통과, 전체 38개 페이지 빌드 성공.
- 공통 레이아웃을 사용하는 HTML 35개 모두 head에 API 응답과 동일한 Organization이 한 번씩 포함됨을 확인.
- 브라우저 JavaScript에 API 호출 코드가 포함되지 않음을 확인.
- API 접속 실패를 재현한 별도 빌드도 성공. HTML 35개에 각 언어의 기존 로컬 Organization이 들어가는 것을 확인.
- 운영 완료 여부는 별도 확인: dev 반영 후에도 운영 브랜치 배포와 실제 URL의 JSON-LD 확인이 필요함.

JSON-LD의 역할과 형식은 [Google 구조화된 데이터 안내](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)를 참고하세요. 검색·AI 노출 순위 상승이나 검색결과 표시를 보장하는 기능은 아닙니다.
