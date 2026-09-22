# Sample 01 클린 아키텍처 검토

현재 소스의 조립 위치는 [`src/portfolioService.js`](../src/portfolioService.js), 구체 저장소는 `src/infrastructure/repositories/`입니다. 아래의 이동 전 경로·행 번호와 산출물 개수는 당시 검토 기록입니다. 이후 추가된 아이콘과 현재 운영 릴리스는 [아이콘 가이드](icons.md)와 [실행·배포 문서](operations.md)에서 확인합니다.

- 검토 기준 커밋: `7778182ac5adce02defe87f24b63d7df3d64142d` (`7778182`, 이미지·접근 가능한 프로젝트 상세 적용 상태)
- 검토일: 2026-09-22
- 범위: 기준 커밋의 Git 추적 파일 67개를 분류하고, first-party 소스·설정 57개 전체 내용을 읽었습니다.
- 판단 기준: 내부 계층의 외부 구현 의존성, 업무 규칙과 외부 I/O 책임 혼재를 확인합니다. 파일 크기·코딩 스타일·UI 상태만을 이유로 계층을 추가하지 않습니다.

## 결론

**확인된 위반은 데이터 저장소 구현과 객체 조립이 application 계층에 들어간 한 계열입니다.** 구체 저장소 5개를 infrastructure로, 조립 전용 서비스 모듈을 `src/portfolioService.js`로 이동했습니다. 기존 use case는 이미 생성자 주입을 사용하므로 그대로 유지합니다.

UI 컴포넌트의 화면·문구·데이터·이벤트 코드는 변경하지 않았습니다. Presentation에서 수정한 내용은 `PortfolioContext.jsx`의 조립 서비스 import 경로 한 줄입니다. 수정 전후 프로덕션 산출물 9개가 파일명과 SHA-256까지 동일합니다.

## 발견 근거와 수정

다음 행 번호는 검토 기준 커밋에 해당합니다.

| 기존 위치 | 확인한 의존성 | 판단과 수정 |
| --- | --- | --- |
| `src/application/repositories/CareerRepository.js:3` | `../../infrastructure/data/careersData`를 직접 import | 구체 데이터 어댑터를 `src/infrastructure/repositories/CareerRepository.js`로 이동 |
| `src/application/repositories/CoverLetterRepository.js:3` | `../../infrastructure/data/coverLetterData`를 직접 import | 구체 데이터 어댑터를 `src/infrastructure/repositories/CoverLetterRepository.js`로 이동 |
| `src/application/repositories/ProfileRepository.js:3` | `../../infrastructure/data/profileData`를 직접 import | 구체 데이터 어댑터를 `src/infrastructure/repositories/ProfileRepository.js`로 이동 |
| `src/application/repositories/ProjectRepository.js:3` | `../../infrastructure/data/projectsData`를 직접 import | 구체 데이터 어댑터를 `src/infrastructure/repositories/ProjectRepository.js`로 이동 |
| `src/application/repositories/SkillRepository.js:3` | `../../infrastructure/data/skillsData`를 직접 import | 구체 데이터 어댑터를 `src/infrastructure/repositories/SkillRepository.js`로 이동 |
| `src/application/services/PortfolioService.js:2` (2–6행), `:13` (13–17행) | 구체 저장소 5개를 import하고 모듈 평가 시 `new`로 직접 생성 | 업무 규칙이 없는 객체 조립 모듈 전체를 외부 조립 위치인 `src/portfolioService.js`로 이동 |
| `src/presentation/contexts/PortfolioContext.jsx:3` | 위 조립 모듈을 import | 이동한 모듈의 경로만 변경 |

수정 후 의존성은 아래와 같습니다.

```text
presentation/contexts/PortfolioContext
  └─ src/portfolioService.js (외부 조립)
       ├─ application/useCases (저장소를 생성자로 전달받음)
       └─ infrastructure/repositories
            ├─ domain/repositories (계약)
            └─ infrastructure/data → src/config.js (정적 콘텐츠)
```

구체 구현은 domain 계약에 의존하고, application use case는 전달받은 계약의 메서드를 호출합니다. 내부 계층은 외부 조립 모듈이나 infrastructure를 참조하지 않습니다. Context는 외부 UI 계층에서 조립된 읽기 서비스의 결과를 제공하며, 별도의 컨테이너 라이브러리·factory·새 use case를 추가하지 않았습니다.

