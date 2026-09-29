# PortSwigger Lab Notes

PortSwigger 실습 풀이와 학습 기록을 빠르게 찾아 읽는 개인 노트입니다.

[풀이 노트 열기](https://ddomology.github.io/portswigger-lab-notes/)

## 노트 찾기

- 첫 화면의 **풀이 노트**는 작성한 기록을 보여 줍니다. 문제 풀이가 끝나지 않은 기록도 여기에서 읽습니다.
- 제목, 본문, 태그, 주제의 한국어 이름이나 약어로 검색합니다.
- **전체 실습**에서 273개 문제를 검색하고 주제·난이도로 좁힐 수 있습니다.
- **즐겨찾기**에 자주 찾는 항목을 모을 수 있습니다. 즐겨찾기는 현재 브라우저에 저장됩니다.
- 기존 풀이 주소와 첨부 이미지는 유지합니다. 예전 `notes.html` 주소는 첫 화면으로, `guide.html`은 이 문서의 작성 안내로 이동합니다.

전체 실습의 해결 여부는 **2026-09-29에 저장한 계정 상태**이며 실시간으로 갱신되지 않습니다. 노트가 있다는 사실과 실습을 해결했다는 사실은 별개입니다. 노트의 수정일은 해당 파일의 최근 Git 커밋을 기준으로 표시합니다.

## 노트 작성

GPT에 원하는 기록·수정을 요청하거나, GitHub와 옵시디언에서 Markdown 파일을 직접 편집합니다. 사이트는 풀이를 찾아 읽는 데 사용합니다.

1. `content/` 아래에 Markdown 파일을 저장합니다. 옵시디언에서는 이 폴더를 보관함으로 엽니다.
2. 새 실습 기록은 `content/templates/lab.md`를 복사해 시작할 수 있습니다.
3. 실습과 연결하려면 `lab_url`에 PortSwigger 원문 주소를 넣습니다. 문제와 관계없는 개념 노트도 자동으로 목록에 들어갑니다.
4. `main`에 commit/push하면 GitHub Actions가 사이트를 갱신합니다.

```yaml
---
title: 내 풀이 제목
lab_url: https://portswigger.net/web-security/주제/lab-문제명
tags:
  - portswigger
  - 주제
---
```

실습과 연결하지 않은 일반 노트는 `lab_url`을 생략합니다. 선택적으로 `category`와 `category_title`을 지정하면 해당 분류에서 찾을 수 있습니다. 같은 실습의 대표 풀이 하나에만 `lab_url`을 지정합니다.

이미지와 자료는 노트 근처에 두고 상대 경로로 연결합니다. 기존 Markdown·위키링크·콜아웃·표·코드·수식은 Quartz가 렌더링합니다. 원본과 같은 첫 제목이 반복되는 경우 빌드 복사본에서만 중복 제목을 정리하며 원본 파일은 바꾸지 않습니다.

## 공개 범위

`content/`의 일반 노트는 모두 공개됩니다. `draft` 값으로 숨기는 기능과 브라우저 초안 작성 기능은 사용하지 않습니다. `private`, `templates`, `.obsidian`, `.trash` 폴더는 사이트 빌드에서 제외합니다.

저장소 자체가 공개이므로 사이트에서 제외한 파일도 GitHub에는 공개됩니다. 쿠키·토큰·API 키 등은 커밋하지 마세요.

## 빌드와 배포

GitHub Pages의 배포 소스는 **GitHub Actions**입니다. `.github/workflows/publish.yml`은 고정된 Quartz 4.5.2 커밋을 받아 다음 순서로 빌드합니다.

1. `scripts/prepare-quartz.mjs`: 설정·컴포넌트·콘텐츠를 Quartz 작업 폴더로 복사합니다. 다시 실행할 수 있습니다.
2. Quartz에서 `npm ci`를 실행합니다.
3. `scripts/build-note-index.mjs`: 공개 노트의 제목·태그·본문 검색어·수정일을 수집합니다.
4. Quartz에서 `npx quartz build`를 실행합니다.
5. `scripts/build-lab-catalog.mjs`: 실제 렌더링 주소를 검증하고 검색 목록 및 이전 주소의 이동 페이지를 만듭니다.

주요 파일:

- `content/`: 노트와 첨부 자료의 원본.
- `data/labs.json`: 273개 실습과 31개 주제, 해결 상태 스냅샷.
- `site/LabExplorer.tsx`, `site/dashboard.js`, `site/dashboard.css`: 검색·필터·북마크 화면.
- `site/TopicExplorer.tsx`, `site/topic-explorer.js`, `site/topic-explorer.css`: 노트 주제 탐색.
- `site/topic-aliases.json`: 한국어·약어 검색어.
- `site/reader.scss`, `site/quartz.layout.ts`: 공통 읽기 화면과 배치.

빌드 결과의 `_dashboard/catalog.json`에 전체 실습과 공개 노트 목록이, `_dashboard/notes.json`에 공개 노트의 검색 메타데이터가 들어갑니다. 일반 개념 노트도 포함됩니다. `notes.html`과 `guide.html`은 이전 링크를 위한 이동 페이지이며 검색에 중복으로 표시되지 않습니다. 자동 생성하던 폴더·태그 목록도 없애고 기존 주소를 첫 화면의 검색·주제 필터로 연결합니다. 직접 작성한 Markdown 페이지는 유지합니다.

새 실습 목록은 저장한 HTML을 로컬에서 변환한 뒤 `data/labs.json`만 커밋합니다.

```bash
python scripts/import-portswigger-labs.py saved-all-practice.html --output data/labs.json --snapshot-date YYYY-MM-DD
```
