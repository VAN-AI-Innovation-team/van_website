# 3-2 검색·AI 노출 최적화 API 연동

## 어떤 작업인가요?

3-2 팀이 제공하는 단체 정보를 공홈의 HTML `<head>` 안에 JSON-LD로 넣는 작업입니다. JSON-LD는 검색엔진이 페이지의 단체·행사 정보를 이해하는 데 사용하는 데이터입니다. 화면에 새로운 입력창이나 메뉴를 추가할 필요는 없습니다.

현재 작업 대상은 2-3 VAN 공식 홈페이지입니다. 업무 배정 회의록에서 컨퍼런스 사이트는 별도 업무인 2-1로 구분됩니다. 별도 컨퍼런스 사이트의 Event API 연동은 해당 담당자가 요청 형식과 대상 저장소를 확인해 진행할 항목입니다.

## 확정된 요구사항과 적용 상태

| 항목 | 내용 |
| --- | --- |
| API 주소 | `https://3-2-search-ai-optimization-production.up.railway.app` |
| 공홈 API | `GET /api/json-ld/organization?language=ko` 또는 `?language=en` — 요청 본문 없음 |
| 응답 | `@context`, `@type: Organization`, `name`, `url`, `description`, `inLanguage`, `logo`가 있는 JSON 객체 |
| 호출 시점 | 정적 사이트 빌드 시점. 개발 서버에서는 서버 쪽 페이지 렌더링 시점 |
| 호출 횟수 | 빌드 프로세스 안에서 언어별 한 번씩 요청하고 같은 언어의 페이지들이 응답을 공유 |
| 언어 선택 | 공통 레이아웃의 `lang`을 전달. `/ko/`는 한국어, `/en/`은 영어 응답 사용. 인자를 생략하면 `ko` |
| 삽입 위치 | 공통 레이아웃의 `<head>` → `<script type="application/ld+json">` |
| 기존 데이터 | 기존 Organization 객체를 API 응답으로 교체. WebSite·BreadcrumbList와 홈의 기존 Event 데이터는 유지 |
| API 장애 | 8초 시간 초과·HTTP 오류·잘못된 응답이면 해당 페이지 언어의 로컬 Organization 데이터를 사용하고 언어별 한 번 경고. 다른 언어의 성공 응답에는 영향 없음 |
| 정보 갱신 | API 정보가 변경되면 사이트를 다시 빌드·배포해야 반영됨 |
| CORS | 브라우저에서 API를 호출하지 않으므로 이번 방식에는 추가 CORS 허용 작업이 필요 없음 |

API 응답은 필드 값을 변경하지 않고 삽입합니다. 단, HTML의 script 태그를 안전하게 유지하도록 `<` 문자를 JSON 유니코드 이스케이프로 직렬화합니다. JSON 데이터의 의미는 동일합니다.

## 담당자에게 확인할 사항

1. **Event API 요청 예시**: `POST /api/json-ld/event`의 요청 JSON, 필수·선택 필드, 성공·오류 응답 예시.
2. **별도 컨퍼런스 업무와의 경계**: Event API 연동은 2-1 담당자와 조율. 공홈에 이미 들어 있는 행사 JSON-LD도 API로 전환할 경우에는 추가 범위를 먼저 확인.
3. **다국어 정책 확정**: `language=ko/en` 지원을 확인했습니다. 한국어 응답은 `name: VAN`, 한국어 description, `inLanguage: ko-KR`이며 영어 응답은 `name: VAN (Veritas Academiae Nexus)`, 영문 description, `inLanguage: en`입니다. 각 언어 페이지에 해당 응답을 그대로 사용합니다.
4. **정보 수정 후 재배포 담당**: 단체명·소개·로고 등이 API에서 바뀔 때 공홈 재빌드·배포를 누가 요청하고 실행할지 정하기.

Event API 요청 형식은 추측해서 구현하지 않습니다. 공홈의 기존 Event 데이터는 그대로 유지합니다.

## 담당자에게 보낼 수 있는 답장 초안

> 언어별 응답 지원 감사합니다. 홈페이지의 한국어 페이지는 `language=ko`, 영어 페이지는 `language=en`으로 호출하도록 반영했습니다. 빌드 시 언어별 응답을 각각 한 번 조회해 공통 head의 JSON-LD에 사용합니다. API 정보 변경 후에는 공홈 재빌드·배포가 필요합니다. Event API까지 연결할 경우에는 요청 JSON 및 필수 필드 예시를 별도로 부탁드립니다.

이 초안은 문서에만 작성했으며 메시지를 전송하지 않았습니다.

## 개발자가 확인할 파일과 검사

- `src/data/organizationJsonLd.js`: 언어별 API 호출, 응답 확인, 시간 제한, 언어별 요청 공유, 장애 시 로컬 데이터 사용, JSON 직렬화.
- `src/layouts/BaseLayout.astro`: 기존 Organization을 API 결과로 교체하고 head에 삽입.
- `.env.example`: API 주소 변경용 `JSON_LD_API_BASE_URL`. 기본 주소가 있어 별도 설정 없이 실행 가능.
- `scripts/organization-json-ld.test.mjs`: 언어별 동시 호출과 실패 격리, 성공·실패·잘못된 응답·시간 초과·script 종료 문자열 검사.

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

2026-09-11 언어별 응답 연동 검증 결과:

- 한국어·영어 API 모두 HTTP 200 확인. 이름·설명·`inLanguage`가 각 언어에 맞게 반환됨을 확인.
- `npm run check` 통과: 자동 테스트 13개, 정적 페이지 38개 빌드 성공.
- JSON-LD를 포함하는 HTML 35개(한국어 18개, 영어 17개)의 Organization이 각각 해당 언어 API 응답과 동일함을 확인. 한국어 수에는 404 페이지가 포함됨.
- 각 HTML의 Organization은 한 개이며, 기존 WebSite·BreadcrumbList와 홈의 Event도 유지됨을 확인.
- 한 언어의 실패가 다른 언어의 정상 응답에 영향을 주지 않고, 실패한 언어의 페이지별 로컬 데이터를 사용하는 것을 테스트로 검증.

JSON-LD의 역할과 형식은 [Google 구조화된 데이터 안내](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)를 참고하세요. 검색·AI 노출 순위 상승이나 검색결과 표시를 보장하는 기능은 아닙니다.
