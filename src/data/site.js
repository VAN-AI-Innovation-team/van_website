export const languages = ['ko', 'en']

/** catch-all 라우트(`[lang]/[...slug].astro`)가 생성하는 페이지. */
export const routeEntries = [
  { key: 'home', slug: '' },
  { key: 'archive', slug: 'archive' },
]

/** 전용 파일 라우트가 생성하는 페이지. QR로 직접 배포되는 대상이다. */
export const standaloneRoutes = [
  { key: 'support', slug: 'support' },
  { key: 'apply', slug: 'apply' },
]

/** sitemap·hreflang 등 사이트 전체 라우트 목록. */
export const siteRoutes = [...routeEntries, ...standaloneRoutes]

export const routeBySlug = Object.fromEntries(routeEntries.map((route) => [route.slug, route]))

export const navItems = [
  { key: 'about', section: 'about' },
  { key: 'people', section: 'people' },
  { key: 'activities', section: 'activities' },
  { key: 'future', section: 'future' },
  { key: 'philosophy', section: 'philosophy' },
  { key: 'support', slug: 'support' },
  { key: 'archive', slug: 'archive' },
  { key: 'contact', section: 'contact' },
]

/** 헤더 우측 강조 버튼. 리크루팅은 상시 메뉴가 아니라 캠페인성 CTA로 노출한다. */
export const ctaItem = { key: 'apply', slug: 'apply' }

/**
 * HOME 우측 스크롤스파이 레일에 노출할 섹션.
 * 후원은 전용 페이지로 분리했지만 HOME에도 요약 섹션이 남아 있어 레일에서는 유지한다.
 */
export const homeSections = ['about', 'people', 'activities', 'future', 'philosophy', 'support', 'contact']

const sharedImages = {
  hero: '/assets/hero_bg.min.jpg',
  logoWhite: '/assets/logo_white_hd.png',
  logoDark: '/assets/logo_dark.png',
}

