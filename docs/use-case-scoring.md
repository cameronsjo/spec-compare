# Use Case Scoring Matrix

This document grades each spec-driven development tool against real-world scenarios, providing practical guidance for tool selection.

## Scoring System

- ⭐⭐⭐⭐⭐ **Excellent** - Purpose-built for this scenario, minimal friction
- ⭐⭐⭐⭐ **Very Good** - Works well with minor adjustments
- ⭐⭐⭐ **Good** - Functional but has noticeable overhead
- ⭐⭐ **Poor** - Significant friction, not recommended
- ⭐ **Very Poor** - Major impediment, avoid for this use case

---

## Use Case 1: Change Button Color (Trivial Modification)

**Scenario:** Change primary button background from blue (#0000FF) to green (#00FF00)

**Requirements:** Single-line CSS change, minimal documentation

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐⭐ | Lightweight delta format. Create `changes/button-color/` with MODIFIED section. Minimal overhead. |
| **Tessl** | ⭐⭐⭐⭐ | Edit spec directly, regenerate code. Elegant but closed beta limits access. |
| **Spec-Kit** | ⭐⭐⭐ | Must use `/speckit.clarify` workaround. `/speckit.specify` wants to create new feature. Requires regenerate plan/tasks. |
| **Spec Kitty** | ⭐⭐ | Same Spec-Kit issues + worktree overhead excessive for one-line change. |
| **Kiro** | ⭐⭐ | Generates 5-page spec for trivial change. "Sledgehammer to crack a nut" problem. |
| **BMad** | ⭐ | 19 agents, 30+ minute workflow for button color. Massive overkill. |

**Winner:** OpenSpec
**Avoid:** BMad, Kiro

---

## Use Case 2: Build New Greenfield Feature (0→1)

**Scenario:** Build user authentication system from scratch with login, signup, password reset

**Requirements:** Comprehensive planning, architectural decisions, multi-component coordination

| Tool | Score | Reasoning |
|------|-------|-----------|
| **Spec-Kit** | ⭐⭐⭐⭐⭐ | Constitution-driven governance. Specify → Plan → Tasks → Implement workflow purpose-built for greenfield. |
| **BMad** | ⭐⭐⭐⭐⭐ | 19 specialized agents (PM, Architect, Security Expert). Comprehensive enterprise workflows. |
| **Spec Kitty** | ⭐⭐⭐⭐ | Spec-Kit workflow + worktree isolation. Good for larger features. |
| **Kiro** | ⭐⭐⭐⭐ | Three-step Requirements → Design → Tasks works well for greenfield. |
| **Tessl** | ⭐⭐⭐ | Spec-as-source works but one-to-one mapping may limit architecture. Closed beta. |
| **OpenSpec** | ⭐⭐⭐ | Lightweight, better suited for modifications than greenfield. |

**Winner:** Spec-Kit, BMad (tie)
**Good Alternative:** Spec Kitty, Kiro

---

## Use Case 3: Refactor Existing Component (Medium Modification)

**Scenario:** Refactor UserProfile component to use composition pattern instead of props drilling

**Requirements:** Change architecture, update multiple files, maintain backwards compatibility

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐⭐ | Change proposal with MODIFIED/ADDED/REMOVED sections. Consolidates cross-file changes. |
| **Spec-Kit** | ⭐⭐⭐⭐ | Update spec, regenerate plan. Good for medium changes with clarify workflow. |
| **Tessl** | ⭐⭐⭐⭐ | Edit spec, regenerate implementation. Works well theoretically. |
| **Spec Kitty** | ⭐⭐⭐ | Worktree isolation helps but workflow overhead for medium change. |
| **Kiro** | ⭐⭐⭐ | Can generate appropriate specs but still heavyweight. |
| **BMad** | ⭐⭐ | Comprehensive but excessive for refactoring. |

**Winner:** OpenSpec
**Good Alternative:** Spec-Kit, Tessl

---

## Use Case 4: Fix Production Bug

**Scenario:** Critical bug - form validation fails for emails with '+' character

**Requirements:** Fast diagnosis, quick fix, minimal process overhead

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐ | Quick change proposal, fast implementation. Audit trail for bug fix. |
| **None** | ⭐⭐⭐⭐ | Direct code fix may be faster than any SDD tool for emergency. |
| **Tessl** | ⭐⭐⭐ | Edit spec, regenerate. Fast but unproven in emergency scenarios. |
| **Spec-Kit** | ⭐⭐ | Clarify/plan/tasks overhead delays critical fix. |
| **Spec Kitty** | ⭐⭐ | Worktree + spec workflow too slow for emergencies. |
| **Kiro** | ⭐ | Generates excessive documentation for simple bug fix. |
| **BMad** | ⭐ | Enterprise workflow completely inappropriate for hotfix. |

**Winner:** OpenSpec or skip SDD entirely
**Avoid:** All heavyweight tools (BMad, Kiro, Spec Kitty)

---

## Use Case 5: Add REST API Endpoint

**Scenario:** Add `GET /api/users/:id` with authentication, validation, error handling

**Requirements:** OpenAPI/Swagger spec, clear contract definition, comprehensive planning

| Tool | Score | Reasoning |
|------|-------|-----------|
| **BMad** | ⭐⭐⭐⭐⭐ | Architect Agent creates precise OpenAPI specs. Purpose-built for API-driven architectures. |
| **Spec-Kit** | ⭐⭐⭐⭐ | Constitution can enforce API standards. Specify/plan workflow works well. |
| **Tessl** | ⭐⭐⭐⭐ | Spec registry prevents API hallucinations. Good for API contracts. |
| **OpenSpec** | ⭐⭐⭐ | Works but not optimized for API specs. Better for modifications. |
| **Kiro** | ⭐⭐⭐ | Can generate API specs but less structured than BMad. |
| **Spec Kitty** | ⭐⭐⭐ | Spec-Kit API workflow + worktrees. Overhead may not be needed. |

**Winner:** BMad
**Good Alternative:** Spec-Kit, Tessl

---

## Use Case 6: Parallel Feature Development (3 teams, 5 features)

**Scenario:** Three teams building five features simultaneously without conflicts

**Requirements:** Worktree isolation, visual progress tracking, multi-agent coordination

| Tool | Score | Reasoning |
|------|-------|-----------|
| **Spec Kitty** | ⭐⭐⭐⭐⭐ | Built-in worktree strategy. Kanban dashboard. Designed for this scenario. |
| **OpenSpec** | ⭐⭐⭐ | Can use manual worktrees. Change isolation works but no orchestration. |
| **Spec-Kit** | ⭐⭐ | Branch-based, no parallel isolation. Coordination manual. |
| **BMad** | ⭐⭐ | 19 agents but no worktree support. Complex coordination. |
| **Kiro** | ⭐⭐ | No multi-agent orchestration for parallel work. |
| **Tessl** | ⭐⭐ | No parallel feature support mentioned. |

**Winner:** Spec Kitty
**Distant Alternative:** Manual worktrees + OpenSpec

---

## Use Case 7: Cross-Cutting Change (Update all forms)

**Scenario:** Add GDPR consent checkbox to all 15 forms in application

**Requirements:** Touch multiple specs, consistent implementation, audit trail

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐⭐ | Single change proposal can contain deltas for multiple specs. Consolidates related changes. |
| **Spec-Kit** | ⭐⭐⭐ | Must update multiple specs separately. Constitution helps consistency. |
| **Tessl** | ⭐⭐⭐ | Edit multiple specs, regenerate. Works but manual coordination. |
| **Spec Kitty** | ⭐⭐⭐ | Worktree for isolation but doesn't help cross-spec changes. |
| **BMad** | ⭐⭐ | Comprehensive but heavyweight for repetitive change. |
| **Kiro** | ⭐⭐ | No cross-spec optimization. |

**Winner:** OpenSpec
**Alternative:** Spec-Kit with discipline

---

## Use Case 8: Emergency Hotfix (Production Down)

**Scenario:** Production is down, null pointer exception in payment processing

**Requirements:** Immediate fix, deploy ASAP, document later

| Tool | Score | Reasoning |
|------|-------|-----------|
| **None** | ⭐⭐⭐⭐⭐ | **Skip SDD entirely.** Direct code fix, deploy, update specs after. |
| **OpenSpec** | ⭐⭐ | Fastest SDD option but still overhead in emergency. |
| **Spec-Kit** | ⭐ | Clarify/plan/tasks workflow delays critical fix. |
| **Spec Kitty** | ⭐ | Worktree setup wastes precious minutes. |
| **Kiro** | ⭐ | Spec generation delays fix. |
| **BMad** | ⭐ | 30+ minute workflow during outage is malpractice. |
| **Tessl** | ⭐ | Unproven in emergency scenarios. |

**Winner:** No SDD tool
**Reality Check:** Production emergencies require direct code intervention. Update specs afterward.

---

## Use Case 9: Implement Design System

**Scenario:** Build comprehensive design system with tokens, components, patterns, documentation

**Requirements:** Architectural governance, comprehensive planning, long-term maintenance

| Tool | Score | Reasoning |
|------|-------|-----------|
| **Spec-Kit** | ⭐⭐⭐⭐⭐ | Constitution enforces design system principles. Comprehensive specification workflow. |
| **BMad** | ⭐⭐⭐⭐⭐ | 19 agents including UX Designer, Architect. Enterprise-scale planning. |
| **Spec Kitty** | ⭐⭐⭐⭐ | Spec-Kit workflow + visual tracking. Good for large projects. |
| **OpenSpec** | ⭐⭐⭐ | Better for updates than initial build. |
| **Kiro** | ⭐⭐⭐ | Three-step workflow works but less comprehensive. |
| **Tessl** | ⭐⭐ | One-to-one mapping doesn't fit design system architecture. |

**Winner:** Spec-Kit, BMad (tie)
**Good Alternative:** Spec Kitty

---

## Use Case 10: Experimental Prototype (Unclear Requirements)

**Scenario:** Explore AI-powered recommendation feature, requirements evolving rapidly

**Requirements:** Fast iteration, flexibility, minimal documentation overhead

| Tool | Score | Reasoning |
|------|-------|-----------|
| **None** | ⭐⭐⭐⭐⭐ | **Vibe coding** faster for exploration. Add SDD when requirements clarify. |
| **Kiro** | ⭐⭐⭐ | Autopilot mode can explore quickly. But specs may churn. |
| **OpenSpec** | ⭐⭐⭐ | Lightweight changes support iteration. |
| **Spec-Kit** | ⭐⭐ | Constitution locks in decisions too early for exploration. |
| **Spec Kitty** | ⭐⭐ | Full workflow overhead slows experimentation. |
| **Tessl** | ⭐⭐ | Spec-as-source requires knowing what you want. |
| **BMad** | ⭐ | Enterprise planning contradicts experimental nature. |

**Winner:** No SDD (vibe coding)
**SDD Alternative:** OpenSpec, Kiro

---

## Use Case 11: Update Dependencies (Maintenance)

**Scenario:** Update React 17 → 18, fix breaking changes across codebase

**Requirements:** Track changes, update specs, comprehensive testing

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐ | Change proposal tracks all breaking changes. MODIFIED sections for affected components. |
| **Spec-Kit** | ⭐⭐⭐ | Update specs for breaking changes. Constitution helps consistency. |
| **Tessl** | ⭐⭐⭐ | Update specs, regenerate code. Works for breaking changes. |
| **Spec Kitty** | ⭐⭐ | Worktree isolation not needed for dependency updates. |
| **Kiro** | ⭐⭐ | Can generate migration specs but heavyweight. |
| **BMad** | ⭐⭐ | Overkill for dependency updates. |

**Winner:** OpenSpec
**Alternative:** Spec-Kit

---

## Use Case 12: Solo Developer, Side Project

**Scenario:** Building personal portfolio site, working alone, limited time

**Requirements:** Minimal overhead, flexibility, fast iteration

| Tool | Score | Reasoning |
|------|-------|-----------|
| **OpenSpec** | ⭐⭐⭐⭐ | Lightweight, minimal overhead, easy to use solo. |
| **Spec-Kit** | ⭐⭐⭐ | Good structure but may feel like overhead for solo project. |
| **Kiro** | ⭐⭐⭐ | Free preview, integrated IDE. Good for solo developers. |
| **None** | ⭐⭐⭐⭐ | **Vibe coding** perfectly fine for solo side projects. |
| **Spec Kitty** | ⭐⭐ | Dashboard overhead unnecessary for solo work. |
| **Tessl** | ⭐⭐ | Closed beta, unproven. Not for side projects yet. |
| **BMad** | ⭐ | 19 agents completely excessive for solo developer. |

**Winner:** OpenSpec or no SDD
**Alternative:** Spec-Kit, Kiro

---

## Summary Scorecard

### Overall Tool Ratings by Use Case Category

| Tool | Trivial Changes | Medium Changes | Large Features | Parallel Work | Emergency | Overall |
|------|----------------|----------------|----------------|---------------|-----------|---------|
| **OpenSpec** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | **3.6** |
| **Spec-Kit** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | **3.0** |
| **Spec Kitty** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ | **3.0** |
| **BMad** | ⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐ | **2.2** |
| **Kiro** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐ | ⭐ | **2.4** |
| **Tessl** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ | ⭐ | **2.8** |

### Expanded Heatmap (Including New Tools)

Numeric scores (1–5) for quick visual comparison across all tools. Includes the five frameworks from the [gaps analysis](gaps.md).

```
                    Trivial  Medium  Large  Parallel  Emergency  Solo  Context Mgmt  Overall
                    ───────  ──────  ─────  ────────  ─────────  ────  ────────────  ───────
OpenSpec v1.0        5        5       3      3         2          4     2             3.4
Spec-Kit             3        4       5      2         1          3     2             2.9
Spec Kitty           2        3       4      5         1          2     2             2.7
BMad v6              1        2       5      2         1          1     2             2.0
Kiro                 2        3       4      2         1          3     2             2.4
Tessl                4        4       3      2         1          2     2             2.6
GSD                  4        4       4      4         2          5     4             3.9
Ralph Loop           3        3       4      3         2          4     5             3.4
Zencoder/Zenflow     3        4       5      5         1          1     3             3.1
Kilo Code            3        3       4      4         2          3     4             3.3
Conductor            1        1       2      5         1          2     2             2.0
```

**Reading the heatmap:**
- **5** = purpose-built for this scenario
- **4** = works well with minor adjustments
- **3** = functional but noticeable overhead
- **2** = significant friction
- **1** = avoid for this use case

**Context Mgmt** = how well the tool handles agent memory, context window management, and multi-session persistence. GSD (wave-based context management), Ralph Loop (stateless fresh context per iteration), and Kilo Code (Memory Bank) score highest.

**Key shifts from original rankings:**
- GSD scores highest overall (3.9) due to its balance across all categories — it's the closest to a generalist
- Ralph Loop ties OpenSpec (3.4) by excelling at context management and solo use
- Zencoder/Zenflow matches Spec Kitty for parallel work (5) but with commercial polish
- Conductor is pure parallel execution — scores 1 everywhere except parallel work

### Best Tool by Use Case

| Use Case | Best Tool | Runner-Up | Avoid |
|----------|-----------|-----------|-------|
| Trivial modification | OpenSpec | Tessl | BMad |
| Greenfield feature | Spec-Kit, BMad | Spec Kitty | OpenSpec |
| Medium refactoring | OpenSpec | Spec-Kit | BMad |
| Bug fix | OpenSpec or None | - | BMad, Kiro |
| API endpoint | BMad | Spec-Kit | OpenSpec |
| Parallel features | Spec Kitty | OpenSpec | Spec-Kit |
| Cross-cutting change | OpenSpec | Spec-Kit | Kiro |
| Emergency hotfix | None | OpenSpec | All |
| Design system | Spec-Kit, BMad | Spec Kitty | Tessl |
| Experimental prototype | None | Kiro | BMad |
| Dependency updates | OpenSpec | Spec-Kit | BMad |
| Solo side project | OpenSpec or None | Spec-Kit | BMad |

## Key Insights

### 1. OpenSpec Dominates Iterative Scenarios

OpenSpec wins or ties in 8 of 12 use cases, particularly excelling at:
- Trivial modifications
- Medium refactoring
- Cross-cutting changes
- Brownfield maintenance

**Why:** Purpose-built for modifications with lightweight delta format.

### 2. Spec-Kit/BMad Excel at Greenfield

Spec-Kit and BMad win comprehensive planning scenarios:
- Greenfield features
- API-driven architectures
- Design systems
- Enterprise projects

**Why:** Constitution-driven governance and comprehensive workflows.

### 3. Spec Kitty Wins Parallel Work

Spec Kitty uniquely wins parallel feature development:
- Built-in worktree strategy
- Kanban dashboard
- Multi-agent coordination

**Why:** Only tool with explicit parallel feature support.

### 4. No SDD Tool Wins Emergencies

For emergencies and experiments:
- Direct code changes faster
- SDD adds overhead during crises
- Update specs afterward

**Why:** Speed trumps documentation in emergencies.

### 5. Project Size Matters

**Small projects:** OpenSpec or no SDD
**Medium projects:** Spec-Kit or OpenSpec
**Large projects:** Spec Kitty or BMad

**Why:** Overhead acceptable only when justified by project complexity.

## Decision Matrix

Use this to select the right tool:

```
Question 1: Is this a modification or greenfield?
├─ Modification → OpenSpec ⭐
└─ Greenfield → Question 2

Question 2: Is this a large/complex feature?
├─ Yes → Question 3
└─ No → Spec-Kit ⭐

Question 3: Do you need parallel development?
├─ Yes → Spec Kitty ⭐
└─ No → Question 4

Question 4: Is this enterprise-scale?
├─ Yes → BMad ⭐
└─ No → Spec-Kit ⭐
```

## Anti-Patterns by Use Case

### Using BMad for Trivial Changes

**Problem:** 19 agents for button color
**Cost:** 30+ minutes
**Alternative:** OpenSpec (2 minutes)

### Using Spec-Kit for Emergencies

**Problem:** Clarify/plan/tasks during outage
**Cost:** Production downtime extended
**Alternative:** Fix code directly, update specs later

### Using OpenSpec for Greenfield

**Problem:** Lightweight tool for comprehensive planning
**Cost:** Missing architectural governance
**Alternative:** Spec-Kit or BMad

### Using Spec Kitty Solo

**Problem:** Dashboard + worktrees unnecessary
**Cost:** Complexity overhead
**Alternative:** OpenSpec or Spec-Kit

## Recommendations

### For Most Teams

**Hybrid approach:**
1. **OpenSpec** for modifications (80% of work)
2. **Spec-Kit** for greenfield features (20% of work)
3. **No SDD** for emergencies and experiments

### For Enterprise

**Comprehensive coverage:**
1. **BMad** for major features
2. **OpenSpec** for maintenance
3. **Spec Kitty** if parallel development needed

### For Solo Developers

**Minimal overhead:**
1. **OpenSpec** for tracked changes
2. **Vibe coding** for experiments
3. Skip heavy tools (BMad, Spec Kitty)

### For Startups

**Speed focus:**
1. **Kiro** for rapid iteration
2. **OpenSpec** for maintenance
3. Avoid enterprise tools

## Related

- [Iterative Development Analysis](iterative-development.md)
- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical workflow guide
- [Gaps: New Frameworks](gaps.md) — Details on GSD, Ralph Loop, Zencoder, Kilo Code, Conductor
- [Orchestration Landscape](landscape.md) — Agent Teams and multi-agent tools
- [Comparison Matrices](comparison.md)
- [Recommendations](recommendations.md)
- [Tool Profiles](tools/)
