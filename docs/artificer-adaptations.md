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
| 4 | extension | tool | app shell | `.app-shell` + `.app-sidenav` + `.nav-drawer` + `.sidenav button` shim + React `ThemeToggle` + inert/focus-trap drawer — copied **near-verbatim from agentic-harnesses**. SPA nav + mobile drawer. | yes | 3 |
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
