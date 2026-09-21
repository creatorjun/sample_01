// src/config.js
//
// =================================================================
//  이 파일 하나만 수정하면 포트폴리오 사이트의 모든 내용이 바뀕니다.
// =================================================================

// ---------------------------------------------------------------
// 1. 기본 프로필
// ---------------------------------------------------------------
export const PROFILE = {
  nameKo:      '홍길동',
  name:        'Hong Gildong',
  title:       'Full-Stack Game Developer',
  subtitle:    'C++ · Unreal Engine · Unity · Node.js · React',
  description: '게임 엔진 개발부터 서버 백엔드, 웹 프론트까지 아우르는 풀스택 게임 개발자',
  email:       'your-email@example.com',
  github:      'https://github.com/your-github-id',
  location:    '서울',
  status:      '재직 중',

  stats: [
    { value: '7+',  label: '개발 경력 (년)' },
    { value: '3',   label: '근무 기업 수' },
    { value: '20+', label: '완성 프로젝트' },
    { value: '5+',  label: '출시 게임 타이틀' },
  ],
}

// ---------------------------------------------------------------
// 2. About 섹션
// ---------------------------------------------------------------
export const ABOUT = {
  headline:    '게임을 전체로 보는,',
  subheadline: '엔진부터 풀스택까지.',
  paragraphs: [
    '서울대학교 컴퓨터공학과를 졸업한 이후 7년간 게임 엔진부터 모바일 게임, 웹 풀스택까지 폭넓은 개발 경력을 쌓아왔습니다.',
    'C++20 기반 렌더링 파이프라인 설계, Unreal Engine 5 클라이언트 개발, 선터 매칭 백엔드 구축까지 시스템의 전체를 직접 설계하고 구현합니다.',
    '모든 프로젝트에 클린 아키텍처와 도메인 주도 설계를 일관되게 적용하며, 코드 품질과 성능 최적화를 모두 추구합니다.',
  ],
}

// ---------------------------------------------------------------
// 3. 경력
// ---------------------------------------------------------------
export const CAREERS = [
  {
    company:      '㎏ AAA 게임즈',
    role:         '선임 개발자 · 게임 엔진팀',
    period:       '2022.03 — 재직 중',
    achievements: [
      'C++20 기반 자체 3D 게임 엔진 코어 모듈 개발 및 유지보수',
      'DirectX 12 / Vulkan 렌더링 파이프라인 설계 및 성능 최적화',
      'CI/CD 기반 멀티플랫폼 (PC/콘솔/모바일) 자동 빌드 파이프라인 구축',
      '신규 입사자 온보딩 및 코드 리뷰 문화 주도',
    ],
  },
  {
    company:      '㎏ BBB 스튜디오',
    role:         '시니어 개발자 · 게임 클라이언트팀',
    period:       '2020.01 — 2022.02',
    achievements: [
      'Unreal Engine 5 기반 MMORPG 클라이언트 개발 (GAS 시스템 설계 및 구현)',
      '게임 내 실시간 선터·알림 Node.js 백엔드 구축',
      '클라이언트 메모리 누수 분석 및 최적화 (30% 성능 개선)',
      'REST / WebSocket 기반 서버 통신 추상 레이어 설계',
    ],
  },
  {
    company:      '㎏ CCC 소프트',
    role:         '개발자 · 모바일게임팀',
    period:       '2018.07 — 2019.12',
    achievements: [
      'Unity C# 모바일 캐주얼 게임 2종 Google Play / App Store 출시',
      'React + Express 기반 게임 운영 어드민 대시보드 제작',
      'Firebase Analytics 연동 및 지표 모니터링 체계 수립',
      '인게임 결제(Unity IAP) 및 광고(AdMob) 모듈 연동',
    ],
  },
]