export const content = {
  ko: {
    languageName: '한국어',
    skip: '본문으로 건너뛰기',
    menu: '메뉴',
    nav: {
      home: '홈', about: '소개', people: '사람', activities: '활동', future: '계획',
      philosophy: '철학', support: '후원', archive: '자료', contact: '연락처', apply: '26-2 지원',
    },
    meta: {
      home: ['VAN | Veritas Academiae Nexus', '서울대학교·연세대학교·고려대학교를 중심으로 형성된 서울권 대학 학회들의 총연합체 VAN 공식 홈페이지입니다.'],
      archive: ['VAN 활동 자료 | Archive', 'VAN의 학술·정책·공론장·미디어 활동 기록을 모아 보는 공식 자료실입니다.'],
      support: ['VAN 후원 안내 | Support', 'VAN의 학술·공익 활동과 청년 공론장 운영을 위한 후원 계좌와 입금 안내를 확인하세요.'],
      apply: ['VAN 26-2 리크루팅 | 지원', 'VAN 26-2 리크루팅 안내입니다. 모집 대상과 지원 방법, 함께하게 되는 활동을 확인하세요.'],
    },
    common: {
      archive: '전체 활동 기록 보기',
      details: '자세히 보기',
      copy: '계좌번호 복사',
      copied: '복사됨',
      readingProgress: '페이지 읽기 진행률',
      toTop: '맨 위로 이동',
      sectionRail: '섹션 바로 이동',
      supportDetails: '후원 안내 자세히 보기',
    },
    home: {
      hero: {
        kicker: 'EST. SEOUL · YONSEI · KOREA',
        title: 'Veritas · Academiae · Nexus',
        label: '학술연합체 VAN',
        lead: '서울대학교·연세대학교·고려대학교를 중심으로 형성된 서울권 대학 학회·학술 총연합체',
        schools: ['서울대학교', '연세대학교', '고려대학교'],
        ...sharedImages,
      },
      about: {
        number: 'I', title: '단체 연혁 및 소개', subtitle: 'History & Introduction',
        paragraphs: [
          'VAN(Veritas Academiae Nexus)은 각 대학에 ‘총동아리연합회(총동연)’가 존재하듯, 서울대학교·연세대학교·고려대학교를 중심으로 형성된 서울권 대학 학회들의 총연합체입니다. 본 연합은 세 대학 내에서 정식 인가를 받아 오랜 전통을 이어온 학회들의 연대에서 출발하였으며, 현재는 서성한·중경외시·이건동홍 등의 대학으로 범위를 확장하며 전국 단위의 학술 네트워크로 고도화되고 있습니다.',
          '서울대·연세대·고려대를 축으로 이어져 온 학회 연합의 역사는 결코 짧지 않습니다. 그러나 기존의 연합 구조는 학생자치단체의 선거 주기와 짧은 임기에 종속되어, 경험과 네트워크, 제도적 자산을 장기적으로 축적하기 어렵다는 구조적 한계를 안고 있었습니다.',
          '이러한 문제의식은 ‘Zeitgeist 서연고 사회과학 연합 컨퍼런스’를 계기로 명확히 공유되었습니다. 세 대학의 학생들이 한자리에 모여 학문적 토론을 전개하며, 이론적 논의가 현실의 문제의식과 맞닿아 실질적 함의를 만들 수 있음을 확인했습니다. 각 학회장단은 단발적 연합을 넘어 지속성과 축적을 전제로 하는 새로운 체계로의 전환에 합의했습니다.',
          '이후 기존의 소모적 순환 구조를 단절하고 학생자치기구의 임기 교체와 무관하게 작동하는 독립적·상시적 플랫폼을 구축했습니다. 연중 지속되는 학술 교류, 지도교수단 및 전문가 자문위원단과의 구조적 협업, 장기적 축적을 가능하게 하는 조직 설계를 기반으로 협력 체계를 확장해 왔습니다.',
          '그 결과 VAN은 단순한 학생 연합을 넘어 학술적 깊이와 외연적 영향력을 동시에 확보한 연합체로 전환되었습니다. 연구와 연대를 기반으로 실질적 사회 변화를 견인하는 지속 가능한 청년 지성 플랫폼을 지향합니다.',
        ],
      },
      endorsements: {
        number: 'II', title: 'Featured Endorsement', subtitle: '각계 인사들이 전하는 지지와 격려',
        items: [
          { name: 'Kenneth Maxwell Nance 박사', role: '대표 상임고문', image: '/assets/p03_0_159x161.min.jpg', quote: '여러분의 방향성과 원칙, 그리고 신조가 높기에 저는 여러분께 깊은 경의를 표합니다. 세 개 대학 사이에서뿐만 아니라 전 세계에 걸쳐 협력을 구축해 나가는 여러분의 협업 수준은 참으로 존경할 만합니다. 진리·학문·연대라는 여러분의 원칙은 고귀하며, 여러분을 멀리 나아가게 할 것입니다.' },
          { name: '김성훈 교수', role: '자문위원회장', image: '/assets/p04_2_159x160.min.jpg', quote: '우리 VAN이 어떤 진영을 넘어서, 또 우리 지역을 뛰어넘어서 함께 연대하고 포용하고 협력하고 그러한 연구단체로 성장하기 바랍니다. 우리 취업의 문제 또 일자리의 문제 이런 것들을 우리 VAN의 학생들과 함께 연구하고 싶습니다.' },
          { name: '최재형', role: '전 감사원장·전 국회의원', image: '/assets/end_choi.min.jpg', quote: '오늘 우선 VAN의 새로운 출발을 진심으로 축하드립니다. 역사와 현실에 대한 정확하고 폭넓은 이해를 기반으로 여러분들의 연구와 노력을 기울여주시길 바랍니다. 우리 VAN이 길을 개척하고 보다 밝은 미래를 만드는 데 기여하는 젊은이들의 단체로 계속 성장하기를 기대합니다.' },
          { name: '박용진', role: '전 국회의원·현 규제합리화위원회 부위원장', image: '/assets/end_park.min.jpg', quote: '여러분이 추구하시겠다고 하는 학술적인 진리, 학문적 진리는 사회적 정의입니다. 진영 논리에 맞서시려면 용기를 갖고 전투적인 합리주의자가 되시기를 당부드립니다. 저와 많은 선배님들이 VAN 여러분을 응원하고 함께하겠습니다.' },
          { name: '김동아', role: '현 국회의원', image: '/assets/end_kim.min.jpg', quote: '단순히 진리만을 추구하는 것이 아니라 사회의 번영과 사회의 변화를 함께 이루겠다는 그 목표가 크게 와닿습니다. Veritas, Academiae, 그리고 Nexus. VAN의 새 출발을 축하드리고 저도 열렬히 응원하겠습니다.' },
        ],
      },
      leaders: {
        number: 'III', title: '대표단 소개', subtitle: 'The Leadership',
        items: [
          { role: '대표', name: '정도대', affiliation: '연세대학교', image: '/assets/jdd_portrait2.min.jpg', careers: ['서울대·연세대·고려대 학술연합체 대표', '서울대·연세대·고려대 학술연합 준비위원회 위원장', '연세대학교 JSC 사회과학학회 학회장·부학회장', '연세대학교 사회과학대 대외전략국 실무총괄', '연세대학교 총학생회 선거본부 정책국 지방선거 전담', '연세대학교 와이들 스튜디오 부장', '연세대학교 사회과학대 범부회 총무', '시사평론가(워싱턴포스트, 더페이퍼·펑베이 등)', 'Maxwell Leadership Institution 상임고문', '북극성 정치경제연구소 겸 투자회사 부대표', '국토환경뉴스 미주본부장', '국회 청년기업인 대표 라운드테이블 참여', 'WE-CAN-TALK 발달지체아동 언어학습 개발', 'POLLITE 참여형 의회 플랫폼 개발'] },
          { role: '부대표', name: '김도윤', affiliation: '고려대학교', careers: ['서울대·연세대·고려대 학술연합체 부대표·실장', '고려대학교 정치외교학과 국제정치학회 비욘드 학회장·부학회장·학술부장', '고려대학교 정치외교학과 학술자치국 국장·국원', '고려대학교 정치외교학과 운영위원회 운영위원', '고려대학교 정치외교학과 선거관리위원회 위원', '고려대학교 제6대 모의재판준비위원회 위원장·위원', '주한미국대사관 America Diplomacy House Academy 3기'] },
          { role: '실장', name: '유수경', affiliation: '고려대학교', careers: ['고려대학교 스페인·라틴아메리카 연구소 산하 경영 전략 학회 Reál 부학회장', '고려대학교 총학생회 교육국', '고려대학교 정치외교학과 학술자치국원', '고려대학교 등록금특별대응위원회 간사', '고려대학교 정치외교학과 회칙개정특별위원회 위원', 'UNDP Ambassador'] },
        ],
      },
      advisory: {
        number: 'IV', title: '자문위원회', subtitle: 'Advisory Council',
        intro: '자문위원회는 외부 각 분야의 실무적 식견과 전략적 자문을 담당하는 비교수 고문단과 학문적 깊이와 이론적 기반을 제공하는 지도교수단의 이원적 구조로 구성됩니다. 자문위원회장은 두 조직을 통합·조정하며 조직 전반의 전략적 방향성과 운영의 일관성을 확보합니다.',
        items: [
          { role: '대표 상임고문', name: 'Kenneth Maxwell Nance 박사', image: '/assets/p03_0_159x161.min.jpg', careers: ['Leadership Grand Theory 창립자', 'Harvard University, HKS, PLC', 'Amazon Top 50 Fearless Leader', 'Global Defense Info. Network 개발', '미국 대통령상 4회 수상'] },
          { role: '지도교수단장', name: '김유성', affiliation: '연세대 로스쿨 교수', image: '/assets/p03_1_161x166.min.jpg', careers: ['대법원 재판연구관(부장판사·상사조)', '서울중앙지법·서울회생법원 판사', '전 전국법관대표회의 대법원 부장판사 대표', '융합과학기술대학원 이학석사', '한국상사법학회 상임이사', '한국상사판례학회 연구이사', '애큐온캐피탈 사외이사'] },
          { role: '대표 지도교수', name: '김남규 · 이동성', affiliation: '고려대 정치외교학과 교수', careers: [] },
          { role: '자문위원회장', name: '김성훈', affiliation: '부산외대·인제대 교수', image: '/assets/p04_2_159x160.min.jpg', careers: ['한-인도 비즈니스문화진흥원 사무총장', '전 경남도의원·전 국회의원 후보', '전 부산외대 교수·현 인제대 교수', '연세대 행정대학원 정치학 석사'] },
        ],
        gallery: [{ image: '/assets/p04_0_1172x659.min.jpg', alt: 'VAN 자문위원단 단체사진' }, { image: '/assets/p04_1_1112x597.min.jpg', alt: 'VAN 자문위원단 단체사진' }],
      },
      activities: {
        number: 'V', title: '최근 활동 및 성과', subtitle: 'Recent Activities & Achievements',
        intro: 'VAN은 학술 연구와 사회적 담론을 연결하는 다양한 프로젝트를 수행하고 있습니다.',
        items: [
          { title: 'POLLITE', summary: '자체 개발한 생성형 AI 및 클라우드 기술을 기반으로 의정활동 정보의 접근성을 높이고 시민 참여를 확장하는 정책·기술 융합 프로젝트입니다.', image: '/assets/p05_0_547x417.min.jpg', alt: '청년 기업인 라운드테이블에서 안철수 의원과 인사하는 VAN 대표' },
          { title: 'SKY Zeitgeist 2025', summary: '서울대학교·연세대학교·고려대학교 소속 사회과학 학회가 연구 성과와 이론적 논의를 공유한 연합 학술 교류 프로그램입니다.', image: '/assets/p06_0_1348x758.min.jpg', alt: 'SKY Zeitgeist 2025 단체사진' },
          { title: 'VAN Renaissance 2025', summary: '100인 이상이 참여해 국제 정치 및 사회 현안을 주제로 발표와 토론을 진행하고 청년 주도의 공론장 모델을 제시한 학술 컨퍼런스입니다.', image: '/assets/renaissance_full.min.jpg', alt: 'VAN Renaissance 2025 단체사진' },
        ],
      },
      future: {
        number: 'VI', title: '향후 활동 계획', subtitle: 'The Road Ahead',
        items: [
          { number: '01', title: '연합 학술 컨퍼런스 개최', items: ['연 1~2회 연합 학술 컨퍼런스 개최', '학계·정치권·산업계가 결합된 하이브리드 공론장 모델 구축'] },
          { number: '02', title: '국내 최상위 학술 네트워크 고도화', items: ['서울대·연세대·고려대를 중심으로 한 서울권 학회 연합 정교화', '전국 주요 대학으로 확장되는 Pan-University Academic Network 구축', '지도교수단·자문위원단·상설연구조직 기반의 지속 가능한 학술 거버넌스 확장'] },
          { number: '03', title: '글로벌 학술 네트워크 구축', items: ['북미·유럽·아시아 주요 대학 및 연구기관과의 전략적 협력', '공동 연구·컨퍼런스·출판을 통한 Global Academic Nexus 형성', '글로벌 정치·경제·기술 이슈에 대한 청년 기반 정책 담론 생산'] },
          { number: '04', title: '정책·연구 플랫폼 구축', items: ['국회·지자체·공공기관·연구소 협력 정책 연구 수행', '청년 학술·정치 협업 모델 구축', '자체 정책 보고서 및 학술지 발간을 통한 지식 생산 체계화'] },
          { number: '05', title: '차세대 인재 양성', items: ['「한국청년정치학교」 프로그램 운영', '「한국리더십학교」 프로그램 운영'] },
          { number: '06', title: '온라인·미디어 기반 공공 담론 확산', items: ['자체 인터뷰·팟캐스트·영상 콘텐츠 제작 및 확산', '국회·지자체·선거캠프 등과 공동 영상 제작', '참여형 의회 플랫폼 POLLITE 고도화'] },
        ],
      },
      conference: {
        eyebrow: '대표 연례 사업 · VAN Conference 2026', title: '대격변의 시대, 혁신을 묻다', englishTitle: 'The Arena of Innovation · 2026',
        description: '급격한 기술 변화와 사회 구조의 전환 속에서 오늘의 청년 세대가 마주한 핵심 질문을 함께 논의하는 VAN의 대표 컨퍼런스입니다.',
        facts: [['일시', '2026. 09. 12. (토) 14:00–18:00'], ['장소', '숙명여자대학교 눈꽃광장홀'], ['대상', '서울권 대학생·청년 수백 명 규모']],
        program: ['기술혁신', '사회·정치혁신', '종합 디스커션', '알럼나이 네트워킹 나잇'],
        sessions: [
          { title: 'Session 1 · 기술혁신', people: ['Kenneth Maxwell Nance · Keynote · 하버드 박사·미 인트라넷 창시', '이광희 · VIV Tech. CTO', '김진홍 · 공군 방공유도탄 사령관', '김성혁 · LG전자 상무', '임영일 · 국방기술진흥연구소장'] },
          { title: 'Session 2 · 사회·정치혁신', people: ['김재섭 · 국민의힘·제22대 국회의원·서울 도봉구갑', '천하람 · 개혁신당·제22대 국회의원·비례대표', '김동아 · 더불어민주당·제22대 국회의원·서대문갑', '손솔 · 진보당·제22대 국회의원·비례대표'] },
          { title: 'Session 4 · 대표 알럼나이', people: ['오종훈 · SK에너지 대표이사 사장·SK Portfolio Mgmt. 임원·연세대 법학 출신', '이주호 · Dr.G 전 대표·연세대 경영 출신'] },
        ],
      },
      philosophy: {
        number: 'VII', title: '단체 철학',
        body: '대학(원)은 진리를 탐구하는 상아탑입니다. 그러나 그 진리가 학내와 학계의 담론에만 머문다면 그 가치는 절반만 실현될 뿐입니다. 진리는 사회의 복잡한 현실에 비추어질 때 공적 의미와 실천적 힘을 얻습니다. VAN은 ‘학문적 내실(內實)’과 ‘사회적 확장성(擴張性)’이라는 두 축의 균형을 조직 운영의 근본 원칙으로 삼습니다. 진리를 성실히 탐구하고, 탐구된 진리를 사회에 비추며, 연대를 통해 학계와 사회에 의미 있는 변화를 만들어 나가겠습니다.',
        image: '/assets/p18_1_1600x613.min.jpg', alt: 'VAN 실무진 내부 업무 워크숍',
      },
      support: {
        title: '후원 계좌', subtitle: 'Support VAN', description: '후원금은 VAN의 지속적인 학술·공익 활동, 청년 공론장 조성, 컨퍼런스 및 연계 프로젝트 운영을 위한 재원으로 소중히 사용됩니다.',
        bank: '토스뱅크', account: '1002-3139-5718', holder: '정영일 · VAN 교류진흥부 제1차장',
        guide: '입금자명은 가급적 “성함+VAN후원” 형식으로 기재해주시기 바랍니다.', example: '예시 · 홍길동VAN후원',
      },
      contact: { title: '연락처', subtitle: 'Contact', instagram: '@veritas_van', instagramUrl: 'https://instagram.com/veritas_van', phone: '010-2685-9069', manager: '비서실 소속 수석비서관 정시언' },
    },
    archive: { eyebrow: 'VAN ARCHIVE', title: '활동 기록', lead: 'HOME에 소개한 대표 활동 외 VAN의 학술·정책·공론장·미디어 활동을 기록합니다.' },
    footer: { line: '학문적 내실과 사회적 확장성의 균형을 추구합니다.', copyright: 'VAN · Veritas Academiae Nexus. All rights reserved.' },
  },
  en: {
    languageName: 'English', skip: 'Skip to content', menu: 'Menu',
    nav: { home: 'Home', about: 'About', people: 'People', activities: 'Work', future: 'Roadmap', philosophy: 'Principles', support: 'Support', archive: 'Archive', contact: 'Contact', apply: 'Join 26-2' },
    meta: {
      home: ['VAN | Veritas Academiae Nexus', 'The official website of VAN, a federation of university academic societies centered on Seoul National, Yonsei and Korea University.'],
      archive: ['VAN Activity Archive', 'Official records of VAN academic, policy, civic-discourse and media activities.'],
      support: ['Support VAN', 'Donation account and deposit guidance for VAN’s continuing academic and public-interest work.'],
      apply: ['VAN 26-2 Recruitment', 'Recruitment information for VAN 26-2: who we are looking for, how to apply and what you will work on.'],
    },
    common: {
      archive: 'Explore all activity records',
      details: 'Read more',
      copy: 'Copy account number',
      copied: 'Copied',
      readingProgress: 'Reading progress',
      toTop: 'Back to top',
      sectionRail: 'Jump to section',
      supportDetails: 'See the full donation guide',
    },
    home: {
      hero: {
        kicker: 'EST. SEOUL · YONSEI · KOREA', title: 'Veritas · Academiae · Nexus', label: 'Academic Federation VAN',
        lead: 'A federation of university academic societies centered on Seoul National University, Yonsei University and Korea University.',
        schools: ['Seoul National University', 'Yonsei University', 'Korea University'], ...sharedImages,
      },
      about: {
        number: 'I', title: 'History & Introduction', subtitle: 'About VAN',
        paragraphs: [
          'VAN (Veritas Academiae Nexus) is a federation of university academic societies centered on Seoul National University, Yonsei University and Korea University. It began as an alliance of long-established, officially recognized societies at the three universities and is expanding into a nationwide academic network.',
          'Earlier inter-university alliances were constrained by short student-governance election cycles. Leadership changed frequently, interrupting the accumulation of experience, networks and institutional assets.',
          'This challenge became clear through the Zeitgeist joint social-science conference. Students from the three universities saw that serious academic discussion could produce practical implications when it met real social questions. The participating society leaders agreed to move from one-off collaboration to a structure built for continuity.',
          'VAN therefore established an independent, year-round platform that operates beyond student-office terms. It combines continuous academic exchange with structured cooperation among faculty advisers, professional advisers and partner institutions.',
          'VAN now seeks to be a sustainable platform for young intellectual leadership—grounded in research and solidarity, and capable of connecting academic depth with public impact.',
        ],
      },
      endorsements: {
        number: 'II', title: 'Featured Endorsement', subtitle: 'Messages of support from public and academic leaders',
        items: [
          { name: 'Dr. Kenneth Maxwell Nance', role: 'Principal Senior Adviser', image: '/assets/p03_0_159x161.min.jpg', quote: 'Your level of collaboration is admirable, not only among three universities, but in establishing collaboration around the world. Your principles of truth, scholarship and solidarity are noble and will take you far.' },
          { name: 'Professor Kim Sung-hoon', role: 'Chair, Advisory Council', image: '/assets/p04_2_159x160.min.jpg', quote: 'I hope VAN grows beyond political camps and regions into a research organization that practices solidarity, inclusion and cooperation.' },
          { name: 'Choi Jae-hyung', role: 'Former Chair, Board of Audit and Inspection · Former National Assembly Member', image: '/assets/end_choi.min.jpg', quote: 'I hope VAN continues to grow as an organization of young people who open difficult paths and help build a brighter future through a broad and accurate understanding of history and reality.' },
          { name: 'Park Yong-jin', role: 'Former National Assembly Member', image: '/assets/end_park.min.jpg', quote: 'Academic truth is also social justice. I encourage you to meet factional logic with courage and rigorous rationalism. Many senior colleagues and I will stand with VAN.' },
          { name: 'Kim Dong-ah', role: 'Member of the National Assembly', image: '/assets/end_kim.min.jpg', quote: 'The goal of pursuing truth while contributing to social prosperity and change resonates strongly. Congratulations on VAN’s new beginning.' },
        ],
      },
      leaders: {
        number: 'III', title: 'Leadership', subtitle: 'Representative Council',
        items: [
          { role: 'Representative', name: 'Dodae Jung', affiliation: 'Yonsei University', image: '/assets/jdd_portrait2.min.jpg', careers: ['Representative, SNU–Yonsei–Korea Academic Federation', 'Chair, Academic Federation Preparatory Committee', 'President and Vice President, Yonsei JSC Social Science Society', 'Operations lead, External Strategy Bureau, Yonsei College of Social Sciences', 'Standing adviser, Maxwell Leadership Institution', 'Developer of WE-CAN-TALK language learning and the POLLITE civic platform'] },
          { role: 'Vice Representative', name: 'Doyoon Kim', affiliation: 'Korea University', careers: ['Vice Representative and Chief of Staff, Academic Federation', 'President, Vice President and Academic Director, Beyond International Politics Society', 'Director and member, Academic Self-Governance Bureau, Department of Political Science and International Relations', 'Chair, 6th Mock Trial Preparatory Committee', 'U.S. Embassy America Diplomacy House Academy, Cohort 3'] },
          { role: 'Chief of Staff', name: 'Sookyung Yoo', affiliation: 'Korea University', careers: ['Vice President, Reál Management Strategy Society, Institute of Iberoamerican Studies', 'Education Bureau, Korea University Student Council', 'Academic Self-Governance Bureau, Department of Political Science and International Relations', 'Secretary, Special Tuition Response Committee', 'UNDP Ambassador'] },
        ],
      },
      advisory: {
        number: 'IV', title: 'Advisory Council', subtitle: 'Academic and Strategic Guidance',
        intro: 'The Advisory Council combines a professional adviser group, which contributes practical and strategic insight, with a faculty group that provides academic depth and theoretical foundations. The Council Chair coordinates both groups and maintains the organization’s strategic direction.',
        items: [
          { role: 'Principal Senior Adviser', name: 'Dr. Kenneth Maxwell Nance', image: '/assets/p03_0_159x161.min.jpg', careers: ['Founder, Leadership Grand Theory', 'Harvard University, HKS, PLC', 'Amazon Top 50 Fearless Leader', 'Developer, Global Defense Information Network', 'Four-time U.S. Presidential Award recipient'] },
          { role: 'Head of Faculty Advisers', name: 'Kim Yoo-sung', affiliation: 'Professor, Yonsei Law School', image: '/assets/p03_1_161x166.min.jpg', careers: ['Former Supreme Court research judge', 'Former judge, Seoul Central District Court and Seoul Bankruptcy Court', 'Executive Director, Korean Commercial Law Association', 'Outside Director, Acuon Capital'] },
          { role: 'Representative Faculty Advisers', name: 'Kim Nam-kyu · Lee Dong-sung', affiliation: 'Professors, Korea University Department of Political Science and International Relations', careers: [] },
          { role: 'Chair, Advisory Council', name: 'Kim Sung-hoon', affiliation: 'Professor, Busan University of Foreign Studies · Inje University', image: '/assets/p04_2_159x160.min.jpg', careers: ['Secretary-General, Korea–India Business and Culture Promotion Institute', 'Former Gyeongsangnam-do Provincial Council member', 'Former professor, Busan University of Foreign Studies; current professor, Inje University', 'M.A. in Political Science, Yonsei Graduate School of Public Administration'] },
        ],
        gallery: [{ image: '/assets/p04_0_1172x659.min.jpg', alt: 'VAN advisers and partners' }, { image: '/assets/p04_1_1112x597.min.jpg', alt: 'VAN advisers and partners' }],
      },
      activities: {
        number: 'V', title: 'Recent Activities & Achievements', subtitle: 'Connecting scholarship with public discourse',
        intro: 'VAN conducts projects that connect academic research, policy and public discourse.',
        items: [
          { title: 'POLLITE', summary: 'A policy-and-technology project using generative AI and cloud infrastructure to make legislative information more accessible and expand civic participation.', image: '/assets/p05_0_547x417.min.jpg', alt: 'VAN representative at a young entrepreneur roundtable' },
          { title: 'SKY Zeitgeist 2025', summary: 'A joint academic exchange where social-science societies from Seoul National, Yonsei and Korea University presented research and held floor discussions.', image: '/assets/p06_0_1348x758.min.jpg', alt: 'SKY Zeitgeist 2025 group photo' },
          { title: 'VAN Renaissance 2025', summary: 'An academic conference of more than 100 participants featuring presentations and debate on international politics and social issues.', image: '/assets/renaissance_full.min.jpg', alt: 'VAN Renaissance 2025 group photo' },
        ],
      },
      future: {
        number: 'VI', title: 'The Road Ahead', subtitle: 'Future Activities',
        items: [
          { number: '01', title: 'Joint Academic Conferences', items: ['Hold one or two joint academic conferences each year', 'Develop a hybrid public-forum model linking academia, politics and industry'] },
          { number: '02', title: 'A Stronger Domestic Academic Network', items: ['Deepen the Seoul-area alliance centered on SNU, Yonsei and Korea University', 'Build a Pan-University Academic Network', 'Expand sustainable academic governance with faculty advisers, professional advisers and standing research teams'] },
          { number: '03', title: 'A Global Academic Network', items: ['Strategic cooperation with universities and research institutions in North America, Europe and Asia', 'Form a Global Academic Nexus through joint research, conferences and publishing', 'Produce youth-led policy discourse on global political, economic and technological issues'] },
          { number: '04', title: 'Policy & Research Platform', items: ['Conduct policy research with public institutions and research organizations', 'Build models for cooperation between young scholars and politics', 'Systematize knowledge production through policy reports and academic publications'] },
          { number: '05', title: 'Next-Generation Leadership', items: ['Operate the Korea Youth Politics School', 'Operate the Korea Leadership School'] },
          { number: '06', title: 'Public Discourse Through Media', items: ['Create interviews, podcasts and video content', 'Produce collaborative media with public institutions and civic partners', 'Advance the participatory parliamentary platform POLLITE'] },
        ],
      },
      conference: {
        eyebrow: 'Flagship Annual Initiative · VAN Conference 2026', title: 'Questioning Innovation in an Era of Upheaval', englishTitle: 'The Arena of Innovation · 2026',
        description: 'VAN’s flagship conference brings students and young people together with leaders from academia, industry and public life to examine the defining questions of rapid technological and social change.',
        facts: [['Date', '12 September 2026 · 14:00–18:00'], ['Venue', 'Snowflake Square Hall, Sookmyung Women’s University'], ['Audience', 'Several hundred university students and young people from the Seoul area']],
        program: ['Technology Innovation', 'Social & Political Innovation', 'General Discussion', 'Alumni Networking Night'],
        sessions: [
          { title: 'Session 1 · Technology Innovation', people: ['Dr. Kenneth Maxwell Nance · Keynote', 'Lee Kwang-hee · CTO, VIV Tech.', 'Kim Jin-hong · Air Defense Guided Missile Commander', 'Kim Sung-hyuk · Executive, LG Electronics', 'Lim Young-il · Head, Korea Research Institute for Defense Technology Planning and Advancement'] },
          { title: 'Session 2 · Social & Political Innovation', people: ['Kim Jae-sub · National Assembly Member', 'Cheon Ha-ram · National Assembly Member', 'Kim Dong-ah · National Assembly Member', 'Son Sol · National Assembly Member'] },
          { title: 'Session 4 · Representative Alumni', people: ['Oh Jong-hoon · President & CEO, SK Energy; SK Portfolio Management executive', 'Lee Joo-ho · Former CEO, Dr.G'] },
        ],
      },
      philosophy: {
        number: 'VII', title: 'Our Philosophy',
        body: 'Universities are places for the pursuit of truth, but truth realizes only half its value if it remains within academic discussion. It gains public meaning and practical force when brought into conversation with complex social reality. VAN therefore treats academic depth and social reach as equal principles. We will pursue truth with rigor, bring what we learn into society and build meaningful change through solidarity.',
        image: '/assets/p18_1_1600x613.min.jpg', alt: 'VAN staff workshop',
      },
      support: {
        title: 'Support VAN', subtitle: 'Donation Account', description: 'Donations support VAN’s continuing academic and public-interest work, youth forums, conferences and related projects.',
        bank: 'Toss Bank', account: '1002-3139-5718', holder: 'Young-il Jung · First Deputy Director, External Relations',
        guide: 'When possible, use “Your Name + VAN” as the depositor name.', example: 'Example · HongGildongVAN',
      },
      contact: { title: 'Contact', subtitle: 'Official Channels', instagram: '@veritas_van', instagramUrl: 'https://instagram.com/veritas_van', phone: '010-2685-9069', manager: 'Jeong Si-eon · Senior Secretary, Secretariat' },
    },
    archive: { eyebrow: 'VAN ARCHIVE', title: 'Activity Records', lead: 'Official records of VAN projects beyond the three representative activities shown on HOME.' },
    footer: { line: 'Balancing academic depth with social reach.', copyright: 'VAN · Veritas Academiae Nexus. All rights reserved.' },
  },
}

export function routePath(language, slug = '') {
  return `/${language}/${slug ? `${slug}/` : ''}`
}

export function basePath(pathname) {
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}${pathname}`
}

export function homeSectionPath(language, section) {
  return `${basePath(routePath(language))}#${section}`
}
