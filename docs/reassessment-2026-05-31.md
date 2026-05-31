# Reassessment — May 2026

> **Sweep date:** 2026-05-31 · **Previous sweep:** 2026-02-24 (`ASSESSED_AS_OF`)
> **Status:** findings for review — no data files changed yet.

The site has drifted ~3 months. Every GitHub-hosted tool has moved, two of the six
*core* tools have materially wrong status labels, and the SDD landscape has gained
at least two credible new entrants worth profiling. This doc captures the deltas with
evidence so we can agree what to merge before touching `site/src/data/tools/*.json`.

---

## TL;DR

- **Every tracked version is stale.** Biggest jumps: Spec-Kit `0.1.5 → 0.8.18`,
  Spec Kitty `0.13.5 → 3.1.9` (a near-rewrite), Kilo Code `4.148.1 → 7.3.16`,
  Kiro `0.9.40 → 0.12.263`.
- **Two core tools are mislabeled, not just out of date:**
  - **Kiro** went **GA on 2025-11-17** (paid tiers, Kiro CLI, team features) — the site
    still says *Preview / free preview*. This was already wrong at the Feb sweep.
  - **Tessl** is no longer *closed beta* — its Framework + Registry launched publicly,
    it raised **$125M** (Series A), and it repositioned as an **Agent Enablement Platform**.
- **Two strong new candidates to add:** **Superpowers** (213K★, MIT, multi-harness SDD
  methodology) and **Traycer** (commercial Plan→Execute→Verify orchestration layer, 100K+ users).
- **One marginal candidate:** **MUSUBI** — very rigorous (EARS + 9-article constitution +
  traceability) but **57★ and no commits since 2026-01-01** (likely stalled). Recommend a
  `gaps.md` mention, not a full profile.
- **Supporting citation found:** a Jan 2026 arXiv paper formalizes the exact
  spec-first / spec-anchored / spec-as-source taxonomy the site already uses — good for `sources.md`.

---

## Part A — Version & traction drift (tracked tools)

GitHub-hosted versions verified via `gh api .../releases/latest`; stars via the repos API
on 2026-05-31.

| Tool | Tracked | Current | Stars (was → now) | Notes |
|---|---|---|---|---|
| Spec-Kit | v0.1.5 | **v0.8.18** (May 29) | → **107.3K** | Now claims 30+ agent integrations; 100K★ milestone. |
| Spec Kitty | v0.13.5 | **v3.1.9** (May 21) | → 1.28K | Major rewrite: acceptance matrix, negative invariants (`grep_absence`), `NEEDS CLARIFICATION` gates. |
| BMad Method | v6.0.2 | **v6.8.0** (May 25) | → 48.4K | Steady minor releases. |
| OpenSpec | v1.2.0 | **v1.3.1** (Apr 21) | → **51.9K** | Modest version bump, large star growth. |
| Kiro | v0.9.40 | **v0.12.263** (May 28) | (repo 3.8K, issues-only) | **GA** — see Part B. v0.12 added Parallel Task Execution, Quick Plan, Requirements Analysis. |
| GSD | v1.20.6 | **v1.42.3** (May 16) | **11.9K → 63.8K** | ~5× star growth since sweep. |
| Kilo Code | v4.148.1 | **v7.3.16** (May 28) | → 19.7K | Three major versions in ~3 months. |
| Tessl | closed beta | Framework + Registry (public) | n/a (closed src) | **Repositioned** — see Part B. |
| Zencoder/Zenflow | rolling | rolling | n/a | No re-verify done this pass; recommend a quick check before merge. |
| Conductor | v0.36.3 | rolling (no public version scheme) | n/a | Free, Mac-only, parallel Claude/Codex via worktrees — positioning unchanged. |
| Ralph Loop | technique | technique | n/a | Unversioned pattern — no change. |

**Action:** bump every `version` field; refresh star-count claims in `README.md` and
`docs/gaps.md` (esp. GSD's "11.9K stars" → 63.8K).

---

## Part B — Status corrections (more than a version bump)

### Kiro — Preview → **GA**
- **GA on 2025-11-17** with team support (AWS IAM Identity Center), **Kiro CLI**,
  property-based tests, checkpointing ("rewind"), and multi-base-folder support.
- **Paid tiers now exist:** Free, Pro **$20/mo**, Pro+ **$40/mo**, Power **$200/mo**
  (credit-based; $0.04/overage credit).
- **AWS is betting on it:** Amazon Q Developer ends new signups 2026-05-15, directing users to Kiro.
- **Current IDE:** v0.12.263 (May 28); v0.12 introduced Parallel Task Execution + Requirements Analysis.
- **Data changes:** `maturity` Preview → `GA`; `license` "Proprietary (free preview)" →
  "Proprietary (paid + free tier)"; `version` → `v0.12.x`; consider a `parallel: true` feature flag.

> Note: this was already incorrect at the Feb sweep (GA predates it by 3 months) — worth a
> CHANGELOG line acknowledging the correction.

### Tessl — closed beta → **Agent Enablement Platform**
- Two products: **Tessl Framework** (installs as "tiles" into `.tessl/`, teaches any
  MCP-compatible agent — Claude Code, Cursor, Copilot, Gemini — a spec-driven workflow) and
  a versioned **Spec Registry** ("npm for specifications").
- **Funding:** ~$125M total (April seed + $100M Series A led by Index; Accel/GV/boldstart),
  reported ~$750M valuation.
- Still spec-driven at the core, but the *spec-as-source* framing has broadened to
  governance/enablement. **specMaturity may need revisiting** (still Spec-as-Source? or now Spec-Anchored + registry?).
- **Data changes:** `version`/`maturity` off "closed beta"; refresh tagline, keyFeatures
  (registry, tiles, MCP-native, multi-agent), and the README "experimental beta" framing.

---

## Part C — New tool candidates

### ✅ Recommend adding: Superpowers (`obra/superpowers`)
- **213.6K★**, **MIT**, actively pushed (May 30). Created by Jesse Vincent (Prime Radiant).
- An **agentic skills framework + SDD methodology** spanning Claude Code, Codex, Gemini CLI,
  Cursor, Copilot CLI, OpenCode, Factory Droid. Auto-triggering skills enforce:
  brainstorm → worktrees → plans → subagent-driven dev → RED/GREEN TDD → code review → finish.
- **Why it fits:** it's explicitly spec-first (brainstorm a design, get sign-off, then a
  bite-sized plan), persists artifacts, and uses git worktrees natively — directly comparable to
  the existing core tools on our worktree/parallel/specMaturity axes.
