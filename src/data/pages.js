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
  /** 지원서 폼 URL. 예: 'https://forms.gle/...' */
  applyUrl: '',
  /** 모집 기간. 예: '2026. 09. 07.(월) – 09. 21.(월) 23:59' */
  period: { ko: '', en: '' },
  /** 모집 대상. 예: '서울권 대학 재학·휴학생' */
  eligibility: { ko: '', en: '' },
  /** 전형 절차 단계. 예: ['서류 접수', '1차 서류 심사', '2차 면접', '최종 합격 발표'] */
  process: { ko: [], en: [] },
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
    eyebrow: 'SUPPORT VAN',
    title: '후원 안내',
    lead: '후원금은 VAN의 지속적인 학술·공익 활동, 청년 공론장 조성, 컨퍼런스 및 연계 프로젝트 운영을 위한 재원으로 소중히 사용됩니다.',
    usageNumber: 'I',
    usageSubtitle: 'Where Your Support Goes',
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
    accountNumber: 'II',
    accountSubtitle: 'Donation Account',
    accountTitle: '후원 계좌',
    accountLead: '아래 계좌로 후원해주시면 됩니다. 계좌번호는 복사 버튼으로 바로 옮길 수 있습니다.',
    contactNumber: 'III',
    contactSubtitle: 'Contact',
    contactTitle: '후원 문의',
    contactLead: '후원 절차나 사용 내역에 대해 문의하실 내용이 있으시면 공식 채널로 연락해주세요. 담당자가 안내드립니다.',
    homeLink: 'VAN 단체 소개 보기',
  },
  en: {
    eyebrow: 'SUPPORT VAN',
    title: 'Support VAN',
    lead: 'Donations support VAN’s continuing academic and public-interest work, youth forums, conferences and related projects.',
    usageNumber: 'I',
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
    accountNumber: 'II',
    accountSubtitle: 'Donation Account',
    accountTitle: 'Donation account',
    accountLead: 'Please use the account below. The copy button places the account number on your clipboard.',
    contactNumber: 'III',
    contactSubtitle: 'Contact',
    contactTitle: 'Questions about donating',
    contactLead: 'For questions about the donation process or how funds are used, please reach us through an official channel.',
    homeLink: 'Read about VAN',
  },
}

export const applyPage = {
  ko: {
    eyebrow: 'RECRUITMENT · 26-2',
    title: '26-2 리크루팅',
    lead: 'VAN은 서울대학교·연세대학교·고려대학교를 중심으로 형성된 서울권 대학 학회들의 총연합체입니다. 진리를 성실히 탐구하고, 탐구한 진리를 사회에 비추는 일에 함께할 구성원을 찾습니다.',
    overviewNumber: 'I',
    overviewSubtitle: 'Overview',
    overviewTitle: '모집 개요',
    overviewPending: '26-2 모집 기간과 지원 방법은 확정되는 즉시 이 페이지와 공식 인스타그램에 함께 공지됩니다. 이 페이지 주소는 기수와 무관하게 유지되므로, QR이나 링크를 저장해두시면 공지 후 바로 확인하실 수 있습니다.',
    labels: { period: '모집 기간', eligibility: '모집 대상', process: '전형 절차', link: '지원 링크' },
    workNumber: 'II',
    workSubtitle: 'What You Will Work On',
    workTitle: '어떤 일을 하게 되나요',
    workLead: 'VAN의 구성원은 아래와 같은 프로젝트를 직접 기획하고 기록합니다. 모두 실제로 진행해 온 활동입니다.',
    orgNumber: 'III',
    orgSubtitle: 'The Structure',
    orgTitle: '어떤 조직과 함께하나요',
    orgLead: '대표단과 실무진, 그리고 각 분야의 실무 고문단과 지도교수단으로 구성된 자문위원회가 함께 움직입니다. 학생자치기구의 임기 교체와 무관하게 상시로 작동하는 구조이기 때문에, 한 학기의 활동이 다음 학기의 자산으로 남습니다.',
    orgPoints: [
      { title: '상시 운영', body: '선거 주기나 임기 교체에 종속되지 않고 연중 지속되는 학술 교류를 운영합니다.' },
      { title: '자문 구조', body: '지도교수단과 전문가 자문위원단이 연구와 프로젝트에 구조적으로 결합합니다.' },
      { title: '기록과 축적', body: '활동을 자료실에 기록으로 남겨 다음 기수가 이어받을 수 있게 합니다.' },
    ],
    ctaNumber: 'IV',
    ctaSubtitle: 'Apply',
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
    lead: 'VAN is a federation of university academic societies centered on Seoul National University, Yonsei University and Korea University. We are looking for members who want to pursue truth rigorously and bring it to bear on society.',
    overviewNumber: 'I',
    overviewSubtitle: 'Overview',
    overviewTitle: 'Recruitment overview',
    overviewPending: 'The 26-2 application window and process will be announced here and on our official Instagram as soon as they are confirmed. This page keeps the same address across cycles, so a saved QR or link will still work after the announcement.',
    labels: { period: 'Period', eligibility: 'Who can apply', process: 'Process', link: 'Application' },
    workNumber: 'II',
    workSubtitle: 'What You Will Work On',
    workTitle: 'What you will work on',
    workLead: 'Members plan and document projects like the ones below. All of them are work VAN has actually carried out.',
    orgNumber: 'III',
    orgSubtitle: 'The Structure',
    orgTitle: 'The structure you join',
    orgLead: 'A representative council and operating staff work alongside an Advisory Council of professional advisers and faculty advisers. Because the structure runs independently of student-government terms, one semester’s work becomes the next semester’s foundation.',
    orgPoints: [
      { title: 'Year-round operation', body: 'Academic exchange continues through the year rather than following election cycles.' },
      { title: 'Advisory structure', body: 'Faculty advisers and professional advisers are built into research and projects.' },
      { title: 'Records that accumulate', body: 'Work is documented in the archive so the next cohort can build on it.' },
    ],
    ctaNumber: 'IV',
    ctaSubtitle: 'Apply',
    ctaTitle: 'Apply',
    ctaButton: 'Open the application form',
    ctaFallback: 'The application form is not open yet. Follow our official Instagram and we will announce the opening there first.',
    contactTitle: 'Questions',
    contactLead: 'For questions about the process or our work, please reach us through an official channel.',
    archiveLink: 'See what VAN has done',
  },
}
