# Reassessment — July 2026

> **Sweep date:** 2026-07-23 · **Previous sweep:** 2026-05-31 (`ASSESSED_AS_OF`)
> **Status:** merged with this sweep — data files updated in the same change set.

A narrower sweep than May's: five new SDD frameworks triaged into emerging-tier
entries, the Spec Kitty core entry refreshed to v3.2.5, and a version-drift
spot-check across the other tracked tools (no re-scoring). Verdicts and scores
were fixed in the reviewed plan (`docs/plans/2026-07-23-july-2026-sdd-sweep.md`)
after a plan-review + red-team panel pass.

---

## TL;DR

- **Five emerging additions:** MoAI-ADK, Frame, GRACE, GAAI, Smart Ralph —
  heatmap + feature-matrix rows only (no workflow treatment). The tracked set
  grows 13 → **18 tools** (8 core unchanged).
- **MoAI-ADK is the promotion candidate.** It enters as emerging with an
  explicit core-promotion trigger (hands-on eval of the v3.0 lifecycle — see
  Part C).
- **Spec Kitty** v3.1.9 → **v3.2.5** — charter consolidation, event-log
  work-package state, split-brain coordination fixes, plus a fast
  breaking-change cadence worth flagging. Scores unchanged (no hands-on re-run).
- **No demotions.** Smart Ralph's stall gate ("commits also stalled since Feb")
  did not fire — a fresh commit landed 2026-07-23.
- **Three core tools drifted hard since May** — Kiro (v0.12.263 → **1.0**),
  Spec-Kit (v0.8.18 → **v0.14.1**), Superpowers (v5.1.0 → **v6.1.1**). Left
  unbumped on purpose: each needs more than a version-string edit, so they're
  filed as follow-up work rather than folded into this sweep (Part A).

---

## Part A — Version drift (tracked tools)

Versions verified 2026-07-23 using the **double-source rule** (Part B): both
`gh api repos/<o>/<r>/releases/latest` **and** `/tags`, taking the newer.
Version strings only — scores were not re-evaluated this pass.

### Spec Kitty (detailed — the one entry refreshed)

- `v3.1.9` → **`v3.2.5`** (released 2026-07-08).
- **Charter consolidation:** a single `charter.yaml` replaces four governance files.
- **Append-only event log** for work-package state (phase 1: dual write).
- **Coordination-topology / split-brain fixes**; new CLI surfaces
  (`review --check-residual`, `orchestrator-api resolve-workspace`, `doctor shim-registry`).
- **Breaking-change cadence:** `--feature` alias removed from 8 commands,
  `auth whoami` removed, pre-3.2 missions without `meta.json` unsupported.
- **Traction:** 1,443★ / 128 forks / 482 open issues — very active,
  multi-contributor, ADR/RFC-governed.
- Scores/phases/scenarios **unchanged** — no hands-on re-eval this pass.

### Spot-check (remaining tracked tools)

| Tool | Tracked | Current | Source | Drift |
|---|---|---|---|---|
| Spec-Kit | v0.8.18 | **v0.14.1** (2026-07-23) | release + tags | 🔴 large |
| Kiro | v0.12.263 | **1.0.138** | kiro.dev changelog | 🔴 large |
| Superpowers | v5.1.0 | **v6.1.1** (2026-07-02) | release + tags | 🔴 large |
| OpenSpec | v1.3.1 | v1.6.0 (2026-07-10) | release + tags | 🟡 moderate |
| BMad Method | v6.8.0 | v6.10.0 (2026-07-03) | release + tags | 🟡 minor |
| Kilo Code | v7.3.16 | v7.4.15 (2026-07-22) | release + tags | 🟡 minor |
| GSD | v1.42.3 | v1.42.3 (2026-05-16) | release + tags | 🟢 current |
| Ralph Loop | unversioned technique | - | no shipped artifact | - |
| Conductor | v0.36.3 | - | no public repo | - |
| Tessl | Framework + Registry (public) | - | no public repo | - |
| Traycer | VS Code extension (rolling) | - | no public repo | - |
| Zencoder / Zenflow | Zenflow desktop app (rolling) | - | no public repo | - |

*Legend: 🔴 large (major-equivalent jump) · 🟡 moderate or minor · 🟢 current · `-` not applicable.*

