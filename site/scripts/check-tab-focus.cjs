// npm run check:tab-focus builds first; this script owns its preview lifecycle.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const { preview } = await import('vite');
  const server = process.env.PREVIEW_URL ? null : await preview({ preview: { host: '127.0.0.1', port: 0, open: false } });
  const url = process.env.PREVIEW_URL || server.resolvedUrls.local[0];
  let browser;
  try {
    browser = await chromium.launch({ headless: true, ...(process.env.PLAYWRIGHT_CHROMIUM_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL } : {}) });
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.route('https://**', route => route.abort());
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      const tabs = page.getByRole('tablist', { name: 'Scenario', exact: true });
      await tabs.getByRole('tab').first().focus();
      await page.evaluate(() => document.fonts.ready);
      // A visible first tab must not hide broken Home/End navigation.
      if (process.env.KNOWN_BAD_NAVIGATION) await page.evaluate(() => { window.ArtificerTabs = undefined; });
      for (const key of ['End', 'Home']) {
        await page.keyboard.press(key);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        assert.equal(await tabs.locator(':focus').count(), 1, 'Keyboard navigation must keep focus on a scenario tab');
        const expected = key === 'End' ? tabs.getByRole('tab').last() : tabs.getByRole('tab').first();
        assert(await expected.evaluate(el => el === document.activeElement), `${key} must focus the ${key === 'End' ? 'last' : 'first'} scenario tab`);
        const result = await tabs.evaluate(el => {
          const tab = el.querySelector(':focus');
          const r = tab.getBoundingClientRect();
          const bounds = el.getBoundingClientRect();
          const containerStyle = getComputedStyle(el);
          const style = getComputedStyle(tab);
          const outlineWidth = parseFloat(style.outlineWidth);
          const outlineOffset = parseFloat(style.outlineOffset);
          const outset = Math.max(0, outlineWidth + outlineOffset);
          // The ring is inset, but a partially scrolled tab still clips it.
          // Intersect the scroll box with the viewport so ancestor/page clipping
          // cannot masquerade as a fully visible tab.
          return { label: tab.textContent, outlineWidth, outlineOffset,
            left: r.left - outset - Math.max(bounds.left + parseFloat(containerStyle.borderLeftWidth), 0),
            right: Math.min(bounds.right - parseFloat(containerStyle.borderRightWidth), innerWidth) - r.right - outset,
            overflow: document.documentElement.scrollWidth > innerWidth };
        });
        console.log(width, key, result);
        assert(result.outlineWidth > 0);
        assert(result.outlineWidth + result.outlineOffset <= 0, 'Artificer scenario tab rings must stay inset');
        assert(result.left >= -0.5 && result.right >= -0.5, 'Focused tab and inset ring must fit within the visible scroll box');
        assert(!result.overflow, 'Page must not overflow horizontally');
      }
      await page.close();
    }
  } finally {
    try { await browser?.close(); } finally { await server?.close(); }
  }
})().catch(e => { console.error(e); process.exitCode = 1; });