## 변경하지 않은 항목과 이유

- `domain/entities/*`, `domain/valueObjects/Profile.js`, `domain/repositories/*`: JSDoc 데이터 계약과 저장소 인터페이스만 정의합니다. React·브라우저·구체 데이터 구현 의존성이 없습니다.
- `application/useCases/*`: 주입받은 저장소만 호출합니다. 저장소 교체가 가능한 기존 경계를 유지합니다.
- `application/data/*`: `export {}`만 있는 미사용 자리표시자입니다. 의존성 위반이 아니므로 정리 목적의 삭제를 하지 않았습니다.
- `infrastructure/data/*`와 `src/config.js`: 배포에 포함되는 정적 콘텐츠를 읽는 어댑터입니다. Profile의 기존 얕은 복사·freeze 및 나머지 컬렉션 참조 반환 동작을 유지합니다.
- `About.jsx`의 `ABOUT` 직접 import: 외부 presentation이 정적 소개 문구를 읽는 관계입니다. 업무 규칙이나 외부 I/O가 없으므로 ABOUT 전용 domain/use case를 새로 만들지 않습니다.
- `App.jsx`의 테마, `Navbar.jsx`의 메뉴, `Projects.jsx`의 선택 항목, `ProjectImage.jsx`의 로딩 실패 상태는 UI 책임입니다. 상태를 application으로 옮기지 않습니다.
- `useInView.js`, `useScrollSpy.js`, `ProjectLightbox.jsx`의 DOM·이벤트·스크롤·native dialog 처리는 UI 어댑터 책임입니다. 외부 I/O를 업무 규칙에 섞은 경우가 아닙니다.
- 프로젝트 이미지 주소·대체 텍스트·캡션과 외부 링크 라벨은 표현 데이터와 UI 포맷입니다. API 호출·업무 판단이 없으므로 별도 저장소를 만들지 않습니다.
- HTML의 외부 폰트 로딩, Vite·Tailwind·PostCSS·플랫폼 manifest는 외부 실행·빌드 설정입니다. 내부 계층이 이 설정을 참조하지 않습니다.
- 콘텐츠 오탈자, 메뉴 문구, 사용하지 않는 클래스, 기존 lint 설정 등은 이번 아키텍처 수정 범위와 분리하여 유지했습니다.

## 검증 기록

- Node.js 24.19.0 / Vite 4.5.14에서 수정 전·후 프로덕션 빌드를 실행했고 성공했습니다.
- 수정 전 산출물의 상대 경로·SHA-256을 저장한 뒤 수정 후 `dist/` 전체 9개 파일과 비교했습니다. HTML, CSS, JavaScript 및 프로젝트 이미지 6개 모두 byte 단위로 동일합니다.
- Vite SSR 모듈 로더와 Node `assert`를 이용한 임시 smoke 검증에서 서비스의 5개 조회 결과가 기존 `config.js` 값과 같음을 확인했습니다.
- 5개 use case에 각각 별도 저장소 대역을 주입하고 반환 객체의 동일성과 호출 1회를 확인했습니다. Profile 반환값의 freeze·복사, 나머지 컬렉션의 기존 참조 동일성도 확인했습니다.
- 수정 후 domain/application의 JavaScript 19개 파일을 대상으로 import 및 JSDoc import 경로를 검사했습니다. domain은 domain만, application은 application/domain만 참조하며 외향 의존성이 없습니다.
- `git diff --check`를 통과했습니다. 커밋·푸시·배포는 이 개별 검토에서 수행하지 않았습니다.
- 기존 `lint` 스크립트는 ESLint 패키지·설정이 없는 상태이므로 이번 검증 결과에 lint 성공을 포함하지 않습니다. 새 테스트 의존성이나 동작을 복제하는 영구 테스트는 추가하지 않았습니다.

빌드 결과가 동일한 모듈 이동이므로 별도의 화면 변경 검증을 완료했다고 주장하지 않습니다. 검토 후 추가 변경이 생기면 해당 변경 범위에 맞춰 다시 확인해야 합니다.

## 전수 확인 파일

