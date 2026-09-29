import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/lab-explorer.scss"
// @ts-ignore
import script from "./scripts/lab-explorer.inline"

export default (() => {
  const LabExplorer: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") return null
    return (
      <section class="lab-explorer" aria-label="PortSwigger 문제 라이브러리">
        <p class="lab-intro">실습을 탐색하고 풀이 과정을 기록하세요. <a href="./notes.html">풀이 노트 모아보기 →</a></p>
        <div id="category-nav" hidden aria-hidden="true"></div>
        <section class="lab-overview" aria-label="학습 현황">
          <div class="stats-panel">
            <div class="stat"><span>전체 실습</span><strong id="stat-total">—</strong></div>
            <div class="stat"><span>해결 기록</span><strong id="stat-solved">—</strong><small id="stat-percent">—</small></div>
            <a class="stat" href="./notes.html"><span>공개한 풀이</span><strong id="stat-notes">—</strong><span class="stat-arrow" aria-hidden="true">↗</span></a>
          </div>
          <p id="snapshot-caption" class="snapshot-caption">실습 목록을 불러오는 중</p>
          <div hidden aria-hidden="true"><span id="progress-label"></span><span id="progress-fill"></span></div>
        </section>
        <section class="lab-library" aria-labelledby="lab-list-heading">
          <div class="library-heading"><h2 id="lab-list-heading" tabIndex={-1}>전체 실습 목록 <span id="category-total"></span></h2><label class="sort-control"><span>정렬</span><select id="sort"><option value="default">주제별 원본 순서</option><option value="difficulty">주제 내 난이도순</option><option value="title">주제 내 제목순</option></select></label></div>
          <div class="topic-control"><label for="mobile-category">학습 주제</label><select id="mobile-category"><option value="all">모든 실습</option></select></div>
          <div class="search-panel">
            <div class="search-box"><svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.7" cy="10.7" r="6.8"></circle><path d="m16 16 4.5 4.5"></path></svg><label for="search" class="lab-sr-only">제목, 주제, 난이도로 문제 검색</label><input id="search" type="search" placeholder="제목, 주제, 난이도로 검색" autocomplete="off"/><kbd aria-hidden="true">/</kbd></div>
            <div class="filter-bar"><div class="filter-left"><label class="difficulty-filter"><span>난이도</span><select id="difficulty"><option value="all">전체</option><option value="Apprentice">Apprentice · 입문</option><option value="Practitioner">Practitioner · 실전</option><option value="Expert">Expert · 심화</option></select></label><button class="filter-chip" id="solved-filter" type="button" aria-pressed="false" title="가져온 해결 기록 기준">해결한 실습</button><button class="filter-chip" id="unsolved-filter" type="button" aria-pressed="false" title="가져온 해결 기록 기준">미해결 실습</button><button class="filter-chip" id="notes-filter" type="button" aria-pressed="false">풀이 있음</button><button class="filter-chip" id="bookmark-filter" type="button" aria-pressed="false"><span aria-hidden="true">☆</span> 북마크</button><button class="filter-chip" id="draft-filter" type="button" aria-pressed="false">내 초안</button></div><button id="reset-filters" type="button" class="text-button" hidden>초기화 ↺</button></div>
          </div>
          <div class="results-caption"><p id="result-count" role="status" aria-live="polite">실습을 불러오고 있어요.</p><span id="local-caption">북마크·초안은 이 브라우저에 저장돼요</span></div>
          <div id="lab-list" class="lab-list" aria-label="실습 목록"><div class="loading-state"><span class="loading-ring"></span><p>문제 목록을 준비하고 있어요.</p></div></div>
          <div class="list-end" id="list-end" hidden><span id="list-end-caption"></span><a href="#lab-list-heading">목록 위로 ↑</a></div>
        </section>
        <dialog id="note-dialog" aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <div class="dialog-top"><span>새 풀이 노트</span><button id="close-dialog" class="icon-button" type="button" aria-label="노트 작성 닫기">×</button></div>
          <h2 id="dialog-title">풀이 노트 작성</h2><p id="dialog-lab-title"></p>
          <p id="dialog-description">시도한 이유와 실제 결과를 적어 보세요. 초안은 <strong>이 브라우저에만 자동 저장</strong>되며, GitHub에서 커밋해야 공개됩니다.</p>
          <div class="editor-label"><label for="note-editor">Markdown</label><span id="draft-status" role="status" aria-live="polite">새 노트 템플릿</span></div>
          <textarea id="note-editor" spellcheck={false} aria-label="풀이 노트 Markdown 편집"></textarea>
          <div class="dialog-helper"><span id="note-filename"></span><button id="reset-draft" type="button" class="text-button">템플릿으로 되돌리기</button></div>
          <div class="dialog-actions"><div><button id="copy-note" class="button button-secondary" type="button">내용 복사</button><button id="download-note" class="button button-secondary" type="button">.md 다운로드</button></div><button id="github-note" class="button button-primary" type="button">GitHub에서 저장 <span aria-hidden="true">↗</span></button></div>
          <p class="dialog-footnote" id="github-help">GitHub 편집 화면에서 내용을 확인하고 Commit changes를 누르면 자동 배포됩니다.</p>
        </dialog>
        <div id="toast" class="toast" role="status" aria-live="polite"></div>
        <noscript><p>문제 검색과 노트 작성을 사용하려면 JavaScript를 켜 주세요. <a href="https://github.com/ddomology/portswigger-lab-notes/tree/main/content">GitHub에서 노트 보기</a></p></noscript>
      </section>
    )
  }
  LabExplorer.css = style
  LabExplorer.afterDOMLoaded = script
  return LabExplorer
}) satisfies QuartzComponentConstructor
