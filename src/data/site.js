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

// 화면에 나타나는 순서와 동일하게 유지한다.
export const navItems = [
  { key: 'activities', section: 'activities' },
  { key: 'about', section: 'about' },
  { key: 'people', section: 'people' },
  { key: 'future', section: 'future' },
  { key: 'philosophy', section: 'philosophy' },
  { key: 'archive', slug: 'archive' },
  { key: 'support', slug: 'support' },
  { key: 'contact', section: 'contact' },
]

/** 헤더 우측 강조 버튼. 리크루팅은 상시 메뉴가 아니라 캠페인성 CTA로 노출한다. */
export const ctaItem = { key: 'apply', slug: 'apply' }

/**
 * HOME 우측 스크롤스파이 레일에 노출할 섹션.
 * 후원은 전용 페이지로 분리했지만 HOME에도 요약 섹션이 남아 있어 레일에서는 유지한다.
 */
export const homeSections = ['activities', 'about', 'people', 'future', 'philosophy', 'support', 'contact']

/**
 * 번호를 붙이는 HOME 섹션의 화면 등장 순서.
 *
 * 번호는 이 배열의 인덱스에서 파생됩니다. 콘텐츠 데이터에 번호를 따로 적어두면
 * 섹션 순서를 바꿀 때 반드시 어긋나므로(실제로 활동 섹션을 맨 앞으로 옮겼을 때
 * 05가 먼저 보였습니다) 단일 출처로 통일했습니다.
 * 번호가 없는 섹션(콘퍼런스·후원·연락처)은 이 배열에 넣지 않습니다.
 */
export const numberedHomeSections = ['activities', 'about', 'leaders', 'advisory', 'endorsements', 'future', 'philosophy']

