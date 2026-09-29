(() => {
  'use strict';
  const initialized = new WeakSet();
  const key = 'portswigger-lab-notes:last-list:v1';
  function highlight(view) {
    document.querySelectorAll('[data-explorer-view]').forEach(link => {
      if (document.body.dataset.slug === 'index' && link.dataset.explorerView === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
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
        }
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
    highlight(new URLSearchParams(location.search).get('view') || 'notes');
  }
  document.addEventListener('notebook:view', event => highlight(event.detail.view));
  document.addEventListener('nav', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once:true }); else setup();
})();