**Version fields were not bumped this pass** — the sweep's scope was the five
new entries plus Spec Kitty. The three large drifts are filed as a follow-up
issue rather than folded in here, because each is more than a version-string
edit:

- **Kiro** — the tracked `v0.12.263` predates a real **1.0 milestone** plus a
  feature shift (OpenAI model support, CLI 3.0 early access). Note for whoever
  picks this up: the `kirodotdev/Kiro` GitHub repo is **not authoritative** —
  it carries zero tags and 404s on `releases/latest` because it's a
  docs/community mirror, not the shipped IDE. Version comes from
  `kiro.dev/changelog`.
- **Spec-Kit** — six minor versions behind on 0.x semver (major-equivalent),
  and v0.14.1 published the same day as this sweep.
- **Superpowers** — major bump 5.x → 6.x.

Three entries carry no version because they ship no public versioned artifact:
Conductor, Tessl, Traycer, and Zencoder are closed-source (no repo), and
`snwfdhmp/awesome-ralph` is a curated resource list rather than the technique
itself — so Ralph Loop's "unversioned" label is correct as recorded. GSD's
stable channel matches exactly; canary tags (v1.50.0-canary.2) run ahead but
are not the tracked channel.

---

## Part B — Corrections & method findings

### Double-source version rule

GitHub's `releases/latest` and `/tags` endpoints **disagreed on Frame**:
`/releases?per_page=10` never surfaced v2.4.0, which only appears via `/tags`.
Every version written this pass therefore pulled both endpoints and took the
newer. Corrections this produced during research:

- **Frame** — initial research recorded an older release; corrected to
  **v2.4.0 (2026-06-25)** via tags.
- **GAAI** — has **no GitHub Releases at all**; versions exist as git tags only.
  Current: **v2.49.0**. Its license also trips the API: GitHub reports
  `NOASSERTION` for Elastic License 2.0, so the license was sourced from the
  LICENSE file directly.

### Feature flags corrected against the READMEs

The triage table carried assumed values for several capability flags. Reading
each README moved six of them, in both directions — recorded here because the
merged data no longer matches the triage:

- **GRACE `parallel`: false → true.** `grace-multiagent-execute` runs
  "parallel-safe waves with controller-managed synchronization" — genuine
  concurrent workstreams, not sequential phases. Its *fitness score* for
  parallel work stays low (2); capability and suitability are different axes.
- **MoAI-ADK `dashboard`: none → Web.** `moai web` serves a six-tab settings
  console. It is a settings surface rather than a live monitoring view, so the
  capability is recorded without the profile claiming progress visibility.
- **Smart Ralph `mcp`: false → true.** Its codebase indexer explicitly queries
  MCP servers for tools and resources.
- **Smart Ralph `multiAgent`: true → limited.** The six phase agents
  (triage-analyst, research-analyst, product-manager, architect-reviewer,
  task-planner, spec-executor) are sequential delegation inside one workflow,
  not orchestrated concurrent processes.
- **GAAI `dashboard`: confirmed present** — the Delivery Daemon auto-opens a
  tmux monitoring split and takes a `--status` flag for a live view.
- **GAAI `gitWorktrees`: confirmed false.** Its isolation is one `claude -p`
  tmux session per Story — a separate OS process, but not a worktree. This is
  the one place the framework's parallelism could be mistaken for worktree
  isolation.

Smart Ralph's `parallel` flag stayed false: `[P]` markers flag low-conflict
tasks as parallel-*candidates*, but the README describes execution as
"task-by-task with fresh context per task" and never states concurrency.
Ambiguous evidence resolves to absent.

### Smart Ralph pulse check

The triage carried a conditional demotion gate: if the repo's commits had
stalled since the v4.0.0 release (2026-02-20), Smart Ralph would drop to a
watch-list mention instead of an entry. Live check on 2026-07-23: latest commit
**2026-07-23**, prior **2026-04-08**. The gate does **not** fire — the emerging
entry stands, with the sparse cadence (~2 commits Mar–Jul 2026) recorded in its
limitations.

---

## Part C — New tool verdicts

All five enter at `tier: "emerging"` — profile card + heatmap row, no
phases/edges/scenarios (schema-enforced). Scores are editorial, README-depth
research only; none received a hands-on run.

### MoAI-ADK (`modu-ai/moai-adk`) — emerging, promotion trigger attached

