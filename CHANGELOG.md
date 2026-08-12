# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Memex review** (`docs/memex-review.md`, `site/src/data/tools/memex.json`) — **Solicited** review (Mindset AI reached out via LinkedIn; disclosure in the doc, conducted independently from public sources) of the fair-code Specify & Verify platform: specs as a typed Postgres-backed decision database with per-criterion CI-verified acceptance criteria, Standards drift detection, and a knowledge graph, edited concurrently via web UI and MCP. Enters at **emerging tier** (2.9 overall) as the earliest-stage commercial entrant tracked — no tagged releases, 29★/0 forks — with promotion triggers attached. Heatmap and matrices now span **19 tools, 8 core**; `data.test.ts` count invariant updated

- **July 2026 reassessment** (`docs/reassessment-2026-07-23.md`) — Sweep doc covering five new entrants, the Spec Kitty refresh, and a version-drift spot-check of every tracked tool
- **Five emerging tool profiles** (`site/src/data/tools/`) — **MoAI-ADK** (Go CLI wrapping Claude Code in a SPEC-First Plan→Run→Sync lifecycle with TDD gates and per-SPEC worktrees, Apache-2.0, ~1.1K stars), **Frame** (Electron agentic development environment; a conductor agent runs multiple specs at once, each worker in its own worktree, Apache-2.0), **GRACE** (contract-first Graph-RAG methodology shipped as installable agent skills, MIT), **GAAI** (governed Discovery → backlog → autonomous Delivery daemon in tmux-isolated sessions; source-available under Elastic License 2.0, *not* OSI open source), and **Smart Ralph** (spec phases layered on the Ralph autonomous loop, MIT). All enter at emerging tier — card + heatmap row, no workflow treatment
- **Superpowers tool profile** (`site/`, `docs/tools/superpowers.md`) — New **core** tool: MIT agentic skills framework + methodology by Jesse Vincent (obra), ~214K stars; auto-triggered skills enforce brainstorm → plan → subagent TDD → review → finish across many harnesses
- **Traycer tool profile** (`site/`, `docs/tools/traycer.md`) — New **core** tool: commercial VS Code Plan → Execute → Verify layer (100K+ users) with Epic Mode (PRDs/specs/wireframes) over your choice of agent
- **MUSUBI gap entry** (`docs/gaps.md`) — Maximally-rigorous SDD framework noted as marginal (~57 stars, no commits since Jan 2026)
- **Doc-table generator** (`site/scripts/gen-doc-tables.mjs`, `npm run gen:tables` / `gen:check`) — Regenerates the mechanical `comparison.md` tables (quick comparison, feature matrix, agent config) from the tool JSONs between `<!-- GEN:* -->` sentinels, so the docs can't drift from the data. `gen:check` is wired into `npm run build` to fail on staleness; tables now scale to all tools automatically (tool-per-row)
- **Interactive comparison site** (`site/`) — Artificer-themed React + Vite single-page app that turns the research docs into four live views: lockstep workflow comparison (every core tool steps the same scenario in parallel), a sortable/filterable feature matrix, a single-hue scoring heatmap, and a decision guide, plus per-tool profiles. Data is one auto-discovered, AJV-validated JSON per tool — the matrix and heatmap are derived by aggregation, so the JSONs are the single source of truth. Deployed to GitHub Pages at <https://cameronsjo.github.io/spec-compare/>
- **Heatmap detail popover + graphical modes** (`site/`) — The scoring heatmap gained a mobile-friendly detail popover (hover/focus on desktop, tap → bottom sheet on touch) and a live mode toggle: numbers (default), a size-encoded punchcard, and a Map — an x/y scatter plotting every tool by computed quick-change vs large-scale fitness
- **Interactive decision flowchart** (`site/`) — The decision guide now renders as a re-routable flow: answered questions persist as nodes with the chosen branch lit and the road-not-taken dimmed, connected by labeled edges, with any earlier answer re-selectable
- **Opinion + version-pinning surfacing** (`site/`) — An explicit "considered opinion, not a benchmark, not affiliated" caveat across masthead/footer/views, an `assessed 2026-02-24` stamp, and each tool's pinned version shown in the heatmap and profiles (`version` is now a required field)
- **Honest footer** (`site/`) — Restructured the footer to the four-tier disclosure pattern (provenance · attribution · bias disclosure · affiliation fine print) in a two-column grid: states it's independent/unofficial and can be out of date, discloses the author's spec-driven-development/OpenSpec bias with an "open an issue" correction link, and carries the no-affiliation + trademarks line full-width
- **Artificer adaptations log** (`docs/artificer-adaptations.md`) — Record of how the site bends the Artificer design system, mirroring the feedback issues filed upstream (single-hue heatmap scale, tier-dot placement, scrollbar padding, wordmark fix, dissolve flourish)
- **Beads research** (`docs/beads.md`) — Deep analysis of Steve Yegge's distributed graph issue tracker, MCP Agent Mail, and Gas Town agent village
- **Orchestration landscape** (`docs/landscape.md`) — Comprehensive survey of 30+ multi-agent orchestration tools across 13 categories
- **Gaps analysis** (`docs/gaps.md`) — Five newly discovered SDD frameworks (GSD, Ralph Loop, Zencoder/Zenflow, Kilo Code, Conductor) plus updates to BMad v6 and OpenSpec v1.0
- **Beads + OpenSpec cheatsheet** (`docs/cheatsheet-beads-openspec.md`) — Practical setup and daily workflow guide for combining Beads with OpenSpec, including multi-agent worktree setup
- **Agent Configuration Support table** (`docs/comparison.md`) — New comparison of AGENTS.md, CLAUDE.md, SKILL.md, and slash command support across all tools
- **Expanded heatmap** (`docs/use-case-scoring.md`) — 11-tool scoring matrix across 7 dimensions including context management
- **Claude Code Agent Teams** (`docs/landscape.md`) — Full documentation of Anthropic's experimental preview (formerly hidden TeammateTool): 11 operations, 5 orchestration patterns, sub-agent comparison table
- **Git worktree ecosystem update** (`docs/git-worktree-support.md`) — Beads worktree architecture, Conductor, known challenges, three-layer model
- **ArXiv paper reference** (`docs/gaps.md`) — Academic coverage of SDD from February 2026

