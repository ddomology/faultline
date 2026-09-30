# Faultline React migration

React 이전 1–2회차 작업입니다. 현재 운영 사이트와 별개로 실행하며, 운영용 Quartz 워크플로는 유지합니다. 진행 상태와 다음 작업은 [이전 기록](../docs/react-migration.md)에 있습니다.

## 실행

Node.js 24.15 이상에서 이 폴더를 작업 디렉터리로 사용합니다.

```bash
npm ci --include=dev --ignore-scripts
npm run dev
```

기본 주소는 `http://localhost:5173/faultline/`입니다. 정적 배포 결과를 검사할 때는 아래 명령을 사용합니다.

```bash
npm run typecheck
npm test
npm run build
npm run check:static
npm run preview
```

정적 미리보기 주소는 `http://127.0.0.1:4173/faultline/`입니다. 이 서버는 SPA fallback을 사용하지 않으며, 실제로 없는 경로는 HTTP 404를 반환합니다.

브라우저 검증:

```bash
npx playwright install chromium
npm run test:browser
```

Linux에서 시스템 라이브러리도 필요하면 `npx playwright install --with-deps chromium`을 사용합니다. 데스크톱 및 Pixel 7 터치 에뮬레이션을 검사합니다. 실제 모바일 기기에서의 전환·터치·뒤로 가기 검증은 후속 단계에 포함됩니다.

## 사이트 주소 설정

배포 경로는 [`site.config.mjs`](site.config.mjs)에서 통합 관리합니다.

| 환경 변수 | 기본값 | 용도 |
| --- | --- | --- |
| `FAULTLINE_BASE_PATH` | `/faultline/` | 라우터·에셋·본문 링크·정적 출력 경로 |
| `FAULTLINE_SITE_ORIGIN` | `https://ddomology.github.io` | canonical·공유 이미지의 도메인 |
| `FAULTLINE_REPOSITORY_URL` | `https://github.com/ddomology/faultline` | GitHub 링크와 원본 이미지 경로 |

다른 경로의 빌드 예시는 `FAULTLINE_BASE_PATH=/preview/faultline/ npm run build`입니다. 미리보기와 검사에도 같은 값을 전달합니다. 독립 도메인의 루트 경로는 `/`를 사용합니다. 현재 저장소 이름과 배포 사이트를 바꾸는 명령은 아닙니다.

## 구성

- `app/`: React Router 공통 레이아웃과 홈·글 화면.
- `app/lib/catalog-context.tsx`: 페이지마다 복제하지 않는 공통 목록·검색 메타데이터.
- `app/lib/library-query.ts`: 검색·필터·정렬과 URL 상태. `limit`은 표시 개수를 보존합니다.
- `scripts/build-content.mjs`: 기존 `../content/`를 읽어 기본 HTML·목록·경로 manifest 생성.
- `.generated/`: 생성된 메타데이터와 서버 빌드용 글 HTML. 커밋하지 않습니다.
- `scripts/prepare-assets.mjs`: 기존 로고·폰트·아이콘·공유 이미지 복사.
- `scripts/export-static.mjs`: basename 출력 정리, 실제 `.html` 파일과 작은 확장자 없는 이동 페이지 생성.
- `dist/`: 정적 호스트 배포용 출력. 아직 운영 배포 대상이 아닙니다.

React Router만 페이지 이동을 관리합니다. 기존 `navigation.inline.ts`와 Quartz의 `nav`/`prenav` 스크립트는 불러오지 않습니다. Markdown 글은 빌드에서 HTML로 만들고 React가 본문에 표시합니다. `.server.ts` 모듈의 전체 글 데이터는 브라우저 JS 번들에 넣지 않습니다.

2회차까지 검색·필터·정렬·더 보기, 헤더 검색, Explorer 상태 유지와 뒤로 가기를 연결했습니다. 최근 수정일을 정확히 만들려면 Git 전체 이력이 필요합니다. 소스 ZIP처럼 Git 이력이 없고 작성된 날짜도 없으면 수정일을 표시하지 않습니다.

본문은 기본 Markdown·표·코드 텍스트·제목 앵커·이미지 연결을 제공합니다. 기존 Shiki 강조·자동 정렬·원문 복사·콜아웃·수식·이미지 확대의 완전한 호환은 3회차 작업입니다.
