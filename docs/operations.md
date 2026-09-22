# Sample 01 실행·빌드·배포

이 저장소의 운영 원본은 [creatorjun/sample_01](https://github.com/creatorjun/sample_01)입니다. [샘플 소개 주소](https://qtlab.kr/sample_01)는 플랫폼이 만드는 iframe wrapper이며, React 정적 사이트는 [sample-01.qtlab.kr](https://sample-01.qtlab.kr/)에서 제공합니다. wrapper의 HTML·CSP는 이 저장소가 아니라 플랫폼이 관리합니다.

## 실행과 확인

Node.js 22.12 이상과 npm으로 저장소 루트에서 실행합니다.

```sh
npm ci --no-audit --no-fund
npm run dev
npm run build
npm run preview
```

Vite 기본 개발 주소는 `http://localhost:5173`, 미리보기는 `http://localhost:4173`이며 이미 사용 중이면 다른 포트를 안내할 수 있습니다. 터미널에 표시된 주소를 사용하세요. `build`는 Vite 번들 생성이며 별도 TypeScript 검사는 없습니다. `lint` 명령은 남아 있지만 ESLint 의존성·설정이 없어 현재 검증 명령으로 사용할 수 없습니다. 영구 테스트 러너와 `npm run package` 스크립트도 없습니다.

배포 전에는 밝은·어두운 테마, 320px·태블릿·데스크톱 레이아웃, 섹션 이동, 프로젝트 카드와 이미지 실패 안내, 모달 닫기·Escape·포커스 복귀, 이메일·외부 링크를 확인합니다. 외부 폰트 요청이 실패할 때는 토큰에 지정된 대체 글꼴을 사용합니다.

## 업로드 ZIP

`platform.json`의 소스 빌드 계약은 `kind: vite`, `node_major: 22`, `spa: false`, `public_env: []`입니다. 플랫폼은 `npm ci --no-audit --no-fund` 후 `npm run build`를 실행하고 `dist/`를 게시합니다. 페이지 이동은 해시 앵커이며 SPA fallback을 요구하지 않습니다. 이미지·아이콘 경로는 `/images/`, `/favicon.*`처럼 루트 기준이므로 임의 하위 경로에 복사해 서비스하는 방식은 별도 경로 조정이 필요합니다.

소스 ZIP은 **커밋된 HEAD**에서 생성할 수 있습니다. 필요한 수정은 먼저 커밋해야 포함되며, 아래 명령은 커밋이나 배포를 대신 수행하지 않습니다.

```sh
mkdir -p artifacts
git archive --format=zip --output=artifacts/sample-01-source.zip HEAD
```

정적 ZIP은 빌드된 `dist/` 내용과 정적 배포용 manifest를 압축 루트에 넣습니다. 아래 예시는 Python 3 표준 라이브러리를 사용하며 Node 의존성을 추가하지 않습니다.

```sh
npm run build
python3 - <<'PY'
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json

output = Path('artifacts')
output.mkdir(exist_ok=True)
archive = output / 'sample-01-static.zip'
assert Path('dist/index.html').is_file(), '먼저 빌드하세요.'
with ZipFile(archive, 'w', compression=ZIP_DEFLATED) as bundle:
    for path in sorted(Path('dist').rglob('*')):
        if path.is_file() and path.name != 'platform.json':
            bundle.write(path, path.relative_to('dist'))
    bundle.writestr('platform.json', json.dumps({
        'schema_version': 1, 'kind': 'static', 'spa': False,
    }) + '\n')
print(hashlib.sha256(archive.read_bytes()).hexdigest(), archive.name)
PY
```

`dist/` 폴더 자체를 바깥 디렉터리로 감싸지 않습니다. ZIP 루트에 `index.html`, `assets/`, `images/`, 세 아이콘과 `platform.json`이 있어야 합니다. 소스용 `kind: vite` manifest를 정적 ZIP에 그대로 넣지 않습니다. 기존 GitHub 푸시는 정적 사이트를 자동 배포하지 않으므로, 플랫폼의 기존 `sample-01` 사이트에서 업로드·검증·배포를 별도로 수행합니다.

## 확인된 운영 릴리스

다음은 2026-09-22 배포 기록이며 실시간 상태 조회 결과는 아닙니다. 이후 문서 커밋은 아래 실행 코드 릴리스와 구분합니다.

| 항목 | 값 |
| --- | --- |
| 실행 코드 커밋 | `ab8d32aad8b7efd4f62eaf7f3365d8a63157f97c` |
| 릴리스 | `d2d8f2c6-0629-4be1-b399-2938613d2112` |
| 기록 상태 | `verified`, 공개 정적 파일 12개 대조 |
| 확인 시각 | 2026-09-22 11:02:58 KST |
| 업로드 ZIP SHA-256 | `513b908b8496b8dd747503041d59d94e04316c82fb4b0300c7304696759d935a` |

근거는 운영 작업 공간의 `WebSite/artifacts/deployment/favicons-20260922-sites/`에 있는 `sample-01-release-input.json`, `state.json`, `static-deployment-completed.json`입니다. 이 로컬 운영 기록은 이 저장소에 포함되지 않습니다. 새 ZIP을 위 예시로 만들면 ZIP 메타데이터 때문에 압축 파일 해시는 달라질 수 있으며, 이 표는 당시 업로드 파일의 식별값입니다.

SVG·ICO·Apple 아이콘은 [아이콘 가이드](icons.md), 이미지 6장과 모달은 [프로젝트 이미지 가이드](project-images.md), 의존성 구조는 [아키텍처 기록](architecture-review.md)을 참고하세요.
