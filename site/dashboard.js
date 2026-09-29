(() => {
  'use strict';
  const $ = (id) => document.getElementById(id);
  const PAGE_SIZE = 12;
  const BOOKMARK_KEY = 'portswigger-lab-notes:bookmarks:v1';
  const DRAFT_PREFIX = 'portswigger-lab-notes:draft:v1:';
  const REPO_URL = 'https://github.com/ddomology/portswigger-lab-notes';
  const difficultyOrder = { Apprentice: 0, Practitioner: 1, Expert: 2 };
  let catalog = { labs: [], categories: [], snapshotDate: '' };
  let state = readUrlState();
  let bookmarks = new Set();
  let activeLab = null;
  let returnFocus = null;
  let saveTimer = null;
  let toastTimer = null;
  let searchTimer = null;
  let storageAvailable = true;
  try { const parsed = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]'); if (Array.isArray(parsed)) bookmarks = new Set(parsed.filter((v) => typeof v === 'string')); }
  catch { storageAvailable = false; }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function externalLink(url, text, className) {
    const link = el('a', className, text);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }
  function safeUrl(value) {
    try { const parsed = new URL(value, location.href); return ['http:', 'https:'].includes(parsed.protocol) ? parsed.href : null; }
    catch { return null; }
  }
  function readUrlState() {
    const q = new URLSearchParams(location.search);
    return { category: q.get('topic') || 'all', query: q.get('q') || '', difficulty: Object.hasOwn(difficultyOrder, q.get('level')) ? q.get('level') : 'all', solved: q.get('solved') === '1', unsolved: q.get('todo') === '1' && q.get('solved') !== '1', notes: q.get('notes') === '1', bookmarks: q.get('saved') === '1', drafts: q.get('drafts') === '1', sort: ['default', 'difficulty', 'title'].includes(q.get('sort')) ? q.get('sort') : 'default', page: Math.max(1, parseInt(q.get('page'), 10) || 1) };
  }
  function syncUrl() {
    const q = new URLSearchParams();
    if (state.category !== 'all') q.set('topic', state.category);
    if (state.query) q.set('q', state.query);
    if (state.difficulty !== 'all') q.set('level', state.difficulty);
    if (state.solved) q.set('solved', '1');
    if (state.unsolved) q.set('todo', '1');
    if (state.notes) q.set('notes', '1');
    if (state.bookmarks) q.set('saved', '1');
    if (state.drafts) q.set('drafts', '1');
    if (state.sort !== 'default') q.set('sort', state.sort);
    if (state.page !== 1) q.set('page', String(state.page));
    history.replaceState(null, '', `${location.pathname}${q.size ? '?' + q.toString() : ''}${location.hash}`);
  }
  function hasFilters() { return state.query || state.difficulty !== 'all' || state.solved || state.unsolved || state.notes || state.bookmarks || state.drafts; }
  function draftKey(lab) { return DRAFT_PREFIX + lab.id; }
  function getDraft(lab) {
    try { return localStorage.getItem(draftKey(lab)); }
    catch { storageAvailable = false; return null; }
  }
  function hasDraft(lab) { return getDraft(lab) !== null; }
  function notify(message) {
    clearTimeout(toastTimer);
    $('toast').textContent = message;
    $('toast').classList.add('visible');
    toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 3500);
  }
  function saveDraft() {
    if (!activeLab) return;
    clearTimeout(saveTimer);
    try {
      localStorage.setItem(draftKey(activeLab), $('note-editor').value);
      storageAvailable = true;
      $('draft-status').textContent = '이 브라우저에 저장됨';
    } catch {
      storageAvailable = false;
      $('draft-status').textContent = '자동 저장 불가 · 파일로 다운로드해 주세요';
    }
  }
  function bookmark(lab, button) {
    const isSaved = bookmarks.has(lab.id);
    if (isSaved) bookmarks.delete(lab.id); else bookmarks.add(lab.id);
    try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks])); }
    catch { storageAvailable = false; notify('브라우저 저장이 차단되어 북마크는 현재 화면에서만 유지됩니다.'); }
    updateBookmarkButton(lab, button);
    if (state.bookmarks && isSaved) renderLabs();
  }
  function updateBookmarkButton(lab, button) {
    const saved = bookmarks.has(lab.id);
    button.textContent = saved ? '★' : '☆';
    button.setAttribute('aria-pressed', String(saved));
    button.setAttribute('aria-label', `${lab.title} 북마크 ${saved ? '해제' : '추가'}`);
    button.title = saved ? '북마크 해제 · 이 브라우저' : '북마크 · 이 브라우저';
  }
  function setCategory(category) { state.category = category; state.page = 1; render(); }
  function renderCategories() {
    const nav = $('category-nav');
    nav.replaceChildren();
    const options = [{ id: 'all', title: '모든 실습', count: catalog.labs.length }, ...catalog.categories];
    const mobile = $('mobile-category');
    mobile.replaceChildren();
    options.forEach((category) => {
      const button = el('button', `category-button${category.id === 'all' ? ' all-category' : ''}${state.category === category.id ? ' active' : ''}`);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(state.category === category.id));
      button.append(el('span', '', category.title), el('span', 'category-count', String(category.count)));
      button.addEventListener('click', () => setCategory(category.id));
      nav.append(button);
      const option = el('option', '', `${category.title} (${category.count})`);
      option.value = category.id;
      mobile.append(option);
    });
    mobile.value = state.category;
  }
  function renderStats() {
    const total = catalog.labs.length;
    const solved = catalog.labs.filter((lab) => lab.solved).length;
    const notes = catalog.labs.filter((lab) => lab.noteUrl).length;
    const percentage = total ? (solved * 100 / total).toFixed(1) : '0.0';
    $('stat-total').textContent = total;
    $('stat-solved').textContent = solved;
    $('stat-notes').textContent = notes;
    $('stat-percent').textContent = `${percentage}%`;
    $('progress-label').textContent = `${solved} / ${total}`;
    $('progress-fill').style.width = `${percentage}%`;
    $('snapshot-caption').textContent = `${catalog.snapshotDate} 가져온 해결 기록 · 실시간 연동 아님`;
  }
  function filterLabs() {
    const terms = state.query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const difficultyKo = { Apprentice: '입문 초급', Practitioner: '실전 중급', Expert: '심화 고급' };
    const filtered = catalog.labs.filter((lab) => {
      if (state.category !== 'all' && lab.category !== state.category) return false;
      if (state.difficulty !== 'all' && lab.difficulty !== state.difficulty) return false;
      if (state.solved && !lab.solved) return false;
      if (state.unsolved && lab.solved) return false;
      if (state.notes && !lab.noteUrl) return false;
      if (state.bookmarks && !bookmarks.has(lab.id)) return false;
      if (state.drafts && !hasDraft(lab) && lab.noteStatus !== 'draft') return false;
      const haystack = `${lab.title} ${lab.category} ${lab.categoryTitle} ${lab.difficulty} ${difficultyKo[lab.difficulty] || ''}`.toLocaleLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
    if (state.sort === 'difficulty') filtered.sort((a, b) => (difficultyOrder[a.difficulty] ?? 3) - (difficultyOrder[b.difficulty] ?? 3));
    if (state.sort === 'title') filtered.sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }
  function renderLab(lab, number) {
    const row = el('article', 'lab-row');
    row.dataset.labId = lab.id;
    row.append(el('span', 'lab-index', String(number).padStart(3, '0')));
    const info = el('div', 'lab-info');
    const meta = el('div', 'lab-meta');
    meta.append(el('span', 'category-tag', lab.categoryTitle || lab.category), el('span', 'meta-divider'));
    const difficulty = el('span', `difficulty-tag ${lab.difficulty.toLowerCase()}`);
    const dots = el('span', 'difficulty-dots');
    dots.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 3; i++) dots.append(el('i', i <= (difficultyOrder[lab.difficulty] ?? 0) ? 'filled' : ''));
    difficulty.append(dots, document.createTextNode(lab.difficulty));
    meta.append(difficulty);
    if (lab.solved) {
      const badge = el('span', 'solved-tag', '✓ 해결 기록');
      badge.title = `${catalog.snapshotDate}에 가져온 해결 기록`;
      meta.append(badge);
    }
    if (hasDraft(lab)) meta.append(el('span', 'draft-tag', '내 초안 · 이 브라우저'));
    if (lab.noteStatus === 'draft') meta.append(el('span', 'draft-tag', '저장소 초안'));
    const title = el('h3', 'lab-title');
    const titleLink = lab.noteUrl ? el('a', '', lab.title) : externalLink(safeUrl(lab.url) || 'https://portswigger.net/web-security/all-labs', lab.title);
    if (lab.noteUrl) titleLink.href = lab.noteUrl;
    title.append(titleLink);
    info.append(meta, title);
    const actions = el('div', 'lab-actions');
    const star = el('button', 'bookmark-button');
    star.type = 'button';
    updateBookmarkButton(lab, star);
    star.addEventListener('click', () => bookmark(lab, star));
    const source = externalLink(safeUrl(lab.url) || 'https://portswigger.net/web-security/all-labs', '문제 ↗', 'lab-source');
    source.setAttribute('aria-label', `${lab.title} 원본 문제 열기`);
    if (lab.noteUrl) {
      const read = el('a', 'note-button has-note', '풀이 읽기 →');
      read.href = lab.noteUrl;
      read.setAttribute('aria-label', `${lab.title} 풀이 읽기`);
      const edit = externalLink(editUrl(lab), '수정 ↗', 'edit-note');
      edit.setAttribute('aria-label', `${lab.title} GitHub에서 수정`);
      actions.append(star, source, read, edit);
    } else if (lab.noteExists || lab.noteStatus === 'draft') {
      const edit = externalLink(editUrl(lab), '초안 편집 ↗', 'note-button');
      edit.setAttribute('aria-label', `${lab.title} 저장소 초안 편집`);
      actions.append(star, source, edit);
    } else {
      const write = el('button', 'note-button', hasDraft(lab) ? '이어서 쓰기 →' : '노트 쓰기 +');
      write.type = 'button';
      write.setAttribute('aria-label', `${lab.title} 풀이 노트 ${hasDraft(lab) ? '이어서 쓰기' : '작성'}`);
      write.addEventListener('click', () => openComposer(lab, write));
      actions.append(star, source, write);
    }
    row.append(info, actions);
    return row;
  }
  function renderLabs() {
    const matches = filterLabs();
    const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    state.page = Math.min(state.page, pageCount);
    const category = catalog.categories.find((item) => item.id === state.category);
    $('lab-list-heading').firstChild.textContent = (category ? category.title : '모든 실습') + ' ';
    $('category-total').textContent = String(category ? category.count : catalog.labs.length);
    $('result-count').replaceChildren(el('strong', '', `${matches.length}개`), document.createTextNode(` 실습${state.query.trim() ? ` · “${state.query.trim()}” 검색 결과` : '을 둘러보고 있어요'}`));
    const list = $('lab-list');
    list.replaceChildren();
    if (!matches.length) {
      const empty = el('div', 'empty-state');
      const symbol = el('span', 'empty-symbol', '⌕');
      symbol.setAttribute('aria-hidden', 'true');
      const button = el('button', 'button button-secondary', '필터 초기화');
      button.type = 'button';
      button.addEventListener('click', resetFilters);
      empty.append(symbol, el('h3', '', '조건에 맞는 실습이 없어요'), el('p', '', '검색어를 짧게 바꾸거나 필터를 해제해 보세요.'), button);
      list.append(empty);
    } else {
      const start = (state.page - 1) * PAGE_SIZE;
      matches.slice(start, start + PAGE_SIZE).forEach((lab, index) => list.append(renderLab(lab, start + index + 1)));
    }
    renderPagination(pageCount, matches.length);
    syncUrl();
  }
  function renderPagination(pageCount, total) {
    const nav = $('pagination');
    nav.replaceChildren();
    if (total <= PAGE_SIZE) return;
    function pageButton(label, page, className, disabled, ariaLabel) {
      const button = el('button', className, label);
      button.type = 'button';
      button.disabled = disabled;
      button.setAttribute('aria-label', ariaLabel);
      if (page === state.page && !className.includes('page-')) button.setAttribute('aria-current', 'page');
      button.addEventListener('click', () => {
        state.page = page;
        renderLabs();
        $('lab-list-heading').scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        $('lab-list-heading').focus({ preventScroll: true });
      });
      nav.append(button);
    }
    pageButton('← 이전', state.page - 1, 'page-previous', state.page === 1, '이전 페이지');
    const pages = new Set([1, pageCount, state.page - 1, state.page, state.page + 1]);
    if (state.page <= 2) pages.add(3);
    if (state.page >= pageCount - 1) pages.add(pageCount - 2);
    let previous = 0;
    [...pages].filter((page) => page >= 1 && page <= pageCount).sort((a, b) => a - b).forEach((page) => {
      if (previous && page - previous > 1) nav.append(el('span', '', '…'));
      pageButton(String(page), page, page === state.page ? 'active' : '', false, `${page}페이지`);
      previous = page;
    });
    pageButton('다음 →', state.page + 1, 'page-next', state.page === pageCount, '다음 페이지');
  }
  function syncControls() {
    $('search').value = state.query;
    $('difficulty').value = state.difficulty;
    $('sort').value = state.sort;
    $('mobile-category').value = state.category;
    [['solved', 'solved-filter'], ['unsolved', 'unsolved-filter'], ['notes', 'notes-filter'], ['bookmarks', 'bookmark-filter'], ['drafts', 'draft-filter']].forEach(([key, id]) => $(id).setAttribute('aria-pressed', String(state[key])));
    $('reset-filters').hidden = !hasFilters();
  }
  function render() { syncControls(); renderCategories(); renderLabs(); }
  function resetFilters() {
    state.query = ''; state.difficulty = 'all'; state.solved = false; state.unsolved = false; state.notes = false; state.bookmarks = false; state.drafts = false; state.page = 1;
    render();
  }
  function editUrl(lab) {
    return `${REPO_URL}/edit/main/content/${lab.notePath.split('/').map(encodeURIComponent).join('/')}`;
  }
  function template(lab) {
    const quoted = (value) => JSON.stringify(String(value));
    return `---\ntitle: ${quoted(lab.title)}\ntags:\n  - portswigger\n  - ${lab.category}\nlab_url: ${quoted(lab.url)}\ndifficulty: ${lab.difficulty}\ndraft: false\n---\n\n# ${lab.title}\n\n## 목표와 조건\n\n- 목표: \n- 확인한 조건: \n\n## 탐색 과정\n\n### 1. 첫 번째 시도\n\n**이렇게 생각한 이유**\n\n\n**시도한 요청 / 코드**\n\n\`\`\`text\n\n\`\`\`\n\n**실제 결과**\n\n\n**해석과 다음 시도**\n\n\n## 해결 과정\n\n\n## 배운 점\n\n- \n\n## 참고\n\n- [원본 실습](${lab.url})\n`;
  }
  function openComposer(lab, trigger) {
    activeLab = lab;
    returnFocus = trigger;
    $('dialog-lab-title').textContent = lab.title;
    $('note-filename').textContent = `content/${lab.notePath}`;
    const saved = getDraft(lab);
    $('note-editor').value = saved === null ? template(lab) : saved;
    $('draft-status').textContent = saved === null ? '새 노트 템플릿' : '이 브라우저의 초안을 불러왔어요';
    if (!storageAvailable) $('draft-status').textContent = '자동 저장 불가 · 파일로 다운로드해 주세요';
    $('github-help').textContent = 'GitHub 편집 화면에서 내용을 확인하고 Commit changes를 누르면 자동 배포됩니다.';
    $('note-dialog').showModal();
    document.body.classList.add('dialog-open');
    $('note-editor').focus();
    $('note-editor').setSelectionRange(0, 0);
  }
  function finishComposer() {
    if (saveTimer) saveDraft();
    document.body.classList.remove('dialog-open');
    const previousLabId = activeLab && activeLab.id;
    activeLab = null;
    renderLabs();
    const restored = previousLabId && document.querySelector(`[data-lab-id="${CSS.escape(previousLabId)}"] .note-button`);
    if (restored) restored.focus({ preventScroll: true });
    else if (returnFocus && document.contains(returnFocus)) returnFocus.focus();
    else $('lab-list-heading').focus({ preventScroll: true });
  }
  function downloadNote() {
    if (!activeLab) return;
    saveDraft();
    const blob = new Blob([$('note-editor').value], { type: 'text/markdown;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = el('a');
    link.href = blobUrl;
    link.download = activeLab.notePath.split('/').pop();
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
    notify('Markdown 파일을 다운로드했어요. 옵시디언에서 열 수 있어요.');
  }
  async function copyNote() {
    try {
      await navigator.clipboard.writeText($('note-editor').value);
      notify('노트 내용을 복사했어요.');
    } catch {
      $('note-editor').focus(); $('note-editor').select();
      notify('Ctrl+C 또는 ⌘C로 선택된 내용을 복사해 주세요.');
    }
  }
  async function openGitHub() {
    if (!activeLab) return;
    saveDraft();
    const text = $('note-editor').value;
    const params = new URLSearchParams({ filename: `content/${activeLab.notePath}`, value: text });
    const target = `${REPO_URL}/new/main?${params.toString()}`;
    if (target.length > 8000) {
      const newUrl = `${REPO_URL}/new/main?${new URLSearchParams({ filename: `content/${activeLab.notePath}` })}`;
      window.open(newUrl, '_blank', 'noopener,noreferrer');
      $('github-help').textContent = '긴 노트여서 내용을 URL에 넣지 않았어요. 내용을 복사한 뒤 열린 GitHub 편집기에 붙여넣고 커밋해 주세요.';
      await copyNote();
      return;
    }
    window.open(target, '_blank', 'noopener,noreferrer');
    $('github-help').textContent = 'GitHub에서 Commit changes를 완료하면 자동 배포돼요. 이 화면의 초안은 커밋 이후에도 보관됩니다.';
  }
  function bindEvents() {
    $('search').addEventListener('input', () => {
      state.query = $('search').value; state.page = 1;
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => { syncControls(); renderLabs(); }, 120);
    });
    $('difficulty').addEventListener('change', (event) => { state.difficulty = event.target.value; state.page = 1; render(); });
    $('sort').addEventListener('change', (event) => { state.sort = event.target.value; state.page = 1; render(); });
    $('mobile-category').addEventListener('change', (event) => setCategory(event.target.value));
    [['solved', 'solved-filter'], ['unsolved', 'unsolved-filter'], ['notes', 'notes-filter'], ['bookmarks', 'bookmark-filter'], ['drafts', 'draft-filter']].forEach(([key, id]) => $(id).addEventListener('click', () => { state[key] = !state[key]; if (key === 'solved' && state.solved) state.unsolved = false; if (key === 'unsolved' && state.unsolved) state.solved = false; state.page = 1; render(); }));
    $('reset-filters').addEventListener('click', resetFilters);
    $('close-dialog').addEventListener('click', () => $('note-dialog').close());
    $('note-dialog').addEventListener('close', finishComposer);
    $('note-dialog').addEventListener('click', (event) => {
      if (event.target !== $('note-dialog')) return;
      const bounds = $('note-dialog').getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) $('note-dialog').close();
    });
    $('note-editor').addEventListener('input', () => {
      clearTimeout(saveTimer);
      $('draft-status').textContent = '저장 중…';
      saveTimer = setTimeout(() => { saveTimer = null; saveDraft(); }, 400);
    });
    $('reset-draft').addEventListener('click', () => {
      if (!activeLab || !confirm('작성한 초안을 지우고 처음 템플릿으로 되돌릴까요?')) return;
      $('note-editor').value = template(activeLab);
      saveDraft();
      $('note-editor').focus();
    });
    $('download-note').addEventListener('click', downloadNote);
    $('copy-note').addEventListener('click', copyNote);
    $('github-note').addEventListener('click', openGitHub);
    window.addEventListener('beforeunload', () => { if (activeLab && saveTimer) saveDraft(); });
    window.addEventListener('popstate', () => { state = readUrlState(); render(); });
    document.addEventListener('keydown', (event) => {
      if ($('note-dialog').open && event.key === 'Tab') {
        const focusable = [...$('note-dialog').querySelectorAll('a[href], button:not([disabled]), textarea, input, select')].filter((item) => item.offsetParent !== null);
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) || document.activeElement.isContentEditable;
      if (event.key === '/' && !typing && !$('note-dialog').open && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); $('search').focus(); }
    });
  }
  async function init() {
    try {
      const response = await fetch('./_dashboard/catalog.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Catalog ${response.status}`);
      const data = await response.json();
      if (!Array.isArray(data.labs) || !Array.isArray(data.categories)) throw new Error('Invalid catalog');
      catalog = data;
      if (state.category !== 'all' && !catalog.categories.some((category) => category.id === state.category)) state.category = 'all';
      bindEvents(); renderStats(); render();
      if (!storageAvailable) $('local-caption').textContent = '브라우저 저장이 차단되어 초안·북마크 보관이 제한돼요';
    } catch (error) {
      $('result-count').textContent = '실습 목록을 불러오지 못했어요.';
      $('snapshot-caption').textContent = '연결 상태를 확인해 주세요';
      const empty = el('div', 'empty-state');
      const retry = el('button', 'button button-secondary', '다시 불러오기');
      retry.type = 'button'; retry.addEventListener('click', () => location.reload());
      empty.append(el('h3', '', '잠시 연결이 끊겼어요'), el('p', '', '새로고침하거나 GitHub 저장소에서 노트를 확인할 수 있어요.'), retry, externalLink(REPO_URL + '/tree/main/content', 'GitHub에서 보기 ↗', 'lab-source'));
      $('lab-list').replaceChildren(empty);
      console.error('Lab catalog could not be loaded:', error);
    }
  }
  init();
})();
