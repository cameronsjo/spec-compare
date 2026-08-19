# Artificer adaptations

How this project bends the Artificer design system, and why. Each entry mirrors a
feedback issue filed upstream.

## 2026-05-31 · Building a data-dense comparison surface

`spec-compare`'s `site/` is a comparison tool: two of its four views are dense
tables (feature matrix, scoring heatmap). Artificer supplied the editorial layer
(anchor words, lede, badges) and the graph layer (we reused the SVG workflow
graph), but the **data layer** — tables, score encoding, a complete fill family —
isn't owned by the system, so we invented it.

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 1 | gap | tool | none (no table component) | Built `.matrix-table` / `.heatmap-table` with sticky header + sticky first column + sortable header buttons. The matrix & heatmap need dense, scannable tables. | yes | 3 |
| 2 | gap | tool | `--success-fill` missing | The fill family has `--steel/-accent/-attention/-urgent/-brand-purple`-`-fill` but **no `--success-fill`**. Used `color-mix(in srgb, var(--success) N%, transparent)` for score-5 cells. | yes | 1 (maybe) |
| 3 | extension | tool | score encoding | Diverging 1–5 token scale (`urgent → attention → steel → accent → success`) + `color-mix` intensity → `ScorePip` chip + heatmap cell fills. Encodes use-case fitness. | maybe | 3 |
| 4 | extension | tool | app shell | `.app-shell` + `.app-sidenav` + `.nav-drawer` + `.sidenav button` shim + React `ThemeToggle` + inert/focus-trap drawer — copied **near-verbatim from agentic-harnesses**. SPA nav + mobile drawer. | **RETIRED 2026-08-19 @ 0.24.1** — see § Adopted the compiled React chrome components | 3 |
| 5 | misfit | tool | `.sidenav a` only | `.sidenav button` shim replicating link grammar (resting/hover/focus/active rail) — nav items switch SPA state, not navigate. **Second consumer to hit this** (agentic-harnesses filed it first). | yes | 3 |
| 6 | confusion | tool | JS helpers DOMContentLoaded-bound | `artificer-theme.js` binds before the SPA mounts, so its handler never attaches; re-implemented the theme toggle in React driving the same `data-theme` + `artificer.theme` key. Same for relying on `ArtificerFocus`/`Whimsy` post-mount. | maybe | 3 |

**Friction:** the absent `--success-fill` broke an otherwise-symmetric token
family. The `<script defer>` JS helpers are dead weight in an SPA that mounts
after `DOMContentLoaded`. There is no table primitive at all for the two densest
views.

**Don't upstream:** the phase-kind vocabulary, `SCENARIO_META`, the 6-tool data
model, and the specific score→hue mapping are product-editorial calls. The
`color-mix` *mechanism* and the table/chip *patterns* are the generalizable part.

## 2026-05-31 · Resolution: calm score encoding (filed as second feedback issue)

Product review judged the first cut too loud. Replaced both noisy mechanisms:

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 7 | extension | tool | score scale | Swapped the 5-color diverging scale for a **single-hue sequential** one: `color-mix(in srgb, var(--accent) {10,22,36,52,70}%, transparent)` keyed by score. The numeral carries the exact value; color encodes only magnitude. | yes | 3 |
| 8 | extension | tool | data-cell glyphs | Replaced emoji `✅/⚠️/❌` with **Artificer-toned glyphs**: `✓` (`--success`), muted `✗` (`--fg-disabled`, recedes), `~` (`--attention`), plain `–` for n/a. Emoji bypass the token system and can't be themed. | yes | 3 |

**Finding:** a heatmap and a status badge want *different* color tools. Artificer's
status tokens are categorical (good for "this one thing is urgent"); a score grid
wants sequential intensity of a single hue (magnitude, not category). And dense
data cells want a themeable glyph set, because emoji are the one thing on the page
the design system can't restrain.

## 2026-05-31 · Wordmark accent period detaches on flex `.appbar__brand`

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 9 | misfit | tool | `.wordmark::after { content: "." }` on a flex container | Moved `wordmark` off the `.appbar__brand` flex+gap container onto the inline text span (`<a class="appbar__brand"><span class="wordmark whimsy">`). On a flex/grid container the `::after` period becomes an item and the container `gap` detaches it ("word ." not "word."). | yes | 3 |

