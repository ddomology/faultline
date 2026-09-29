# PortSwigger Lab Notes

옵시디언으로 작성하고 GitHub Pages에서 읽는 PortSwigger 풀이 노트입니다. 문제 목록부터 풀이 본문까지 모든 페이지를 Quartz가 렌더링하며, 같은 테마·메뉴·노트 탐색기를 사용합니다. 첫 화면에서 전체 문제를 주제별로 한 번에 보고 **풀이 읽기**를 누르면 본문이 열립니다. **노트 모아보기**에서는 문제와 연결되지 않은 일반 노트도 찾을 수 있습니다.

`content/` 아래의 모든 공개 `.md` 파일은 문제와 연결되지 않아도 노트 목록에 자동으로 나타납니다. `lab_url`은 문제 목록과 연결할 때만 필요합니다. 일반 노트의 제목·표·코드·이미지·위키링크·콜아웃·수식은 Quartz의 Obsidian Markdown 렌더러가 처리합니다.

## 문제 탐색과 작성
- 저장한 All labs 페이지 기준 **273문제 / 31주제 / 완료 3문제**를 수록합니다. 완료 상태는 **2026-09-29 스냅샷**입니다.
- 문제 검색, 주제·난이도·완료 여부·노트 유무로 필터링합니다.
- 왼쪽 **주제별 탐색**에서 31개 주제의 문제 수와 공개 풀이 수를 확인합니다. 주제를 누르면 해당 문제 목록이 열리고, 화살표를 펼치면 연결된 풀이로 바로 이동합니다.
- 주제는 `XSS`, `SQLi` 같은 약어나 `인증`, `파일 업로드` 같은 한국어로도 찾을 수 있습니다. **노트 폴더로 탐색**에서는 기존 폴더 구조를 확인합니다.
- 문제 목록은 메인 주소 `/`에서 제공합니다. 기존 별도 문제 페이지는 폐기했습니다.
- 노트 작성 화면에서 문제 제목과 원문 링크가 채워진 Markdown 초안을 편집합니다.
- 작성 중 초안과 즐겨찾기는 현재 브라우저에 저장됩니다. GitHub나 PortSwigger 계정에 자동 동기화되지는 않습니다.
- **GitHub에 저장**은 GitHub 파일 생성 화면을 엽니다. 거기서 **Commit changes**를 완료해야 저장소와 사이트에 반영됩니다.
- 이미 작성한 노트는 읽거나 GitHub에서 편집할 수 있습니다. Markdown 파일을 내려받아 옵시디언에서 이어서 작성할 수도 있습니다.

## 처음 한 번
1. 저장소를 PC에 복제합니다.
2. Obsidian에서 복제한 저장소의 `content` 폴더를 보관함으로 엽니다.
3. GitHub 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
4. **Actions → Publish notes → Run workflow**를 실행합니다.

배포 주소: https://ddomology.github.io/portswigger-lab-notes/

## 노트 작성
- `content/` 안에 Markdown 노트와 이미지를 저장합니다.
- `content/templates/lab.md`를 복사해서 새 풀이를 시작합니다.
- 템플릿을 복사했다면 `draft: false`로 바꾸고 `lab_url`에 해당 문제의 원문 URL을 넣습니다. 파일 위치가 달라도 이 URL로 문제 목록과 연결됩니다.
- Obsidian의 Templates 기본 플러그인을 켜고 템플릿 폴더를 `templates`로 지정할 수도 있습니다.
- `[[노트 이름]]`, 이미지, 코드 블록, 태그, 수식을 사용할 수 있습니다.
- 변경 내용을 `main`에 commit/push하면 자동으로 빌드·배포합니다.
- 로컬 저장만으로 GitHub에 올라가지는 않습니다. 자동 전송이 필요하면 Obsidian Git을 설정하세요.
- 검색·폴더 목록·태그 목록이 자동 생성됩니다.

## 공개 범위
이 저장소는 공개입니다. 웹사이트는 `content/`를 빌드하며 `draft: true` 노트와 templates 폴더는 제외합니다.
웹사이트에서 제외해도 Git에 올린 파일은 공개 저장소에서 볼 수 있습니다.
세션 쿠키와 API 키는 노트나 저장소에 저장하지 마세요.

## 구현
Quartz 4.5.2의 고정 커밋을 GitHub Actions에서 가져와 빌드하므로 이 저장소에는 노트와 최소 설정만 보관합니다.
배포 실패 원인은 Actions 실행 로그에서 확인할 수 있습니다.

- `data/labs.json`: 문제 메타데이터와 완료 스냅샷. 원본 계정 HTML은 저장하지 않습니다.
- `site/LabExplorer.tsx`: Quartz 첫 화면에 들어가는 문제 목록 컴포넌트.
- `site/TopicExplorer.tsx`, `site/topic-explorer.js`, `site/topic-explorer.css`: 모든 페이지의 주제별 탐색기. `site/topic-aliases.json`에 한국어·약어 검색어를 추가할 수 있습니다.
- `site/dashboard.js`, `site/dashboard.css`: Quartz 테마를 따르는 검색·필터·작성 기능과 스타일.
- `site/reader.scss`, `site/quartz.layout.ts`: 모든 페이지에 적용되는 공통 Quartz 테마와 배치.
- `content/notes.md`: 노트 모아보기 소개. 실제 노트 목록은 배포할 때 자동으로 붙습니다.
- `scripts/build-note-index.mjs`: 모든 공개 Markdown 노트를 모아 `notes.html`을 생성합니다.
- `scripts/build-lab-catalog.mjs`: 실제 렌더링된 노트를 문제와 연결합니다. Quartz의 첫 화면을 별도 HTML로 덮어쓰지 않습니다.
- 같은 문제에 여러 노트가 연결되면 빌드가 오류를 내므로 `lab_url`은 대표 풀이 하나에 지정합니다.
- 새 문제 목록을 반영하려면 저장한 HTML을 로컬에서 변환합니다:

```bash
python scripts/import-portswigger-labs.py saved-all-practice.html --output data/labs.json --snapshot-date YYYY-MM-DD
```

그 뒤 변경된 `data/labs.json`을 commit/push합니다. 저장한 HTML 자체는 올리지 않습니다.
