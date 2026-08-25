# Memex (Mindset AI) — Product Review — August 2026

> **Review date:** 2026-08-12 · **Tier verdict:** emerging (heatmap + matrix row, no workflow treatment)
>
> **Disclosure — solicited review.** Mindset AI's VP of Operations reached out
> to the author via LinkedIn (July 2026) after reading this comparison and asked
> for feedback on Memex. This review was conducted independently from public
> sources only: the vendor provided no access, no briefing beyond the outreach
> messages, no compensation, and did not see a draft. It is held to the same
> rubric as every unsolicited entry. The outreach itself is treated as data —
> the vendor's pitch is quoted and checked against what the public repo and
> docs actually support.

---

## TL;DR

- **Memex enters at emerging tier** — a fair-code, self-hostable
  "Specify & Verify" platform where specs are a **typed database** (decisions,
  acceptance criteria, tasks) rather than markdown files, edited concurrently
  by humans (web UI) and agents (MCP), with acceptance criteria verified
  against real CI runs and a knowledge graph across specs.
- **It is the most direct paper answer yet to this repo's #1 critical gap** —
  enforcement. Where most tracked tools *ask* agents to honor specs, Memex
  gates spec closure on per-criterion verification evidence with a human
  sign-off. On paper, that closes the "agents ignore specs" loop.
- **It is also the earliest-stage commercial entrant in the tracked set:**
  no tagged releases, 29 GitHub stars, 0 forks, ~5 visible contributors
  (including the CEO), and no verifiable public pricing at review time.
  The claims are architecture, not evidence.
- **Scores 2.9 overall** (doc-derived, no hands-on) — between GRACE (2.3) /
  GAAI (2.7) and MoAI-ADK (3.1). Promotion triggers are attached below.

---

## What it is

