# Traycer

**Type:** Spec-driven planning + verification layer (VS Code extension)
**Website:** https://traycer.ai/
**Marketplace:** [Traycer.traycer-vscode](https://marketplace.visualstudio.com/items?itemName=Traycer.traycer-vscode)
**Status:** Active development (commercial)
**License:** Proprietary (closed source)
**Current Version:** VS Code extension — rolling release
**Traction:** 100K+ reported users. Bay-Area startup.

## Core Approach

Traycer is not a standalone IDE or its own agent — it's a VS Code extension that sits **on top of** the agents you already use (Cursor, Claude Code, GitHub Copilot) and acts like a senior engineer managing the process. It enforces a rigid **Plan → Execute → Verify** loop: it turns an objective into sequenced phases, produces a file-by-file plan for each, dispatches the work to the agent of your choice, then runs verification tied to your original intent.

Its persistence model is distinctive: rather than one giant spec that goes stale, Traycer turns the plan into a **ticket system** of mini-specs — a PRD, a tech plan, wireframes, edge-case notes — each small enough to hand to an agent (or a teammate) without guessing.

## Key Features

- **Plan → Execute → Verify:** Each phase is planned, dispatched, then checked against acceptance criteria, tests, static analysis, and diff-level reasoning, with fix-forward on detected regressions
- **Epic Mode:** Describe what you want and Traycer interviews you (problem, stack, edge cases, constraints), then generates PRDs, specs, tech flows, wireframes, and sequence diagrams — broken into agent-sized tickets
- **File-by-file plans:** Detailed instructions covering classes, variables, and call hierarchies before any code is written
- **Bring your own agent:** Each phase is dispatched to the coding agent you choose
- **Persistent ticket system:** The plan lives on as work items, not a one-shot document

## How It Works

1. **(Optional) Epic Mode** — interview → PRDs, specs, tech flows, wireframes, sequence diagrams → tickets
2. **Plan** — sequence the objective into phases; each phase gets a file-by-file plan
3. **Execute** — hand each phase to your agent (Cursor, Claude Code, Copilot)
4. **Verify** — acceptance checks tied to intent + tests + static analysis; auto-detect regressions and fix forward

## Pricing

Credit-based, with figures that have shifted over time. Recent tiers: Free ($5 credits), Lite ~$20/mo, Pro ~$40/mo, Ultra ~$100/mo. Check [traycer.ai/pricing](https://traycer.ai/pricing) for current numbers.

## How It Compares

**vs. Kiro:** Both formalize intent before code. The contrast is persistence — with Traycer the plan becomes a ticket system; with Kiro it becomes a document you reference later.

**vs. GitHub Spec-Kit:** Spec-Kit produces version-controlled markdown in your repo; Traycer keeps the plan as managed tickets and dispatches to your agent.

**vs. Zencoder/Zenflow:** Both are commercial orchestration layers. Zenflow runs many agents in parallel in isolated worktrees with a control plane; Traycer is a lighter, sequential planning layer inside VS Code.

## Best For

- Developers who want a planning + verification layer over their existing agent
- Greenfield work where Epic Mode's PRDs and wireframes accelerate 0→1
- Cross-file refactors and cross-cutting changes that benefit from file-by-file plans
- Solo developers orchestrating one capable agent

## Limitations

- Proprietary, closed-source VS Code extension (no public repo)
- Credit-based pricing; heavy use burns credits fast
- No parallel multi-agent isolation — phases run sequentially
- VS Code-centric; output quality depends on the underlying agent
- Mini-specs are work artifacts, not a maintained living spec

## Sources

- [Traycer AI](https://traycer.ai/)
- [Traycer — VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Traycer.traycer-vscode)
- [Traycer Pricing Docs](https://docs.traycer.ai/account/pricing)
- [I Tested the Top Spec-Driven Dev Tools in 2026 — DEV Community](https://dev.to/filiksyos/i-tested-the-top-spec-driven-dev-tools-in-2026-4gdm)

## Related

- [Comparison Matrix](../comparison.md)
- [Kiro](kiro.md) — IDE-native spec-driven alternative
- [Recommendations](../recommendations.md)
