# Gaps: SDD Frameworks Discovered Since v1.0.0

> Research date: February 2026; reassessed May 2026. These frameworks were not covered in the original comparison (November 2025). Each is noted here as a gap for potential future analysis. The May 2026 sweep promoted **Superpowers** and **Traycer** to full core profiles and added a marginal **MUSUBI** entry — see [reassessment-2026-05-31.md](reassessment-2026-05-31.md).

## New SDD Frameworks

### GSD (Get Shit Done)

Promoted to full tool profile. See [GSD Tool Profile](tools/gsd.md).

---

### Ralph Loop (Ralph Wiggum Technique)

Promoted to full tool profile. See [Ralph Loop Tool Profile](tools/ralph-loop.md).

---

### Superpowers

Promoted to full core profile (May 2026). See [Superpowers Tool Profile](tools/superpowers.md). An MIT-licensed, ~214K-star agentic skills framework + methodology by Jesse Vincent (obra): auto-triggering skills enforce brainstorm → plan → subagent TDD → review → finish across Claude Code, Codex, Cursor, Copilot, and more.

---

### Traycer

Promoted to full core profile (May 2026). See [Traycer Tool Profile](tools/traycer.md). A commercial VS Code extension (100K+ users) that layers a Plan → Execute → Verify loop over the agent you already use, with an Epic Mode that generates PRDs, specs, and wireframes and turns plans into an agent-sized ticket system.

---

### MUSUBI (marginal)

**What it is:** A maximally rigorous SDD framework (`nahisaho/MUSUBI`, MIT) synthesizing six frameworks: 7 agents × 31 skills, EARS-format requirements, a 9-article constitution with Phase -1 gates, full Requirement→Design→Code→Test traceability, C4 diagrams, and delta specs for brownfield.

**Gap assessment:** A useful "maximum rigor" reference point, but adoption is tiny (**~57 stars**) and the repo has **no commits since 2026-01-01** — likely stalled. Noted here rather than tracked as a full profile until it shows renewed activity.