### Changed

- **July 2026 sweep** — Re-verified the five new candidates and Spec Kitty against source repos on 2026-07-23; bumped `ASSESSED_AS_OF` → 2026-07-23:
  - **Spec Kitty** v3.1.9 → **v3.2.5**: charter consolidation (a single `charter.yaml` replaces four governance files), append-only event log for work-package state, coordination-topology/split-brain fixes, new CLI surfaces (`review --check-residual`, `orchestrator-api resolve-workspace`, `doctor shim-registry`); limitations now flag the breaking-change cadence. Scores/phases/scenarios unchanged — no hands-on re-eval this pass
  - Heatmap and feature matrix now span **18 tools, 8 core** (was 13/8); `data.test.ts` count invariant updated
  - Feature flags for the new entries were resolved against each README rather than assumed, which moved six of them in both directions (detailed in the sweep doc)
  - **Version drift left unbumped on purpose:** Kiro (v0.12.263 → 1.0), Spec-Kit (v0.8.18 → v0.14.1), and Superpowers (v5.1.0 → v6.1.1) each need more than a version-string edit, so they are filed as follow-up work
- **May 2026 version + status reassessment** — Re-verified all tools against source repos on 2026-05-31; bumped `ASSESSED_AS_OF` → 2026-05-31:
  - **Kiro corrected Preview → GA** (general availability since 2025-11-17): paid tiers (Pro $20 / Pro+ $40 / Power $200) + free tier, Kiro CLI, checkpointing, property-based tests; v0.9.40 → v0.12.x (Parallel Task Execution, Requirements Analysis); `parallel: true`
  - **Tessl corrected closed-beta → public** Framework + Registry; $125M Series A; repositioned as an Agent Enablement Platform; spec-as-source kept with a "shipping Framework behaves spec-anchored today" caveat
  - Spec-Kit v0.1.5 → **v0.8.18** (107K★, 30+ agents); Spec Kitty v0.13.5 → **v3.1.9** (acceptance matrix, negative invariants); BMad v6.0.2 → **v6.8.0**; OpenSpec v1.2.0 → **v1.3.1**; GSD v1.20.6 → **v1.42.3** (11.9K → 63.8K★); Kilo Code v4.148.1 → **v7.3.16**; Zencoder/Zenflow refreshed (free desktop app, control plane, auto-worktrees)
  - Heatmap/lockstep now span **13 tools, 8 core** (was 11/6); `data.test.ts` invariants updated
  - Conductor (v0.36.3) not re-verified — no public version scheme
