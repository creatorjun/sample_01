# 프로젝트 이미지 가이드

샘플 01의 여섯 프로젝트에 연결하는 예시 이미지입니다. 프로젝트의 기술 주제를 보여주기 위한 AI 생성 이미지이며 실제 게임·서비스·개발 도구의 스크린샷이나 구현 완료의 증거가 아닙니다. 카드와 상세 화면에 `AI 생성 예시 이미지` 캡션을 함께 표시합니다.

## 파일과 주제

이미지는 `public/images/projects/`에 저장합니다. `src/config.js`의 `PROJECTS`가 이미지 경로·대체 텍스트·캡션을 관리합니다.

| 프로젝트 | 파일명 | 시각화 주제 |
| --- | --- | --- |
| ProtoEngine | `proto-engine.webp` | 석조 아치·반사 수면·구체·큐브의 3D 렌더링 장면 |
| GameSync Server | `game-sync-server.webp` | 중앙의 빛나는 코어에 네 플레이어 캐릭터 플랫폼이 연결된 동기화 개념 |
| DevAdmin Dashboard | `dev-admin-dashboard.webp` | 청록색 선그래프·주황색 막대그래프·활동 목록의 대시보드 목업 |
| Casual Puzzle Mobile | `casual-puzzle.webp` | 민트·살구·라일락색 블록의 캐주얼 퍼즐 보드 |
| AI NPC Dialogue | `ai-npc-dialogue.webp` | 등불이 켜진 판타지 상점에서 상인과 여행자가 대화하는 장면 |
| Shader Playground | `shader-playground.webp` | 유리 구체·반사 금속 구체·무지갯빛 토러스의 재질 렌더링 |

## 생성 예시 출처

이 여섯 이미지는 샘플 사이트용으로 Codex의 이미지 생성 도구를 사용하여 새로 제작한 시각 자료입니다. 외부 제품의 실제 화면을 프로젝트 결과물로 소개하지 않습니다. 이미지의 장면과 시각화는 주제 표현을 위한 예시이며 동작·성능·출시 실적을 입증하지 않습니다. 생성 원본의 크기와 내용을 바꾸지 않고 품질 82의 WebP로 인코딩했습니다. 여섯 파일은 각각 1672 × 941px입니다.

## 교체 방법

1. 사용할 이미지를 WebP 등 브라우저가 지원하는 형식으로 준비하고 `public/images/projects/`에 넣습니다. 약 16:9 비율을 권장합니다.
2. `src/config.js`의 해당 프로젝트에서 아래 세 필드를 함께 변경합니다.

   ```js
   image: 'projects/proto-engine.webp',
   imageAlt: '석조 아치와 반사 수면, 구체와 큐브로 구성한 3D 렌더링 장면',
   imageCaption: 'AI 생성 예시 이미지',
   ```

3. `image`는 **`public/images/` 기준 상대 경로**입니다. 앞에 `/images/`를 다시 붙이거나 외부 URL을 넣지 않습니다. 실제 요청 주소는 `/images/projects/proto-engine.webp`가 됩니다.
4. `imageAlt`는 실제 이미지의 핵심 내용을 설명하고, `imageCaption`은 실제 출처·성격에 맞게 작성합니다. 실제 프로젝트 화면으로 교체했다면 AI 예시라는 캡션도 함께 수정합니다. 이미지가 없다면 `image: null`로 설정합니다.
5. `npm run build` 후 카드와 상세 모달에서 이미지·대체 텍스트·캡션을 확인합니다. 모바일 화면에서 이미지나 문구가 잘리지 않는지도 확인합니다.

카드는 같은 16:9 영역을 채우도록 이미지를 자를 수 있으며, 상세 모달은 `object-contain`으로 이미지 전체를 보여줍니다. 이미지에는 `loading="lazy"`와 `decoding="async"`가 적용됩니다. 파일이 없거나 로딩에 실패하면 React로 대체 안내를 표시하고 프로젝트 제목·설명은 유지합니다.

카드 전체는 키보드로 열 수 있는 버튼입니다. 상세 화면은 native `dialog`로 열리며, 닫기 버튼·Escape·바깥 영역 클릭으로 닫을 수 있습니다. 닫으면 원래 카드로 포커스가 돌아가며 이전 페이지 스크롤 상태를 유지합니다.
