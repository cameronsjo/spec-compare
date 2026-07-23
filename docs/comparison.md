# Tool Comparison Matrices

> **Note:** The three tables in this section are generated from the tool JSONs
> (`site/src/data/tools/*.json`) by `npm run gen:tables` — the same single source
> of truth the live site derives from. Edit the JSON, not the table. The
> architectural-philosophy sections further down are hand-curated analysis.

## Quick Comparison Table

<!-- GEN:quick-comparison -->
| Tool | Tier | License | Worktrees | Best For | Maturity (version) |
|---|---|---|---|---|---|
| [BMad Method](tools/bmad-method.md) | Core | Open Source | No | Enterprise workflows | Stable (v6.8.0) |
| Conductor | Emerging | Proprietary (free) | **Yes** | Parallel worktree execution (macOS) | Active Dev (v0.36.3) |
| Frame | Emerging | Apache-2.0 | **Yes** | GUI-orchestrated parallel agents | Active Dev (v2.4.0) |
| GAAI | Emerging | Source-available (Elastic License 2.0) | No | Governed autonomous delivery | Active Dev (v2.49.0 (git tag)) |
| GRACE | Emerging | MIT | No | Contract-first formal specs | Beta (v4.0.0-rc.3) |
| [GSD (Get Shit Done)](tools/gsd.md) | Emerging | Open Source | No | Solo devs, context management | Production (v1.42.3) |
| Kilo Code | Emerging | Open Source | No | Mode-based engineering, durable memory | Active Dev (v7.3.16) |
| [Kiro](tools/kiro.md) | Core | Proprietary (paid tiers + free tier) | No | IDE experience | Production (v0.12.263) |
| MoAI-ADK | Emerging | Apache-2.0 | **Yes** | Disciplined TDD with Claude Code | Active Dev (v3.0.0) |
| [OpenSpec](tools/openspec.md) | Core | MIT | No | Brownfield changes | Production (v1.3.1) |
| [Ralph Loop](tools/ralph-loop.md) | Emerging | Various (open source) | No | Autonomous hands-off execution | Production (Technique — unversioned) |
| Smart Ralph | Emerging | MIT | No | Hands-off spec-to-code loops | Active Dev (v4.0.0) |
| [Spec Kitty](tools/spec-kitty.md) | Core | Open Source | **Yes** | Parallel development | Active Dev (v3.2.5) |
| [Spec-Kit](tools/spec-kit.md) | Core | Open Source | No | Greenfield projects | Production (v0.8.18) |
| [Superpowers](tools/superpowers.md) | Core | MIT | **Yes** | Disciplined autonomous dev (any agent) | Active Dev (v5.1.0) |
| [Tessl](tools/tessl.md) | Core | Proprietary | No | Spec-as-source | Active Dev (Framework + Registry (public)) |
| [Traycer](tools/traycer.md) | Core | Proprietary | No | Plan-first orchestration over your agents | Active Dev (VS Code extension (rolling)) |
| Zencoder / Zenflow | Emerging | Proprietary | **Yes** | Parallel agents at scale (commercial) | Active Dev (Zenflow — free desktop app (rolling)) |
<!-- /GEN:quick-comparison -->

## Detailed Feature Matrix

One row per tool; columns are the schema-backed capability flags. Qualitative
nuance (agent counts, documentation weight, cost) lives in each tool's profile.

