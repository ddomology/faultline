(() => {
  'use strict';
  const initialized = new WeakSet();
  const key = 'portswigger-lab-notes:last-list:v1';
  const positionKey = 'portswigger-lab-notes:explorer-position:v2';
  const legacyPositionKey = 'portswigger-lab-notes:explorer-position:v1';
  const viewNames = { notes: '풀이 노트', concepts: '개념 노트' };
  function readPositions() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(positionKey));
      if (saved && typeof saved === 'object' && !Array.isArray(saved)) return saved;
      const legacy = JSON.parse(sessionStorage.getItem(legacyPositionKey));
      return legacy && typeof legacy === 'object' && !Array.isArray(legacy) ? { notes: legacy } : {};
    } catch { return {}; }
  }
  function readPosition(browser) {
    const saved = readPositions()[browser.dataset.explorerMode];
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  }
  function activeTree(browser) {
    return browser.querySelector('.topic-tree:not([hidden])');
  }
  function scrollContainer(browser) {
    return matchMedia('(max-width: 900px)').matches ? browser.querySelector('.topic-note-panel') : activeTree(browser);
  }
  function savePosition(browser) {
    const tree = activeTree(browser);
    if (!tree) return;
    const positions = readPositions();
    const state = readPosition(browser);
    state.expanded = [...tree.querySelectorAll('.topic-entry')]
      .filter(entry => entry.querySelector('.topic-expand').getAttribute('aria-expanded') === 'true')
      .map(entry => entry.dataset.topic);
    const container = scrollContainer(browser);
    if (container?.clientHeight) state[matchMedia('(max-width: 900px)').matches ? 'mobile' : 'desktop'] = container.scrollTop;
    positions[browser.dataset.explorerMode] = state;
    try { sessionStorage.setItem(positionKey, JSON.stringify(positions)); } catch {}
  }
  function setExpanded(group, expanded) {
    const button = group.querySelector('.topic-expand');
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/접기|펼치기$/, expanded ? '접기' : '펼치기'));
    group.querySelector('.topic-children').hidden = !expanded;
  }
  function highlight(view, category) {
    const isHome = document.body.dataset.slug === 'index';
    document.querySelectorAll('.topic-browser').forEach(browser => {
      const next = isHome ? (view === 'concepts' ? 'concepts' : 'notes') : browser.dataset.explorerMode;
      const changed = browser.dataset.explorerMode !== next;
      if (changed && initialized.has(browser)) savePosition(browser);
      browser.dataset.explorerMode = next;
      browser.setAttribute('aria-label', `${viewNames[next]} 탐색기`);
      browser.querySelectorAll('[data-explorer-tree]').forEach(tree => { tree.hidden = tree.dataset.explorerTree !== next; });
      browser.querySelector('.topic-total').textContent = activeTree(browser)?.dataset.total || '0';
      browser.querySelectorAll('[data-explorer-view]').forEach(link => {
        if (link.dataset.explorerView === next) link.setAttribute('aria-current', isHome ? 'page' : 'true');
        else link.removeAttribute('aria-current');
      });
      browser.querySelectorAll('.topic-entry').forEach(entry => {
        const active = !entry.closest('.topic-tree').hidden && (isHome
          ? entry.dataset.topic === (category || new URLSearchParams(location.search).get('topic'))
          : !!entry.querySelector('.topic-children a[aria-current="page"]'));
        entry.classList.toggle('is-current-topic', active);
        const link = entry.querySelector('.topic-name');
        if (active && isHome) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
      if (changed && initialized.has(browser)) revealInitialTopic(browser, true);
    });
  }
  function revealInitialTopic(browser, restore = false) {
    const tree = activeTree(browser);
    if (!tree) return;
    const activeNote = tree.querySelector('.topic-children a[aria-current="page"]');
    const topic = document.body.dataset.slug === 'index' ? new URLSearchParams(location.search).get('topic') : null;
    const group = activeNote?.closest('.topic-entry') || [...tree.querySelectorAll('.topic-entry')].find(entry => entry.dataset.topic === topic);
    const state = readPosition(browser);
    if (restore && Array.isArray(state.expanded)) {
      tree.querySelectorAll('.topic-entry').forEach(entry => setExpanded(entry, state.expanded.includes(entry.dataset.topic)));
    }
    if (group) setExpanded(group, true);
    // Search controls and fonts can change the panel height after DOMContentLoaded.
    const loaded = document.readyState === 'complete' ? Promise.resolve()
      : new Promise(resolve => window.addEventListener('load', resolve, { once:true }));
    Promise.all([loaded, document.fonts?.ready]).then(() => requestAnimationFrame(() => {
      if (!browser.isConnected || activeTree(browser) !== tree) return;
      const container = scrollContainer(browser);
      if (!container?.clientHeight) return;
      const saved = state[matchMedia('(max-width: 900px)').matches ? 'mobile' : 'desktop'];
      if (restore && Number.isFinite(saved) && saved >= 0) container.scrollTop = saved;
      const target = activeNote || group?.querySelector('.topic-name');
      if (!target || container.scrollHeight <= container.clientHeight) return;
      const bounds = container.getBoundingClientRect();
      const item = target.getBoundingClientRect();
      const top = bounds.top + container.clientTop + 8;
      const bottom = bounds.top + container.clientTop + container.clientHeight - 8;
      const outside = item.top < top || item.bottom > bottom;
      const delta = !outside ? 0 : restore && Number.isFinite(saved)
        ? item.top < top ? item.top - top : item.bottom - bottom
        : item.top - top - (container.clientHeight - item.height) / 3;
      if (delta) container.scrollTop += delta;
    }));
  }
  function setup() {
    // Apply the URL's view before restoring scroll, without overwriting the other tab.
    highlight(new URLSearchParams(location.search).get('view') === 'concepts' ? 'concepts' : 'notes');
    document.querySelectorAll('.topic-mobile-toggle,.topic-expand').forEach(button => {
      if (initialized.has(button)) return;
      initialized.add(button);
      button.addEventListener('click', () => {
        const browser = button.closest('.topic-browser');
        if (button.classList.contains('topic-mobile-toggle')) savePosition(browser);
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
        if (button.classList.contains('topic-expand')) {
          document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
          button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/접기|펼치기$/, expanded ? '접기' : '펼치기'));
          savePosition(browser);
        } else if (expanded) revealInitialTopic(browser, true);
      });
    });
    document.querySelectorAll('.topic-children a').forEach(link => {
      if (initialized.has(link)) return;
      initialized.add(link);
      link.addEventListener('click', () => {
        if (document.body.dataset.slug === 'index') { try { sessionStorage.setItem(key, location.pathname + location.search); } catch {} }
      });
    });
    document.querySelectorAll('[data-note-return]').forEach(link => {
      try {
        const stored = sessionStorage.getItem(key); if (!stored) return;
        const home = new URL(link.href), target = new URL(stored, location.origin);
        const view = url => url.searchParams.get('view') === 'concepts' ? 'concepts' : 'notes';
        const path = url => url.pathname.replace(/index(?:\.html)?$/, '').replace(/\/$/, '');
        if (target.origin === home.origin && path(target) === path(home) && view(target) === view(home)) link.href = target.href;
      } catch {}
    });
    document.querySelectorAll('.topic-browser').forEach(browser => {
      if (initialized.has(browser)) return;
      initialized.add(browser);
      browser.addEventListener('click', event => {
        if (event.target.closest('a[href]')) savePosition(browser);
      }, true);
      revealInitialTopic(browser, true);
    });
  }
  document.addEventListener('notebook:view', event => highlight(event.detail.view, event.detail.category));
  document.addEventListener('nav', setup);
  window.addEventListener('pagehide', () => document.querySelectorAll('.topic-browser').forEach(savePosition));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true }); else setup();
})();
