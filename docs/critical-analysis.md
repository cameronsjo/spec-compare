# Critical Analysis of Spec-Driven Development

## Executive Summary

Spec-driven development (SDD) has emerged as a critical methodology for AI-assisted coding in 2025, shifting from "vibe coding" to structured, specification-first approaches. However, it also raises significant concerns about reintroducing waterfall-like bureaucracy that Agile methodologies eliminated.

**Market Context:**
- 25% of Y Combinator Winter 2025 cohort has codebases that are 95% AI-generated
- Industry leaders predict that by 2027, developers won't look at code most of the time
- Specifications are becoming "the fundamental unit of programming"

## The Waterfall Question

Multiple industry sources note that SDD resembles traditional waterfall methodologies that Agile replaced in the 2000s.

### Critics Argue

- Extensive upfront specification contradicts Agile principles of iterative development
- Review burden for verbose specifications may exceed code review efficiency
- Bureaucracy could slow down fast-moving teams
- "Agile methodologies freed us from the bureaucracy of waterfall"
- Close collaboration between product managers and developers eliminates the need for design documents

### Counter-Arguments

- AI agents need structure to produce reliable results
- Specifications catch misunderstandings before implementation
- Documentation becomes executable with AI
- "Vibe coding" leads to unpredictable outcomes

### Reality

The debate continues. SDD may represent a new paradigm where specifications ARE code, or it may be waterfall dressed in AI clothing.

## AI Adherence Issues

Real-world testing reveals significant challenges with AI agents following specifications:

### Common Problems

- Agents frequently ignore detailed specifications
- Over-apply or misinterpret instructions
- Duplicate existing code despite clear documentation
- Generate excessive specs for trivial changes ("sledgehammer to crack a nut")
- Hallucinate APIs despite comprehensive specs

### Example from Testing

Despite detailed specifications and checklists, AI agents:
- Ignored instructions during implementation
- Duplicated existing classes because they misinterpreted specification notes
- Generated 5-page user stories for minor bug fixes

### Implications

- Specifications alone don't guarantee compliance
- Human review remains essential
- Tools need better validation and enforcement mechanisms
- Gap between specification and implementation persists

## Scalability Concerns

Tools often lack guidance on fundamental questions:

### Unanswered Questions

- When does SDD provide value vs. overhead?
- What problem size/complexity justifies SDD?
- How to balance iterative development with upfront planning?
- How to handle legacy codebases and technical debt?
- Who is the target user—developers, PMs, or cross-functional teams?

### Observations

- Using Kiro for a minor bug generated excessive user stories and acceptance criteria
- Spec-kit's verbose markdown creates tedious review cycles for small changes
- No clear guidance on when to use full SDD workflow vs. simplified approaches

### Needed

- Clear decision frameworks for when to use SDD
- Lightweight variants for smaller changes
- Guidance on adapting workflows to problem size

## Historical Parallels: Model-Driven Development (MDD)

SDD parallels Model-Driven Development (MDD) from the 2000s, which attempted automated code generation from specifications.

### MDD Failed Because

- Inflexibility in generated code
- Maintenance burden of specifications
- Disconnect between models and reality
- Required specialized languages and tools
- Difficulty handling edge cases

### How LLMs Differ

- Natural language specs vs. formal modeling languages
- More flexible code generation
- Better handling of ambiguity
- No custom generators required

### New Challenges

- Non-determinism in LLM outputs
- Unpredictable interpretations
- Hallucinations and errors
- Spec drift over time

### Critical Concern

"We might end up with the downsides of both MDD and LLMs: Inflexibility and non-determinism."

## Functional vs. Technical Separation

Distinguishing functional requirements from technical implementation remains ambiguous across tools, mirroring historical industry struggles with requirements analysis.

### Problems

- Unclear where functional specs end and technical implementation begins
- Overlap between "specify" and "plan" phases
- Confusion about level of detail required
- Different interpretations across tools