**Finding:** the documented `<a class="appbar__brand wordmark">` composition is
self-conflicting — `.appbar__brand` is `display:flex; gap`, and the wordmark's
accent period is a `::after`, so the gap inserts space before it. Structural fix
(push `.wordmark` to an inline child), not a margin hack. Filed upstream as
`cameronsjo/artificer-design-system#81`.

> **Absorbed in v0.18.0 (2026-06-11).** `.wordmark` is now `display:inline-block`
> (blockifies as a flex item, so `::after` stays an inline box), so it can sit
> directly on the flex `.appbar__brand` again. Reverted the workaround to the
> native `<a class="appbar__brand wordmark">`. See the 2026-06-11 section.

## 2026-05-31 · Whimsy has no graceful exit (celebrate snaps + persists)

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 10 | gap | tool | `Whimsy.celebrate()` / no dissolve API | Built a 3-stage exit by hand: ignite a `.tc-shimmer.whimsy` overlay stacked on silver `.tc-plain` base text, crossfade the shimmer's **opacity** out (~360ms) to reveal silver, then fade the whole caption over ~2.75s. `celebrate()` only ignites-then-`clear()`s, which **snaps** gradient→solid and leaves the resting state persisting. | yes | 3 |

**Finding:** `Whimsy` ignites beautifully but has no graceful *exit*. `celebrate(el, ms)`
holds then hard-`clear()`s — a one-frame snap from spectrum to the flat resting
color, which then just sits there. A celebratory micro-interaction wants a
**dissolve lifecycle**: hold → quick desaturate (gradient → resting) → slow
fade-out. Because a gradient (`background-clip:text`) can't be CSS-transitioned to
a solid color, the only clean handoff is an **opacity crossfade between two stacked
spans** (shimmer over plain) — which every consumer will have to reinvent. Candidate
for a `Whimsy.dissolve(el, { hold, desat, fade })` (or a `settle:'dissolve'` option
on `run`). **Method note:** we picked the timing by wiring a throwaway in-app A/B
toggle (two treatments, swap + replay) — whimsy treatments are tuned by *feel*, so a
preview/compare affordance is worth having. Filed upstream as
`cameronsjo/artificer-design-system#85`.

