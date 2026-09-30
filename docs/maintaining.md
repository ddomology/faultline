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

Markdown·위키링크·콜아웃·표·코드·수식은 Quartz가 렌더링합니다. 원문 제목이 첫 제목으로 반복되면 빌드 복사본에서만 중복을 정리하며 원본 Markdown은 유지합니다.

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

워크플로는 Quartz 4.5.2의 커밋 `d25a6eabf96751ffca56f8a8139272def7a65041`을 `_quartz/`에 받아 다음 순서로 빌드합니다.

1. 저장소 루트에서 `npm ci --ignore-scripts`로 고정된 코드 정렬 의존성을 설치합니다. Node.js 24.15 이상을 사용합니다.
2. `node scripts/prepare-quartz.mjs`: 설정·컴포넌트·콘텐츠를 Quartz 작업 폴더로 복사합니다. 다시 실행할 수 있습니다.
3. `_quartz/`에서 `npm ci`를 실행합니다.
4. `node scripts/build-note-index.mjs`: 공개 노트의 제목·태그·본문 검색어·수정일을 수집합니다.
5. `_quartz/`에서 `npx quartz build`를 실행합니다.
6. `node scripts/build-lab-catalog.mjs`: 렌더링 주소를 검증하고 검색 목록 및 이전 주소의 이동 페이지를 만듭니다.
7. `node scripts/fingerprint-assets.mjs`: CSS·JavaScript의 고정 경로에 `?v=내용해시`를 붙이고 HTML 참조를 검증합니다. GitHub Pages는 배포 시 이전 파일을 교체하므로, 캐시된 HTML이 삭제된 해시 파일을 요청하지 않도록 파일명은 유지합니다. `node scripts/check-asset-versioning.mjs`는 이전 HTML과 새 배포 파일을 섞어도 리소스를 읽을 수 있는지 검증합니다.

결과물인 `_quartz/public/`을 GitHub Pages에 배포합니다. `_dashboard/catalog.json`에는 전체 실습과 공개 노트 목록이, `_dashboard/notes.json`에는 공개 노트의 검색 메타데이터가 들어갑니다. 일반 개념 노트도 포함됩니다.

