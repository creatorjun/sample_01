# Template_01 — 포트폴리오 사이트 커스터마이징 가이드

QTLAB의 **샘플 01** 운영 원본 저장소입니다.

- 원본 저장소: [creatorjun/sample_01](https://github.com/creatorjun/sample_01)
- 샘플 페이지: [qtlab.kr/sample_01](https://qtlab.kr/sample_01)
- 실제 정적 사이트: [sample-01.qtlab.kr](https://sample-01.qtlab.kr/)
- 기술 구성: React 18, Vite 4, Tailwind CSS 3
- 실행 환경: Node.js 22.12 이상, npm 및 저장소에 포함된 `package-lock.json`

```bash
npm ci --no-audit --no-fund
npm run dev
```

배포용 정적 파일은 `npm run build`로 `dist/`에 생성합니다. `npm run preview`로 결과를 확인할 수 있습니다. `platform.json`은 QTLAB 소스 빌드 계약을 선언합니다. GitHub로 푸시하는 동작은 운영 사이트를 자동으로 재배포하지 않습니다. 새 설치와 빌드는 Node.js 24.19.0 / npm 10.9.2에서 확인했습니다.

소스에는 실제 서버 비밀값·인증키가 필요하지 않습니다. `node_modules/`, `dist/`, `artifacts/`, `.env*`, `.npmrc` 및 로컬 자격증명은 Git에서 제외합니다. 폰트는 기존 화면과 동일하게 Google Fonts와 Fontshare의 외부 CSS를 사용하므로 첫 접속 시 네트워크 연결이 필요합니다. 프로필과 프로젝트 링크는 `src/config.js`의 샘플 정보입니다.

React + Vite + Tailwind CSS 기반의 개발자 포트폴리오 사이트 템플릿입니다.
프로필·소개·경력·프로젝트·스킬·자기소개 데이터는 `src/config.js`에서 수정합니다. 내비게이션 이름과 메뉴, Contact 고정 문구, HTML 메타데이터는 해당 컴포넌트와 `index.html`에서 별도로 수정합니다.

색상 팔레트·폰트 크기·굵기·행간·자간은 [`src/design-tokens.css`](src/design-tokens.css), 공통 텍스트 계층은 [`src/typography.css`](src/typography.css)에서 관리합니다. [디자인 가이드](docs/design-system.md)에 Light/Dark 팔레트와 제목·본문·보조문 적용 기준이 정리되어 있습니다.

## 기능과 문서

- 프로필·소개·경력·프로젝트·기술 스택·자기소개·연락처의 단일 페이지와 섹션 이동 메뉴
- 데스크톱 왼쪽 메뉴, 모바일 상단 메뉴, 현재 섹션 강조, 화면 진입 애니메이션
- 운영체제 설정으로 시작하는 Light/Dark 모드와 수동 전환. 선택값은 저장하지 않으므로 새로고침하면 운영체제 설정으로 다시 시작합니다.
- AI 생성 예시 이미지 6장, 키보드로 여는 프로젝트 상세 모달, 이미지 실패 안내, GitHub·데모 외부 링크
- Contact의 이메일은 `mailto:` 링크입니다. 사이트 자체 문의 접수·회원가입·로그인·SMS API는 없습니다.

| 문서 | 내용 |
| --- | --- |
| [디자인 기준](docs/design-system.md) | 팔레트, 글자 역할, 반응형 원칙 |
| [프로젝트 이미지](docs/project-images.md) | 이미지 출처·교체와 모달 동작 |
| [사이트 아이콘](docs/icons.md) | SVG·ICO·Apple 아이콘 재생성 |
| [아키텍처 검토](docs/architecture-review.md) | 계층 책임·의존성 방향과 검토 기록 |
| [빌드·배포 운영](docs/operations.md) | 실행, ZIP 생성, 운영 릴리스 확인 기록 |

---

## 프로젝트 구조

```
Template_01/
├── index.html                          # Vite 진입 HTML
├── package.json                        # 의존성 및 스크립트
├── tailwind.config.js                  # Tailwind 테마 설정
├── postcss.config.js                   # PostCSS 설정
├── vite.config.js                      # Vite 빌드 설정
└── src/
    ├── main.jsx                        # React 루트 마운트
    ├── App.jsx                         # 전체 섹션 조합 컴포넌트
    ├── portfolioService.js            # use case와 저장소 구현 조립
    ├── design-tokens.css               # 색상·폰트·크기·굵기·행간·자간 기준
    ├── typography.css                  # 제목·본문·보조문·버튼 역할 스타일
    ├── index.css                       # 전역 배경·포커스·모션 스타일
    ├── config.js                       # ★ 고객 정보 수정 파일 (핵심)
    ├── presentation/
    │   ├── components/
    │   │   ├── Navbar.jsx              # 데스크톱 사이드바·모바일 상단 메뉴
    │   │   ├── Hero.jsx                # 히어로 섹션 (이름·타이틀·통계)
    │   │   ├── About.jsx               # About 섹션
    │   │   ├── Career.jsx              # 경력 섹션
    │   │   ├── Projects.jsx            # 프로젝트 목록 섹션
    │   │   ├── Skills.jsx              # 스킬 섹션
    │   │   ├── CoverLetter.jsx         # 자기소개서 섹션
    │   │   ├── Contact.jsx             # 연락처 섹션
    │   │   └── projects/               # 프로젝트 카드 서브 컴포넌트
    │   ├── contexts/                   # 조회한 포트폴리오 콘텐츠 제공
    │   └── hooks/                      # Custom Hooks
    ├── application/useCases/           # 주입받은 저장소로 콘텐츠 조회
    ├── domain/                         # 데이터 타입·저장소 계약
    └── infrastructure/                 # config 데이터·구체 저장소
```

---

## 콘텐츠 수정의 시작점: config.js

대부분의 데이터는 `config.js` → infrastructure 저장소 → application use case → `portfolioService.js` → `PortfolioContext`를 거쳐 화면에 전달됩니다. About 소개 문구는 컴포넌트에서 직접 읽습니다. 고정 문구와 섹션 구성까지 바꾸려면 아래의 별도 수정 위치도 확인하세요.

---

## `src/config.js` — 항목별 수정 가이드

### 1. PROFILE — 기본 프로필

```js
export const PROFILE = {
  nameKo:      '홍길동',          // 한글 이름 → Hero 섹션 메인 타이틀
  name:        'Hong Gildong',   // 영문 이름 데이터 (현재 화면에서 사용하지 않음)
  title:       'Full-Stack Game Developer',  // 직함
  subtitle:    'C++ · Unreal Engine · ...',  // 기술 스택 한 줄 요약
  description: '한 줄 자기소개',
  email:       'your-email@example.com',     // Contact 섹션 이메일 링크
  github:      'https://github.com/your-id', // GitHub 프로필 URL
  location:    '서울',                        // 거주 지역
  status:      '재직 중',                     // 구직 상태 (예: '구직 중', '재직 중')

  stats: [
    { value: '7+',  label: '개발 경력 (년)' },   // About 전체, 큰 화면 Hero에는 첫 3개
    { value: '3',   label: '근무 기업 수' },
    { value: '20+', label: '완성 프로젝트' },
    { value: '5+',  label: '출시 게임 타이틀' },
  ],
}
```

| 필드 | 표시 위치 | 비고 |
|------|-----------|------|
| `nameKo` | Hero 메인 헤딩 | 가장 크게 표시됨 |
| `title` | Hero 직함·보조 프로필, 자기소개서 소개 | Navbar 이름은 컴포넌트에서 별도 수정 |
| `subtitle` | Hero 기술 태그 줄 | `·` 로 구분하여 나열 |
| `email` | Contact 섹션 링크 | `mailto:` 자동 처리 |
| `github` | Contact 섹션, Hero 버튼 | 전체 URL 입력 |
| `stats` | About 통계 전체, 1024px 이상 Hero 보조 카드의 첫 3개 | value/label 쌍으로 수정 |

---

### 2. ABOUT — About 섹션

```js
export const ABOUT = {
  headline:    '게임을 전체로 보는,',          // 대형 강조 문구 첫 줄
  subheadline: '엔진부터 풀스택까지.',          // 대형 강조 문구 둘째 줄
  paragraphs: [
    '첫 번째 단락 텍스트.',
    '두 번째 단락 텍스트.',
    '세 번째 단락 텍스트.',
  ],
}
```

- `headline` / `subheadline`: About 섹션 상단 대형 문구. 짧고 인상적인 한 문장 권장.
- `paragraphs`: 배열 원소 수만큼 단락이 생성됩니다. 2~4개 권장.

---

### 3. CAREERS — 경력 섹션

```js
export const CAREERS = [
  {
    company:      '회사명',
    role:         '직책 · 소속팀',
    period:       '2022.03 — 재직 중',      // 재직 기간 (자유 형식)
    achievements: [
      '주요 업무/성과 1',
      '주요 업무/성과 2',
    ],
  },
  // ... 추가 경력 객체
]
```

- 화면은 배열 순서대로 표시하며 날짜로 자동 정렬하지 않습니다. 최신 경력을 먼저 넣습니다.
- `achievements` 배열 원소 수만큼 불릿 포인트가 생성됩니다.
- 빈 배열 `[]`로 설정하면 경력 항목만 없어지고 제목·섹션·메뉴는 유지됩니다. 섹션 전체를 빼려면 `App.jsx`의 `<Career />`와 `Navbar.jsx`의 메뉴도 함께 조정합니다.

---

### 4. PROJECTS — 프로젝트 섹션

```js
export const PROJECTS = [
  {
    id:     'unique-id',           // 고유 식별자 (영문 소문자, 하이픈 사용)
    name:   '프로젝트명',
    tag:    '기술 스택 태그',       // 프로젝트 카드의 기술 스택 안내
    desc:   '프로젝트 설명 텍스트',
    image:  'projects/project.webp', // public/images/ 기준 상대 경로 (없으면 null)
    imageAlt: '이미지 내용을 설명하는 문장', // 이미지 대체 텍스트
    imageCaption: 'AI 생성 예시 이미지', // 카드와 상세 화면에 표시할 안내
    github: 'https://github.com/...', // GitHub 링크 (없으면 null)
    demo:   'https://...',         // 데모/배포 URL (없으면 null)
    metric: null,                  // 핵심 지표 문자열 (예: 'DAU 1만', 없으면 null)
  },
]
```

- `image`: `public/images/` 기준 상대 경로입니다. 예를 들어 `public/images/projects/project.webp`는 `projects/project.webp`로 설정합니다. 화면에서 `/images/`를 붙이므로 `/images/` 접두사나 외부 URL을 넣지 않습니다.
- `imageAlt`: 이미지의 내용을 설명하는 대체 텍스트입니다. 이미지 교체 시 함께 수정합니다.
- `imageCaption`: 카드·상세 화면에 표시할 출처나 예시 이미지 안내입니다. 기본 6개는 `AI 생성 예시 이미지`로 표시합니다. 생성 이미지의 주제와 교체 방법은 [프로젝트 이미지 가이드](docs/project-images.md)를 참고하세요.
- `github` / `demo` 중 하나만 있어도 됩니다. `null`이면 해당 버튼이 렌더링되지 않습니다.
- `metric`: 프로젝트 카드에 강조 지표를 표시할 때 사용. 예: `'Star 120+'`, `'MAU 5,000'`.

---

### 5. SKILLS — 스킬 섹션

```js
export const SKILLS = [
  {
    label: '카테고리명',              // 스킬 그룹 제목
    items: ['스킬1', '스킬2', ...],  // 태그로 표시될 스킬 목록
  },
]
```

- 배열에 객체를 추가/삭제하여 카테고리 수를 자유롭게 조정합니다.
- `items` 순서대로 태그가 좌→우로 나열됩니다.

---

### 6. COVER_LETTER — 자기소개서 섹션

```js
export const COVER_LETTER = {
  sections: [
    {
      title: '소제목',
      body:  '본문 텍스트. 3~5문장 권장.',
    },
  ],
}
```

- `sections` 배열 원소 수만큼 자기소개서 항목이 생성됩니다.
- 각 항목은 `title`(소제목)과 `body`(본문)로 구성됩니다. 3~5개 항목 권장.

---

## 개발 서버 실행

```bash
npm ci --no-audit --no-fund
npm run dev
```

## 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

---

## 컴포넌트 직접 수정이 필요한 경우

아래 경우에는 `config.js` 외의 파일을 수정합니다.

| 상황 | 수정 파일 |
|------|-----------|
| 내비게이션 메뉴 항목 추가/삭제 | `src/presentation/components/Navbar.jsx` |
| 사이트 전체 색상 테마 변경 | `src/design-tokens.css` |
| 폰트 변경 | `src/design-tokens.css` + `index.html` (외부 폰트 link) |
| 글자 크기·굵기·행간·자간 변경 | `src/design-tokens.css`, 역할 매핑은 `src/typography.css` |
| 섹션 순서 변경 | `src/App.jsx` |
| 새로운 섹션 추가 | `src/presentation/components/` 에 신규 컴포넌트 추가 후 `src/App.jsx` 에 import |
| 내비게이션 이름 / Contact 고정 문구 | `src/presentation/components/Navbar.jsx` / `Contact.jsx` |
| HTML 제목·설명·추가할 OG 태그 | `index.html` |
| 파비콘 변경 | `public/favicon.svg`, ICO·Apple PNG 재생성, `index.html`; [아이콘 가이드](docs/icons.md) 참고 |

---

## 자주 묻는 질문

**Q. 프로젝트 이미지를 넣으려면?**
`public/images/projects/`에 이미지를 추가하고 `PROJECTS[n].image`를 `projects/파일명.webp`로 설정합니다. `/images/` 접두사는 넣지 않습니다. `imageAlt`와 `imageCaption`도 실제 이미지에 맞게 수정하세요. 기본 6개 이미지는 프로젝트 주제를 설명하기 위한 AI 생성 예시이며 실제 프로젝트 화면이 아닙니다. [파일 목록과 교체 방법](docs/project-images.md)을 참고하세요.

**Q. GitHub / 데모 링크 버튼을 숨기려면?**
해당 `PROJECTS[n].github` 또는 `PROJECTS[n].demo` 값을 `null`로 설정합니다.

**Q. 경력이 없는 신입인 경우?**
`CAREERS` 배열을 빈 배열 `[]`로 설정하면 경력 항목만 없어집니다. 제목과 메뉴까지 숨기려면 `App.jsx`와 `Navbar.jsx`를 함께 수정합니다.

**Q. stats 카드를 4개보다 줄이거나 늘리려면?**
`PROFILE.stats` 배열의 원소 수를 조정하면 About의 2열 통계가 바뀝니다. Hero 보조 카드는 1024px 이상 화면에서 첫 3개만 표시하므로 그 개수를 바꾸려면 `Hero.jsx`의 `slice(0, 3)`도 수정합니다.
