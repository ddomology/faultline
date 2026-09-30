# 노트 작성과 사이트 관리

[← 프로젝트 소개](../README.md) · [노트 읽기](https://ddomology.github.io/portswigger-lab-notes/)

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
- `note_kind: problem`: 문제 조건과 설명을 정리한 상태.
- `note_kind: solution`: 직접 탐색하거나 풀이한 내용을 기록한 상태.
- 일반 개념 노트는 `lab_url`을 생략합니다. 선택적으로 `category`, `category_title`을 지정하면 해당 분류에서 찾을 수 있습니다.

풀이를 시작할 때 새 페이지를 만들 필요는 없습니다. 기존 문제 설명 아래에 시도와 결과를 추가하고 `note_kind`를 바꿉니다. 노트의 수정일은 해당 파일의 최근 Git 커밋을 기준으로 표시합니다.

## 이미지와 본문

이미지와 자료는 노트 근처에 두고 상대 경로로 연결합니다. 저장소 안의 이미지와 이 저장소를 가리키는 기존 raw GitHub 이미지에는 빌드할 때 가로·세로 크기를 기록합니다. 이미지가 늦게 로드되어도 자리를 확보해 본문 밀림을 줄입니다.

Markdown·위키링크·콜아웃·표·코드·수식은 Quartz가 렌더링합니다. 원문 제목이 첫 제목으로 반복되면 빌드 복사본에서만 중복을 정리하며 원본 Markdown은 유지합니다.

코드블록에는 언어와 복사 버튼이 표시됩니다. 가로로 긴 코드에는 줄바꿈 버튼이 추가되며, 줄바꿈 표시 여부와 관계없이 원문의 탭·공백·빈 줄을 복사합니다. 줄 번호는 코드 펜스에 `showLineNumbers`를 지정한 경우에만 표시합니다. 코드 제목·캡션·줄 강조도 지원합니다.

닫히지 않은 따옴표 등으로 시작하는 코드 조각은 일반 문법 강조기가 문자열의 범위를 잘못 해석할 수 있습니다. 이때 코드 펜스를 `~~~sql nohighlight`처럼 작성하면 언어 표시는 유지하고 본문을 한 색으로 표시합니다. `nohighlight`는 다른 언어에도 사용할 수 있으며, 원문과 복사 내용에는 영향을 주지 않습니다. 완성된 코드에는 기존 언어 이름을 그대로 사용합니다.

제목 링크, 가로로 넘치는 코드·표, 접을 수 있는 콜아웃은 키보드로도 조작할 수 있습니다.

## 공개 범위

`content/`의 일반 노트는 모두 공개됩니다. `draft` 값으로 숨기는 기능과 브라우저 초안 작성 기능은 사용하지 않습니다. `private`, `templates`, `.obsidian`, `.trash` 폴더는 사이트 빌드에서 제외합니다.

저장소 자체가 공개이므로 사이트에서 제외한 파일도 GitHub에는 공개됩니다. 쿠키·토큰·API 키 등은 커밋하지 마세요.

## 빌드와 배포

`main`에 커밋을 반영하면 [배포 워크플로](../.github/workflows/publish.yml)가 실행됩니다. GitHub Pages의 배포 소스는 **GitHub Actions**입니다.

워크플로는 Quartz 4.5.2의 커밋 `d25a6eabf96751ffca56f8a8139272def7a65041`을 `_quartz/`에 받아 다음 순서로 빌드합니다.

1. `node scripts/prepare-quartz.mjs`: 설정·컴포넌트·콘텐츠를 Quartz 작업 폴더로 복사합니다. 다시 실행할 수 있습니다.
2. `_quartz/`에서 `npm ci`를 실행합니다.
3. `node scripts/build-note-index.mjs`: 공개 노트의 제목·태그·본문 검색어·수정일을 수집합니다.
4. `_quartz/`에서 `npx quartz build`를 실행합니다.
5. `node scripts/build-lab-catalog.mjs`: 렌더링 주소를 검증하고 검색 목록 및 이전 주소의 이동 페이지를 만듭니다.
6. `node scripts/fingerprint-assets.mjs`: CSS·JavaScript 파일명에 내용 해시를 붙이고 HTML 참조를 검증합니다.

결과물인 `_quartz/public/`을 GitHub Pages에 배포합니다. `_dashboard/catalog.json`에는 전체 실습과 공개 노트 목록이, `_dashboard/notes.json`에는 공개 노트의 검색 메타데이터가 들어갑니다. 일반 개념 노트도 포함됩니다.

예전 `notes.html`은 첫 화면으로, `guide.html`은 [README의 작성 안내](../README.md#노트-작성)로 이동합니다. 자동 생성하던 폴더·태그 주소도 첫 화면의 검색·필터로 연결하며, 직접 작성한 Markdown 페이지는 유지합니다.

## 화면을 수정할 때

| 파일 | 역할 |
| --- | --- |
| `site/LabExplorer.tsx`, `site/dashboard.js`, `site/dashboard.css` | 검색·필터·즐겨찾기 화면 |
| `site/TopicExplorer.tsx`, `site/topic-explorer.js`, `site/topic-explorer.css` | 주제와 실습 탐색기 |
| `site/NoteTitle.tsx`, `site/explorer-titles.json` | 본문 제목과 탐색기용 짧은 제목 |
| `site/TopicIcon.tsx`, `site/topic-icons.ts`, `site/assets/icons/topics/` | 주제별 SVG 아이콘 |
| `site/DifficultyBars.tsx`, `site/difficulty-bars.scss` | 난이도 표시 |
| `site/LabPagination.tsx`, `site/lab-pagination.scss` | 같은 주제의 이전·다음 실습 |
| `site/reader.scss`, `site/quartz.layout.ts` | 읽기 화면의 공통 스타일과 배치 |
| `site/markdown.scss` | 본문·목록·인용·표·콜아웃·코드블록의 스타일 |
| `site/clipboard.inline.ts`, `site/reader-code.ts` | 코드 원문 보존, 복사와 줄바꿈 조작 |
| `site/reader-tools.js`, `site/reader-tools.css` | 이미지 캡션과 확대 보기 |
| `site/reader-images.ts` | 빌드 시 이미지 크기 기록 |

수정은 `site/`의 원본에서 합니다. `_quartz/`의 복사본을 직접 바꾸면 다음 준비 단계에서 덮어씁니다.

## 실습 목록 갱신

해결 여부는 계정 상태의 스냅샷이며 실시간으로 동기화되지 않습니다. 저장한 목록 HTML을 로컬에서 변환한 뒤 `data/labs.json`을 반영합니다.

```bash
python scripts/import-portswigger-labs.py saved-all-practice.html --output data/labs.json --snapshot-date YYYY-MM-DD
```

목록 개수가 달라지면 README의 주제·실습 개수도 함께 갱신합니다.

## README 이미지

메인 아이콘은 사이트와 같은 `site/assets/favicon/favicon.svg`를 사용합니다. `docs/assets/readme-hero.svg`는 해당 로고와 주제별 아이콘으로 구성한 벡터 배너입니다. 밝은 테마와 어두운 테마에 맞춰 색이 바뀝니다.

배너의 글자는 저장소의 Pretendard로 윤곽선을 만들어 외부 폰트를 불러오지 않습니다. 로고 윤곽의 Lucide 라이선스와 Pretendard 라이선스는 `site/assets/`에 보관되어 있습니다.

필요할 때 Python의 `fonttools`, `brotli`를 설치하고 저장소 루트에서 `python scripts/build-readme-hero.py`를 실행하면 현재 실습 목록을 바탕으로 배너를 다시 만듭니다. 사이트 배포 시 실행되는 단계는 아닙니다.
