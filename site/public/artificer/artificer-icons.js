/* ═══════════════════════════════════════════════════════════════════════════
   ARTIFICER · Icons
   Minimal Lucide-rooted set, hand-tuned to system stroke weight.
   - 16px viewBox, 1.5 stroke (matches body type ascender weight)
   - Inherit color via stroke="currentColor" — never hardcode
   - Use semantic icons sparingly: max 1 per "row" of UI
   ═══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // 16×16 paths. Stroke-only (no fills) so they read on any surface.
  // Sourced from Lucide (lucide.dev, ISC license) and lightly tuned.
  const PATHS = {
    // Navigation / chrome
    'menu':       'M3 6h10M3 8h10M3 10h10',
    'close':      'M4 4l8 8M12 4l-8 8',
    'chevron-r':  'M6 4l4 4-4 4',
    'chevron-l':  'M10 4l-4 4 4 4',
    'chevron-d':  'M4 6l4 4 4-4',
    'chevron-u':  'M4 10l4-4 4 4',
    'arrow-r':    'M3 8h10M9 4l4 4-4 4',
    'arrow-l':    'M13 8H3M7 4L3 8l4 4',
    'external':   'M10 3h3v3M13 3l-6 6M11 9v3H4V5h3',

    // Status / semantic
    'check':      'M3 8l3 3 7-7',
    'x':          'M4 4l8 8M12 4l-8 8',
    'alert':      'M8 2L1.5 13h13L8 2zM8 6v3M8 11.5v.01',
    'info':       'M8 1a7 7 0 100 14A7 7 0 008 1zM8 7v4M8 4.5v.01',
    'circle-dot': 'M8 1a7 7 0 100 14A7 7 0 008 1zM8 6a2 2 0 100 4 2 2 0 000-4z',
    'spinner':    'M8 1.5v2.5M8 12v2.5M3.4 3.4l1.8 1.8M10.8 10.8l1.8 1.8M1.5 8H4M12 8h2.5M3.4 12.6l1.8-1.8M10.8 5.2l1.8-1.8',

    // Actions
    'plus':       'M8 3v10M3 8h10',
    'minus':      'M3 8h10',
    'search':     'M11.5 11.5L14 14M2.5 7a4.5 4.5 0 109 0 4.5 4.5 0 00-9 0z',
    'edit':       'M11 2l3 3-8 8H3v-3l8-8zM10 3l3 3',
    'trash':      'M3 4h10M5.5 4V2.5h5V4M4.5 4l.5 9.5h6L11.5 4M6.5 7v4M9.5 7v4',
    'copy':       'M5 5V3a1 1 0 011-1h7a1 1 0 011 1v7a1 1 0 01-1 1h-2M3 5h7a1 1 0 011 1v7a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z',
    'download':   'M8 2v8M4 7l4 4 4-4M2 13h12',
    'upload':     'M8 11V3M4 6l4-4 4 4M2 13h12',
    'send':       'M14 2L1 8l5 2 8-8zM14 2l-6 12-2-5',
    'refresh':    'M14 4v3.5h-3.5M2 12V8.5h3.5M3 6a5.5 5.5 0 0110.5-1M13 10a5.5 5.5 0 01-10.5 1',

    // Files & system
    'file':       'M4 1h6l3 3v10a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1zM10 1v3h3',
    'folder':     'M2 4a1 1 0 011-1h3l1.5 1.5H13a1 1 0 011 1V13a1 1 0 01-1 1H3a1 1 0 01-1-1V4z',
    'terminal':   'M2 3h12a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zM4 6l2 2-2 2M8 10h4',
    'code':       'M5 4L1 8l4 4M11 4l4 4-4 4',
    'settings':   'M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM8 1v1.5M8 13.5V15M2.5 8H1M15 8h-1.5M3.5 3.5l1 1M11.5 11.5l1 1M3.5 12.5l1-1M11.5 4.5l1-1',
    'theme':      'M8 1a7 7 0 100 14V1z',

    // Person
    'user':       'M8 8a3 3 0 100-6 3 3 0 000 6zM2 14c.5-3 3-5 6-5s5.5 2 6 5',
    'logout':     'M10 4V3a1 1 0 00-1-1H3a1 1 0 00-1 1v10a1 1 0 001 1h6a1 1 0 001-1v-1M7 8h7M11 5l3 3-3 3',
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';

  function build(name, opts) {
    const d = PATHS[name];
    if (!d) {
      console.warn('[artificer/icons] Unknown icon: ' + name);
      return null;
    }
    const svg = document.createElementNS(SVG_NS, 'svg');
    const size = (opts && opts.size) || 16;
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', (opts && opts.strokeWidth) || 1.5);
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    svg.classList.add('icon');
    if (opts && opts.className) svg.classList.add(opts.className);

    // Split path data on M commands so each subpath is its own <path>;
    // keeps stroke joins clean across disconnected strokes.
    const subpaths = d.split(/(?=M)/g).filter(Boolean);
    subpaths.forEach(p => {
      const path = document.createElementNS(SVG_NS, 'path');
      path.setAttribute('d', p.trim());
      svg.appendChild(path);
    });
    return svg;
  }

  // Replace <i data-icon="name"></i> placeholders in the DOM
  function hydrate(root) {
    const scope = root || document;
    scope.querySelectorAll('[data-icon]').forEach(el => {
      if (el.dataset.iconHydrated === '1') return;
      const name = el.getAttribute('data-icon');
      const svg = build(name, {
        size: el.getAttribute('data-icon-size') || 16,
        strokeWidth: el.getAttribute('data-icon-stroke') || 1.5,
      });
      if (!svg) return;
      el.innerHTML = '';
      el.appendChild(svg);
      el.dataset.iconHydrated = '1';
    });
  }

  // Public API
  // SPA lifecycle — auto-hydrate nodes inserted after first paint. Returns a
  // disconnect fn. Idempotent guards make the re-scan cheap (done nodes skip).
  function observe(root) {
    root = root || document.body;
    hydrate(root);
    if (typeof MutationObserver === 'undefined') return function () {};
    var scheduled = false;
    var mo = new MutationObserver(function () {
      if (scheduled) return;
      scheduled = true;
      (window.requestAnimationFrame || window.setTimeout)(function () { scheduled = false; hydrate(root); }, 0);
    });
    mo.observe(root, { childList: true, subtree: true });
    return function () { mo.disconnect(); };
  }

  window.ArtificerIcons = {
    build:   build,
    hydrate: hydrate,
    observe: observe,
    list:    () => Object.keys(PATHS),
  };

  // Auto-hydrate on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => hydrate());
  } else {
    hydrate();
  }
})();
