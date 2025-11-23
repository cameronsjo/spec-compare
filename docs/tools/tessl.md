# Tessl

**Type:** AI-native development platform
**Website:** https://tessl.io
**Status:** Framework (closed beta), Registry (open beta)
**Funding:** $125M (Index Ventures, Accel, GV, boldstart)
**License:** Proprietary
**Leadership:** Guy Podjarny (co-founder of Snyk)

## Core Approach

Most radical SDD implementation: "Spec-as-Source" where specifications become the primary maintained artifact. Code is generated and auto-synced from specs.

**Core Problem:** Agents are powerful, but they're unreliable and overconfident, rushing to start coding and often wasting time building the wrong thing. Common issues include hallucinated APIs, version blur, and unintended side effects.

**Solution:** Spec-driven development (SDD) captures intent in structured specifications so agents can build with clarity and guardrails.

## Vision: AI-Native Software Development

"AI Native Software Development" is spec-centric, as opposed to code-centric. By end of 2027, developers working with agents won't look at code most of the time.

## Products

### Tessl Framework

- Uses specifications (specs) to define what you want to build before coding
- Enables both carefully crafted specs and AI written "vibe-spec" workflows
- Stores specs in the codebase as long-term memory
- Simplifies creating and enforcing hard guardrails with tests
- Code files are marked as generated and auto-synced with specs
- Currently creates one-to-one mappings between spec and code files
- **Status:** Closed beta

### Tessl Spec Registry

- Holds over 10,000 specs that explain how to use external libraries
- Prevents API hallucinations and version mixups
- Agents stay current with OSS updates beyond their training data
- Helps teams share practices and rules across organizations
- **Status:** Open beta

## Key Features

- **Spec-as-Source Vision:** Humans edit specs, code generates automatically
- **Performance Claims:**
  - Up to 90% more accurate agent responses
  - 1.4x faster completion times
  - 35% fewer integration errors
- **MCP Integration:** Model-agnostic through Model Context Protocol
- **Hard Guardrails:** Test-based specification enforcement
- **One-to-One Mapping:** Each spec file corresponds to one code file
- **Context as Dependencies:** Makes context installable as project dependencies

## Integration

Model-agnostic through MCP (Model Context Protocol), compatible with:
- Claude
- Cursor
- GitHub Copilot
- Gemini
- Other agents supporting MCP

## Installation

```bash
npx @tessl/cli init
```

The platform automatically:
- Detects dependencies
- Maps them to usage specifications
- Configures project for spec-driven development

## Best For

- Teams wanting cutting-edge SDD approaches
- Projects prioritizing specification maintenance
- Organizations with complex library dependency management
- Enterprise teams needing accuracy improvements
- Teams willing to adopt spec-as-source methodology
- Projects where specs should be primary artifact

## Limitations

- Framework still in closed beta (limited access)
- Most experimental/unproven approach
- Concerns about inflexibility and non-determinism
- One-to-one spec-to-code mapping may not scale
- Vendor lock-in with proprietary platform
- Unknown pricing model
- Requires significant mindset shift (specs as source)
- Not clear how it handles non-deterministic LLM outputs

## Related

- [Comparison Matrix](../comparison.md)
- [Critical Analysis](../critical-analysis.md)
