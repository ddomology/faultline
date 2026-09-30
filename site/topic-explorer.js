(() => {
  'use strict';
  const initialized = new WeakSet();
  const key = 'portswigger-lab-notes:last-list:v1';
  const positionKey = 'portswigger-lab-notes:explorer-position:v1';
  function readPosition() {
    try { return JSON.parse(sessionStorage.getItem(positionKey)) || {}; } catch { return {}; }
  }
  function scrollContainer(browser) {
    return browser.querySelector(matchMedia('(max-width: 900px)').matches ? '.topic-note-panel' : '.topic-tree');
  }
  function savePosition(browser) {
    const state = readPosition();
    state.expanded = [...browser.querySelectorAll('.topic-entry')]
      .filter(entry => entry.querySelector('.topic-expand').getAttribute('aria-expanded') === 'true')
      .map(entry => entry.dataset.topic);
    const container = scrollContainer(browser);
    if (container?.clientHeight) state[matchMedia('(max-width: 900px)').matches ? 'mobile' : 'desktop'] = container.scrollTop;
    try { sessionStorage.setItem(positionKey, JSON.stringify(state)); } catch {}
  }
  function setExpanded(group, expanded) {
    const button = group.querySelector('.topic-expand');
    button.setAttribute('aria-expanded', String(expanded));
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/접기|펼치기$/, expanded ? '접기' : '펼치기'));
    group.querySelector('.topic-children').hidden = !expanded;
  }
  function highlight(view, category) {
    document.querySelectorAll('[data-explorer-view]').forEach(link => {
      if (document.body.dataset.slug === 'index' && link.dataset.explorerView === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('.topic-entry').forEach(entry => {
      const active = document.body.dataset.slug === 'index'
        ? view !== 'concepts' && entry.dataset.topic === (category || new URLSearchParams(location.search).get('topic'))
        : !!entry.querySelector('.topic-children a[aria-current="page"]');
      entry.classList.toggle('is-current-topic', active);
      const link = entry.querySelector('.topic-name');
      if (active && document.body.dataset.slug === 'index') link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  function revealInitialTopic(browser, restore = false) {
    const activeNote = browser.querySelector('.topic-children a[aria-current="page"]');
    const topic = document.body.dataset.slug === 'index' ? new URLSearchParams(location.search).get('topic') : null;
    const group = activeNote?.closest('.topic-entry') || [...browser.querySelectorAll('.topic-entry')].find(entry => entry.dataset.topic === topic);
    const state = readPosition();
    if (restore && Array.isArray(state.expanded)) {
      browser.querySelectorAll('.topic-entry').forEach(entry => setExpanded(entry, state.expanded.includes(entry.dataset.topic)));
    }
    if (group) setExpanded(group, true);
    // Search controls and fonts can change the panel height after DOMContentLoaded.
    const loaded = document.readyState === 'complete' ? Promise.resolve()
      : new Promise(resolve => window.addEventListener('load', resolve, { once:true }));
    Promise.all([loaded, document.fonts?.ready]).then(() => requestAnimationFrame(() => {
      if (!browser.isConnected) return;
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
        const path = url => url.pathname.replace(/index(?:\.html)?$/, '').replace(/\/$/, '');
        if (target.origin === home.origin && path(target) === path(home)) link.href = target.href;
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
    highlight(new URLSearchParams(location.search).get('view') === 'concepts' ? 'concepts' : 'notes');
  }
  document.addEventListener('notebook:view', event => highlight(event.detail.view, event.detail.category));
  document.addEventListener('nav', setup);
  window.addEventListener('pagehide', () => document.querySelectorAll('.topic-browser').forEach(savePosition));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true }); else setup();
})();
