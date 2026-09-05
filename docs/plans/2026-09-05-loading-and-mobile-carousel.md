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
- [x] Run build, unit tests, and independent browser verification; record results. `npm run build && npm test` passes (39 tests). `node /private/tmp/spec-compare-perf/check-render.cjs` passes at 320/390/800/1440 px, asserting real touchscreen targets, centered cards, correct height, no document overflow, no page exceptions, and preserved classic-script APIs.
- [x] Review final diff, update changelog, commit and push the branch. Correctness/simplification review found no remaining blocker; an independent Codex browser review reconfirmed all pager targets, fitted heights, desktop behavior, and responsive resizing. The implementation commits are pushed on `fix/loading-and-mobile-carousel`; production remains unchanged pending PR review and merge.

Font-swap movement remains a separate finding: the throttled cold-mobile test measured 0.267 cumulative shift, despite green field CLS. Revisit with more field samples before changing font strategy.

## Final measurement

`node /private/tmp/spec-compare-perf/measure.cjs http://127.0.0.1:4178/fixed/ final` measured the complete production patch with the same settings and gzip server as the control. Mobile LCP: 1,024 / 1,004 / 1,008 ms; median **1,008 ms versus 1,200 ms** for the unchanged build (16% faster). The introductory paragraph remains the LCP element. No field improvement is claimed before deployment and collection of more visits.

The independent renderer also checked light-mode 320 px matrix, heatmap, and decision views: intentional internal scrolling stays contained, without document overflow. The baseline browser assertion failed on the overlapping pager target before the fix, so its passing result exercises the reproduced defect.

Dependency review found one existing build-only Browserslist audit entry in the pinned tree (`npm audit --json`); no dependency versions were upgraded in this loading/rendering patch. esbuild is declared directly at the version already present transitively.
