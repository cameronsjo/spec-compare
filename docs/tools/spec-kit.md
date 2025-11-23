# GitHub Spec-Kit

**Type:** Open-source CLI toolkit
**Repository:** https://github.com/github/spec-kit
**Status:** Production-ready
**License:** Open source

## Core Approach

Spec-Kit inverts traditional development: specifications become executable, directly generating implementations. It emphasizes "intent as source of truth" over "code as source of truth."

The philosophy is that Product Requirements Documents (PRDs) aren't guides for implementation—they're the source that generates implementation.

## Key Features

### 8 Slash Commands

- `/speckit.constitution` - Establish project governing principles
- `/speckit.specify` - Define requirements and user stories
- `/speckit.plan` - Create technical implementation strategies
- `/speckit.tasks` - Generate actionable task breakdowns
- `/speckit.implement` - Execute tasks to build features
- `/speckit.clarify` - Resolve underspecified areas
- `/speckit.analyze` - Validate consistency across artifacts
- `/speckit.checklist` - Generate quality validation checklists

### Additional Features

- **Constitution Framework:** Establishes immutable architectural principles that guide all development
- **Agent-Agnostic:** Works with Claude Code, GitHub Copilot, Gemini CLI, Cursor, Windsurf, Qwen Code, opencode, Kilo Code, Auggie CLI, CodeBuddy CLI, Roo Code, Codex CLI, Amp, SHAI
- **Multi-Phase Workflow:** Constitution → Specify → Plan → Tasks → Implement
- **Progressive Refinement:** Multi-step process emphasizing intent definition before implementation

## Installation

```bash
# Persistent installation (recommended)
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# One-time usage
uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>
```

## Usage Pattern

1. Initialize project: `specify init <project-name> --ai claude`
2. Launch AI agent in project directory
3. Execute slash commands sequentially to develop features
4. AI generates specifications, plans, and implementations guided by project principles

## Development Phases Supported

- **0-to-1:** Greenfield application development
- **Creative Exploration:** Parallel implementation approaches
- **Iterative Enhancement:** Brownfield modernization and feature additions

## Best For

- Greenfield (0-to-1) projects
- Teams wanting structured AI development
- Projects requiring consistent architectural principles
- Multi-agent coordination
- Establishing organizational standards

## Limitations

- Verbose markdown artifacts requiring extensive review
- Can feel overly rigid for small changes
- Designed primarily for new projects, not brownfield refactoring
- Can feel like "sledgehammer to crack a nut" for small changes
- No built-in git worktree management
- Branch-based workflow assumes linear development

## Related

- [Comparison Matrix](../comparison.md)
- [Spec Kitty](spec-kitty.md) - Community fork with worktree support
- [Git Worktree Support Analysis](../git-worktree-support.md)
