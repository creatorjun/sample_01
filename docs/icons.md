# 사이트 아이콘

`public/favicon.svg`가 원본입니다. 개발자 포트폴리오의 주 색상과 `</>` 심볼을 사용하며, ICO에는 16·32·48px PNG 프레임이 들어 있습니다. Apple 터치 아이콘은 배경색 `#01696f`를 채운 불투명 180×180px PNG입니다. `index.html`은 ICO → SVG(`sizes="any"`) → Apple 아이콘 순서로 연결합니다.

저장소 루트에서 다음 명령으로 래스터 파일을 다시 만듭니다. 아래 경로는 작업 환경에 이미 제공된 Node.js와 sharp이며 프로젝트 의존성을 추가하지 않습니다. 다른 환경에서는 두 경로를 설치된 런타임 위치로 바꿉니다.

```sh
ICON_SHARP=/Users/home/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp \
/Users/home/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node <<'JS'
const fs = require('node:fs/promises');
const sharp = require(process.env.ICON_SHARP);
(async () => {
  const svg = await fs.readFile('public/favicon.svg');
  const sizes = [16, 32, 48];
  const frames = await Promise.all(sizes.map(n => sharp(svg).resize(n, n).png().toBuffer()));
  const header = Buffer.alloc(6 + 16 * sizes.length);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(sizes.length, 4);
  let offset = header.length;
  frames.forEach((frame, i) => {
    const position = 6 + 16 * i;
    header[position] = header[position + 1] = sizes[i];
    header.writeUInt16LE(1, position + 4);
    header.writeUInt16LE(32, position + 6);
    header.writeUInt32LE(frame.length, position + 8);
    header.writeUInt32LE(offset, position + 12);
    offset += frame.length;
  });
  await fs.writeFile('public/favicon.ico', Buffer.concat([header, ...frames]));
  await sharp(svg).resize(180, 180).flatten({background: '#01696f'})
    .png().toFile('public/apple-touch-icon.png');
})().catch(error => { console.error(error); process.exitCode = 1; });
JS
```

다시 빌드하면 세 파일이 `dist/`에 그대로 복사됩니다. 배포 ZIP에도 세 파일을 함께 포함합니다.
