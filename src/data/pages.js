/**
 * 후원 페이지와 26-2 리크루팅 페이지 전용 콘텐츠.
 *
 * 두 페이지는 인쇄물·인스타그램에 실리는 QR의 도착지입니다.
 * QR은 한 번 배포되면 회수할 수 없으므로 경로(`/ko/support/`, `/ko/apply/`)는
 * 기수와 무관한 고정 주소로 두고, 기수별 내용만 이 파일에서 교체합니다.
 */

/**
 * 26-2 리크루팅 확정 정보.
 *
 * 운영진이 확정한 값만 채워 주세요. 빈 문자열이나 빈 배열로 두면 해당 항목은
 * 페이지에 렌더링되지 않고, 모집 요강 전체가 비어 있으면 "확정 후 공지" 안내와
 * 공식 문의 채널이 대신 노출됩니다.
 *
 * 확인되지 않은 일정·자격·지원 링크를 임의로 채우지 않는다는 저장소 원칙을 따릅니다.
 */
export const recruitment = {
  cycle: '26-2',

  /** 지원서 폼. 링커리어 공고에 게시된 공식 접수 경로입니다. */
  applyUrl: 'https://forms.gle/xdHAfKoom6HfNpgq6',

  /** 링커리어 모집 공고. 전체 안내를 원하는 지원자에게 연결합니다. */
  postingUrl: 'https://linkareer.com/activity/336282',

  period: {
    ko: '2026. 9. 15.(화) 23:59 마감',
    en: 'Closes 15 September 2026, 23:59 KST',
  },
  eligibility: {
    ko: '대학 무관 · 전공 무관 · 재학생 · 휴학생 · 졸업생 모두 지원 가능',
    en: 'Open to students of any university and major, including those on leave and graduates',
  },
  fee: {
    ko: '35,000원 · 서류 합격자에 한해 개별 안내',
    en: 'KRW 35,000 · details sent individually to shortlisted applicants',
  },

  /** 공고에 명시된 단계만 적습니다. 확인되지 않은 전형 단계를 추가하지 않습니다. */
  process: {
    ko: ['지원서 접수', '서류 심사', '합격자 개별 안내'],
    en: ['Application', 'Document screening', 'Individual notice to successful applicants'],
  },

  contact: {
    person: { ko: '기획조정실 실장 유진아', en: 'Jina Yu, Chief of the Planning and Coordination Office' },
    phone: '010-3702-3101',
    email: 'veritas_van@naver.com',
  },

  /**
   * 모집 부서. 지원자는 주 1회 대면 업무에 참여할 수 있는 부서를 선택합니다.
   * 장소·일시는 운영 상황에 따라 조정될 수 있습니다.
   */
  departments: {
    ko: [
      {
        name: '기획조정실',
        summary: '내부 운영체계 고도화, AI 기반 업무 자동화 시스템 구축, 전사적 주요 사업 기획·총괄, 정부·기관 지원사업 발굴 및 제안서 작성',
        fit: '조직 운영체계와 업무 프로세스 설계에 관심이 있고, AI·협업 도구로 복잡한 업무를 체계화하는 데 자신 있는 분',
        place: '안암',
        time: '일요일 15:00–17:00',
      },
      {
        name: '대외전략부',
        summary: '교육계·언론계·법조계·정계·금융계 등 분야별 네트워크 구축, 외부 단체·기관과의 연합 프로젝트 기획, 업무협약·후원·협력 제안 및 비즈니스 미팅',
        fit: '여러 단체를 연결해 큰 프로젝트를 기획하고 싶고, 협상·제안·컨택 역량을 키우고 싶은 분',
        place: '미정',
        time: '미정',
      },
      {
        name: '사업운영부',
        summary: '주요 행사 현장 운영, 자체 사업 및 소규모 협력 사업 기획·운영, 구성원 교류진흥 프로그램 총괄, 참가자·인력·동선·운영체계 관리',
        fit: '행사의 실질적인 운영과 실행에 관심이 있고, 사람과 현장을 관리하는 과정에 흥미가 있는 분',
        place: '안암',
        time: '목요일 19:00–21:00',
      },
      {
        name: '콘텐츠마케팅부',
        summary: '인터뷰·홍보영상 콘텐츠 기획 및 편집, 대외 네트워킹 채널 운영, 온·오프라인 홍보 및 마케팅 전략 수립, 카드뉴스·포스터·영상 제작',
        fit: '영상 콘텐츠와 마케팅 전략에 관심이 있고, 자신의 콘텐츠를 실제 브랜딩 성과로 연결하고 싶은 분',
        place: '신촌',
        time: '화요일 19:00–21:00',
      },
      {
        name: '상설연구조직',
        summary: '학기 중 공개세미나 2~3회 진행, 연구·정책·외부 프로젝트 8회 이상 수행, 정책보고서 및 연구 결과물 작성, 공모전·학술대회·외부 연구사업 참여',
        fit: '기관·단체의 외부 연구 및 정책 프로젝트에 참여하고 싶고, 정책보고서·논문을 직접 써보고 싶은 분',
        place: '신촌',
        time: '일요일 15:00–17:00',
      },
    ],
    en: [
      { name: 'Planning & Coordination Office', summary: 'Internal operating systems, AI-based workflow automation, organisation-wide project planning, and public grant proposals.', fit: 'Interested in designing operating systems and workflows, confident with AI and collaboration tools.', place: 'Anam', time: 'Sun 15:00–17:00' },
      { name: 'External Strategy Bureau', summary: 'Sector networks across education, media, law, politics and finance; joint projects with outside organisations; partnership, sponsorship and business meetings.', fit: 'Wants to connect organisations into larger projects and build negotiation and outreach skills.', place: 'TBC', time: 'TBC' },
      { name: 'Operations Bureau', summary: 'On-site operation of major events, planning and running in-house and partner projects, member exchange programmes, participant and logistics management.', fit: 'Interested in the practical execution of events and in managing people and venues.', place: 'Anam', time: 'Thu 19:00–21:00' },
      { name: 'Content & Marketing Bureau', summary: 'Interview and promotional video content, external networking channels, on- and offline marketing strategy, card news, posters and video production.', fit: 'Interested in video content and marketing strategy, wants to turn content into brand results.', place: 'Sinchon', time: 'Tue 19:00–21:00' },
      { name: 'Standing Research Organisation', summary: 'Two to three open seminars per semester, eight or more research and policy projects, policy reports and research outputs, competitions and academic conferences.', fit: 'Wants to join external research and policy projects and write policy reports first-hand.', place: 'Sinchon', time: 'Sun 15:00–17:00' },
    ],
  },

  /** 활동 방식. 공고에 명시된 내용만 담습니다. */
  terms: {
    ko: [
      '부서별 주 1회 대면 업무 겸 회의, 그 외 업무는 온라인 병행',
      '중간·기말고사 기간에는 정규 대면 회의를 진행하지 않습니다',
      '1년 이상 활동자에게 VAN 명의 공식 활동인증서 발급',
      '매 학기 우수 활동자 선정 및 시상, 최우수 활동자는 인턴십·채용 추천 연계',
    ],
    en: [
      'One in-person meeting per week per bureau; other work runs online',
      'No regular in-person meetings during midterm and final exam periods',
      'Official certificate of activity for members who stay one year or longer',
      'Outstanding members recognised each semester; top members referred for internships and hiring',
    ],
  },
}

