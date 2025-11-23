# Spec-Driven Development Tools Comparison

A comprehensive research and comparison of spec-driven development (SDD) tools for AI-assisted coding, including analysis of git worktree support, architectural approaches, and practical recommendations.

## Overview

This repository contains in-depth research comparing six major specification-driven development tools:

- **GitHub Spec-Kit** - Open-source CLI toolkit for greenfield projects
- **Spec Kitty** - Community fork with built-in git worktree orchestration
- **BMad Method** - Enterprise framework with 19 specialized AI agents
- **OpenSpec** - Lightweight change-management for brownfield projects
- **Kiro** - AWS-backed agentic IDE with multimodal input
- **Tessl** - Experimental spec-as-source platform

## Key Findings

### Git Worktree Support

**Spec Kitty is the only tool with built-in git worktree support**, enabling:
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
- [BMad Method](docs/tools/bmad-method.md) - Enterprise framework with 19 agents
- [OpenSpec](docs/tools/openspec.md) - Lightweight change management
- [Kiro](docs/tools/kiro.md) - AWS-backed agentic IDE
- [Tessl](docs/tools/tessl.md) - Experimental spec-as-source platform

### Analysis & Recommendations
- [Comparison Matrices](docs/comparison.md) - Side-by-side feature comparisons
- [Git Worktree Support](docs/git-worktree-support.md) - Detailed worktree analysis
- [Recommendations](docs/recommendations.md) - Decision frameworks by use case
- [Critical Analysis](docs/critical-analysis.md) - Concerns, critiques, and future outlook
- [Sources](docs/sources.md) - All citations and references

## Quick Comparison

| Tool | License | Git Worktrees | Best For | Maturity |
|------|---------|---------------|----------|----------|
| **Spec-Kit** | Open Source | No | Greenfield projects | Production |
| **Spec Kitty** | Open Source | **Yes** | Parallel development | Active Dev |
| **BMad Method** | Open Source | No | Enterprise workflows | Alpha/Stable |
| **OpenSpec** | MIT | No | Brownfield changes | Production |
| **Kiro** | Proprietary | No | IDE experience | Preview |
| **Tessl** | Proprietary | No | Spec-as-source | Beta |

## Recommendations

### For Git Worktree Users
**Use Spec Kitty** - Only tool with built-in worktree management and parallel feature isolation.

### For Simplicity
**Use OpenSpec** - Lightweight change management without excessive overhead.

### For Enterprise
**Use BMad Method** - Comprehensive workflows with 19 specialized agents.

### For Greenfield Projects
**Use Spec-Kit** - Battle-tested, constitution-driven development.

### For Experimentation
**Try Kiro or Tessl** - Cutting-edge approaches with free preview/beta access.

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

**Last Updated:** 2025-11-23
