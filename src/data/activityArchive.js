export const archiveCategories = ['FORUM', 'POLICY', 'MEDIA', 'NETWORK']

export const archiveLabels = {
  ko: {
    searchLabel: '활동 기록 검색',
    searchPlaceholder: '제목 또는 내용 검색',
    filterLabel: '분류 선택',
    all: '전체',
    read: '기록 보기',
    results: '개의 기록',
    empty: '검색 조건에 맞는 활동 기록이 없습니다.',
    back: '활동 기록으로 돌아가기',
    record: '공식 활동 기록',
    related: 'VAN의 다른 활동도 살펴보세요.',
  },
  en: {
    searchLabel: 'Search activity records',
    searchPlaceholder: 'Search titles or summaries',
    filterLabel: 'Filter by category',
    all: 'ALL',
    read: 'View record',
    results: 'records',
    empty: 'No activity records match your search.',
    back: 'Back to activity records',
    record: 'OFFICIAL ACTIVITY RECORD',
    related: 'Explore more of VAN’s work.',
  },
}

export const archiveItems = {
  ko: [
    {
      slug: 'youth-roundtable-park-yong-jin',
      category: 'FORUM',
      title: '박용진 전 의원과의 청년 간담회',
      excerpt: '여의도 국회의사당 인근에서 토크콘서트 형식으로 진행한 청년 정책 간담회입니다.',
      cover: '/assets/p10_1_1128x751.min.jpg',
      coverAlt: '박용진 전 의원과의 청년 간담회',
      body: [
        '해당 간담회는 여의도 국회의사당 인근에서 개최되었으며, 박용진 전 국회의원이 참여하여 토크콘서트 형식으로 진행되었습니다.',
        '참여자들이 자유롭게 질문을 제시하고 이에 대해 응답하는 방식으로 운영되었고, 한국 정치 및 주요 정책 이슈에 대한 실질적인 의견 교환이 이루어졌습니다. 청년층이 정치적 논의에 능동적으로 참여할 수 있는 환경을 조성하였습니다.',
      ],
    },
    {
      slug: 'dmz-peace-trail-policy-report',
      category: 'POLICY',
      title: '한국지뢰제거연구소와의 공동 정책 보고서',
      excerpt: 'DMZ 500km 평화 숲길의 단계적 전환 모델을 주제로 공동 정책 제안서를 완성했습니다.',
      cover: '/assets/p11_0_1243x920.min.jpg',
      coverAlt: 'DMZ 평화 숲길 공동 정책 보고서',
      body: [
        'VAN 상설연구조직은 한국지뢰제거연구소와 공동으로 ‘DMZ 500km 평화 숲길의 단계적 전환 모델’을 주제로 한 정책 제안서를 완성하였습니다.',
        '본 제안서는 DMZ를 안보 억지 구조, 잔류 위험 구조, 폐쇄적 생태 구조가 중첩된 복합 공간으로 재정의하고, 현상 유지가 안전·법제·생태 측면에서 누적 손실을 야기하고 있다는 문제의식에서 출발하였습니다.',
        '정책의 핵심은 IMAS(국제 지뢰행동 표준) 기반의 과학적 접근을 토대로 ① 위험·생태 통합 기초조사, ② 저민감도 지역 시범사업, ③ 청년 평화·생태 순환형 연구·교육 플랫폼 구축의 3단계로 구성되며, 전면 개방이 아닌 단계적·제한적 전환을 원칙으로 합니다.',
        'VAN과 한국지뢰제거연구소는 관련 단체들과 국회 또는 종로 일대에서 공동포럼 및 정책토론회 개최를 추진하고 있습니다.',
      ],
    },
    {
      slug: 'local-election-policy-program',
      category: 'POLICY',
      title: '6.3 지방선거 연계 활동',
      excerpt: '정책전시회를 열고 지방선거 후보자들과 지역 현안 기반 정책을 공동 개발했습니다.',
      cover: '/assets/p12_3_505x673.min.jpg',
      coverAlt: 'VAN 정책전시회 현장',
      body: [
        '6.3 지방선거 당시 VAN은 시민들이 정책 의제를 보다 직관적으로 이해할 수 있도록 「VAN 정책전시회」를 개최하였습니다.',
        '텍스트 중심 정책 자료의 접근성 문제를 해결하기 위해 각 정책 의제를 현대미술 등 시각예술 작품으로 재구성하고, 성균관대학교 미술대학과 협업해 큐레이터 해설을 병행했습니다. 경로당 등 지역 현장을 직접 방문해 수백여 명의 시민에게 주요 지방선거 및 지역사회 의제를 설명했습니다.',
        'VAN은 후보자들과 공동으로 지역 현안 기반 정책을 개발했으며, 그중 「경기도 청년 AI 실무 클래스 체계화」 정책보고서는 실제 후보 공약으로 채택되었습니다. 해당 보고서는 단발성 AI 교육을 기초·심화·프로젝트형 단계 교육으로 고도화하는 청년 실무역량 강화 모델을 담았습니다.',
      ],
    },
    {
      slug: 'interviews-and-media',
      category: 'MEDIA',
      title: '내부 자체 인터뷰 및 외부 언론 인터뷰',
      excerpt: '청년 정치와 지역 현안을 다룬 언론 인터뷰 및 후보자 심층 인터뷰를 진행했습니다.',
      cover: '/assets/int_moon_1.min.jpg',
      coverAlt: 'VAN 특별 인터뷰팀의 문성호 후보 인터뷰',
      gallery: [
        { image: '/assets/int_moon_2.min.jpg', alt: '문성호 후보 밸런스 게임 인터뷰' },
        { image: '/assets/int_jung_1.min.jpg', alt: '정형배 후보 단독 인터뷰' },
        { image: '/assets/int_jung_2.min.jpg', alt: '정형배 후보 인터뷰 현장' },
      ],
      body: [
        '월간중앙 2026년 5월호의 6.3 지방선거 기획 기사에 VAN 대표가 인터뷰이로 참여해, 청년 정치가 공천 구조에 종속되고 청년이 실질적 정치 주체가 아닌 동원 자원으로 소비되는 문제를 지적했습니다.',
        'VAN 특별인터뷰팀은 문성호 서울시의원 후보와 심층 인터뷰를 진행해 서부선 정상화, 강북횡단선 예비타당성 조사 제도 개선, 장애인 맞춤형 복지, 저탄소 환경 신기술 도입 공약을 검증했습니다. 약 1시간 분량의 풀영상과 연계 쇼츠, 전문 기사를 자체 제작했습니다.',
        '또한 정형배 경기도의원 후보와의 심층 인터뷰에서 1기 신도시 재건축, 자족도시 전환, GTX 연계 교통망, 포켓정원 등 지역 공약을 검증하고 풀영상·쇼츠·전문 기사로 제작했습니다.',
      ],
    },
    {
      slug: 'academic-networking',
      category: 'NETWORK',
      title: '타 단체 및 학회와의 네트워킹',
      excerpt: '학회 간 연합 프로그램과 산학협력 논의를 통해 공동 프로젝트 운영 경험을 축적했습니다.',
      cover: '/assets/p15_0_448x216.min.jpg',
      coverAlt: 'VAN X 고려대학교 POLITIKA 연합 모의선거대회',
      gallery: [
        { image: '/assets/p16_0_540x308.min.jpg', alt: '내일을 준비하는 사람들 특별세미나' },
        { image: '/assets/p16_1_604x217.min.jpg', alt: '특별세미나 참석 인사' },
        { image: '/assets/p17_0_374x229.min.jpg', alt: 'VAN 대표진과 차진아 교수' },
      ],
      body: [
        'VAN X 고려대학교 POLITIKA 연합 모의선거대회는 지방선거의 주요 절차와 정치적 의사결정 과정을 참여형 시뮬레이션으로 재구성한 공동 프로그램입니다. 참가자들은 정당 또는 후보 역할을 맡아 정책 공약을 설계하고 토론과 개표 과정을 체험했습니다.',
        '서강대학교 인공지능학회, 프로젝트학회 릴리즈, 웹개발 학회 CNU, 인사이트 학회와 산학협력 논의 간담회를 주최했으며, OVAL KOREA 및 성균관대·경북대 등 주요 대학 단체와도 협력 가능성을 논의했습니다.',
        '2026년 5월 11일 한국프레스센터에서 열린 ‘내일을 준비하는 사람들’ 창립 기념 특별세미나에 특별초청되어 참석하고, 향후 VAN 차원의 실질적 협력 방안을 모색했습니다.',
      ],
    },
    {
      slug: 'political-system-reform-dialogue',
      category: 'FORUM',
      title: '한국의 양당제 타파와 제도 개혁 논의',
      excerpt: '유인택 전 의원과 한국 양당제의 구조적 한계와 제도개혁 과제를 논의했습니다.',
      body: [
        '국회 인근에서 유인택 전 의원을 모시고 ‘한국 양당제의 구조적 한계와 제도개혁의 과제’를 주제로 정책 논의를 진행했습니다.',
        '현행 양당 중심 정치질서가 한국 정치의 대표성, 다양성, 책임정치에 미치는 영향을 점검하고, 이를 극복하기 위한 제도개혁의 방향성과 현실적 실행 가능성에 대해 의견을 나누었습니다.',
        '유 전 의원도 해당 문제의식에 공감을 표했으며, 향후 관련 연구·토론·공론화 프로젝트를 함께 모색해 나갈 수 있다는 데 뜻을 같이했습니다.',
      ],
    },
  ],
  en: [
    {
      slug: 'youth-roundtable-park-yong-jin', category: 'FORUM', title: 'Youth Roundtable with Former Assembly Member Park Yong-jin',
      excerpt: 'A town-hall-style youth policy conversation held near the National Assembly in Yeouido.',
      cover: '/assets/p10_1_1128x751.min.jpg', coverAlt: 'Youth roundtable with Park Yong-jin',
      body: ['Former National Assembly Member Park Yong-jin joined a town-hall-style roundtable near the National Assembly.', 'Participants raised questions freely and exchanged views on Korean politics and major policy issues, creating space for young people to take an active role in political discussion.'],
    },
    {
      slug: 'dmz-peace-trail-policy-report', category: 'POLICY', title: 'Joint Policy Report with the Korea Mine Action Research Institute',
      excerpt: 'A joint proposal for the phased transition of a 500-kilometer DMZ peace-forest trail.',
      cover: '/assets/p11_0_1243x920.min.jpg', coverAlt: 'DMZ peace trail policy report',
      body: ['VAN’s standing research organization and the Korea Mine Action Research Institute completed a policy proposal on a phased transition model for a 500-kilometer DMZ peace-forest trail.', 'The proposal reframes the DMZ as a complex space where deterrence, residual risk and closed ecological systems overlap.', 'Its three stages are an integrated risk-and-ecology survey, pilot projects in low-sensitivity areas and a circular youth research and education platform for peace and ecology. The proposal favors limited, phased transition rather than full opening.', 'VAN and the Institute are exploring joint forums and policy discussions with relevant organizations.'],
    },
    {
      slug: 'local-election-policy-program', category: 'POLICY', title: 'Local-Election Policy Program',
      excerpt: 'A public policy exhibition and collaborative development of local policy proposals with election candidates.',
      cover: '/assets/p12_3_505x673.min.jpg', coverAlt: 'VAN policy exhibition',
      body: ['VAN held a policy exhibition during the local-election period so that citizens could understand policy agendas more intuitively.', 'Working with Sungkyunkwan University’s College of Art, the team translated text-heavy policy material into visual-art works with curator explanations and brought the exhibition to community sites.', 'VAN also worked with candidates on local policy. A report proposing a structured practical AI program for young people in Gyeonggi Province was adopted as a candidate pledge.'],
    },
    {
      slug: 'interviews-and-media', category: 'MEDIA', title: 'In-house and External Media Interviews',
      excerpt: 'Media and candidate interviews examining youth politics and local policy agendas.',
      cover: '/assets/int_moon_1.min.jpg', coverAlt: 'VAN special interview team',
      gallery: [{ image: '/assets/int_moon_2.min.jpg', alt: 'Interview with Moon Sung-ho' }, { image: '/assets/int_jung_1.min.jpg', alt: 'Interview with Jung Hyung-bae' }, { image: '/assets/int_jung_2.min.jpg', alt: 'Jung Hyung-bae interview set' }],
      body: ['VAN’s representative took part in a Monthly JoongAng interview on the structural exclusion of young people from party politics.', 'The special interview team held an in-depth interview with Seoul city-council candidate Moon Sung-ho, reviewing transport, welfare and low-carbon policy proposals and producing a full video, short clips and a written article.', 'The team also interviewed Gyeonggi provincial-council candidate Jung Hyung-bae on urban renewal, transport and local-environment proposals.'],
    },
    {
      slug: 'academic-networking', category: 'NETWORK', title: 'Networking with Academic and Civic Organizations',
      excerpt: 'Joint academic programs and cross-organization discussions that expanded VAN’s collaboration experience.',
      cover: '/assets/p15_0_448x216.min.jpg', coverAlt: 'VAN and Korea University POLITIKA mock election',
      gallery: [{ image: '/assets/p16_0_540x308.min.jpg', alt: 'Preparing for Tomorrow seminar' }, { image: '/assets/p16_1_604x217.min.jpg', alt: 'Seminar participants' }, { image: '/assets/p17_0_374x229.min.jpg', alt: 'VAN leaders with Professor Cha Jin-ah' }],
      body: ['The VAN × Korea University POLITIKA mock election recreated campaign strategy, policy design, debate and vote counting as a participatory simulation.', 'VAN hosted industry-cooperation discussions with four Sogang University societies and explored collaboration with OVAL KOREA and other university organizations.', 'On 11 May 2026, VAN attended the founding seminar of Preparing for Tomorrow at the Korea Press Center and explored future cooperation.'],
    },
    {
      slug: 'political-system-reform-dialogue', category: 'FORUM', title: 'Dialogue on Political-System Reform',
      excerpt: 'A policy conversation with former lawmaker Yoo In-taek on the structural limits of Korea’s two-party system.',
      body: ['VAN met former National Assembly Member Yoo In-taek near the National Assembly for a policy discussion on the structural limits of Korea’s two-party system.', 'The conversation examined representation, diversity and accountability, and considered practical directions for institutional reform.', 'The participants agreed to explore future research, discussion and public-dialogue projects.'],
    },
  ],
}