/** 모집 요강에 표시할 항목이 하나라도 있는지 여부. */
export function hasRecruitmentDetails(lang) {
  return Boolean(
    recruitment.applyUrl
    || recruitment.period[lang]
    || recruitment.eligibility[lang]
    || recruitment.process[lang].length > 0,
  )
}

export const supportPage = {
  ko: {
    eyebrow: '후원 안내',
    title: '후원 안내',
    lead: '후원금은 VAN의 지속적인 학술·공익 활동, 청년 공론장 조성, 컨퍼런스 및 연계 프로젝트 운영을 위한 재원으로 소중히 사용됩니다.',
    usageNumber: '01',
    usageSubtitle: '후원금 사용처',
    usageTitle: '후원금은 이렇게 쓰입니다',
    usage: [
      {
        title: '연합 학술 컨퍼런스 운영',
        body: '연 1~2회 개최하는 연합 학술 컨퍼런스의 장소 대여, 운영 인력, 기록과 자료집 제작에 쓰입니다.',
      },
      {
        title: '청년 공론장 조성',
        body: '간담회와 토론 프로그램을 열어 학술적 논의가 현실의 문제의식과 맞닿는 자리를 만듭니다.',
      },
      {
        title: '정책 연구와 발간',
        body: '정책 보고서와 학술지를 발간해 연구 결과를 기록으로 남기고 공적 논의의 근거로 삼습니다.',
      },
      {
        title: '미디어 콘텐츠 제작',
        body: '인터뷰·팟캐스트·영상 콘텐츠를 제작해 논의를 더 넓은 청중에게 전달합니다.',
      },
    ],
    waysNumber: '02',
    waysSubtitle: '후원 방식',
    waysTitle: '세 가지 방식으로 후원할 수 있습니다',
    waysLead: '후원의 목적과 규모에 따라 아래 세 가지 중에서 선택하실 수 있습니다. 어느 방식이든 사용 내역은 기록으로 남기고 공개합니다.',
    waysContactTitle: '후원 참여 및 문의',
    waysContactLead: '세 방식 모두 아래 창구로 안내드립니다. 눌러서 바로 연결하실 수 있습니다.',
    ways: [
      {
        tag: 'BOOK FUNDING',
        title: '북 펀딩',
        body: 'VAN 상설연구조직이 발간한 사회비평 에세이집 『선 위에 선 우리들』의 출간과 배포를 후원하는 방식입니다. 청년 필진이 직접 기획하고 집필한 공동 저서로, 후원금은 인쇄와 배포, 후속 발간 작업에 쓰입니다.',
        points: ['도서 발간 및 배포 비용', '후속 연구·발간 작업'],
        note: '펀딩 참여 방법은 공식 인스타그램과 아래 문의처에서 안내드립니다.',
        linkLabel: '『선 위에 선 우리들』 소개 보기',
        linkSlug: 'essay-anthology-on-the-line',
      },
      {
        tag: 'MONTHLY GIVING',
        title: '개인 후원',
        body: '매월 일정 금액을 후원하는 방식입니다. 아래 금액대 중에서 선택하실 수 있고, 부담 없는 수준에서 시작해 언제든 조정하실 수 있습니다.',
        tiers: ['월 1만원', '월 3만원', '월 5만원', '월 10만원'],
        points: ['아래 후원 계좌로 매월 자동이체를 설정해주시면 됩니다', '후원을 시작하셨다면 문의처로 한 번 알려주세요'],
        note: '연락처를 남겨주신 정기 후원자께는 월간 활동 리포트를 보내드릴 예정입니다.',
      },
      {
        tag: 'PARTNERSHIP',
        title: '기업·단체 후원',
        body: '기업과 기관, 단체 차원의 후원과 협력을 받고 있습니다. 후원 규모와 형태는 개별 협의로 정하며, 업무협약이나 행사 협력, 연구 지원 등 여러 형태로 함께할 수 있습니다.',
        points: ['업무협약 및 파트너십', '행사 협력 및 연구 지원'],
        note: '제안이나 문의는 아래 문의처로 연락해주세요.',
      },
    ],
    accountNumber: '03',
    accountSubtitle: '후원 계좌',
    accountTitle: '후원 계좌',
    accountLead: '북 펀딩과 개인 후원은 아래 계좌로 참여하실 수 있습니다. 계좌번호는 복사 버튼으로 바로 옮길 수 있습니다.',
    contactNumber: '04',
    contactSubtitle: '문의',
    contactTitle: '후원 문의',
    contactLead: '후원 절차나 사용 내역에 대해 문의하실 내용이 있으시면 공식 채널로 연락해주세요. 담당자가 안내드립니다.',
    homeLink: 'VAN 단체 소개 보기',
  },
  en: {
    eyebrow: 'SUPPORT VAN',
    title: 'Support VAN',
    lead: 'Donations support VAN’s continuing academic and public-interest work, youth forums, conferences and related projects.',
    usageNumber: '01',
    usageSubtitle: 'Where Your Support Goes',
    usageTitle: 'How donations are used',
    usage: [
      {
        title: 'Joint academic conferences',
        body: 'Venue, operations, documentation and proceedings for the one to two joint academic conferences held each year.',
      },
      {
        title: 'Youth public forums',
        body: 'Roundtables and discussion programmes where academic debate meets real social questions.',
      },
      {
        title: 'Policy research and publishing',
        body: 'Policy reports and academic publications that record findings and ground them in public discussion.',
      },
      {
        title: 'Media production',
        body: 'Interviews, podcasts and video content that carry the discussion to a wider audience.',
      },
    ],
    waysNumber: '02',
    waysSubtitle: 'Ways to Give',
    waysTitle: 'Three ways to support VAN',
    waysLead: 'Choose the route that fits your purpose and scale. However you give, we document how the funds are used and publish that record.',
    waysContactTitle: 'Getting started and questions',
    waysContactLead: 'All three routes are handled through the channels below. Tap to get in touch directly.',
    ways: [
      {
        tag: 'BOOK FUNDING',
        title: 'Book funding',
        body: 'Support the publication and distribution of On the Line, the social-criticism anthology written by VAN’s standing research organisation. Contributions cover printing, distribution and the research that follows.',
        points: ['Printing and distribution', 'Follow-up research and publishing'],
        note: 'Details on joining the funding round are announced on our official Instagram and through the contact below.',
        linkLabel: 'Read about On the Line',
        linkSlug: 'essay-anthology-on-the-line',
      },
      {
        tag: 'MONTHLY GIVING',
        title: 'Individual giving',
        body: 'Give a set amount each month. Choose one of the tiers below, start at a level you are comfortable with and adjust it at any time.',
        tiers: ['KRW 10,000 / month', 'KRW 30,000 / month', 'KRW 50,000 / month', 'KRW 100,000 / month'],
        points: ['Set up a monthly standing order to the account below', 'Let us know once you have started so we can add you to the list'],
        note: 'Monthly donors who leave their contact details will receive a monthly activity report.',
      },
      {
        tag: 'PARTNERSHIP',
        title: 'Corporate and institutional',
        body: 'We welcome support and collaboration from companies, institutions and organisations. Scale and format are agreed individually and can take the form of a partnership agreement, event collaboration or research support.',
        points: ['Partnership agreements', 'Event collaboration and research support'],
        note: 'Please reach us through the contact below with proposals or questions.',
      },
    ],
    accountNumber: '03',
    accountSubtitle: 'Donation Account',
    accountTitle: 'Donation account',
    accountLead: 'Book funding and individual giving both run through the account below. The copy button places the account number on your clipboard.',
    contactNumber: '04',
    contactSubtitle: 'Contact',
    contactTitle: 'Questions about donating',
    contactLead: 'For questions about the donation process or how funds are used, please reach us through an official channel.',
    homeLink: 'Read about VAN',
  },
}

