# Git Worktree Support Analysis

## What Are Git Worktrees?

Git worktrees allow you to check out multiple branches simultaneously in different directories, enabling parallel development without constant branch switching or stashing.

### Benefits

- Work on multiple features simultaneously
- Avoid context switching overhead
- Parallel testing and development
- Isolated environments per feature
- No branch switching conflicts

## Tool Support Analysis

| Tool | Worktree Support | Details |
|------|------------------|---------|
| **[Spec Kitty](tools/spec-kitty.md)** | **Built-in** | **Explicit worktree strategy for parallel feature isolation. Creates feature branch and worktree automatically via `/spec-kitty.specify`. Each feature gets isolated worktree.** |
| **[Superpowers](tools/superpowers.md)** | **Built-in** | **The `using-git-worktrees` skill creates an isolated workspace on a new branch after design approval and verifies a clean test baseline. `finishing-a-development-branch` cleans it up.** |
| **[Beads](beads.md)** | **Built-in** | **Shared `.beads` database across all worktrees. Native worktree model using git branches. Foundation for Gas Town agent village.** |
| **[Conductor](https://www.conductor.build/)** | **Built-in** | **macOS runner: one git worktree per workspace, automatically created and cleaned up. (Agent runner, not an SDD tool.)** |
| **Zencoder / Zenflow** | **Built-in** | **Commercial control plane automates branch + worktree creation for tens-to-hundreds of parallel agents.** |
| [Spec-Kit](tools/spec-kit.md) | No | Branch-based workflow, no worktree integration |
| [BMad Method](tools/bmad-method.md) | No | No explicit worktree support mentioned |
| [OpenSpec](tools/openspec.md) | No | Standard git workflow, no worktree features |
| [Kiro](tools/kiro.md) | No | Standard git integration, no worktree support |
| [Tessl](tools/tessl.md) | No | No worktree support mentioned |
| [Traycer](tools/traycer.md) | No | Dispatches to your agent; no worktree management of its own |

> **Note:** Beads and Conductor are not SDD tools — they're execution/memory layers. They appear here because their worktree support complements SDD tools. See [Beads](beads.md) for details.

## Spec Kitty Worktree Workflow

**Spec Kitty was the first SDD tool with an explicit, built-in worktree strategy.** As of May 2026 it is no longer alone: **Superpowers** automates worktrees via its `using-git-worktrees` skill, and the runners **Conductor** and **Zencoder/Zenflow** create a worktree per parallel agent. Spec Kitty remains distinctive for pairing worktrees with a kanban board and the spec workflow itself.

### Automated Workflow

1. `/spec-kitty.specify` - Creates feature branch AND worktree automatically
2. Work proceeds in isolated worktree
3. `/spec-kitty.merge` - Merges to main with cleanup

### Advantages

This addresses common concerns with spec-driven development by:
- Enabling true parallel development
- Isolating features in separate worktrees
- Avoiding branch switching conflicts
- Maintaining separate contexts per feature
- Automated worktree creation and cleanup

## Alternative Approach: Manual Worktrees

If Spec Kitty's orchestration complexity is too much, you can manually use git worktrees with any other tool:

```bash
# Create worktree for feature
git worktree add ../myproject-feature-x feature-x

# Work in isolated directory
cd ../myproject-feature-x

# Use any SDD tool (OpenSpec, Spec-Kit, etc.)
# ... develop feature ...

# Merge when ready
git checkout main
git merge feature-x
git worktree remove ../myproject-feature-x
```

### Trade-offs

However, this manual approach loses the automation and tracking benefits of Spec Kitty's integrated worktree management:
- No automatic worktree creation
- No kanban tracking across worktrees
- No automated cleanup on merge
- Manual coordination of multiple features

## Worktree Ecosystem Evolution (Since November 2025)

Git worktrees have become a central pattern for parallel AI agent workflows. Multiple new tools and approaches have emerged:

### Beads Worktree Architecture

[Beads](beads.md) provides a shared database model where all worktrees share the same `.beads` directory in the main repository. This enables:
- Seamless issue tracking across multiple working directories
- Agents in different worktrees reading/writing the same task graph
- Foundation for Steve Yegge's [Gas Town](https://steve-yegge.medium.com/the-future-of-coding-agents-e9451a84207c) multi-agent orchestration

The Gas Town model uses one bead = one unit of work = one worktree = one PR.

### Conductor (New Tool)

[Conductor](https://www.conductor.build/) is a macOS app by Melty Labs for running multiple Claude Code/Codex agents in parallel. Each agent operates in its own isolated git worktree. Features:
- Automatic worktree creation per workspace
- Unified diff-based review interface
- Supports Claude Code and OpenAI Codex
- Free, but macOS (Apple Silicon) only

### Known Worktree Challenges

Industry experience since late 2025 has surfaced practical challenges:

- **IDE support gaps:** VS Code added worktree support in July 2025, but Claude Code's `/ide` command still fails to recognize worktrees (workspace paths don't match current directory)
- **Disk space:** Automatic worktree creation in a ~2GB codebase consumed 9.82 GB in a 20-minute session (Cursor forum reports). Build artifacts compound the problem
- **Database isolation:** Worktrees share the same local database, Docker daemon, and cache directories — two agents modifying database state simultaneously creates race conditions
- **Merge complexity:** More parallel worktrees means more potential merge conflicts when integrating

### Updated Landscape

The worktree ecosystem now has three layers:

| Layer | Tool | Role |
|-------|------|------|
| **SDD + Orchestration** | Spec Kitty | Worktree-per-feature with kanban tracking |
| **Agent Memory** | Beads | Shared task graph across worktrees |
| **Agent Runner** | Conductor | Parallel agent execution in isolated worktrees |

These tools are complementary. A full stack might use Spec Kitty for specification and orchestration, Beads for persistent memory across worktrees, and Conductor for the actual parallel agent execution.

## Recommendation

For developers who:
- Work with git worktrees regularly
- Need parallel feature development
- Find standard spec-driven tools too rigid
- Want automated worktree management

**Use [Spec Kitty](tools/spec-kitty.md)** - The SDD tool purpose-built for worktree-based workflows, pairing isolation with a kanban board.

**Or [Superpowers](tools/superpowers.md)** - If you want worktree isolation as part of a disciplined brainstorm → plan → TDD methodology across any harness, rather than a dashboard.

**Add [Beads](beads.md)** - For persistent agent memory that spans across worktrees and sessions.

**Consider [Conductor](https://www.conductor.build/)** - If on macOS and running multiple Claude Code agents in parallel.

For simpler needs, manual worktrees + [OpenSpec](tools/openspec.md) provides lightweight change management without orchestration overhead.

## Related

- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical worktree setup with Beads and OpenSpec
- [Beads](beads.md) — Agent memory with worktree support
- [Orchestration Landscape](landscape.md) — Agent Teams and 30+ multi-agent tools
- [Spec Kitty](tools/spec-kitty.md) — Full tool details
- [Gaps: Newly Discovered Frameworks](gaps.md) — Other new tools
- [Comparison Matrix](comparison.md)
- [Recommendations](recommendations.md)
