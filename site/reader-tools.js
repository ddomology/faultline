(() => {
  'use strict';
  const supportsDialog = typeof HTMLDialogElement !== 'undefined' && typeof HTMLDialogElement.prototype.showModal === 'function';

  const enhanced = new WeakSet();
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

  function setup() {
    if (!document.getElementById('main-content')) {
      const article = document.querySelector('.center > article');
      if (article) { article.id = 'main-content'; article.tabIndex = -1; }
    }
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
