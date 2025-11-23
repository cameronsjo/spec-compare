# Iterative Development & Spec Modifications

## The Critical Gap

Spec-driven development tools excel when **requirements are clear upfront** (greenfield, 0-to-1 projects). However, they often struggle with a common real-world scenario:

**"Change the button from blue to green"**

This simple requirement reveals a fundamental tension: most SDD tools are optimized for *creating* specifications, not *modifying* them.

## The Two Development Scenarios

### Scenario 1: Clear Requirements (SDD Sweet Spot)

**Characteristics:**
- Greenfield projects
- Well-defined requirements
- Building something new
- "I know exactly what I want"

**Tools Excel At:**
- Constitution → Specify → Plan → Tasks → Implement
- Comprehensive upfront specification
- Structured workflows

### Scenario 2: Iterative Changes (SDD Struggle Zone)

**Characteristics:**
- Brownfield projects
- Evolving requirements
- Small modifications ("change button color")
- Refining existing features
- "I need to adjust what we built"

**Tools Struggle With:**
- Modifying existing specs
- Lightweight changes without full workflow
- Incremental adjustments
- Avoiding spec regeneration overhead

## How Each Tool Handles Spec Modifications

### OpenSpec: Built for Modifications

**Rating:** ⭐⭐⭐⭐⭐ (Excellent)

**Approach:** Brownfield-first design with change management workflow

**How It Works:**

1. **Two-Folder Architecture:**
   - `openspec/specs/` - Current truth (stable)
   - `openspec/changes/` - Proposed modifications (active work)

2. **Delta Format:**
   ```markdown
   ## ADDED Requirements
   - New capability X

   ## MODIFIED Requirements
   - [Complete updated requirement block]

   ## REMOVED Requirements
   - Deprecated feature Y (with rationale)
   ```

3. **Workflow:** Draft → Review → Implement → Archive

**For "Change Button Blue to Green":**

```markdown
# openspec/changes/update-button-color/

## MODIFIED Requirements
- Primary action button MUST use green (#00FF00) background
  - Previously: blue (#0000FF)
  - Reason: Brand refresh

## Tasks
- [ ] Update Button.tsx background color
- [ ] Update design system tokens
- [ ] Verify contrast ratios
```

**Strengths:**
- Explicitly designed for modifications
- Lightweight for small changes
- Clear audit trail (what changed and why)
- No overhead of full spec regeneration
- Consolidates related changes in one place

**Weaknesses:**
- Requires discipline to archive completed changes
- Can accumulate stale proposals if not maintained

