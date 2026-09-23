---
updated: "2026-09-22"
branch: "main"
body_sha256: "60b54c5197cd116810d68814fcd19652ae8540380811d6237446766d71d8cebc"
session_id: "cd65ccb1-fa17-40c8-b3a9-cd51754f420a"
model: "claude-opus-5-5"
harness: "claude-code 2.1.280"
machine: "cf6e768835c7"
approved_session_id: "44bce271-2ee4-473e-a468-2db10eb4be76"
status: in-progress
tier: T1
next: Cameron sets #54 scores and approves #53 merge; then close #50 (Step A5)
---

# spec-compare intake: SpecBuddy (PR #50) and mattpocock/skills (issue #51)

## Context

Two external asks are open. [PR #50](https://github.com/cameronsjo/spec-compare/pull/50) is an author-submitted SpecBuddy watch entry. [Issue #51](https://github.com/cameronsjo/spec-compare/issues/51) is a user (Eric Kemmer) asking to add Matt Pocock's skills. The bar comes from the private intake runbook (`~/Documents/The Compendium/Wiki/Technical/spec-compare-external-tool-submissions.md`) and the archiet (#12) and reqlan (#46) field reports.

**Verdicts (Cameron, this session):**
- SpecBuddy passes the bar for a watch entry: early, distinct niche (per-step IDE-gated execution with rollback; Traycer is per-phase). Land it on an owned branch with the author's commit preserved, then close #50 with thanks.
- mattpocock/skills clears adoption easily (~268k★, MIT, pushed 2026-09-18, official Claude Code marketplace). It becomes an **emerging** profile. Core waits for a hands-on eval (same path as #21).

**Live verification of PR #50 (2026-09-22)**:

| Claim (2026-09-08) | Live today |
|---|---|
| JetBrains v0.11.0, 323 downloads, 4 reviews | v0.13.0, 448 downloads, rating `null` via API |
| VS Code 3 installs | v0.9.9, 16 installs, 125 downloads, 2 ratings |
| Open VSX v0.9.8, 812 downloads | API: `Extension not found` (search finds nothing either) |
| Closed source, org repos docs/skill only | Confirmed; org also has `sddobservatory.com` repo |

## Alternatives declined

- Ask the SpecBuddy author to fix the numbers: slower, and they explicitly invited a rewrite.
- Close SpecBuddy with no entry: the runbook's bar sends distinct-niche early tools to the watch list, and failed claims get documented, not disqualifying (archiet precedent).
- Pocock as core or gaps-only: core needs hands-on use; gaps-only undersells a 268k★ tool.

## Panel

Panel: none — T1 docs/data-only triage (one gaps entry, one emerging JSON profile); no security-critical control touched

## Steps

### A — SpecBuddy watch entry (own PR)

1. `git worktree add ../spec-compare-specbuddy -b docs/specbuddy-watch origin/main`; `git fetch origin pull/50/head` and cherry-pick `8e2c9d2` (author stays Alexander Shustanov).
2. Fix commit on `docs/gaps.md` + `CHANGELOG.md`: re-verify all numbers right before editing (JetBrains API, VS Code gallery query, Open VSX API); update versions and counts to the check date; replace the "4 reviews" claim with what the APIs show; record that the Open VSX listing no longer resolves (was 812 downloads on 2026-09-08); add the VS Code Marketplace link; tighten the assessment paragraph into house voice; return trigger = adoption.
3. Run the repo's lint/build (`site/`: `npm ci && npm run build`) to confirm nothing breaks.
4. Push, open PR (credits #50), redaction-scan the body. Merge after Cameron's go.
5. Close #50 with a #12-shaped note: thanks for the disclosure and shape, what re-verification found (drift, Open VSX), where it landed, and the return trigger.

### B — mattpocock/skills emerging profile (own PR, `Closes #51`)

1. Worktree `../spec-compare-pocock`, branch `feat/mattpocock-skills-profile` from `origin/main`.
2. Read `schema.json` and one existing emerging profile; write `site/src/data/tools/mattpocock-skills.json`. Every fact traces to the repo: version (CHANGELOG/package.json), license, agent support (Claude Code plugin; `npx skills` for Codex and others), phases mapped from `grill-with-docs` → `to-spec` → `to-tickets` → `implement`/`tdd`, and `wayfinder` for multi-session work. Philosophy: composable, and explicitly anti-framework against GSD/BMAD/Spec-Kit.
3. Scores are **draft proposals**, listed in the PR body for Cameron to set. PR stays draft until he does (runbook policy 3).
4. Add a `docs/gaps.md` "New SDD Frameworks" entry, following the Kilo Code/Conductor pattern, plus a CHANGELOG `[Unreleased]` line.
5. `npm run gen:tables`, then `npm ci && npm run build` (validate, gen:check, tsc, vite).
6. Push, draft PR; reply on #51 to Eric with the PR link.

### C — Housekeeping

1. Fix the stale runbook path in `spec-compare/CLAUDE.local.md` (`Runbooks/` → `Wiki/Technical/`).
2. Update the runbook: add SpecBuddy as the third precedent. Add a closed-source clause (watch entry allowed; claims trace to listings and are labeled as such). Add a drift note: marketplace numbers move within days, so re-verify at merge time, not review time. Add the return trigger.

## Verification

- A: `npm run build` exit 0; API re-check output matches the numbers in the entry; `gh pr view 50 --json state` = `CLOSED`.
- B: `npm run build` exit 0 (includes ajv schema validation and `gen:check`); the new row renders in the local `vite` preview heatmap.
- C: `CLAUDE.local.md` path resolves (`test -f`).

## Deviations

- A1: cherry-pick of `8e2c9d2` conflicted on `CHANGELOG.md` because the Memex review (#26) landed on main after planning; kept both `[Unreleased]` lines, author preserved.
- A2: the JetBrains comments API shows 8 written reviews (four posted 2026-09-08–09), not the planned "rating null" wording; the entry states the review count and that no aggregate rating is published.
- B2: emerging profiles carry no `phases`/`edges` in this repo (only core tools do), so the grill → spec → tickets → implement flow is in `keyFeatures`, not a phase graph.
- B4: consistency required more files than planned: `README.md` roster and counts, the `docs/use-case-scoring.md` heatmap row, `docs/sources.md`, and the `data.test.ts` count invariant (19 → 20).
- C1: the worktree guard blocks edits in the primary checkout; `CLAUDE.local.md` is untracked and gitignored, so it was edited under a 10-minute logged dismiss.

## Learnings
