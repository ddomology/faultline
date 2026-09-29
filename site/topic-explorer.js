(() => {
  'use strict';
  const initialized = new WeakSet();

  function normalize(text) {
    return String(text || '').normalize('NFKC').toLocaleLowerCase().trim();
  }

  function setCurrent(browser, topic) {
    browser.dataset.currentTopic = topic || '';
    browser.querySelectorAll('.topic-link[data-topic], .topic-shortcuts a[data-topic]').forEach((link) => {
      const active = Boolean(topic) && link.dataset.topic === topic;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    browser.querySelectorAll('.topic-entry').forEach((entry) => {
      entry.classList.toggle('is-current', Boolean(topic) && entry.dataset.topic === topic);
    });
  }

  function closeMobileExplorer(browser) {
    const explorer = browser.closest('.explorer');
    const mobileToggle = explorer && explorer.querySelector('.mobile-explorer');
    if (!explorer || !mobileToggle || !mobileToggle.getClientRects().length || getComputedStyle(mobileToggle).display === 'none') return;
    explorer.classList.add('collapsed');
    explorer.setAttribute('aria-expanded', 'false');
    document.documentElement.classList.remove('mobile-no-scroll');
  }

  function plainClick(event, link) {
    return event.button === 0 && !event.ctrlKey && !event.metaKey && !event.altKey && !event.shiftKey && !link.hasAttribute('download') && (!link.target || link.target === '_self');
  }

  function setup() {
    document.querySelectorAll('.topic-browser').forEach((browser) => {
      if (initialized.has(browser)) return;
      initialized.add(browser);
      const input = browser.querySelector('.topic-search input[type="search"]');
      const status = browser.querySelector('.topic-search-status');
      const entries = [...browser.querySelectorAll('.topic-tree > .topic-entry')];
      const defaultStatus = status ? status.textContent : '';
      let searchTimer;

      function filterTopics() {
        const terms = normalize(input ? input.value : '').split(/\s+/).filter(Boolean);
        let visible = 0;
        entries.forEach((entry) => {
          const haystack = normalize(entry.dataset.search || entry.querySelector('.topic-name')?.textContent || '');
          const match = terms.every((term) => haystack.includes(term));
          entry.hidden = !match;
          if (match) visible += 1;
        });
        if (status) {
          status.textContent = terms.length ? (visible ? `${visible}개 주제 찾음` : '일치하는 주제가 없어요. 검색어를 바꿔 보세요.') : (defaultStatus || `${entries.length}개 학습 주제`);
          status.classList.toggle('is-empty', visible === 0);
        }
      }

      if (input) {
        input.addEventListener('input', () => {
          clearTimeout(searchTimer);
          searchTimer = setTimeout(filterTopics, 80);
        });
        input.addEventListener('search', filterTopics);
        input.addEventListener('keydown', (event) => {
          if (event.key === 'Escape' && input.value) {
            event.preventDefault();
            event.stopPropagation();
            input.value = '';
            clearTimeout(searchTimer);
            filterTopics();
          }
        });
      }

      browser.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (!target) return;
        const expand = target.closest('.topic-expand');
        if (expand && browser.contains(expand)) {
          const id = expand.getAttribute('aria-controls');
          const children = id ? document.getElementById(id) : null;
          if (!children || !browser.contains(children)) return;
          event.preventDefault();
          event.stopPropagation();
          const open = expand.getAttribute('aria-expanded') !== 'true';
          expand.setAttribute('aria-expanded', String(open));
          const label = expand.getAttribute('aria-label');
          if (label) expand.setAttribute('aria-label', label.replace(/(?:접기|펼치기)$/, open ? '접기' : '펼치기'));
          children.hidden = !open;
          return;
        }
        const link = target.closest('a');
        if (!link || !browser.contains(link) || !plainClick(event, link)) return;
        const isTopicLink = link.matches('.topic-link[data-topic], .topic-shortcuts a[data-topic]');
        if (isTopicLink && document.querySelector('.lab-explorer[data-ready="true"]')) {
          event.preventDefault();
          event.stopPropagation();
          const topic = link.dataset.topic || 'all';
          setCurrent(browser, topic);
          closeMobileExplorer(browser);
          document.dispatchEvent(new CustomEvent('lab:topic-select', { detail: { topic } }));
          return;
        }
        closeMobileExplorer(browser);
      });

      setCurrent(browser, browser.dataset.currentTopic || '');
      filterTopics();
    });
  }

  document.addEventListener('lab:topic-change', (event) => {
    const topic = event.detail && event.detail.topic;
    if (typeof topic !== 'string') return;
    document.querySelectorAll('.topic-browser').forEach((browser) => setCurrent(browser, topic));
  });
  document.addEventListener('nav', setup);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
