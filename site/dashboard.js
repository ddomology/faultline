(() => {
  'use strict';
  const root = document.querySelector('.lab-explorer');
  if (!root) return;
  const $ = (id) => document.getElementById(id);
  const BOOKMARK_KEY = 'portswigger-lab-notes:bookmarks:v1';
  const RETURN_KEY = 'portswigger-lab-notes:last-list:v1';
  const PAGE_SIZE = 24;
  const levels = { Apprentice: 0, Practitioner: 1, Expert: 2 };
  const levelNames = { Apprentice: '입문', Practitioner: '실전', Expert: '심화' };
  let catalog, entries = [], bookmarks = new Set(), limit = PAGE_SIZE, timer;
  let storageAvailable = true;
  let state = readState();
  try {
    const saved = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || '[]');
    if (Array.isArray(saved)) bookmarks = new Set(saved.filter((id) => typeof id === 'string'));
  } catch { storageAvailable = false; }

  function node(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }
  function normalize(value) { return String(value || '').normalize('NFKC').toLocaleLowerCase(); }
  function readState() {
    const params = new URLSearchParams(location.search);
    // Keep previously bookmarked URLs useful after consolidating the site.
    const view = params.get('view') || (params.get('saved') === '1' ? 'saved' : 'notes');
    const sort = params.get('sort');
    return {
      view: ['notes', 'all', 'saved'].includes(view) ? view : 'notes',
      query: params.get('q') || '', category: params.get('topic') || 'all',
      difficulty: Object.hasOwn(levels, params.get('level')) ? params.get('level') : 'all',
      sort: ['number', 'recent', 'title', 'difficulty', 'topic'].includes(sort) ? sort : 'number',
    };
  }
  function syncUrl() {
    const params = new URLSearchParams();
    if (state.view !== 'notes') params.set('view', state.view);
    if (state.query) params.set('q', state.query);
    if (state.category !== 'all') params.set('topic', state.category);
    if (state.difficulty !== 'all') params.set('level', state.difficulty);
    if (state.sort !== 'number') params.set('sort', state.sort);
    const next = `${location.pathname}${params.size ? '?' + params.toString() : ''}`;
    if (location.pathname + location.search !== next) history.replaceState(null, '', next);
  }
  function baseEntries() {
    return entries.filter((entry) => state.view === 'all' || (state.view === 'notes' ? entry.noteUrl : bookmarks.has(entry.id)));
  }
  function filteredEntries() {
    const tokens = normalize(state.query).trim().split(/\s+/).filter(Boolean);
    return baseEntries().filter((entry) =>
      (state.category === 'all' || state.category === entry.category) &&
      (state.difficulty === 'all' || state.difficulty === entry.difficulty) &&
      tokens.every((token) => entry.search.includes(token))
    ).sort((a, b) => {
      if (state.sort === 'number') return String(a.number || '').localeCompare(String(b.number || ''), 'en', { numeric: true });
      if (state.sort === 'recent') {
        const diff = String(b.updatedAt || '').localeCompare(String(a.updatedAt || ''));
        if (diff) return diff;
        if (!!a.noteUrl !== !!b.noteUrl) return a.noteUrl ? -1 : 1;
      }
      if (state.sort === 'difficulty') {
        const diff = (levels[a.difficulty] ?? 3) - (levels[b.difficulty] ?? 3);
        if (diff) return diff;
      }
      if (state.sort === 'topic') {
        const diff = a.categoryTitle.localeCompare(b.categoryTitle);
        if (diff) return diff;
      }
      if (state.sort === 'title') return a.title.localeCompare(b.title, 'en');
      return (a.order ?? 99999) - (b.order ?? 99999) || a.title.localeCompare(b.title, 'en');
    });
  }
  function categoryOptions() {
    const groups = new Map();
    for (const entry of baseEntries()) {
      const group = groups.get(entry.category) || { title: entry.categoryTitle, count: 0 };
      group.count++; groups.set(entry.category, group);
    }
    if (state.category !== 'all' && !groups.has(state.category)) {
      const known = catalog.categories.find((item) => item.id === state.category);
      if (known) groups.set(known.id, { title: known.title, count: 0 });
      else state.category = 'all';
    }
    const all = node('option', '', '모든 주제'); all.value = 'all';
    $('category').replaceChildren(all);
    for (const [id, group] of groups) {
      const option = node('option', '', `${catalog.categories.find(item => item.id === id)?.number || ''} ${group.title} (${group.count})`.trim());
      option.value = id; $('category').append(option);
    }
    $('category').value = state.category;
  }
  function dateLabel(value) {
    const date = new Date(value);
    return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat('ko-KR', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date) : '';
  }
  function bookmarkButton(entry) {
    const button = node('button', 'note-bookmark', bookmarks.has(entry.id) ? '★' : '☆');
    button.type = 'button';
    button.setAttribute('aria-pressed', String(bookmarks.has(entry.id)));
    button.setAttribute('aria-label', `${entry.title} 즐겨찾기 ${bookmarks.has(entry.id) ? '해제' : '추가'}`);
    button.title = '즐겨찾기 · 이 브라우저에 저장';
    button.addEventListener('click', () => {
      if (bookmarks.has(entry.id)) bookmarks.delete(entry.id); else bookmarks.add(entry.id);
      try { localStorage.setItem(BOOKMARK_KEY, JSON.stringify([...bookmarks])); storageAvailable = true; }
      catch { storageAvailable = false; }
      render();
      const replacement = [...root.querySelectorAll('.note-row')].find((row) => row.dataset.entryId === entry.id);
      if (replacement) replacement.querySelector('.note-bookmark').focus({ preventScroll: true });
      else root.querySelector('[data-view="saved"]').focus({ preventScroll: true });
    });
    return button;
  }
  function renderEntry(entry) {
    const row = node('article', `note-row${entry.noteUrl ? ' has-note' : ''}`);
    row.dataset.entryId = entry.id;
    const number = node('span', 'note-number', entry.number || '—');
    number.setAttribute('aria-label', `노트 번호 ${entry.number || ''}`);
    const content = node('div', 'note-row-content');
    const meta = node('div', 'note-meta');
    meta.append(node('span', 'note-topic', entry.categoryTitle));
    if (entry.difficulty) meta.append(node('span', `note-level level-${normalize(entry.difficulty)}`, `${levelNames[entry.difficulty] || ''} ${entry.difficulty}`.trim()));
    const heading = node('h2', 'note-title');
    const link = node('a', '', entry.title);
    link.href = entry.noteUrl || entry.url;
    if (entry.noteUrl) {
      link.addEventListener('click', () => { try { sessionStorage.setItem(RETURN_KEY, location.pathname + location.search); } catch {} });
    } else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    heading.append(link);
    const footer = node('div', 'note-row-footer');
    if (entry.noteUrl) {
      if (state.view !== 'notes') footer.append(node('span', 'note-available', '풀이 있음'));
      const formatted = dateLabel(entry.updatedAt);
      if (formatted) { const time = node('time', '', `${formatted} 수정`); time.dateTime = entry.updatedAt; footer.append(time); }
    } else footer.append(node('span', '', '기록 없음'), node('span', 'note-source', '원본 실습 열기 ↗'));
    content.append(meta, heading, footer);
    row.append(number, content, bookmarkButton(entry));
    return row;
  }
  function reset() {
    state.query = ''; state.category = 'all'; state.difficulty = 'all'; state.sort = 'number'; limit = PAGE_SIZE;
    render(); $('search').focus();
  }
  function renderEmpty() {
    const box = node('div', 'empty-state');
    const hasFilter = state.query || state.category !== 'all' || state.difficulty !== 'all';

    box.append(node('h2', '', hasFilter ? '검색 결과 없음' : state.view === 'saved' ? '즐겨찾기 없음' : '등록된 풀이 없음'));
    box.append(node('p', '', hasFilter ? '검색어를 바꾸거나 주제·난이도 필터를 해제해 보세요.' : state.view === 'saved' ? '목록의 별을 눌러 추가할 수 있습니다.' : 'GitHub에 기록한 노트가 이곳에 표시됩니다.'));
    const button = node('button', 'empty-action', hasFilter ? '필터 초기화' : '전체 실습 보기'); button.type = 'button';
    button.addEventListener('click', hasFilter ? reset : () => { state.view = 'all'; reset(); });
    box.append(button);
    if (hasFilter && state.view === 'notes') {
      const broader = node('button', 'empty-action secondary', '전체 실습에서 검색'); broader.type = 'button';
      broader.addEventListener('click', () => { state.view = 'all'; limit = PAGE_SIZE; render(); }); box.append(broader);
    }
    return box;
  }
  function render() {
    categoryOptions();
    root.querySelector('.library-title').textContent = state.view === 'all' ? '전체 실습' : state.view === 'saved' ? '즐겨찾기' : '풀이 노트';
    $('search').value = state.query; $('difficulty').value = state.difficulty; $('sort').value = state.sort;
    root.querySelectorAll('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
    $('notes-count').textContent = entries.filter((entry) => entry.noteUrl).length;
    $('labs-count').textContent = catalog.labs.length;
    $('saved-count').textContent = entries.filter((entry) => bookmarks.has(entry.id)).length;
    $('reset-filters').hidden = !state.query && state.category === 'all' && state.difficulty === 'all' && state.sort === 'number';
    const matches = filteredEntries();
    $('result-count').textContent = `${state.view === 'notes' ? '풀이 노트' : state.view === 'all' ? '실습 · 노트' : '즐겨찾기'} ${matches.length}개${state.query ? ` · “${state.query}” 검색 결과` : ''}`;
    const fragment = document.createDocumentFragment();
    for (const entry of matches.slice(0, limit)) fragment.append(renderEntry(entry));
    if (!matches.length) fragment.append(renderEmpty());
    $('lab-list').replaceChildren(fragment);
    $('load-more').hidden = matches.length <= limit;
    $('load-more').textContent = `더 보기 · ${Math.min(limit, matches.length)} / ${matches.length}`;
    $('library-caption').textContent = storageAvailable
      ? state.view === 'saved' ? '즐겨찾기는 이 브라우저에 저장됩니다.' : state.view === 'all' ? `전체 실습은 ${catalog.snapshotDate} 목록 기준입니다. 풀이가 있는 문제는 노트로 바로 연결됩니다.` : ''
      : '브라우저 저장이 차단되어 즐겨찾기는 현재 화면에서만 유지됩니다.';
    $('library-caption').hidden = !$('library-caption').textContent;
    syncUrl();
    document.dispatchEvent(new CustomEvent('notebook:view', { detail: { view: state.view, category: state.category } }));
  }
  function bind() {
    root.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
      state.view = button.dataset.view; limit = PAGE_SIZE; render();
    }));
    $('search').addEventListener('input', () => {
      state.query = $('search').value; limit = PAGE_SIZE;
      clearTimeout(timer); timer = setTimeout(render, 100);
    });
    [['category', 'category'], ['difficulty', 'difficulty'], ['sort', 'sort']].forEach(([id, key]) => {
      $(id).addEventListener('change', () => { state[key] = $(id).value; limit = PAGE_SIZE; render(); });
    });
    $('reset-filters').addEventListener('click', reset);
    $('load-more').addEventListener('click', () => { const start = limit; limit += PAGE_SIZE; render(); $('lab-list').children[start]?.querySelector('.note-title a')?.focus({ preventScroll: true }); });
    window.addEventListener('popstate', () => { clearTimeout(timer); state = readState(); limit = PAGE_SIZE; render(); });
    window.addEventListener('storage', (event) => {
      if (event.key !== BOOKMARK_KEY && event.key !== null) return;
      try { const value = JSON.parse(event.newValue || '[]'); bookmarks = new Set(Array.isArray(value) ? value : []); render(); } catch {}
    });
    document.addEventListener('keydown', (event) => {
      const target = document.activeElement;
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) && !target.isContentEditable) { event.preventDefault(); $('search').focus(); }
    });
  }
  async function init() {
    try {
      const response = await fetch('./_dashboard/catalog.json', { cache: 'no-cache' });
      if (!response.ok) throw new Error(`Catalog ${response.status}`);
      catalog = await response.json();
      if (!Array.isArray(catalog.labs) || !Array.isArray(catalog.notes) || !Array.isArray(catalog.categories)) throw new Error('Invalid catalog');
      const byLab = new Map(catalog.notes.filter((note) => note.labId).map((note) => [note.labId, note]));
      entries = catalog.labs.map((lab) => ({ ...lab, ...byLab.get(lab.id), id: lab.id }));
      entries.push(...catalog.notes.filter((note) => !note.labId));
      for (const entry of entries) {
        entry.categoryTitle ||= '일반 노트'; entry.category ||= 'notes';
        entry.updatedAt ||= entry.noteUpdatedAt || '';
        const extras = [];
        if (/oracle/i.test(entry.title)) extras.push('오라클');
        if (/mysql/i.test(entry.title)) extras.push('마이에스큐엘');
        if (/microsoft/i.test(entry.title)) extras.push('마이크로소프트');
        if (/login/i.test(entry.title)) extras.push('로그인');
        if (/bypass/i.test(entry.title)) extras.push('우회');
        if (/hidden/i.test(entry.title)) extras.push('숨김 숨겨진');
        entry.search = normalize([entry.number, entry.title, entry.categoryTitle, entry.category, entry.difficulty, levelNames[entry.difficulty], entry.searchText || entry.noteSearchText, ...(entry.tags || []), ...(catalog.aliases?.[entry.category] || []), ...extras].join(' '));
      }
      bind(); render(); root.dataset.ready = 'true';
    } catch (error) {
      $('result-count').textContent = '목록을 불러오지 못했어요.';
      const box = node('div', 'empty-state');
      box.append(node('h2', '', '잠시 후 다시 불러와 주세요.'));
      const retry = node('button', 'empty-action', '다시 불러오기'); retry.type = 'button'; retry.addEventListener('click', () => location.reload()); box.append(retry);
      const fallback = node('a', 'empty-action secondary', 'GitHub에서 풀이 보기'); fallback.href = 'https://github.com/ddomology/portswigger-lab-notes/tree/main/content'; box.append(fallback);
      $('lab-list').replaceChildren(box);
      console.error('Notebook catalog:', error);
    }
  }
  init();
})();
