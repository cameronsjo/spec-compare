---
approved_in: claude-code
approved_session_id: 87ad1782-691b-4b2b-8117-a57fcd8dfa83
date: 2026-08-28
branch: chore/deps-2026-08
status: executing
---

# spec-compare: issue burn-down + August refresh cycle + wing dependabot sweep

## Context

spec-compare has 5 open issues and a stale toolscape: the July sweep flagged Kiro/Spec-Kit/Superpowers drift ([spec-compare#22](https://github.com/cameronsjo/spec-compare/issues/22)), and the drift has widened since. The site carries 7 open dependabot alerts (all transitive: `vite` → `esbuild`/`postcss`, `ajv` → `fast-uri`) plus dependabot PR #19, and four sibling wing repos each have one open dependabot PR. Goal: land an August reassessment cycle, fix the fixable issues, clear the deps debt wing-wide.

Version numbers quoted in this plan (Spec-Kit `v1.0.1`, Superpowers `v6.3.0`, MoAI-ADK `v3.1.2`) are **drift-sizing context from 2026-08-28 planning reads, not targets** — the execution-time double-source reading is authoritative, and a newer number at execution is expected, not a deviation.

## Scope rulings (Cameron, this session)

- Dependabot: **whole wing** (5 PRs + spec-compare's alerts).
- [#21](https://github.com/cameronsjo/spec-compare/issues/21) MoAI-ADK hands-on eval: **deferred** — the sweep only notes the current version.
- [#35](https://github.com/cameronsjo/spec-compare/issues/35) retire Artificer shims: **blocked** — npm `@cameronsjo/artificer` still at `0.24.2`; no action.
- [#26](https://github.com/cameronsjo/spec-compare/pull/26) Memex PR: out of scope; surfaced in the report.

## Key facts from exploration

- **Refresh recipe** is precedented: `docs/plans/2026-07-23-july-2026-sdd-sweep.md` + `docs/reassessment-2026-07-23.md` § Method. Versions resolve under the **double-source rule** (`releases/latest` + `/tags`, take newer). **Kiro's version comes from kiro.dev/changelog, never its GitHub repo** (docs mirror, zero tags). Of 18 tracked tools, **13 are sourceable; 5 are legitimately unversioned/rolling** (Conductor, Tessl, Traycer, Zencoder, Ralph Loop) and get recorded as `-` in the drift table, not treated as failed lookups.
- **Test gate**: `npm run build` chains `validate && gen:check && tsc && vite build` but **never runs tests**; the vitest suite (`nav-routing.test.ts`, `data.test.ts`, `heatmap-geometry.test.ts`, `score.test.ts`, `decision-tree.test.ts`, `gen-doc-tables.test.ts`) runs only via local `npm test`, and no repo in the wing has PR CI. **`npm test` is a mandatory gate on every spec-compare branch in this plan.** `data.test.ts` holds the tool-count invariant (B); `nav-routing.test.ts` is C's regression surface.
- **#16 nav bug**: drawer is Artificer's `NavDrawer`; active state is pure React state (`App.tsx:41`, `nav === o.id` at `App.tsx:57-78`) — no router, no scroll detection, so the reported anomaly is unexplained by derivation logic and needs live repro. Safe-area rule exists in the vendored `site/public/artificer/artificer.css:1883-1884` — but that file is **gitignored and rewritten by `prebuild`**, `node_modules` is stale at artificer `0.22.1`, and the vendored copy self-reports `--art-version: 0.23.0`: the current vendored content is *not* reproducible from the current install, and nothing yet proves `0.24.2` retains the rule.
- **#34 hook audit** (scoped, this Mac): `.git/hooks` empty, no local `core.hooksPath`, global hooks (`~/.config/git/hooks`) are `commit-msg` + `pre-commit` only, both read-only advisory; no `prepare-commit-msg` on any hook path, no `.husky`, no project Claude hooks. Hostname digest matches the filing session (`cf6e768835c7`) — a hostname match, not a box-identity proof. Still to check at execution: `init.templatedir`, `commit.template`, and the user-level `warn-commit-provenance` Claude hook (documented as nudge-only; confirm it never writes the message).
- **Repo mode**: no `CADENCE_ALLOW_MAIN`; branch + PR per change, as the July sweep did. **Every wing repo deploys on push to `main`** with no PR checks — the local gate is the entire gate; rollback is `git revert` + push.

## Workstreams

### A. Wing dependabot sweep

**A1 — spec-compare deps branch** (branch `chore/deps-2026-08`):
1. `cd site && npm install` first — syncs stale `node_modules` (`0.22.1` → `0.24.2`) and defuses the revendor-regression trap before any build runs.
2. All 7 alerts are transitive, so the levers are the parents: bump `vite` and `ajv` (devDeps) to versions whose transitive graph clears the alerts. `npm audit fix` without `--force` may no-op; **`--force` is not authorized** — if parent bumps can't clear an alert, use a targeted `overrides` block in `site/package.json` and note it in the PR body.
3. Gates: `npm test && npm run build` (build chains validate + gen:check + tsc). PR, merge.
4. #19 acceptance criterion: **PR #19 reaches `CLOSED`** — dependabot normally auto-closes when the lockfile no longer has the vulnerable path; if it's still open after the A1 merge, close it manually with a superseded-by comment.
5. Post-merge: `gh api "repos/cameronsjo/spec-compare/dependabot/alerts?state=open"` with an explicit non-2xx/shape check (`jq 'if type == "array" then length else "NOT_AN_ARRAY" end'`) — expect `0` or name the residue.

**A2 — other four repos** (parallel with B, each independently): [agentic-harnesses#13](https://github.com/cameronsjo/agentic-harnesses/pull/13) (esbuild removal in `/site`), [blog#6](https://github.com/cameronsjo/blog/pull/6) (astro 6.4.8), [cameronsjo.github.io#8](https://github.com/cameronsjo/cameronsjo.github.io/pull/8) (astro 6.4.6), [understanding-claude-code#1](https://github.com/cameronsjo/understanding-claude-code/pull/1) (vitest 3→4, major — run the suite). Per repo: `gh pr checkout`, **merge current `main` into the PR ref locally**, install, build (+ tests where a suite exists), then `gh pr merge --squash`. Merge deploys immediately; a broken deploy rolls back by revert.

### B. August refresh cycle (closes #22)

Branch `update/2026-08-sweep`, **cut from `main` after A1 merges** (so its gates run against the fixed lockfile).

1. **Version sweep**: 13 sourceable tools under the double-source rule (fan out to researcher subagents); Kiro from kiro.dev/changelog (WebFetch/browser); 5 unversioned tools re-confirmed as still rolling/unversioned. Produce the Part-A drift table.
2. **Deep pass on Kiro, Spec-Kit, Superpowers** (release-notes reading): check whether each tool's tracked `phases`/`scenarios` still describe its workflow. **Ruling for shape drift**: this is a desk-research pass — edit `phases`/`edges`/`scenarios` only where release notes explicitly rename or restructure the workflow; anything that would require hands-on re-scoring gets recorded in the reassessment doc and filed as an issue (the #21 pattern), never guessed. Scores stay unchanged this pass unless a documented workflow removal invalidates one.
3. **Artifacts**: tool JSON version bumps (incl. MoAI-ADK, noting #21 still owed); `site/src/types.ts` `ASSESSED_AS_OF = '2026-08-28'`; new `docs/reassessment-2026-08-28.md` (Parts A–D per precedent); `docs/gaps.md`, affected `docs/tools/*.md`, `docs/sources.md`, `docs/landscape.md` framing; `README.md` "Last Updated" (tool counts unchanged — 18 tools, 8 core, no adds/removes this pass); `CHANGELOG.md`; `npm run gen:tables` for `docs/comparison.md`.
4. Gates: `npm test && npm run build` from `site/`. PR with `Closes #22`, merge.
5. Post-merge (owner: this session): watch the Pages deploy run, then confirm `ASSESSED_AS_OF` renders on the live site. Deploy is path-filtered to `site/**` — the B PR touches `site/`, so a deploy will fire; if the check fails, read the deploy run before touching code.

### C. Issue #16 — mobile nav drawer (after A1)

1. Reproduce at ~440px (`npm run dev` + browser tools): confirm/deny the "Disclosure" phantom-active highlight. Candidates: `:focus`/`:focus-visible` or last-child styling in Artificer's `sidenav`, since state derivation is provably correct.
2. **If reproduced**: fix app-side in `site/src/styles.css` if app-caused; if design-system-caused, patch/file upstream (repo per `node_modules/@cameronsjo/artificer/package.json` `repository` field — verify at execution; plan-time read says `cameronsjo/artificer`) and add a local shim in `site/src/styles.css` plus a dated row in the ledger `docs/artificer-adaptations.md` referencing #35 so the retire pass finds it. (The "ARTIFICER SHIMS" fenced block #35 describes does not exist in the tree yet — the styles.css + ledger pair is the real surface.)
3. **If not reproduced**: comment findings on #16 (state derivation audit + repro attempt), fix only the safe-area half, and leave the active-state half open — no `Closes #16` in that case.
4. Safe-area: after A1's install, run the revendor (`prebuild`) and **diff the regenerated `site/public/artificer/artificer.css` for the `.nav-drawer > .sidenav` safe-area rule**. If `0.24.2` dropped it, re-add as a styles.css shim + ledger row + upstream issue.
5. Gates: `npm test && npm run build`; viewport check at 390/440/1280px on `npm run preview`. PR (`Closes #16` only on the full fix).

### D. Issue #34 — close with audit findings (anytime)

Complete the audit (three residual checks: `git config --get init.templatedir`, `git config --get commit.template`, read `warn-commit-provenance` to confirm nudge-only), then close #34 with a comment stating **exactly what was searched and found** — empty repo hooks, no `prepare-commit-msg` on any active hook path, advisory-only global hooks, no project Claude hooks, hostname-digest match with the filing session — and the bounded conclusion: no mechanism found on this host today that rewrites commit messages; the 2026-08-19 observation is unreproducible against current state. No machine-wide negatives beyond the enumerated search.

## Order

1. A1 (spec-compare deps) → merge.
2. B branches from post-A1 `main`; research fan-out starts immediately after A1.
3. C after A1 (needs the synced install); can interleave with B (different files; both branch from post-A1 main — whichever merges second rebases-by-merge on the other).
4. A2 and D run anytime, independent of the above.

## Verification

- spec-compare, every branch: `npm test && npm run build` from `site/` (build = validate + gen:check + tsc + vite build).
- A2 repos: local install + build (+ test suite where present) on the PR ref merged with current main, before `gh pr merge`.
- Deps: `gh api "…/dependabot/alerts?state=open"` with shape/non-2xx guard → 0 or named residue; PR #19 state `CLOSED`.
- B: Pages deploy green, `ASSESSED_AS_OF` = 2026-08-28 on the live site.
- C: viewport checks at 390/440/1280px; `nav-routing.test.ts` green; safe-area rule present in the regenerated vendored CSS.

## Panel

Panel: cadence:plan-reviewer ran — 15 findings, 15 folded in, 0 declined

### Alternatives declined

- Merging dependabot PRs blind (no local build) — declined: no wing repo runs PR CI, so the local gate is the only gate.
- Running the MoAI-ADK hands-on eval this session — declined by Cameron (deferred; half-day of its own).
- Single mega-PR for refresh + deps + bugfix — declined: independent concerns, separate review/rollback surfaces.

### Panel review findings declined

none declined — all findings folded in (unexecutable esbuild step replaced with parent-dep bumps, `npm test` gate added everywhere, shim surface corrected to styles.css + adaptations ledger, revendor regression given a remediation branch, #34 claim bounded to the enumerated search, not-reproduced branch added to C, shape-drift ruling added to B, sweep split 13 sourceable / 5 unversioned, ordering and #19 acceptance disambiguated, alerts query state-scoped, post-merge site check given an owner).

## Provenance

Producer tuple per commit (Session-Name/Session-Id/Model/Harness/Machine trailers) on all owned-repo commits; tuple block in PR bodies (squash-merge repos).
