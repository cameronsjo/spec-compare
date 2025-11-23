# Recommendations

## Decision Framework

### Choose [Spec-Kit](tools/spec-kit.md) If You:

- Are starting a greenfield project
- Want open-source, battle-tested foundation
- Need multi-agent compatibility
- Value community standards
- Prefer constitution-driven governance
- Can invest time in upfront specification
- **Don't need git worktree support**

**Skip if:** You find it too rigid, work primarily on brownfield projects, or need parallel feature development.

---

### Choose [Spec Kitty](tools/spec-kitty.md) If You:

- **Work with git worktrees for parallel development**
- Manage multiple parallel AI agents
- Need visual workflow tracking (kanban)
- Want automated worktree creation and management
- Are building on Spec-Kit and need orchestration
- Need multi-project dashboard visibility
- Coordinate distributed teams
- **Find Spec-Kit too rigid and want more flexibility**

**Skip if:** Solo developer on simple projects, dashboard overhead unnecessary, prefer simpler tools.

**Best Match For:** Git worktree users and teams needing parallel feature development.

---

### Choose [BMad Method](tools/bmad-method.md) If You:

- Need comprehensive enterprise workflows
- Want 19 specialized agent roles
- Require scale-adaptive planning
- Value structured, battle-tested processes
- Building API-driven architectures
- Need OpenAPI/Swagger integration
- Can invest in 30+ minute setup
- Working on large enterprise projects

**Skip if:** Small projects, prefer simplicity, find 19 agents overwhelming.

---

### Choose [OpenSpec](tools/openspec.md) If You:

- Work with existing codebases (brownfield)
- Need lightweight, auditable changes
- Want simple change management
- Prefer minimal overhead
- Value evolutionary approach
- Need clear audit trail
- Want flexibility over structure
- Prioritize MIT license

**Skip if:** Greenfield projects, need orchestration, want comprehensive workflows.

---

### Choose [Kiro](tools/kiro.md) If You:

- Want integrated IDE experience
- Need multimodal input (images, designs)
- Value autopilot autonomous execution
- Are in AWS ecosystem
- Prefer three-step workflow (Requirements → Design → Tasks)
- Want MCP integration
- Need background automation (agent hooks)
- Can accept proprietary platform

**Skip if:** Avoid vendor lock-in, need open source, require git worktree support.

---

### Choose [Tessl](tools/tessl.md) If You:

- Want cutting-edge spec-as-source approach
- Need 10K+ library specifications (spec registry)
- Prioritize accuracy over experimentation (90% improvement claim)
- Can accept vendor lock-in for benefits
- Willing to adopt radical new approach
- Have complex library dependency management
- Want to prevent API hallucinations
- Can wait for closed beta access (framework)

**Skip if:** Need production-ready tools, avoid proprietary platforms, unproven approaches concern you.

---

### Choose Traditional Agile (No SDD Tool) If You:

- Have small, fast-moving teams
- Value code as source of truth
- Prefer close collaboration over documentation
- Find SDD overhead excessive
- Work on simple projects
- Rapid iteration is priority
- Specification bureaucracy slows you down

**When SDD Adds Value:**
- Complex projects with multiple developers/agents
- Need for coordination and consistency
- Greenfield projects requiring clear direction
- AI coding where specifications prevent errors

---

## Recommendations by Use Case

### Solo Developers

**Start with:** [OpenSpec](tools/openspec.md) or [Spec-Kit](tools/spec-kit.md) for simplicity
**Avoid:** Spec Kitty's orchestration overhead, BMad's 19 agents

**Rationale:** Solo developers don't need multi-agent coordination or kanban dashboards. Keep it simple.

---

### Small Teams (2-5 Developers)

**Start with:** [Spec-Kit](tools/spec-kit.md) for greenfield, [Kiro](tools/kiro.md) for IDE experience
**Avoid:** BMad's complexity, Tessl's experimental approach

