# PortSwigger Lab Notes

옵시디언으로 작성하고 GitHub Pages에서 읽는 PortSwigger 풀이 노트입니다.

## 처음 한 번
1. 저장소를 PC에 복제합니다.
2. Obsidian에서 복제한 저장소의 `content` 폴더를 보관함으로 엽니다.
3. GitHub 저장소 **Settings → Pages → Build and deployment → Source → GitHub Actions**를 선택합니다.
4. **Actions → Publish notes → Run workflow**를 실행합니다.

배포 주소: https://ddomology.github.io/portswigger-lab-notes/

## 노트 작성
- `content/` 안에 Markdown 노트와 이미지를 저장합니다.
- `content/templates/lab.md`를 복사해서 새 풀이를 시작합니다.
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
