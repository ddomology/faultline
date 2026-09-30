# Faultline React 이전 기록

## 현재 체크포인트

- 단계: **1회차 — 기반 구축 완료** (2026-09-30).
- 브랜치: `refactor/react-foundation`.
- 시작 커밋: `c5a1622e23eef1e02d82cb7c76597be54b6cf511`.
- 현재 GitHub Pages는 기존 `main`의 Quartz 사이트로 운영합니다. 이 브랜치에는 배포 전환이 없습니다.
- 새 코드: [`react-site/`](../react-site/). 설치·실행 방법은 [React README](../react-site/README.md)에 있습니다.

## 1회차에서 확인한 구조

React 19.3.0, TypeScript 7.0.2, React Router 8.4.0, Vite 8.3.1을 lockfile로 고정했습니다. React Router Framework Mode의 `ssr: false`와 `prerender`로 서버 없이 제공할 HTML과 이동용 데이터를 빌드합니다. `.server.ts`의 전체 글 HTML은 브라우저 JavaScript 번들로 보내지 않습니다.

1. 기존 `content/`를 읽어 노트 목록·본문 HTML·경로 manifest를 생성합니다. 원문은 수정하지 않습니다.
2. React 공통 레이아웃 아래에서 홈과 글을 렌더링합니다. 헤더·Explorer는 React가 유지하며, 이전 DOM 교체 라우터는 실행하지 않습니다.
3. 각 글을 `.html` 주소와 기존 검색의 확장자 없는 주소로 사전 렌더링합니다.
4. React Router가 생성한 `base/path.html/index.html`을 `path.html` 파일로 정리하고, 에셋·이동용 `.data` 파일을 합칩니다.
5. 실제 파일만 제공하는 정적 서버에서 HTTP 200, 새로고침, 클라이언트 이동, 404를 검사합니다. SPA fallback에 의존하지 않습니다.

