# GSD (Get Shit Done)

**Type:** Meta-prompting and context-engineered SDD system
**Repository:** https://github.com/gsd-build/get-shit-done
**Website:** https://gsd.build
**Status:** Production-ready
**License:** Open source
**Current Version:** v1.20.6 (February 23, 2026)
**Traction:** 11.9K+ GitHub stars. Used by engineers at Amazon, Google, and Shopify.

## Core Approach

GSD is a spec-driven development framework born as a reaction to the perceived complexity of BMad and Spec-Kit. Its creator explicitly states: "I'm a solo developer. I don't write code — Claude Code does. But other SDD tools seem to complicate everything with sprint ceremonies, story points, retrospectives and Jira workflows."

GSD focuses on solving **context rot** — the measurable degradation in LLM output quality as context windows fill up (peak quality at 0–30%, rushing at 50%+, hallucinations at 70%+). Basic vibe coding works for simple tasks but collapses on complex projects.

## Key Features

- **Thin Orchestrator Architecture:** Each orchestrator maintains 30–40% context by spawning subagents via the Task() tool. Each subagent operates with a fresh 200K context window
- **Aggressive Atomicity:** Each plan is 2–3 tasks, designed to fit in ~50% of a fresh context window. No single task is big enough to degrade quality
- **Wave-based Parallelization:** Pre-computed wave assignments during planning. The planner analyzes dependencies and file conflicts, assigns wave numbers in `PLAN.md` frontmatter. Independent tasks run in parallel; dependent tasks wait
- **Goal-backward Verification:** Instead of "what tasks did we do?", GSD asks "what must be TRUE for this to work?" — testing observable behaviors, not implementation details
- **Atomic Commits:** Every task produces its own git commit for traceability and easier bisecting/reverts
- **Plans as Prompts:** The `PLAN.md` file isn't a document that becomes a prompt — it IS the executable instruction. Subagents read it directly
- **File Artifact System:** `.planning/` directory serves as persistent memory and single source of truth

## How It Works

GSD uses **fresh subagent contexts** instead of one long session that gradually degrades. Each subagent gets a clean 200K token context window. Task 50 has the same quality as Task 1 — no degradation.

### Execution Model

1. **Planning Phase:** The orchestrator creates atomic plans with wave assignments
2. **Wave Execution:** Wave 1 might run three plans simultaneously. Wave 2 waits for Wave 1, then runs
3. **Per-Task Isolation:** Each task runs in a fresh context, reads `PLAN.md`, implements, verifies, commits
4. **Verification:** Goal-backward checks validate observable behaviors

### Multi-Platform Support

GSD works as a lightweight system for LLM runtimes including:
- Claude Code
- OpenCode
- Gemini CLI

A community fork called **GSD Multi** (`shoootyou/get-shit-done-multi`) extends support further with a template-based installer that deploys working AI assistant skills and agents to multiple platforms with a single command. All platforms share the same workflow and project state.

## Installation

```bash
# Global install
npx get-shit-done-cc@latest --global

# Local (project) install
npx get-shit-done-cc@latest --local
```

## How It Compares

**vs. Spec-Kit:** GSD is lighter — no constitution, no rigid phase gates. Focused on context management and execution, not planning ceremony.

**vs. BMad Method:** GSD is explicitly a reaction against BMad's complexity. Solo developer ergonomics vs. enterprise agile simulation.

**vs. OpenSpec:** GSD occupies a similar niche (lightweight, practical) but focuses on context rot and parallelism rather than change management and brownfield development.

**vs. Ralph Loop:** Both solve context degradation through fresh agent contexts. GSD adds wave-based parallelism and structured planning on top. Ralph Loop is a purer, more minimal execution pattern.

## Best For

- Solo developers using Claude Code as their primary coding tool
- Complex projects that exceed single-context capacity
- Teams wanting structured SDD without enterprise ceremony
- Projects requiring parallel task execution
- Developers experiencing context rot in long sessions

## Limitations

- Opinionated toward Claude Code (other runtimes are secondary)
- Less comprehensive than BMad for enterprise workflows
- No brownfield-specific features (unlike OpenSpec's delta specs)
- No spec persistence — plans are consumed, not maintained as living documents
- No explicit git worktree support

## Notable Results

- An industrial automation company used GSD to develop predictive maintenance algorithms for CNC machinery, with 3 developers producing output equivalent to a team of 8
- One user completed 23 plans across 4 phases in ~4 days, with each task getting Claude's full attention without context degradation

## Recent Changes (v1.20.x, February 2026)

- Context window monitor hooks with WARNING/CRITICAL alerts
- Nyquist validation layer for plan-phase quality checks
- Refactored installer into 11 domain modules
- Added support for Gemini CLI and Codex runtimes
- GSD Multi fork extends to additional platforms with template-based installer

## Sources

- [gsd.build](https://gsd.build)
- [GitHub: gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)
- [GSD Framework Deep Dive — Claude Code for Everyone](https://ccforeveryone.com/gsd)
- [DeepWiki: GSD Architecture](https://deepwiki.com/gsd-build/get-shit-done)
- [GSD Framework: The System Revolutionizing Development](https://pasqualepillitteri.it/en/news/169/gsd-framework-claude-code-ai-development)
- [GSD Multi Fork](https://github.com/shoootyou/get-shit-done-multi/)

## Related

- [Comparison Matrix](../comparison.md)
- [Recommendations](../recommendations.md)
- [Ralph Loop](ralph-loop.md) — complementary execution pattern
- [Gaps: New Frameworks](../gaps.md)
