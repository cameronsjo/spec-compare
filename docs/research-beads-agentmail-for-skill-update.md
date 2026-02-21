# Research: Beads + Agent Mail for Skill Integration

> Research compiled for updating the "A Star is Born" skill with Beads (agent memory/execution tracking) and MCP Agent Mail (async agent coordination).

---

## Part 1: Beads — Agent Memory & Execution Tracking

### What It Is

Beads is a distributed, git-backed graph issue tracker designed as a **persistent memory layer** for AI coding agents. Created by Steve Yegge, it solves the "50 First Dates" problem — agents wake up with no memory of yesterday's work.

- **Repository:** [steveyegge/beads](https://github.com/steveyegge/beads)
- **Language:** Go (single binary), also has a Rust port (`br`) by Jeffrey Emanuel
- **License:** MIT
- **Current Version:** v0.47.0+ (Dolt-powered backend)
- **Install:** `brew install steveyegge/beads/bd` or `npm install -g beads-mcp` or `curl -fsSL https://raw.githubusercontent.com/steveyegge/beads/main/scripts/install.sh | bash`

### Core Mental Model

> "Everyone is focused on making planning tools, and Beads is an execution tool."

- **SDD tools** (OpenSpec, Spec-Kit, etc.) define WHAT to build
- **Beads** tracks the DOING — persistent task graph that survives context limits

### Key Concepts

| Concept | Description |
|---------|-------------|
| **Beads (issues)** | Structured tasks with dependency links, stored as a graph (not flat text) |
| **Epics** | Groups of related beads for organizing larger features |
| **Hash-based IDs** | Format `bd-a1b2` — prevents merge collisions in multi-agent/multi-branch workflows |
| **Compaction** | Semantic "memory decay" — summarizes old closed tasks to save context window space |
| **Graph Links** | `relates_to`, `duplicates`, `supersedes`, `replies_to`, `blocks`, `parent-child`, `discovered-from` |
| **Wisps** | Lightweight tasks that can be promoted to full beads via `bd promote` |
| **spec_id field** | Links issues back to specification documents |

### Storage Architecture

- **Source of truth:** JSONL file (`.beads/issues.jsonl`) committed to git
- **Local cache:** SQLite database (`.beads/*.db`, gitignored)
- **Auto-sync:** SQLite → JSONL after CRUD ops (5-second debounce); JSONL → SQLite when JSONL is newer (e.g., after `git pull`)
- **Dolt backend (v0.47.0+):** Version-controlled SQL with cell-level merge and native branching

### Essential Commands

```bash
# Setup
bd init                    # Initialize in repo (interactive)
bd init --quiet            # Non-interactive (for agents)
bd init --stealth          # Local-only, no repo pollution
bd hooks install           # Git hooks for automatic JSONL sync

# Creating work
bd create "Title" --description "..." -t bug -p 1 --json
bd create --type epic --title "feature-name" --tag openspec
bd create "Task" --epic feature-name --depends-on bd-a1b2 --spec-id path/to/spec.md

# Finding work
bd ready                   # Show issues with no blockers
bd ready --json            # Machine-readable format
bd ready --priority 1      # Filter by priority
bd stale --days 30         # Find forgotten issues

# Working
bd update bd-a1b2 --status in-progress
bd update bd-a1b2 --status done --comment "Implemented"
bd close bd-a1b2           # Complete work

# Maintenance
bd sync                    # Export/import/commit/push
bd compact                 # Summarize old closed tasks (saves context)
bd doctor --fix            # Health checks with remediation
bd list --epic name --format json

# FORBIDDEN for agents
# bd edit (opens interactive $EDITOR — use bd update with flags instead)
```

### Init Modes

| Mode | Command | Use Case |
|------|---------|----------|
| Basic | `bd init` | Standard interactive setup |
| Quiet | `bd init --quiet` | Non-interactive (agents) |
| Contributor | `bd init --contributor` | OSS contributor fork workflow |
| Team | `bd init --team` | Team member branch workflow |
| Stealth | `bd init --stealth` | Local-only, no repo pollution |

### Integration with Claude Code

- **MCP server plugin:** `pip install beads-mcp`
- **Slash commands:** `/bd-ready`, `/bd-create`, `/bd-show`, `/bd-update`, `/bd-close`
- **Session hooks:** `.claude/hooks/session-start.sh` can auto-install beads, init if needed, and show ready work
- **`@task-agent`:** Autonomous task completion within Claude Code

### Git Worktree Support

All worktrees in a repository **share the same `.beads` database** in the main repo. This means:
- Agents in different worktrees read/write the same task graph
- One bead = one unit of work = one worktree = one PR (Gas Town model)
- No extra configuration needed

### "Landing the Plane" Protocol (Session End)

Critical for multi-agent coordination — agents MUST:
1. File beads issues for remaining follow-up work
2. Pass quality gates (lint, test)
3. Update/close beads issues
4. `git pull --rebase` → `bd sync` → `git push` (mandatory — unpushed work breaks coordination)
5. Verify clean state with `git status`

### Beads Viewer (`bv`)

Created by Jeffrey Emanuel. AI-friendly task analysis tool with robot flags:
- `--robot-priority` — Priority recommendations with reasoning
- `--robot-plan` — Parallel execution planning
- `--robot-insights` — Graph analytics (PageRank, critical path analysis)
- `--robot-diff` — Change tracking

---

## Part 2: MCP Agent Mail — Decoupled Async Messaging

### What It Is

MCP Agent Mail is an asynchronous messaging and audit layer for AI coding agents — "Gmail for your coding agents." Created by Jeffrey Emanuel, it's exposed as an HTTP-only FastMCP server implementing the Model Context Protocol.

- **Repository:** [Dicklesworthstone/mcp_agent_mail](https://github.com/Dicklesworthstone/mcp_agent_mail) (1,700+ stars)
- **Website:** [mcpagentmail.com](https://mcpagentmail.com/)
- **Install:** `pip install mcp-agent-mail` or one-line installer (see below)
- **License:** MIT
- **Compatibility:** Claude Code, Cursor, Windsurf, Codex CLI, Gemini CLI, OpenCode — any MCP-compatible client

### Why Decoupled (Not Just Coordinated)

Agent Mail is commonly framed as a multi-agent coordination tool, but its real power for solo/sequential workflows is as a **message drop and audit trail between decoupled sessions**:

1. **Session-to-session handoffs** — An agent finishes work, leaves a threaded message about what was done, what's unresolved, blockers hit, and what's next. The next session's agent checks the inbox and picks up with rich context beyond what Beads status fields capture.
2. **Cross-repo breadcrumbs** — Your skill repo and any other repo can leave messages for each other via `macro_contact_handshake` + shared thread IDs. No agents need to run simultaneously.
3. **Decision audit trail** — Every architectural decision, trade-off, and workaround gets threaded onto a bead ID. Months later, an agent (or you) can FTS5-search the mail history to understand *why* something was done — not just *what*.
4. **In-flight intent declarations** — File reservations aren't just collision prevention. They declare "this was being actively worked on" so a future session knows what was in-flight and can either resume or clean up.
5. **Structured context that survives compaction** — When `bd compact` summarizes old beads to save context, the threaded mail history preserves the full narrative. Beads gives you the "what"; mail gives you the "why and how it went."

**Beads = persistent task state. Agent Mail = persistent conversation state. Together they reconstruct full session context for any future agent.**

### What Agents Get

- **Identities** — Memorable adjective+noun codenames (auto-generated), persistent across sessions
- **Inboxes/outboxes** — Per-agent, per-project message stores (survive indefinitely in git)
- **Threaded conversations** — GitHub-flavored Markdown, keyed to bead IDs
- **File reservations** — Advisory leases declaring intent (not hard locks)
- **Searchable history** — SQLite FTS5 full-text search across all messages
- **Web UI** — Browse at `http://127.0.0.1:8765/mail`

### Installation

**One-line installer (recommended):**
```bash
curl -fsSL "https://raw.githubusercontent.com/Dicklesworthstone/mcp_agent_mail/main/scripts/install.sh?$(date +%s)" | bash -s -- --yes
```

This installer:
- Installs `uv` and `jq` if missing
- Creates Python 3.14 venv with dependencies
- Auto-detects installed agent tools and configures them
- Starts MCP HTTP server on port 8765
- Creates shell alias `am` for quick server startup
- Also installs Beads Rust (`br`) and Beads Viewer (`bv`)

**Manual:**
```bash
git clone https://github.com/Dicklesworthstone/mcp_agent_mail
cd mcp_agent_mail
uv python install 3.14
uv venv -p 3.14
source .venv/bin/activate
uv sync
scripts/automatically_detect_all_installed_coding_agents_and_install_mcp_agent_mail_in_all.sh
```

**Start server:**
```bash
am    # Shell alias created by installer
# or
uv run python -m mcp_agent_mail.cli
```

### Dual Persistence Model

| Layer | Format | Purpose |
|-------|--------|---------|
| **Git** | Markdown files in inbox/outbox dirs per agent | Human-auditable, diffable, part of code history |
| **SQLite** | FTS5-indexed database | Fast full-text search, queries, lease tracking |

Messages stored as: `messages/YYYY/MM/id.md` with frontmatter metadata.

### Core Tools (10 in "core" mode)

| Tool | Purpose |
|------|---------|
| `register_agent` | Create an agent identity within a project |
| `send_message` | Post messages with thread support and ack requirements |
| `fetch_inbox` | Retrieve unread messages (with filters) |
| `acknowledge_message` | Mark a message as processed |
| `file_reservation_paths` | Reserve files/globs with TTL; exclusive or shared |
| `release_file_reservations` | Remove active reservations |
| `macro_start_session` | Bundle: register + check inbox + check reservations |
| `macro_prepare_thread` | Bundle: create thread + send initial message |
| `macro_file_reservation_cycle` | Bundle: reserve + work + release |
| `macro_contact_handshake` | Cross-project agent linking |

Extended mode exposes all 27+ tools via meta-tools for dynamic discovery.

### Lazy Loading (Token Optimization)

- **Core mode** (default): 10 essential tools — reduces token usage by ~65%
- **Extended mode**: All 27+ tools available
- Config: `MCP_TOOLS_MODE=core` (default) or `MCP_TOOLS_MODE=extended`

### Advisory File Reservations

Instead of hard locks (which cause blocking and brittle failures):

```
file_reservation_paths(
    paths=["src/components/**"],
    exclusive=true,
    ttl_seconds=3600,
    reason="bd-a1b2: Implementing search component"
)
```

- Agents **declare intent** to edit files/globs with a time-to-live
- Modes: `exclusive` (one agent) or `shared` (multiple readers)
- System always returns both granted reservations AND any conflicts
- Conflicts trigger **negotiation through the message system** (not blocking)
- Optional pre-commit guard enforces reservations locally

### Decoupled Session Flow

```
SESSION START:
1. register_agent(project_key="/path/to/repo")
   → Agent gets identity (e.g., "swift-falcon"), or resumes existing one

2. fetch_inbox()
   → Check for messages left by previous sessions
   → Understand context: what was done, what's unresolved, what's next

3. acknowledge_message(id)
   → Mark handoff messages as received

4. file_reservation_paths(paths=["src/api/**"], exclusive=true, reason="bd-a1b2")
   → Declare intent: "I'm actively working on these files for this bead"

DURING WORK:
5. send_message(thread_id="bd-a1b2", subject="[bd-a1b2] Decision: chose JWT over sessions", ...)
   → Document decisions, blockers, trade-offs as threaded messages on the bead

SESSION END:
6. send_message(thread_id="bd-a1b2", subject="[bd-a1b2] Handoff: API done, frontend next", ...)
   → Leave a handoff message for the next session with full context

7. release_file_reservations()
   → Clear in-flight declarations (or leave them if work is paused mid-task)
```

### Cross-Repo Breadcrumbs

Use `macro_contact_handshake` to establish communication links between agents in different repos. Then shared `thread_id` values let messages flow across repo boundaries — no agents need to run at the same time. A future session in repo B can read what an agent in repo A left weeks ago.

### Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `STORAGE_ROOT` | `~/.mcp_agent_mail_git_mailbox_repo` | Archive location |
| `HTTP_HOST` | `127.0.0.1` | Bind address |
| `HTTP_PORT` | `8765` | Server port |
| `MCP_TOOLS_MODE` | `core` | Tool exposure (core/extended) |
| `LLM_ENABLED` | `true` | Enable AI summaries |
| `HTTP_BEARER_TOKEN` | auto-generated | API authentication |

### Solving the "Forgot to Check Mail" Problem

Agents sometimes forget to check their messages. Emanuel addressed this by adding **automated hooks** for Claude Code that remind agents to poll their inbox at session start. For decoupled workflows this is critical — the whole point is that messages from previous sessions are waiting. A session-start hook that runs `fetch_inbox()` ensures nothing gets missed.

---

## Part 3: How Beads + Agent Mail Work Together

### Two Layers of Persistent Memory

| Layer | Tool | What It Stores | Survives |
|-------|------|----------------|----------|
| **Task state** | Beads | Status, dependencies, priority, spec links | Git (always) |
| **Conversation state** | Agent Mail | Decisions, trade-offs, blockers, handoff notes | Git + SQLite |

Beads tells a future agent *what* needs doing. Agent Mail tells it *why things are the way they are* and *what the last agent was thinking*.

### The Integration Convention

Use **Beads issue IDs as Agent Mail thread IDs** — this ties conversation history directly to tasks:

```
send_message(
    thread_id="bd-a1b2",
    subject="[bd-a1b2] Decision: chose JWT over sessions",
    body="Evaluated both approaches. JWT chosen because..."
)
```

When starting a Beads task, declare intent with the issue ID:

```
file_reservation_paths(
    paths=["src/api/**"],
    exclusive=true,
    reason="Working on bd-a1b2"
)
```

### Why This Matters for Decoupled Workflows

When `bd compact` runs to save context window space, it summarizes old beads into compressed forms. The detailed *narrative* — decisions, false starts, workarounds — lives in the Agent Mail thread. A future agent can:

1. `bd ready --json` → See what's available (Beads)
2. `fetch_inbox()` → Read handoff messages from last session (Agent Mail)
3. Search mail by thread ID → Get full history on a specific bead
4. Start working with context that would otherwise be lost

### Gas Town: The Agent Village Pattern (Background)

For reference, Steve Yegge's Gas Town formalizes a *concurrent* multi-agent pattern built on the same primitives (Beads + Agent Mail + worktrees). While the target here is decoupled workflows, the underlying tools are the same — the difference is whether agents run simultaneously or sequentially.

### Rule of Five

Emanuel's observation (adopted by Gas Town): making an LLM review something **5 times** with different focus areas each pass produces convergent, superior outcomes. Useful even in solo/sequential agent workflows:

1. Initial implementation
2. Review pass: **Correctness**
3. Review pass: **Clarity**
4. Review pass: **Edge cases**
5. Review pass: **Excellence/polish**

---

## Part 4: Integration with OpenSpec

### The Combined Workflow (OpenSpec + Beads + Agent Mail)

```
Phase 1: PLAN (OpenSpec)
  /opsx:new          → Create change proposal
  /opsx:ff           → Fast-forward: generate all planning artifacts
                       (proposal → specs → design → tasks)

Phase 2: CONVERT (Beads)
  bd create --type epic --title "feature-name" --tag openspec
  bd create "Task 1" --epic feature-name --spec-id openspec/changes/.../spec.md
  bd create "Task 2" --epic feature-name --depends-on bd-xxxx
  (Delete tasks.md after converting — Beads is now the execution truth)

Phase 3: CONTEXT (Agent Mail — session continuity)
  register_agent(project_key="/path/to/repo")
  fetch_inbox()                              → Read handoff notes from prior sessions
  file_reservation_paths(paths=[...], reason="bd-xxxx")  → Declare intent

Phase 4: EXECUTE (Beads-driven)
  bd ready                → Find next unblocked task
  bd update bd-xxxx --status in-progress
  ... implement per spec-id ...
  bd update bd-xxxx --status done

Phase 5: HANDOFF (Agent Mail — session end)
  send_message(thread_id="bd-xxxx", subject="[bd-xxxx] Handoff", body="...")
                                             → Document what was done, what's next
  release_file_reservations()                → Clear in-flight declarations

Phase 6: VERIFY (OpenSpec)
  /opsx:verify       → Validate implementation against specs
  /opsx:sync         → Merge delta specs into main specs
  /opsx:archive      → Finalize completed change
```

### OpenSpec config.yaml for Beads Integration

```yaml
context: |
  This project uses Beads (bd) for task tracking and agent memory.
  After planning, convert tasks to Beads issues using `bd create`.
  Use `bd ready` to find the next available task.
  Always commit Beads changes alongside code changes.

rules:
  tasks:
    - Each top-level task must include a Beads issue ID after creation
    - Maximum 3 subtasks per top-level task
    - Include acceptance criteria for each task
```

### Key Integration Points for a Skill

A skill integrating these tools should handle:

1. **Initialization** — `bd init --quiet` + Agent Mail server start (`am`)
2. **Session start context loading** — `fetch_inbox()` to read handoff notes from prior sessions, then `bd ready --json` to find next unblocked task
3. **Planning to execution bridge** — Converting OpenSpec tasks.md → Beads issues with `--spec-id` and `--depends-on`
4. **Intent declaration** — `file_reservation_paths()` with bead ID when starting work on files
5. **Decision journaling** — `send_message()` threaded on bead ID for architectural decisions, blockers, trade-offs
6. **Status tracking** — `bd update` for in-progress/done transitions
7. **Compaction** — `bd compact` to manage context window budget (mail threads preserve the full narrative)
8. **Session end handoff** — `send_message()` with handoff summary + `release_file_reservations()` + "land the plane" protocol
9. **Verification loop** — `/opsx:verify` after implementation, before archiving

---

## Part 5: Practical Skill Update Considerations

### What a Skill Needs to Provide

1. **Agent Instructions Block** — Tell the agent about Beads commands, Agent Mail tools, and the decoupled session workflow
2. **Session Start Hook** — `fetch_inbox()` for handoff context, then `bd ready --json` for available work
3. **Session End Hook** — Handoff message via Agent Mail + "land the plane" protocol (sync, push, clean state)
4. **OpenSpec Integration** — If already using OpenSpec, add the Beads bridge step
5. **Decoupled Session Conventions** — Thread IDs = bead IDs, file reservations = intent declarations, handoff messages = session context

### Minimal CLAUDE.md / SKILL.md Additions

```markdown
## Beads Integration (Task Memory)

This project uses Beads for persistent task tracking across sessions.

At session start:
1. Run `bd ready --json` to see available work
2. Pick an issue and run `bd update <id> --status in-progress`

During work:
- File discovered work: `bd create "..." --deps discovered-from:<id>`
- Never use `bd edit` (interactive). Use `bd update <id> --flag value`.

At session end:
1. Close completed issues: `bd close <id>`
2. Run `bd sync` then `git push`

## Agent Mail Integration (Session Continuity)

This project uses Agent Mail for persistent conversation context across sessions.

At session start:
1. Ensure server is running: `am`
2. Register: `register_agent(project_key="<repo-path>")`
3. Check for handoff messages: `fetch_inbox()` — read and acknowledge
4. Declare intent: `file_reservation_paths(paths=[...], reason="bd-xxxx")`

During work:
- Document decisions on the bead thread: `send_message(thread_id="bd-xxxx", ...)`
- Decisions, trade-offs, and blockers go here (not just in code comments)

At session end:
1. Write handoff message: `send_message(thread_id="bd-xxxx", subject="[bd-xxxx] Handoff: ...")`
   Include: what was done, what's unresolved, what's next, any gotchas
2. Release reservations: `release_file_reservations()`
```

### Key Dependencies

| Tool | Install | Purpose |
|------|---------|---------|
| `bd` (Beads) | `brew install steveyegge/beads/bd` | Task tracking & agent memory |
| `bv` (Beads Viewer) | Installed by Agent Mail installer | Graph analysis & priority |
| `mcp-agent-mail` | `pip install mcp-agent-mail` or one-line installer | Agent coordination |
| OpenSpec | `npm install -g @fission-ai/openspec@latest` | Spec-driven planning |

### Architectural Decision: When to Add Agent Mail

| Scenario | Use Just Beads | Add Agent Mail | Why |
|----------|---------------|----------------|-----|
| Solo dev, one-shot tasks | Yes | No | No session continuity needed |
| Solo dev, sequential sessions on same feature | Yes | **Yes** | Handoff notes preserve context between sessions |
| Long-running feature across days/weeks | Yes | **Yes** | Decision audit trail + handoff = full narrative |
| Cross-repo workflows | Yes | **Yes** | Breadcrumbs between repos via contact handshake |
| Multiple concurrent agents | Yes | **Yes** | Real-time coordination (Gas Town pattern) |
| Post-compaction context recovery | Yes | **Yes** | Mail threads survive bead compaction |

**Bottom line:** Beads is always useful (task state). Agent Mail is useful whenever you care about *why* and *how* across session boundaries — not just *what*.

---

## Sources

### Beads
- [steveyegge/beads (GitHub)](https://github.com/steveyegge/beads)
- [Beads Quickstart](https://github.com/steveyegge/beads/blob/main/docs/QUICKSTART.md)
- [Beads Agent Instructions](https://github.com/steveyegge/beads/blob/main/AGENT_INSTRUCTIONS.md)
- [Beads FAQ](https://github.com/steveyegge/beads/blob/main/docs/FAQ.md)
- [The Beads Revolution — Steve Yegge](https://steve-yegge.medium.com/the-beads-revolution-how-i-built-the-todo-system-that-ai-agents-actually-want-to-use-228a5f9be2a9)
- [Beads Best Practices — Steve Yegge](https://steve-yegge.medium.com/beads-best-practices-2db636b9760c)
- [The Future of Coding Agents — Steve Yegge](https://steve-yegge.medium.com/the-future-of-coding-agents-e9451a84207c)

### MCP Agent Mail
- [Dicklesworthstone/mcp_agent_mail (GitHub)](https://github.com/Dicklesworthstone/mcp_agent_mail)
- [MCP Agent Mail Official Site](https://mcpagentmail.com/)
- [Jeffrey Emanuel's Project Page](https://www.jeffreyemanuel.com/projects/mcp-agent-mail)
- [Agent Mail on PulseMCP](https://www.pulsemcp.com/servers/dicklesworthstone-agent-mail)
- [PyPI: mcp-agent-mail](https://pypi.org/project/mcp-agent-mail/)

### Gas Town
- [Welcome to Gas Town — Steve Yegge](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)
- [steveyegge/gastown (GitHub)](https://github.com/steveyegge/gastown)

### OpenSpec
- [Fission-AI/OpenSpec (GitHub)](https://github.com/Fission-AI/OpenSpec)
- [openspec.dev](https://openspec.dev/)
