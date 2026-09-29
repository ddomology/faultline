(() => {
  'use strict';
  const initialized = new WeakSet();
  function setup() {
    document.querySelectorAll('.topic-mobile-toggle').forEach((button) => {
      if (initialized.has(button)) return;
      initialized.add(button);
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') !== 'true';
        button.setAttribute('aria-expanded', String(expanded));
      });
    });
    document.querySelectorAll('[data-note-return]').forEach((link) => {
      try {
        const stored = sessionStorage.getItem('portswigger-lab-notes:last-list:v1');
        if (!stored) return;
        const home = new URL(link.href);
        const target = new URL(stored, location.origin);
        const homePath = home.pathname.replace(/index(?:\.html)?$/, '').replace(/\/$/, '');
        const targetPath = target.pathname.replace(/index(?:\.html)?$/, '').replace(/\/$/, '');
        if (target.origin === home.origin && targetPath === homePath) link.href = target.href;
      } catch { /* The plain home link also works with storage disabled. */ }
    });
  }
  document.addEventListener('nav', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
