# VAN 공식 홈페이지 기획팀 전달 가이드

이 문서는 개발 환경에 익숙하지 않은 팀원이 VAN 공식 홈페이지를 내려받아 확인하고, 콘텐츠 수정 위치를 찾을 수 있도록 작성했습니다.

## 1. 가장 쉬운 실행 방법

1. Node.js 24를 설치합니다.
2. 저장소 페이지에서 `Code`를 누르고 `Download ZIP`을 선택합니다.
3. 내려받은 ZIP 파일의 압축을 풉니다.
4. 압축을 푼 폴더에서 터미널을 엽니다.
5. 아래 명령을 순서대로 실행합니다.

```bash
npm ci
npm run dev
```

6. 터미널에 표시되는 `Local` 주소를 브라우저에서 엽니다.

실행을 끝낼 때는 터미널에서 `Ctrl + C`를 누릅니다.

Windows PowerShell에서 실행 정책 때문에 `npm` 명령이 차단되면 명령 프롬프트를 사용하거나 아래처럼 `npm.cmd`를 실행합니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

## 2. Git을 사용하는 경우

```bash
git clone https://github.com/VAN-AI-Innovation/van_website.git
cd van_website
npm ci
npm run dev
```

저장소가 비공개인 동안에는 VAN-AI-Innovation 조직 또는 저장소 접근 권한이 있는 GitHub 계정이 필요합니다.

## 3. 모바일 화면 확인

컴퓨터와 휴대폰을 같은 Wi-Fi에 연결한 다음 아래 명령을 실행합니다.

```bash
npm run dev:share
```

터미널에 표시되는 `Network` 주소를 휴대폰 브라우저에 입력합니다. 주소가 열리지 않으면 Windows 방화벽에서 Node.js의 개인 네트워크 통신을 허용했는지 확인합니다.

## 4. 콘텐츠 수정 위치

반복되는 부서, 아카이브, 운영 원칙 데이터는 `src/data/content.js`에 모여 있습니다.

### 부서 수정

`programs` 배열에서 다음 항목을 수정합니다.

- `title`: 부서명
- `summary`: 목록에 표시하는 짧은 소개
- `description`: 부서 상세 설명
- `tags`: 주요 활동 태그

### 소식·아카이브 수정

`archiveItems` 배열에서 다음 항목을 수정합니다.

- `category`: 행사, 프로젝트, 미디어, 언론보도
- `title`: 항목 제목
- `description`: 항목 설명
- `meta`: 일정 또는 담당 부서 등 보조 정보

새 항목을 추가할 때는 기존 항목 하나를 복사한 뒤 `id`가 겹치지 않도록 변경합니다.

### 페이지 문구 수정

- 홈: `src/pages/Home.jsx`
- VAN 소개 및 연혁: `src/pages/Company.jsx`
- 부서 소개: `src/pages/Service.jsx`
- 소식·아카이브: `src/pages/Archive.jsx`
- 공통 메뉴: `src/components/Header.jsx`
- 공통 하단 영역: `src/components/Footer.jsx`

### 대표 이미지 교체

`src/assets/hero-intelligence-panel.webp`를 같은 파일명으로 교체하면 홈 대표 이미지가 변경됩니다. 화면 속도 저하를 막기 위해 WebP 형식을 권장합니다. 외부 이미지를 사용할 때는 공개 전에 출처와 사용 권한을 확인합니다.

## 5. 수정 후 확인

아래 명령 한 번으로 코드 검사와 배포용 빌드를 확인합니다.

```bash
npm run check
```

성공하면 `dist` 폴더가 생성됩니다. 오류가 발생하면 터미널의 첫 번째 오류 메시지와 수정한 파일명을 개발팀에 전달합니다.

## 6. GitHub Actions 결과 내려받기

1. GitHub 저장소의 `Actions` 탭을 엽니다.
2. `Build website`에서 성공한 실행을 선택합니다.
3. 화면 아래의 `Artifacts`에서 `van-website-...` 파일을 내려받습니다.

Artifact는 검사에 성공한 배포용 정적 파일입니다. 공개 웹사이트 주소가 아니며, 소스 코드를 수정하려면 저장소의 `Code`에서 전체 코드를 내려받아야 합니다.

## 7. 개발팀에 전달할 정보

문제를 전달할 때 아래 내용을 함께 보내면 확인이 빠릅니다.

- 사용한 브랜치 또는 커밋 링크
- 문제가 발생한 페이지 주소
- 수행한 작업
- 터미널의 오류 메시지
- 화면 캡처

## 8. 현재 포함되지 않은 기능

- 관리자 CMS
- 문의 데이터 저장 및 알림
- 회원·로그인
- 실제 백엔드 API

위 기능은 별도 백엔드 또는 관리 도구와 연동해야 합니다.
