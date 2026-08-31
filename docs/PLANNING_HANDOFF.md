# VAN 공식 홈페이지 운영 전달 가이드

## 현재 정보 구조

- `/ko/`, `/en/`: 공식 단체 홈페이지
- `/ko/archive/`, `/en/archive/`: 활동 기록
- Archive 하위: 전달받은 활동 자료의 한국어·영어 상세 기록

HOME은 다음 순서를 유지합니다.

1. VAN 공식 Hero
2. 단체 연혁 및 소개
3. Featured Endorsement
4. 대표단 소개
5. 자문위원회
6. 최근 활동 및 성과
7. 향후 활동 계획
8. 대표 연례 사업 — VAN Conference 2026
9. 단체 철학
10. 후원 안내
11. 연락처

VAN Conference 2026은 HOME 안의 대표 연례 사업 섹션입니다. 별도 콘퍼런스 홈페이지 또는 상세 라우트를 만들지 않습니다.

## 콘텐츠 수정 위치

- HOME·조직·콘퍼런스·후원·연락처: `src/data/site.js`
- Archive 활동 기록: `src/data/activityArchive.js`
- 화면 구성: `src/pages/[lang]/[...slug].astro`
- 공통 SEO: `src/layouts/BaseLayout.astro`
- 디자인: `src/styles/global.css`

## 운영 원칙

- 인물 이름·직책·소속·경력은 전달 자료에 있는 정보만 사용합니다.
- 신청 링크, 파트너 정보, 추가 연사, 연사 경력, 세부 프로그램을 임의로 만들지 않습니다.
- 새 인물 상세 페이지를 만들지 않습니다.
- 대표 활동 세 개는 HOME에 우선 노출하고 나머지 활동은 Archive에 기록합니다.
- 한국어 수정 시 영어 페이지의 동일 항목도 함께 갱신합니다.
- 일정·장소·후원 계좌·연락처 변경은 운영 책임자의 확인 후 반영합니다.

## 검사

```bash
npm run check
```

검사가 통과하면 `dist/`에 정적 HTML이 생성됩니다.