**Rationale:** Small teams benefit from structure but don't need enterprise-scale workflows.

---

### Medium Teams (5-15 Developers)

**Consider:** [Spec Kitty](tools/spec-kitty.md) if coordinating multiple agents, [BMad](tools/bmad-method.md) for comprehensive workflows
**Evaluate:** Git worktree needs, parallel development patterns

**Rationale:** Medium teams often have parallel work and coordination challenges. Spec Kitty's orchestration or BMad's structured workflows help.

---

### Enterprise Teams (15+ Developers)

**Evaluate:** [BMad Method](tools/bmad-method.md) or [Tessl](tools/tessl.md) for scale, accuracy, and structured processes
**Consider:** [Spec Kitty](tools/spec-kitty.md) for visual tracking across large teams

**Rationale:** Enterprise teams need comprehensive workflows, governance, and coordination at scale.

---

### Brownfield Projects (Existing Codebases)

**Use:** [OpenSpec](tools/openspec.md) for its change-management focus and audit trails
**Avoid:** Spec-Kit (designed for greenfield), Tessl (experimental)

**Rationale:** Brownfield projects need evolutionary change management, not greenfield workflows.

---

### Greenfield Projects (New Codebases)

**Use:** [Spec-Kit](tools/spec-kit.md) for battle-tested foundation, [Kiro](tools/kiro.md) for rapid prototyping
**Consider:** [BMad](tools/bmad-method.md) for enterprise projects

**Rationale:** Greenfield projects benefit most from constitution-driven governance and structured planning.

---

### API-Driven Architectures

**Use:** [BMad Method](tools/bmad-method.md) for OpenAPI/Swagger integration
**Consider:** [Tessl](tools/tessl.md) for spec registry (prevents API hallucinations)

**Rationale:** BMad's Architect Agent creates precise API specs; Tessl's registry prevents version errors.

---

### Experimentation & Learning

**Try:** [Kiro](tools/kiro.md) (free preview) or [Tessl](tools/tessl.md) Registry (open beta)
**Avoid:** Enterprise commitments before understanding SDD

**Rationale:** Explore cutting-edge approaches without long-term commitment. Learn by doing.

---

### Parallel Development Teams

**Use:** [Spec Kitty](tools/spec-kitty.md) for worktree management and kanban tracking
**Avoid:** Tools without multi-agent or parallel workflow support

**Rationale:** Parallel development requires worktree isolation and coordination dashboards.

---

## For Git Worktree Users Specifically

**Primary Recommendation: [Spec Kitty](tools/spec-kitty.md)**

Spec Kitty is the only tool with built-in git worktree support, directly addressing needs for:

**Why Spec Kitty:**
- **Automatic worktree management:** `/spec-kitty.specify` creates feature branch AND worktree
- **Parallel feature isolation:** Work on multiple features simultaneously
- **Less rigid:** Worktree strategy provides more flexibility than Spec-Kit's linear approach
- **Visual tracking:** Kanban dashboard helps manage parallel work
- **Automated cleanup:** `/spec-kitty.merge` handles worktree removal

**Trade-offs:**
- More complex than Spec-Kit (adds orchestration layer)
- Requires Python (pip install)
- Dashboard may be overhead if solo developer

**Alternative: Manual Worktrees + [OpenSpec](tools/openspec.md)**

If Spec Kitty's complexity is too much:
- Use OpenSpec for lightweight change management
- Manually create git worktrees for features
- Lose automation but gain simplicity

```bash
# Manual worktree workflow with OpenSpec
git worktree add ../myproject-feature-x feature-x
cd ../myproject-feature-x
openspec init
# ... develop feature ...
git checkout main
git merge feature-x
git worktree remove ../myproject-feature-x
```

## Related

- [Comparison Matrix](comparison.md)
- [Git Worktree Support](git-worktree-support.md)
- [Critical Analysis](critical-analysis.md)
