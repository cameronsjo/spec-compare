# Gaps: SDD Frameworks Discovered Since v1.0.0

> Research date: February 2026; reassessed May 2026 and July 2026. These frameworks were not covered in the original comparison (November 2025). Each is noted here as a gap for potential future analysis. The May 2026 sweep promoted **Superpowers** and **Traycer** to full core profiles and added a marginal **MUSUBI** entry — see [reassessment-2026-05-31.md](reassessment-2026-05-31.md). The July 2026 sweep added five emerging-tier entries — see [reassessment-2026-07-23.md](reassessment-2026-07-23.md).

## New SDD Frameworks

### GSD (Get Shit Done)

Promoted to full tool profile. See [GSD Tool Profile](tools/gsd.md).

---

### Ralph Loop (Ralph Wiggum Technique)

Promoted to full tool profile. See [Ralph Loop Tool Profile](tools/ralph-loop.md).

---

### Superpowers

Promoted to full core profile (May 2026). See [Superpowers Tool Profile](tools/superpowers.md). An MIT-licensed, ~214K-star agentic skills framework + methodology by Jesse Vincent (obra): auto-triggering skills enforce brainstorm → plan → subagent TDD → review → finish across Claude Code, Codex, Cursor, Copilot, and more.

---

### Traycer

Promoted to full core profile (May 2026). See [Traycer Tool Profile](tools/traycer.md). A commercial VS Code extension (100K+ users) that layers a Plan → Execute → Verify loop over the agent you already use, with an Epic Mode that generates PRDs, specs, and wireframes and turns plans into an agent-sized ticket system.

---

### MUSUBI (marginal)

**What it is:** A maximally rigorous SDD framework (`nahisaho/MUSUBI`, MIT) synthesizing six frameworks: 7 agents × 31 skills, EARS-format requirements, a 9-article constitution with Phase -1 gates, full Requirement→Design→Code→Test traceability, C4 diagrams, and delta specs for brownfield.

**Gap assessment:** A useful "maximum rigor" reference point, but adoption is tiny (**~57 stars**) and the repo has **no commits since 2026-01-01** — likely stalled. Noted here rather than tracked as a full profile until it shows renewed activity.