export const applyPage = {
  ko: {
    eyebrow: '26-2학기 실무진 공개 모집',
    title: '26-2 리크루팅',
    lead: 'VAN은 서울대학교·연세대학교·고려대학교의 학회 연대에서 출발해 전국 대학의 우수 학회와 학술단체를 포괄하는 총연합체입니다. 학회 활동에 참여하는 데 그치지 않고, 직접 사업을 기획하고 외부 기관과 협력하며 자신의 아이디어를 실제 성과로 만들 실무진을 모집합니다.',
    overviewNumber: '01',
    overviewSubtitle: '모집 개요',
    overviewTitle: '모집 개요',
    overviewPending: '26-2 모집 기간과 지원 방법은 확정되는 즉시 이 페이지와 공식 인스타그램에 함께 공지됩니다. 이 페이지 주소는 기수와 무관하게 유지되므로, QR이나 링크를 저장해두시면 공지 후 바로 확인하실 수 있습니다.',
    labels: { period: '모집 기간', eligibility: '모집 대상', process: '전형 절차', fee: '회비', link: '지원 링크', contact: '문의' },
    deptNumber: '02',
    deptSubtitle: '모집 부서',
    deptTitle: '어느 부서로 지원하나요',
    deptLead: '지원자는 주 1회 대면 업무에 참여할 수 있는 부서를 선택합니다. 장소와 일시는 운영 상황에 따라 조정될 수 있습니다.',
    deptFitLabel: '이런 분께 맞습니다',
    deptPlaceLabel: '장소',
    deptTimeLabel: '일시',
    termsTitle: '활동 방식',
    postingLink: '링커리어 모집 공고 바로가기',
    postingNote: '아래 링크를 누르면 링커리어 공고 페이지로 이동합니다.',
    ctaPosting: '링커리어 공고 보기',
    workNumber: '03',
    workSubtitle: '담당 업무',
    workTitle: '어떤 일을 하게 되나요',
    workLead: 'VAN의 구성원은 아래와 같은 프로젝트를 직접 기획하고 기록합니다. 모두 실제로 진행해 온 활동입니다.',
    orgNumber: '04',
    orgSubtitle: '조직 구조',
    orgTitle: '어떤 조직과 함께하나요',
    orgLead: '대표단과 실무진, 그리고 각 분야의 실무 고문단과 지도교수단으로 구성된 자문위원회가 함께 움직입니다. 학생자치기구의 임기 교체와 무관하게 상시로 작동하는 구조이기 때문에, 한 학기의 활동이 다음 학기의 자산으로 남습니다.',
    orgPoints: [
      { title: '상시 운영', body: '선거 주기나 임기 교체에 종속되지 않고 연중 지속되는 학술 교류를 운영합니다.' },
      { title: '자문 구조', body: '지도교수단과 전문가 자문위원단이 연구와 프로젝트에 구조적으로 결합합니다.' },
      { title: '기록과 축적', body: '활동을 자료실에 기록으로 남겨 다음 기수가 이어받을 수 있게 합니다.' },
    ],
    ctaNumber: '05',
    ctaSubtitle: '지원 방법',
    ctaTitle: '지원하기',
    ctaButton: '지원서 작성하기',
    ctaFallback: '아직 지원 폼이 열리지 않았습니다. 공식 인스타그램을 팔로우해두시면 모집 시작을 가장 먼저 안내드립니다.',
    contactTitle: '지원 문의',
    contactLead: '모집 절차나 활동 내용에 관한 문의는 공식 채널로 연락해주세요.',
    archiveLink: 'VAN이 해온 활동 기록 보기',
  },
  en: {
    eyebrow: 'RECRUITMENT · 26-2',
    title: 'Join VAN 26-2',
    lead: 'VAN is a federation of leading academic societies across Korean universities, founded on an alliance among Seoul National, Yonsei and Korea University. We are recruiting members who want to plan projects, work with outside institutions and turn their own ideas into results.',
    overviewNumber: '01',
    overviewSubtitle: 'Overview',
    overviewTitle: 'Recruitment overview',
    overviewPending: 'The 26-2 application window and process will be announced here and on our official Instagram as soon as they are confirmed. This page keeps the same address across cycles, so a saved QR or link will still work after the announcement.',
    labels: { period: 'Period', eligibility: 'Who can apply', process: 'Process', fee: 'Membership fee', link: 'Application', contact: 'Contact' },
    deptNumber: '02',
    deptSubtitle: 'Bureaus',
    deptTitle: 'Which bureau will you join',
    deptLead: 'Applicants choose a bureau whose weekly in-person meeting they can attend. Venues and times may be adjusted.',
    deptFitLabel: 'A good fit if you',
    deptPlaceLabel: 'Venue',
    deptTimeLabel: 'When',
    termsTitle: 'How the work runs',
    postingLink: 'Open the Linkareer notice',
    postingNote: 'The link below opens our recruitment notice on Linkareer.',
    ctaPosting: 'View the Linkareer notice',
    workNumber: '03',
    workSubtitle: 'What You Will Work On',
    workTitle: 'What you will work on',
    workLead: 'Members plan and document projects like the ones below. All of them are work VAN has actually carried out.',
    orgNumber: '04',
    orgSubtitle: 'The Structure',
    orgTitle: 'The structure you join',
    orgLead: 'A representative council and operating staff work alongside an Advisory Council of professional advisers and faculty advisers. Because the structure runs independently of student-government terms, one semester’s work becomes the next semester’s foundation.',
    orgPoints: [
      { title: 'Year-round operation', body: 'Academic exchange continues through the year rather than following election cycles.' },
      { title: 'Advisory structure', body: 'Faculty advisers and professional advisers are built into research and projects.' },
      { title: 'Records that accumulate', body: 'Work is documented in the archive so the next cohort can build on it.' },
    ],
    ctaNumber: '05',
    ctaSubtitle: 'Apply',
    ctaTitle: 'Apply',
    ctaButton: 'Open the application form',
    ctaFallback: 'The application form is not open yet. Follow our official Instagram and we will announce the opening there first.',
    contactTitle: 'Questions',
    contactLead: 'For questions about the process or our work, please reach us through an official channel.',
    archiveLink: 'See what VAN has done',
  },
}
