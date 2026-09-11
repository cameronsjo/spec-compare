# Reassessment — August 2026

> **Sweep date:** 2026-08-28 · **Previous sweep:** 2026-07-23 (`ASSESSED_AS_OF`)
> **Status:** merged with this sweep — data files updated in the same change set.

A version-refresh sweep resolving the drift flagged in issue #22 (Kiro, Spec-Kit, Superpowers) plus a full double-source pass over every tracked tool. No tools enter or leave the set (18 tools, 8 core unchanged), and no scores move — the deep passes on the three drifted core tools confirmed each workflow's tracked shape survived its version jump, so re-scoring was not warranted. The MoAI-ADK hands-on eval (#21) remains owed and is deliberately not attempted here.

---

## TL;DR

- **Eleven version bumps, zero shape changes.** The three issue-#22 tools all crossed major milestones — Kiro IDE hit 1.0 GA, Spec-Kit crossed 1.0, Superpowers jumped a major — and all three kept the workflow shape the core entries document.
- **The modification-problem gap is narrowing upstream.** Spec-Kit v0.15.2 shipped opt-in brownfield support (constitution-sync preset + Brownfield Bootstrap), the first real movement on its known weakness. Noted in its limitations; scores unchanged pending hands-on evidence.
- **Conductor drifted furthest** (v0.36.3 → v0.83.0, ~47 releases) — a reminder that its weekly cadence outpaces this repo's sweep cadence; its version pin is best-effort by design.
- **No re-scoring, no promotions.** MoAI-ADK bumped v3.0.0 → v3.1.2; its core-promotion trigger (#21) still requires the hands-on eval.

## Part A — Version drift (tracked tools)

Method per July: double-source rule — `releases/latest` and `/tags` both pulled, newer wins; pre-release tags (canary/rc) do not displace a stable pin. Kiro resolves from <https://kiro.dev/changelog> (its GitHub repo is a docs mirror with zero tags). Conductor resolves from <https://www.conductor.build/changelog> (no public repo).

| Tool | Was | Now | Note |
|---|---|---|---|
| bmad-method | v6.8.0 | **v6.11.0** | Minor drift; `web-bundles-v1.0.0` tag is a separate artifact, ignored |
| conductor | v0.36.3 | **v0.83.0** | Site changelog, 2026-08-27; largest drift in the set |
| frame | v2.4.0 | **v2.6.0** | Releases + tags agree now (July's tag-only lag resolved) |
| gaai | v2.49.0 | **v2.51.0** | Tags only — repo publishes no releases |
| grace | v4.0.0-rc.3 | **v4.0.5** | Out of rc — first stable pin |
| gsd | v1.42.3 | v1.42.3 | `v1.50.0-canary.2` tag is pre-release; stable pin stands |
| kilo-code | v7.3.16 | **v7.5.6** | Routine drift |
| kiro | v0.12.263 | **v1.0.395** | IDE 1.0 GA (Jul 2026); see Part B |
| moai-adk | v3.0.0 | **v3.1.2** | #21 hands-on eval still owed |
| openspec | v1.3.1 | **v1.11.0** | Eight minors; see Part B |
| ralph-loop | Technique — unversioned | Technique — unversioned | See Part B (canonical-implementation watch) |
| smart-ralph | v4.0.0 | v4.0.0 | No drift |
| spec-kit | v0.8.18 | **v1.0.1** | Crossed 1.0; see Part B |
| spec-kitty | v3.2.5 | v3.2.5 | `v3.2.6rc2` is pre-release; stable pin stands |
| superpowers | v5.1.0 | **v6.3.0** | Major bump; see Part B |
| tessl | Framework + Registry (public) | unchanged | Framework still beta; Registry free/public — label accurate |
| traycer | VS Code extension (rolling) | unchanged | Still VS Code (+ Cursor/Windsurf forks), rolling |
| zencoder | Zenflow — free desktop app (rolling) | unchanged | Zenflow still free, desktop, model-agnostic |

*Bold = pin changed this sweep (11 of 18).*

## Part B — Deep passes and method findings

### Kiro v0.12.263 → v1.0.395

IDE 1.0 GA reached July 2026 (changelog tracks 1.0.x from 1.0.89, 2026-07-03). The spec workflow the core entry documents — `requirements.md` / `design.md` / `tasks.md` — is unchanged in name and structure, now with Requirements-First or Design-First entry variants and `bugfix.md` as an alternate artifact. Capability additions since v0.12: parallel task execution (~4x on 4+ independent tasks), Quick Plan (skips approval gates), OpenAI GPT-5.6 models (Jul 14 — Kiro's first non-Anthropic models), Agent Plugins, Cloud Sessions (preview). CLI is separately versioned at 2.20.0; CLI 3.0 remains early access. Pricing tiers unchanged. **Entry changes: version, one keyFeature line. Phases/scenarios/scores untouched — shape confirmed.**

### Spec-Kit v0.8.18 → v1.0.1

The 1.0 framing is philosophical, not a breaking rewrite — the project's own notes frame semver as adaptability ("ours is more of a wave"). The tracked slash pipeline (`/speckit.constitution → specify → clarify → plan → tasks → implement`) survives intact; the command surface grew from 8 to 10 templates (`converge`, `taskstoissues` — verified against `templates/commands/` on main). Behavioral shift: the constitution is now runtime-resolved from `.specify/memory/constitution.md` rather than materialized into templates (v0.15+). Most relevant to this repo's thesis: **v0.15.2 shipped opt-in brownfield support** (constitution-sync preset; Brownfield Bootstrap generates constitution rules from existing codebase conventions) — first real movement on the modification problem. **Entry changes: version, slashCommands 8→10, keyFeature command list, brownfield limitation softened to "new and opt-in". Scores unchanged — the brownfield preset is too new and unexercised to move `trivial-mod` without hands-on evidence.**

### Superpowers v5.1.0 → v6.3.0

The v6.0 major restructured the review machinery (two-reviewer system → unified reviewer with file-based handoffs, plan pre-flight validation, five-round circuit breaker) and the phases evolved in naming — but the entry's phase notes already used the current skill names (`brainstorming`, `writing-plans`, `subagent-driven-development`, `requesting-code-review`, `finishing-a-development-branch`), so the tracked shape needed no edits. Harness support expanded through v6.3 (Devin CLI, Hermes, Grok Build, Kimi Code, Pi, Antigravity), and skill triggering moved toward native/ambient registration per harness. Stars ~214K → ~279K. **Entry changes: version, harness keyFeature, star count. Phases/scenarios/scores untouched.**

### OpenSpec v1.3.1 → v1.11.0 (unflagged drift, caught by the full sweep)

Eight minor versions on a core tool that issue #22 didn't flag. The proposal → delta (ADDED/MODIFIED/REMOVED) → apply → archive workflow and its CLI/slash surface are unchanged; the span added `openspec show --diff`, `openspec status --all`, a Stores config framework, and harness targets expanding from ~5 to 30+ including a vendor-neutral `.agents/` target. Brownfield positioning strengthened (archive-time validation, scenario-loss detection, `skip_specs` metadata for non-spec work). **Entry changes: version only — existing prose already describes the workflow correctly.**

### Method findings

- **Pre-release tags now have a precedent:** gsd (`canary`) and spec-kitty (`rc`) both carry tags newer than their stable releases. Ruling recorded: the assessment pins to stable; a pre-release tag never displaces the pin. The July double-source rule is otherwise unchanged.
- **Conductor's version now has a public surface** — <https://www.conductor.build/changelog> — so its pin is no longer "no public repo, best-effort": it is checkable, just off-GitHub, like Kiro.
- **Ralph Loop watch item:** community references point to an official Anthropic-shipped Claude Code plugin (Dec 2025) as a canonical implementation of the loop pattern. Not verified to a primary source this sweep; the `Technique — unversioned` label stands. Re-check next sweep before considering an entry change.

## Part C — New tool verdicts

None — no tools were added or removed this sweep. The tracked set stays at 18 (8 core, 10 emerging). MoAI-ADK's core-promotion trigger remains issue #21 (hands-on Plan → Run → Sync eval), explicitly deferred from this sweep.

## Part D — Citations

- Kiro: [IDE changelog](https://kiro.dev/changelog/ide/) (1.0.395, 2026-08-27), [v0.12 notes](https://kiro.dev/changelog/ide/0-12/), [GPT-5.6 announcement](https://kiro.dev/changelog/models/gpt-5-6/), [spec workflow docs](https://kiro.dev/docs/specs/feature-specs/requirements-first/), [pricing](https://kiro.dev/pricing/)
- Spec-Kit: [releases](https://github.com/github/spec-kit/releases) (v1.0.1), [upgrade guide](https://github.com/github/spec-kit/blob/main/docs/upgrade.md), [v0.16.0](https://github.com/github/spec-kit/releases/tag/v0.16.0), [v0.15.2](https://github.com/github/spec-kit/releases/tag/v0.15.2), [Brownfield Bootstrap discussion #746](https://github.com/github/spec-kit/discussions/746), `templates/commands/` tree on `main` (10 command templates)
- Superpowers: release tags [v6.0.0](https://github.com/obra/superpowers/releases/tag/v6.0.0), [v6.1.0](https://github.com/obra/superpowers/releases/tag/v6.1.0), [v6.2.0](https://github.com/obra/superpowers/releases/tag/v6.2.0), [v6.3.0](https://github.com/obra/superpowers/releases/tag/v6.3.0)
- OpenSpec: [CHANGELOG](https://github.com/Fission-AI/OpenSpec/blob/main/CHANGELOG.md), [releases](https://github.com/Fission-AI/OpenSpec/releases) (v1.11.0)
- Conductor: [changelog](https://www.conductor.build/changelog) (0.83.0, 2026-08-27)
- Tessl: [products announcement](https://tessl.io/blog/announcing-tessls-products-to-unlock-the-power-of-agents/)
- Traycer: [VS Code Marketplace listing](https://marketplace.visualstudio.com/items?itemName=Traycer.traycer-vscode)
- Zencoder/Zenflow: [VentureBeat launch coverage](https://venturebeat.com/ai/zencoder-drops-zenflow-a-free-ai-orchestration-tool-that-pits-claude-against/)
- Ralph Loop: [ghuntley.com/loop](https://ghuntley.com/loop/)
- GitHub API double-source pulls (releases/latest + tags), 2026-08-28, for: bmad-method, frame, gaai, grace, gsd, kilo-code, moai-adk, openspec, smart-ralph, spec-kit, spec-kitty, superpowers
