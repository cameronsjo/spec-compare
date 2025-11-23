# BMad Method

**Type:** Comprehensive AI-driven agile framework
**Repository:** https://github.com/bmad-code-org/BMAD-METHOD
**Website:** https://bmadcodes.com/
**Status:** v6 Alpha (v4 stable)
**License:** Open source

## Core Approach

"Breakthrough Method for Agile AI-Driven Development" - provides 19 specialized AI agents with 50+ guided workflows. Built on BMad Core, a "Collaboration Optimized Reflection Engine."

Unlike generic coding assistants, BMad positions itself through "structured, battle-tested workflows" with specialized agent roles.

## Key Features

- **19 Specialized Agents:** PM, Architect, Developer, UX Designer, Test Architect, QA Engineer, Tech Lead, Security Expert, Data Scientist, DevOps Engineer, etc.
- **50+ Guided Workflows:** Scale from bug fixes to enterprise systems
- **Four-Phase Methodology:** Analysis → Planning → Solutioning → Implementation
- **Scale-Adaptive Planning:** Adjusts complexity based on project scope
- **Complete Lifecycle Coverage:** Analysis → Planning → Architecture → Implementation
- **Multi-Language Support:** Separate settings for communication and code output
- **Document Sharding:** 90% token savings for large projects
- **Update-Safe Customization:** Preserving configurations through releases
- **OpenAPI Integration:** Precise endpoint definition with Swagger templates

## Architecture: BMad Core Foundation

BMad Method runs on BMad Core, described as a "Collaboration Optimized Reflection Engine." This modular architecture enables:

- Universal human-AI collaboration framework
- Custom domain-specific modules via BMad Builder
- Community marketplace for sharing agent teams (forthcoming)

## Four-Phase Methodology

1. **Analysis** (optional) - Brainstorming and solution exploration
2. **Planning** - PRDs, technical specifications, design documents
3. **Solutioning** - Architecture and UX design
4. **Implementation** - Story-driven development with validation

## Installation

```bash
# v6 Alpha
npx bmad-method@alpha install

# v4 Stable
npx bmad-method install
```

## Onboarding

Projects initialize via `*workflow-init` command, which:
- Analyzes goals
- Recommends appropriate workflow tracks
- Completes in under 30 minutes

## API Specification Features

The system uses OpenAPI (Swagger) to precisely define every endpoint, its parameters, request/response bodies, and status codes. It uses an OpenAPI template to guide the creation of the API specification.

The Architect Agent creates a technical architecture including API specs (e.g., GET /api/books, GET /api/books/{id}).

## Differentiation

- **Structured workflows** vs. generic code generation
- **Specialized agent roles** with clear responsibilities
- **Agile best practices** with AI amplification
- **Human oversight** remains central—agents facilitate structured decision-making

## Best For

- Enterprise-scale projects
- Teams wanting comprehensive agile workflows
- Projects requiring specialized agent roles
- Organizations needing structured, battle-tested processes
- Teams building API-driven architectures

## Limitations

- Steeper learning curve with 19+ agents
- More complex than simpler SDD tools
- 30+ minute initialization time
- May be overkill for small projects
- No explicit git worktree support mentioned
- Requires Node.js 20+

## Related

- [Comparison Matrix](../comparison.md)
- [Recommendations](../recommendations.md)
