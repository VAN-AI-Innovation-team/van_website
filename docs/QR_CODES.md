# 후원 · 26-2 지원 QR 코드

서브 도메인 대신 사이트 내 고정 경로를 도착지로 쓰는 QR입니다.

## 파일과 도착 주소

| 파일 | 용도 | 도착 주소 |
| --- | --- | --- |
| `public/qr/apply-ko.svg` · `.png` | 26-2 지원 (한국어) | https://www.veritasvan.org/ko/apply/ |
| `public/qr/apply-en.svg` · `.png` | 26-2 Recruitment (영어) | https://www.veritasvan.org/en/apply/ |
| `public/qr/support-ko.svg` · `.png` | 후원 안내 (한국어) | https://www.veritasvan.org/ko/support/ |
| `public/qr/support-en.svg` · `.png` | Support VAN (영어) | https://www.veritasvan.org/en/support/ |

배포 후에는 사이트에서 바로 내려받을 수 있습니다. 예: `https://www.veritasvan.org/qr/apply-ko.png`

## 어떤 걸 쓰면 되나요

- **인쇄물(포스터·현수막·명함)**: `.svg`. 벡터라 어떤 크기로 키워도 깨지지 않습니다.
- **인스타그램·카카오톡·PPT**: `.png`. 1024×1024이며 배경이 흰색으로 채워져 있습니다.

## 다시 생성하기

```bash
npm run qr
```

경로나 도메인이 바뀔 때만 실행하면 됩니다. 다른 도메인으로 만들려면 `SITE_URL`을 넘깁니다.

```bash
SITE_URL=https://staging.example.com npm run qr
```

## 설계 결정

**경로에 기수를 넣지 않았습니다.** `/ko/apply/26-2/`가 아니라 `/ko/apply/`입니다. 인쇄해서 배포한 QR은 회수할 수 없기 때문에, 다음 기수에 경로가 바뀌면 이미 뿌린 QR이 전부 죽습니다. 경로는 고정해두고 `src/data/pages.js`의 내용만 기수마다 교체하세요.

**색은 네이비(`#122542`)와 흰색만 씁니다.** 브랜드 골드(`#c4a15b`)는 흰 배경 대비가 약 2.6:1이라 스캐너가 명암 경계를 잡지 못합니다. QR은 장식이 아니라 기계가 읽는 대상이라 대비를 최우선으로 두었습니다.

**오류 정정 수준은 Q(약 25% 복원)입니다.** 기본값 M보다 한 단계 높여 인쇄물이 접히거나 잉크가 번져도 읽히게 했습니다. 검증 결과 96px까지 축소해도 디코딩됩니다.

**여백(quiet zone) 4모듈을 유지했습니다.** QR 규격이 요구하는 최소 여백입니다. 디자인 작업 중 QR을 다른 요소에 바짝 붙이면 인식률이 떨어지므로, 흰 여백을 잘라내지 마세요.

## 26-2 모집 정보 채우기

지원 페이지의 모집 요강은 `src/data/pages.js`의 `recruitment` 객체를 채우면 나타납니다. 비어 있는 동안에는 "확정 후 공지" 안내와 공식 인스타그램 링크가 대신 노출됩니다.

```js
export const recruitment = {
  cycle: '26-2',
  applyUrl: '',                          // 지원서 폼 URL
  period: { ko: '', en: '' },            // 모집 기간
  eligibility: { ko: '', en: '' },       // 모집 대상
  process: { ko: [], en: [] },           // 전형 절차 단계
}
```

값을 채우면 해당 항목만 렌더링되고, `applyUrl`을 넣으면 안내 문구가 「지원서 작성하기」 버튼으로 바뀝니다. QR과 페이지 주소는 그대로이므로 이미 배포한 QR을 다시 만들 필요가 없습니다.