<!-- GEN:feature-matrix -->
| Tool | Worktrees | Multi-Agent | Parallel | Dashboard | MCP | IDE | Open Source | Complexity | Learning Curve | Spec Maturity |
|---|---|---|---|---|---|---|---|---|---|---|
| [BMad Method](tools/bmad-method.md) | ❌ | ✅ | ❌ | No | ❌ | ❌ | ✅ | Very High | Steep | Spec-First |
| Conductor | ✅ | ✅ | ✅ | Desktop | ❌ | ❌ | ❌ | Low | Gentle | — |
| Frame | ✅ | ✅ | ✅ | Desktop | ❌ | ❌ | ✅ | Medium | Moderate | Spec-First |
| GAAI | ❌ | ✅ | ✅ | Terminal | ❌ | ❌ | ❌ | Medium | Moderate | Spec-First |
| GRACE | ❌ | ✅ | ✅ | No | ❌ | ❌ | ✅ | High | Steep | Spec-Anchored |
| [GSD (Get Shit Done)](tools/gsd.md) | ❌ | ✅ | ✅ | No | ❌ | ❌ | ✅ | Medium | Moderate | Spec-First |
| Kilo Code | ❌ | ✅ | ✅ | IDE | ❌ | ✅ | ✅ | Medium | Moderate | Spec-Anchored |
| [Kiro](tools/kiro.md) | ❌ | ⚠️ | ✅ | IDE | ✅ | ✅ | ❌ | Medium | Moderate | Spec-First |
| MoAI-ADK | ✅ | ✅ | ✅ | Web | ❌ | ❌ | ✅ | High | Steep | Spec-First |
| [OpenSpec](tools/openspec.md) | ❌ | ❌ | ❌ | CLI | ❌ | ❌ | ✅ | Low | Gentle | Spec-Anchored |
| [Ralph Loop](tools/ralph-loop.md) | ❌ | ❌ | ❌ | No | ❌ | ❌ | ✅ | Low | Gentle | — |
| Smart Ralph | ❌ | ⚠️ | ❌ | No | ✅ | ❌ | ✅ | Medium | Moderate | Spec-First |
| [Spec Kitty](tools/spec-kitty.md) | ✅ | ✅ | ✅ | Kanban | ❌ | ❌ | ✅ | High | Steep | Spec-Anchored |
| [Spec-Kit](tools/spec-kit.md) | ❌ | ❌ | ❌ | No | ❌ | ❌ | ✅ | Medium | Moderate | Spec-First |
| [Superpowers](tools/superpowers.md) | ✅ | ✅ | ❌ | No | ❌ | ❌ | ✅ | Medium | Gentle | Spec-First |
| [Tessl](tools/tessl.md) | ❌ | ❌ | ❌ | No | ✅ | ❌ | ❌ | High | Moderate | Spec-as-Source |
| [Traycer](tools/traycer.md) | ❌ | ⚠️ | ❌ | IDE | ❌ | ✅ | ❌ | Low | Gentle | Spec-First |
| Zencoder / Zenflow | ✅ | ✅ | ✅ | Desktop | ❌ | ✅ | ❌ | Medium | Moderate | Spec-Anchored |
<!-- /GEN:feature-matrix -->

## Agent Configuration Support

How each tool communicates instructions to AI coding agents (tools that declare an `agentConfig`):

<!-- GEN:agent-config -->
| Tool | AGENTS.md | CLAUDE.md | SKILL.md | Slash Commands |
|---|---|---|---|---|
| [BMad Method](tools/bmad-method.md) | ✅ | ✅ | ❌ | 50 |
| [Kiro](tools/kiro.md) | ❌ | ❌ | ❌ | 0 |
| [OpenSpec](tools/openspec.md) | ⚠️ removed | ⚠️ removed | ✅ | 10 |
| [Spec Kitty](tools/spec-kitty.md) | ✅ | ✅ | ❌ | 13 |
| [Spec-Kit](tools/spec-kit.md) | ✅ | ✅ | ❌ | 8 |
| [Superpowers](tools/superpowers.md) | ❌ | ❌ | ✅ | 0 |
| [Tessl](tools/tessl.md) | ❌ | ❌ | ❌ | 0 |
| [Traycer](tools/traycer.md) | ❌ | ❌ | ❌ | 0 |
<!-- /GEN:agent-config -->

**Key finding:** OpenSpec is the only tool that migrated from AGENTS.md/CLAUDE.md (shown as ⚠️ removed) to the newer SKILL.md standard. Other open-source tools still generate AGENTS.md. The AGENTS.md standard itself (28.64% runtime reduction in evaluations) continues to gain adoption — OpenAI Codex ships 88 AGENTS.md files in its own repo.

## Capability Matrix

