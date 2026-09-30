(() => {
  'use strict';
  const initialized = new WeakSet();
  const key = 'portswigger-lab-notes:last-list:v1';
  function highlight(view, category) {
    document.querySelectorAll('[data-explorer-view]').forEach(link => {
      if (document.body.dataset.slug === 'index' && link.dataset.explorerView === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    document.querySelectorAll('.topic-entry').forEach(entry => {
      const active = document.body.dataset.slug === 'index'
        ? entry.dataset.topic === (category || new URLSearchParams(location.search).get('topic'))
        : !!entry.querySelector('.topic-children a[aria-current="page"]');
      entry.classList.toggle('is-current-topic', active);
      const link = entry.querySelector('.topic-name');
      if (active && document.body.dataset.slug === 'index') link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }
  function revealInitialTopic(browser) {
    const activeNote = browser.querySelector('.topic-children a[aria-current="page"]');
    const topic = document.body.dataset.slug === 'index' ? new URLSearchParams(location.search).get('topic') : null;
    const group = activeNote?.closest('.topic-entry') || [...browser.querySelectorAll('.topic-entry')].find(entry => entry.dataset.topic === topic);
    if (!group) return;
    const button = group.querySelector('.topic-expand');
    const children = group.querySelector('.topic-children');
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/접기|펼치기$/, '접기'));
    children.hidden = false;
    requestAnimationFrame(() => {
      const container = browser.querySelector(matchMedia('(max-width: 900px)').matches ? '.topic-note-panel' : '.topic-tree');
      const target = activeNote || group.querySelector('.topic-name');
      if (!container || !target || !container.clientHeight || container.scrollHeight <= container.clientHeight) return;
      const bounds = container.getBoundingClientRect();
      const item = target.getBoundingClientRect();
      const top = bounds.top + container.clientTop + 8;
      const bottom = bounds.top + container.clientTop + container.clientHeight - 8;
      const delta = item.top < top ? item.top - top : item.bottom > bottom ? item.bottom - bottom : 0;
      if (delta) container.scrollTop += delta;
    });
  }
  function setup() {
    document.querySelectorAll('.topic-mobile-toggle,.topic-expand').forEach(button => {
      if (initialized.has(button)) return;
      initialized.add(button);
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
        if (button.classList.contains('topic-expand')) {
          document.getElementById(button.getAttribute('aria-controls')).hidden = !expanded;
          button.setAttribute('aria-label', button.getAttribute('aria-label').replace(/접기|펼치기$/, expanded ? '접기' : '펼치기'));
        } else if (expanded) revealInitialTopic(button.closest('.topic-browser'));
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
      revealInitialTopic(browser);
    });
    highlight(new URLSearchParams(location.search).get('view') || 'notes');
  }
  document.addEventListener('notebook:view', event => highlight(event.detail.view, event.detail.category));
  document.addEventListener('nav', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true }); else setup();
})();
