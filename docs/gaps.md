# Gaps: SDD Frameworks Discovered Since v1.0.0

> Research date: February 2026. These frameworks were not covered in the original comparison (November 2025). Each is noted here as a gap for potential future analysis.

## New SDD Frameworks

### GSD (Get Shit Done)

**What it is:** A meta-prompting, context engineering, and spec-driven development system for Claude Code, OpenCode, and Gemini CLI.

**Why it matters:** GSD was born as a reaction to the perceived complexity of BMad and Spec-Kit. Its creator explicitly states: "I'm a solo developer. I don't write code — Claude Code does. But other SDD tools seem to complicate everything with sprint ceremonies, story points, retrospectives and Jira workflows."

**Key differentiators:**
- **Thin Orchestrator Architecture:** Each orchestrator maintains 30-40% context by spawning subagents via the Task() tool. Each subagent operates with a fresh 200k context window
- **Wave-based Parallelization:** Pre-computed wave assignments during planning. The planner analyzes dependencies and file conflicts, assigns wave numbers in `PLAN.md` frontmatter
- **Context Rot Solution:** Addresses quality degradation as context windows fill (0-30% = peak quality; 50%+ = starts rushing; 70%+ = hallucinations)
- **File Artifact System:** `.planning/` directory serves as persistent memory and single source of truth

**Traction:** 11.9K+ GitHub stars. Trusted by engineers at Amazon, Google, and Shopify.

**Install:** `npx get-shit-done-cc --global`

**Gap assessment:** GSD occupies a niche between OpenSpec (lightweight) and Spec-Kit (structured). Its focus on context management and solo developer ergonomics is not represented by any tool in the current comparison.