## 2026-05-31 · Known upstream bugs in vendored runtime (no in-tree patch)

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 11 | misfit | tool | vendored `artificer-icons.js`, `print.css` | Static review (CodeRabbit, PR #6) surfaced three latent bugs in the vendored web runtime: `classList.add(opts.className)` throws on multi-class strings; `hydrate()` permanently locks nodes so in-place `data-icon*` changes never re-render; `print.css` uses deprecated `page-break-*`. Left the vendored copies **untouched** to avoid diverging from source — filed upstream instead. | yes | 3 |

**Finding:** these aren't adaptations we made — they're pre-existing bugs in the
**vendored** files we copy verbatim from `cameronsjo/artificer-design-system`.
Policy: never patch the vendored copy in-tree (it would silently fork from source
and break the next re-vendor). Routed upstream as a single bug report,
`cameronsjo/artificer-design-system#90`. The stale `v0.6` header comment in
`artificer.css` (also flagged) was already tracked upstream in #77. **Re-sync
trigger:** when #90 lands, re-vendor `artificer-icons.js` + `print.css`.

> **Absorbed in v0.18.0 (2026-06-11).** All three #90 bugs are fixed in the
> vendored 0.18 copy — verify: `icons.js` splits multi-class `classList.add`
> (`…add(...opts.className.split(/\s+/)…)`) and clears the hydrate lock on
> mutation (re-renders on `data-icon*` change); `print.css` uses `.toast-region`
> + `break-inside` (not `.toast` / deprecated `page-break-*`). See the 2026-06-11
> section.

## 2026-05-31 · Honest footer — adopted a cross-consumer pattern Artificer doesn't own

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 12 | extension | tool | no footer / colophon primitive | Built a bespoke four-tier disclosure footer (provenance · attribution · bias · affiliation fine print) in a two-column grid, per `agentic-harnesses/docs/disclaimer-footer-pattern.md`. Artificer ships no footer primitive, so every consumer that depicts third-party things reinvents it. | yes | 3 |

**Finding:** any consumer that represents software it doesn't own needs an honest
footer (independence, attribution, bias disclosure, affiliation fine print), but
Artificer has no footer/colophon primitive — so the structure is hand-rolled and
the `.surface-tool *` mono-font rule fights the prose. Already tracked upstream as
`cameronsjo/artificer-design-system#97` (no new issue filed). The two structural
gotchas worth remembering: cap the measure on `.footer-grid p` (not `.app-footer p`,
which would pin the full-width fine print to one column), and the footer's own
`--font-sans` only wins because `styles.css` loads after the vendored `artificer.css`.

## 2026-06-11 · Upgrade 0.10.1 → 0.18.1 (re-true + primitive adoption)

Moved the vendored copy from `--art-version 0.10.1` to **0.18.1** and switched
vendoring to a pinned npm devDependency (`@cameronsjo/artificer`) + a files-only
copy script (`site/scripts/revendor-artificer.sh`, run pre{dev,build}). The
regenerable text files (`*.{css,js,json}`) are now **generated + gitignored**; the
lockfile is the single source of truth; the binary `assets/**` (fonts, favicon,
og-image) stay **tracked** and the script never touches them. (Pinned **0.18.1**;
the re-true landed in 0.18.0 and 0.18.1 is a patch that closes the reduced-motion
gap noted below. **0.12.0** was the first public release, 2026-06-03 — not the
first ever.)

The headline v0.18.0 change re-trues the type scale (`html { font-size: 100% }`),
so all token-bound text renders ~14.3% larger. Absorbed cleanly: the comparison
tables already sit in `overflow-x:auto` wrappers and use `rem`, and the SVG chart
labels are viewBox-scaled (user-space px, immune to the *root* re-true) so they
stay deliberately `/* tuned */` for chart density rather than token-bound.

**Reduced motion:** 0.18.1 gates the Whimsy shimmer under
`@media (prefers-reduced-motion: reduce)` (`animation: none` + a held static
burnish) — a gap this upgrade surfaced (the vendored CSS comment credits "a
consumer on the 0.10.1→0.18.0 upgrade"). Closed **upstream**, not worked around:
the app carries no reduced-motion guard and no adaptations entry — the gap closed
instead of forking.

### Absorbed upstream — local adaptations retired

| # | was | now |
|---|-----|-----|
| 9 | wordmark inline-`<span>` workaround (accent period detached on flex `.appbar__brand`, #81) | v0.18 `.wordmark` is `display:inline-block` → blockifies as a flex item, so `::after` stays inline. Reverted to native `<a class="appbar__brand wordmark">`. |
| 11 | left vendored `print.css` + `icons.js` unpatched pending #90/#154 | Both fixed in vendored 0.18: `print.css` uses `.toast-region` + `break-inside`; `icons.js` splits multi-class `classList.add` and clears the hydrate lock on mutation. Re-vendor done. |
| 2 | `--success-fill` missing → `color-mix` for score-5 cells | `--success-fill` now exists (`#2d6644` dark / `#2a5a3a` light, AA-rated). #7 (calm score) is unaffected — it keys off `--accent` color-mix by design, not the absent token. |

### New decisions — reported via /artificer-feedback

| # | type | pattern | what we did + why | upstream? |
|---|------|---------|-------------------|-----------|
| 13 | adoption | tabs | Scenario pickers → `.tabs` primitive + WAI-ARIA tablist. **React owns selection state + panel rendering**; only the roving-tabindex math is delegated to `window.ArtificerTabs.nextIndex(key, current, count, {orientation})`. Deliberately NOT `enhance()`/`observe()` — they toggle `aria-controls` panels via `hidden`, which fights React's conditional rendering (the #6 SPA tension). Filter/mode toggles (matrix tier, heatmap mode) stay `aria-pressed` pills — not every toggle is a tablist. | pattern |
| 14 | adoption | `.table` base | `.matrix-table`/`.heatmap-table` layer onto `.table .table--sticky-head`; the primitive supplies border-collapse/cell-border/row-hover/sticky-head, the app keeps the dense centered cells, sticky first column (`.th-tool` — a `<th scope="row">` the primitive's `:first-child` sticky-col wouldn't hit), and score/sort/heatmap CSS. **Trap:** the primitive's `.table th { text-transform:uppercase }` hits BOTH column AND row headers — it corrupted filenames ("AGENTS.md"→"AGENTS.MD") and tool names ("BMad Method"→"BMAD METHOD") until a `text-transform:none` reset on *all* `th`, not just `thead th`. | pattern |
| 15 | adoption | layer-the-primitive-under | Swept hand-rolls for 0.11–0.18 mints and layered the primitive under genuine matches: `.tier-badge`/`.lang-badge` → `.badge` (kept tier colors + smaller size); `.badge-cell` → `.stat` *container* (kept `.badge-label`/`.badge-value` — the values are text facts, not the big mono numeral `.stat__value` is built for). NOT forced where the match was only partial. | pattern |
| 16 | refactor | footer → views | Replaced the two-column "honest footer" (#12) with a **slim sign-off line** that links to dedicated **About** + **Disclosure** sidenav views (`About.tsx`, `Disclosure.tsx`, + `nav-routing.test.ts`). Ported from the parallel `de-vendor-artificerjs` branch (closed PR #11) — the disclosure reads as a deliberate page, not a wall of text down one edge. Still hand-rolled (Artificer ships no footer/colophon primitive — #12's point stands). | yes · upstream #324 |
| 17 | adoption | seasonal greeting | Wired the footer sign-off to Whimsy's `[data-whimsy-greeting]` primitive — the inline text is the off-season line, `happy pride` swaps in for June. Needs a `useEffect` calling `Whimsy.greeting()` after mount: `artificer-whimsy.js` exposes `observe()` but its auto-init calls only `hydrate(); greeting();`, so in a React SPA the DOMContentLoaded scan runs before the footer mounts, matches zero elements, and the swap silently never happens. Mirrors the existing `ArtificerIcons.observe()` call for the same underlying reason. | yes · upstream #325 |

**Still open / kept:** #7 (calm-score encoding — independent design choice);
#10 (Whimsy has no graceful exit, `#85` still open — re-confirmed the upgrade
doesn't change its premise); #12 (no footer/colophon primitive — now expressed as
the slim footer + About/Disclosure views, see #16, filed upstream as #324);
#4/#5 (app-shell + `.sidenav button` shim, unchanged).

**Provenance wrinkle (reported):** the package's `exports` map + SRI manifest
cover CSS/JS/`tokens.json`, but `files:["src"]` ships `src/assets/**` (fonts,
favicon, og-image) too — vendor-able yet outside the integrity contract.

## 2026-08-02 · Upgrade 0.18.1 → 0.21.0

npm sat pinned at 0.18.1 since June — 0.19.0 and 0.20.0 were never published to
npm, so this was a real jump (99 lines changed in `artificer.css`, 163 in
`artificer-whimsy.js`, 40 in `artificer-editorial.css`, 11 in `tokens.json`,
plus a new `src/primitives.json`). Bumped the devDependency pin, ran
`npm install`, and re-ran `scripts/revendor-artificer.sh` — vendored
`artificer.css` now stamps `--art-version: "0.21.0"`.

0.21.0 ships several new source files this site doesn't consume:
`artificer-editorial.css`, `artificer-options.js`, `artificer-texture.css`,
`artificer-tree.js`, `primitives.json`, `theme-bootstrap.html`. None are
referenced anywhere in `site/` and the revendor script's `FILES` list
intentionally doesn't pull them — no action needed unless a future feature
wants one of them.

`Whimsy.greeting()` (the API #17's mount-effect workaround calls) is present
and unchanged in the vendored 0.21.0 `artificer-whimsy.js` — the React SPA
mount-effect workaround (#17, upstream #325) still applies verbatim; #325
remains open upstream.

Build (`npm run build`), typecheck, and the vitest suite (39/39) all pass
clean post-upgrade with no code changes required beyond the version bump.
`npx @cameronsjo/artificer lint` was run for the first time against this
repo's `site/src/styles.css`: 9 pre-existing raw-value violations (hardcoded
`4px`/`8px` instead of `var(--s-xs)`/`var(--s-sm)`), all unrelated to this
upgrade. Left as-is — out of scope here, worth a follow-up cleanup pass.

## 2026-08-02 · Upgrade 0.21.0 → 0.22.0 (colophon spine adoption, #12/#324 retired)

Bumped the devDependency pin to **0.22.0**, which mints `.colophon` /
`.colophon__spine` (#97/#324) — the footer/colophon primitive this project
had been flagging as a gap since #12. Retired the slim hand-rolled footer
(`.app-footer`, `.footer-line`, `.footer-sep`, `.footer-link`,
`.footer-greeting`) for the three-zone shape:

```jsx
<footer className="colophon">
  <div className="container">
    <div className="colophon__spine">
      <b className="anchor">Independent &amp; unofficial</b>
      <span data-whimsy-greeting="" data-whimsy-greeting-class="whimsy--glacial">
        kindness is a choice.
      </span>
      <nav className="cluster">
        <button type="button" onClick={() => selectNav('about')}>About</button>
        <button type="button" onClick={() => selectNav('disclosure')}>Disclosure</button>
      </nav>
    </div>
  </div>
</footer>
```

Zone 1 (label grid) and zone 3 (`.colophon__fine`) are both unused — this
site deliberately moved its disclosure prose into the `Disclosure` view (see
the 2026-06-11 entry, #16), so the footer stays spine-only. `.footer-fine`
itself is **kept**, unrelated to the colophon: `Disclosure.tsx` still uses it
for the affiliation fine print inside that view.

The sign-off text gained a trailing period (`kindness is a choice.`) to match
the fleet standardization on the punctuated form — this site's inline
fallback previously had none.

**Misfit, not filed upstream:** the spine's About/Disclosure links stay
`<button>` (SPA view switches, not navigations — same reasoning as #5's
`.sidenav button` shim), but the primitive's 44×44 touch floor is scoped to
`.colophon__spine a` only (deliberately, per the CSS comment: any positional
content is conforming, but the floor is only guaranteed for anchors). Per
the fleet consistency mandate, no footer CSS was hand-rolled to restyle or
re-floor the buttons — they render as bare native `<button>`s pending visual
review. Worth a follow-up feedback issue if the fleet settles on buttons
being a common pattern here (mirrors the `.sidenav button` shim's origin).

Build (`npm run build`), typecheck, and the vitest suite (39/39) all pass
clean. Verified in the built `dist/assets/*.js`: `colophon` and
`colophon__spine` both present, `data-whimsy-greeting` +
`data-whimsy-greeting-class` survive minification, and the sign-off text
carries the period.

## 2026-08-18 · Mobile fixes: two retirements, four pre-release shims

### Retired

| # | was | now |
|---|-----|-----|
| 5 | `.sidenav button` shim replicating the `.sidenav a` link grammar (resting/hover/focus/active rail) | Diffed against the vendored Artificer 0.22.1 CSS — every declaration (flex layout, button reset, hover, focus-visible, `aria-current`) is shipped natively (since 0.18.1). Removed the fully-redundant block. |
| 6 | React `ThemeToggle` re-implementing the toggle because `artificer-theme.js` bound before the SPA mounted | **Resolved as of Artificer 0.19.0.** The vendored `artificer-theme.js` now auto-observes SPA mounts (arms a `MutationObserver` on `document.body` at load) and binds any `[data-theme-toggle]` button. Adopted the canonical empty `<button class="theme-toggle theme-toggle--inline" data-theme-toggle aria-label="Toggle theme" />`, deleting the hand-rolled component's state/localStorage write. |

### New shims (mirror unreleased upstream fixes — absent from Artificer 0.22.1 on npm)

Read against `artificer.css` in the design system's own working tree, which
is ahead of what's published; each shim is removable once the matching fix
ships in a released version **after 0.22.1**.

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 18 | misfit | tool | `.nav-drawer` bottom safe-area inset | Published 0.22.1 puts `padding-bottom: env(safe-area-inset-bottom)` on `.nav-drawer` itself, outside the 100%-tall inner `.sidenav` — can collapse at scroll-end. Overrode it into the scroll content (`.nav-drawer { padding-bottom: 0 }` + `.nav-drawer > .sidenav { min-height: 100%; height: auto; padding-bottom: calc(...) }`), matching the design system's own working-tree fix. Remove once a release ships it. | **RETIRED 2026-08-19 @ 0.23.0** | 3 |
| 19 | gap | tool | `.appbar__brand` overflow | No ellipsis carrier exists on `.appbar__brand.wordmark` in 0.22.1 — a long brand can spill past the viewport on narrow screens instead of truncating. Added the block-level ellipsis carrier + coarse-pointer 44px re-floor, matching the design system's own working-tree fix. Remove once a release ships it. | **RETIRED 2026-08-19 @ 0.23.0** | 3 |
| 20 | misfit | tool | `.sidenav a:hover, .sidenav button:hover` | Unguarded in 0.22.1 — a touch tap latches the hover highlight until the next tap lands elsewhere. Added an `@media (hover: none)` reset. Not yet confirmed fixed upstream; worth filing if the design system's `@media (hover: hover)` guard (seen on `.sidenav__section > summary`) hasn't already been extended to the row hover. | **RETIRED 2026-08-19 @ 0.23.0** | 3 |
| 21 | gap | tool | `.sidenav__section` / `.sidenav__footer` | Neither primitive exists in 0.22.1 on npm. Mirrored the design system's own working-tree CSS verbatim to ship collapsible nav groups (#15) and the theme toggle's drawer seat (#17). Remove once a release ships both. | **RETIRED 2026-08-19 @ 0.23.0** | 3 |

**Don't re-derive:** all four rows above were confirmed against the actual
installed `node_modules/@cameronsjo/artificer/src/artificer.css` at 0.22.1
(not just the design system's working-tree reference) before shimming —
none of the four selectors exist in the published package. Re-check the
same way before removing a shim on the next upgrade: `grep` the vendored
file for the selector, don't assume the CHANGELOG entry landed the CSS too.

Build (`npm run build`), typecheck, and the vitest suite (39/39) all pass clean.

## 2026-08-19 · On-device check: two shim corrections, one new shim

A real-device pass over the 2026-08-18 mobile fixes above surfaced four bugs.

| # | type | surface | token / rule / pattern | what we did + why | upstream? | lane |
|---|------|---------|------------------------|-------------------|-----------|------|
| 22 | correction | tool | `.app` safe-area padding (row 19 above, restated) | The safe-area shim from 2026-08-18 (`.app { padding-left/right: env(safe-area-inset-left/right) }`) OVERRODE the vendored `.container { padding-inline: var(--s-lg) }` at equal specificity (this file loads after `artificer.css`) — and portrait insets are `0`, so all content butted the viewport edges outside landscape-on-a-notch. Fixed to `max(var(--s-lg), env(safe-area-inset-left))` (and `-right`): keeps the container gutter as the floor, only grows past it where a notch needs the room. | n/a — app-specific composition bug, not an upstream gap | 3 |
| 23 | correction | tool | `.appbar__brand.wordmark, .appbar__brand > .wordmark` `align-content` | The 2026-08-19 review round dropped `align-content: center` from this carrier as dead weight ("inert outside flex/grid"). It wasn't: `align-content` applies to any block container as of Safari 17.4 / Chrome 123, and this carrier is `display: block`. Restored it with a comment — without it the mark top-aligns inside its coarse-pointer 44px box and sits visibly high of the hamburger. | **RETIRED 2026-08-19 @ 0.23.0** (folded into row 19) | 3 |
| 24 | gap | tool | `.sidenav button { width: 100%; background: none; border: 0; font: inherit }` vs. the drawer's theme toggle | The theme toggle in `.sidenav__footer` (added 2026-08-18, #17) sits inside `<nav class="sidenav">`, so the vendored `.sidenav button` grammar strips its pill chrome and stretches it full-width — a giant borderless button instead of the compact pill. Added `.sidenav__footer .theme-toggle { width: auto; flex: none; background/border/padding/font restored }`. Remove once upstream scopes `.sidenav button` away from `.theme-toggle` (or ships its own footer-toggle exemption). Retirement tracking: cameronsjo/spec-compare#27. | **RETIRED 2026-08-19 @ 0.23.0** | 3 |

A fourth bug (`.compare-dot` pager pip inflating to 44px under the vendored
`@media (pointer: coarse) { button { min-height/min-width: 44px } }` floor —
same class of bug as `agentic-harnesses#22`) is **app-specific, not a shim**:
`.compare-dot` is entirely this app's own control, not an upstream primitive
composition, so there's nothing to retire later. Fixed by floor-matching
`min-width`/`min-height` to the visual `8px` dot size (the existing
`::before { inset: -18px }` hit area still gives a ≥44px tap target without
growing the dot itself).

Build (`npm run build`) and the vitest suite pass clean; no test-count change
(no test-covered logic changed — CSS-only + one dropped-comment restoration).

## 2026-08-19 · Upgrade 0.22.1 → 0.23.0 — retirement issue #27 closed

`@cameronsjo/artificer` bumped to **0.23.0**, which ships every rule the
five pre-release shims above were mirroring. Verify-then-delete: each row's
selector was `grep`ped against the actually-installed
`node_modules/@cameronsjo/artificer/src/artificer.css` at 0.23.0 (not just
the CHANGELOG) and read side-by-side with the local shim before removing
it, per the retirement issue's own instruction.

| # | was (row) | verified at 0.23.0 | disposition |
|---|-----------|---------------------|--------------|
| 18 | Drawer safe-area relocation (`.nav-drawer { padding-bottom: 0 }` + `.nav-drawer > .sidenav { ... }`) | `.nav-drawer` itself no longer carries `padding-bottom` — only `padding-top: env(safe-area-inset-top)`. `.nav-drawer > .sidenav` now carries `min-height: 100%` (structural) **and** `padding-bottom: calc(var(--s-md) + env(safe-area-inset-bottom, 0px))` (safe-area) natively. | **Retired.** Local override deleted. |
| 19 | Brand ellipsis carriers (`.appbar__brand.wordmark, .appbar__brand > .wordmark` block + coarse-pointer re-floor) | `.appbar__brand` base rule now carries `flex: 1 1 auto; min-width: 0; overflow: hidden; white-space: nowrap` directly (previously only on our local shim). The carrier block, including `align-content: center`, and the coarse-pointer `min-width: 44px` re-floor are both present verbatim. | **Retired.** Local override deleted in full. |
| 20 | Stuck-hover reset (`@media (hover: none) { .sidenav a:hover, .sidenav button:hover { ... } } }`) | `.sidenav a:hover, .sidenav button:hover` is now gated inside `@media (hover: hover)` — exactly the guard row 20 speculated might land. A touch device (`hover: none`) never matches that block, so there's nothing left to reset. | **Retired.** Local reset deleted. |
| 21 | `.sidenav__section` / `.sidenav__footer` (full mirrored block) | Both primitives ship verbatim, byte-identical to the local mirror (down to the `@media (hover: hover)` summary-hover guard and the divider rule). | **Retired.** Local mirror deleted; consumed directly from `artificer.css` now. |
| 24 | Drawer theme-toggle pill restoration (`.sidenav__footer .theme-toggle { ... }`) | Present verbatim in `artificer.css` at the same selector, same declarations, with upstream's own comment explaining the `.sidenav button` collision. | **Retired.** Local override deleted. |
| 22 | `.app` safe-area padding `max(var(--s-lg), env(...))` | No `.app`-equivalent exists upstream — this composes the vendored `.container` gutter with this app's own root padding. Not a shim against an absent/unreleased upstream rule. | **Kept.** App-specific, not upstream's to ship. |
| 23 | `align-content: center` restoration + its "don't clean this" comment | Folded into row 19's retirement — the whole carrier block (including this line) is now consumed from `artificer.css` directly. | **Retired alongside #19.** |

Also kept, per the retirement issue's own scope note (never shims — always
app-specific): the `.compare-dot` `min-width`/`min-height` floors, the
`viewport-fit=cover` meta tag, the `≤800px` topbar-toggle-hide rule, and the
React `useSectionOpen` open/touched state machine (`sidenav-sections.ts`).

`docs.artificer-adaptations.md` net effect: five shims down to zero: the
`site/src/styles.css` app-composition surface is now flat vendored-plus-
app-specific-only, with no unreleased-upstream-fix shims outstanding.
Retirement issue: cameronsjo/spec-compare#27, closed by this branch's PR.

Build (`npm run build`) and the vitest suite (46/46) pass clean; no
test-count change (CSS deletions only, no App.tsx/behavior change).

## 2026-08-19 · Adopted the compiled React chrome components (0.24.1, #4 retired)

Bumped to **0.24.1** (0.24.0 published without `dist/react` — a global-gitignore
hole at the export's `git add` on the design system's publishing machine,
caught by a sibling consumer, fixed in `artificer-design-system#405`; confirmed
0.24.1's tarball actually contains `dist/` before pinning it) and adopted
`@cameronsjo/artificer/react`'s compiled chrome adapter: `Appbar`, `NavDrawer`,
`SideNav`, `SideNavFooter`, `ThemeToggle`, `AppShell`, `AppShellContent`. This
retires **row 4** (the hand-copied app-shell, "near-verbatim from
agentic-harnesses") — the last of the original app-shell adaptation entries;
row 5 (`.sidenav button` shim) and row 6 (React `ThemeToggle`) were already
retired earlier (2026-08-18/19).

### What closed

`App.tsx`: 330 → 224 lines (-105 net). Deleted: the hand-rolled `<header
class="appbar">` + hamburger button, the `.nav-scrim` + `<aside
class="nav-drawer">` + the inert/focus-trap `useEffect`, the `ToolNav`
component (collapsed to building `SideNavGroup[]` data), and
`site/src/sidenav-sections.ts` + its 7-test file (the open/touched state
machine now ships compiled inside `SideNav`, driving both the desktop rail
and the drawer's collapsible sections). Also deleted the hand-copied
`focus.d.ts`/`icons.d.ts`/`tabs.d.ts`/`whimsy.d.ts` — one
`src/artificer-modules.d.ts` with type-only side-effect imports
(`import type {} from '@cameronsjo/artificer/theme.js'`, etc.) now pulls in
the shipped ambient `Window.*` declarations without bundling a second copy of
the vanilla modules; the runtime is still the vendored `<script defer>` tags
(`revendor-artificer.sh`'s `FILES` list is unchanged — the React adapter is a
real ESM import Vite bundles from `node_modules`, never a vendored script).

**Structural note, not a shim:** the vendored `.app-shell` is designed as a
whole-page shell (`min-height: 100dvh`, with `.app-shell > .appbar` claiming
its own grid row) — this app keeps `.appbar` and the `.intro` band *outside*
the shell, as it always has, so nothing claims that row. Added a scoped
`.app-shell { min-height: auto }` override in `styles.css`; without it the
unclaimed `100dvh` floor opened a large blank gap before the footer. This is
a composition choice (this app's page layout doesn't match the component's
full-page assumption), not a shim against a missing/broken upstream rule —
no retirement tracking needed.

**Whimsy ref, not a shim:** `Appbar` is a plain function component (no
`forwardRef`), so there's no ref prop onto its rendered `.wordmark` span.
The persistent wordmark shimmer now finds its target via a `querySelector`
scoped to the app root on mount, instead of a direct React ref.

### What's still app-specific (kept, not shims)

None of these mirror an absent or unreleased upstream primitive — they're
this app's own compositions and have no upstream rule to retire against:

- `.compare-dot` `min-width`/`min-height` floors (the pager pip)
- The `.app` safe-area `max(var(--s-lg), env(...))` gutter-clobber fix
- `viewport-fit=cover` (`index.html`)
- The `≤800px` topbar-toggle-hide rule (`Appbar` always renders `actions`
  unconditionally; hiding it on mobile in favor of the drawer's
  `SideNavFooter` seat is this app's own routing choice)
- The new `.app-shell { min-height: auto }` override above

Build (`npm run build`) and the vitest suite pass clean: 39/39 (down from
46 — the 7 `sidenav-sections.ts` tests moved upstream with the file they
tested; no other coverage lost).