### Industry History

Software engineering has struggled with this distinction for decades. SDD hasn't solved this fundamental problem.

## Review Burden

**Question:** Is reviewing extensive specifications more efficient than code review?

### Arguments For

- Catch errors before implementation
- Cheaper to fix specification errors
- Clear documentation for future

### Arguments Against

- Verbose markdown is tedious to review
- Specs may not reveal implementation issues
- Code review catches actual bugs
- Double review burden (specs + code)

### Reality

Mixed results. Some teams find spec review valuable, others see it as overhead.

## Long-Term Maintenance

### Unresolved Questions

- Do specs remain synchronized with code over time?
- Who maintains specifications during bug fixes?
- How to handle emergency patches?
- What happens when specs and code diverge?

### Spec-First Tools (Spec-Kit, Kiro, BMad)

- Unclear maintenance story
- Risk of spec drift
- May abandon specs after initial development

### Spec-Anchored Tools (OpenSpec, Spec Kitty)

- Better maintenance story with change management
- Audit trail helps synchronization
- Still requires discipline

### Spec-as-Source (Tessl)

- Most ambitious: specs ARE the source
- Unclear how this handles non-deterministic LLM outputs
- Unproven at scale

## Industry Trends & Future Outlook

### Market Predictions

**Guy Podjarny (Tessl CEO):**
- "By end of 2027, developers working with agents won't look at code most of the time"
- "Within 2026, most development will be at least spec-assisted"

**Sean Grove (OpenAI):**
- "Specifications, not prompts or code, are becoming the fundamental unit of programming"
- "Writing specs is the new superpower"

### Technology Evolution

**From Vibe Coding to SDD:**
- Early 2025: "Vibe coding" emerges (describe goal, get code)
- Mid 2025: Reliability concerns drive spec-driven approaches
- Late 2025: Multiple SDD frameworks competing

**MCP (Model Context Protocol) Adoption:**
- Tessl, Kiro support MCP
- Standard emerging for AI tool integration
- Context as installable dependencies

### Open Questions

1. **Will SDD become standard or remain niche?**
   - Too early to tell
   - Depends on AI adherence improvements
   - May split: SDD for complex projects, vibe coding for simple ones

2. **Can iterative Agile coexist with comprehensive specifications?**
   - Fundamental tension unresolved
   - Some tools (OpenSpec) attempt balance
   - May require new hybrid methodologies

3. **Will AI adherence improve enough to make specs reliable?**
   - Current gap between specs and implementation
   - Requires better validation and enforcement
   - LLM improvements may help

4. **What's the right balance between flexibility and structure?**
   - No consensus yet
   - Different tools make different trade-offs
   - Context-dependent (project size, team size, domain)

5. **Is spec-as-source viable for non-deterministic LLMs?**
   - Tessl's bet, but unproven
   - Non-determinism creates synchronization challenges
   - May require deterministic code generation

### Historical Context

**Similar Movements:**
- **Waterfall (1970s):** Comprehensive upfront planning, failed due to inflexibility
- **Agile (2000s):** Iterative development, close collaboration, minimal documentation
- **MDD (2000s):** Model-driven development, failed due to complexity and inflexibility
- **SDD (2025):** Specification-driven development with AI—will it succeed?

**Pattern:**
Industry swings between structure and flexibility. SDD may be the pendulum swinging back toward structure, enabled by AI.

## Conclusion

Spec-driven development represents a significant shift in AI-assisted coding, moving from informal "vibe coding" to structured, specification-first approaches. The landscape includes six major tools, each with distinct philosophies and trade-offs.

**The Fundamental Question:** Is SDD the future of software development, or is it waterfall dressed in AI clothing? The answer remains unclear, but the tools are here, battle-tested, and ready for evaluation.

## Related

- [Comparison Matrix](comparison.md)
- [Recommendations](recommendations.md)
- [Sources](sources.md)