- **Proposed tier:** `emerging` initially (methodology, not a single CLI), but its scale +
  worktree-native workflow arguably justify `core`. Open question below.
- **Relevance flag:** this is skills-based and multi-harness — squarely in the workbench
  wheelhouse, so worth a careful profile rather than a one-liner.

### ✅ Recommend adding: Traycer (`traycer.ai`)
- Commercial **VS Code extension** (closed source, no public repo), **100K+ users**,
  credit-based tiers (Free / Lite ~$20 / Pro ~$40 / Ultra ~$100).
- Sits **on top of** Cursor / Claude Code / Copilot as a planning + verification layer:
  Plan → Execute → Verify, with **Epic Mode** generating PRDs, specs, tech flows, wireframes,
  sequence diagrams, then breaking them into agent-sized tickets.
- **Why it fits:** it's a commercial SDD orchestration competitor to Kiro/Zencoder, with a
  distinct "spec becomes a ticket system" persistence model. Slots into `emerging` alongside Zencoder.

### ⚠️ Marginal — mention only: MUSUBI (`nahisaho/MUSUBI`)
- Extremely rigorous: 7 agents × 31 skills, **EARS** requirements, **9-article constitution**,
  Phase-(-1) gates, Requirement→Design→Code→Test traceability, C4 diagrams, delta specs for brownfield.
- **But: 57★ and no commits since 2026-01-01.** Low adoption + apparent stall. Recommend a
  `docs/gaps.md` entry (it's a useful "maximally rigorous" reference point) rather than a tracked profile.

### Also seen (no action)
- **Devika** — autonomous coding agent surfaced in landscape maps; not spec-first. Landscape mention at most.
- **`formulahendry/mcp-server-spec-driven-development`** — an MCP server that adds an SDD loop to
  any agent; niche. Could note in landscape "Protocols/MCP" if we want completeness.

---

## Part D — Supporting evidence

- **arXiv [2602.00180]** — *"Spec-Driven Development: From Code to Contract in the Age of AI
  Coding Assistants"* (Jan 2026) formalizes **spec-first / spec-anchored / spec-as-source** —
  the same three-level taxonomy the site's `specMaturity` field already encodes. Strong validating
  citation for `docs/sources.md` and the SDD-maturity section of the README.
- Multiple 2026 roundups (MarkTechPost "9 best", Augment Code, Medium "30+ frameworks map",
  Martin Fowler's Kiro/Spec-Kit/Tessl piece) now treat this as a named category — useful for `sources.md` refresh.

---

## Proposed merge plan (pending approval)

1. **Version + star refresh** across all 11 `*.json`, plus `README.md` / `docs/gaps.md` star claims.
2. **Kiro** status correction → GA (maturity, license, version, features, CHANGELOG note).
3. **Tessl** status correction → public Framework + Registry, funding, repositioning.
4. **Spec Kitty** keyFeatures refresh for the v3 rewrite (acceptance matrix, negative invariants).
5. **Add `superpowers.json`** and **`traycer.json`** (tier TBD — see open questions), with
   scenarios/scores so they flow into the matrix + heatmap; add doc profiles + sources.
6. **MUSUBI** → `gaps.md` mention; optional Devika / MCP-SDD-server landscape lines.
7. Bump **`ASSESSED_AS_OF` → 2026-05-31**, README "Last Updated", and the landscape doc's
   "February 2026" framing.
8. Re-verify **Zencoder/Zenflow** (not swept this pass) before merge.

## Open questions

1. **Superpowers tier — `core` or `emerging`?** Scale + worktree-native SDD workflow argue for
   core; "it's a methodology/skill bundle, not a single installable CLI" argues for emerging.
2. **New core tools need full scenario scoring** (the 6 lockstep scenarios + 7 heatmap dims) to
   render properly. Want me to score Superpowers/Traycer against the rubric, or keep them
   `emerging` (heatmap-only, no lockstep) for now?
3. **Tessl `specMaturity`** — keep "Spec-as-Source", or reclassify given the registry/enablement pivot?
