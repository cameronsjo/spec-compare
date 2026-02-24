# Gaps: SDD Frameworks Discovered Since v1.0.0

> Research date: February 2026. These frameworks were not covered in the original comparison (November 2025). Each is noted here as a gap for potential future analysis.

## New SDD Frameworks

### GSD (Get Shit Done)

Promoted to full tool profile. See [GSD Tool Profile](tools/gsd.md).

---

### Ralph Loop (Ralph Wiggum Technique)

Promoted to full tool profile. See [Ralph Loop Tool Profile](tools/ralph-loop.md).

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

### PromptX (Deepractice)

**What it is:** An AI agent context platform that provides structured context engineering for AI coding assistants. Accepted by WWW Companion '26 with a paper titled "PromptX: A Cognitive Agent Platform with Long-term Memory."

**Why it matters:** PromptX takes a different approach from other SDD tools — rather than defining a workflow (specify → plan → implement), it focuses on providing rich, structured context to any existing AI coding workflow. It supercharges existing tools (Cursor, Claude Code, etc.) via MCP rather than replacing them.

**Key differentiators:**
- **Context Platform:** Provides structured context layers (knowledge, capabilities, persona) to AI agents rather than prescribing a development workflow
- **MCP-Native:** Integrates as an MCP server, augmenting any compatible coding assistant
- **Cognitive Architecture:** Three components — Nuwa (knowledge), Luban (power), Writer (soul) — model different aspects of agent capability
- **Long-term Memory:** Research-backed approach to persistent agent context across sessions

**Gap assessment:** PromptX occupies a unique position as a context augmentation layer rather than a standalone SDD framework. For teams already satisfied with their AI coding tool but needing deeper, custom context, PromptX fills a gap that no other tool in this comparison addresses. It could complement any SDD tool by enriching the context available during planning and implementation phases.

**Sources:**
- [GitHub: Deepractice/PromptX](https://github.com/Deepractice/PromptX)
- [SDD Framework Comparison including PromptX](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)

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