> Hand-curated qualitative view of the **original six core tools**. For the complete, always-current 18-tool capability flags see the generated [Detailed Feature Matrix](#detailed-feature-matrix) above; for the newer core tools see [Superpowers](tools/superpowers.md) and [Traycer](tools/traycer.md).

| Aspect | Spec-Kit | Spec Kitty | BMad | OpenSpec | Kiro | Tessl |
|--------|----------|------------|------|----------|------|-------|
| **Git Worktrees** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Open Source** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Production Ready** | ✅ | ⚠️ | ✅ | ✅ | ⚠️ | ❌ |
| **Multi-Agent** | ❌ | ✅ | ✅ | ❌ | ⚠️ | ❌ |
| **Dashboard** | ❌ | ✅ | ❌ | ⚠️ | ✅ (IDE) | ❌ |
| **Brownfield** | ⚠️ | ✅ | ⚠️ | ✅ | ⚠️ | ❌ |
| **Greenfield** | ✅ | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| **Trivial Modifications** | ⚠️ | ⚠️ | ❌ | ✅ | ❌ | ✅ |
| **Spec Modifications** | ⚠️ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| **Iterative Changes** | ⚠️ | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| **Learning Curve** | Medium | High | High | Low | Medium | Medium |
| **Complexity** | Medium | High | Very High | Low | Medium | High |
| **MCP Support** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| **API Focus** | ❌ | ❌ | ✅ | ❌ | ❌ | ⚠️ |
| **Spec Maturity** | Spec-First | Spec-Anchored | Spec-First | Spec-Anchored | Spec-First | Spec-as-Source |

Legend:
- ✅ Excellent/Full Support
- ⚠️ Partial/Limited Support
- ❌ Not Supported/Not Applicable

## Architectural Approaches

### Three Levels of SDD Maturity

#### 1. Spec-First
Well-crafted specs precede coding but are discarded afterward.

**Implements:** Spec-Kit, Kiro, BMad, Superpowers, Traycer

**Characteristics:**
- Specs guide initial development
- Code becomes source of truth after implementation
- Specs may become stale or ignored during maintenance
- Traditional approach adapted for AI

#### 2. Spec-Anchored
Specs persist and evolve alongside features during maintenance.

**Implements:** OpenSpec, Spec Kitty

**Characteristics:**
- Specs maintained throughout project lifecycle
- Change management processes update specs
- Audit trail of specification evolution
- Specs remain synchronized with code

#### 3. Spec-as-Source
Humans edit only specs; code generation remains automatic.

**Implements:** Tessl only

**Characteristics:**
- Specifications are the primary maintained artifact
- Code is generated and marked as disposable
- One-to-one mapping between specs and code files
- Most radical departure from traditional development
- Unproven at scale

### Workflow Philosophies

#### Constitution-Driven (Spec-Kit, Spec Kitty)

**Approach:**
- Establish immutable principles first
- Progressive refinement through phases
- Emphasis on architectural consistency
- Top-down governance

**Workflow:**
Constitution → Specify → Plan → Tasks → Implement

**Strengths:**
- Consistent architectural patterns
- Clear governance
- Predictable outcomes

**Weaknesses:**
- Can feel rigid
- Upfront investment required
- May resist needed architectural changes

#### Agent-Driven (BMad, Superpowers, Traycer)

BMad assigns *named role agents* (PM, Architect, QA). Superpowers and Traycer are
the newer, lighter expression of the same philosophy — they orchestrate *sub-agents
or your existing agent* through phases rather than simulating an org: Superpowers
auto-triggers skills (brainstorm → plan → subagent TDD → review), and Traycer
sequences Plan → Execute → Verify over the agent of your choice.

**Approach:**
- Specialized roles with specific responsibilities
- Structured handoffs between agents
- Comprehensive coverage of SDLC phases
- Role-based collaboration

**Workflow:**
Analysis → Planning → Solutioning → Implementation

**Strengths:**
- Clear role separation
- Comprehensive coverage
- Structured collaboration

**Weaknesses:**
- Complex orchestration
- Steep learning curve
- May be overkill for simple projects

#### Change-Driven (OpenSpec)

**Approach:**
- Separate proposed changes from accepted specs
- Audit trail and versioning
- Lightweight iteration
- Evolutionary change management

**Workflow:**
Draft → Review → Implement → Archive

**Strengths:**
- Excellent for brownfield projects
- Clear change history
- Lightweight and flexible

**Weaknesses:**
- Less structure for greenfield
- Minimal orchestration
- Limited multi-agent support

#### Context-Driven (Kiro, Tessl)

**Approach:**
- Flexible "steering" or registry-based context
- Emphasis on reducing hallucinations
- Knowledge base integration
- Context as dependencies

**Workflow:**
Requirements → Design → Tasks (Kiro)
Spec Registry → Framework → Generated Code (Tessl)

**Strengths:**
- Reduces AI hallucinations
- Rich contextual information
- Prevents API version errors

**Weaknesses:**
- Proprietary platforms
- Vendor lock-in risk
- Experimental approaches

## Use Case Scoring

For detailed scoring across 12 real-world scenarios (button color changes, greenfield features, bug fixes, etc.), see:

**[Use Case Scoring Matrix](use-case-scoring.md)**

Includes practical grades for:
- Trivial modifications (change button color)
- Medium refactoring
- Greenfield features
- Emergency hotfixes
- Parallel development
- And more

## Related

- [Use Case Scoring](use-case-scoring.md) — Practical scenario-based grades + expanded 18-tool heatmap
- [Iterative Development](iterative-development.md) — Deep dive on spec modifications
- [Orchestration Landscape](landscape.md) — Agent Teams and 30+ multi-agent tools
- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical workflow guide
- [Gaps: New Frameworks](gaps.md) — GSD, Ralph Loop, Zencoder, Kilo Code, Conductor
- [Git Worktree Support](git-worktree-support.md)
- [Recommendations](recommendations.md)
- [Critical Analysis](critical-analysis.md)
