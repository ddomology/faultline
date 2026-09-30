import { iconSvg } from './ui-icons';
import { topicIconSvg } from './topic-icons';
import { difficultyBarsSvg } from './difficulty-bars';

(() => {
  'use strict';
  let catalogPromise;
  let mounted;

  function loadCatalog(homeUrl) {
    if (!catalogPromise) {
      catalogPromise = fetch(new URL('_dashboard/catalog.json', homeUrl), { cache: 'no-cache' })
        .then(async (response) => {
          if (!response.ok) throw new Error(`Catalog ${response.status}`);
          const catalog = await response.json();
          if (!Array.isArray(catalog.labs) || !Array.isArray(catalog.notes) || !Array.isArray(catalog.categories)) throw new Error('Invalid catalog');
          return catalog;
        }).catch((error) => { catalogPromise = undefined; throw error; });
    }
    return catalogPromise;
  }

  function mount() {
  const root = document.querySelector('.lab-explorer');
  if (mounted?.root === root && root?.isConnected) {
    // The router can be the final postscript block on the initial page load.
    window.addCleanup?.(mounted.dispose);
    return;
  }
  mounted?.dispose();
  if (!root) return;
  const controller = new AbortController();
  const { signal } = controller;
  const $ = (id) => root.querySelector(`#${id}`);
  const isActive = () => !signal.aborted && root.isConnected && root === document.querySelector('.lab-explorer');
  // The sidebar's home link stays valid while readers and lists share one shell.
  const homeUrl = new URL(document.querySelector('[data-explorer-view="notes"]')?.href || location.href);
  const RETURN_KEY = 'portswigger-lab-notes:last-list:v1';
  const PAGE_SIZE = 24;
  const viewNames = { notes: '풀이 노트', concepts: '개념 노트' };
  const levels = { Apprentice: 0, Practitioner: 1, Expert: 2 };
  const levelNames = { Apprentice: '입문', Practitioner: '실전', Expert: '심화' };
  let catalog, entries = [], limit = readLimit(), timer;
  let composing = false;
  let state = readState();
  function dispose() {
    clearTimeout(timer);
    controller.abort();
    if (mounted?.root === root) mounted = undefined;
  }
  mounted = { root, dispose };
  window.addCleanup?.(dispose);

  function readLimit() {
    const value = history.state?.__notebookList?.limit;
    return Number.isSafeInteger(value) && value >= PAGE_SIZE ? value : PAGE_SIZE;
  }
  function saveLimit() {
    if (history.state?.__notebookList?.limit === limit) return;
    history.replaceState({ ...history.state, __notebookList: { ...history.state?.__notebookList, limit } }, '', location.href);
  }

  function node(tag, className, text) {
    const result = document.createElement(tag);
    if (className) result.className = className;
    if (text !== undefined) result.textContent = text;
    return result;
  }
  function normalize(value) { return String(value || '').normalize('NFKC').toLocaleLowerCase(); }
  function readState() {
    const params = new URLSearchParams(location.search);
    // Legacy all/saved links open the unified notes list and retain their filters.
    const view = params.get('view');
    const sort = params.get('sort');
    return {
      view: Object.hasOwn(viewNames, view) ? view : 'notes',
      query: params.get('q') || '', category: params.get('topic') || 'all',
      difficulty: Object.hasOwn(levels, params.get('level')) ? params.get('level') : 'all',
      sort: ['number', 'recent', 'title', 'difficulty'].includes(sort) ? sort : 'number',
    };
  }
  function syncUrl(replace) {
    const params = new URLSearchParams();
    if (state.view !== 'notes') params.set('view', state.view);
    if (state.query) params.set('q', state.query);
    if (state.category !== 'all') params.set('topic', state.category);
    if (state.difficulty !== 'all') params.set('level', state.difficulty);
    if (state.sort !== 'number') params.set('sort', state.sort);
    const next = `${location.pathname}${params.size ? '?' + params.toString() : ''}`;
    if (location.pathname + location.search !== next) {
      if (typeof window.notebookSetRoute === 'function') window.notebookSetRoute(next, { replace });
      else history[replace ? 'replaceState' : 'pushState']({ ...history.state }, '', next);
    }
    saveLimit();
  }
  function baseEntries() {
    if (state.view === 'concepts') return entries.filter(isConceptNote);
    return entries.filter((entry) => !isConceptNote(entry));
  }
  function isConceptNote(entry) { return !!entry.noteUrl && !entry.labId; }
  function filteredEntries() {
    const tokens = normalize(state.query).trim().split(/\s+/).filter(Boolean);
    return baseEntries().filter((entry) =>
      (state.category === 'all' || state.category === entry.category) &&
      (state.difficulty === 'all' || state.difficulty === entry.difficulty) &&
      tokens.every((token) => entry.search.includes(token))
    ).sort((a, b) => {
      // Keep each topic contiguous; sorting applies within its group.
      const topicOrder = (catalog.categories.findIndex(item => item.id === a.category) + 1 || 999)
        - (catalog.categories.findIndex(item => item.id === b.category) + 1 || 999);
      if (topicOrder) return topicOrder;
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
      if (state.sort === 'title') return a.title.localeCompare(b.title, 'ko');
      return (a.order ?? 99999) - (b.order ?? 99999) || a.title.localeCompare(b.title, 'ko');
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
    }
    const all = node('option', '', '모든 주제'); all.value = 'all';
    $('category').replaceChildren(all);
    for (const [id, group] of groups) {
      const option = node('option', '', `${catalog.categories.find(item => item.id === id)?.number || ''} ${group.title} (${group.count})`.trim());
      option.value = id; $('category').append(option);
    }
    $('category').value = state.category;
  }
  function renderEntry(entry) {
    const row = node('article', `note-row${entry.noteUrl ? ' has-note' : ''}`);
    row.dataset.entryId = entry.id;
    const number = node('span', 'note-number', entry.number || '—');
    number.setAttribute('aria-label', `노트 번호 ${entry.number || ''}`);
    const content = node('div', 'note-row-content');
    const heading = node('h3', 'note-title');
    const link = node('a', '', entry.title);
    link.href = entry.noteUrl || entry.url;
    if (entry.noteUrl) {
      link.dataset.noteLink = '';
    } else { link.target = '_blank'; link.rel = 'noopener noreferrer'; }
    heading.append(link);
    if (!isConceptNote(entry) && (!entry.noteUrl || entry.noteKind === 'problem')) {
      const status = node('span', 'note-status');
      status.title = '풀이 기록을 아직 작성하지 않은 노트입니다.';
      status.innerHTML = iconSvg('construction');
      status.append(node('span', '', '작성 중'));
      heading.append(' ', status);
    }
    content.append(heading);
    if (entry.originalTitle && entry.originalTitle !== entry.title) {
      const subtitle = node('p', 'note-subtitle', entry.originalTitle);
      subtitle.lang = 'en';
      content.append(subtitle);
    }
    const meta = node('div', 'note-row-meta');
    if (entry.difficulty) {
      const level = node('span', `note-level level-${normalize(entry.difficulty)}`);
      level.title = `${levelNames[entry.difficulty] || ''} · ${entry.difficulty}`;
      level.setAttribute('aria-label', `난이도 ${level.title}`);
      level.innerHTML = difficultyBarsSvg(entry.difficulty);
      level.append(node('span', '', levelNames[entry.difficulty] || entry.difficulty));
      meta.append(level);
    }
    if (entry.url) {
      const source = node('a', 'note-source', '공식 문제');
      source.insertAdjacentHTML('beforeend', iconSvg('arrow-up-right'));
      source.href = entry.url; source.target = '_blank'; source.rel = 'noopener noreferrer';
      source.setAttribute('aria-label', `${entry.title} 공식 문제 (새 탭)`);
      meta.append(source);
    }
    row.append(number, content, meta);
    return row;
  }
  function renderGroups(matches) {
    const fragment = document.createDocumentFragment();
    const groups = new Map();
    for (const entry of matches) {
      if (!groups.has(entry.category)) groups.set(entry.category, []);
      groups.get(entry.category).push(entry);
    }
    let remaining = limit;
    for (const [category, group] of groups) {
      if (remaining <= 0) break;
      const visible = group.slice(0, remaining);
      remaining -= visible.length;
      const section = node('section', 'lab-group');
      section.dataset.category = category;
      const header = node('header', 'lab-group-header');
      const heading = node('h2', 'lab-group-title');
      heading.id = `lab-group-${category}`;
      heading.innerHTML = topicIconSvg(category);
      heading.append(node('span', '', group[0].categoryTitle));
      section.setAttribute('aria-labelledby', heading.id);
      const count = node('span', 'lab-group-count', visible.length < group.length ? `${visible.length} / ${group.length}` : `${group.length}`);
      count.setAttribute('aria-label', `${group.length}개 중 ${visible.length}개 표시`);
      header.append(heading, count);
      const rows = node('div', 'lab-group-rows');
      for (const entry of visible) rows.append(renderEntry(entry));
      section.append(header, rows);
      fragment.append(section);
    }
    if (!matches.length) fragment.append(renderEmpty());
    return fragment;
  }
  function reset() {
    state.query = ''; state.category = 'all'; state.difficulty = 'all'; state.sort = 'number'; limit = PAGE_SIZE;
    render(); $('search').focus();
  }
  function renderEmpty() {
    const box = node('div', 'empty-state');
    if (state.view === 'concepts' && !baseEntries().length) {
      box.append(node('h2', '', '아직 개념 노트가 없습니다.'));
      box.append(node('p', '', '개념을 정리한 글이 이곳에 표시됩니다.'));
      return box;
    }
    const hasFilter = state.query || state.category !== 'all' || state.difficulty !== 'all';

    box.append(node('h2', '', hasFilter ? '검색 결과 없음' : '등록된 풀이 없음'));
    box.append(node('p', '', hasFilter ? '검색어를 바꾸거나 주제·난이도 필터를 해제해 보세요.' : 'GitHub에 기록한 노트가 이곳에 표시됩니다.'));
    if (hasFilter) {
      const button = node('button', 'empty-action', '필터 초기화'); button.type = 'button';
      button.addEventListener('click', reset, { signal });
      box.append(button);
    }
    return box;
  }
  function render({ replace = false } = {}) {
    if (!isActive()) return;
    clearTimeout(timer);
    const emptyConcepts = state.view === 'concepts' && !baseEntries().length;
    if (!emptyConcepts && state.category !== 'all'
      && !baseEntries().some((entry) => entry.category === state.category)
      && !catalog.categories.some((category) => category.id === state.category)) state.category = 'all';
    // Commit before changing list height so the router records the outgoing scroll.
    syncUrl(replace);
    if (!emptyConcepts) categoryOptions();
    root.querySelector('.library-title').textContent = viewNames[state.view];
    root.setAttribute('aria-label', `${viewNames[state.view]} 목록`);
    root.querySelector('.library-toolbar').hidden = emptyConcepts;
    if (!composing && $('search').value !== state.query) $('search').value = state.query;
    $('difficulty').value = state.difficulty; $('sort').value = state.sort;
    root.querySelectorAll('[data-view]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.view === state.view)));
    $('notes-count').textContent = entries.filter((entry) => !isConceptNote(entry)).length;
    $('concepts-count').textContent = entries.filter(isConceptNote).length;
    $('reset-filters').hidden = emptyConcepts || (!state.query && state.category === 'all' && state.difficulty === 'all' && state.sort === 'number');
    const matches = filteredEntries();
    $('result-count').textContent = `${viewNames[state.view]} ${matches.length}개${state.query && !emptyConcepts ? ` · “${state.query}” 검색 결과` : ''}`;
    $('lab-list').replaceChildren(renderGroups(matches));
    $('load-more').hidden = matches.length <= limit;
    $('load-more').textContent = `더 보기 · ${Math.min(limit, matches.length)} / ${matches.length}`;
    $('library-caption').textContent = state.view === 'notes' ? '‘작성 중’은 문제 조건을 먼저 정리하고 풀이 기록을 준비하는 노트입니다.' : '';
    $('library-caption').hidden = !$('library-caption').textContent;
    document.dispatchEvent(new CustomEvent('notebook:view', { detail: { view: state.view, category: state.category } }));
  }
  function restoreRoute() {
    if (!isActive() || !catalog) return;
    clearTimeout(timer); composing = false;
    state = readState(); limit = readLimit();
    render({ replace: true });
  }
  function bind() {
    root.addEventListener('click', (event) => {
      if (event.target.closest?.('.note-title a[data-note-link]')) {
        try { sessionStorage.setItem(RETURN_KEY, location.pathname + location.search); } catch {}
      }
    }, { signal });
    root.querySelectorAll('[data-view]').forEach((button) => button.addEventListener('click', () => {
      state.view = button.dataset.view; limit = PAGE_SIZE; render();
    }, { signal }));
    $('search').addEventListener('compositionstart', () => { composing = true; clearTimeout(timer); }, { signal });
    $('search').addEventListener('compositionend', () => { composing = false; state.query = $('search').value; limit = PAGE_SIZE; clearTimeout(timer); timer = setTimeout(() => render({ replace: true }), 100); }, { signal });
    $('search').addEventListener('input', () => {
      state.query = $('search').value; limit = PAGE_SIZE;
      clearTimeout(timer); if (!composing) timer = setTimeout(() => render({ replace: true }), 100);
    }, { signal });
    [['category', 'category'], ['difficulty', 'difficulty'], ['sort', 'sort']].forEach(([id, key]) => {
      $(id).addEventListener('change', () => { state[key] = $(id).value; limit = PAGE_SIZE; render(); }, { signal });
    });
    $('reset-filters').addEventListener('click', reset, { signal });
    $('load-more').addEventListener('click', () => { const start = limit; limit += PAGE_SIZE; render({ replace: true }); $('lab-list').querySelectorAll('.note-title a')[start]?.focus({ preventScroll: true }); }, { signal });
    document.addEventListener('notebook:route-update', restoreRoute, { signal });
    window.addEventListener('popstate', () => { if (typeof window.notebookSetRoute !== 'function') restoreRoute(); }, { signal });
    document.addEventListener('keydown', (event) => {
      if (root.querySelector('.library-toolbar').hidden) return;
      const target = document.activeElement;
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !/^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName) && !target?.isContentEditable) { event.preventDefault(); $('search').focus(); }
    }, { signal });
  }
  async function init() {
    try {
      catalog = await loadCatalog(homeUrl);
      if (!isActive()) return;
      state = readState(); limit = readLimit();
      const byLab = new Map(catalog.notes.filter((note) => note.labId).map((note) => [note.labId, note]));
      entries = catalog.labs.map((lab) => ({ ...lab, ...byLab.get(lab.id), id: lab.id }));
      entries.push(...catalog.notes.filter((note) => !note.labId).map((note) => ({ ...note })));
      for (const entry of entries) {
        entry.categoryTitle ||= '일반 노트'; entry.category ||= 'notes';
        entry.updatedAt ||= entry.noteUpdatedAt || '';
        const extras = [];
        const titleTerms = `${entry.title} ${entry.originalTitle || ''}`;
        if (/oracle/i.test(titleTerms)) extras.push('오라클');
        if (/mysql/i.test(titleTerms)) extras.push('마이에스큐엘');
        if (/microsoft/i.test(titleTerms)) extras.push('마이크로소프트');
        if (/login/i.test(titleTerms)) extras.push('로그인');
        if (/bypass/i.test(titleTerms)) extras.push('우회');
        if (/hidden/i.test(titleTerms)) extras.push('숨김 숨겨진');
        entry.search = normalize([entry.number, titleTerms, entry.categoryTitle, entry.category, entry.difficulty, levelNames[entry.difficulty], entry.searchText || entry.noteSearchText, ...(entry.tags || []), ...(catalog.aliases?.[entry.category] || []), ...extras].join(' '));
      }
      bind(); render({ replace: true }); root.dataset.ready = 'true';
    } catch (error) {
      if (!isActive()) return;
      $('result-count').textContent = '목록을 불러오지 못했어요.';
      const box = node('div', 'empty-state');
      box.append(node('h2', '', '잠시 후 다시 불러와 주세요.'));
      const retry = node('button', 'empty-action', '다시 불러오기'); retry.type = 'button'; retry.addEventListener('click', () => {
        retry.disabled = true; $('result-count').textContent = '풀이를 불러오는 중…'; init();
      }, { signal }); box.append(retry);
      const fallback = node('a', 'empty-action secondary', 'GitHub에서 풀이 보기'); fallback.href = 'https://github.com/ddomology/faultline/tree/main/content'; box.append(fallback);
      $('lab-list').replaceChildren(box);
      console.error('Notebook catalog:', error);
    }
  }
  init();
  }
  document.addEventListener('nav', mount);
  mount();
})();
