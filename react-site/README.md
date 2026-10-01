# Faultline 프런트엔드

Faultline의 운영 프런트엔드입니다. Markdown을 React로 미리 렌더링해 GitHub Pages에 배포합니다.

## 실행

Node.js 24.15 이상을 사용합니다. 공통 포맷터·강조 엔진은 저장소 루트에 설치하고, React 명령은 이 폴더에서 실행합니다.

```bash
npm ci --prefix .. --include=dev --ignore-scripts
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
npx playwright install chromium webkit
npm run test:browser
```

Linux에서 시스템 라이브러리도 필요하면 `npx playwright install --with-deps chromium webkit`을 사용합니다. 데스크톱·Pixel 7·iPhone 13 에뮬레이션에서 탐색·스크롤·읽기 기능을 검사합니다. PR의 [Check Faultline](../.github/workflows/check.yml)에서도 같은 검사를 실행합니다.

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
- `scripts/build-content.mjs`: `../content/`를 읽어 본문 트리·HTML·목록·경로 manifest 생성.
- `scripts/reader-code.mjs`: 같은 폴더의 `code-format.ts`·`code-highlight.ts`를 빌드에서 사용. 코드 원문과 별도 정렬본을 보관합니다.
- `scripts/reader-markdown.mjs`: 콜아웃·위키링크·이미지 임베드·각주·표·이미지 프레임.
- `app/components/ReaderBody.tsx`: 검증된 본문 트리를 React로 렌더링하며 복사·줄바꿈·이미지 확대를 관리합니다.
- `app/components/ReaderNavigation.tsx`: 제목 앵커·목차·같은 주제의 이전/다음 글.
- `app/styles/`: 본문·이전/다음 글·이미지 확대 스타일.
- `.generated/`: 생성된 메타데이터와 서버 빌드용 본문. 커밋하지 않습니다.
- `scripts/prepare-assets.mjs`: 로고·폰트·아이콘·공유 이미지 복사.
- `scripts/export-static.mjs`: basename 출력 정리, 실제 `.html` 파일과 작은 확장자 없는 이동 페이지 생성.
- `dist/`: GitHub Pages에 배포하는 정적 출력.

React Router가 페이지 이동을 관리합니다. Markdown은 빌드에서 sanitization·Shiki·KaTeX를 적용한 본문 트리로 만들고 React 컴포넌트로 정적 HTML을 생성합니다. 현재 글의 트리만 loader로 보내며, 검색 본문과 검사용 HTML은 route data에서 제외합니다. 전체 글·Shiki·포맷터는 브라우저 JS 번들에 넣지 않습니다.

검색·필터·정렬·더 보기, 헤더 검색, Explorer 상태 유지와 뒤로 가기를 지원합니다. 최근 수정일을 정확히 만들려면 Git 전체 이력이 필요합니다. 소스 ZIP처럼 Git 이력이 없고 작성된 날짜도 없으면 수정일을 표시하지 않습니다.

## 본문 사용

- 코드 펜스에 언어를 지정하면 기존 색상표로 강조합니다. 지원되는 완성 코드에는 정렬 보기가 제공되며, 복사는 현재 선택한 보기의 정확한 문자열을 사용합니다.
- `fragment` 또는 `sql-fragment`는 조각을 강조만 하고 정렬하지 않습니다. `noformat`은 정렬을, `nohighlight`는 강조와 정렬을 끕니다. 모르는 언어·잘못된 문법은 원문으로 남깁니다.
- `title`, `caption`, `showLineNumbers`, 줄/단어 강조 메타데이터를 유지합니다. 원문 위치를 가리키는 강조가 있으면 첫 화면도 원문입니다.
- `[!tip]` 등의 콜아웃, `+`/`-` 접기, 위키링크와 이미지 임베드, `$...$`/`$$...$$` 수식, 각주를 지원합니다. 코드 블록 안의 표기에는 적용하지 않습니다.
- 로컬 이미지 크기를 HTML에 넣고, 이미지를 누르면 확대합니다. Escape·닫기·뒤로 가기 때 포커스와 스크롤 잠금을 정리합니다.
- 코드 버튼 자리를 초기 HTML에도 확보해서 hydration 이후 본문이 밀리지 않게 합니다. JavaScript 없이도 본문·강조·수식·접는 콜아웃·목차·이전/다음 링크가 남습니다.

현재 공개 글에서 사용하지 않는 Mermaid 도표 렌더링과 다른 노트 본문 전체 삽입은 아직 지원하지 않습니다. Mermaid는 읽을 수 있는 코드로, 노트 임베드는 링크로 남기며 `manifest.renderer.pending`에 기록합니다. 모바일 자동 검사는 Chromium과 WebKit 에뮬레이션이며 실제 휴대폰의 앱 전환 동작까지 보장하지 않습니다.


## 배포 호환성

`npm run build`가 canonical·Open Graph·JSON-LD, `sitemap.xml`, `index.xml`과 배포 버전 목록을 함께 만듭니다. 기존 `.html`과 확장자 없는 노트 주소, 폴더·태그·작성 안내 주소를 지원합니다. 404는 실제 HTTP 404를 반환하는 정적 문서이며 앱을 재초기화하지 않습니다.

운영 배포는 `node scripts/retain-assets.mjs`로 공개 사이트의 직전 두 버전 에셋을 해시 검증해 추가합니다. 가져오기에 실패하면 배포를 중단합니다. React의 경로 데이터가 다른 버전이면 목적 주소를 유지한 채 새 문서를 한 번 불러옵니다. 세 버전보다 오래 열린 탭은 직접 새로고침이 필요할 수 있습니다.

네트워크 문제로 글 이동에 실패하면 Explorer를 유지한 상태에서 다시 시도할 수 있습니다. 브라우저의 저장된 테마는 앱 초기화 전에 적용합니다. 운영 복구 방법은 [관리 문서](../docs/maintaining.md#복구)를 참고하세요.