**Sources:**
- [GitHub: nahisaho/MUSUBI](https://github.com/nahisaho/MUSUBI)
- [npm: musubi-sdd](https://www.npmjs.com/package/musubi-sdd)

---

### Zencoder / Zenflow

**What it is:** An AI coding platform with a dedicated orchestration layer (Zenflow) for spec-driven workflows, parallel agent execution, and built-in verification.

**Why it matters:** Zencoder is a commercial platform that productizes SDD — rather than being a framework you install, it's a platform you subscribe to.

**Key differentiators:**
- **RED/GREEN/VERIFY loops:** Implementation cycles with automated verification
- **Parallel Execution:** Agents work in independent environments; runs tens or hundreds of agents simultaneously
- **Spec Anchoring:** Agents read specs, PRDs, or architecture docs before writing code
- **Cross-Agent Code Review:** Automated tests and cross-agent review built in
- **IDE Integration:** VS Code, JetBrains, plus native CLI integration with Claude Code and OpenAI Codex

**Zenflow launched:** January 22, 2026 on Product Hunt.

**Gap assessment:** Zencoder/Zenflow is a commercial platform competitor to Kiro and Tessl. It represents the SDD-as-a-Service model. Its parallel agent execution with built-in verification differentiates it from open-source tools.

**Sources:**
- [Zencoder](https://zencoder.ai/)
- [Zenflow](https://zencoder.ai/zenflow)
- [Zencoder SDD Guide](https://docs.zencoder.ai/user-guides/tutorials/spec-driven-development-guide)

---

### Kilo Code

**What it is:** An open-source agentic engineering platform, forked from Roo Code, with structured modes for different development phases.

**Why it matters:** Founded by GitLab co-founder Sid Sijbrandij with $8M in seed funding. Currently #1 on OpenRouter with 1.5M+ users and 25T+ tokens processed.

**Current Version:** VS Code extension v4.148.1 (January 17, 2026). Kilo CLI launched February 3, 2026 (`npm install -g @kilocode/cli`). Kilo Code Reviewer launched January 27, 2026 for automated AI-powered PR reviews.

**Key differentiators:**
- **Structured Modes:** Ask, Architect, Code, Debug, Orchestrator, and Custom modes — each tuned to a different development phase
- **Memory Bank:** Durable, project-level recall via structured markdown files (architectural decisions, conventions, historical notes)
- **Model Agnostic:** OpenAI, Anthropic, Google, Mistral, Meta Llama, self-hosted — 500+ models
- **Multi-Platform:** VS Code, JetBrains, Cursor, Windsurf, and standalone CLI (new)
- **Parallel Agents:** Run multiple AI agents simultaneously
- **CLI:** Production-ready model-agnostic CLI for agentic code generation, with `--auto` flag for CI/CD pipelines

**Gap assessment:** Kilo Code isn't strictly an SDD tool, but its Architect mode and Memory Bank overlap with SDD concerns. Its structured mode system (especially Architect → Code → Debug) mirrors the SDD workflow of specify → plan → implement. The new CLI launch and Code Reviewer make it increasingly relevant as a full platform.

**Sources:**
- [kilo.ai](https://kilo.ai/)
- [GitHub: Kilo-Org/kilocode](https://github.com/Kilo-Org/kilocode)
- [Inside Kilo Code — Tessl blog](https://tessl.io/blog/inside-kilo-code-an-open-source-ai-coding-agent-with-plans-to-reshape-software-development/)

---

### Conductor

**Snapshot superseded:** The February 2026 assessment below is preserved for context. See the [August reassessment](reassessment-2026-08-28.md) and [tracked Conductor profile](../site/src/data/tools/conductor.json) for the later version assessment.

**What it is:** A macOS desktop app by Melty Labs for running multiple Claude Code and Codex agents in parallel using git worktrees.

**Why it matters:** Conductor solves the "agent runner" problem — how to actually execute multiple agents in parallel with proper isolation.

**Key differentiators:**
- **Automatic Worktree Isolation:** Each workspace is a separate git worktree
- **Unified Review Interface:** Review and merge changes from all agents via diffs
- **Local-First:** Runs entirely on your Mac
- **Free:** No additional cost beyond existing Claude Code/Codex subscriptions

**Current Version:** v0.36.3 (February 23, 2026). Recent additions include integrated terminal respecting tool version managers (mise, asdf, rbenv), submitting prompts to coding agents within Conductor, git panel file grouping (Uncommitted/Committed sections), diff commenting with GitHub synchronization, and updated Anthropic Agent SDK to 2.1.50.

**Limitations:** macOS (Apple Silicon) only. No enterprise features (Jira, signed commits, multi-user coordination). Intel Mac support under development; Windows and Linux not supported.

**Gap assessment:** Conductor is not an SDD tool — it's an agent runner. But it's the most mature solution for the parallel worktree execution that Spec Kitty's workflow assumes. Relevant to the [Git Worktree Support](git-worktree-support.md) analysis.

**Sources:**
- [conductor.build](https://www.conductor.build/)
- [Conductor Docs](https://docs.conductor.build)
- [Hands-On Review — The New Stack](https://thenewstack.io/a-hands-on-review-of-conductor-an-ai-parallel-runner-app/)

---

### PromptX (Deepractice)

**What it is:** An AI agent context platform that provides structured context engineering for AI coding assistants. Accepted by WWW Companion '26 with a paper titled "PromptX: A Cognitive Agent Platform with Long-term Memory."

**Why it matters:** PromptX takes a different approach from other SDD tools — rather than defining a workflow (specify → plan → implement), it focuses on providing rich, structured context to any existing AI coding workflow. It supercharges existing tools (Cursor, Claude Code, etc.) via MCP rather than replacing them.

**Key differentiators:**
- **Context Platform:** Provides structured context layers (knowledge, capabilities, persona) to AI agents rather than prescribing a development workflow
- **MCP-Native:** Integrates as an MCP server, augmenting any compatible coding assistant
- **Cognitive Architecture:** Three components — Nuwa (knowledge), Luban (power), Writer (soul) — model different aspects of agent capability
- **Long-term Memory:** Research-backed approach to persistent agent context across sessions

**Gap assessment:** PromptX occupies a unique position as a context augmentation layer rather than a standalone SDD framework. For teams already satisfied with their AI coding tool but needing deeper, custom context, PromptX fills a gap that no other tool in this comparison addresses. It could complement any SDD tool by enriching the context available during planning and implementation phases.

**Sources:**
- [GitHub: Deepractice/PromptX](https://github.com/Deepractice/PromptX)
- [SDD Framework Comparison including PromptX](https://redreamality.com/blog/-sddbmad-vs-spec-kit-vs-openspec-vs-promptx/)

---

### Matt Pocock's Skills (mattpocock/skills)

**What it is:** An MIT-licensed collection of small agent skills (`mattpocock/skills`, v1.2.3, 2026-08-06) that Matt Pocock uses for day-to-day engineering. It ships as a Claude Code plugin in the official marketplace, and `npx skills` copies editable versions into a repo for Codex and other agents.

**Why it matters:** ~268K stars and ~22.6K forks make it one of the most-adopted skill sets in the space. Its README positions it against the tools this repo profiles: "Approaches like GSD, BMAD, and Spec-Kit try to help by owning the process," while these skills stay "small, easy to adapt, and composable." Requested for inclusion in issue #51.

**Key differentiators:**
- **Grill first:** `/grill-with-docs` interviews you before any spec exists and maintains a `CONTEXT.md` glossary and ADRs as it goes
- **Spec to tickets:** `/to-spec` writes a spec to the issue tracker; `/to-tickets` splits it into tracer-bullet slices with blocking edges; `/implement` drives `/tdd` and closes with `/code-review`
- **Multi-session planning:** `/wayfinder` keeps a map issue of decision tickets for work larger than one session
- **Tracker-backed:** GitHub, Linear, or local Markdown, chosen once per repo by `/setup-matt-pocock-skills`

**Gap assessment:** Profiled at **emerging tier**. Adoption is far past the bar, but the scores come from reading the skills, not from using them. It sits closest to Superpowers: both are skill bundles that run spec → plan → TDD. The difference is enforcement. Superpowers gates each step; Pocock's skills leave the sequence to the user. It stays at emerging tier: no hands-on evaluation is planned, so the scores rest on reading the repository.

**Sources:**
- [GitHub: mattpocock/skills](https://github.com/mattpocock/skills)
- [aihero.dev/skills](https://aihero.dev/skills)
- [Inclusion request #51](https://github.com/cameronsjo/spec-compare/issues/51)

---

### SpecDD (specdd/specdd)

**What it is:** An Apache-2.0 spec-driven framework (`specdd/specdd`, 1.6, 2026-09-27) built around small `.sdd` spec files that sit beside the code they govern. A CLI (`specdd init`, `update`, `check-update`) installs a bootstrap that agents read through `AGENTS.md`. Requested for inclusion in issue #59.

**Why it matters:** How it finds the specs that apply to a file is distinctive. For a target file, the agent reads the chain of specs from the project root down to that file (plus explicit `References`), so context is scoped by path instead of loaded from one large document. Child specs may narrow parent rules but must not silently loosen them, and `Owns` / `Can modify` bound which files an agent may edit.

**Key differentiators:**
- **Specs next to the code:** a spec file sits beside the code it covers; parent specs apply automatically, sibling specs only when referenced
- **Write authority:** the framework README says the agent should stop and ask when no applicable or owning spec exists for a project file, or when a change would break `Must not` / `Forbids` (README wording; the generated bootstrap was not read)
- **Path for existing codebases:** the docs cover greenfield and existing projects; for existing code they recommend starting with one high-change module, draft its spec from the current code, mark uncertain assumptions, and review before implementing
- **Local tasks:** `Tasks` inside a spec carry open, done, skipped, blocked, and needs-decision states, small local to-do items for an agent, not a replacement for a tracker
- **Agent reach (project's claim, not tested here):** documented as agent-agnostic through an `AGENTS.md` entrypoint; agents that do not pick up the bootstrap must be told to read it. Codex, Claude Code, Copilot, Antigravity, Junie, and Cline have dedicated plugins; other agents use Agent Skills or read the bootstrap directly

**Gap assessment:** Profiled at **emerging tier**. The framework is distinct and its docs are detailed, but adoption is small: 40 stars and 3 forks on the framework repo, 1 star on the CLI, and a project about six months old (repository created 2026-04-25; first GitHub Release, 1.1, 2026-05-14; the changelog lists a 1.0 on 2026-04-26 with no Release). Scores come from reading the repository and docs, not from using the tool. Two things stay unverified: the project's own figures for fewer correction loops and faster delivery come from private internal tests, and whether agents follow the bootstrap reliably is untested here. The sources describe no worktree isolation, parallel orchestration, dashboard, or MCP server, and the README describes the loop as agent guidance (CLI source and generated bootstrap not checked, so enforcement is unknown). Revisit for promotion when adoption clears the bar, or when the CLI source and generated bootstrap show the loop is enforced rather than advised.

**Sources:**
- [GitHub: specdd/specdd](https://github.com/specdd/specdd) (README, TOOLS.md, PLUGINS.md, SECURITY.md, LANGUAGE.md, CHANGELOG.md at `9ad00e7`; verified 2026-10-17)
- [specdd.ai](https://specdd.ai/)
- [GitHub: specdd/cli](https://github.com/specdd/cli)
- [Inclusion request #59](https://github.com/cameronsjo/spec-compare/issues/59)

---

### gstack (garrytan/gstack)

**What it is:** An MIT-licensed set of Markdown skills (`garrytan/gstack`, v1.102.0.0, 2026-11-19) that gives Claude Code, and experimentally other agents, role-based slash commands for a sprint: `/office-hours`, plan reviews, `/review`, `/qa`, `/ship`. `./setup` installs it, compiles some local binaries, and registers hooks. Requested for inclusion in issue #60.

**Why it matters:** ~142K stars and ~21K forks (2026-11-20) make it one of the most-adopted agent workflows in the space. The request calls it "a very popular spec driven framework". The popularity holds (about 1.9 times OpenSpec's 75K stars on the same day); the spec-driven label does not. The README describes "a virtual engineering team" and "a process" (Think, Plan, Build, Review, Test, Ship, Reflect), never uses the term spec-driven, and the repository keeps no living spec or task list.

**Key differentiators:**
- **Role-based plan reviews:** CEO, eng, design, and DX reviews, with `/autoplan` chaining them and a review-readiness table before `/ship`
- **Review, QA, and release depth:** `/review` dispatches specialist subagents, `/qa` drives a real browser or tests CLIs and APIs, and `/ship` runs a coverage audit and opens the PR
- **Optional spec step:** `/spec` interviews you, gates the result on a quality score, and files it as a GitHub issue; `--execute` can spawn `claude -p` in a fresh worktree
- **Agent reach (project's claim, not tested here):** Claude Code is the only full-support host; Codex, Cursor, Gemini CLI, Copilot CLI, and others are listed experimental, and the safety hooks block only on Claude Code and, once trusted, Codex

**Gap assessment:** Profiled at **emerging tier** as a workflow bundle that sits beside the SDD tools rather than a spec tool, the same way Superpowers and Pocock's skills are read. Adoption is far past the bar; the scores come from reading the repository and its docs, not from using it. Its weight is on review, QA, and release, and it leaves implementation to Claude Code's plan mode. Its design doc and test plan live under `~/.gstack`, not in the repository. Parallel work depends on Conductor rather than gstack, and outside reviews send code to Codex or Claude Code by default. The author's productivity figures are not checked here. Revisit if the project adds an in-repo spec or task step.

**Sources:**
- [GitHub: garrytan/gstack](https://github.com/garrytan/gstack) (README, docs/skills.md, docs/why-gstack.md, ARCHITECTURE.md, AGENTS.md, CHANGELOG.md, LICENSE, `spec/SKILL.md` at `92c6c8a`; verified 2026-11-20)
- [Inclusion request #60](https://github.com/cameronsjo/spec-compare/issues/60)

---

### SpecWeave (anton-abyzov/specweave)

**What it is:** An MIT-licensed spec-driven CLI (`specweave` on npm, 3.2.2, 2026-11-18) that keeps each piece of AI-coding work in git as one `spec.md` (Problem, Scope, numbered acceptance criteria, Approach, Tasks), an append-only `ledger.jsonl` of task claims and evidence, and a handoff another agent can pick up. Requested for inclusion in issue #57 by the project's maintainer, with the conflict of interest disclosed.

**Why it matters:** It targets switching tools mid-task. `specweave handoff` releases the agent's claims, writes a handoff note, and pushes the branch plus a snapshot of uncommitted edits; `specweave pickup` in another tool or account applies it and prints the next task with its acceptance criteria. `specweave auto-handoff on` reads plan usage from the Claude Code status line and Codex session logs. None of the profiled tools documents that path.

**Key differentiators:**
- **Evidence ledger:** `specweave task done` requires `--run "<cmd>"` (stores the exit code and log, refuses a failing command) or free-text `--evidence`; `specweave verify` runs the configured or detected test, lint, and build commands and gates `specweave complete`
- **Handoff across tools and accounts:** state travels in git; it cannot read another tool's session transcript
- **Usage-limit handoff (source read, not run):** the default suggests a handoff at 95% of a usage window and keeps working; `--mode enforce` stops and hands off. Cloud sessions have no usage meter, so handoff there is manual
- **Edit gate:** a hook blocks edits made without an increment unless `specweave small-fix "<why>"` is run, and each exemption is logged

**Gap assessment:** Profiled at **emerging tier**. Adoption is small but past SpecDD's: 173 stars and 20 forks, repository created 2025-10-25, 153 GitHub releases, and about 15.7K npm downloads in the 30 days to 2026-11-19. One author wrote about 95% of the 3,856 commits. The request's descriptions of `spec.md`, `ledger.jsonl`, `verify`, `handoff`, and `pickup` held against the CLI source at `826e51d`. Two details did not: the auto-handoff default is 95% in suggest mode, not 90% (the project's README and pricing page still say 90%), and the "about 760 tokens" `AGENTS.md` figure describes the 3.0 template, which has since shrunk to 550 bytes. The CLI sits under a commercial layer, SpecWithCode (a desktop app with a hosted relay and a $20/month Pro tier on a waitlist), though the CLI works without it. Scores are this repository's, not the maintainer's, and come from reading the source, package, and docs. Revisit for promotion when contributors beyond the original author carry a meaningful share of commits.

**Sources:**
- [GitHub: anton-abyzov/specweave](https://github.com/anton-abyzov/specweave) (README, AGENTS.md, CHANGELOG.md, CLI source, `src/templates/AGENTS.md.template` at `826e51d`; verified 2026-11-20)
- [npm: specweave](https://www.npmjs.com/package/specweave)
- [spec-weave.com](https://spec-weave.com/) (pricing, handoff and auto-handoff guides)
- [Inclusion request #57](https://github.com/cameronsjo/spec-compare/issues/57)

---

### archiet-microcodegen (marginal)

**What it is:** A single-file, MIT-licensed deterministic code generator (`Anioko/microcodegen`) that compiles a regex-parsed PRD into a bootable Flask app ZIP via `string.Template` rendering — no LLM in the open-source generation path, pure stdlib, zero dependencies. It is the open-source reference component of **archiet.com**, a commercial spec-driven platform (REQARCHITECT LTD). Companion per-stack packages exist on npm (NestJS), PyPI (Flask/Django), Packagist (Laravel), NuGet (.NET), and the Go proxy.

**Why it's interesting:** It stakes out a genuinely distinct point in the SDD space — deterministic model-to-text (M2T) templating rather than LLM inference, so the generated app's *structure* is reproducible and the OSS tool runs offline.

**Gap assessment:** Noted here rather than profiled. Adoption is near zero (algorithm repo **~4★**; the SDD-guide repo, created the day its inclusion PR opened, is **0★**) — below even the MUSUBI marginal line. Several headline claims also don't hold up on inspection: every published package is **pre-1.0** (core PyPI `archiet-microcodegen` 0.2.3, June 2026), not the "Stable v1.0.x" advertised; two of the ten claimed ecosystems — a RubyGems `*-rails` gem and a crates.io `*-tauri` crate — **do not exist**; the "same spec → same ZIP, reproducible for CI/audit" claim is undercut by **per-ZIP random secret injection** (`secrets.token_urlsafe(32)`); and the file's own docstring notes the full (commercial) pipeline uses "a chunked LLM extractor," so "zero LLM" describes the teaser, not the product. Like Zencoder/Tessl, it's the free OSS lead-in to a paid platform ($104–$2,099/mo). Revisit for a full profile if it ships a real 1.0, multi-stack registry parity actually lands, and adoption clears the bar.

**Sources:**
- [GitHub: Anioko/microcodegen](https://github.com/Anioko/microcodegen) (algorithm)
- [GitHub: Anioko/spec-driven-development](https://github.com/Anioko/spec-driven-development) (guide)
- [PyPI: archiet-microcodegen](https://pypi.org/project/archiet-microcodegen/)
- [archiet.com](https://archiet.com) (commercial platform)
- [Inclusion PR #12](https://github.com/cameronsjo/spec-compare/pull/12)

---

### reqlan (marginal)

**What it is:** A token-efficient requirements-graph DSL with PKM-style linking (`littletuna4/reqlan`, AGPL-3.0-only) for semantic requirement traceability. A multi-package monorepo: VS Code extension (v1.14.0), CLI (v0.10.0), MCP server (v0.4.0), plus language and analytical packages — all verified AGPL-3.0-only in their `package.json` (no root LICENSE file yet, so GitHub reports the repo license as unknown).

**Why it's interesting:** It stakes out the requirement-*graph* corner none of the profiled tools cover — the closest neighbors (OpenSpec, Spec-Kit) are spec-*document* tools. Linked, queryable requirements with semantic traceability is a real shape in the space worth watching.

**Gap assessment:** Noted here rather than profiled. Adoption is near zero (**~3★**, repo created 2026-06-21, solo maintainer) — the same side of the bar as archiet. Unlike archiet, the verifiable claims held up on inspection: license, package versions, and schema-shaped facts all checked clean in the author-submitted inclusion PR (affiliation honestly disclosed in body, commit, and changelog). The submitted heatmap scores were the author's own self-assessment, which the scoring policy doesn't accept regardless of plausibility. Revisit for an emerging-tier profile when adoption clears the bar.

**Sources:**
- [GitHub: littletuna4/reqlan](https://github.com/littletuna4/reqlan)
- [reqlan.com](https://reqlan.com/)
- [Inclusion PR #46](https://github.com/cameronsjo/spec-compare/pull/46)

---

### SpecBuddy (marginal)

**What it is:** An IDE-native spec → plan → step-execution → review loop, shipped as editor plugins rather than a CLI: a JetBrains plugin (`dev.specbuddy.intellijplugin`, v0.13.0, 2026-09-13) and a VS Code extension (`AleksandrShustanov.spec-buddy-vscode`, v0.9.9, 2026-09-09). You write a Markdown spec in the editor and approve a generated step-by-step plan. Claude Code or Codex then runs it one step at a time in a dedicated git worktree, and each step yields a diff you accept, refine with inline comments, or roll back to its pre-step snapshot. A chat mode wraps ordinary agent sessions in the same accept/rollback engine without a spec. Closed source under a custom EULA (`specbuddy.dev/eula`); free during public beta.

**Why it's interesting:** The center of the tool is the *review surface*, not the spec format: per-step diffs, pre/post snapshots, one-click rollback, and a worktree that keeps the main tree clean until a step is accepted. That is close to Traycer's Plan → Execute → Verify shape, but it lives inside the IDE's own diff and VCS tooling and gates **per step** instead of per phase. The two tracked tools that also ship JetBrains plugins (Zencoder, Kilo Code) are agent platforms where SDD is one mode among many; here the plan-and-step loop is the product. Specs and plans stay plain Markdown in the repository, so it composes with a document-first flow.

**Gap assessment:** Noted here rather than profiled — adoption is well below the bar. As of 2026-09-22: **448 JetBrains downloads** with 8 written reviews (four posted 2026-09-08–09) and no aggregate rating published, and **16 VS Code installs** (125 downloads, 2 ratings); public beta opened July 2026. The Open VSX listing cited at submission (v0.9.8, 812 downloads on 2026-09-08) **no longer resolves** — the API returns `Extension not found` and search finds no SpecBuddy extension. There is no public product repository: the `SpecBuddy` GitHub org holds only docs, an agent skill, a website, and `.github`, so the feature claims above trace to the marketplace listings, not to inspectable source. Author-submitted, with affiliation disclosed in the inclusion PR. No heatmap scores, per the scoring policy in the PR #46 ruling. Revisit for an emerging-tier profile when adoption clears the bar.

**Sources:**
- [JetBrains Marketplace: SpecBuddy](https://plugins.jetbrains.com/plugin/32645-specbuddy)
- [VS Code Marketplace: AleksandrShustanov.spec-buddy-vscode](https://marketplace.visualstudio.com/items?itemName=AleksandrShustanov.spec-buddy-vscode)
- [specbuddy.dev](https://specbuddy.dev/)
- [Inclusion PR #50](https://github.com/cameronsjo/spec-compare/pull/50)

---

### Consort (marginal)

**What it is:** A spec-first, test-driven agent framework from Databricks Solutions (`databricks-solutions/consort`, v0.4.50, 2026-11-12) that builds transactional application backends on Lakebase, Databricks' serverless Postgres-compatible OLTP database. A deterministic state-machine conductor drives `/plan → /design → /build → /deploy` through role agents (spec author, architect reviewer, DBA, test strategist, navigator/driver). Human-approval gates fail closed, the design spec and test list freeze at a gate, and, per the README, each git branch is paired with its own Lakebase branch, so every "green" is a run against a real, isolated database. It installs as a Claude Code plugin, with Cursor and Genie Code skill installs and Codex or Claude Desktop through an MCP server (`lakebase-mcp-server`), and ships a dashboard app.

**Why it's interesting:** None of the tracked tools puts a live branched database inside the TDD loop. Consort also puts the controls (phase routing, gates, test-list immutability) in code the agent does not edit rather than in prompts. The immutability check is real: `consort/test-list/mutate-test-list.ts` refuses test-list edits while the `test_list` gate is closed. Most tracked tools rely on the model following instructions.

**Gap assessment:** Noted here rather than profiled. It is not open source in the OSI sense: `LICENSE.md` is a Databricks license that permits use "solely for the purposes of using the Licensed Materials within or connecting to the Databricks Services" and lets Databricks terminate it on notice, which is why GitHub reports `NOASSERTION` (the issue and README say "open source"). It also runs only against a Lakebase-enabled Databricks workspace ("no mock mode", per the README), so it is a platform-specific tool rather than a general SDD method. Adoption is modest: **38★, 12 forks** on 2026-11-20, repository created 2026-05-23, and about 1,710 of roughly 1,720 commits from one author, though releases ship every few days. The arXiv paper ([2609.09671](https://arxiv.org/abs/2609.09671)) is by the same author and frames its main claims as a pre-registered hypothesis, not results. The branch pairing was not exercised here, since it needs a Databricks workspace. Author-submitted, with the affiliation disclosed in the issue. No heatmap scores, per the scoring policy. Revisit for an emerging-tier profile when both hold: (a) it runs outside Databricks or moves to an OSI license, and (b) it has more than one active maintainer. Independent results from the paper's pre-registered experiment would also prompt a re-look.

**Sources:**
- [GitHub: databricks-solutions/consort](https://github.com/databricks-solutions/consort) (README, LICENSE.md, NOTICE.md, docs/positioning.md, source at `5ad34ea`; verified 2026-11-20)
- [arXiv 2609.09671](https://arxiv.org/abs/2609.09671)
- [Inclusion request #58](https://github.com/cameronsjo/spec-compare/issues/58)

---

### Enso Method (marginal)

**What it is:** An MIT-licensed set of 27 agent skills (`EnsoDynamics/enso-method`, no tagged releases) installed as a Claude Code or Codex plugin, or through the `skills` CLI for other agents. It runs PRD → technical design → refinement rounds → phase split → phased build → delivery and test audits. Requirements, design, assumptions, and phase files live together in `docs/prds/<name>/` and stay in the repository as the source of truth for later changes.

**Why it's interesting:** Its distinct piece is a stakeholder loop for when the person who makes the business decisions is not the person running the agent. Open business questions become entries in an assumptions register, each with a proposed answer, evidence, and a confidence level. Entries below 95% confidence go to stakeholders in a review package while the build continues; a rare "Blocking Open Question" stops and asks. Stakeholder answers are folded back into the requirements. The tracked tools mostly assume one operator approving their own spec.

**Gap assessment:** Noted here rather than profiled. Adoption is near zero: **8★, 0 forks**, one contributor, repository created 2026-09-29, no releases or tags (checked 2026-11-20). The shape claims in the inclusion request hold against the repository (plugin install, 27 skills, the assumptions register and its confidence rule). No behavior was run, so quality claims remain the author's. Author-submitted, with the affiliation disclosed in the issue. No heatmap scores, per the scoring policy. Revisit for an emerging-tier profile when it has tagged releases and outside contributors, and adoption clears the bar (SpecDD entered at 40★).

**Sources:**
- [GitHub: EnsoDynamics/enso-method](https://github.com/EnsoDynamics/enso-method) (README, `docs/how-the-enso-method-works.md`, `skills/assumptions-document-writing/SKILL.md` at `989da4d`; verified 2026-11-20)
- [ensomethod.org](https://ensomethod.org)
- [Inclusion request #70](https://github.com/cameronsjo/spec-compare/issues/70)

---

### Speclr (marginal)

**What it is:** A closed-source hosted service (`speclr.dev`) that runs an AI-led discovery interview with a team and turns a vague product idea into BDD specs. It works in four phases in the browser: Discovery (vision statement), Exploration (user-story map), Planning (milestones and risks), and Refinement (rules, data, and Given/When/Then scenarios per story). Output is one Gherkin `.feature` file or Markdown story spec per story, downloadable or synced to GitHub, GitLab, Jira, Notion, Confluence, or Azure DevOps. Plans run $29, $79, and $199 per month billed annually, each with a 14-day trial.

**Why it's interesting:** It works before the point where the tracked tools begin. They start from a spec someone wrote or an agent drafted; Speclr is about how the spec comes to exist while requirements are still vague, by interviewing several stakeholders in one shared workspace. That points at a comparison axis the matrix does not have: how the spec is produced (author-written, agent-drafted, or elicited through structured discovery).

**Gap assessment:** Noted here rather than profiled. It is not a coding-workflow tool: the public site describes no plan, task, implementation, or code-versus-spec verification step, and the founder's own request says the same. It is closed source and hosted only, so every claim above traces to the vendor's site (pricing, help center, and comparisons pages, fetched 2026-11-20) and none could be inspected. No adoption numbers are published, and the "1.1 release on 2026-11-08" in the request could not be confirmed: the site has no release notes, only help pages dated 2026-11-09 and 2026-11-11. Founder-submitted, with the affiliation disclosed in the issue. No heatmap scores, per the scoring policy. Revisit if the matrix gains a spec-elicitation axis, or if the vendor publishes a changelog and independent usage evidence.

**Sources:**
- [speclr.dev](https://speclr.dev) ([pricing](https://speclr.dev/pricing), [help](https://speclr.dev/help), [comparisons](https://speclr.dev/comparisons); fetched 2026-11-20)
- [Inclusion request #73](https://github.com/cameronsjo/spec-compare/issues/73)

---

## Updates to Existing Tools

### July 2026 sweep

Verified against source repos on 2026-07-23 (full detail in [reassessment-2026-07-23.md](reassessment-2026-07-23.md)):

- **Five new emerging-tier entries** added directly to the tracked set (heatmap + feature matrix, no full workflow treatment): **MoAI-ADK** (`modu-ai/moai-adk`, SPEC-First Plan→Run→Sync over Claude Code; it stays emerging, scored from its repository with no hands-on evaluation planned), **Frame** (`kaanozhan/Frame`, Electron agentic development environment), **GRACE** (`osovv/grace-marketplace`, contract-first Graph-RAG methodology), **GAAI** (`Fr-e-d/GAAI-framework`, governed autonomous delivery), and **Smart Ralph** (`tzachbon/smart-ralph`, spec phases over the Ralph loop).
- **GAAI identification caveat:** the request named it phonetically ("gaii"); `Fr-e-d/GAAI-framework` was confirmed as the intended project. It is source-available under Elastic License 2.0 — not OSI open source — and ships versions as git tags only (no GitHub Releases).
- **Spec Kitty** v3.1.9 → **v3.2.5** (charter consolidation, event-log work-package state, split-brain fixes; breaking-change cadence noted).
- No demotions this pass — Smart Ralph's stall gate did not fire (fresh commit 2026-07-23).

### May 2026 reassessment

Verified against source repos on 2026-05-31 (full detail in [reassessment-2026-05-31.md](reassessment-2026-05-31.md)):

- **Kiro → GA.** General availability since 2025-11-17 (team support, Kiro CLI, checkpointing, property-based tests); now on paid tiers (Pro $20 / Pro+ $40 / Power $200 per month) plus a free tier. Current IDE v0.12.x added Parallel Task Execution, Quick Plan, and Requirements Analysis. AWS is sunsetting Amazon Q Developer in favor of Kiro.
- **Tessl → public Framework + Registry.** No longer closed beta; raised ~$125M (Series A led by Index). Repositioned as an Agent Enablement Platform — Framework installs as "tiles" into `.tessl/` and teaches any MCP agent the workflow; the versioned Spec Registry is "npm for specifications."
- **Spec-Kit** v0.1.5 → **v0.8.18** (107K★, 30+ agent integrations). **Spec Kitty** v0.13.5 → **v3.1.9** (acceptance matrix, negative invariants). **Kilo Code** v4.148.1 → **v7.3.16**. **GSD** v1.20.6 → **v1.42.3** (11.9K → 63.8K★). **OpenSpec** v1.2.0 → **v1.3.1**. **Zencoder/Zenflow** now ships a free standalone desktop app with a control plane and auto-worktrees.

### BMad Method → v6.8.0

BMad Method V6 is stable and continues steady releases (v6.0.2 in February → **v6.8.0** on 2026-05-25; ~48.4K★):

- Now **21 specialized agents** (up from 19) across 4 official modules
- **50+ guided workflows** (up from prior count)
- **BMad Builder** via NPX for custom standalone agents, workflows, and modules
- **AI-assisted help** (`/bmad-help`) for guided onboarding
- Cross-File Reference Validator preventing ~25% of historical bugs
- New PRD workflow steps for vision/differentiators and executive summaries
- Community marketplace and Skills Architecture on roadmap

**Source:** [github.com/bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD), [npm: bmad-method](https://www.npmjs.com/package/bmad-method)

### OpenSpec → v1.3.1 (Profiles, Pi & Kiro Support)

OpenSpec has reached v1.3.1 (April 2026; ~51.9K★), building on the v1.0 foundation:

- **Action-based workflow:** Replaced rigid proposal → apply → archive with flexible actions (v1.0)
- **Dynamic instructions:** AI instructions assembled from three layers (context, rules, templates) (v1.0)
- **Semantic spec syncing:** Delta specs parsed at the requirement level, not brittle header matching (v1.0)
- **Agent Skills:** Single `.claude/skills/` directory replaces 8+ scattered config files (v1.0)
- **Profiles:** Core (4 workflows) or custom subset selection (v1.2.0)
- **Propose Workflow:** One-shot change proposal generation (v1.2.0)
- **Pi & Kiro support:** Two new AI tools added alongside existing 21 (v1.2.0)
- **AI Tool Auto-Detection:** `openspec init` scans for existing tool directories (v1.2.0)

**Source:** [openspec.dev](https://openspec.dev/), [GitHub Releases](https://github.com/Fission-AI/OpenSpec/releases)

## Academic Coverage

### ArXiv Paper: Spec-Driven Development (February 2026)

[Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants](https://arxiv.org/abs/2602.00180) — Deepak Babu Piskala (submitted January 30, 2026)

This paper provides practitioners with a comprehensive guide to SDD, covering principles, workflow patterns, and supporting tools. It formalizes the three levels of specification rigor (spec-first, spec-anchored, spec-as-source) that this comparison also identifies, lending academic validation to the taxonomy.

## Related

- [Use Case Scoring — Expanded Heatmap](use-case-scoring.md#expanded-heatmap-including-new-tools) — 23-tool scoring matrix including these frameworks
- [Beads + OpenSpec Cheatsheet](cheatsheet-beads-openspec.md) — Practical workflow combining OpenSpec with Beads
- [Beads](beads.md) — Agent memory layer
- [Orchestration Landscape](landscape.md) — Agent Teams, multi-agent tools
- [Git Worktree Support](git-worktree-support.md) — Updated worktree analysis
- [Comparison Matrix](comparison.md) — Original six-tool comparison
- [Recommendations](recommendations.md) — Decision frameworks including new tools
