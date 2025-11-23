# Spec Kitty (Priivacy-ai)

**Type:** Community fork with orchestration layer
**Repository:** https://github.com/Priivacy-ai/spec-kitty
**Website:** https://priivacy-ai.github.io/spec-kitty/
**Status:** Active development (v0.4.9+)
**License:** Community-maintained fork (retains original Spec-Kit attribution)

## Core Approach

Extends Spec-Kit with real-time kanban dashboard and multi-agent orchestration capabilities. Adds visual workflow management and **git worktree strategy** on top of spec-driven foundations.

**Key Differentiator:** Built-in support for parallel feature isolation using git worktrees without constant branch switching.

## Key Features

- **Live Kanban Dashboard:** Real-time visualization (Planned → Doing → Review → Done)
- **Multi-Agent Coordination:** Manages up to 11 AI coding agents simultaneously
- **Worktree Strategy:** Parallel feature isolation without constant branch switching
- **Mission System:** Switchable workflows for Software Development and Deep Research
- **13 Built-in Commands:** Extends Spec-Kit with additional orchestration commands
- **Automated Lane Scripts:** Task management and quality gate enforcement
- **Constitution Framework:** Encodes team standards once, enforces automatically

## Project Structure

The system organizes work hierarchically:

- **Project:** Entire Git repository initialized with `spec-kitty init`
- **Feature:** Individual units of work with spec, plan, tasks, and implementation worktree
- **Mission:** Domain adapter configuring workflows, templates, and validation rules

## Feature Workflow

Each feature follows a predictable lifecycle:

1. `/spec-kitty.specify` - Creates feature branch and worktree
2. `/spec-kitty.plan` - Documents technical design
3. `/spec-kitty.tasks` - Breaks work into packages
4. `/spec-kitty.implement` - Builds features in isolation
5. `/spec-kitty.review` - Peer review process
6. `/spec-kitty.accept` - Validation against quality gates
7. `/spec-kitty.merge` - Merges to main with cleanup

## Supported AI Agents

The platform integrates with 11 coding agents:
- Claude Code
- Cursor
- Windsurf
- Gemini CLI
- GitHub Copilot
- And 6 additional supported agents

## Installation

```bash
# Install CLI
pip install spec-kitty-cli

# Initialize project
spec-kitty init my-project --ai claude

# Start dashboard
spec-kitty dashboard
```

The initialization creates:
- Slash commands in agent-specific directories (`.claude/commands/`, `.gemini/`, etc.)
- 13 built-in commands
- `.kittify/` automation scripts
- Git worktree configuration

## Dashboard Capabilities

The real-time dashboard provides:
- Visual kanban boards tracking work progress
- Agent assignment visibility
- Completion metrics and artifact status
- Live updates as work moves through lanes
- Multi-project support with automatic detection

## Optional Enhancement Commands

- `/spec-kitty.clarify` - Structured questioning before planning
- `/spec-kitty.research` - Technical investigation support
- `/spec-kitty.analyze` - Cross-artifact consistency checking
- `/spec-kitty.checklist` - Custom quality checklist generation
- `/spec-kitty.dashboard` - Access real-time kanban board

## Use Cases

- Engineering managers coordinating 3-10 parallel AI agents
- Solo developers maintaining context across extended sessions
- Tech-forward agencies demonstrating live client progress
- Tech leads enforcing spec-driven processes across teams
- AI researchers tracking multi-agent experiments
- **Teams needing parallel feature development without branch conflicts**

## Best For

- Teams coordinating multiple AI agents simultaneously
- Projects requiring visual workflow tracking
- Complex projects with parallel feature development
- Organizations needing progress visibility
- **Developers who work with git worktrees for feature isolation**

## Limitations

- Adds complexity on top of Spec-Kit
- Requires understanding both base Spec-Kit and Spec Kitty extensions
- Dashboard overhead may be unnecessary for solo developers on simple projects
- Python dependency (pip install) vs. Node-based alternatives
- Community-maintained (not officially supported by GitHub)

## Relationship to Spec-Kit

As a community-maintained fork, Spec Kitty "retains the original attribution per the Spec Kit license while evolving the toolkit under the Spec Kitty banner." It extends rather than replaces Spec Kit, offering more sophisticated orchestration for distributed AI coding workflows.

## Related

- [Comparison Matrix](../comparison.md)
- [Spec-Kit](spec-kit.md) - Original tool
- [Git Worktree Support Analysis](../git-worktree-support.md) - Detailed worktree comparison