아래 57개는 기준 커밋의 원래 경로입니다. 이동한 6개 파일은 수정 후 경로와 내용도 다시 확인했습니다. 별도 first-party 실행 스크립트 디렉터리는 없습니다.

### 진입점·사이트 데이터·스타일 (6개)

- `src/App.jsx`
- `src/config.js`
- `src/design-tokens.css`
- `src/index.css`
- `src/main.jsx`
- `src/typography.css`

### Domain (10개)

- `src/domain/entities/Career.js`
- `src/domain/entities/CoverLetter.js`
- `src/domain/entities/Project.js`
- `src/domain/entities/Skill.js`
- `src/domain/repositories/ICareerRepository.js`
- `src/domain/repositories/ICoverLetterRepository.js`
- `src/domain/repositories/IProfileRepository.js`
- `src/domain/repositories/IProjectRepository.js`
- `src/domain/repositories/ISkillRepository.js`
- `src/domain/valueObjects/Profile.js`

### Application — 기존 경로 기준 (15개)

- `src/application/data/careers.js`
- `src/application/data/coverLetter.js`
- `src/application/data/projects.js`
- `src/application/data/skills.js`
- `src/application/repositories/CareerRepository.js`
- `src/application/repositories/CoverLetterRepository.js`
- `src/application/repositories/ProfileRepository.js`
- `src/application/repositories/ProjectRepository.js`
- `src/application/repositories/SkillRepository.js`
- `src/application/services/PortfolioService.js`
- `src/application/useCases/GetCareersUseCase.js`
- `src/application/useCases/GetCoverLetterUseCase.js`
- `src/application/useCases/GetProfileUseCase.js`
- `src/application/useCases/GetProjectsUseCase.js`
- `src/application/useCases/GetSkillsUseCase.js`

### Infrastructure — 기존 경로 기준 (5개)

- `src/infrastructure/data/careersData.js`
- `src/infrastructure/data/coverLetterData.js`
- `src/infrastructure/data/profileData.js`
- `src/infrastructure/data/projectsData.js`
- `src/infrastructure/data/skillsData.js`

### Presentation (14개)

- `src/presentation/components/About.jsx`
- `src/presentation/components/Career.jsx`
- `src/presentation/components/Contact.jsx`
- `src/presentation/components/CoverLetter.jsx`
- `src/presentation/components/Hero.jsx`
- `src/presentation/components/Navbar.jsx`
- `src/presentation/components/Projects.jsx`
- `src/presentation/components/Skills.jsx`
- `src/presentation/components/projects/ProjectCard.jsx`
- `src/presentation/components/projects/ProjectImage.jsx`
- `src/presentation/components/projects/ProjectLightbox.jsx`
- `src/presentation/contexts/PortfolioContext.jsx`
- `src/presentation/hooks/useInView.js`
- `src/presentation/hooks/useScrollSpy.js`

### HTML·빌드·운영 설정 (7개)

- `.gitignore`
- `index.html`
- `package.json`
- `platform.json`
- `postcss.config.js`
- `tailwind.config.js`
- `vite.config.js`

## 별도 분류한 파일

- 참고 문서 3개: `README.md`, `docs/design-system.md`, `docs/project-images.md`. 기존 동작과 편집 계약을 이해하는 자료로 확인했습니다.
- 생성 이미지 6개: `public/images/projects/{proto-engine,game-sync-server,dev-admin-dashboard,casual-puzzle,ai-npc-dialogue,shader-playground}.webp`. 실행 코드가 아니므로 아키텍처 소스 검토에서 분리했습니다. 수정 전후 산출물 해시 비교에는 포함했습니다.
- 의존성 잠금 파일 1개: `package-lock.json`. 생성된 의존성 목록으로 분류하고 외부 패키지 구현의 전수 검토 대상으로 삼지 않았습니다.
- Git 비추적 생성물·외부 구현: `node_modules/`, `dist/`, `artifacts/`는 first-party 소스 검토에서 제외합니다. `dist/`는 빌드 회귀 확인에만 사용했습니다.
- 저장소에 별도로 복사된 vendor JavaScript/SDK는 없습니다. React·Vite·Tailwind 등 의존성 내부 구현은 검토 범위 밖입니다.
