<p align="center">
  <a href="https://ddomology.github.io/faultline/">
    <img src="site/assets/favicon/favicon.svg" alt="Faultline 방패 로고" width="64" height="64">
  </a>
</p>

<h1 align="center">Faultline</h1>

<p align="center">
  웹 보안 개념과 실습, 그 과정의 기록.
</p>

<p align="center">
  <a href="https://ddomology.github.io/faultline/"><strong>블로그 읽기 ↗</strong></a>
  &nbsp; · &nbsp;
  <a href="https://ddomology.github.io/faultline/?view=concepts">개념 노트</a>
  &nbsp; · &nbsp;
  <a href="#노트-작성">작성 안내</a>
</p>

<a href="https://ddomology.github.io/faultline/">
  <img src="docs/assets/readme-hero.svg" alt="Faultline — 웹 보안 개념과 실습, 그 과정의 기록. 붉은 사선이 가로지르는 방패." width="100%">
</a>

## Faultline에 대하여

웹이 어떻게 동작하고, 어디서 취약해지는지 공부하며 쓰는 개인 블로그입니다. 개념을 이해한 내용과 실습에서 직접 관찰한 내용을 연결해 기록합니다. 어떤 가정을 세웠는지, 무엇을 확인했는지, 결과를 어떻게 해석했는지가 글에 남도록 씁니다.

PortSwigger Web Security Academy 풀이로 시작해 HTTP·브라우저·인증과 권한 같은 기반 지식, 취약점의 원인과 대응까지 다뤄 나갑니다.

## 다루는 글

| 글 | 담는 내용 |
| --- | --- |
| **포트스위거 풀이 노트** | 문제 조건, 초기 관찰, 시도한 이유와 실제 결과, 풀이를 통해 배운 점 |
| **개념 노트** | 웹의 동작 원리와 보안 개념, 실습을 이해하는 데 필요한 배경 |
| **분석 기록** | 공부하면서 생긴 질문, 직접 확인한 동작, 원인과 대응에 대한 정리 |

현재는 **PortSwigger의 31개 주제, 273개 실습**에 대한 문제 조건과 풀이 기록을 정리하고 있습니다. 이 수치는 완료한 풀이 수가 아닙니다. 풀이 기록이 아직 없는 글에는 **작성 중** 표시가 붙습니다. 개념 노트는 메뉴를 마련한 상태이며, 개념·분석 글은 앞으로 추가합니다.

## 읽는 방법

주제와 난이도로 풀이를 찾거나 제목·본문을 검색할 수 있습니다. Explorer와 글 아래의 이전·다음 링크로 같은 주제의 글을 이어 읽습니다. 사이트 안에서 이동해도 Explorer와 헤더를 유지하며, 뒤로 가면 검색 조건과 목록 위치가 복원됩니다.

Explorer의 풀이 옆에는 난이도 막대가 표시됩니다. 데스크톱에서는 탐색기를 접고 다시 열 수 있으며, 접힌 상태와 펼친 주제·목록 위치를 기억합니다.

각 풀이 끝의 **관련 개념**에는 작성자가 직접 추가한 링크가 표시됩니다. 비어 있는 항목은 나중에 Markdown 링크 목록으로 채울 수 있습니다.

본문은 코드 문법 강조·정렬·복사, 이미지 확대와 다크 모드를 지원합니다. 실습의 영어 원제와 공식 문제 링크도 함께 표시합니다.

## 노트 작성

1. `content/`를 Obsidian 보관함으로 열거나 GitHub에서 Markdown 파일을 편집합니다.
2. 풀이 노트는 **문제 조건과 설명 → 탐색 및 풀이 기록 → 최종 결과 → 배운 점** 순서로 작성합니다. [노트 템플릿](content/templates/lab.md)을 참고할 수 있습니다.
3. 개념 노트는 [개념 템플릿](content/templates/concept.md)을 사용해 `lab_url` 없이 작성하고 `category`, `category_title`로 주제를 지정합니다. `tags: [HTTP, 쿠키, 세션]`처럼 적으면 아이콘 태그가 표시됩니다.
4. `main`에 반영하면 GitHub Actions가 사이트를 갱신합니다.

문제 설명만 정리한 노트에는 `note_kind: problem`, 직접 탐색하거나 풀이한 내용을 적은 노트에는 `note_kind: solution`을 사용합니다. 첨부 자료는 노트 가까이에 두고 상대 경로로 연결합니다.

→ [메타데이터, 본문 작성, 빌드·배포 안내](docs/maintaining.md)

→ [개념 태그 64종 미리보기와 사용법](docs/concept-tags.md)

## 저장소 구성

| 경로 | 내용 |
| --- | --- |
| [`content/`](content/) | 글과 첨부 자료의 원본 |
| [`data/labs.json`](data/labs.json) | PortSwigger 실습 목록과 상태 스냅샷 |
| [`react-site/`](react-site/) | React 화면, 본문 렌더링, 정적 빌드와 검사 |
| [`site/`](site/) | 브랜드·공통 에셋·노트 제목 데이터 |
| [`scripts/`](scripts/) | 실습 목록 가져오기, README·공유 이미지 생성 |
| [`check.yml`](.github/workflows/check.yml) | PR의 빌드·본문·브라우저 검사 |
| [`publish.yml`](.github/workflows/publish.yml) | GitHub Pages 자동 배포 |

**React · React Router · Vite**와 **GitHub Pages**로 운영합니다. 글의 원본은 Markdown으로 보관하고, 각 글의 HTML과 검색 목록은 빌드할 때 생성합니다.

---

학습 자료: [PortSwigger Web Security Academy](https://portswigger.net/web-security) · 라우팅: [React Router](https://reactrouter.com/) · 서체: [Pretendard](site/assets/fonts/pretendard/README.md) · 기본 UI 아이콘: [Lucide](site/assets/icons/lucide/README.md)
