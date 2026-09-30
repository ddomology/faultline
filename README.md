<p align="center">
  <a href="https://ddomology.github.io/portswigger-lab-notes/">
    <img src="site/assets/favicon/favicon.svg" alt="PortSwigger Lab Notes 방패 로고" width="64" height="64">
  </a>
</p>

<h1 align="center">PortSwigger Lab Notes</h1>

<p align="center">
  PortSwigger Web Security Academy를 공부하며 남기는 한국어 실습 노트.
</p>

<p align="center">
  <a href="https://ddomology.github.io/portswigger-lab-notes/"><strong>노트 읽기 ↗</strong></a>
  &nbsp; · &nbsp;
  <a href="content/labs/">원본 노트</a>
  &nbsp; · &nbsp;
  <a href="#노트-작성">작성 안내</a>
</p>

<a href="https://ddomology.github.io/portswigger-lab-notes/">
  <img src="docs/assets/readme-hero.svg" alt="PortSwigger Lab Notes — 31개 주제, 273개 실습. 문제 조건, 탐색 과정, 풀이와 배운 점을 기록합니다." width="100%">
</a>

## 어떤 기록인가요

문제에서 주어진 조건, 직접 확인한 사실, 시도한 이유와 결과를 한 노트에 쌓습니다. 해결에 이른 과정과 실패한 시도도 함께 남겨 다음 실습에서 다시 찾아볼 수 있게 합니다.

현재 목록에는 **31개 주제, 273개 실습**이 있습니다. 각 실습의 문제 설명을 먼저 정리하고, 진행하면서 같은 문서에 탐색과 풀이를 이어 씁니다. 전체 개수는 풀이를 끝낸 문제 수를 뜻하지 않습니다.

## 노트 둘러보기

| 찾고 싶은 것 | 사이트에서 보는 곳 |
| --- | --- |
| 실습 문제와 풀이 기록 | **풀이 노트**에서 주제·난이도로 필터 |
| 보안 개념을 정리한 글 | **개념 노트**. 글은 추후 추가 예정 |
| 기억나는 개념이나 키워드 | 제목·본문·태그 검색. 한국어 주제명과 약어도 지원 |
| 같은 주제의 다른 실습 | 왼쪽 **Explorer**, 본문 끝의 **이전·다음 실습** |

주제별로 묶인 목록에서 SVG 아이콘과 고정 번호로 위치를 구분하고, 난이도는 이름과 3칸 표시를 함께 보여 줍니다. 한국어 제목 아래에는 원문 영어 제목을 표시합니다. 제목을 누르면 노트로, 오른쪽 공식 문제 링크를 누르면 원본 실습으로 이동합니다.

풀이 기록을 아직 쓰지 않은 노트에는 작은 공사 안내판 SVG와 **작성 중** 표시가 붙습니다. 왼쪽 Explorer에서도 **풀이 노트 · 개념 노트**로 이동할 수 있습니다.

본문은 목차, 코드 복사, 이미지 확대, 다크 모드를 지원합니다. 해결 여부는 저장한 계정 상태를 필요할 때 수동 갱신합니다.

사이트 안에서 글을 옮겨 읽을 때는 Explorer와 상단 헤더를 유지하고 본문을 바꿉니다. 뒤로 가면 검색 조건, 더 펼쳐 본 목록과 스크롤 위치가 복원됩니다.

## 노트 작성

1. `content/`를 Obsidian 보관함으로 열거나 GitHub에서 Markdown 파일을 편집합니다.
2. 기존 실습 노트에 **문제 조건 → 직접 확인한 조건 → 시도와 결과 → 풀이·배운 점**을 이어 적습니다. 새 기록은 [노트 템플릿](content/templates/lab.md)을 복사해 시작할 수 있습니다.
3. `main`에 반영하면 GitHub Actions가 사이트를 갱신합니다.

실제 탐색·풀이를 적은 노트에는 `note_kind: solution`, 문제 설명만 정리한 노트에는 `note_kind: problem`을 사용합니다. 첨부 자료는 노트 가까이에 두고 상대 경로로 연결합니다.

→ [메타데이터, 공개 범위, 빌드·배포 안내](docs/maintaining.md)

## 저장소 구성

| 경로 | 내용 |
| --- | --- |
| [`content/`](content/) | 실습 노트와 첨부 자료의 원본 |
| [`data/labs.json`](data/labs.json) | 실습 목록, 주제, 해결 상태 스냅샷 |
| [`site/`](site/) | 검색 화면, 탐색기, 읽기 화면과 스타일 |
| [`site/assets/`](site/assets/) | 메인 로고, 주제별 SVG 아이콘, 서체 |
| [`scripts/`](scripts/) | 노트 인덱싱, 사이트 구성, 빌드 후처리 |
| [`publish.yml`](.github/workflows/publish.yml) | GitHub Pages 빌드·배포 |

사이트는 **Quartz 4.5.2**와 **GitHub Pages**로 만들었습니다. 본문과 이미지의 원본은 저장소에 남기고, 읽기 화면과 검색 목록은 빌드할 때 생성합니다.

---

학습 자료: [PortSwigger Web Security Academy](https://portswigger.net/web-security) · 사이트 엔진: [Quartz](https://github.com/jackyzha0/quartz) · 서체: [Pretendard](site/assets/fonts/pretendard/README.md) · 기본 UI 아이콘: [Lucide](site/assets/icons/lucide/README.md)
