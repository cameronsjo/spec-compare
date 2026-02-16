# OpenSpec (Fission-AI)

**Type:** Lightweight spec-driven framework
**Repository:** https://github.com/Fission-AI/OpenSpec
**Website:** https://openspec.dev/
**Status:** Production-ready
**License:** MIT
**Current Version:** v1.0.0 ("The OPSX Release", January 2026)

## Core Approach

Dual-folder model separating current specs (`openspec/specs/`) from proposed changes (`openspec/changes/`). Excels at managing updates to existing features.

**Key Philosophy:** Align humans and AI coding assistants with spec-driven development so you agree on what to build before any code is written.

## Pre-1.0 vs v1.0: What Changed

The v1.0 release (January 2026) was a significant architectural overhaul. The comparison below captures the tool as it existed at time of writing (pre-1.0) versus what shipped.

### Workflow: Phase-Locked → Action-Based

**Pre-1.0** enforced a strict linear pipeline with three commands:

| Legacy Command | Purpose |
|---|---|
| `/openspec:proposal` | Generate all planning artifacts at once |
| `/openspec:apply` | Implement tasks from the proposal |
| `/openspec:archive` | Archive completed change, merge specs |

This was all-or-nothing. You couldn't create artifacts incrementally, backtracking from implementation to planning was awkward, and there was no exploration phase.

**v1.0** replaced the three rigid commands with 10 flexible actions under the `/opsx:` prefix:

| Command | Purpose |
|---|---|
| `/opsx:explore` | Brainstorm before committing to a direction |
| `/opsx:new` | Initialize a new change |
| `/opsx:continue` | Create the next artifact incrementally |
| `/opsx:ff` | Fast-forward: generate all planning artifacts at once |
| `/opsx:apply` | Implement the tasks |
| `/opsx:verify` | Validate implementation against specs |
| `/opsx:sync` | Merge delta specs back into main specs |
| `/opsx:archive` | Finalize a completed change |
| `/opsx:bulk-archive` | Batch-archive multiple changes with conflict detection |
| `/opsx:onboard` | Guided 15-minute walkthrough |