참고 문서: [React Router pre-rendering](https://reactrouter.com/how-to/pre-rendering).

## 보존 범위와 현재 상태

| 항목 | 1회차 상태 |
| --- | --- |
| 원본 Markdown | 273개 공개 노트의 파일 SHA-256 동일성 검증 |
| 글 주소 | 기존 273개 `.html` 파일 + 확장자 없는 별칭 273개 생성 |
| 첨부 | PNG 13개·CSV 1개를 바이트 그대로 복사, 내부 미해결 링크 0개 |
| 분류 | 31개 주제, 풀이 노트 273개, 개념 노트 0개 |
| 작성 상태 | `solution` 5개·`problem` 268개 구분 |
| 제목과 번호 | 한국어 제목·영어 원제·Explorer 짧은 제목·기존 고정 번호 유지 |
| 기본 본문 | 기본 Markdown, GFM 표, 코드 텍스트, 한글 제목 앵커, 이미지 연결 |
| 브랜드 | Faultline 로고·주제 SVG·폰트·빨간 포인트·밝은/어두운 테마 재사용 |
| 화면 | 공통 React 헤더·Explorer, 기본 주제 목록, 개념 빈 상태, 글 화면 |
| 경로 설정 | `site.config.mjs`에서 base path·origin·repository URL 관리 |

`draft` 속성으로 글을 숨기지 않습니다. 기존 공개 정책대로 `private`, `templates`, 점으로 시작하는 관리 폴더만 제외합니다. 글 속 HTML은 일반 본문용으로 정제하며 코드 예제는 실행하지 않습니다.

정적 홈은 검색 문자열과 무관하게 같은 HTML을 제공하므로 첫 hydration 이후 URL의 `view`·`topic`을 적용합니다. 이 단계는 쿼리가 있는 직접 접속에서 서버/브라우저 마크업이 달라지는 문제를 막습니다. 폴더 확장 상태는 공통 React 레이아웃에 두고, 모바일 메뉴는 이동 완료 후 닫힙니다.

## 검증 결과

| 검사 | 결과 |
| --- | --- |
| TypeScript 및 Router 타입 생성 | 통과 |
| Node 테스트 | 12/12: 콘텐츠 원문·첨부·URL·안전한 렌더링·정적 출력·base path |
| 현재 base `/portswigger-lab-notes/` 브라우저 검사 | 데스크톱/Pixel 7 에뮬레이션 8/8 |
| 변경 base `/faultline/` | 전체 빌드·정적 참조 검사, PC/모바일 클라이언트 이동 2/2 |
| 정적 파일 전체 검사 | 글 273개·홈·404, 확장자 없는 별칭 273개, 로컬 참조 299개 |
| JavaScript 비활성화 | 대표 글의 제목·본문·코드 텍스트 제공 |
| 공통 화면 유지 | 홈→글 이동에서 새 document 요청 없이 헤더·Explorer DOM 동일 |
| 기존 경로 | `.html` 직접 접속·새로고침, 확장자 없는 경로, 한글 fragment |
| 오류 | 위 브라우저 검사에서 hydration/JavaScript 오류 없음, 미등록 경로 HTTP 404 |

모바일 검사는 터치 에뮬레이션입니다. 사용자 실제 휴대폰에서 앱/창 전환 후 스크롤과 뒤로 가기는 4회차의 별도 완료 조건입니다.

## 다음 회차

### 2회차 — 탐색 완성

- 검색·난이도·정렬·더 보기·최근 수정일과 `q/topic/level/sort/view` URL 상태를 이전합니다.
- 검색 결과·목록 길이·Explorer 위치·뒤로 가기 복원 규칙을 React Router 기준으로 구현합니다.
- 데스크톱과 모바일의 메뉴·포커스·스크롤 정책을 분리합니다. 사용자 스크롤에 늦은 자동 복원이 끼어들지 않게 검증합니다.
- 목록 메타데이터의 전달 크기를 줄입니다. 현재는 전체 Explorer 목록을 각 페이지에 넣고 모든 별칭도 사전 렌더링해 정적 출력이 약 294 MB입니다. 대표 글 HTML은 약 354 KB(단순 gzip 약 56 KB)이며, 이는 모바일 성능 검증 완료를 뜻하지 않습니다.
- 실제 학습 글과 기능을 추가하기 전에 목록 데이터의 공통 캐시·별칭 중복 출력·필요한 트리만 렌더링하는 방식을 검토합니다.

### 3회차 — 본문 호환

- 기존 `site/reader-code.ts`, `code-format.ts`, `code-highlight.ts`의 빌드 기능을 재사용/분리해 자동 정렬·Shiki·원문 복사를 옮깁니다.
- Obsidian callout/위키링크, 수식, 이미지 크기·확대, 목차, 이전·다음 링크, 원문 표시 등을 이식합니다.
- 현재 `.generated/manifest.json`의 `renderer.pending`와 `compatibility`에 미이전 항목을 기록합니다. 고급 문법이 있는 첫 5개 글을 집중 대조합니다.
- 글의 본문이나 실습 내용을 새로 작성하지 않습니다.

### 4회차 — 교체 승인 조건

- 폴더·태그·`notes.html`·`guide.html` 등 기존 이동 페이지와 이전 query 값을 확인합니다.
- 검색 엔진 메타데이터, 사이트맵, 공유 이미지, 짧은 탭 제목과 날짜 표기의 기존 동작을 대조합니다.
- 느린 연결·연속 클릭·오프라인 실패·검색 키보드·hash·뒤로/앞으로·창 전환 후 스크롤을 확인합니다.
- GitHub Pages 교체 배포 때 오래된 HTML이 삭제된 Vite 해시 에셋을 요청하는 문제를 해결합니다. 현재 사이트의 고정 파일명+버전 쿼리 전략을 잊지 않습니다. 새 빌드의 해시 파일을 그대로 운영 배포하는 것은 아직 검증하지 않았습니다.
- 실제 모바일 확인과 기능 대조 후에만 운영 워크플로를 바꾸고, 이전 배포로 복구할 경로를 확보합니다.

## 이어서 작업할 때

`refactor/react-foundation`을 이어 사용합니다. 생성 디렉터리 `.generated`, `.react-router`, `build`, `dist`, `public`은 커밋하지 않습니다. 새 체크포인트마다 이 문서에 완료 범위·검증·남은 문제를 갱신합니다. `main` 병합과 운영 사이트 교체는 이번 1회차에 포함되지 않습니다.
