# Kiro

**Type:** Agentic IDE and CLI
**Website:** https://kiro.dev
**Repository:** https://github.com/kirodotdev/Kiro
**Status:** Free during preview (AWS-backed)
**License:** Proprietary (free preview)

## Core Approach

Lightweight, VS Code-based agentic IDE with flexible "steering" (memory bank). Three-step workflow: Requirements → Design → Tasks. Uses EARS notation for acceptance criteria.

Built by a small, opinionated team within AWS. Pioneered spec-driven development approach for AI coding.

## Spec-Driven Development Approach

Kiro takes natural language prompts and turns them into:
- Clear requirements and acceptance criteria in EARS notation
- Explicit intent and constraints
- Structured user stories
- Architecture, system design, and tech stack analysis

The process:
1. Creates a markdown file describing user stories
2. Analyzes codebase
3. Generates architecture, system design, and tech stack that meets needs

## Key Features

- **Autopilot Mode:** Agents autonomously execute complex tasks without step-by-step guidance
- **Agent Hooks:** Background automation triggered by file saves or custom events
- **Multimodal Input:** Process UI designs, whiteboard photos, and images to guide implementation
- **Terminal-based CLI:** For macOS and Linux
- **IDE Support:** VS Code extensions, themes, and settings
- **Native MCP Integration:** Model Context Protocol for connecting external tools
- **Real-time Credit Tracking:** Per-prompt usage monitoring
- **Git Integration:** Commit message generation
- **Intelligent Error Diagnostics:** Syntax and type error detection
- **Code Diffs:** Step-through approval workflows
- **Steering Files:** Project-specific configuration and context

## AI Models

Users can select:
- **Claude Sonnet 4.5** for advanced reasoning
- **Auto mode** - Balances quality, latency, and cost using frontier models with intelligent caching

## Development Features

- Multi-language support (Python, JavaScript, TypeScript, Rust, Go, etc.)
- Intelligent error diagnostics for syntax and type errors
- Code diffs with step-through approval workflows
- Steering files for project-specific configuration
- Enterprise-grade security and privacy

## Installation

```bash
curl -fsSL https://cli.kiro.dev/install | bash
```

Available on macOS and Linux, with authentication through:
- GitHub
- Google
- AWS Builder ID
- IAM Identity Center

## Best For

- Developers wanting an integrated IDE experience
- Teams needing multimodal input capabilities
- Projects requiring background automation
- AWS ecosystem users
- Developers who prefer lightweight, three-step workflows
- Teams wanting autopilot autonomous execution

## Limitations

- Proprietary platform (vendor lock-in risk)
- Currently free, future pricing unknown
- Can generate excessive specs for small changes ("sledgehammer to crack a nut")
- Less clear long-term maintenance strategy for specs
- No explicit git worktree support mentioned
- Terminal/IDE only (no web interface)

## Related

- [Comparison Matrix](../comparison.md)
- [Critical Analysis](../critical-analysis.md)
