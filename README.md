# VAN Website

AI와 데이터를 기반으로 금융투자와 보건의료 분야의 변화를 연구하는 VAN의 공식 웹사이트 프론트엔드입니다.

## 처음 실행하기

### 준비물

- Node.js 24
- npm

### GitHub에서 내려받은 경우

```bash
git clone https://github.com/VAN-AI-Innovation/van_website.git
cd van_website
npm ci
npm run dev
```

터미널에 표시되는 주소를 브라우저에서 엽니다. 기본 주소는 `http://localhost:5173`입니다.

Windows PowerShell에서 실행 정책 때문에 `npm` 명령이 차단되면 `npm` 대신 `npm.cmd`를 사용하거나 명령 프롬프트를 엽니다.

```powershell
npm.cmd ci
npm.cmd run dev
```

Git을 사용하지 않는 경우 GitHub의 `Code` 버튼에서 `Download ZIP`을 선택하고 압축을 푼 다음, 해당 폴더에서 아래 명령을 실행해도 됩니다.

```bash
npm ci
npm run dev
```

같은 네트워크의 다른 기기에서 모바일 화면을 확인하려면 다음 명령을 사용합니다.

```bash
npm run dev:share
```

터미널에 표시되는 `Network` 주소를 같은 Wi-Fi에 연결된 휴대폰에서 엽니다. Windows 방화벽이 연결 허용을 요청할 수 있습니다.

## 페이지 구성

- 홈: VAN의 핵심 메시지, 운영 원칙, 부서 미리보기, 최근 활동
- VAN 소개: 비전, 목표, 조직, 2022년부터 2025년까지의 연혁
- 부서 소개: AI혁신부, 금융투자리서치부, 보건의료언론부, 대외협력부
- 소식·아카이브: 행사, 프로젝트, 미디어, 언론보도와 분류 필터

## 핵심 기능

- 전체 화면 대표 배경과 스크롤 페이드 효과
- 데스크톱·태블릿·모바일 반응형 화면
- 모바일 내비게이션
- 아카이브 분류 필터
- 키보드 접근성과 모션 감소 설정 지원
- 페이지 제목, 설명, 파비콘 등 기본 검색 노출 설정
- 화면과 콘텐츠 데이터를 분리한 구조

## 콘텐츠 수정 위치

- 부서·아카이브·운영 원칙: `src/data/content.js`
- 홈 화면: `src/pages/Home.jsx`
- VAN 소개 및 연혁: `src/pages/Company.jsx`
- 부서 소개: `src/pages/Service.jsx`
- 소식·아카이브: `src/pages/Archive.jsx`
- 대표 이미지: `src/assets/hero-intelligence-panel.webp`

기획팀을 위한 자세한 실행 및 수정 안내는 [기획팀 전달 가이드](docs/PLANNING_HANDOFF.md)를 참고해 주세요.

## 검사 및 빌드

```bash
npm run check
```

검사가 통과하면 배포 가능한 파일이 `dist` 폴더에 생성됩니다. GitHub Actions도 `main`과 `dev` 브랜치의 코드를 같은 방식으로 검사하고, 성공한 빌드를 14일 동안 Artifact로 제공합니다. Artifact는 내려받는 빌드 파일이며, 브라우저에서 바로 열리는 공개 웹사이트 주소는 아닙니다.

개인 GitHub Pages 미리보기용 정적 파일은 아래 명령으로 생성합니다. 이 빌드는 `van-website-preview` 저장소 경로와 정적 호스팅에 맞게 해시 라우팅을 사용합니다.

```bash
npm run build:pages
```

## 기술 구성

- React 19
- Vite 8
- React Router 8
- Zustand 5
- CSS

외부 UI 템플릿이나 UI 컴포넌트 라이브러리는 사용하지 않았으며, VAN의 파란색·남색 계열을 기준으로 프로젝트 전용 화면을 구성했습니다. 사용한 개발 라이브러리는 각 패키지의 오픈소스 라이선스를 따릅니다.

## 현재 범위

이 저장소는 공개 웹페이지용 프론트엔드입니다. 관리자 CMS, 문의 저장·알림, 회원 기능 및 실제 백엔드 API는 포함하지 않습니다.