**Sources:**
- [GitHub: nahisaho/MUSUBI](https://github.com/nahisaho/MUSUBI)
- [npm: musubi-sdd](https://www.npmjs.com/package/musubi-sdd)

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

### archiet-microcodegen (marginal)

**What it is:** A single-file, MIT-licensed deterministic code generator (`Anioko/microcodegen`) that compiles a regex-parsed PRD into a bootable Flask app ZIP via `string.Template` rendering — no LLM in the open-source generation path, pure stdlib, zero dependencies. It is the open-source reference component of **archiet.com**, a commercial spec-driven platform (REQARCHITECT LTD). Companion per-stack packages exist on npm (NestJS), PyPI (Flask/Django), Packagist (Laravel), NuGet (.NET), and the Go proxy.

**Why it's interesting:** It stakes out a genuinely distinct point in the SDD space — deterministic model-to-text (M2T) templating rather than LLM inference, so the generated app's *structure* is reproducible and the OSS tool runs offline.

**Gap assessment:** Noted here rather than profiled. Adoption is near zero (algorithm repo **~4★**; the SDD-guide repo, created the day its inclusion PR opened, is **0★**) — below even the MUSUBI marginal line. Several headline claims also don't hold up on inspection: every published package is **pre-1.0** (core PyPI `archiet-microcodegen` 0.2.3, June 2026), not the "Stable v1.0.x" advertised; two of the ten claimed ecosystems — a RubyGems `*-rails` gem and a crates.io `*-tauri` crate — **do not exist**; the "same spec → same ZIP, reproducible for CI/audit" claim is undercut by **per-ZIP random secret injection** (`secrets.token_urlsafe(32)`); and the file's own docstring notes the full (commercial) pipeline uses "a chunked LLM extractor," so "zero LLM" describes the teaser, not the product. Like Zencoder/Tessl, it's the free OSS lead-in to a paid platform ($104–$2,099/mo). Revisit for a full profile if it ships a real 1.0, multi-stack registry parity actually lands, and adoption clears the bar.

**Sources:**
- [GitHub: Anioko/microcodegen](https://github.com/Anioko/microcodegen) (algorithm)
- [GitHub: Anioko/spec-driven-development](https://github.com/Anioko/spec-driven-development) (guide)
- [PyPI: archiet-microcodegen](https://pypi.org/project/archiet-microcodegen/)
- [archiet.com](https://archiet.com) (commercial platform)
- [Inclusion PR #12](https://github.com/cameronsjo/spec-compare/pull/12)

---

## Updates to Existing Tools

### May 2026 reassessment

Verified against source repos on 2026-05-31 (full detail in [reassessment-2026-05-31.md](reassessment-2026-05-31.md)):

- **Kiro → GA.** General availability since 2025-11-17 (team support, Kiro CLI, checkpointing, property-based tests); now on paid tiers (Pro $20 / Pro+ $40 / Power $200 per month) plus a free tier. Current IDE v0.12.x added Parallel Task Execution, Quick Plan, and Requirements Analysis. AWS is sunsetting Amazon Q Developer in favor of Kiro.
- **Tessl → public Framework + Registry.** No longer closed beta; raised ~$125M (Series A led by Index). Repositioned as an Agent Enablement Platform — Framework installs as "tiles" into `.tessl/` and teaches any MCP agent the workflow; the versioned Spec Registry is "npm for specifications."
- **Spec-Kit** v0.1.5 → **v0.8.18** (107K★, 30+ agent integrations). **Spec Kitty** v0.13.5 → **v3.1.9** (acceptance matrix, negative invariants). **Kilo Code** v4.148.1 → **v7.3.16**. **GSD** v1.20.6 → **v1.42.3** (11.9K → 63.8K★). **OpenSpec** v1.2.0 → **v1.3.1**. **Zencoder/Zenflow** now ships a free standalone desktop app with a control plane and auto-worktrees.

### BMad Method → v6.8.0

BMad Method V6 is stable and continues steady releases (v6.0.2 in February → **v6.8.0** on 2026-05-25; ~48.4K★):

- Now **21 specialized agents** (up from 19) across 4 official modules
- **50+ guided workflows** (up from prior count)
- **BMad Builder** via NPX for custom standalone agents, workflows, and modules
- **AI-assisted help** (`/bmad-help`) for guided onboarding
- Cross-File Reference Validator preventing ~25% of historical bugs
- New PRD workflow steps for vision/differentiators and executive summaries
- Community marketplace and Skills Architecture on roadmap

**Source:** [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [npm: bmad-method](https://www.npmjs.com/package/bmad-method)

### OpenSpec → v1.3.1 (Profiles, Pi & Kiro Support)

OpenSpec has reached v1.3.1 (April 2026; ~51.9K★), building on the v1.0 foundation:

- **Action-based workflow:** Replaced rigid proposal → apply → archive with flexible actions (v1.0)
- **Dynamic instructions:** AI instructions assembled from three layers (context, rules, templates) (v1.0)
- **Semantic spec syncing:** Delta specs parsed at the requirement level, not brittle header matching (v1.0)
- **Agent Skills:** Single `.claude/skills/` directory replaces 8+ scattered config files (v1.0)
- **Profiles:** Core (4 workflows) or custom subset selection (v1.2.0)
- **Propose Workflow:** One-shot change proposal generation (v1.2.0)
- **Pi & Kiro support:** Two new AI tools added alongside existing 21 (v1.2.0)
- **AI Tool Auto-Detection:** `openspec init` scans for existing tool directories (v1.2.0)

**Source:** [openspec.dev](https://openspec.dev/), [GitHub Releases](https://github.com/Fission-AI/OpenSpec/releases)

## Academic Coverage

### ArXiv Paper: Spec-Driven Development (February 2026)

[Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants](https://arxiv.org/abs/2602.00180) — Deepak Babu Piskala (submitted January 30, 2026)

This paper provides practitioners with a comprehensive guide to SDD, covering principles, workflow patterns, and supporting tools. It formalizes the three levels of specification rigor (spec-first, spec-anchored, spec-as-source) that this comparison also identifies, lending academic validation to the taxonomy.

## Related

- [Use Case Scoring — Expanded Heatmap](use-case-scoring.md#expanded-heatmap-including-new-tools) — 13-tool scoring matrix including these frameworks
- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical workflow combining OpenSpec with Beads
- [Beads](beads.md) — Agent memory layer
- [Orchestration Landscape](landscape.md) — Agent Teams, multi-agent tools
- [Git Worktree Support](git-worktree-support.md) — Updated worktree analysis
- [Comparison Matrix](comparison.md) — Original six-tool comparison
- [Recommendations](recommendations.md) — Decision frameworks including new tools
