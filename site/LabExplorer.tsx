import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/lab-explorer.scss"
// @ts-ignore
import script from "./scripts/lab-explorer.inline"

export default (() => {
  const LabExplorer: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
    if (fileData.slug !== "index") return null
    return (
      <section class="lab-explorer" aria-label="풀이 노트 검색">
        <h1 class="library-title">풀이 노트</h1>
        <div class="note-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
          <label class="lab-sr-only" for="search">풀이 제목, 주제, 본문 검색</label>
          <input id="search" type="search" placeholder="제목, 본문, 번호 검색" autoComplete="off" />
          <kbd aria-hidden="true">/</kbd>
        </div>
        <div class="library-toolbar">
          <nav class="view-switch" aria-label="목록 선택">
            <button type="button" data-view="notes" aria-pressed="true">풀이 노트 <span id="notes-count">—</span></button>
            <button type="button" data-view="all" aria-pressed="false">전체 실습 <span id="labs-count">—</span></button>
            <button type="button" data-view="saved" aria-pressed="false">즐겨찾기 <span id="saved-count">0</span></button>
          </nav>
          <div class="library-filters">
            <label><span class="lab-sr-only">주제</span><select id="category"><option value="all">모든 주제</option></select></label>
            <label><span class="lab-sr-only">난이도</span><select id="difficulty"><option value="all">모든 난이도</option><option value="Apprentice">입문 · Apprentice</option><option value="Practitioner">실전 · Practitioner</option><option value="Expert">심화 · Expert</option></select></label>
            <label><span class="lab-sr-only">정렬</span><select id="sort"><option value="number">번호순</option><option value="recent">최근 수정순</option><option value="title">제목순</option><option value="difficulty">난이도순</option><option value="topic">주제순</option></select></label>
          </div>
        </div>
        <div class="results-heading">
          <p id="result-count" role="status" aria-live="polite">풀이를 불러오는 중…</p>
          <button id="reset-filters" type="button" hidden>필터 초기화 <span aria-hidden="true">↺</span></button>
        </div>
        <div id="lab-list" class="note-list" aria-label="검색 결과"><p class="loading-state">목록을 불러오는 중…</p></div>
        <button id="load-more" class="load-more" type="button" hidden>더 보기</button>
        <p id="library-caption" class="library-caption"></p>
        <noscript><p>검색을 사용하려면 JavaScript를 켜 주세요. <a href="https://github.com/ddomology/portswigger-lab-notes/tree/main/content">GitHub에서 풀이 보기</a></p></noscript>
      </section>
    )
  }
  LabExplorer.css = style
  LabExplorer.afterDOMLoaded = script
  return LabExplorer
}) satisfies QuartzComponentConstructor
