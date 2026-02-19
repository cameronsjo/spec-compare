# Cheatsheet: Beads + OpenSpec

> OpenSpec handles **what to build** (specs, change proposals, verification). Beads handles **tracking the doing** (persistent task graph, agent memory, cross-session state). Together they cover planning through execution.

## Setup

### 1. Install Both Tools

```bash
# OpenSpec (Node.js)
npm install -g @fission-ai/openspec@latest

# Beads (Go binary)
brew install steveyegge/beads/bd

# Verify
openspec --version
bd version
```

### 2. Initialize in Your Project

```bash
cd my-project

# Initialize OpenSpec (creates openspec/ directory + skill files)
openspec init

# Initialize Beads (creates .beads/ directory)
bd init
```

Your project now has:
```
my-project/
├── .beads/                  # Beads database (git-tracked)
├── openspec/
│   ├── config.yaml          # Project context + rules
│   ├── specs/               # Source-of-truth specifications
│   ├── changes/             # Active change proposals
│   ├── archive/             # Completed changes
│   └── schemas/             # Artifact templates
├── .claude/skills/          # OpenSpec skill files (auto-generated)
└── ...
```

### 3. Configure OpenSpec Context

Edit `openspec/config.yaml` to tell OpenSpec about Beads:

```yaml
context: |
  This project uses Beads (bd) for task tracking and agent memory.
  After planning, convert tasks to Beads issues using `bd create`.
  Use `bd ready` to find the next available task.
  Always commit Beads changes alongside code changes.

  Tech stack: [your stack here]

rules:
  tasks:
    - Each top-level task must include a Beads issue ID after creation
    - Maximum 3 subtasks per top-level task
    - Include acceptance criteria for each task
```

## Daily Workflow

### Quick Feature (Most Common)

```
1. /opsx:new          → Create a change proposal
2. /opsx:ff           → Fast-forward: generate all planning artifacts
3. Convert to Beads   → bd create from tasks
4. /opsx:apply        → Implement (agent picks tasks via bd ready)
5. /opsx:verify       → Validate against specs
6. /opsx:archive      → Finalize
```

### Step by Step

#### Plan with OpenSpec

```bash
# Start a new change
# In Claude Code: /opsx:new
# Name it something like "add-user-search"

# Fast-forward to generate all artifacts (proposal → specs → design → tasks)
# In Claude Code: /opsx:ff

# Or go incrementally:
# /opsx:continue  (repeat until all artifacts are DONE)
```

This creates:
```
openspec/changes/add-user-search/
├── proposal.md        # What and why
├── specs/             # Delta specs (ADDED/MODIFIED/REMOVED requirements)
├── design.md          # Technical approach
└── tasks.md           # Actionable task breakdown
```

#### Convert Tasks to Beads

Once OpenSpec generates `tasks.md`, convert to Beads issues:

```bash
# Create an epic for the change
bd create --type epic --title "add-user-search" --tag openspec

# Create individual issues from each task
bd create --title "Add search endpoint GET /api/users/search" \
  --epic add-user-search \
  --tag openspec \
  --spec-id openspec/changes/add-user-search/specs/user-search.md

bd create --title "Build search input component" \
  --epic add-user-search \
  --depends-on bd-a1b2 \
  --tag openspec

bd create --title "Wire search results to UserList" \
  --epic add-user-search \
  --depends-on bd-c3d4 \
  --tag openspec

# Verify the graph
bd list --epic add-user-search --format json
```

**Key fields:**
- `--spec-id` links the issue back to the OpenSpec delta spec
- `--depends-on` creates the dependency graph
- `--tag openspec` makes it easy to filter OpenSpec-originated work

#### Implement with Beads Driving Execution

```bash
# Find the next ready task (all dependencies satisfied)
bd ready

# Agent picks up a task
bd update bd-a1b2 --status in-progress

# ... agent implements ...

# Mark done
bd update bd-a1b2 --status done --comment "Implemented search endpoint"
```

In Claude Code, tell the agent:

```
Use `bd ready` to find the next task. Implement it according to the
spec at the spec-id path. When done, mark it complete with `bd update`.
Then pick up the next ready task.
```

#### Verify and Archive

```bash
# Verify implementation matches specs
# In Claude Code: /opsx:verify

# If verification passes, sync delta specs into main specs
# /opsx:sync

# Archive the completed change
# /opsx:archive
```

## Multi-Agent Workflow

When running multiple agents (via Agent Teams, Conductor, or manual worktrees):

### Setup Worktrees

```bash
# Create worktrees for parallel agents
git worktree add ../my-project-agent-1 -b feature/search-backend
git worktree add ../my-project-agent-2 -b feature/search-frontend
```

Beads automatically shares the `.beads` database across all worktrees.

### Assign Work

```bash
# Agent 1 claims backend tasks
bd update bd-a1b2 --status in-progress --assignee agent-1

# Agent 2 claims frontend tasks (if unblocked)
bd update bd-c3d4 --status in-progress --assignee agent-2
```

### Merge Back

```bash
# After agents finish, merge worktree branches
git checkout main
git merge feature/search-backend
git merge feature/search-frontend

# Clean up
git worktree remove ../my-project-agent-1
git worktree remove ../my-project-agent-2
```

## Adding MCP Agent Mail (Optional)

For agent-to-agent messaging alongside Beads memory:

```bash
pip install mcp-agent-mail
# Start server (default port 8765)
am
```

Convention: use Beads IDs as mail thread IDs:

```
send_message(thread_id="bd-a1b2", subject="[bd-a1b2] API types ready", ...)
```

## Command Reference

### OpenSpec Commands

| Command | Purpose |
|---|---|
| `/opsx:explore` | Brainstorm before committing |
| `/opsx:new` | Create a new change |
| `/opsx:continue` | Generate next artifact |
| `/opsx:ff` | Fast-forward all planning artifacts |
| `/opsx:apply` | Implement tasks |
| `/opsx:verify` | Validate implementation against specs |
| `/opsx:sync` | Merge delta specs into main specs |
| `/opsx:archive` | Finalize completed change |
| `/opsx:bulk-archive` | Batch-archive multiple changes |

### Beads Commands

| Command | Purpose |
|---|---|
| `bd init` | Initialize Beads in a repo |
| `bd create` | Create an issue/epic |
| `bd list` | List issues (with filters) |
| `bd ready` | Show tasks ready to work on |
| `bd update` | Update issue status/fields |
| `bd show` | Display issue details |
| `bd todo` | Lightweight task management |
| `bd promote` | Upgrade a wisp to a full bead |
| `bd compact` | Summarize old closed issues (saves context) |

## Tips

- **Delete tasks.md after converting to Beads.** Having both creates confusion — Beads becomes the single source of execution truth.
- **Use `bd compact` regularly.** It summarizes old closed tasks, saving context window space for agents.
- **Tag everything.** Use `--tag openspec` on Beads issues and `--spec-id` to link back to specs. This creates a bidirectional trail.
- **Let agents use `bd ready`.** Don't manually assign — let agents self-select from the ready queue. This scales naturally to multi-agent setups.
- **Run `/opsx:verify` before archiving.** It catches implementation drift from specs before you merge delta specs back.

## Related

- [OpenSpec Tool Profile](tools/openspec.md)
- [Beads, Agent Mail, and Gas Town](beads.md)
- [Git Worktree Support](git-worktree-support.md)
- [Orchestration Landscape](landscape.md)
- [Comparison Matrices](comparison.md)
- [Use Case Scoring](use-case-scoring.md)
- [Gaps: New Frameworks](gaps.md)
- [Recommendations](recommendations.md)