**Sources:**
- [gsd.build](https://gsd.build)
- [GitHub: glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done)
- [GSD Framework Deep Dive](https://ccforeveryone.com/gsd)

---

### Ralph Loop (Ralph Wiggum Technique)

**What it is:** An iterative AI development methodology by Geoffrey Huntley that runs AI agents in automated loops until specifications are met. Each iteration spawns a new agent process with a clean context window.

**Why it matters:** Ralph addresses a fundamentally different problem than other SDD tools — it's an execution pattern, not a planning system. Named after the Simpsons character, it embodies persistent iteration despite setbacks.

**Key differentiators:**
- **Stateless Execution:** Each loop iteration starts fresh with no memory of previous runs. All state lives on disk and in git
- **One Task Per Loop:** Agent reads specs, picks top task from implementation plan, implements, validates (tests/lint/types), marks done, commits, exits
- **Spec as Source of Truth:** Because the AI's memory is transient, the specification file (`SPEC.md`) must serve as the absolute reference
- **Complementary to OpenSpec:** "Ralph Wiggum without Open Spec is chaos. Open Spec without Ralph Wiggum is fragile."

**Notable results:**
- Geoffrey Huntley built "Cursed" — a complete programming language — via a 3-month continuous loop
- YC hackathon teams shipped 6+ repositories overnight for ~$297 in API costs

**Official plugin:** An Anthropic Claude Code plugin exists for creating autonomous development loops.

**Gap assessment:** Ralph Loop is an execution technique that could be combined with any SDD tool in the current comparison. Its approach of clean context windows per iteration is philosophically opposed to Beads' persistent memory — representing a "fresh start" vs "continuous memory" design tension worth documenting.

**Sources:**
- [Everything is a Ralph Loop — Geoffrey Huntley](https://ghuntley.com/loop/)
- [GitHub: awesome-ralph](https://github.com/snwfdhmp/awesome-ralph)
- [Ralph Wiggum AI Loop Technique](https://awesomeclaude.ai/ralph-wiggum)
- [What is Ralph Loop? — Medium](https://medium.com/@tentenco/what-is-ralph-loop-a-new-era-of-autonomous-coding-96a4bb3e2ac8)

---

### Zencoder / Zenflow

**What it is:** An AI coding platform with a dedicated orchestration layer (Zenflow) for spec-driven workflows, parallel agent execution, and built-in verification.

**Why it matters:** Zencoder is a commercial platform that productizes SDD — rather than being a framework you install, it's a platform you subscribe to.

**Key differentiators:**
- **RED/GREEN/VERIFY loops:** Implementation cycles with automated verification
- **Parallel Execution:** Agents work in independent environments; runs tens or hundreds of agents simultaneously
- **Spec Anchoring:** Agents read specs, PRDs, or architecture docs before writing code
- **Cross-Agent Code Review:** Automated tests and cross-agent review built in
- **IDE Integration:** VS Code, JetBrains, plus native CLI integration with Claude Code and OpenAI Codex

**Zenflow launched:** January 22, 2026 on Product Hunt.

**Gap assessment:** Zencoder/Zenflow is a commercial platform competitor to Kiro and Tessl. It represents the SDD-as-a-Service model. Its parallel agent execution with built-in verification differentiates it from open-source tools.

**Sources:**
- [Zencoder](https://zencoder.ai/)
- [Zenflow](https://zencoder.ai/zenflow)
- [Zencoder SDD Guide](https://docs.zencoder.ai/user-guides/tutorials/spec-driven-development-guide)

---

### Kilo Code

**What it is:** An open-source agentic engineering platform, forked from Roo Code, with structured modes for different development phases.

**Why it matters:** Founded by GitLab co-founder Sid Sijbrandij with $8M in seed funding. Currently #1 on OpenRouter with 1.5M+ users and 25T+ tokens processed.

**Key differentiators:**
- **Structured Modes:** Ask, Architect, Code, Debug, Orchestrator, and Custom modes — each tuned to a different development phase
- **Memory Bank:** Durable, project-level recall via structured markdown files (architectural decisions, conventions, historical notes)
- **Model Agnostic:** OpenAI, Anthropic, Google, Mistral, Meta Llama, self-hosted — 500+ models
- **Multi-Platform:** VS Code, JetBrains, Cursor, Windsurf, and standalone CLI
- **Parallel Agents:** Run multiple AI agents simultaneously

**Gap assessment:** Kilo Code isn't strictly an SDD tool, but its Architect mode and Memory Bank overlap with SDD concerns. Its structured mode system (especially Architect → Code → Debug) mirrors the SDD workflow of specify → plan → implement. Worth monitoring as it scales.

**Sources:**
- [kilo.ai](https://kilo.ai/)
- [GitHub: Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode)
- [Inside Kilo Code — Tessl blog](https://tessl.io/blog/inside-kilo-code-an-open-source-ai-coding-agent-with-plans-to-reshape-software-development/)

---

### Conductor

**What it is:** A macOS desktop app by Melty Labs for running multiple Claude Code and Codex agents in parallel using git worktrees.

**Why it matters:** Conductor solves the "agent runner" problem — how to actually execute multiple agents in parallel with proper isolation.

**Key differentiators:**
- **Automatic Worktree Isolation:** Each workspace is a separate git worktree
- **Unified Review Interface:** Review and merge changes from all agents via diffs
- **Local-First:** Runs entirely on your Mac
- **Free:** No additional cost beyond existing Claude Code/Codex subscriptions

**Limitations:** macOS (Apple Silicon) only. No enterprise features (Jira, signed commits, multi-user coordination).

**Gap assessment:** Conductor is not an SDD tool — it's an agent runner. But it's the most mature solution for the parallel worktree execution that Spec Kitty's workflow assumes. Relevant to the [Git Worktree Support](git-worktree-support.md) analysis.

**Sources:**
- [conductor.build](https://www.conductor.build/)
- [Conductor Docs](https://docs.conductor.build)
- [Hands-On Review — The New Stack](https://thenewstack.io/a-hands-on-review-of-conductor-an-ai-parallel-runner-app/)

---

## Updates to Existing Tools

### BMad Method → V6

The BMad Method has released V6 since our last analysis, representing a complete architectural revolution from the v4 version we originally reviewed:

- Now **21 specialized agents** (up from 19) across 4 official modules
- **50+ guided workflows** (up from prior count)
- **BMad Builder** via NPX for custom standalone agents, workflows, and modules
- **AI-assisted help** (`/bmad-help`) for guided onboarding
- Community marketplace coming with final V6 release

**Source:** [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD)

### OpenSpec → v1.0 with Artifact-Guided Workflow

OpenSpec has shipped v1.0 (January 2026) with a rebuilt workflow:

- **Action-based workflow:** Replaced rigid proposal → apply → archive with flexible actions
- **Dynamic instructions:** AI instructions assembled from three layers (context, rules, templates)
- **Semantic spec syncing:** Delta specs parsed at the requirement level, not brittle header matching
- **Agent Skills:** Single `.claude/skills/` directory replaces 8+ scattered config files

**Source:** [openspec.dev](https://openspec.dev/), [GitHub Releases](https://github.com/Fission-AI/OpenSpec/releases)

## Academic Coverage

### ArXiv Paper: Spec-Driven Development (February 2026)

[Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants](https://arxiv.org/abs/2602.00180) — Deepak Babu Piskala (submitted January 30, 2026)

This paper provides practitioners with a comprehensive guide to SDD, covering principles, workflow patterns, and supporting tools. It formalizes the three levels of specification rigor (spec-first, spec-anchored, spec-as-source) that this comparison also identifies, lending academic validation to the taxonomy.

## Related

- [Use Case Scoring — Expanded Heatmap](use-case-scoring.md#expanded-heatmap-including-new-tools) — 11-tool scoring matrix including these frameworks
- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical workflow combining OpenSpec with Beads
- [Beads](beads.md) — Agent memory layer
- [Orchestration Landscape](landscape.md) — Agent Teams, multi-agent tools
- [Git Worktree Support](git-worktree-support.md) — Updated worktree analysis
- [Comparison Matrix](comparison.md) — Original six-tool comparison
- [Recommendations](recommendations.md) — Decision frameworks including new tools