**Sources:**
- [OpenSpec Repository](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec vs Spec Kit comparison](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)
- [How OpenSpec Transformed My Trading Algorithm Workflow](https://medium.com/@bashwheatley/how-openspec-transformed-my-trading-algorithm-workflow-and-why-every-developer-should-try-it-75cf228f0802)

---

### Tessl: Spec-as-Source Regeneration

**Rating:** ⭐⭐⭐⭐ (Very Good - Theoretically)

**Approach:** Specifications are the primary artifact; code regenerates automatically

**How It Works:**

1. **Edit spec directly:**
   ```markdown
   ## Button Styling
   Primary action buttons MUST use green (#00FF00) background.
   [@generate components/Button.tsx]
   ```

2. **Regenerate code:**
   ```bash
   tessl generate
   ```

3. **Code updates automatically** with `// GENERATED FROM SPEC - DO NOT EDIT` header

**For "Change Button Blue to Green":**
- Edit spec file: change "blue" to "green"
- Run `tessl generate`
- Code regenerates

**Strengths:**
- Simplest modification workflow (just edit the spec)
- Specs remain source of truth
- "Throw away all code and regenerate from scratch" capability
- No separate change management needed

**Weaknesses:**
- **Closed beta** (limited access to Framework)
- Unproven at scale
- One-to-one spec-to-code mapping may not fit all architectures
- Non-deterministic LLM outputs could cause drift
- Requires significant mindset shift

**Reality Check:**
While theoretically elegant, Tessl's approach is experimental. The vision of "never touch code, only edit specs" is compelling but unproven for production use.

**Sources:**
- [Understanding Spec-Driven Development: Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [Is Spec-Driven Development the Future of AI Coding?](https://zuplo.com/blog/spec-driven-ai-development)
- [Tessl CLI Commands](https://docs.tessl.io/reference/cli-commands)

---

### Spec-Kit: Clarify and Regenerate

**Rating:** ⭐⭐⭐ (Moderate)

**Approach:** Use `/speckit.clarify` for modifications, then regenerate plan/tasks

**How It Works:**

1. **Problem:** `/speckit.specify` creates NEW features, not modifications
2. **Workaround:** Use `/speckit.clarify` to add changes
3. **Regenerate:** Update spec → regenerate plan → regenerate tasks

**For "Change Button Blue to Green":**

```
User: /speckit.clarify
Agent: What needs clarification?
User: The primary button should be green (#00FF00), not blue.
      Update the spec to reflect this change.
```

Then:
- Update specification manually
- Run `/speckit.plan` to regenerate technical plan
- Run `/speckit.tasks` to regenerate task breakdown
- Run `/speckit.implement`

**Strengths:**
- Can modify specs through clarification workflow
- Separation of "what" from "how" enables iteration
- Once updated, regeneration is straightforward

**Weaknesses:**
- **Not optimized for small changes**
- `/speckit.specify` always wants to create new features
- Requires full workflow regeneration for small tweaks
- Overhead feels excessive for "change button color"
- "Sledgehammer to crack a nut" problem

**User Reports:**
- "Using `/speckit.clarify` to add whatever needs to be changed, not sure if this is officially the intended approach"
- "Can further refine things with regular LLM prompts after commands"

**Sources:**
- [Spec Kit Discussions: Refining specs](https://github.com/github/spec-kit/discussions/775)
- [Spec Kit /speckit.clarify template](https://github.com/github/spec-kit/blob/main/templates/commands/specify.md)
- [Microsoft: Diving Into Spec-Driven Development](https://developer.microsoft.com/blog/spec-driven-development-spec-kit)

---

### Spec Kitty: Same as Spec-Kit (Plus Worktrees)

**Rating:** ⭐⭐⭐ (Moderate)

**Approach:** Extends Spec-Kit's workflow with worktree orchestration

**How It Works:**
- Same modification challenges as Spec-Kit
- Worktree strategy helps with **parallel** features, not **modifications**
- Each modification would create a new feature branch/worktree

**For "Change Button Blue to Green":**
- Same as Spec-Kit workflow
- Could use worktree for isolation: `git worktree add ../project-button-color button-color-change`
- But still requires full specify/plan/tasks workflow

**Strengths:**
- Worktrees help isolate modification work
- Kanban tracking shows modification progress

**Weaknesses:**
- Same spec modification issues as Spec-Kit
- Worktree overhead may be excessive for small changes
- Not designed for lightweight iterations

**Sources:**
- [Spec Kitty Repository](https://github.com/Priivacy-ai/spec-kitty)

---

### Kiro: Excessive Specs for Small Changes

**Rating:** ⭐⭐ (Poor)

**Approach:** Requirements → Design → Tasks (can't skip steps)

**How It Works:**
- Three-step workflow is rigid
- Generates comprehensive specs even for trivial changes
- No lightweight modification path

**For "Change Button Blue to Green":**
Kiro might generate:
- **Requirements:** 5-page user story about button color accessibility
- **Design:** Architecture diagrams for CSS token management
- **Tasks:** 12-step implementation plan for one-line CSS change

**Strengths:**
- Comprehensive documentation
- Structured approach

**Weaknesses:**
- **"Sledgehammer to crack a nut"** problem
- Generates excessive specs for minor bug fixes
- No fast path for small changes
- Three-step workflow can't be bypassed

**User Reports:**
- "Using Kiro for a minor bug generated excessive user stories and acceptance criteria"

**Sources:**
- [Understanding Spec-Driven Development: Kiro](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

---

### BMad Method: Enterprise Overhead

**Rating:** ⭐⭐ (Poor)

**Approach:** 19 specialized agents with comprehensive workflows

**How It Works:**
- Four-phase methodology: Analysis → Planning → Solutioning → Implementation
- Each phase involves multiple agents
- Designed for enterprise-scale projects

**For "Change Button Blue to Green":**
- Would involve PM Agent, UX Designer Agent, Architect Agent
- 30+ minute workflow initialization
- Comprehensive but overkill

**Strengths:**
- Comprehensive coverage
- Structured processes

**Weaknesses:**
- **Massive overkill for small changes**
- 19 agents for a button color change
- 30+ minute setup time
- Designed for large projects, not iterations

**Sources:**
- [BMad Method Repository](https://github.com/bmad-code-org/BMAD-METHOD)

---

## Comparative Analysis

### Modification Efficiency Matrix

| Tool | Small Changes | Medium Changes | Large Changes | Overhead | Flexibility |
|------|---------------|----------------|---------------|----------|-------------|
| **OpenSpec** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Minimal | High |
| **Tessl** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Minimal | High |
| **Spec-Kit** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Moderate | Medium |
| **Spec Kitty** | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | High | Medium |
| **Kiro** | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | High | Low |
| **BMad** | ⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Very High | Low |

### Change Types

**Small Changes** (button color, text copy, minor tweaks):
1. **OpenSpec** - Lightweight delta format
2. **Tessl** - Edit spec, regenerate
3. **Spec-Kit** - Requires clarify/plan/tasks workflow

**Medium Changes** (new component variant, refactoring):
1. **OpenSpec** - Change proposal with multiple deltas
2. **Spec-Kit** - Update spec, regenerate plan
3. **Spec Kitty** - Worktree + spec update

**Large Changes** (new feature, major refactor):
1. **Spec Kitty** - Full workflow with orchestration
2. **BMad** - 19 agents, comprehensive coverage
3. **Spec-Kit** - Constitution-driven approach

## The Modification Workflow Spectrum

```
Lightweight                                    Comprehensive
↓                                                           ↓
OpenSpec → Tessl → Spec-Kit → Spec Kitty → Kiro → BMad
```

**For Iterative Development:**
- **Left side** (OpenSpec, Tessl): Fast iterations, lightweight changes
- **Right side** (BMad, Kiro): Comprehensive but slow for small changes

## Key Insights

### 1. The "New Feature Bias"

Most SDD tools are optimized for **creating** features, not **modifying** them:
- `/speckit.specify` creates new features
- Kiro's three-step workflow assumes greenfield
- BMad's 19 agents assume comprehensive planning

Only **OpenSpec** explicitly separates "current state" from "proposed changes."

### 2. The Overhead Problem

**Small changes reveal tool overhead:**
- Changing button color shouldn't require 5-page specs
- One-line CSS changes don't need architecture diagrams
- Bug fixes shouldn't trigger full workflow regeneration

**OpenSpec and Tessl minimize overhead. Others don't.**

### 3. The Brownfield Reality

Most software development is **brownfield** (1→n), not greenfield (0→1):
- 80% of work is modifying existing code
- Requirements evolve iteratively
- Small changes are frequent

**OpenSpec is the only tool designed brownfield-first.**

### 4. Living Documentation vs. Static Specs

**Two philosophies:**

**Static Specs** (Spec-Kit, Kiro, BMad):
- Specs guide initial development
- May become stale during maintenance
- Focus on upfront planning

**Living Specs** (OpenSpec, Tessl):
- Specs evolve with code
- Modifications update specs
- Specs remain synchronized

## Recommendations by Scenario

### For "Change Button Blue to Green"

**Best:** [OpenSpec](tools/openspec.md)
- Lightweight delta format
- Clear audit trail
- Minimal overhead

**Alternative:** [Tessl](tools/tessl.md) (if you have access)
- Edit spec directly
- Automatic regeneration
- But unproven at scale

**Avoid:** [Kiro](tools/kiro.md), [BMad](tools/bmad-method.md)
- Excessive overhead
- Designed for larger changes

---

### For Frequent Iterative Changes

**Best:** [OpenSpec](tools/openspec.md)
- Change-centric design
- Brownfield-first
- Minimal friction

**Good:** [Tessl](tools/tessl.md) (theoretical)
- Spec-as-source elegance
- But closed beta

**Moderate:** [Spec-Kit](tools/spec-kit.md)
- Can use `/speckit.clarify` workaround
- Requires discipline

---

### For Mixed Greenfield + Brownfield

**Best:** [OpenSpec](tools/openspec.md) + [Spec-Kit](tools/spec-kit.md)
- Use Spec-Kit for greenfield features
- Use OpenSpec for modifications
- Complementary strengths

**Alternative:** [Spec Kitty](tools/spec-kitty.md)
- If you need worktree orchestration
- Accept modification overhead

---

### For Enterprise with Governance

**Best:** [BMad](tools/bmad-method.md)
- Comprehensive workflows
- Accept overhead for rigor
- Use for major changes only

**For small changes:** Bypass SDD entirely
- Direct code changes
- Update specs afterward
- Use SDD for significant features

---

## The Hybrid Approach

**Most teams should use multiple tools:**

1. **Greenfield features:** Spec-Kit or BMad
   - Full constitution/specify/plan/tasks workflow
   - Comprehensive upfront specification

2. **Modifications:** OpenSpec
   - Delta format for changes
   - Lightweight iteration

3. **Small tweaks:** Skip SDD
   - Direct code changes
   - Update specs after (if needed)

**Don't force every change through SDD workflows.**

## Anti-Patterns to Avoid

### 1. SDD for Everything

**Problem:** Using `/speckit.specify` for "change button color"

**Result:**
- Excessive documentation
- Workflow overhead
- Team frustration

**Solution:** Use OpenSpec for modifications or skip SDD for trivial changes

### 2. Stale Specifications

**Problem:** Specs diverge from code during iterative changes

**Result:**
- Specs become outdated
- Teams stop trusting specs
- Documentation debt

**Solution:** Use living spec tools (OpenSpec, Tessl) that evolve with code

### 3. Regeneration Hell

**Problem:** Re-running full workflows for small changes

**Result:**
- Wasted time
- AI generates unnecessary complexity
- "Sledgehammer to crack a nut"

**Solution:** Use modification-optimized workflows (OpenSpec deltas)

## Critical Questions

### When Should You Use SDD for Modifications?

**Use SDD when:**
- Change affects multiple components
- Requirements need documentation
- Team coordination required
- Audit trail valuable

**Skip SDD when:**
- One-line code change
- Obvious fix (typo, color)
- Emergency hotfix
- Experimental tweak

### How Do You Keep Specs Synchronized?

**OpenSpec:** Archive completed changes to merge deltas into specs

**Tessl:** Specs are source, code is generated (automatic sync)

**Spec-Kit:** Manual discipline required

**BMad/Kiro:** Risk of spec drift without governance

## Future Outlook

### Trend: Toward Living Specifications

The industry is moving from:
- **Static specs** (write once, ignore during maintenance)
- **Living specs** (evolve with code, remain source of truth)

**OpenSpec and Tessl lead this trend.**

### Unsolved Problem: Lightweight Iterations

Most tools still struggle with:
- Small changes without overhead
- Balancing rigor with speed
- Avoiding "sledgehammer to crack a nut"

**OpenSpec partially solves this. Others don't.**

## Conclusion

**The fundamental insight:**

> "Spec-driven development tools are optimized for *creating* specifications, not *modifying* them."

**For iterative development:**
- **OpenSpec** is purpose-built for modifications
- **Tessl** has elegant theory but unproven practice
- **Spec-Kit/Kitty** can work with workarounds
- **Kiro/BMad** have excessive overhead

**Most teams need:**
- One tool for greenfield (Spec-Kit, BMad)
- One tool for brownfield (OpenSpec)
- Wisdom to skip SDD for trivial changes

**The "change button blue to green" test reveals which tools understand real-world iterative development.**

## Related

- [Comparison Matrix](comparison.md)
- [Recommendations](recommendations.md)
- [OpenSpec Deep Dive](tools/openspec.md)
- [Spec-Kit Deep Dive](tools/spec-kit.md)

## Sources

### Spec Modification Workflows
- [Microsoft: Diving Into Spec-Driven Development](https://developer.microsoft.com/blog/spec-driven-development-spec-kit)
- [GitHub Spec-Kit: Refining specs discussion](https://github.com/github/spec-kit/discussions/775)
- [Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)

### OpenSpec Change Management
- [OpenSpec vs Spec Kit comparison](https://hashrocket.com/blog/posts/openspec-vs-spec-kit-choosing-the-right-ai-driven-development-workflow-for-your-team)
- [How OpenSpec Transformed My Workflow](https://medium.com/@bashwheatley/how-openspec-transformed-my-trading-algorithm-workflow-and-why-every-developer-should-try-it-75cf228f0802)
- [OpenSpec: Spec-Driven Workflow](https://medium.com/coding-nexus/openspec-a-spec-driven-workflow-for-ai-coding-assistants-no-api-keys-needed-d5b3323294fa)

### Tessl Spec-as-Source
- [Understanding SDD: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)
- [Is Spec-Driven Development the Future?](https://zuplo.com/blog/spec-driven-ai-development)
- [Tessl Documentation](https://docs.tessl.io/)

### Iterative Development Challenges
- [Spec Driven Development (SDD) - A initial review](https://dev.to/danielsogl/spec-driven-development-sdd-a-initial-review-2llp)
- [How to Use a Spec-Driven Approach](https://blog.jetbrains.com/junie/2025/10/how-to-use-a-spec-driven-approach-for-coding-with-ai/)
- [SDD in 2025: Complete Guide](https://www.softwareseni.com/spec-driven-development-in-2025-the-complete-guide-to-using-ai-to-write-production-code/)
