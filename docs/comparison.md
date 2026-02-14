# Tool Comparison Matrices

## Quick Comparison Table

| Tool | License | Git Worktrees | Best For | Maturity |
|------|---------|---------------|----------|----------|
| [Spec-Kit](tools/spec-kit.md) | Open Source | No | Greenfield projects | Production |
| [Spec Kitty](tools/spec-kitty.md) | Open Source | **Yes** | Parallel development | Active Dev |
| [BMad Method](tools/bmad-method.md) | Open Source | No | Enterprise workflows | Alpha/Stable |
| [OpenSpec](tools/openspec.md) | MIT | No | Brownfield changes | Production |
| [Kiro](tools/kiro.md) | Proprietary | No | IDE experience | Preview |
| [Tessl](tools/tessl.md) | Proprietary | No | Spec-as-source | Beta |

## Detailed Feature Matrix

| Feature | Spec-Kit | Spec Kitty | BMad | OpenSpec | Kiro | Tessl |
|---------|----------|------------|------|----------|------|-------|
| **Maturity** | Production | Active Dev | Alpha/Stable | Production | Preview | Beta |
| **License** | Open Source | Open Source | Open Source | MIT | Proprietary | Proprietary |
| **Primary Use** | Greenfield | Orchestration | Enterprise | Brownfield | IDE Experience | Spec-as-Source |
| **Git Worktrees** | No | **Yes** | No | No | No | No |
| **Agents Supported** | 15+ | 11+ | Built-in 19 | Multiple | Built-in | Multiple |
| **Dashboard** | No | Yes (Kanban) | No | CLI | IDE | No |
| **Installation** | CLI | CLI + Dashboard | CLI | CLI | CLI/IDE | CLI |
| **Complexity** | Medium | High | Very High | Low | Medium | High |
| **Learning Curve** | Moderate | Steep | Steep | Gentle | Moderate | Moderate |
| **Best For Size** | Medium-Large | Large | Enterprise | Any | Small-Medium | Large |
| **Workflow Phases** | 4-6 | 7+ | 4 | 4 | 3 | Continuous |
| **Documentation** | Verbose | Very Verbose | Comprehensive | Lightweight | Moderate | Moderate |
| **Multi-Agent** | No | Yes | Built-in | No | Limited | No |
| **Cost** | Free | Free | Free | Free | Free (preview) | Unknown |
| **MCP Support** | No | No | No | No | Yes | Yes |
| **Parallel Features** | No | **Yes** | No | No | No | No |
| **Change Management** | Basic | Advanced | Advanced | Excellent | Basic | Experimental |
| **API Focus** | No | No | Yes | No | No | No |
| **IDE Integration** | No | No | No | No | Yes | No |
| **AGENTS.md** | ✅ Generated | ✅ Generated | ✅ Generated | ⚠️ Pre-1.0 only | ❌ | ❌ |
| **CLAUDE.md** | ✅ Generated | ✅ Generated | ✅ Generated | ⚠️ Pre-1.0 only | ❌ | ❌ |
| **SKILL.md** | ❌ | ❌ | ❌ | ✅ v1.0 | ❌ | ❌ |
| **Slash Commands** | ✅ 8 | ✅ 13 | ✅ 50+ workflows | ✅ 10 (`/opsx:`) | ❌ | ❌ |

## Agent Configuration Support

How each tool communicates instructions to AI coding agents:

| Tool | Primary Mechanism | AGENTS.md | CLAUDE.md | .cursorrules | SKILL.md | Slash Commands |
|------|-------------------|-----------|-----------|--------------|----------|----------------|
| **Spec-Kit** | Slash commands in `.claude/commands/` | ✅ | ✅ | ✅ | ❌ | 8 commands |
| **Spec Kitty** | Slash commands in agent-specific dirs | ✅ | ✅ | ✅ | ❌ | 13 commands |
| **BMad** | Agent configs in `.bmad/` + tool dirs | ✅ | ✅ | ✅ | ❌ | 50+ workflows |
| **OpenSpec** (pre-1.0) | Scattered config files | ✅ | ✅ | ✅ | ❌ | 3 commands |
| **OpenSpec** (v1.0) | Unified skills directory | ❌ (removed) | ❌ (removed) | ❌ (removed) | ✅ 10 skills | 10 actions |
| **Kiro** | Proprietary IDE hooks | ❌ | ❌ | ❌ | ❌ | IDE-native |
| **Tessl** | Proprietary platform | ❌ | ❌ | ❌ | ❌ | CLI-native |

**Key finding:** OpenSpec v1.0 is the only tool that migrated from AGENTS.md/CLAUDE.md to the newer SKILL.md standard. All other open-source tools still generate AGENTS.md. The AGENTS.md standard itself (28.64% runtime reduction in evaluations) continues to gain adoption — OpenAI Codex ships 88 AGENTS.md files in its own repo.

## Capability Matrix

| Aspect | Spec-Kit | Spec Kitty | BMad | OpenSpec | Kiro | Tessl |
|--------|----------|------------|------|----------|------|-------|
| **Git Worktrees** | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Open Source** | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| **Production Ready** | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ❌ |
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

**Implements:** Spec-Kit, Kiro, BMad

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

#### Agent-Driven (BMad)

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

- [Use Case Scoring](use-case-scoring.md) - Practical scenario-based grades
- [Iterative Development](iterative-development.md) - Deep dive on spec modifications
- [Git Worktree Support](git-worktree-support.md)
- [Recommendations](recommendations.md)
- [Critical Analysis](critical-analysis.md)
