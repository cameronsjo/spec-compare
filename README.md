# Spec-Driven Development Tools Comparison

A comprehensive research and comparison of spec-driven development (SDD) tools for AI-assisted coding, including analysis of git worktree support, architectural approaches, and practical recommendations.

## Overview

This repository contains in-depth research comparing spec-driven development tools, agent orchestration, and the emerging execution layer for AI-assisted coding.

## 🔮 Live site

An interactive, Artificer-themed visualizer of this research:
**[cameronsjo.github.io/spec-compare](https://cameronsjo.github.io/spec-compare/)**

- **Compare workflows** — step the same scenario (trivial change, greenfield, refactor, bug fix, parallel dev, cross-cutting) through all eight core tools in lockstep and watch OpenSpec's short path contrast with BMad's long one.
- **Feature matrix** — sortable, filterable capability table aggregated live from the data.
- **Scoring heatmap** — all eighteen tools across seven use-case dimensions, color-graded 1–5.
- **Decision guide** — an interactive flowchart that walks you to a recommended tool.
- **Tool profiles** — per-tool metadata, key features, and limitations.

Every value is extracted from the research docs below — no fabricated attributes.

### Developing the site

The site lives in [`site/`](site/) — a React + Vite + TypeScript app on a vendored copy of the Artificer design system. Each tool is one JSON file under `site/src/data/tools/`, auto-discovered and AJV-validated against `schema.json`; the matrix and heatmap are *derived* by aggregating across those files (single source of truth).

```bash
cd site
npm install
npm run dev        # local dev server
npm run validate   # AJV-validate every tool JSON + cross-tool invariants
npm run build      # validate → tsc → vite build (outputs site/dist/)
npm run preview    # serve the production build locally
```

Pushing to `main` builds and publishes `site/dist/` to GitHub Pages via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### Core SDD Tools (Original Comparison)

- **GitHub Spec-Kit** - Open-source CLI toolkit for greenfield projects
- **Spec Kitty** - Community fork with built-in git worktree orchestration
- **BMad Method** - Enterprise framework with 21 specialized AI agents
- **OpenSpec** - Lightweight change-management for brownfield projects
- **Kiro** - AWS-backed agentic IDE, GA since Nov 2025 (paid tiers + CLI)
- **Tessl** - Spec-as-source platform; public Framework + Registry ($125M raised)

### Core Additions (May 2026)

- **Superpowers** - MIT skills framework + methodology; brainstorm → plan → subagent TDD (~214K stars)
- **Traycer** - Commercial VS Code Plan → Execute → Verify layer over your agent (100K+ users)

### Additional SDD Tools (Emerging)

- **GSD** - Meta-prompting SDD system with wave-based context management (63.8K stars)
- **Ralph Loop** - Stateless iterative execution pattern by Geoffrey Huntley
- **Zencoder/Zenflow** - Commercial SDD control plane; free Zenflow desktop app
- **Kilo Code** - Open-source agentic platform with Memory Bank ($8M seed, 1.5M users)
- **Conductor** - macOS parallel agent runner using git worktrees
- **PromptX** - AI agent context platform via MCP (gap entry)
- **MUSUBI** - Maximally-rigorous SDD framework, marginal (~57 stars, stalled)

### Emerging Additions (July 2026)

- **MoAI-ADK** - Go CLI wrapping Claude Code in a SPEC-First Plan→Run→Sync lifecycle with TDD gates (~1.1K stars)
- **Frame** - Electron "Agentic Development Environment" orchestrating parallel agents in isolated worktrees
- **GRACE** - Contract-first Graph-RAG methodology as installable agent skills (XML artifacts, drift detection)
- **GAAI** - Governed autonomous delivery: Discovery → git-tracked backlog → Delivery daemon (source-available, ELv2)
- **Smart Ralph** - Claude Code/Codex plugin layering spec phases on the Ralph autonomous loop

## Key Findings

### The Modification Problem

**Critical Gap:** Most SDD tools excel when requirements are clear upfront but struggle with iterative changes like "change button from blue to green."

- **OpenSpec** - Purpose-built for modifications with delta format (ADDED, MODIFIED, REMOVED)
- **Tessl** - Spec-as-source enables edit-and-regenerate (Framework now public)
- **Spec-Kit** - Requires `/speckit.clarify` workaround, not optimized for small changes
- **Kiro/BMad** - "Sledgehammer to crack a nut" problem for trivial changes

See [Iterative Development Analysis](docs/iterative-development.md) and [Use Case Scoring](docs/use-case-scoring.md) for details.

### Git Worktree Support

**Spec Kitty pioneered built-in git worktree support among SDD tools** (Superpowers, Conductor, and Zencoder/Zenflow now automate worktrees too), enabling:
- Automatic worktree creation per feature
- Parallel feature isolation without branch switching
- Automated cleanup on merge

### SDD Maturity Levels

1. **Spec-First**: Specs precede coding but are discarded (Spec-Kit, Kiro, BMad)
2. **Spec-Anchored**: Specs persist and evolve (OpenSpec, Spec Kitty)
3. **Spec-as-Source**: Only specs are edited, code auto-generates (Tessl)

## Documentation

The research is organized into focused, digestible documents:

### Individual Tool Profiles
- [GitHub Spec-Kit](docs/tools/spec-kit.md) - Open-source CLI toolkit
- [Spec Kitty](docs/tools/spec-kitty.md) - Community fork with worktree support
- [BMad Method](docs/tools/bmad-method.md) - Enterprise framework with 21 agents
- [OpenSpec](docs/tools/openspec.md) - Lightweight change management
- [Kiro](docs/tools/kiro.md) - AWS-backed agentic IDE (GA)
- [Tessl](docs/tools/tessl.md) - Spec-as-source platform (public Framework + Registry)
- [Superpowers](docs/tools/superpowers.md) - Auto-triggered skills + methodology, any harness
- [Traycer](docs/tools/traycer.md) - Spec-driven Plan → Execute → Verify layer (VS Code)
- [GSD (Get Shit Done)](docs/tools/gsd.md) - Context-engineered SDD for solo developers
- [Ralph Loop](docs/tools/ralph-loop.md) - Stateless iterative execution pattern

### Analysis & Recommendations

- [Comparison Matrices](docs/comparison.md) - Side-by-side feature comparisons (incl. AGENTS.md support)
- [Use Case Scoring](docs/use-case-scoring.md) - 12 real-world scenarios graded + expanded 18-tool heatmap
- [Iterative Development](docs/iterative-development.md) - Spec modification workflows
- [Git Worktree Support](docs/git-worktree-support.md) - Detailed worktree analysis (updated with Beads, Conductor)
- [Recommendations](docs/recommendations.md) - Decision frameworks by use case
- [Critical Analysis](docs/critical-analysis.md) - Concerns, critiques, and future outlook
- [Sources](docs/sources.md) - All citations and references

### Orchestration & Execution Layer
- [Orchestration Landscape](docs/landscape.md) - 30+ multi-agent tools surveyed, including Claude Code Agent Teams
- [Beads, Agent Mail & Gas Town](docs/beads.md) - Agent memory, messaging, and multi-agent villages
- [Gaps: New Frameworks](docs/gaps.md) - Zencoder, Kilo Code, Conductor, PromptX, MUSUBI (GSD, Ralph Loop, Superpowers & Traycer promoted to full profiles)
- [May 2026 Reassessment](docs/reassessment-2026-05-31.md) - Version/status re-verification + new-tool findings
- [July 2026 Reassessment](docs/reassessment-2026-07-23.md) - Five emerging additions + version spot-check
- [Beads + OpenSpec Cheatsheet](docs/cheatsheet-beads-openspec.md) - Practical setup and daily workflow

## Quick Comparison

| Tool | License | Git Worktrees | Best For | Maturity |
|------|---------|---------------|----------|----------|
| **Spec-Kit** | Open Source | No | Greenfield projects | Production (v1.0.1) |
| **Spec Kitty** | Open Source | **Yes** | Parallel development | Active Dev (v3.2.5) |
| **BMad Method** | Open Source | No | Enterprise workflows | Stable (v6.8.0) |
| **OpenSpec** | MIT | No | Brownfield changes | Production (v1.11.0) |
| **Kiro** | Proprietary | No | IDE experience | GA (v0.12.x) |
| **Tessl** | Proprietary | No | Spec-as-source | Active Dev (public) |
| **Superpowers** | MIT | **Yes** | Disciplined autonomous dev | Active Dev (v6.3.0) |
| **Traycer** | Proprietary | No | Plan-first orchestration | Active Dev |

> **Known stale versions:** the July 2026 sweep found Kiro at 1.0, Spec-Kit at v0.14.1, and Superpowers at v6.1.1. Each moved by more than a version string, so they are tracked in a follow-up rather than bumped in place — see [the sweep doc](docs/reassessment-2026-07-23.md#part-a--version-drift-tracked-tools).

## Recommendations

### For Git Worktree Users

**Use Spec Kitty** - The most complete built-in worktree management + parallel feature isolation among SDD tools (Superpowers also automates worktrees via its skill).

### For Simplicity
**Use OpenSpec** - Lightweight change management without excessive overhead.

### For Enterprise
**Use BMad Method** - Comprehensive workflows with 21 specialized agents.

### For Greenfield Projects
**Use Spec-Kit** - Battle-tested, constitution-driven development.

### For Experimentation
**Try Kiro or Tessl** - Kiro is GA (free tier + paid); Tessl's Framework + Registry is now public.

## Critical Perspectives

The research includes analysis of:
- **The Waterfall Question**: Does SDD reintroduce waterfall bureaucracy?
- **AI Adherence Issues**: Agents frequently ignore specifications
- **Scalability Concerns**: Unclear when SDD adds value vs. overhead
- **Historical Parallels**: Similarities to failed Model-Driven Development (MDD)

## Market Context

- 25% of Y Combinator Winter 2025 cohort has 95% AI-generated codebases
- Industry leaders predict developers won't look at code by 2027
- Specifications becoming "the fundamental unit of programming"

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Sources

All research is compiled from publicly available sources including:
- Official tool documentation and repositories
- Industry blog posts and articles
- Comparative analyses from Martin Fowler, Medium, and others
- Critical perspectives from Marmelab, RedMonk, and Thoughtworks

Full source citations are available in [docs/sources.md](docs/sources.md).

## Contact

For questions, issues, or suggestions, please open an issue on GitHub.

---

**Last Updated:** 2026-08-28
