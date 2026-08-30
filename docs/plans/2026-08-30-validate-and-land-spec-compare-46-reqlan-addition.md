---
status: "in-flight"
updated: "2026-08-30"
branch: "main"
body_sha256: "835ec1018a632e55ec91a88796b675510088b630b3aa4e2b0ef9c08bd39cc0b4"
session: "ember-quill"
session_id: "48b92362-9c78-45c2-ae38-1b5de4939d1a"
model: "claude-fable-5"
harness: "claude-code 2.1.251"
machine: "cf6e768835c7"
approved_in: "marble-anvil"
approved_session_id: "6672ceaa-4ae4-4eae-a6cc-8c6690c3cd52"
---

# Validate and land spec-compare#46 — reqlan addition

## Context

[spec-compare#46](https://github.com/cameronsjo/spec-compare/pull/46) by `littletuna4` (Tony Cerqui, the reqlan author — affiliation disclosed in the PR body and CHANGELOG) adds reqlan as an emerging-tier tool: `site/src/data/tools/reqlan.json` plus README, CHANGELOG, `docs/comparison.md`, `docs/sources.md`, `docs/use-case-scoring.md`. Written by a Cursor agent, co-authored by Tony. Only CodeRabbit ran on the PR — no build CI, so `npm run validate` / `gen:check` have never executed against it. The goal is to validate it honestly, fix what's mechanical, and hand Cameron a merge verdict.

## Validation already done (read-only, this session)

- **Disclosure**: affiliation stated in PR body, commit, and CHANGELOG entry ✅
- **License claim** `AGPL-3.0-only`: verified on all five packages' `package.json` (root has no LICENSE file; GitHub reports license `null`) ✅
- **Stars/maturity**: ~3 stars, repo created 2026-06-21, solo maintainer — matches the limitations text ✅
- **Loader**: `site/src/data.ts` uses `import.meta.glob('./data/tools/*.json')` — drop-in JSON, no registration needed ✅
- **Schema**: `reqlan.json` fields match `schema.json` requirements by inspection; emerging tier correctly omits phases/edges/scenarios; overall 2.7 = mean of the seven scores ✅
- **GEN blocks**: the two edited `comparison.md` tables are generated regions; the hand-added rows match the generator's format and sort position by inspection. `agent-config` correctly untouched (builder filters on `agentConfig`, which reqlan.json lacks) ✅
- **Findings (must fix)**:
  1. `site/package-lock.json` — 39 deleted `libc` fields: older-npm regeneration churn, unrelated to the change. Revert to `main`'s copy.
  2. `version: "v0.7.0"` is stale/ambiguous — extension is `1.14.0` (published 2026-08-30), CLI `0.10.0`, MCP `0.4.0`. The pin flows into two generated tables and the heatmap label.
  3. Heatmap row label `reqlan v0.7.0` — every other row is a plain tool name; make it `reqlan`.
- **Judgment note**: scores are self-assessed by the tool's author (solo=4, contextMgmt=4 are generous for a ~3-star DSL); plausible for the rubric, worth one line in the review comment, not a blocker.

## Steps

1. Worktree off the PR branch: `git fetch origin pull/46/head`, `git worktree add` (spec-compare is branch-mode; primary checkout stays untouched). PR head is on Cameron's own repo (`headRepo: spec-compare`, branch `update/reqlan`) with `maintainerCanModify: true` — push access confirmed.
2. Restore `site/package-lock.json` from `origin/main` (explicit pathspec checkout).
3. Update `reqlan.json` `version` to `v1.14.0` (extension — the primary user-facing surface; note the multi-package split in the PR comment).
4. `npm run gen:tables` in `site/` to regenerate the `comparison.md` GEN blocks from the corrected JSON; fix the heatmap label in `docs/use-case-scoring.md` by hand (not a GEN target).
5. Verify: `npm ci && npm run build` in `site/` — runs `validate` (ajv against schema.json), `gen:check` (stale-table tripwire), `tsc`, `vite build`. All must pass.
6. Commit to `update/reqlan` with producer tuple + Co-Authored-By, push (`--no-follow-tags`).
7. Post one PR review comment: validation summary (what was verified, what was fixed, the self-assessed-scores caveat). Run `cadence:redaction` before posting.
8. Report verdict to Cameron; merge is his call (external-facing, shared state).

## Verification

`npm run build` green in the worktree (step 5) is the machine verdict; the PR's diff after push shows lockfile churn gone and version consistent across JSON, tables, and heatmap.

## Alternatives declined

- Request changes and bounce it back to the contributor — slower round-trip for purely mechanical fixes on a branch we can push to.
- Merge as-is and fix after — lands lockfile churn and a stale pin on `main`, and the deploy workflow builds from `main`.

## Orchestrator

**Driver:** fable (current session — small serial task, no dispatch needed)

## Panel

Panel: none — PR validation with mechanical fixes only (lockfile revert, version pin, regenerated tables); no design decisions or security posture change.

## Deviations

- The PR head is on `littletuna4`'s fork, not on origin — the plan's step-1 claim (`headRepo: spec-compare`, push access confirmed) was wrong. `gh pr view 46 --json headRepositoryOwner` returns `littletuna4`.
- The fix commit (`400bc9d`) is pushed to `cameronsjo/spec-compare` branch `update/reqlan` instead. A direct push to the fork was blocked by the guard-push-remote guardrail (unowned remote); landing path is Cameron's call: merge #46 then the fix branch, replace #46 with a PR from the fix branch (contributor authorship preserved on `ae0da5f`), or authorize the fork push.
