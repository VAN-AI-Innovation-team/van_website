# VAN 공식 홈페이지 기획팀 전달 가이드

## 1. 화면만 확인하기

설치 없이 아래 링크를 열면 됩니다.

- 한국어 홈: https://van-website-kappa.vercel.app/ko/
- 영어 홈: https://van-website-kappa.vercel.app/en/
- 부서·활동 영역: https://van-website-kappa.vercel.app/ko/departments/
- 2026 행사 상세: https://van-website-kappa.vercel.app/ko/conference/2026/

## 2. 기획안 반영 내용

- 참고 시안의 짙은 네이비 정체성은 유지하면서 장식과 세리프 사용을 줄인 심플한 디자인 반영
- VAN 소개와 정체성을 HOME에 가장 크게 배치하고 최신 컨퍼런스로 연결
- HOME, ABOUT, DEPARTMENTS, CONFERENCE, ARCHIVE, CONTACT 중심 내비게이션 구성
- APPLICATION과 PARTNERS는 관련 화면의 CTA와 푸터에서 계속 접근 가능
- 컨퍼런스별 영구 상세 URL 제공
- 모든 페이지를 한국어와 영어의 별도 URL로 생성
- PC, 태블릿, 휴대폰 반응형 적용
- 휴대폰 전용 메뉴 적용
- 검색 로봇이 JavaScript 없이 읽을 수 있는 정적 HTML 생성
- 페이지별 기본 SEO와 sitemap, robots.txt, 구조화 데이터 적용

## 3. 아직 기획 확정이 필요한 내용

아래 정보는 전달받지 못했으므로 웹사이트에 임의 값을 넣지 않고 모두 `개발 중`으로 표시했습니다.

- VAN Conference 2026 정확한 행사명 또는 공식 슬로건
- 날짜와 시간
- 장소 및 온·오프라인 운영 여부
- 주최·주관·후원 기관
- 공식 부서명과 부서별 담당자
- 실제 소식·기사 원문과 대표 이미지
- 세부 프로그램과 연사
- 참가 신청 오픈일과 신청 URL
- 발표자·운영진 모집 일정과 지원 URL
- 공식 문의 이메일 또는 문의 폼
- 파트너 로고와 노출 순서
- 정확한 공식 도메인과 HTTPS 주소

확정된 공통 문구는 `src/data/conference.js`에서 수정하고, 연도별 행사·연사·프로그램·파트너·FAQ는 `src/data/conferenceEditions.js`에서 수정합니다.

## 4. 직접 실행하기

```bash
git clone https://github.com/VAN-AI-Innovation/van_website.git
cd van_website
npm ci
npm run dev
```

브라우저에서 `http://localhost:4321/ko/`를 엽니다.

휴대폰과 컴퓨터가 같은 Wi-Fi에 연결되어 있다면 아래 명령을 실행합니다.

```bash
npm run dev:share
```

터미널의 `Network` 주소 뒤에 `/ko/`를 붙여 휴대폰 브라우저에서 엽니다.

## 5. GitHub에서 문구 수정하기

1. 공통 페이지 문구는 `src/data/conference.js`, 연도별 Conference 정보는 `src/data/conferenceEditions.js`를 엽니다.
2. 연필 아이콘을 누릅니다.
3. `localized.ko`는 한국어, `localized.en`은 영어 행사 정보입니다.
4. 확정되지 않은 값은 `status: 'development'`, `value: null` 상태로 유지합니다.
5. 수정 후 별도 브랜치를 만들고 Pull Request를 요청합니다.
6. `main`에 병합되면 자동 검사와 배포가 실행됩니다.

## 6. 새 컨퍼런스 추가 원칙

2027 행사를 추가할 때 2026 페이지를 덮어쓰지 않습니다. `src/data/conferenceEditions.js`의 `conferenceEditions` 배열에 2027 객체를 추가하면 새 영구 URL이 생성되고 기존 2026 URL과 기록은 그대로 보존됩니다.

예시:

- `/ko/conference/2026/`
- `/ko/conference/2027/`
- `/en/conference/2026/`
- `/en/conference/2027/`
