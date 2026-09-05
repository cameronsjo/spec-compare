# Loading and mobile carousel review

Goal: Codex will improve slower first visits and repair confirmed mobile rendering quirks while preserving Cameron's existing design.

## Evidence and approach

- Cameron's Cloudflare screenshot: nine LCP samples, 89% good, P75 868 ms, P90 3,188 ms. INP and CLS are green. This is a small slow tail, not evidence of widespread poor performance.
- Three live Chromium mobile runs (390 × 844, cold cache, 200 KB/s download, 150 ms configured latency, 4× CPU slowdown) identify `.lede` as LCP at median 1,264 ms.
- The production build copies Artificer's CSS and classic scripts through `public/`, bypassing Vite minification. Minifying those files in an isolated gzip-served experiment reduces them from 62,440 to 22,045 compressed bytes; median mobile LCP improves from 1,200 to 1,000 ms across three runs per build. Lab timings are not field percentiles.
- A separate Codex rendering review confirms a roughly 275 px blank gap below the initial mobile carousel card: its container follows the tallest off-screen card.
- Chosen approach: minify copied CSS/JS in the production output with esbuild, and make the mobile carousel follow the selected card's natural height. Verify all card jumps and responsive behavior in a browser.
- Declined: broad redesign or prerendering architecture given the healthy field P75. Font preloads reduced lab font-swap movement but worsened LCP; leave them out of this patch.

## Checklist

- [x] Review production loading and responsive rendering; record baseline.
- [x] Minify the production design-system assets while retaining readable development copies. `npm run build && npm test` passes (39 tests); the postbuild step emits all eight minified CSS/JS files.
- [x] Fix mobile carousel height and any reproduced pager defects. Real touchscreen taps reproduced overlapping pager targets (dots 0–6 selected the next tool). Each dot now has its own 24 × 44 px target; browser assertions verify all eight jumps, centered cards, and fitted heights at 320/390/800 px, plus desktop layout at 1440 px.
- [ ] Run build, unit tests, and independent browser verification; record results.
- [ ] Review final diff, update changelog, commit and push the branch.

Font-swap movement remains a separate finding: the throttled cold-mobile test measured 0.267 cumulative shift, despite green field CLS. Revisit with more field samples before changing font strategy.
