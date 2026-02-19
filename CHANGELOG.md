# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Beads research** (`docs/beads.md`) — Deep analysis of Steve Yegge's distributed graph issue tracker, MCP Agent Mail, and Gas Town agent village
- **Orchestration landscape** (`docs/landscape.md`) — Comprehensive survey of 30+ multi-agent orchestration tools across 13 categories
- **Gaps analysis** (`docs/gaps.md`) — Five newly discovered SDD frameworks (GSD, Ralph Loop, Zencoder/Zenflow, Kilo Code, Conductor) plus updates to BMad v6 and OpenSpec v1.0
- **Beads + OpenSpec cheatsheet** (`docs/cheatsheet-beads-openspec.md`) — Practical setup and daily workflow guide for combining Beads with OpenSpec, including multi-agent worktree setup
- **Agent Configuration Support table** (`docs/comparison.md`) — New comparison of AGENTS.md, CLAUDE.md, SKILL.md, and slash command support across all tools
- **Expanded heatmap** (`docs/use-case-scoring.md`) — 11-tool scoring matrix across 7 dimensions including context management
- **Claude Code Agent Teams** (`docs/landscape.md`) — Full documentation of Anthropic's experimental preview (formerly hidden TeammateTool): 11 operations, 5 orchestration patterns, sub-agent comparison table
- **Git worktree ecosystem update** (`docs/git-worktree-support.md`) — Beads worktree architecture, Conductor, known challenges, three-layer model
- **ArXiv paper reference** (`docs/gaps.md`) — Academic coverage of SDD from February 2026

### Changed

- **OpenSpec v1.0 rewrite** (`docs/tools/openspec.md`) — Documented action-based workflow, three-layer dynamic instructions, semantic spec syncing, and unified skills directory
- **Execution layer recommendations** (`docs/recommendations.md`) — New section for Beads, Agent Teams, GSD, Conductor; four recommended stacks by team type
- **Sources expanded** (`docs/sources.md`) — 40+ new citations across Agent Teams, Beads, Agent Mail, Gas Town, GSD, Ralph Loop, Zencoder, Kilo Code, Conductor, AGENTS.md, and ArXiv paper
- **README restructured** (`README.md`) — New tools section, orchestration & execution layer docs section, updated date
- Updated TeammateTool section to Agent Teams experimental preview with full architecture documentation
- Added AGENTS.md/CLAUDE.md/SKILL.md support rows to detailed feature matrix
- Expanded use-case scoring heatmap from 6 to 11 tools with "Context Management" dimension
- Updated git worktree analysis with Beads shared database model and Conductor
- Fixed emoji table Overall scores (were inflated by 0.2–0.6)
- Updated CONTRIBUTING.md file tree to reflect actual repo structure
- Updated stale "six tools" reference in critical-analysis.md
- Added cross-references across all existing docs

## [1.0.0] - 2025-11-23

### Added

- Initial comprehensive comparison of six spec-driven development tools
- Detailed analysis of GitHub Spec-Kit
- Detailed analysis of Spec Kitty (Priivacy-ai)
- Detailed analysis of BMad Method
- Detailed analysis of OpenSpec (Fission-AI)
- Detailed analysis of Kiro
- Detailed analysis of Tessl
- Git worktree support analysis across all tools
- Comparison matrices for features, licensing, and use cases
- Architectural approaches documentation (Spec-First, Spec-Anchored, Spec-as-Source)
- Critical analysis section covering waterfall concerns, AI adherence issues, and scalability
- Decision framework for choosing appropriate tools
- Recommendations by use case (solo developers, teams, enterprise, brownfield, greenfield)
- Industry trends and future outlook
- Comprehensive source citations
- Project documentation (README, CONTRIBUTING, CHANGELOG, LICENSE)
- Git repository initialization

### Research Sources

- GitHub Spec-Kit official repository and documentation
- Spec Kitty repository and documentation
- BMad Method repository and website
- OpenSpec repository and website
- Kiro official website and documentation
- Tessl official website and blog posts
- Martin Fowler comparative analysis
- GitHub blog posts on spec-driven development
- Microsoft developer blog
- Industry articles from RedMonk, Thoughtworks, The New Stack
- Critical perspectives from Marmelab and others

[Unreleased]: https://github.com/USERNAME/spec-compare/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/USERNAME/spec-compare/releases/tag/v1.0.0
