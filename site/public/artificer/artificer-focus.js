/* Artificer · focus-trap helper for modals & popovers.
   Usage:
     const trap = ArtificerFocus.trap(modalEl);
     // ... when closing:
     trap.release();
   Behavior: tab/shift-tab cycles within element; Esc fires onEscape if provided;
   focus is restored to the previously-focused element on release.
   SPA note: focusables are recomputed on EVERY Tab, so controls added while
   open are reachable automatically — no re-trap needed. Only INITIAL focus is
   set at trap() time; if you swap content and want focus reset, release() then
   trap() again. */
(function () {
  'use strict';
  const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

  function trap(el, opts) {
    opts = opts || {};
    const previouslyFocused = document.activeElement;
    const focusables = () => Array.from(el.querySelectorAll(FOCUSABLE)).filter(n => !n.hasAttribute('inert'));

    // Move focus to first focusable, or the container itself
    const first = focusables()[0];
    if (first) first.focus();
    else { el.tabIndex = -1; el.focus(); }

    function onKey(e) {
      if (e.key === 'Escape' && opts.onEscape) { opts.onEscape(e); return; }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) { e.preventDefault(); return; }
      const firstEl = items[0];
      const lastEl  = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); firstEl.focus(); }
    }
    el.addEventListener('keydown', onKey);

    return {
      release() {
        el.removeEventListener('keydown', onKey);
        if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
      }
    };
  }

  window.ArtificerFocus = { trap };
})();