**Memex** ([memex.ai](https://www.memex.ai) ·
[mindset-ai/memex-ai](https://github.com/mindset-ai/memex-ai)) is a
specification-and-verification platform by **Mindset AI Ltd** — a London
company founded 2019 by the team behind Workshare (exited to Litera), CEO
Barrie Hadfield, ~£8M raised (£4.3M round led by Edge VC and Pembroke VCT,
April 2025). Mindset's core business to date is an **embedded AI-agent
platform for SaaS companies** (L&D, HR, media); Memex is their first
developer-tooling product.

The product in one line from their README: it "turns the docs your team
already argues over — decisions, open questions, the tasks that fall out of
them — into living Specs."

**Architecture** (from the public repo):

- **Typed primitives, not prose.** A Spec is a graph node holding
  **Decisions** (typed options with resolved choices, status, lineage),
  **Acceptance Criteria** (individually gated, each carrying verification
  evidence), **Tasks** (derived from the narrative, tracking which ACs they
  close), and comments. **Standards** are cross-cutting codified rules that
  specs cite; changing one surfaces every dependent spec.
- **Explicit pipeline:** draft → specify → build → verify → done. The verify
  phase walks *every* acceptance criterion individually against running
  behavior; "green means proven, and closing a Spec is always a human call."
  The done spec freezes as a durable record rather than being discarded.
- **Drift detection** across three axes: spec ↔ spec, spec ↔ standards, and
  code ↔ standards.
- **Knowledge graph, not a doc tree.** Specs link to decisions, standards,
  prior versions, and code promises; retrieval is semantic search + graph
  traversal (pgvector). Their phrase: "the unit of retrieval is the relevant
  fact, not the document."
- **Dual authorship.** Humans edit in a React web UI with real-time streaming
  (SSE); agents operate on the same entities through typed **MCP** calls
  (search, decision CRUD, phase-readiness checks, narrative edits). A
  Claude-powered agent is embedded in each spec.
- **Stack:** TypeScript monorepo (pnpm), Hono API, Drizzle ORM,
  PostgreSQL 16 + pgvector, React 19, JWT auth, multi-tenant, Docker-ready,
  self-hostable. Agent hookup via `curl … install.sh` or `npx -y memex-ai`.
- **License:** fair-code on the n8n model — core under the **Sustainable Use
  License** (free for internal business/personal use), enterprise features in
  `.ee.` files under a separate commercial license. **Not OSI open source.**

## The pitch, checked

The outreach made three specific claims. Each maps onto a finding this repo
already tracks, which is presumably why they reached out. Checked against the
public repo and docs:

**1. "Acceptance criteria get verified in CI, so that enforcement/drift gap
you flagged doesn't happen."** — The architecture genuinely centers this:
ACs are first-class entities gated per-criterion on test evidence, with
continuous verification during build rather than a single completion gate,
and a frozen post-merge record. Among tracked tools this is the strongest
enforcement *design* — Traycer verifies against a plan, MoAI-ADK gates on
TDD, GRACE detects drift, but none make "done = proven, per criterion, human
countersigned" the core primitive. **However:** it is unvalidated by anyone
outside the vendor (no releases, 0 forks), and "doesn't happen" is a claim no
verification system earns — agents can still game tests, and criteria can
still be written weakly. Call it *the right mechanism, unproven in the wild*.

**2. "Not a big pile of MD docs — specs stay living and grounded in code."**
— True and double-edged. Specs live in a **Postgres database behind a
server**, not in the repo. That buys real-time collaboration, typed queries,
and Slack/web sharing — and it costs the git-native properties every other
tracked tool (except hosted Tessl/Traycer surfaces) preserves: specs in the
PR diff, offline access, plain-text review, no infrastructure dependency.
"Grounded in code" here means *linked to* code, not *versioned with* code.
The spec ↔ repo boundary is a brand-new sync surface, and drift across it is
exactly the failure mode SDD exists to prevent. This is the single biggest
architectural bet to probe in a hands-on eval.

**3. "Everything feeds an Obsidian-like knowledge graph, so it scales as
codebase and team grow."** — The graph model (specs/decisions/standards as
linked nodes, fact-level retrieval) is a credible answer to the "specs don't
scale" finding, and closer to Beads' graph-of-issues thinking than to any
folder-of-markdown tool. But scaling claims are precisely the kind that only
production use validates, and there is none visible yet.

## Where it sits in the landscape

- **SDD maturity: Spec-Anchored.** Specs persist, evolve during build, and
  survive as records — but code is still written by agents against them, not
  generated from them (not Spec-as-Source).
- **Closest neighbors:** Tessl (commercial spec platform; but Tessl bets on
  spec-as-source generation, Memex on decision/verification bookkeeping),
  Traycer (Plan → Execute → Verify; but per-task, IDE-bound, no persistent
  graph), GRACE (drift detection + knowledge graph; but file-based skills,
  no server), and Beads (graph database for agent work items; Memex is
  roughly "Beads for specs" with a verification pipeline on top).
- **Category note:** Memex is the first tracked entrant whose primary spec
  store is an external multi-tenant service rather than the repo. If the
  category grows (Tessl's Registry gestures the same way), the
  git-native ↔ platform split may deserve its own comparison axis.

## Concerns

1. **Extremely early.** No tagged releases or GitHub Releases; 29★ / 0 forks;
   1,529 commits on `develop` with ~5 visible contributors including the CEO.
   Active daily development (latest commit 2026-08-11), but zero visible
   external adoption. Everything above is design intent, not track record.
2. **Fair-code ≠ open source.** Sustainable Use License core + licensed
   `.ee.` enterprise features. Fine for internal use, but not OSI, and the
   free/paid boundary can move (see n8n's history).
3. **Specs leave the repo** (concern #2 above, restated as the adoption
   blocker it is for this repo's audience).
4. **Claude-centric.** Only Claude Code and Claude Desktop are documented MCP
   clients; the embedded agent is Claude-powered. Generic HTTP MCP clients
   "should" work but aren't documented. Cursor/Copilot/Gemini users are on
   their own — narrower than Tessl's or Superpowers' model-agnostic posture.
5. **Trivial-change overhead.** The methodology doc explicitly disclaims
   process for trivial changes, but the honest reading is that Memex adds
   nothing on that path — the value starts at feature-sized work. The
   Modification Problem is dodged, not solved.
6. **Operational weight.** Server + Postgres 16 + pgvector (or their SaaS)
   just to hold specs. Heaviest infrastructure footprint in the tracked set
   for a solo developer.
7. **Pricing unverifiable at review time.** A pricing page exists at
   memex.ai/pricing but couldn't be independently verified for this review;
   no pricing found in the repo or third-party coverage. Recorded as unknown,
   not as free.
8. **Vendor pedigree is adjacent, not native.** Mindset AI's revenue and
   platform experience is embedded agents for L&D/HR SaaS. Real company,
   real funding, credible exit history — but Memex is their first dev tool,
   in a market where Tessl ($125M) and AWS (Kiro) already compete.

### Naming-collision note (identification confidence: high)

"Memex" is heavily overloaded: **memex.tech** is an unrelated AI app-builder
desktop product, `vndee/memex` is an unrelated knowledge-graph memory server,
and there is even a $MMX memecoin. Third-party "Memex reviews" found in
search overwhelmingly describe the memex.tech product — including its
$10/month pricing, which does **not** apply here. This review is based
exclusively on memex.ai, github.com/mindset-ai/memex-ai, and Mindset AI
corporate sources, cross-confirmed by the repo's install domain
(`memex.ai/install.sh`) and the README's "Built by Mindset AI" attribution.

## Scores (doc-derived — no hands-on eval)

| Dimension | Score | Rationale |
|---|---|---|
| Trivial changes | 2 | Pipeline + server round-trip adds nothing to a button-color change; methodology says skip it, so it neither helps nor gates. |
| Medium features | 4 | The sweet spot: decisions + CI-verified ACs on a feature-sized spec is exactly the designed workload. |
| Large projects | 4 | Standards cascade, decision lineage, and graph retrieval are built for scale — on paper. |
| Parallel dev | 3 | Real-time shared graph and composable plan→build→verify agent handoff, but no execution isolation (no worktrees/branch orchestration). |
| Emergency fixes | 1 | A server-backed five-phase pipeline has no hotfix path. |
| Solo dev | 2 | Running Postgres + a server to argue with yourself about decisions; the value is team-shaped. |
| Context management | 4 | Typed fact-level retrieval + pgvector + graph traversal is among the strongest context stories tracked; unproven, so not a 5. |
| **Overall** | **2.9** | Mean of the seven, per house convention. |

Placement check: above GRACE (2.3) and GAAI (2.7), tied with Smart Ralph
(2.9), below MoAI-ADK (3.1) — an architecture this repo's findings say the
space needs, discounted for zero external validation.

## Promotion triggers (emerging → core)

Re-assess for core treatment when **any two** of:

1. A tagged release line exists (v1.x or a dated stable channel) with public
   pricing.
2. External traction: meaningful stars/forks/contributors outside Mindset AI,
   or named production users.
3. A hands-on eval of the CI verification loop confirms ACs actually gate on
   test evidence end-to-end (and measures the spec ↔ repo sync friction).
4. Documented non-Claude agent support (Cursor, Codex, Copilot, or Gemini via
   MCP).

## Sources

- <https://www.memex.ai> — product site (egress-blocked from the review
  environment; claims cross-checked via repo + search snapshots)
- <https://github.com/mindset-ai/memex-ai> — full source; README, SDD.md,
  `docs/local-mcp-client.md`, commit history, releases page (empty),
  package.json (verified 2026-08-12)
- <https://docs.mindset.ai/memex/introduction/overview> — product docs (via
  search snapshot; direct fetch blocked)
- <https://tech.eu/2025/04/15/uk-based-mindset-ai-raises-ps43m-to-enhance-saas-companies-with-ai-features/> — funding/company background
- <https://www.finsmes.com/2025/04/mindset-ai-raises-4-3m-in-funding.html> — funding detail
- LinkedIn outreach from Mindset AI VP of Operations, July 2026 (vendor
  claims quoted in "The pitch, checked")
