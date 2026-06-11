# Upgrade vendored Artificer 0.10.1 → 0.18.0

> Approved plan, persisted for durability (cadence Plan Execution). Implemented in
> session `keen-sonata` while `dusk-mallet` (planning session, stale) held `main`.

## Context

`spec-compare`'s UI is built on a **hand-placed** copy of the Artificer design
system at `site/public/artificer/`, currently `--art-version: "0.10.1"`. Upstream
has shipped through **0.18.0** (live on npm, `latest`, zero deps). v0.18.0
"re-trues" the type scale (`html { font-size: 100% }`) so all token-bound text
renders at its *labeled* px — **everything grows ~14.3%**. Goal: move to 0.18.0,
absorb the growth, retire absorbed local adaptations, adopt new primitives, end
the hand-vendoring chore.

**Decisions (confirmed with user):**
- **Vendor path:** pin `@cameronsjo/artificer@0.18.0` as a devDependency (lockfile
  = single source of truth) + a files-only copy script mirroring
  `node_modules/@cameronsjo/artificer/src/`'s text files into
  `site/public/artificer/`. Regenerable text files (`*.{css,js,json}`) are
  generated + gitignored; binary `assets/**` stay tracked; script never touches
  them.
- **Scope:** version bump + re-true fallout + adaptation cleanup + adopt new
  primitives (tabs via `ArtificerTabs.nextIndex`, `.table` base, layer-the-
  primitive-under elsewhere).

**Already verified done (no work):** dot theme key `'artificer.theme'` in FOUC
bootstrap + React toggle; no stray `px` type overrides (only `styles.css:67` rem);
brandPurpleBright N/A; v0.18 JS modules self-register on `window`.

## Phases

### A — Vendoring infrastructure
1. `site/package.json`: add `"@cameronsjo/artificer": "0.18.0"` exact pin to
   devDependencies; `npm install` to record in `site/package-lock.json`.
2. `site/scripts/revendor-artificer.sh` — ported from agentic-harnesses' script
   (same FILES structure, MIN_BYTES floor, `--art-version` echo, `assets/`
   exclusion) but sourced from `node_modules/@cameronsjo/artificer/src/`. Fixed
   list of 9 text files (8 sibling + `artificer-tabs.js`), no recursion.
3. npm scripts: `vendor:artificer` wired to `predev` + `prebuild`.
4. One-time assets refresh: diff `assets/**` vs 0.18.0 package; copy+commit if
   changed; thereafter frozen.
5. `git rm --cached site/public/artificer/*.{css,js,json}` + add
   `site/public/artificer/*.{css,js,json}` to `.gitignore`. Keep `assets/**`
   tracked.

### B — Drop in v0.18 + retire wordmark
6. Run vendor; confirm `--art-version: "0.18.0"`.
7. Wordmark (#9 / upstream #81): v0.18 `.wordmark` handles flex natively — verify
   App.tsx markup, delete local inline-span workaround if present.

### C — Re-true fallout (~14.3% growth)
8. SVG label pass — token-bind labels that track body (`--t-*-size`), keep dense
   fixed labels as raw px `/* tuned */`. Sites: ScoringHeatmap map labels
   (styles.css `.map-tick`/`.map-axis`/`.map-label`), LoopGraph inline fontSize.
9. Re-test tables at 375px (FeatureMatrix, ScoringHeatmap, WorkflowCompare
   carousel). Rebalance only if broken, not merely scrolled.

### D — Adopt new primitives
10. TabPicker → `.tabs` + `ArtificerTabs.nextIndex` (React keeps state). WAI-ARIA
    tablist. No `enhance()`/`observe()`. Add `site/src/tabs.d.ts`. Convert only
    genuine view-switchers; leave filter/mode toggles as `aria-pressed`.
11. Tables → `.table` base; layer specialized CSS on top; watch override ordering.
    Sweep app CSS for hand-rolls approximating 0.11–0.18 mints and layer primitive
    under matches.

### E — Verify + close loop
12. Update `docs/artificer-adaptations.md`: mark #9 + #11 absorbed; note #2
    `--success-fill` now upstream (calm-score #7 stays); record new decisions;
    keep #10 + #12. Do NOT claim 0.18.0 is first public release (0.12.0 was,
    2026-06-03).
13. Invoke `/artificer-feedback` in background (MUST). Report pattern decisions +
    provenance wrinkle (assets vendor-able but outside SRI contract).

## Execution deviations from plan assumptions (reported, intent preserved)
- **No "sibling new npm script" exists.** agentic-harnesses still has only the
  `gh api`-pull `revendor-artificer.sh`; its `site/package.json` has no
  `vendor:artificer`/devDep/`predev`. Byte-for-byte convergence target is absent.
  The plan fully specifies the script regardless → port sibling structure, swap
  `gh` fetch for `node_modules` copy. Intent preserved.
- **Installed node_modules artificer was 0.12.0** (planning install), not 0.18.0.
  Phase A.1's explicit pin updates it.
