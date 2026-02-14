# Beads: Agent Memory for Spec-Driven Development

## Overview

**Beads** is a distributed, git-backed graph issue tracker designed as a persistent memory layer for AI coding agents. Created by [Steve Yegge](https://steve-yegge.medium.com/the-beads-revolution-how-i-built-the-todo-system-that-ai-agents-actually-want-to-use-228a5f9be2a9), Beads solves what Yegge calls the "50 First Dates" problem — agents wake up with no memory of yesterday's work.

- **Repository:** [steveyegge/beads](https://github.com/steveyegge/beads)
- **Language:** Go (single binary)
- **License:** MIT
- **Current Version:** v0.47.0 (January 2026)
- **Install:** `brew install steveyegge/beads/bd`

## What Beads Does

Without Beads, an agent sees the world through a sliding context window — once a detail scrolls out of view, it's gone. Beads provides a structured "bulletin board" where agents can pin architectural decisions, todo lists, and state information that persists across sessions.

As Yegge puts it: "Everyone is focused on making planning tools, and Beads is an execution tool."

### Core Concepts

- **Beads (issues):** Structured tasks with dependency links, stored as a graph rather than flat text
- **Epics:** Groups of related beads for organizing larger features
- **Hash-based IDs:** Format `bd-a1b2` prevents merge collisions in multi-agent/multi-branch workflows
- **Compaction:** Semantic "memory decay" summarizes old closed tasks to save context window space
- **Graph Links:** `relates_to`, `duplicates`, `supersedes`, `replies_to` for knowledge graphs

### Key Features (v0.47.0)

- **Dolt-Powered Backend:** Version-controlled SQL database with cell-level merge and native branching (JSONL maintained for git portability)
- **Agent-Optimized:** JSON output, dependency tracking, auto-ready task detection
- **Messaging:** Message issue type with threading (`--thread`), ephemeral lifecycle, mail delegation
- **Simple Query Language:** Complex filtering beyond basic flags
- **`bd promote`:** Wisp-to-bead promotion for lightweight-to-structured task escalation
- **`bd todo`:** Lightweight task management for simpler needs
- **`spec_id` field:** Links issues to specification documents
- **Multi-platform:** Linux, macOS (Intel & Apple Silicon), Windows, Android/Termux, FreeBSD

## Beads and Spec-Driven Development

Beads is not a planning tool — it's an execution tool that integrates with any planning system. The workflow:

1. Use your SDD tool of choice (Spec-Kit, OpenSpec, etc.) to create specifications
2. Tell the agent to file Beads epics and issues for the work
3. Throw any number of agents at the epics

### Integration with Spec-Kit

Community discussion ([github/spec-kit #1381](https://github.com/github/spec-kit/discussions/1381)) reveals active interest in combining Spec-Kit's specification workflow with Beads' execution tracking:

- **Spec-Kit provides structure** (WHAT/WHY/HOW)
- **Beads provides memory** (persistent task graph that survives context limits)
- `tasks.md` becomes an index pointing to Beads issues, not a massive backlog

A dedicated integration exists at [jmanhype/speckit](https://github.com/jmanhype/speckit), described as "Specification-Driven Development with Beads Integration." In this system, a `create-beads-issues.sh` script enables bulk imports of tasks with automatic dependency setup.

Practitioners have found it most effective to explicitly delete the final `tasks.md` after converting to Beads, removing a source of confusion.

### Integration with Claude Code

Beads integrates with Claude Code via:
- **MCP server plugin** (`pip install beads-mcp`)
- **Claude Code marketplace skill** (community-contributed)
- **Slash commands:** `/beads:init`, `/beads:create`, `/beads:ready`, `/beads:workflow`
- **`@task-agent`:** Autonomous task completion within Claude Code

## Beads and Git Worktrees

Beads provides [enhanced git worktree support](https://github.com/steveyegge/beads/blob/main/docs/WORKTREES.md) with a shared database architecture — all worktrees in a repository share the same `.beads` database located in the main repository, enabling seamless issue tracking across multiple working directories.

## MCP Agent Mail

**MCP Agent Mail** is an asynchronous coordination layer for AI coding agents, described by its creator Jeffrey Emanuel as "Gmail for your coding agents." It is exposed as an HTTP-only FastMCP server implementing the Model Context Protocol.

- **Repository:** [Dicklesworthstone/mcp_agent_mail](https://github.com/Dicklesworthstone/mcp_agent_mail) (1,400+ stars)
- **Website:** [mcpagentmail.com](https://mcpagentmail.com/)
- **Install:** `pip install mcp-agent-mail`
- **Author:** Jeffrey Emanuel

### What It Provides

Agents get identities, inboxes/outboxes, searchable message histories, threaded messaging, and advisory file reservations (leases). Any MCP-compatible client — Claude Code, Cursor, Windsurf, Codex CLI, Gemini CLI, OpenCode — can connect out of the box.

**Dual persistence:** Git (human-auditable markdown artifacts in inbox/outbox directories per agent) + SQLite with FTS5 (fast full-text search and indexing). Every message is diffable, auditable, and part of the code history.

### Core Tools

| Tool | Purpose |
|------|---------|
| `register_agent` | Create an agent identity within a project |
| `send_message` | Post messages with thread support and acknowledgment requirements |
| `fetch_inbox` | Retrieve unread messages (with filters) |
| `acknowledge_message` | Mark a message as processed |
| `file_reservation_paths` | Reserve files/globs with a TTL; exclusive or shared modes |
| `release_file_reservations` | Remove active reservations |

Macro tools bundle common multi-step flows: `macro_start_session`, `macro_prepare_thread`, `macro_file_reservation_cycle`, `macro_contact_handshake`.

### Advisory File Reservations

Instead of hard locks (which cause blocking and brittle failures), Agent Mail uses advisory reservations:

- Agents declare intent to edit files/globs with a time-to-live
- Reservations can be exclusive or shared
- The system always returns both granted reservations and any conflicts
- When conflicts arise, agents negotiate through the messaging system
- Optional pre-commit guard enforces reservations locally

### How Agents Coordinate

1. Each agent calls `register_agent` using the repo path as `project_key`
2. Agents reserve their file domains (e.g., `src/components/**` exclusive)
3. Agents send threaded messages via `send_message(..., thread_id="FEAT-123")`
4. Agents poll `fetch_inbox` and `acknowledge_message` to confirm receipt
5. Reservation conflicts trigger negotiation through the message system

Cross-repository coordination uses `macro_contact_handshake` to establish communication links, then shared `thread_id` values across repos.

### Lazy Loading

Reduces token usage by ~65% with a "core mode" exposing only 10 essential tools (of 27 total). Additional tools available via meta-tools for dynamic discovery.

### Relationship to Beads

Beads gives agents shared memory; Agent Mail gives them messaging. Emanuel built **Beads Viewer** (`bv`), the most sophisticated viewer for Beads data, applying PageRank and graph theory to prioritize tasks. He also created a Rust port of Beads (`br`).

**Integration convention:** Use Beads issue IDs (e.g., `bd-123`) as Mail `thread_id` values. Prefix message subjects with `[bd-123]`. When starting a Beads task, call `file_reservation_paths()` with the issue ID in the reason field.

### Gas Town: Yegge's Agent Village

In January 2026, Yegge introduced [Gas Town](https://steve-yegge.medium.com/the-future-of-coding-agents-e9451a84207c) — a multi-agent orchestration system built on Beads, Agent Mail, and git worktrees.

Emanuel discovered that **combining Agent Mail with Beads led to an emergent "agent village"** — agents naturally collaborated, divided up work, and farmed it out without explicit orchestration. Yegge formalized this into a coordinated "agent town."

- **Architecture:** Beads = shared memory; Agent Mail = messaging. "You just give them a task and tell them to go sort it out amongst themselves."
- **Worktree Model:** Uses git branches instead of a file reservation system; each agent works in an isolated worktree
- **Self-Organization:** "There's no ego, so they quickly decide on a leader and just split things up"
- **Terminology (Mad Max-inspired):** The Mayor (primary AI coordinator), Polecats (ephemeral worker agents), The Refinery (merge queue agent)
- **Rule of Five:** Emanuel's observation adopted by Gas Town — making an LLM review something 5 times (with different focus areas each pass) produces convergent, superior outcomes. The four review passes after initial implementation focus on: correctness, clarity, edge cases, and excellence/polish

Yegge predicts that 2026 agents will compete on how well they support being "factory workers" rather than solo operators.

## Beads' Influence on Claude Code's Tasks System

In 2026, Claude Code upgraded its "Todos" system to "Tasks" — directly inspired by Beads. Anthropic engineer Antoine Brugeat stated: "We took inspiration from projects like Beads by Steve Yegge."

### How Tasks Differs from Beads

| Aspect | Claude Code Tasks | Beads |
|--------|-------------------|-------|
| **Scope** | Session-level coordination | Project-level memory |
| **Storage** | `~/.claude/tasks` | Git-native `.beads` directory |
| **Persistence** | Session-isolated by default; opt-in via `CLAUDE_CODE_TASK_LIST_ID` | Always persistent in git |
| **Agent Support** | Claude Code only | Agent-agnostic (any MCP-enabled agent) |
| **Dependencies** | Yes (task A blocks task B) | Yes (full dependency graph) |
| **Multi-session** | Via shared `CLAUDE_CODE_TASK_LIST_ID` | Always shared via git |

These tools operate at different layers and are complementary, not competing:
- **Tasks:** Session-level coordination (SQLite analogy)
- **Beads:** Project-level memory (PostgreSQL analogy)
- **[Flux](https://paddo.dev/blog/from-beads-to-tasks/):** Team-level coordination via MCP-first Kanban with web dashboard

## Relevance to This Comparison

Beads is not an SDD tool itself — it's an execution and memory layer. But it has significant implications for the SDD landscape:

1. **Addresses context loss:** The primary failure mode of SDD with AI agents (specs exist but agents forget them mid-session)
2. **Enables multi-agent SDD:** Multiple agents can work on different parts of a specification simultaneously
3. **Bridges planning and execution:** SDD tools define WHAT; Beads tracks the doing
4. **Worktree-native:** Designed for the parallel agent workflow that Spec Kitty pioneered

### Relationship to Existing Tools

| SDD Tool | Beads Integration | Notes |
|----------|-------------------|-------|
| **Spec-Kit** | Active community effort | Discussion #1381; jmanhype/speckit integration repo |
| **Spec Kitty** | Complementary | Both worktree-native; Spec Kitty for orchestration, Beads for memory |
| **BMad Method** | Potential | BMad's agent roles could file beads for task tracking |
| **OpenSpec** | Discussed | [steveyegge/beads Discussion #240](https://github.com/steveyegge/beads/discussions/240) |
| **Kiro** | No known integration | Proprietary IDE limits external tool integration |
| **Tessl** | No known integration | Proprietary platform |

## Sources

### Beads
- [The Beads Revolution — Steve Yegge (Medium)](https://steve-yegge.medium.com/the-beads-revolution-how-i-built-the-todo-system-that-ai-agents-actually-want-to-use-228a5f9be2a9)
- [Beads Best Practices — Steve Yegge (Medium)](https://steve-yegge.medium.com/beads-best-practices-2db636b9760c)
- [The Future of Coding Agents — Steve Yegge (Medium)](https://steve-yegge.medium.com/the-future-of-coding-agents-e9451a84207c)
- [steveyegge/beads (GitHub)](https://github.com/steveyegge/beads)
- [Beads Worktrees Documentation](https://github.com/steveyegge/beads/blob/main/docs/WORKTREES.md)
- [From Beads to Tasks: Anthropic Productizes Agent Memory](https://paddo.dev/blog/from-beads-to-tasks/)
- [Solving Agent Context Loss: A Beads + Claude Code Workflow](https://jx0.ca/solving-agent-context-loss/)
- [Spec-Driven Development with Claude Code in Action](https://alexop.dev/posts/spec-driven-development-claude-code-in-action/)
- [Claude Code Memory Upgrade Using Beads](https://www.geeky-gadgets.com/claude-project-memory-for-agents/)
- [State Management for Agents: Implementing Beads](https://typevar.dev/articles/steveyegge/beads)
- [Beads + Spec-Kit Discussion #1381](https://github.com/github/spec-kit/discussions/1381)
- [jmanhype/speckit — Beads Integration Repo](https://github.com/jmanhype/speckit)
- [Native sync with Claude Code task lists — Issue #1361](https://github.com/steveyegge/beads/issues/1361)

### MCP Agent Mail
- [Dicklesworthstone/mcp_agent_mail (GitHub)](https://github.com/Dicklesworthstone/mcp_agent_mail)
- [MCP Agent Mail Official Site](https://mcpagentmail.com/)
- [Jeffrey Emanuel's Project Page](https://www.jeffreyemanuel.com/projects/mcp-agent-mail)

### Gas Town
- [Welcome to Gas Town — Steve Yegge (Medium)](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)
- [steveyegge/gastown (GitHub)](https://github.com/steveyegge/gastown)

## Related

- [Git Worktree Support](git-worktree-support.md)
- [Comparison Matrix](comparison.md)
- [Gaps: Newly Discovered Frameworks](gaps.md)