/** 섹션 키의 표시 번호. 배열에 없으면 빈 문자열. */
export function sectionNumber(key) {
  const index = numberedHomeSections.indexOf(key)
  return index < 0 ? '' : String(index + 1).padStart(2, '0')
}

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
      home: ['VAN | Veritas Academiae Nexus', '서울대학교·연세대학교·고려대학교의 학회 연대에서 출발해 전국 대학을 아우르는 한국대학 학회·학술 총연합체 VAN 공식 홈페이지입니다.'],
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
      scroll: '아래로 스크롤',
      donationAccount: '후원 계좌',
      bank: '은행',
      accountNumber: '계좌번호',
      holder: '예금주',
      contact: '연락처',
      instagram: '인스타그램',
      phone: '전화',
    },
    ticker: ['VERITAS', 'ACADEMIAE', 'NEXUS', '서울대학교', '연세대학교', '고려대학교', 'EST. SEOUL'],
    home: {
      hero: {
        kicker: 'EST. SEOUL · YONSEI · KOREA',
        title: 'Veritas · Academiae · Nexus',
        label: '한국대학 학회·학술 총연합체',
        lead: '서울대학교·연세대학교·고려대학교의 학회 연대에서 출발해, 전국 대학의 우수 학회와 학술단체를 포괄하는 총연합체입니다.',
        schools: ['서울대학교 · 연세대학교 · 고려대학교', '서성한 · 중경외시 · 이건동홍', '그리고 전국 주요 대학'],
        ...sharedImages,
      },
      about: {
        title: '단체 연혁 및 소개', subtitle: '연혁과 소개',
        paragraphs: [
          'VAN(Veritas Academiae Nexus)은 각 대학에 총동아리연합회가 존재하듯, 대학별 우수 학회와 학술단체를 포괄하는 한국대학 학회·학술 총연합체입니다. 서울대학교·연세대학교·고려대학교를 중심으로 형성된 학회 간 연대에서 출발하였으며, 현재는 전국 대학을 아우르는 학회·학술 연합체로 자리매김했습니다.',
          '본 연합체의 시원(始原)인 서울대·연세대·고려대 학회연합의 역사는 결코 짧지 않습니다. 각 대학 내에서 정식 인가를 받아 오랜 전통을 이어온 학회들은 수십 년간 교류를 통해 학문적 협력을 이어왔습니다. 그러나 기존의 연합 구조는 본질적인 한계를 내포하고 있었습니다.',
          '운영 체계는 학생자치단체의 선거 주기에 종속되었고, 대표 역시 소속 학회장 중심의 순환 방식으로 선출되었습니다. 학회장의 임기가 통상 한 학기에 불과한 환경에서 조직은 매 학기 사실상의 재출범을 반복할 수밖에 없었습니다. 그 과정에서 경험과 네트워크, 제도적 자산은 다음 기수의 운영을 위한 일시적 자료로 활용되는 데 그쳤고, 이를 토대로 조직의 역량과 체계를 지속적으로 발전시키는 축적의 구조는 형성되지 못했습니다.',
          '이러한 문제는 시원인 서울대·연세대·고려대 학회연합에만 국한되지 않았습니다. 총학생회를 비롯한 다수의 학생·청년 조직 역시 선거와 임기에 기반한 단기 운영 구조라는 공통된 제약 아래 놓여 있었습니다. 리더 개인의 역량과 열정이 존재하더라도, 그것이 조직적 자산으로 전환되어 다음 세대까지 계승되는 구조는 충분히 마련되지 못했습니다.',
          '이 문제의식은 Zeitgeist 서연고 사회과학 연합 컨퍼런스를 계기로 구체화되었습니다. 세 대학의 학생들이 한자리에 모여 사회 현안을 학문적으로 논의하는 과정에서, 대학 간 연대가 단순한 교류를 넘어 새로운 지적 가능성을 창출할 수 있음을 확인했습니다. 이에 각 학회장단은 단발적 협력을 넘어 지속과 축적을 전제로 하는 새로운 체계로의 전환을 결정했습니다.',
          '이후 기존의 순환적 운영 방식을 탈피하여, 학생자치기구의 임기 변화와 무관하게 작동하는 독립적·상시적 플랫폼을 구축했습니다. VAN은 연중 지속되는 학술 교류 체계와 지도교수단·전문가 자문위원단·고문단·협력기관과의 구조적 협업을 기반으로 성장해 왔습니다. 단순한 대학 간 교류를 넘어, 지식과 경험이 축적되고 다음 세대로 계승되는 지속 가능한 청년 지성 플랫폼으로 발전했습니다.',
          '현재 VAN은 세 대학의 연합을 넘어 서성한·이건동홍·중경외시 등 주요 대학을 포함하는 한국대학 학회·학술 총연합체로 자리매김했습니다. 대한민국 대학 사회의 다양한 학술 역량을 연결하고, 분야와 학교의 경계를 넘어 공동의 지적 생태계를 형성하고 있습니다.',
          '더 나아가 VAN은 세계 대학 공동체와의 연대를 추진하고 있습니다. MIT, Oxbridge, UCLA, Columbia, Toronto, NUS, UCL, NYU, Imperial College London, LSE 등 세계 주요 대학의 학생회 임원진 및 학술단체 대표들과 긴밀히 소통하며 국제적 협력 기반을 확장하고 있습니다. 장기적으로는 대한민국을 중심으로 세계 주요 대학이 참여하는 글로벌 대학 총연합체를 구축하고, 지식의 축적과 학술적 연대를 통해 미래 세대가 이어갈 새로운 대학 공동체의 기준을 확립하는 데 진력하고 있습니다.',
        ],
      },
      endorsements: {
        title: '각계의 지지와 격려', subtitle: '추천의 말',
        items: [
          { name: 'Kenneth Maxwell Nance 박사', role: '대표 상임고문', image: '/assets/p03_0_159x161.min.jpg', quote: '여러분의 방향성과 원칙, 그리고 신조가 높기에 저는 여러분께 깊은 경의를 표합니다. 세 개 대학 사이에서뿐만 아니라 전 세계에 걸쳐 협력을 구축해 나가는 여러분의 협업 수준은 참으로 존경할 만합니다. 진리·학문·연대라는 여러분의 원칙은 고귀하며, 여러분을 멀리 나아가게 할 것입니다.' },
          { name: '김성훈 교수', role: '자문위원회장', image: '/assets/p04_2_159x160.min.jpg', quote: '우리 VAN이 어떤 진영을 넘어서, 또 우리 지역을 뛰어넘어서 함께 연대하고 포용하고 협력하고 그러한 연구단체로 성장하기 바랍니다. 우리 취업의 문제 또 일자리의 문제 이런 것들을 우리 VAN의 학생들과 함께 연구하고 싶습니다.' },
          { name: '최재형', role: '전 감사원장·전 국회의원', image: '/assets/end_choi.min.jpg', quote: '오늘 우선 VAN의 새로운 출발을 진심으로 축하드립니다. 역사와 현실에 대한 정확하고 폭넓은 이해를 기반으로 여러분들의 연구와 노력을 기울여주시길 바랍니다. 우리 VAN이 길을 개척하고 보다 밝은 미래를 만드는 데 기여하는 젊은이들의 단체로 계속 성장하기를 기대합니다.' },
          { name: '박용진', role: '전 국회의원·현 규제합리화위원회 부위원장', image: '/assets/end_park.min.jpg', quote: '여러분이 추구하시겠다고 하는 학술적인 진리, 학문적 진리는 사회적 정의입니다. 진영 논리에 맞서시려면 용기를 갖고 전투적인 합리주의자가 되시기를 당부드립니다. 저와 많은 선배님들이 VAN 여러분을 응원하고 함께하겠습니다.' },
          { name: '김동아', role: '현 국회의원', image: '/assets/end_kim.min.jpg', quote: '단순히 진리만을 추구하는 것이 아니라 사회의 번영과 사회의 변화를 함께 이루겠다는 그 목표가 크게 와닿습니다. Veritas, Academiae, 그리고 Nexus. VAN의 새 출발을 축하드리고 저도 열렬히 응원하겠습니다.' },
        ],
      },
      leaders: {
        title: '대표단 소개', subtitle: '대표단',
        items: [
          { role: '대표', name: '정도대', affiliation: '연세대학교', image: '/assets/jdd_portrait2.min.jpg', careers: ['태성종합개발 부장', '국토환경뉴스 본부장', '시사평론가 · The Washington Post, The Paper 등', '북극성 정치경제연구소 겸 투자회사 부대표', 'Maxwell Leadership Institution 상임고문', 'ADONIS 교육사업체 공동대표', '서울대·연세대·고려대 사회과학 학회연 준비위원회 위원장', '연세대학교 JSC 사회과학학회 학회장 · 부학회장', '연세대학교 정치외교학과 학부 조교', '연세대학교 사회과학대 대외전략국 실무총괄', '연세대학교 총학생회 선거본부 정책국(지방선거 전담)', '연세대학교 와이들 스튜디오 부장', '연세대학교 사회과학대 범부회 총무', '청년기업인 대표 국회 라운드테이블 참여', 'WE-CAN-TALK(발달지체아동 언어학습) 개발', 'POLLITE(참여형 의회 플랫폼) 개발'] },
          { role: '부대표', name: '유수경', affiliation: '고려대학교', careers: ['고려대학교 스페인·라틴아메리카 연구소 협력', '라틴아메리카 경영전략 연구회 REÁL 부학회장', '고려대학교 총학생회 교육국원', '고려대학교 정치외교학과 학술자치국원', '고려대학교 정치외교학과 회칙개정특별위원회 위원', 'UNDP Ambassador', 'LATAM 커뮤니티 웹 개발(InBody 산학협력)'] },
          { role: '기획조정실 실장', name: '유진아', affiliation: '이화여자대학교', careers: ['Weerawong C&P 로펌 근무', 'Yuen Law LLC 로펌 근무', 'TUMUN · MUICMUN · THAIMUN 의장', 'Yale MUN WHO 대표단', 'Singapore MUN Press', '유엔 총회(UNGA) 제1위원회 국가대표단', '한국 PTPI 운영진', '이화여대 PTPI 운영진'] },
        ],
      },
      advisory: {
        title: '자문위원회', subtitle: '자문위원회',
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
        title: '최근 활동 및 성과', subtitle: '최근 활동과 성과',
        intro: 'VAN은 학술 연구와 사회적 담론을 연결하는 다양한 프로젝트를 수행하고 있습니다.',
        domainsTitle: '일곱 개 분야',
        domains: [
          { field: 'Academia', kr: '학술', items: ['SKY Zeitgeist 서연고 사회과학 연합 컨퍼런스', 'VAN Renaissance 2025 학술 컨퍼런스', '2026 VAN 컨퍼런스 대격변의 시대, 혁신을 묻다', '공동 저서 『선 위에 선 우리들』 발간', '상설연구조직 격주 정기 세미나'] },
          { field: 'Technology', kr: '기술', items: ['AI 의회 플랫폼 POLLITE 개발·운영', 'AI 혁신부 업무 자동화 및 AI Researcher 개발', '선거 시뮬레이션·기사 제작·금융 리서치 에이전트'] },
          { field: 'Finance', kr: '상경', items: ['한국형 버큰로드 리포트 프로젝트', '중소형 상장기업 독립 기업분석 보고서 발간', '기업 방문·경영진 인터뷰 기반 가치평가'] },
          { field: 'Education', kr: '교육', items: ['아프리카 교육 플랫폼 개발 프로젝트 JENGA', '청년정치학교 운영모델 설계', '한국 리더십학교 설립 논의', '연세대학교 X VAN 시민 기술 프론티어 양성 과정'] },
          { field: 'Media', kr: '언론', items: ['청년 독립언론 The Sheerit 창간 추진', '지방선거 후보자 단독 인터뷰 제작·보도', '영상·카드뉴스 등 자체 콘텐츠 제작'] },
          { field: 'Governance', kr: '정법', items: ['한국지뢰제거연구소 공동 정책보고서 DMZ 500km 평화 숲길', '법률안 분석 및 입법 개선 프로젝트', '정책전시회 개최 및 후보 공약 채택'] },
          { field: 'Alliance', kr: '연대', items: ['세계 주요 대학 학생회·학술단체와의 네트워크 구축', '전·현직 국회의원 초청 간담회', '대학 학회·청년단체와의 연합 프로그램'] },
        ],
        items: [
          { title: 'POLLITE', summary: '자체 개발한 생성형 AI 및 클라우드 기술을 기반으로 의정활동 정보의 접근성을 높이고 시민 참여를 확장하는 정책·기술 융합 프로젝트입니다.', image: '/assets/p05_0_547x417.min.jpg', alt: '청년 기업인 라운드테이블에서 안철수 의원과 인사하는 VAN 대표' },
          { title: 'SKY Zeitgeist 2025', summary: '서울대학교·연세대학교·고려대학교 소속 사회과학 학회가 연구 성과와 이론적 논의를 공유한 연합 학술 교류 프로그램입니다.', image: '/assets/p06_0_1348x758.min.jpg', alt: 'SKY Zeitgeist 2025 단체사진' },
          { title: 'VAN Renaissance 2025', summary: '100인 이상이 참여해 국제 정치 및 사회 현안을 주제로 발표와 토론을 진행하고 청년 주도의 공론장 모델을 제시한 학술 컨퍼런스입니다.', image: '/assets/renaissance_full.min.jpg', alt: 'VAN Renaissance 2025 단체사진' },
        ],
      },
      future: {
        title: '향후 활동 계획', subtitle: '앞으로의 길',
        items: [
          { number: '01', title: '연합 학술 컨퍼런스 개최', items: ['연 1~2회 연합 학술 컨퍼런스 개최', '학계·정치권·산업계가 결합된 하이브리드 공론장 모델 구축'] },
          { number: '02', title: '전국 학술 네트워크 고도화', items: ['서울대·연세대·고려대를 축으로 한 학회 연합 정교화', '서성한·이건동홍·중경외시를 포함한 전국 단위 학술 네트워크 확장', '지도교수단·자문위원단·상설연구조직 기반의 지속 가능한 학술 거버넌스 구축'] },
          { number: '03', title: '글로벌 대학 총연합체 구축', items: ['MIT·Oxbridge·UCLA·Columbia·NUS·LSE 등 세계 주요 대학 학생회·학술단체와의 협력 확대', '국가별 VAN 지사 설립과 다국가 공동 세미나·해커톤 운영', '공동성명서·공동 연구·출판을 통한 국제 학술 협력 기반 형성'] },
          { number: '04', title: '정책·연구 플랫폼 구축', items: ['국회·지자체·공공기관·연구소 협력 정책 연구 수행', '청년 학술·정치 협업 모델 구축', '자체 정책 보고서 및 학술지 발간을 통한 지식 생산 체계화'] },
          { number: '05', title: '차세대 인재 양성', items: ['「한국청년정치학교」 프로그램 운영', '「한국리더십학교」 프로그램 운영'] },
          { number: '06', title: '온라인·미디어 기반 공공 담론 확산', items: ['자체 인터뷰·팟캐스트·영상 콘텐츠 제작 및 확산', '국회·지자체·선거캠프 등과 공동 영상 제작', '참여형 의회 플랫폼 POLLITE 고도화'] },
        ],
      },
      conference: {
        eyebrow: '대표 연례 사업 · VAN Conference 2026', title: '대격변의 시대, 혁신을 묻다', englishTitle: 'The Arena of Innovation · 2026',
        description: '2026년에서 2050년으로 향하는 하나의 여정으로 설계된 대규모 청년 컨퍼런스입니다. 참가자를 청중이 아니라 선택·질문·투표의 주체로 참여시켜, 상아탑에서 축적한 학문적 내실이 현실의 의제와 맞닿는 자리를 만듭니다.',
        facts: [['일시', '2026. 09. 12. (토) 14:00–18:00'], ['장소', '숙명여자대학교 눈꽃광장홀'], ['규모', '서울권 대학생·청년 800명 내외'], ['참여단체', '80개 이상']],
        program: ['세션 1 · 기술혁신 「현재에서 미래를 묻다 — 2026 대한민국 미래 재건」', '세션 2 · 사회·정치혁신 「미래에서 현재를 답하다 — 2050 대한민국 미래 대선」', '종합 디스커션 · 참가자가 직접 답하는 참여형 토론', 'Networking Night with Alumni'],
        programNote: '세션 1은 안보·AI·양자컴퓨팅·노동 등 여섯 개의 미래 체크포인트(2030·2035·2040·2045·2047·2050)에서 참가자가 직접 선택을 내리는 몰입형 세션입니다. 세션 2는 2050년을 경험한 현직 국회의원들이 대선 후보가 되어 국가 비전을 제시하고, 관객이 유권자가 되어 검증·질의·투표하는 대선 토론회입니다.',
        sessions: [
          { title: '세션 1 · 기술혁신', people: ['Kenneth Maxwell Nance · 前 미군 인트라넷 개편 총괄 · 미국 대통령상 4회 수상 · Amazon 선정 세계 50대 리더', '김성혁 · LG전자 CTO부문 차세대컴퓨팅연구소 상무 · 한국양자산업협회 회장', '임영일 · 국방기술진흥연구소 초대 소장 · 前 방위사업청 화력사업부장', '김진홍 · 국방융복합기술연구소 부소장 · 지엘테크 부사장 · 前 공군 방공유도탄사령관', '이광희 · VIV Tech CTO · 前 Boeing Korea AI Tech Lead'] },
          { title: '세션 2 · 사회·정치혁신', people: ['김동아 · 현 서대문(갑) 국회의원 · 더불어민주당 청년미래연석회의 의장', '손솔 · 현 비례대표 국회의원 · 진보당 경기 화성시 동탄구 지역위원장', '조정훈 · 현 마포(갑) 국회의원 · 국민의힘 인재영입위원장'] },
          { title: '주요 내빈 · 알럼나이', people: ['곽상언 · 제22대 국회의원(서울 종로구) · 산업통상자원중소벤처기업위원회 위원', 'Emmy Jerono KIPSOI · 주한 케냐대사', '문시연 · 숙명여자대학교 총장', '양정호 · 성균관대학교 교육학과 교수 · 前 사회부총리 겸 교육부장관 사회정책자문위원장', '이혜림 · 고려대학교 미디어학과 교수', '이효종 · 과학 커뮤니케이터 과학쿠키'] },
        ],
        partnersTitle: '소속 및 협력·후원 단체',
        partners: ['연세대학교', '현대산업개발 iPARK', 'Maxwell Leadership Institution', '북극성정치경제연구소', 'POLLITE', '비스타컴', '유가네', '촬영·영상 협력 · 중앙대 반영 · 서강대 서광회 · 이화여대 IMAGIST · 고려대 호영회', '통·번역 협력 · 성균관대 TIME · 고려대 KITE'],
      },
      philosophy: {
        title: '단체 철학',
        body: '대학(원)은 진리를 탐구하는 상아탑입니다. 그러나 그 진리가 학내와 학계의 담론에만 머문다면 그 가치는 절반만 실현될 뿐입니다. 진리는 사회의 복잡한 현실에 비추어질 때 비로소 공적 의미를 획득하며, 실천적 힘을 갖게 됩니다. 그러나 우리는 또 다른 위험 역시 경계합니다. 진리를 외부로 전달하는 과정만을 과도하게 강조할 경우, 정작 그 토대가 되어야 할 학문적 깊이와 학술적 엄밀성이 약화될 수 있기 때문입니다. 따라서 VAN은 ‘학문적 내실(內實)’과 ‘사회적 확장성(擴張性)’이라는 두 축의 균형을 조직 운영의 근본 원칙으로 삼습니다. 진리를 성실히 탐구하고, 탐구된 진리를 사회에 비추며, 연대를 통해 학계와 사회에 의미 있는 변화를 만들어 나가겠습니다.',
        image: '/assets/p18_1_1600x613.min.jpg', alt: 'VAN 실무진 내부 업무 워크숍',
      },
      support: {
        title: '후원 계좌', subtitle: '후원 안내', description: '후원금은 VAN의 지속적인 학술·공익 활동, 청년 공론장 조성, 컨퍼런스 및 연계 프로젝트 운영을 위한 재원으로 소중히 사용됩니다.',
        bank: '토스뱅크', account: '1002-3139-5718', holder: '정영일 · VAN 교류진흥부 제1차장',
        guide: '입금자명은 가급적 “성함+VAN후원” 형식으로 기재해주시기 바랍니다.', example: '예시 · 홍길동VAN후원',
      },
      contact: { title: '연락처', subtitle: '연락처', instagram: '@veritas_van', instagramUrl: 'https://instagram.com/veritas_van', phone: '010-3702-3101', email: 'veritas_van@naver.com', manager: '기획조정실 실장 유진아' },
    },
    archive: { eyebrow: 'VAN ARCHIVE', title: '활동 기록', lead: 'HOME에 소개한 대표 활동 외 VAN의 학술·정책·공론장·미디어 활동을 기록합니다.' },
    footer: { line: '학문적 내실과 사회적 확장성의 균형을 추구합니다.', copyright: 'VAN · Veritas Academiae Nexus. All rights reserved.' },
  },
  en: {
    languageName: 'English', skip: 'Skip to content', menu: 'Menu',
    nav: { home: 'Home', about: 'About', people: 'People', activities: 'Work', future: 'Roadmap', philosophy: 'Principles', support: 'Support', archive: 'Archive', contact: 'Contact', apply: 'Join 26-2' },
    meta: {
      home: ['VAN | Veritas Academiae Nexus', 'The official website of VAN, a federation of academic societies across Korean universities, founded on an alliance among Seoul National, Yonsei and Korea University.'],
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
      scroll: 'Scroll',
      donationAccount: 'Donation account',
      bank: 'Bank',
      accountNumber: 'Account',
      holder: 'Holder',
      contact: 'Contact',
      instagram: 'Instagram',
      phone: 'Phone',
    },
    ticker: ['VERITAS', 'ACADEMIAE', 'NEXUS', 'SEOUL NATIONAL', 'YONSEI', 'KOREA UNIVERSITY', 'EST. SEOUL'],
    home: {
      hero: {
        kicker: 'EST. SEOUL · YONSEI · KOREA', title: 'Veritas · Academiae · Nexus', label: 'Korean Universities Academic Federation',
        lead: 'Founded on an alliance among Seoul National, Yonsei and Korea University, now a federation of leading academic societies across Korea.',
        schools: ['Seoul National · Yonsei · Korea University', 'Sogang · Sungkyunkwan · Hanyang and more', 'Universities nationwide'], ...sharedImages,
      },
      about: {
        title: 'History & Introduction', subtitle: 'About VAN',
        paragraphs: [
          'VAN (Veritas Academiae Nexus) is a federation of leading academic societies across Korean universities, much as each campus has its own council of student societies. It began as an alliance among societies at Seoul National University, Yonsei University and Korea University, and now spans universities nationwide.',
          'The alliance among those three universities is not new. Societies formally recognised on each campus had cooperated for decades. But the structure carried a built-in limit.',
          'Operations were tied to student-government election cycles, and the leadership rotated among sitting society presidents. With terms typically lasting a single semester, the organisation effectively relaunched itself every term. Experience, networks and institutional assets served only as handover material and never accumulated into lasting capability.',
          'This was not unique to the three-university alliance. Student councils and youth organisations face the same constraint of short, election-bound terms. However capable an individual leader, little of that converted into assets the next generation could inherit.',
          'The Zeitgeist joint social-science conference brought the problem into focus. Students from the three universities saw that inter-university solidarity could create genuinely new intellectual possibilities rather than mere exchange. The participating society leaders resolved to move from one-off cooperation to a structure built for continuity and accumulation.',
          'VAN therefore left the rotating model behind and built an independent, year-round platform that operates regardless of student-office terms. It has grown on continuous academic exchange and structured cooperation with faculty advisers, professional advisers and partner institutions.',
          'Today VAN reaches beyond the founding three to include Sogang, Sungkyunkwan, Hanyang and other major universities, connecting academic capability across institutions and disciplines into a shared intellectual ecosystem.',
          'VAN is also building ties with the global university community, in close contact with student leaders and academic society representatives at MIT, Oxbridge, UCLA, Columbia, Toronto, NUS, UCL, NYU, Imperial College London and LSE among others. The long-term aim is a global federation of universities centred on Korea, and a standard for the university community that future generations can carry forward.',
        ],
      },
      endorsements: {
        title: 'Featured Endorsement', subtitle: 'Messages of support from public and academic leaders',
        items: [
          { name: 'Dr. Kenneth Maxwell Nance', role: 'Principal Senior Adviser', image: '/assets/p03_0_159x161.min.jpg', quote: 'Your level of collaboration is admirable, not only among three universities, but in establishing collaboration around the world. Your principles of truth, scholarship and solidarity are noble and will take you far.' },
          { name: 'Professor Kim Sung-hoon', role: 'Chair, Advisory Council', image: '/assets/p04_2_159x160.min.jpg', quote: 'I hope VAN grows beyond political camps and regions into a research organization that practices solidarity, inclusion and cooperation.' },
          { name: 'Choi Jae-hyung', role: 'Former Chair, Board of Audit and Inspection · Former National Assembly Member', image: '/assets/end_choi.min.jpg', quote: 'I hope VAN continues to grow as an organization of young people who open difficult paths and help build a brighter future through a broad and accurate understanding of history and reality.' },
          { name: 'Park Yong-jin', role: 'Former National Assembly Member', image: '/assets/end_park.min.jpg', quote: 'Academic truth is also social justice. I encourage you to meet factional logic with courage and rigorous rationalism. Many senior colleagues and I will stand with VAN.' },
          { name: 'Kim Dong-ah', role: 'Member of the National Assembly', image: '/assets/end_kim.min.jpg', quote: 'The goal of pursuing truth while contributing to social prosperity and change resonates strongly. Congratulations on VAN’s new beginning.' },
        ],
      },
      leaders: {
        title: 'Leadership', subtitle: 'Representative Council',
        items: [
          { role: 'Representative', name: 'Dodae Jung', affiliation: 'Yonsei University', image: '/assets/jdd_portrait2.min.jpg', careers: ['Director, Taesung Development', 'Bureau chief, Kukto Environment News', 'Political commentator for The Washington Post and The Paper', 'Vice representative, Polaris Institute of Political Economy', 'Standing adviser, Maxwell Leadership Institution', 'Co-founder, ADONIS education venture', 'Chair, SNU–Yonsei–Korea Social Science Federation Preparatory Committee', 'President and Vice President, Yonsei JSC Social Science Society', 'Operations lead, External Strategy Bureau, Yonsei College of Social Sciences', 'Developer of WE-CAN-TALK language learning and the POLLITE civic platform'] },
          { role: 'Vice Representative', name: 'Sookyung Yoo', affiliation: 'Korea University', careers: ['Partner, Institute of Spanish and Latin American Studies, Korea University', 'Vice President, REÁL Latin America Management Strategy Society', 'Education Bureau, Korea University Student Council', 'Academic Self-Governance Bureau, Department of Political Science and International Relations', 'Member, Special Committee on Charter Revision', 'UNDP Ambassador', 'LATAM community web development (industry project with InBody)'] },
          { role: 'Chief, Planning and Coordination Office', name: 'Jina Yu', affiliation: 'Ewha Womans University', careers: ['Weerawong C&P', 'Yuen Law LLC', 'Chair of TUMUN, MUICMUN and THAIMUN', 'Yale MUN WHO delegation', 'Singapore MUN Press', 'National delegation, First Committee, UN General Assembly', 'Organising team, PTPI Korea', 'Organising team, PTPI Ewha'] },
        ],
      },
      advisory: {
        title: 'Advisory Council', subtitle: 'Academic and Strategic Guidance',
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
        title: 'Recent Activities & Achievements', subtitle: 'Connecting scholarship with public discourse',
        intro: 'VAN conducts projects that connect academic research, policy and public discourse.',
        domainsTitle: 'Seven fields',
        domains: [
          { field: 'Academia', kr: 'Scholarship', items: ['SKY Zeitgeist joint social-science conference', 'VAN Renaissance 2025 academic conference', 'VAN Conference 2026 · The Arena of Innovation', 'Co-authored essay anthology On the Line', 'Fortnightly seminars of the standing research organisation'] },
          { field: 'Technology', kr: 'Technology', items: ['POLLITE, an AI platform for parliamentary information', 'Workflow automation and AI Researcher development', 'Election simulation, article production and financial research agents'] },
          { field: 'Finance', kr: 'Business', items: ['Burkenroad-style equity research project', 'Independent analyst reports on small and mid-cap listed companies', 'Valuation grounded in company visits and management interviews'] },
          { field: 'Education', kr: 'Education', items: ['JENGA, an education platform for Africa', 'Operating model for a youth politics school', 'Discussions on founding a Korean leadership school', 'Yonsei × VAN civic-tech frontier programme'] },
          { field: 'Media', kr: 'Media', items: ['Launching The Sheerit, an independent youth press', 'Exclusive interviews with local-election candidates', 'In-house video and card-news content'] },
          { field: 'Governance', kr: 'Law & Policy', items: ['Joint policy report on the 500km DMZ Peace Forest Trail', 'Legislative analysis and reform project', 'Policy exhibition and pledges adopted by candidates'] },
          { field: 'Alliance', kr: 'Solidarity', items: ['Networks with student bodies and societies at major world universities', 'Roundtables with current and former Assembly members', 'Joint programmes with university societies and youth organisations'] },
        ],
        items: [
          { title: 'POLLITE', summary: 'A policy-and-technology project using generative AI and cloud infrastructure to make legislative information more accessible and expand civic participation.', image: '/assets/p05_0_547x417.min.jpg', alt: 'VAN representative at a young entrepreneur roundtable' },
          { title: 'SKY Zeitgeist 2025', summary: 'A joint academic exchange where social-science societies from Seoul National, Yonsei and Korea University presented research and held floor discussions.', image: '/assets/p06_0_1348x758.min.jpg', alt: 'SKY Zeitgeist 2025 group photo' },
          { title: 'VAN Renaissance 2025', summary: 'An academic conference of more than 100 participants featuring presentations and debate on international politics and social issues.', image: '/assets/renaissance_full.min.jpg', alt: 'VAN Renaissance 2025 group photo' },
        ],
      },
      future: {
        title: 'The Road Ahead', subtitle: 'Future Activities',
        items: [
          { number: '01', title: 'Joint Academic Conferences', items: ['Hold one or two joint academic conferences each year', 'Develop a hybrid public-forum model linking academia, politics and industry'] },
          { number: '02', title: 'A Stronger Nationwide Academic Network', items: ['Refine the alliance anchored by SNU, Yonsei and Korea University', 'Extend the network nationwide, including Sogang, Sungkyunkwan and Hanyang', 'Build sustainable academic governance around faculty advisers, professional advisers and standing research teams'] },
          { number: '03', title: 'A Global Federation of Universities', items: ['Expand cooperation with student bodies and academic societies at MIT, Oxbridge, UCLA, Columbia, NUS and LSE', 'Establish national VAN chapters and run multi-country seminars and hackathons', 'Build international academic cooperation through joint statements, research and publishing'] },
          { number: '04', title: 'Policy & Research Platform', items: ['Conduct policy research with public institutions and research organizations', 'Build models for cooperation between young scholars and politics', 'Systematize knowledge production through policy reports and academic publications'] },
          { number: '05', title: 'Next-Generation Leadership', items: ['Operate the Korea Youth Politics School', 'Operate the Korea Leadership School'] },
          { number: '06', title: 'Public Discourse Through Media', items: ['Create interviews, podcasts and video content', 'Produce collaborative media with public institutions and civic partners', 'Advance the participatory parliamentary platform POLLITE'] },
        ],
      },
      conference: {
        eyebrow: 'Flagship Annual Initiative · VAN Conference 2026', title: 'Questioning Innovation in an Era of Upheaval', englishTitle: 'The Arena of Innovation · 2026',
        description: 'A large-scale youth conference designed as a single journey from 2026 to 2050. Participants join not as an audience but as decision-makers who choose, question and vote, bringing academic depth into contact with real public agendas.',
        facts: [['Date', '12 September 2026 · 14:00–18:00'], ['Venue', 'Snowflake Square Hall, Sookmyung Women’s University'], ['Scale', 'Around 800 university students and young people'], ['Participating groups', '80 or more']],
        program: ['Session 1 · Technology — Asking the Future from the Present: Rebuilding Korea 2026', 'Session 2 · Society & Politics — Answering the Present from the Future: Korea 2050 Election', 'General discussion · participants answer the questions themselves', 'Networking Night with Alumni'],
        programNote: 'Session 1 is an immersive format in which participants make their own choices at six future checkpoints (2030, 2035, 2040, 2045, 2047, 2050) across security, AI, quantum computing and labour. In Session 2, sitting lawmakers return as 2050 presidential candidates to present national visions while the audience acts as voters who scrutinise, question and vote.',
        sessions: [
          { title: 'Session 1 · Technology', people: ['Kenneth Maxwell Nance · led the redesign of the U.S. military intranet · four-time U.S. Presidential Award recipient · Amazon Top 50 leader', 'Kim Sung-hyuk · Executive, Next-Generation Computing Lab, LG Electronics CTO Division · Chair, Korea Quantum Industry Association', 'Lim Young-il · founding head, Korea Research Institute for Defense Technology Planning and Advancement', 'Kim Jin-hong · Deputy head, Defense Convergence Technology Institute · former Air Defense Guided Missile Commander', 'Lee Kwang-hee · CTO, VIV Tech · former AI Tech Lead, Boeing Korea'] },
          { title: 'Session 2 · Society & Politics', people: ['Kim Dong-ah · Member of the National Assembly (Seodaemun A) · Chair, Democratic Party Youth Future Council', 'Son Sol · Member of the National Assembly (proportional) · Progressive Party', 'Cho Jung-hoon · Member of the National Assembly (Mapo A) · Chair, People Power Party Talent Recruitment Committee'] },
          { title: 'Guests & Alumni', people: ['Kwak Sang-eon · Member of the National Assembly (Jongno, Seoul)', 'Emmy Jerono Kipsoi · Ambassador of Kenya to Korea', 'Moon Si-yeon · President, Sookmyung Women’s University', 'Yang Jung-ho · Professor of Education, Sungkyunkwan University', 'Lee Hye-rim · Professor of Media, Korea University', 'Lee Hyo-jong · science communicator, Science Cookie'] },
        ],
        partnersTitle: 'Affiliations, partners and sponsors',
        partners: ['Yonsei University', 'HDC iPARK', 'Maxwell Leadership Institution', 'Polaris Institute of Political Economy', 'POLLITE', 'Vistacom', 'Yuganae', 'Film and video partners · Chung-Ang Banyoung · Sogang Seogwanghoe · Ewha IMAGIST · Korea Univ. Hoyounghoe', 'Interpretation and translation · SKKU TIME · Korea Univ. KITE'],
      },
      philosophy: {
        title: 'Our Philosophy',
        body: 'Universities are places for the pursuit of truth, but truth realises only half its value if it remains within academic discussion. It gains public meaning and practical force when brought into conversation with complex social reality. We are wary of the opposite risk as well: if the work of carrying truth outward is over-emphasised, the academic depth and rigour that should underpin it can weaken. VAN therefore treats academic depth and social reach as equal principles. We will pursue truth with rigour, bring what we learn into society and build meaningful change through solidarity.',
        image: '/assets/p18_1_1600x613.min.jpg', alt: 'VAN staff workshop',
      },
      support: {
        title: 'Support VAN', subtitle: 'Donation Account', description: 'Donations support VAN’s continuing academic and public-interest work, youth forums, conferences and related projects.',
        bank: 'Toss Bank', account: '1002-3139-5718', holder: 'Young-il Jung · First Deputy Director, External Relations',
        guide: 'When possible, use “Your Name + VAN” as the depositor name.', example: 'Example · HongGildongVAN',
      },
      contact: { title: 'Contact', subtitle: 'Official Channels', instagram: '@veritas_van', instagramUrl: 'https://instagram.com/veritas_van', phone: '010-3702-3101', email: 'veritas_van@naver.com', manager: 'Jina Yu · Chief of the Planning and Coordination Office' },
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