예전 `notes.html`은 첫 화면으로, `guide.html`은 [README의 작성 안내](../README.md#노트-작성)로 이동합니다. 자동 생성하던 폴더·태그 주소도 첫 화면의 검색·필터로 연결하며, 직접 작성한 Markdown 페이지는 유지합니다.

## 화면을 수정할 때

| 파일 | 역할 |
| --- | --- |
| `site/brand.json`, `site/tab-title.ts` | Faultline 이름·소개와 브라우저 탭 제목 |
| `site/LabExplorer.tsx`, `site/dashboard.js`, `site/dashboard.css` | 주제별 실습 목록·검색·필터·주제 안 정렬 |
| `site/TopicExplorer.tsx`, `site/topic-explorer.js`, `site/topic-explorer.css` | 주제와 실습 탐색기 |
| `site/navigation.inline.ts` | 공통 화면을 유지하는 탐색·히스토리·페이지 캐시 |
| `site/search.inline.ts` | 반복 이동에도 중복 초기화되지 않는 Quartz 검색 |
| `site/NoteTitle.tsx`, `site/explorer-titles.json` | 본문 제목과 탐색기용 짧은 제목 |
| `site/TopicIcon.tsx`, `site/topic-icons.ts`, `site/assets/icons/topics/` | 주제별 SVG 아이콘 |
| `site/DifficultyBars.tsx`, `site/difficulty-bars.scss` | 난이도 표시 |
| `site/LabPagination.tsx`, `site/lab-pagination.scss` | 같은 주제의 이전·다음 실습 |
| `site/reader.scss`, `site/quartz.layout.ts` | 읽기 화면의 공통 스타일과 배치 |
| `site/markdown.scss` | 본문·목록·인용·표·콜아웃·코드블록의 스타일 |
| `site/clipboard.inline.ts`, `site/reader-code.ts` | 코드 원문 보존, 복사와 줄바꿈 조작 |
| `site/code-format.ts`, `package.json`, `package-lock.json` | 언어별 정렬본 생성과 고정된 빌드 의존성 |
| `site/code-highlight.ts` | 전체 코드 색상과 PowerShell 문법 강조 보완 |
| `site/reader-tools.js`, `site/reader-tools.css` | 이미지 캡션과 확대 보기 |
| `site/reader-images.ts` | 빌드 시 이미지 크기 기록 |

수정은 `site/`의 원본에서 합니다. `_quartz/`의 복사본을 직접 바꾸면 다음 준비 단계에서 덮어씁니다.

주제 아이콘의 빨간 포인트는 `.topic-icon-accent`의 CSS `stroke`로 적용합니다. 준비 스크립트가 SVG 원본의 포인트 속성을 이 클래스로 바꿉니다. SVG 속성에 CSS 변수를 직접 넣으면 Dark Reader에서 포인트가 회색으로 바뀔 수 있으므로, 색상을 수정할 때는 일반 테마와 Dark Reader를 켠 화면을 함께 확인합니다.

사이트는 각 주소의 HTML을 그대로 제공하며, JavaScript가 활성화된 내부 이동에서는 사이드바와 상단 헤더를 유지하고 본문·목차·푸터만 교체합니다. `prepare-quartz.mjs`가 Quartz의 SPA 라우터를 `site/navigation.inline.ts`로 교체합니다. 스타일과 스크립트는 이동 중 제거하지 않으며, 다른 배포 버전이나 변경된 Explorer 목록을 만나면 새 문서로 이동합니다.

클라이언트 기능은 `nav`에서 초기화하고 `window.addCleanup()` 또는 `prenav`에서 이벤트·관찰자를 정리해야 합니다. 지연된 요청이 이전 화면을 갱신하지 않도록 연결 상태나 취소 신호도 확인합니다. 목록의 URL 변경은 `window.notebookSetRoute()`를 사용하고, 뒤로 가기에 따른 같은 화면의 URL 변경은 `notebook:route-update`에서 반영합니다. 페이지 캐시는 최대 10개·1분으로 제한하고, 링크에 마우스를 올리거나 키보드 초점을 둘 때 다음 화면을 미리 가져옵니다.

## 실습 목록 갱신

해결 여부는 계정 상태의 스냅샷이며 실시간으로 동기화되지 않습니다. 저장한 목록 HTML을 로컬에서 변환한 뒤 `data/labs.json`을 반영합니다.

```bash
python scripts/import-portswigger-labs.py saved-all-practice.html --output data/labs.json --snapshot-date YYYY-MM-DD
```

목록 개수가 달라지면 README의 주제·실습 개수도 함께 갱신합니다. 이 숫자는 등록한 실습 수이며 풀이 완료 수와 다릅니다.

## 브랜드와 사이트 주소

블로그 이름은 **Faultline**입니다. `site/brand.json`의 이름과 소개를 사이트 헤더·홈 소개·공유 메타데이터에 사용하고, 홈의 검색 설명은 `content/index.md`에 둡니다. PortSwigger는 풀이 노트에서 다루는 실습 자료의 이름으로 유지합니다.

현재 저장소와 배포 주소는 `ddomology/faultline`을 사용합니다. 저장소 이름을 변경할 때는 `prepare-quartz.mjs`의 `baseUrl`, `fingerprint-assets.mjs`의 사이트 주소, README·관리 문서·화면 컴포넌트의 GitHub 링크, `build-lab-catalog.mjs`의 이전 주소 이동 링크와 `reader-images.ts`의 raw 이미지 경로도 함께 확인합니다. 본문 원본의 예전 raw 이미지 주소는 `reader-images.ts`가 현재 사이트의 첨부 경로로 바꿔 렌더링합니다. 과거 GitHub 저장소 링크는 GitHub의 이름 변경 리디렉션을 이용하지만, 예전 GitHub Pages 주소는 자동으로 연결되지 않습니다.

브라우저에 저장하는 `portswigger-lab-notes:*` 키는 기존 사용자의 탐색 상태를 이어 쓰기 위해 유지합니다. 화면에 표시되는 블로그 이름이나 배포 주소가 아닙니다.

## README 이미지

메인 아이콘은 사이트와 같은 `site/assets/favicon/favicon.svg`를 사용합니다. `docs/assets/readme-hero.svg`는 Faultline 이름, 방패와 붉은 사선을 사용한 벡터 배너입니다. 밝은 테마와 어두운 테마에 맞춰 색이 바뀝니다.

배너의 글자는 저장소의 Pretendard로 윤곽선을 만들어 외부 폰트를 불러오지 않습니다. 로고 윤곽의 Lucide 라이선스와 Pretendard 라이선스는 `site/assets/`에 보관되어 있습니다.

Python의 `fonttools`, `brotli`, `cairosvg`와 운영체제의 Cairo 라이브러리가 필요합니다. 저장소 루트에서 `python scripts/build-readme-hero.py`를 실행하면 `site/brand.json`을 바탕으로 README 배너와 공유 이미지 원본 `site/assets/og-image.svg`, 1200×630 PNG `site/assets/og-image.png`를 다시 만듭니다. 함께 생성된 세 파일을 커밋합니다.

공유 이미지는 서비스마다 테마가 달라도 읽히도록 밝은 색상으로 고정합니다. 사이트 준비 단계는 생성된 PNG를 복사하고, 이미지 내용에 따른 버전 값을 공유 URL에 붙입니다. Python 이미지 생성은 사이트 배포 시 실행되는 단계가 아닙니다.
