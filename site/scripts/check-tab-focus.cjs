// Run against npm run preview with Playwright available via NODE_PATH.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'chrome' });
  try {
    for (const width of [1280, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.route('https://**', route => route.abort());
      await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4164/', { waitUntil: 'domcontentloaded' });
      const tabs = page.getByRole('tablist', { name: 'Scenario', exact: true });
      await tabs.getByRole('tab').first().focus();
      await page.evaluate(() => document.fonts.ready);
      for (const key of ['End', 'Home']) {
        await page.keyboard.press(key);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const result = await tabs.evaluate(el => {
          const tab = el.querySelector(':focus');
          const r = tab.getBoundingClientRect();
          const bounds = el.getBoundingClientRect();
          const style = getComputedStyle(tab);
          const ring = parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset);
          return { label: tab.textContent, outlineWidth: parseFloat(style.outlineWidth), ring, left: r.left - ring - bounds.left,
            right: bounds.right - r.right - ring, overflow: document.documentElement.scrollWidth > innerWidth };
        });
        console.log(width, key, result);
        assert(result.outlineWidth > 0);
        assert(result.left >= -0.5 && result.right >= -0.5, 'Full focus ring must fit within the scroll box');
        assert(!result.overflow, 'Page must not overflow horizontally');
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(e => { console.error(e); process.exitCode = 1; });
