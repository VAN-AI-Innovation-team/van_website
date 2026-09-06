# 홈페이지 자동 배포 안내

## 현재 연결

- GitHub 저장소: `VAN-AI-Innovation/van_website`
- Vercel 프로젝트: `van-website` (팀: `van-64fe`)
- 운영 브랜치: `main`
- 운영 주소: https://www.veritasvan.org/
- https://veritasvan.org/ 는 위 주소로 이동합니다.

## 평소 업데이트 방법

1. 파일을 수정한 뒤 GitHub에 커밋하고 푸시합니다.
2. 작업 브랜치를 사용했다면 Pull Request를 `main`에 병합합니다.
3. Vercel이 `main`의 변경을 감지하여 자동으로 빌드하고 운영 배포합니다.
4. Vercel의 `van-website` → **Deployments**에서 해당 커밋의 상태가 **Ready**, 환경이 **Production**인지 확인합니다.
5. 빌드가 성공하면 운영 도메인에 새 배포가 자동 적용됩니다. 도메인 DNS를 매번 바꿀 필요는 없습니다.

컴퓨터에서 파일을 저장하는 것만으로는 배포되지 않습니다. GitHub의 `main`에 변경이 올라와야 합니다.
빌드가 실패하면 마지막으로 성공한 운영 배포가 계속 제공됩니다. 해당 배포의 **Build Logs**에서 오류를 확인합니다.

## 연결 설정을 다시 확인하는 방법

1. Vercel → `van-website` → **Settings → Git**에서 `VAN-AI-Innovation/van_website`가 연결되어 있는지 확인합니다.
2. **Settings → Environments → Production → Branch Tracking**을 `main`으로 설정합니다.
3. **Auto-Assign Custom Production Domains**를 켭니다.
4. **Settings → Domains**에서 `www.veritasvan.org` 연결 상태를 확인합니다.

설정 주소: https://vercel.com/van-64fe/van-website/settings/git
배포 목록: https://vercel.com/van-64fe/van-website/deployments

## GitHub Actions와의 관계

자동 배포는 Vercel의 GitHub 연결이 담당합니다.
`.github/workflows/deploy.yml`은 필요할 때 직접 실행하는 보조 배포 경로로 유지합니다.
일반적인 홈페이지 수정에는 이 워크플로를 실행하거나 별도 배포 토큰을 등록할 필요가 없습니다.

## 저장소 공개 범위

현재 저장소는 Public입니다. Vercel Hobby에서는 조직 소유 Private 저장소의 Git 자동 배포가 지원되지 않으므로, 저장소를 Private으로 바꾸려면 Vercel 요금제와 배포 방식을 먼저 검토해야 합니다.

공식 안내: https://vercel.com/docs/git
