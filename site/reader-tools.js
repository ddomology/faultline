(() => {
  'use strict';
  const supportsDialog = typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function';

  const enhanced = new WeakSet();
  const enhancedCallouts = new WeakSet();
  const enhancedTables = new WeakSet();
  const updateTable = (container) => {
    if (!container?.isConnected) return;
    const overflowing = container.scrollWidth > container.clientWidth + 1;
    if (overflowing) {
      container.tabIndex = 0;
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', '표, 가로로 스크롤 가능');
    } else {
      container.removeAttribute('tabindex');
      container.removeAttribute('role');
      container.removeAttribute('aria-label');
    }
  };
  const tableObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(entries => {
    entries.forEach(({ target }) => updateTable(target.closest('.table-container')));
  });
  let dialog, enlargedImage, caption, returnFocus, previousOverflow;

  function makeDialog() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.className = 'reader-lightbox';
    dialog.setAttribute('aria-label', '이미지 크게 보기');

    const toolbar = document.createElement('div');
    toolbar.className = 'reader-lightbox-toolbar';
    const title = document.createElement('span');
    title.textContent = '이미지 크게 보기';
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'reader-lightbox-close';
    close.textContent = '닫기';
    close.autofocus = true;
    close.addEventListener('click', () => dialog.close());
    toolbar.append(title, close);

    const figure = document.createElement('figure');
    figure.className = 'reader-lightbox-figure';
    enlargedImage = document.createElement('img');
    enlargedImage.className = 'reader-lightbox-image';
    caption = document.createElement('figcaption');
    caption.id = 'reader-lightbox-caption';
    figure.append(enlargedImage, caption);
    dialog.append(toolbar, figure);
    document.body.append(dialog);

    // Quartz handles Escape on document even when its search is closed. Close
    // here before that handler cancels the native dialog's default action.
    dialog.addEventListener('keydown', (event) => {
      if (!dialog.open || (event.key !== 'Escape' && event.key !== 'Esc')) return;
      event.preventDefault();
      event.stopPropagation();
      dialog.close();
    }, { capture: true });

    // A click outside the dialog's rectangle comes from the native backdrop.
    // Both ends must be outside, so dragging an image out does not close it.
    let pressedBackdrop = false;
    const isBackdrop = (event) => {
      const box = dialog.getBoundingClientRect();
      return event.target === dialog &&
        (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom);
    };
    dialog.addEventListener('pointerdown', (event) => { pressedBackdrop = isBackdrop(event); });
    dialog.addEventListener('click', (event) => {
      if (pressedBackdrop && isBackdrop(event)) dialog.close();
      pressedBackdrop = false;
    });
    dialog.addEventListener('close', () => {
      document.documentElement.style.overflow = previousOverflow;
      enlargedImage.removeAttribute('src');
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });
  }

  function openImage(source, trigger) {
    makeDialog();
    if (dialog.open) return;
    returnFocus = trigger;
    enlargedImage.src = source.currentSrc || source.src;
    enlargedImage.alt = source.alt;
    const originalCaption = source.closest('figure')?.querySelector('figcaption');
    caption.textContent = originalCaption?.textContent?.trim() || source.alt || '';
    caption.hidden = !caption.textContent;
    if (caption.textContent) dialog.setAttribute('aria-describedby', caption.id);
    else dialog.removeAttribute('aria-describedby');
    previousOverflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
  }

  function frameScreenshot(image) {
    if (image.closest('figure,[data-no-caption]') || image.getAttribute('role') === 'presentation') return;
    const media = image.parentElement?.tagName === 'PICTURE' ? image.parentElement : image;
    const content = media.parentElement?.tagName === 'A' ? media.parentElement : media;
    const paragraph = content.parentElement;
    // Only standalone images: preserve prose, inline icons and authored figures.
    if (paragraph?.tagName !== 'P' || !Array.from(paragraph.childNodes).every(node =>
      node === content || (node.nodeType === Node.TEXT_NODE && !node.textContent.trim())
    )) return;

    const figure = document.createElement('figure');
    figure.className = 'reader-screenshot';
    if (paragraph.id) figure.id = paragraph.id;
    const frame = document.createElement('div');
    frame.className = 'reader-image-frame';
    paragraph.replaceWith(figure);
    frame.append(content);
    figure.append(frame);

    const description = image.alt.trim();
    const isPlaceholder = /^(?:image|img|screenshot|이미지|스크린샷|화면\s*캡처)(?:[\s_-]*\d+)?$/i.test(description);
    const isFilename = /\.(?:png|jpe?g|gif|webp|avif|svg)(?:\?.*)?$/i.test(description);
    if (description && !isPlaceholder && !isFilename) {
      const descriptionElement = document.createElement('figcaption');
      descriptionElement.textContent = description;
      figure.append(descriptionElement);
    }
  }

  function setup() {
    if (!document.getElementById('main-content')) {
      const article = document.querySelector('.center > article');
      if (article) { article.id = 'main-content'; article.tabIndex = -1; }
    }
    document.querySelectorAll('.center article .footnotes > h2').forEach(heading => {
      if (heading.textContent.trim() === 'Footnotes') heading.textContent = '각주';
    });
    document.querySelectorAll('.center article a[role="anchor"]').forEach(link => {
      link.tabIndex = 0;
      link.removeAttribute('aria-hidden');
      link.setAttribute('aria-label', `${link.parentElement.textContent.trim()} 제목 링크`);
    });
    document.querySelectorAll('.center article .callout.is-collapsible > .callout-title').forEach(title => {
      if (enhancedCallouts.has(title)) return;
      enhancedCallouts.add(title);
      title.tabIndex = 0;
      title.setAttribute('role', 'button');
      const update = () => {
        const collapsed = title.parentElement.classList.contains('is-collapsed');
        title.setAttribute('aria-expanded', String(!collapsed));
        const content = title.parentElement.querySelector('.callout-content');
        if (content) content.inert = collapsed;
      };
      update();
      title.addEventListener('click', () => requestAnimationFrame(update));
      title.addEventListener('keydown', event => {
        if (event.target !== title) return;
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        title.click();
      });
    });
    document.querySelectorAll('.center article .table-container').forEach(container => {
      if (enhancedTables.has(container)) return;
      enhancedTables.add(container);
      updateTable(container);
      tableObserver?.observe(container);
      const table = container.querySelector('table');
      if (table) tableObserver?.observe(table);
    });
    document.querySelectorAll('.center article img').forEach(image => {
      // Images from the repository already have build-time dimensions. For
      // other images, preserve intrinsic size inside the shrink-to-fit frame.
      const sizeImage = () => {
        if (!image.hasAttribute('width') && !image.hasAttribute('height') && image.naturalWidth && image.naturalHeight) {
          image.width = image.naturalWidth;
          image.height = image.naturalHeight;
        }
      };
      if (image.complete) sizeImage();
      else image.addEventListener('load', sizeImage, { once: true });
      frameScreenshot(image);
    });
    if (!supportsDialog) return;
    document.querySelectorAll('.center article img').forEach((image) => {
      if (enhanced.has(image) || image.closest('a,button,[data-no-lightbox]') || image.getAttribute('role') === 'presentation') return;
      enhanced.add(image);
      const media = image.parentElement?.tagName === 'PICTURE' ? image.parentElement : image;
      const trigger = document.createElement('button');
      trigger.type = 'button';
      trigger.className = 'reader-image-trigger';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-label', image.alt ? `이미지 크게 보기: ${image.alt}` : '이미지 크게 보기');
      trigger.title = '클릭해서 크게 보기';
      media.before(trigger);
      trigger.append(media);
      trigger.addEventListener('click', () => openImage(image, trigger));
    });
  }

  document.addEventListener('nav', () => {
    if (dialog?.open) dialog.close();
    setup();
  });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