Korean-origin (modu-ai) Go CLI wrapping Claude Code in a SPEC-First
Plan→Run→Sync lifecycle: TDD gates (85%+ coverage target), 24 agents / 52
skills, per-SPEC git worktrees, "Tokenomics" model/effort routing.
**v3.0.0 (2026-07-19), Apache-2.0, ~1.1k★.** Claude-Code-only; benchmark
claims are self-reported.

**Why not core now:** README-depth research cannot honestly score the six
lockstep scenarios (Cameron's call — declined in plan review).
**Core-promotion trigger:** a hands-on eval of the v3.0 Plan→Run→Sync
lifecycle — install, run one SPEC through all three phases, score the six
scenarios. Tracked as a follow-up issue.

### Frame (`kaanozhan/Frame`) — emerging

Electron "Agentic Development Environment": spec→plan→tasks→outcome Markdown
per feature, multi-agent orchestrator running Claude Code / Codex CLI / Gemini
CLI in parallel isolated worktrees with footprint-conflict and drift detection.
**v2.4.0 (2026-06-25), Apache-2.0, ~318★.** Small contributor base (10
contributors; the bulk of recent commits comes from a regular contributor other
than the repo owner, so this is not a solo project).

### GRACE (`osovv/grace-marketplace`) — emerging

Graph-RAG Anchored Code Engineering: contract-first methodology delivered as
installable agent skills — XML artifacts (requirements / technology /
development-plan / verification-plan / knowledge-graph), an
Initialize→Plan→Verify→Execute→Refresh loop, drift detection. Installed as a
Claude Code marketplace plugin; Bun-based CLI.
**v4.0.0-rc.3 (2026-07-22), MIT, ~227★.**
Solo maintainer; every release to date is an `-rc` (maturity recorded as Beta,
with the all-rc caveat in limitations).

### GAAI (`Fr-e-d/GAAI-framework`) — emerging

Governed Agentic AI Infrastructure: conversational Discovery phase →
Epics/Stories backlog as a git-tracked contract → autonomous Delivery daemon in
isolated Claude Code/tmux sessions with QA gates and persistent cross-session
memory. Markdown + YAML + bash, no SDK. Successor to AI-Governor-Framework.
**v2.49.0 (git tags only), Elastic License 2.0, ~154★.** ELv2 is
source-available, **not** OSI open source — `openSource: false` with the
explanation in limitations. Maturity `Active Dev` on the strength of 30+ tags,
~1.9k commits, near-daily pushes.

### Smart Ralph (`tzachbon/smart-ralph`) — emerging

Claude Code / Codex plugin layering spec phases
(research→requirements→design→tasks→implement, with state files and
phase-dedicated sub-agents) on the Ralph autonomous loop; fresh context per
task; an alternate "ralph-speckit" flavor mirrors spec-kit's phases.
**v4.0.0 (2026-02-20), MIT, ~430★.** Solo maintainer; sparse commit cadence
(~2 commits Mar–Jul 2026) — see the Part B pulse check.

### Identification-confidence notes

- **"moia-adk" → MoAI-ADK** — the request's spelling was a transposition;
  `modu-ai/moai-adk` confirmed as the intended project.
- **"gaii" → GAAI** — phonetic match to `Fr-e-d/GAAI-framework`;
  Cameron-confirmed. A watch-list placement over the ID uncertainty was
  declined; the ELv2 / no-Releases caveats are carried in limitations instead.
- **GRACE** — sole credible candidate for the name in the SDD space;
  `osovv/grace-marketplace`.

---

## Part D — Citations

GitHub-only sourcing (per the request). Repositories verified 2026-07-23:

- MoAI-ADK — <https://github.com/modu-ai/moai-adk>
- Frame — <https://github.com/kaanozhan/Frame>
- GRACE — <https://github.com/osovv/grace-marketplace>
- GAAI — <https://github.com/Fr-e-d/GAAI-framework>
- GAAI's predecessor, source for the succession claim — <https://github.com/Fr-e-d/AI-Governor-Framework> (archived; its README states GAAI supersedes it)
- Smart Ralph — <https://github.com/tzachbon/smart-ralph>
- Spec Kitty — <https://github.com/Priivacy-ai/spec-kitty>

Feature flags for the five new entries were resolved against each repo's README
(`gh api repos/<o>/<r>/readme`) under a conservative rule: a capability the
README does not name is recorded as absent.
