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

**Current Version:** VS Code extension v4.148.1 (January 17, 2026). Kilo CLI launched February 3, 2026 (`npm install -g @kilocode/cli`). Kilo Code Reviewer launched January 27, 2026 for automated AI-powered PR reviews.

**Key differentiators:**
- **Structured Modes:** Ask, Architect, Code, Debug, Orchestrator, and Custom modes — each tuned to a different development phase
- **Memory Bank:** Durable, project-level recall via structured markdown files (architectural decisions, conventions, historical notes)
- **Model Agnostic:** OpenAI, Anthropic, Google, Mistral, Meta Llama, self-hosted — 500+ models
- **Multi-Platform:** VS Code, JetBrains, Cursor, Windsurf, and standalone CLI (new)
- **Parallel Agents:** Run multiple AI agents simultaneously
- **CLI:** Production-ready model-agnostic CLI for agentic code generation, with `--auto` flag for CI/CD pipelines

**Gap assessment:** Kilo Code isn't strictly an SDD tool, but its Architect mode and Memory Bank overlap with SDD concerns. Its structured mode system (especially Architect → Code → Debug) mirrors the SDD workflow of specify → plan → implement. The new CLI launch and Code Reviewer make it increasingly relevant as a full platform.

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

**Current Version:** v0.36.3 (February 23, 2026). Recent additions include integrated terminal respecting tool version managers (mise, asdf, rbenv), submitting prompts to coding agents within Conductor, git panel file grouping (Uncommitted/Committed sections), diff commenting with GitHub synchronization, and updated Anthropic Agent SDK to 2.1.50.

**Limitations:** macOS (Apple Silicon) only. No enterprise features (Jira, signed commits, multi-user coordination). Intel Mac support under development; Windows and Linux not supported.

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

### BMad Method → V6 Stable (v6.0.2)

BMad Method V6 has reached stable (no longer alpha/beta) as of February 2026:

- Now **21 specialized agents** (up from 19) across 4 official modules
- **50+ guided workflows** (up from prior count)
- **BMad Builder** via NPX for custom standalone agents, workflows, and modules
- **AI-assisted help** (`/bmad-help`) for guided onboarding
- Cross-File Reference Validator preventing ~25% of historical bugs
- New PRD workflow steps for vision/differentiators and executive summaries
- Community marketplace and Skills Architecture on roadmap

**Source:** [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [npm: bmad-method](https://www.npmjs.com/package/bmad-method)

### OpenSpec → v1.2.0 (Profiles, Pi & Kiro Support)

OpenSpec has reached v1.2.0 (February 2026), building on the v1.0 foundation:

- **Action-based workflow:** Replaced rigid proposal → apply → archive with flexible actions (v1.0)
- **Dynamic instructions:** AI instructions assembled from three layers (context, rules, templates) (v1.0)
- **Semantic spec syncing:** Delta specs parsed at the requirement level, not brittle header matching (v1.0)
- **Agent Skills:** Single `.claude/skills/` directory replaces 8+ scattered config files (v1.0)
- **Profiles:** Core (4 workflows) or custom subset selection (v1.2.0)
- **Propose Workflow:** One-shot change proposal generation (v1.2.0)
- **Pi & Kiro support:** Two new AI tools added alongside existing 21 (v1.2.0)
- **AI Tool Auto-Detection:** `openspec init` scans for existing tool directories (v1.2.0)
- 25,217 GitHub stars

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