Artifacts now form a DAG (directed acyclic graph) with three states: BLOCKED (missing dependencies), READY (dependencies satisfied, file doesn't exist), DONE (file exists). `/opsx:continue` uses topological sorting to determine what's ready next.

**Common workflow patterns:**

- **Quick feature:** `/opsx:new` → `/opsx:ff` → `/opsx:apply` → `/opsx:verify` → `/opsx:archive`
- **Exploratory:** `/opsx:explore` → `/opsx:new` → `/opsx:continue` (repeat) → `/opsx:apply`
- **Parallel changes:** Work on change A, switch to urgent change B, resume A. `/opsx:bulk-archive` handles batch completion.

### Instructions: Hardcoded TypeScript → Dynamic Three-Layer Assembly

**Pre-1.0:** AI received identical static prompts baked into the package source as TypeScript string literals. Customization required modifying and rebuilding the package.

**v1.0:** Instructions are assembled dynamically at runtime from three layers:

**Layer 1 — Context** (your tech stack): Defined in `openspec/config.yaml` under `context:` (max 50KB). Injected into every planning request.

```yaml
context: |
  Tech stack: TypeScript, React, Node.js
  Testing: Vitest for unit tests
  Database: PostgreSQL with Prisma ORM
```

**Layer 2 — Rules** (artifact-specific constraints): Defined under `rules:`, keyed by artifact ID. Applied only to the relevant artifact.

```yaml
rules:
  specs:
    - Use Given/When/Then format for all scenarios
  design:
    - Include sequence diagrams for async flows
  tasks:
    - Maximum 3 subtasks per top-level task
```

**Layer 3 — Templates** (output structure): External YAML schemas in `openspec/schemas/` define each artifact's markdown output format.

At runtime the system loads the schema, detects change state, injects project context, applies per-artifact rules, and renders markdown templates. Edit `config.yaml` or a schema template and effects are immediate — no rebuild required.

### Spec Syncing: Brittle Header Matching → Semantic Requirement Parsing

**Pre-1.0:** Archiving a change merged delta specs into main specs using text-level matching on markdown headers. Rename a header, change its level, or reorder sections, and the merge broke.

**v1.0:** Syncing parses at the **requirement level** using explicit semantic markers in delta specs:

- `## ADDED Requirements` — new behavior being introduced
- `## MODIFIED Requirements` — existing behavior being changed (notes previous values)
- `## REMOVED Requirements` — deprecated functionality being eliminated
- `## RENAMED Requirements` — requirements that changed names

Each requirement must include at least one `#### Scenario:` block in Given/When/Then format. The system matches on requirement identity, not header text — surviving renames, reordering, and concurrent changes to the same spec file.

### Configuration: Scattered Files → Unified Skills Directory

**Pre-1.0:** Generated tool-specific config files scattered across the project:

- `CLAUDE.md`, `.cursorrules`, `AGENTS.md`, `project.md`
- `.claude/commands/openspec/*.md`
- `.cursor/commands/openspec-*.md`
- `.windsurf/workflows/openspec-*.md`
- `.clinerules/workflows/openspec-*.md`
- `.roo/commands/openspec-*.md`
- `.github/prompts/openspec-*.prompt.md`

**v1.0:** A single `.claude/skills/` directory (or equivalent per tool) contains 10 YAML-fronted markdown skill files auto-detected by AI coding assistants:

```
.claude/skills/
├── openspec-explore/SKILL.md
├── openspec-new-change/SKILL.md
├── openspec-continue-change/SKILL.md
├── openspec-fast-forward/SKILL.md
├── openspec-apply-change/SKILL.md
├── openspec-verify/SKILL.md
├── openspec-sync/SKILL.md
├── openspec-archive/SKILL.md
├── openspec-bulk-archive/SKILL.md
└── openspec-onboard/SKILL.md
```

Configuration consolidated from 2 files (`openspec/project.md` + `openspec/AGENTS.md`) to 1 (`openspec/config.yaml`).

### Other v1.0 Additions

- **Custom schemas:** Define custom artifact workflows in `openspec/schemas/` without modifying package code. Default is `spec-driven` (proposal → specs → design → tasks); teams can create alternatives
- **Verification step** (`/opsx:verify`): Validates implementation across completeness, correctness, and coherence
- **21 AI tool support:** Claude Code, Cursor, Windsurf, Continue, Gemini CLI, GitHub Copilot, Amazon Q, Cline, RooCode, Kilo Code, Auggie, CodeBuddy, Qoder, Qwen, CoStrict, Crush, Factory, OpenCode, Antigravity, iFlow, and Codex
- **Migration path:** `openspec init` upgrades in place. Active changes, archives, and main specs preserved. Only obsolete config files cleaned up after confirmation

## Key Features (Unchanged)

### Structural Organization

- Separates current specs (`openspec/specs/`) from proposed changes (`openspec/changes/`)
- Groups each feature's proposal, tasks, and spec deltas in a single change folder
- Maintains an audit trail of what's proposed, active, or archived

### AI Tool Integration

- Native slash commands / skill files for 21 AI coding tools
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
- Skill files for chosen AI tools
- Configuration file (`openspec/config.yaml`)

## CLI Commands

- `openspec init` - Initialize or upgrade OpenSpec in a project
- `openspec list` - View active changes
- `openspec show <change>` - Display change details
- `openspec validate <change>` - Check spec formatting
- `openspec archive <change>` - Move completed change to archive
- `openspec view` - Interactive dashboard
- `openspec instructions <artifact-id> --change <name> --json` - Query assembled instructions

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

## Sources

- [OpenSpec GitHub Repository](https://github.com/Fission-AI/OpenSpec)
- [openspec.dev](https://openspec.dev/)
- [Release v1.0.0 — The OPSX Release](https://github.com/Fission-AI/OpenSpec/releases/tag/v1.0.0)
- [OPSX System Documentation](https://github.com/Fission-AI/OpenSpec/blob/main/docs/opsx.md)
- [Migration Guide](https://github.com/Fission-AI/OpenSpec/blob/main/docs/migration-guide.md)

## Related

- [Comparison Matrix](../comparison.md)
- [Recommendations](../recommendations.md)
