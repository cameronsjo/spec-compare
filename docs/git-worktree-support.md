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
| [Spec-Kit](tools/spec-kit.md) | No | Branch-based workflow, no worktree integration |
| [BMad Method](tools/bmad-method.md) | No | No explicit worktree support mentioned |
| [OpenSpec](tools/openspec.md) | No | Standard git workflow, no worktree features |
| [Kiro](tools/kiro.md) | No | Standard git integration, no worktree support |
| [Tessl](tools/tessl.md) | No | No worktree support mentioned |

## Spec Kitty Worktree Workflow

**Spec Kitty is the only tool with explicit, built-in git worktree support.**

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

## Recommendation

For developers who:
- Work with git worktrees regularly
- Need parallel feature development
- Find standard spec-driven tools too rigid
- Want automated worktree management

**Use [Spec Kitty](tools/spec-kitty.md)** - It's the only tool purpose-built for worktree-based workflows.

For simpler needs, manual worktrees + [OpenSpec](tools/openspec.md) provides lightweight change management without orchestration overhead.

## Related

- [Spec Kitty](tools/spec-kitty.md) - Full tool details
- [Comparison Matrix](comparison.md)
- [Recommendations](recommendations.md)