- **`comparison.md` mechanical tables are now generated** from the tool JSONs (see Added); the hand-curated Capability Matrix is scope-noted to the original six, and the architectural-philosophy prose now folds in Superpowers + Traycer
- **`git-worktree-support.md` corrected** — dropped the now-false "Spec Kitty is the only tool with worktree support" claim; added Superpowers, Conductor, and Zencoder/Zenflow as worktree-capable
- **Bias disclosure expanded** (footer + Superpowers profile) — discloses that the author keeps a personal, unreleased rig (cadence) filed down from Superpowers after it felt too rigid, so the Superpowers assessment leans toward lighter-weight gating
- **Site toolchain bump** (`site/`) — Upgraded vite `5.4` → `6.4.2` and vitest `2.1` → `3.2.4`, pulling in esbuild `0.25.12`. Clears two medium Dependabot advisories (vite optimized-deps path traversal, esbuild dev-server SSRF) at the source; both were dev-server/build-time only and never present in the deployed static artifact. Build + 6 tests green; CI Node 20 unchanged (compatible)
- **Latest version sweep (February 24, 2026)** — Updated all tool profiles and cross-references with current versions:
  - Spec-Kit v0.1.5, Spec Kitty v0.13.5, BMad v6.0.2 (now stable), OpenSpec v1.2.0, Kiro v0.9.40, Tessl registry updates
  - GSD v1.20.6, Kilo Code v4.148.1 + CLI launch, Conductor v0.36.3
  - BMad agent count corrected from 19 → 21 across all docs
  - BMad Production Ready status updated from ⚠️ to ✅ in capability matrix
  - Kiro AI Models updated with Claude Sonnet 4.6 support
  - Heatmap updated to OpenSpec v1.2
- **OpenSpec v1.0 rewrite** (`docs/tools/openspec.md`) — Documented action-based workflow, three-layer dynamic instructions, semantic spec syncing, and unified skills directory
- **Execution layer recommendations** (`docs/recommendations.md`) — New section for Beads, Agent Teams, GSD, Conductor; four recommended stacks by team type
- **Sources expanded** (`docs/sources.md`) — 40+ new citations across Agent Teams, Beads, Agent Mail, Gas Town, GSD, Ralph Loop, Zencoder, Kilo Code, Conductor, AGENTS.md, and ArXiv paper
- **README restructured** (`README.md`) — New tools section, orchestration & execution layer docs section, updated date
- Updated TeammateTool section to Agent Teams experimental preview with full architecture documentation
- Added AGENTS.md/CLAUDE.md/SKILL.md support rows to detailed feature matrix
- Expanded use-case scoring heatmap from 6 to 11 tools with "Context Management" dimension
- Updated git worktree analysis with Beads shared database model and Conductor
- Fixed emoji table Overall scores (were inflated by 0.2–0.6)
- Updated CONTRIBUTING.md file tree to reflect actual repo structure
- Updated stale "six tools" reference in critical-analysis.md
- Added cross-references across all existing docs

## [1.0.0] - 2025-11-23

### Added

- Initial comprehensive comparison of six spec-driven development tools
- Detailed analysis of GitHub Spec-Kit
- Detailed analysis of Spec Kitty (Priivacy-ai)
- Detailed analysis of BMad Method
- Detailed analysis of OpenSpec (Fission-AI)
- Detailed analysis of Kiro
- Detailed analysis of Tessl
- Git worktree support analysis across all tools
- Comparison matrices for features, licensing, and use cases
- Architectural approaches documentation (Spec-First, Spec-Anchored, Spec-as-Source)
- Critical analysis section covering waterfall concerns, AI adherence issues, and scalability
- Decision framework for choosing appropriate tools
- Recommendations by use case (solo developers, teams, enterprise, brownfield, greenfield)
- Industry trends and future outlook
- Comprehensive source citations
- Project documentation (README, CONTRIBUTING, CHANGELOG, LICENSE)
- Git repository initialization

### Research Sources

- GitHub Spec-Kit official repository and documentation
- Spec Kitty repository and documentation
- BMad Method repository and website
- OpenSpec repository and website
- Kiro official website and documentation
- Tessl official website and blog posts
- Martin Fowler comparative analysis
- GitHub blog posts on spec-driven development
- Microsoft developer blog
- Industry articles from RedMonk, Thoughtworks, The New Stack
- Critical perspectives from Marmelab and others

[Unreleased]: https://github.com/USERNAME/spec-compare/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/USERNAME/spec-compare/releases/tag/v1.0.0
