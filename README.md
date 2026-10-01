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
  <a href="https://ddomology.github.io/faultline/"><strong>풀이 노트 ↗</strong></a>
  &nbsp; · &nbsp;
  <a href="https://ddomology.github.io/faultline/?view=concepts">개념 노트</a>
  &nbsp; · &nbsp;
  <a href="#노트-작성">작성 안내</a>
</p>

<a href="https://ddomology.github.io/faultline/">
  <img src="docs/assets/readme-hero.svg" alt="Faultline — 웹 보안 개념과 실습, 그 과정의 기록. 붉은 사선이 가로지르는 방패." width="100%">
</a>

## 웹을 이해하고, 직접 확인하며 기록합니다

**Faultline**은 웹의 동작 원리와 보안을 공부하는 개인 블로그입니다. PortSwigger Web Security Academy 실습을 출발점으로, HTTP·브라우저·인증과 권한 같은 기반 지식부터 취약점의 원인과 대응까지 다룹니다.

풀이에는 어떤 가정을 세웠는지, 무엇을 왜 시도했는지, 실제 결과를 어떻게 해석했는지를 남깁니다. 실습에서 생긴 질문은 개념 노트로 정리해 서로 연결해 나갑니다.

## 두 종류의 노트

| 노트 | 담는 내용 |
| --- | --- |
| [**포트스위거 풀이 노트**](https://ddomology.github.io/faultline/) | 문제 조건, 관찰과 실행 과정, 결과와 배운 점 |
| [**개념 노트**](https://ddomology.github.io/faultline/?view=concepts) | 웹의 동작 원리, 보안 개념, 취약점의 원인과 대응 |

현재 **31개 주제의 실습 노트 273개**가 등록되어 있습니다. 등록 수와 풀이 완료 수는 다르며, 문제 조건만 정리된 글에는 **작성 중** 표시가 붙습니다. 개념 노트는 탐색 화면과 **64종의 아이콘 태그**를 준비한 상태이며, 글은 앞으로 추가합니다.

## 찾아 읽기

- **탐색과 검색** — 풀이를 주제·난이도로 좁히거나 제목·본문을 검색합니다. 개념 노트는 주제와 아이콘 태그로 찾습니다.
- **이어 읽기** — Explorer와 글 끝의 이전·다음 링크로 이동합니다. 페이지를 바꿔도 탐색기 상태를 유지하고, 뒤로 가면 목록의 검색 조건과 스크롤 위치를 복원합니다.
- **본문 읽기** — 목차, 코드 문법 강조·복사·지원 언어의 정렬 보기, 표와 수식, 이미지 확대를 제공합니다. 모바일과 다크 모드에서도 읽을 수 있습니다.

풀이에는 공식 문제 링크와 난이도를 함께 표시합니다. 글 끝의 **관련 개념**에서는 작성자가 연결한 개념 노트를 이어 읽을 수 있습니다.

## 노트 작성

글의 원본은 [`content/`](content/)의 Markdown입니다. 이 폴더를 Obsidian 보관함으로 열거나 GitHub에서 바로 편집할 수 있습니다. 이미지와 첨부 자료는 노트 가까이에 두고 상대 경로로 연결합니다.

### 풀이 노트

기존 실습 노트에 내용을 이어 쓰거나 [풀이 템플릿](content/templates/lab.md)을 사용합니다.

**문제 조건과 설명 → 탐색 및 풀이 기록 → 최종 결과 → 배운 점** 순서로 기록합니다. 탐색 기록은 **초기 관찰**과 **실행 과정**으로 나누고, 시도한 이유·실제 결과·해석을 함께 적습니다.

- `note_kind: problem` — 문제 조건과 설명을 정리한 상태.
- `note_kind: solution` — 직접 탐색하거나 풀이한 내용을 기록한 상태.

마지막 **관련 개념**에는 필요한 글의 Markdown 링크를 원하는 만큼 직접 나열합니다. 아직 연결할 글이 없다면 비워 둡니다.

### 개념 노트와 아이콘 태그

[개념 템플릿](content/templates/concept.md)을 `content/` 안의 원하는 폴더로 복사하고 `lab_url` 없이 작성합니다. 본문 구성은 자유롭게 정하고, 맨 위 메타데이터에 주제와 태그를 지정합니다.

```yaml
---
title: HTTP 쿠키와 세션
category: web-foundations
category_title: 웹 기초
tags: [HTTP, 쿠키, 세션]
note_kind: note
---
```

준비된 **SVG 아이콘 태그 64종**은 웹의 동작, 브라우저와 상태, 데이터와 문법, 인증과 암호, 취약점, 방어와 분석을 다룹니다. 태그는 개념 글의 제목 아래와 목록에 표시되며, 누르면 같은 태그의 글을 모아 볼 수 있습니다.

태그 이름·ID·별칭을 모두 사용할 수 있습니다. 등록되지 않은 이름은 텍스트 태그로 표시하고, `tags: []`로 비워 두면 태그 영역을 만들지 않습니다.

**[개념 태그 전체 미리보기와 사용법 →](docs/concept-tags.md)**

메타데이터와 본문 문법의 자세한 사용법은 [글 작성·관리 안내](docs/maintaining.md)에 정리했습니다.

## 실행과 배포

**React · React Router · Vite**로 만들고 **GitHub Pages**에 배포합니다. Markdown에서 각 글의 HTML과 검색 목록을 미리 생성하며, `main`에 변경을 반영하면 GitHub Actions가 사이트를 갱신합니다.

로컬 실행에는 Node.js 24.15 이상이 필요합니다. 저장소 루트에서:

```bash
npm ci --include=dev --ignore-scripts
cd react-site
npm ci --include=dev --ignore-scripts
npm run dev
```

개발 서버는 `http://localhost:5173/faultline/`에서 열립니다. 검사 명령과 주소 설정은 [프런트엔드 안내](react-site/README.md), 배포와 복구는 [관리 안내](docs/maintaining.md#빌드와-배포)를 참고합니다.

## 저장소 구성

| 경로 | 내용 |
| --- | --- |
| [`content/`](content/) | 글과 첨부 자료의 원본 |
| [`data/labs.json`](data/labs.json) | PortSwigger 실습 목록과 상태 스냅샷 |
| [`react-site/`](react-site/) | React 화면, 본문 렌더링, 정적 빌드와 검사 |
| [`site/`](site/) | 브랜드, SVG 아이콘, 서체, 개념 태그 목록 |
| [`scripts/`](scripts/) | 실습 목록 가져오기, 히어로·공유 이미지·태그 미리보기 생성 |
| [`docs/`](docs/) | 작성·관리 안내와 에셋 미리보기 |
| [`.github/workflows/`](.github/workflows/) | PR 검사와 GitHub Pages 자동 배포 |

---

학습 자료: [PortSwigger Web Security Academy](https://portswigger.net/web-security) · 서체: [Pretendard](site/assets/fonts/pretendard/README.md) · 기본 UI 아이콘: [Lucide](site/assets/icons/lucide/README.md)
