# OpenSpec (Fission-AI)

**Type:** Lightweight spec-driven framework
**Repository:** https://github.com/Fission-AI/OpenSpec
**Website:** https://openspec.dev/
**Status:** Production-ready
**License:** MIT

## Core Approach

Dual-folder model separating current specs (`openspec/specs/`) from proposed changes (`openspec/changes/`). Excels at managing updates to existing features.

**Key Philosophy:** Align humans and AI coding assistants with spec-driven development so you agree on what to build before any code is written.

## Key Features

### Structural Organization

- Separates current specs (`openspec/specs/`) from proposed changes (`openspec/changes/`)
- Groups each feature's proposal, tasks, and spec deltas in a single change folder
- Maintains an audit trail of what's proposed, active, or archived

### Change Management Workflow

1. Draft a change proposal capturing intended spec updates
2. Review and iterate with AI until aligned
3. Implement tasks referencing agreed specifications
4. Archive completed changes to merge updates into source-of-truth specs

### AI Tool Integration

- Native slash commands for Claude Code, CodeBuddy, Cursor, Qoder, and others
- AGENTS.md compatibility for tools like Amp and Jules
- No API keys required
- No MCP (Model Context Protocol) dependency

### Feedback Loop

Allows iterative refinement of specifications during the review phase before implementation proceeds, promoting deterministic and auditable AI-assisted development.

## Installation

```bash
npm install -g @fission-ai/openspec@latest
cd my-project
openspec init
```

The initialization process creates:
- OpenSpec directory structure
- Slash commands for chosen AI tools
- Configuration files

## Core Commands

- `openspec list` - View active changes
- `openspec show <change>` - Display change details
- `openspec validate <change>` - Check spec formatting
- `openspec archive <change>` - Move completed change to archive
- `openspec view` - Interactive dashboard

## How It Compares

**vs. spec-kit:** OpenSpec's dual-folder model excels at managing updates to existing features and cross-spec modifications, whereas spec-kit is optimized for greenfield (0→1) projects.

**vs. Kiro.dev:** OpenSpec consolidates all related specs, tasks, and designs for a feature within one directory. Kiro distributes updates across multiple spec folders, potentially complicating feature tracking.

**vs. No Specs:** Without structured specifications, AI generates code from vague prompts, often missing requirements. OpenSpec ensures predictability by establishing agreed behavior before coding begins.

## Best For

- Brownfield projects with existing codebases
- Managing updates to existing features
- Cross-spec modifications
- Teams wanting lightweight, auditable changes
- Projects prioritizing change management and audit trails
- Developers who prefer minimal overhead

## Limitations

- Less comprehensive than Spec-Kit for greenfield projects
- Simpler feature set compared to BMad or Spec Kitty
- Limited orchestration capabilities
- No explicit multi-agent coordination
- No built-in git worktree support (standard git workflow)

## Related

- [Comparison Matrix](../comparison.md)
- [Recommendations](../recommendations.md)
