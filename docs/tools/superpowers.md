# Superpowers

**Type:** Agentic skills framework + software-development methodology
**Repository:** https://github.com/obra/superpowers
**Status:** Active development
**License:** MIT
**Current Version:** v5.1.0 (May 4, 2026)
**Traction:** ~214K GitHub stars — the largest project in the spec-driven-development category. Created by Jesse Vincent (obra) and the team at Prime Radiant.

> **Disclosure:** This project's author keeps a personal, unreleased SDD rig — **cadence** — filed down from Superpowers after it felt too rigid in daily use. Read the scores and the "discipline overhead" limitations below with that grain of salt: they lean toward lighter-weight gating.

## Core Approach

Superpowers is not a CLI you run — it's a bundle of **auto-triggering skills** that install into your coding agent and impose a disciplined, spec-first methodology on every task. The moment the agent sees you're building something, it steps back and elicits intent rather than diving into code: it brainstorms a design, shows it to you in readable chunks, gets sign-off, then writes a bite-sized plan and implements it under true test-driven development.

The defining trait is that the skills trigger **automatically** from the task description — there are no special commands to remember. Your coding agent simply "has Superpowers."

## Key Features

- **Auto-triggered skills:** Each skill activates based on what you're doing — no slash commands or manual invocation
- **Subagent-driven development:** Dispatches a fresh subagent per task, so context stays clean and Task 50 gets the same attention as Task 1
- **Enforced TDD:** RED → GREEN → REFACTOR is a HARD-GATE; code written before a failing test is deleted. YAGNI and DRY are first-class principles
- **Native git worktrees:** The `using-git-worktrees` skill creates an isolated workspace on a new branch and verifies a clean test baseline before work starts
- **Two-stage review:** `requesting-code-review` checks each task against the plan; critical issues block progress
- **Multi-harness:** Works across Claude Code, Codex CLI/App, Gemini CLI, Cursor, GitHub Copilot CLI, OpenCode, and Factory Droid

## How It Works

The methodology is a chain of skills, each gating the next:

1. **brainstorming** — refines a rough idea through questions, explores alternatives, presents the design in sections for validation, and saves a design document
2. **using-git-worktrees** — after design approval, creates an isolated workspace and confirms a clean baseline
3. **writing-plans** — breaks work into 2–5 minute tasks, each with exact file paths, complete code, and verification steps
4. **subagent-driven-development** — dispatches a fresh subagent per task with two-stage review (spec compliance, then code quality)
5. **test-driven-development** — enforces RED-GREEN-REFACTOR per task
6. **requesting-code-review** — reviews between tasks; critical issues block
7. **finishing-a-development-branch** — verifies tests, presents merge / PR / keep / discard, cleans up the worktree

## Installation

Install per harness from the official plugin marketplace, e.g. for Claude Code:

```
/plugin install superpowers@claude-plugins-official
```

If you use more than one harness, install Superpowers separately for each.

## How It Compares

**vs. GSD:** Both lean on fresh subagent contexts to fight context rot. Superpowers wraps that in a fuller methodology (brainstorm → plan → TDD → review → finish) with enforced TDD gates; GSD emphasizes wave-based parallelism and atomic planning.

**vs. Spec-Kit:** Spec-Kit produces version-controlled markdown specs you drive with slash commands; Superpowers auto-triggers skills and treats the design doc + plan as consumed work artifacts rather than maintained specs.

**vs. BMad Method:** Both are agent-driven methodologies, but BMad simulates a 21-role org with heavy ceremony, while Superpowers is a lightweight, auto-triggering discipline aimed at one developer plus subagents.

**vs. Spec Kitty:** Both use git worktrees. Spec Kitty adds a kanban dashboard and explicit multi-agent coordination; Superpowers stays terminal-native and dispatches subagents serially.

## Best For

- Solo developers who want disciplined, near-autonomous builds across any harness
- Greenfield features where brainstorm → plan → TDD pays off
- Teams that value enforced TDD and clean per-task context over a dashboard
- Anyone already invested in a skills-based agent workflow

## Limitations

- A methodology + skill bundle, not a single installable CLI
- Discipline overhead (brainstorm + TDD gates) is heavy for trivial edits
- Plans are consumed during execution — no maintained living spec
- Per-harness install; behavior varies with the underlying agent
- No dashboard or parallel multi-team orchestration

## Sources

- [GitHub: obra/superpowers](https://github.com/obra/superpowers)
- [obra/superpowers-skills](https://github.com/obra/superpowers-skills) — community-editable skills
- [obra/superpowers-marketplace](https://github.com/obra/superpowers-marketplace)
- [Superpowers for Claude Code: Complete Guide 2026](https://pasqualepillitteri.it/en/news/215/superpowers-claude-code-complete-guide)

## Related

- [Comparison Matrix](../comparison.md)
- [GSD](gsd.md) — shares the fresh-subagent-context idea
- [Recommendations](../recommendations.md)