// ---------------------------------------------------------------
// 4. 프로젝트
// ---------------------------------------------------------------
export const PROJECTS = [
  {
    id:     'proto-engine',
    name:   'ProtoEngine',
    tag:    'C++20 · Vulkan · ECS · CMake',
    desc:   'C++20 기반 경량 3D 게임 엔진. ECS 아키텍처, Vulkan 렌더러, AABB 물리 충돌 처리를 직접 구현하며 Windows / Linux 크로스 빌드를 지원합니다.',
    image:  null,
    github: 'https://github.com/your-github-id/proto-engine',
    demo:   null,
    metric: null,
  },
  {
    id:     'game-sync-server',
    name:   'GameSync Server',
    tag:    'Node.js · WebSocket · Redis · TypeScript',
    desc:   '실시간 멀티플레이 동기화 서버. 룸음 매니저, 상태 머신, Dead Reckoning 레이턴시 보정 알고리즘을 구현하였습니다.',
    image:  null,
    github: 'https://github.com/your-github-id/game-sync-server',
    demo:   null,
    metric: null,
  },
  {
    id:     'dev-admin-dashboard',
    name:   'DevAdmin Dashboard',
    tag:    'React · TypeScript · Express.js · MySQL',
    desc:   '게임 라이브 서비스 운영용 어드민 웹 대시보드. 유저 조회/정지, 지표 시각화, 인게임 공지 발송 기능을 포함합니다.',
    image:  null,
    github: 'https://github.com/your-github-id/dev-admin-dashboard',
    demo:   null,
    metric: null,
  },
  {
    id:     'casual-puzzle',
    name:   'Casual Puzzle Mobile',
    tag:    'Unity · C# · Firebase · IAP · AdMob',
    desc:   'Unity로 제작한 캐주얼 퍼즐 모바일 게임. Google Play / App Store 동시 출시. 레벨 에디터, 인앱 결제, 광고 모듈까지 단독 구현하였습니다.',
    image:  null,
    github: null,
    demo:   'https://play.google.com/store/apps/your-app-id',
    metric: null,
  },
  {
    id:     'ai-npc-dialogue',
    name:   'AI NPC Dialogue',
    tag:    'Python · FastAPI · OpenAI API · React',
    desc:   'LLM API를 활용한 게임 내 NPC 대화 생성 시스템 프로토타입. 컨텍스트 압축, 감정 상태 머신, SSE 스트리밍 응답을 지원합니다.',
    image:  null,
    github: 'https://github.com/your-github-id/ai-npc-dialogue',
    demo:   null,
    metric: null,
  },
  {
    id:     'shader-playground',
    name:   'Shader Playground',
    tag:    'WebGL · GLSL · React · Monaco Editor',
    desc:   '실시간 GLSL 컴파일 및 렌더링을 지원하는 웹 기반 셸이더 에디터. Uniforms GUI, PBR 예제 번들, 코드 공유 URL 생성 기능을 포함합니다.',
    image:  null,
    github: 'https://github.com/your-github-id/shader-playground',
    demo:   'https://your-github-id.github.io/shader-playground',
    metric: null,
  },
]

// ---------------------------------------------------------------
// 5. 스킬
// ---------------------------------------------------------------
export const SKILLS = [
  {
    label: 'Game Development',
    items: ['Unreal Engine 5', 'Unity', 'C++20', 'C#', 'HLSL / GLSL', 'DirectX 12', 'Vulkan', 'ECS Architecture'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'TypeScript', 'Express.js', 'FastAPI', 'Python', 'WebSocket', 'Redis', 'REST API'],
  },
  {
    label: 'Frontend',
    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'WebGL', 'Chart.js'],
  },
  {
    label: 'Infrastructure & Tools',
    items: ['AWS', 'Docker', 'Jenkins', 'GitHub Actions', 'CMake', 'Firebase', 'MySQL', 'SQLite'],
  },
]

// ---------------------------------------------------------------
// 6. 자기소개서
// ---------------------------------------------------------------
export const COVER_LETTER = {
  sections: [
    {
      title: '게임을 만드는 일에 대한 헌신',
      body:  '서울대학교 컴퓨터공학과를 졸업한 이후, 저는 단 한 가지 질문을 주보로 존재해 왜 이 코드가 실제로 동작하는가에 대한 질문입니다. 코드가 화면에서 살아움직이는 순간, 직접 설계한 엔진이 버터지면서 레벨이 로딩되는 경험은 어느 보상과도 대체할 수 없습니다.',
    },
    {
      title: '엔진부터 풀스택까지, 널리 보는 시야',
      body:  '클라이언트 코드만 작성하는 개발자가 되고 싶지 않았습니다. 게임이 동작하는 원리의 전체를 이해하기 위해 직접 C++로 렌더링 파이프라인을 제작하고, 서버 통신 레이어를 설계하며, 관리 도구를 웹으로 직접 구축했습니다.',
    },
    {
      title: '품질에 대한 강박함',
      body:  '라이브 서비스 도중 클라이언트 메모리가 매주 30% 이상 누수되는 문제를 주도적으로 잡아냈습니다. 버그를 수정하는 것에서 그치지 않고, 매크로를 통한 상세 프로파일링으로 실질적인 레이어의 메모리 사용량을 적춰 성능을 30% 개선했습니다.',
    },
    {
      title: '함께 만드는 게임, 함께 성장하는 팀',
      body:  '신규 입사자 온보딩과 코드 리뷰 문화를 주도하면서 기술적으로 성장하는 좋은 관습은 팀을 같이 만들어가는 것이라는 확신이 생겼습니다. 좋은 게임은 좋은 동료들과 함께 만들어집니다.',
    },
  ],
}
