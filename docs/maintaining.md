# Faultline 글 작성과 사이트 관리

[← 프로젝트 소개](../README.md) · [노트 읽기](https://ddomology.github.io/faultline/)

## 노트 메타데이터

`content/` 아래에 Markdown 파일을 저장합니다. Obsidian에서는 이 폴더를 보관함으로 엽니다. [템플릿](../content/templates/lab.md)을 복사하거나, 이미 있는 실습 노트에 내용을 이어 씁니다.

```yaml
---
title: 내 풀이 제목
lab_url: https://portswigger.net/web-security/주제/lab-문제명
tags:
  - portswigger
  - 주제
note_kind: solution
---
```

- `lab_url`: 실습 원문 주소. 같은 실습의 대표 노트 하나에만 지정합니다.
- `note_kind: problem`: 문제 조건과 설명을 정리한 상태. 풀이 노트 목록에서 공사 안내판 SVG와 `작성 중` 표시가 붙습니다.
- `note_kind: solution`: 직접 탐색하거나 풀이한 내용을 기록한 상태.
- 일반 개념 노트는 `lab_url`을 생략합니다. 선택적으로 `category`, `category_title`을 지정하면 해당 분류에서 찾을 수 있습니다.

Explorer는 선택한 탭에 맞춰 풀이 노트와 개념 노트의 주제·글을 따로 보여 줍니다. 개념 노트의 주제는 공개한 글의 `category`에서 자동으로 구성하며, 글이 없는 주제는 표시하지 않습니다. 각 탭의 펼침 상태와 스크롤 위치도 별도로 기억합니다.

풀이를 시작할 때 새 페이지를 만들 필요는 없습니다. 기존 문제 설명 아래에 시도와 결과를 추가하고 `note_kind`를 바꿉니다. 노트의 수정일은 해당 파일의 최근 Git 커밋을 기준으로 표시합니다.

## 풀이 기록 양식

`문제 조건과 설명` 뒤에는 `탐색 및 풀이 기록`의 `초기 관찰`·`실행 과정`, `최종 결과`, `배운 점` 순서로 작성합니다. 실행 과정에는 시도한 이유, 실제 결과, 해석을 함께 적고 관련 코드·요청·응답·스크린샷을 가까이에 둡니다.

HTML 주석은 작성 안내이며 사이트 본문에는 표시되지 않습니다. 빈 항목이나 주석만 추가한 것은 풀이 기록이 아니므로, 직접 확인한 내용을 쓰기 전에는 `note_kind: problem`을 유지합니다.

## 이미지와 본문

이미지와 자료는 노트 근처에 두고 상대 경로로 연결합니다. 저장소 안의 이미지와 이 저장소를 가리키는 기존 raw GitHub 이미지에는 빌드할 때 가로·세로 크기를 기록합니다. 이미지가 늦게 로드되어도 자리를 확보해 본문 밀림을 줄입니다.

Markdown·위키링크·콜아웃·표·코드·수식은 빌드에서 검증한 본문 트리를 React로 렌더링합니다. 원문 제목이 첫 제목으로 반복되면 빌드 복사본에서만 중복을 정리하며 원본 Markdown은 유지합니다.

코드블록에는 언어와 복사 버튼이 표시됩니다. 가로로 긴 코드에는 줄바꿈 버튼이 추가됩니다. 줄 번호는 코드 펜스에 `showLineNumbers`를 지정한 경우에만 표시합니다. 코드 제목·캡션·줄 강조도 지원합니다.

정렬할 수 있는 코드는 처음부터 정렬본을 보여 주며, `원문 / 정렬`로 전환할 수 있습니다. 복사 버튼은 현재 보고 있는 버전을 복사합니다. 원문 모드에서는 탭·공백·빈 줄까지 그대로 보존합니다. 줄바꿈 버튼은 화면의 표시만 바꾸며 복사 내용에는 영향을 주지 않습니다. 작성자가 줄·단어 강조를 지정한 블록은 해당 위치를 보존하기 위해 원문을 기본으로 표시하며, 정렬본에는 강조를 옮기지 않습니다.

정렬본은 빌드할 때 미리 생성하며 브라우저에는 포매터나 편집기를 싣지 않습니다. 코드가 불완전하거나, 지원하지 않는 언어이거나, 정렬 전후가 같으면 전환 버튼이 나타나지 않습니다. 64 KiB를 넘는 코드는 원문만 표시합니다. 자동 정렬을 제외할 블록에는 `~~~python noformat`처럼 `noformat`을 붙입니다.

SQL은 절의 키워드·내용과 짧은 컬럼 목록을 88자 안에서 같은 줄에 두고, 긴 목록·중첩 표현식·주석에는 구조에 맞는 들여쓰기를 유지합니다. 줄을 합친 결과는 같은 SQL 방언으로 다시 정렬해 문자열·주석을 포함한 기존 출력과 일치할 때만 사용합니다. 코드블록 바깥 박스에는 별도 탭 정지점을 만들지 않으며, 가로로 넘치는 코드 영역만 키보드 포커스를 받습니다.

| 코드 종류 | 정렬 방식 |
| --- | --- |
| JavaScript·TypeScript·JSX·TSX·Flow, JSON·JSONC·JSON5 | Prettier |
| HTML·Vue·Angular, CSS·SCSS·Less, Markdown·MDX, YAML·GraphQL·Handlebars | Prettier |
| XML·SVG, PHP, Java, Bash·POSIX Shell·mksh·Dockerfile | Prettier와 언어별 플러그인 |
| Python, Go, Rust, Kotlin | Ruff·gofmt·rustfmt·ktfmt의 빌드용 WASM 포매터 |
| C·C++·C#·Objective-C·Objective-C++, Protocol Buffers | clang-format |
| TOML | Taplo |
| SQL과 PostgreSQL·MySQL·Oracle·SQL Server 등 20개 SQL 표기 | SQL Formatter, 코드 펜스의 언어로 방언 지정 |

문법 강조는 고정된 Shiki 1.26.2의 218개 언어를 지원합니다. PowerShell·HTTP처럼 자동 정렬 대상이 아닌 코드도 강조·복사·긴 줄 표시를 사용할 수 있습니다. `psm1`, `psd1`, `https`, `svg`와 SQL 방언 등 자주 쓰는 표기도 해당 강조 문법으로 연결합니다. 정확한 정렬 지원 언어와 별칭은 `site/code-format.ts`에 있습니다.

밝은·어두운 테마 모두 `site/code-highlight.ts`의 팔레트를 자동 적용합니다. GitHub 테마의 언어별 규칙을 유지하면서 문자열·키워드·함수의 색을 구분합니다. PowerShell은 빌드용 문법 사본에 옵션과 주요 실행 명령의 강조를 보완합니다. `pwsh` 언어 표기도 지원하며, 문자열·주석·연산자와 원문은 그대로 보존합니다.

닫히지 않은 따옴표 등으로 시작하는 SQL 조각은 `~~~sql fragment`로 표시합니다. `~~~mysql fragment`처럼 SQL 방언 표기도 지원하며, `~~~sql-fragment`는 같은 모드의 별칭입니다. 조각에는 자동 정렬을 적용하지 않고 원문·줄바꿈·복사 내용을 유지합니다. 도구 모음에는 `SQL · 조각`처럼 표시됩니다.

SQL 조각은 별도의 Shiki 문법으로 키워드·숫자·함수·주석과 같은 줄에서 완결된 문자열을 강조합니다. 앞에 단독으로 남은 작은따옴표는 뒤의 문자열과 잘못 짝짓지 않으며, 닫히지 않은 문자열이 다음 줄까지 색을 덮지 않습니다. 주변 문맥이 없는 조각의 문법 정확성을 판정하는 기능은 아닙니다. 여러 줄 문자열을 포함한 완성된 SQL에는 일반 `sql` 모드를 사용합니다. 다른 언어에 `fragment`를 붙이면 정렬만 제외하고 기존 문법 강조를 유지합니다.

강조를 완전히 끄려면 `~~~sql nohighlight`를 사용합니다. `nohighlight`는 다른 언어에도 적용할 수 있으며 `fragment`보다 우선합니다. 원문과 복사 내용은 그대로 유지됩니다.

제목 링크, 가로로 넘치는 코드·표, 접을 수 있는 콜아웃은 키보드로도 조작할 수 있습니다.

## 공개 범위

`content/`의 일반 노트는 모두 공개됩니다. `draft` 값으로 숨기는 기능과 브라우저 초안 작성 기능은 사용하지 않습니다. `private`, `templates`, `.obsidian`, `.trash` 폴더는 사이트 빌드에서 제외합니다.

저장소 자체가 공개이므로 사이트에서 제외한 파일도 GitHub에는 공개됩니다. 쿠키·토큰·API 키 등은 커밋하지 마세요.

## 빌드와 배포

`main`에 커밋을 반영하면 [배포 워크플로](../.github/workflows/publish.yml)가 실행됩니다. GitHub Pages의 배포 소스는 **GitHub Actions**입니다.

Node.js 24.15 이상을 사용합니다. 저장소 루트와 `react-site/`에서 각각 `npm ci --include=dev --ignore-scripts`를 실행한 뒤, `react-site/`에서 다음 명령으로 검사합니다.

```bash
npm run typecheck
npm test
npm run build
npm run check:static
npx playwright install --with-deps chromium webkit
npm run test:browser
```

운영 워크플로는 빌드 후 공개 사이트의 직전 두 버전 에셋을 해시 검증해 `dist/`에 추가합니다. 가져오기가 실패하면 기존 배포를 유지합니다. 결과물을 30일짜리 `faultline-site-snapshot` 아티팩트와 Pages 아티팩트로 저장한 뒤 배포합니다. `.generated/`, `build/`, `dist/`, `public/`은 생성물이므로 직접 수정하거나 커밋하지 않습니다.

기존 `.html` 노트 주소와 확장자 없는 별칭을 유지합니다. `notes.html`은 첫 화면, `guide.html`은 README 작성 안내, 폴더·태그 주소는 검색·필터로 이동합니다. 해당 경로에 직접 작성한 노트가 있으면 그 노트를 우선합니다. 쿼리와 앵커도 보존합니다.

각 글에 canonical·공유 메타데이터·JSON-LD를 넣고 `sitemap.xml`과 작성한 글의 RSS `index.xml`을 생성합니다. 프로젝트 하위의 `robots.txt`는 도메인 루트의 robots 정책을 대신하지 않습니다. Search Console에는 사이트맵 URL을 직접 제출할 수 있으며 등록·검색 순위는 자동 보장하지 않습니다.

## 복구

React 전환 직전 화면으로 긴급 복구하려면 Actions → **Restore Quartz baseline** → **Run workflow**를 실행합니다. 이 워크플로는 전환 직전 커밋 `b8d8821f49ad666e60b7fdd6dce453b03b199654`와 고정된 Quartz 커밋으로 다시 빌드해 Pages에 배포합니다. 저장소의 `main`이나 노트 파일은 되돌리지 않습니다. 이후 추가한 글은 이 화면에 나타나지 않으며, 복구 전에 열려 있던 React 탭은 새로고침이 필요할 수 있습니다.

이후 React 변경 자체를 되돌릴 때는 문제가 된 커밋을 되돌리는 PR을 만들어 검사를 통과시킨 후 병합합니다. 최근 성공 실행의 `faultline-site-snapshot`은 배포 결과 비교·복원 자료로 30일간 보관합니다. Quartz 복구 후 React로 다시 전환하려면 `main`의 **Publish Faultline**을 수동 실행합니다.

## 화면을 수정할 때

| 파일 | 역할 |
| --- | --- |
| `site/brand.json`, `site/assets/` | 브랜드와 공통 이미지·아이콘·서체 |
| `react-site/app/components/Shell.tsx` | 헤더·Explorer·모바일 탐색 |
| `react-site/app/components/NavigationState.tsx` | 탐색 상태와 스크롤 복원 |
| `react-site/app/routes/home.tsx` | 목록·검색·필터 |
| `react-site/app/routes/note.tsx` | 글 제목·메타데이터·읽기 화면 |
| `react-site/app/components/ReaderBody.tsx` | 코드 도구·이미지 확대·본문 컴포넌트 |
| `react-site/app/components/ReaderNavigation.tsx` | 목차와 이전·다음 글 |
| `react-site/app/styles.scss`, `navigation.scss`, `library.scss`, `reader.scss` | 화면 스타일 |
| `react-site/scripts/reader-markdown.mjs` | 본문 변환·위키링크·첨부 경로 |
| `site/code-format.ts`, `site/code-highlight.ts` | 빌드용 코드 정렬과 문법 강조 |
| `react-site/scripts/retain-assets.mjs` | 이전 배포 에셋 보존·Quartz 호환 |

React Router가 이동과 문서 스크롤 복원을 관리합니다. 기존 Quartz의 `nav`, `prenav`, `notebookSetRoute`를 새 화면에 추가하지 않습니다. 이벤트와 관찰자는 React effect의 cleanup에서 해제합니다. 모바일 탐색창과 이미지 확대의 스크롤 잠금도 같은 수명 주기로 정리합니다.

## 실습 목록 갱신

해결 여부는 계정 상태의 스냅샷이며 실시간으로 동기화되지 않습니다. 저장한 목록 HTML을 로컬에서 변환한 뒤 `data/labs.json`을 반영합니다.

```bash
python scripts/import-portswigger-labs.py saved-all-practice.html --output data/labs.json --snapshot-date YYYY-MM-DD
```

목록 개수가 달라지면 README의 주제·실습 개수도 함께 갱신합니다. 이 숫자는 등록한 실습 수이며 풀이 완료 수와 다릅니다.

## 브랜드와 사이트 주소

블로그 이름은 **Faultline**입니다. `site/brand.json`의 이름과 소개를 사이트 헤더·홈 소개·공유 메타데이터에 사용하고, 홈의 검색 설명은 `content/index.md`에 둡니다. PortSwigger는 풀이 노트에서 다루는 실습 자료의 이름으로 유지합니다.

현재 저장소와 배포 주소는 `ddomology/faultline`입니다. 주소 변경은 `react-site/site.config.mjs`의 기본값 또는 `FAULTLINE_BASE_PATH`, `FAULTLINE_SITE_ORIGIN`, `FAULTLINE_REPOSITORY_URL` 환경변수로 관리합니다. 실제 지원 변수명과 예시는 `react-site/README.md`를 확인하고 README·공유 이미지 링크도 함께 갱신합니다. 원본에 남은 예전 raw 이미지 주소는 빌드에서 현재 첨부 경로로 연결합니다. GitHub 저장소 이름 변경과 달리 예전 GitHub Pages 주소는 자동 연결되지 않습니다.

## README 이미지

메인 아이콘은 사이트와 같은 `site/assets/favicon/favicon.svg`를 사용합니다. `docs/assets/readme-hero.svg`는 Faultline 이름, 방패와 붉은 사선을 사용한 벡터 배너입니다. 밝은 테마와 어두운 테마에 맞춰 색이 바뀝니다.

배너의 글자는 저장소의 Pretendard로 윤곽선을 만들어 외부 폰트를 불러오지 않습니다. 로고 윤곽의 Lucide 라이선스와 Pretendard 라이선스는 `site/assets/`에 보관되어 있습니다.

Python의 `fonttools`, `brotli`, `cairosvg`와 운영체제의 Cairo 라이브러리가 필요합니다. 저장소 루트에서 `python scripts/build-readme-hero.py`를 실행하면 `site/brand.json`을 바탕으로 README 배너와 공유 이미지 원본 `site/assets/og-image.svg`, 1200×630 PNG `site/assets/og-image.png`를 다시 만듭니다. 함께 생성된 세 파일을 커밋합니다.

공유 이미지는 서비스마다 테마가 달라도 읽히도록 밝은 색상으로 고정합니다. 사이트 준비 단계는 생성된 PNG를 복사하고, Python 이미지 생성은 사이트 배포 시 실행되는 단계가 아닙니다.
