# RPAC (agent-toolkit)

**Type:** Workflow pattern delivered as agent skills
**Repository:** https://github.com/eai-org/agent-toolkit
**Docs:** https://eai-org.github.io/agent-toolkit-docs/task-workflow/
**Status:** Active development
**License:** MIT
**Current Version:** Unversioned; assessed at `main` @ `bc5e2cd` (Nov 3, 2026)
**Traction:** ~80 GitHub stars, 18 forks. Repository created May 2026; maintained under the Engineering in the Age of AI organization.

> **Disclosure:** This profile was added by a contributor to agent-toolkit. Scores come from reading the repository and docs, not from an independent evaluation, so read them with that in mind.

## Core Approach

RPAC stands for **Refine, Plan, Act, Consolidate**. It takes a developer through one task, from ticket to code review. Each phase runs in a fresh session and hands over a file rather than chat history, so a full context window never carries over into the next phase.

The toolkit treats these files as tools rather than ceremony: its philosophy doc says trivial, well-defined tasks may skip phases. The skills are invoked by hand, so nothing enforces the order.

## How It Works

1. **Ticket:** `fetch-ticket` saves the tracker ticket as a self-contained `TICKET.md`. Without a tracker, write it by hand or start Refine from a raw idea. `attach-to-ticket` adds attachments the fetch could not download.
2. **Refine (the what):** `refine-ticket` checks the ticket against the code and interviews you one question at a time, producing `REQUIREMENTS.md`.
3. **Plan (the how):** `create-implementation-plan` studies the code, settles technical decisions with you, and writes a self-contained `PLAN.md`.
4. **Harden (optional, after Refine or Plan):** `harden-artifact` has a clean-context sub-agent review the document, and your session tries to disprove each finding. You decide on what survives.
5. **Split (optional):** `split-plan-tasks` appends small tasks to `PLAN.md`, each leaving the project building with passing tests, grouped into PR-sized batches.
6. **Act:** `execute-plan-tasks` runs one task per fresh session, ticks it off in `PLAN.md`, logs deviations in `DECISIONS.md`, and stops for your review. It never commits or pushes. An unsplit plan needs no skill: ask a fresh session to execute it.
7. **Consolidate:** `fresh-eyes-review` has a clean-context sub-agent review the changeset (`self-review` builds on it and adds a report for the PR), then `handover` writes `HANDOVER.md`, a paste-ready PR description.

The site's diagram is compact and shows only the main path: Ticket, Refine, Plan, Act (an unsplit plan, no skill needed), and Consolidate (`handover`).

The slash-command count in the comparison tables (10) counts the skills above, which are all invoked by name. The toolkit ships no separate command files.

## Installation

```bash
git clone https://github.com/eai-org/agent-toolkit.git && cd agent-toolkit
./install.sh
```

The script symlinks the skills into `~/.agents/skills` and your agent's own directory. `--skills-dir` targets another agent or a single project.

## How It Compares

**vs. Superpowers:** Both move from a clarified idea through a plan to per-task execution in fresh context. Superpowers auto-triggers its skills, gates on TDD, and dispatches subagents to build. RPAC is invoked by hand, keeps a human review between tasks, and adds adversarial hardening of the documents.

**vs. Matt Pocock's Skills:** Both are small, composable, user-invoked skill collections that interview you first. Pocock's flow publishes specs and tickets to an issue tracker; RPAC keeps its documents as local files and treats the session boundary as the main design tool.

**vs. Spec-Kit:** Spec-Kit keeps version-controlled specs under a project constitution. RPAC's requirements and plans are working files for one task, with no maintained spec.

**vs. Spec Kitty:** Spec Kitty orchestrates parallel work in git worktrees with a kanban dashboard. RPAC has neither and runs tasks one after another.

## Best For

- Developers working from tickets who want to review every increment
- Existing codebases, where requirements need checking against real code
- Teams that want PR-sized groups and paste-ready PR descriptions
- Anyone who wants to adopt single skills rather than a whole framework

## Limitations

- A skill collection, not a framework: nothing enforces the flow, and each phase is invoked by hand
- One task per run: long plans need many manual invocations
- Requirements and plans are per-task working files, with no maintained living spec
- No worktree isolation or parallel multi-agent orchestration
- No hotfix path: the handoffs are slow when production is down
- Young project with no tagged releases; skills change often

## Sources

- [GitHub: eai-org/agent-toolkit](https://github.com/eai-org/agent-toolkit) (README, `docs/core-philosophy.md`, `skills/*/SKILL.md`; commit `bc5e2cd`; verified 2026-11-04)
- [Task workflow docs](https://eai-org.github.io/agent-toolkit-docs/task-workflow/)

## Related

- [Comparison Matrix](../comparison.md)
- [Superpowers](superpowers.md): also per-task fresh context, but auto-triggered and TDD-gated
- [The Refine-Plan-Act pattern](https://medium.com/engineering-in-the-age-of-ai/the-refine-plan-act-pattern-for-agentic-ai-coding-59ee013e4427): the article the toolkit's README links for the pattern
