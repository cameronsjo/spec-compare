# The Orchestration Landscape (February 2026)

> There are about a thousand different orchestrator apps, strategies, and paradigms. This document maps the full terrain — not just SDD tools, but every category of tool and pattern that shapes how AI agents build software.

## How to Read This

This repo's [core comparison](comparison.md) covers six SDD tools in depth. The [gaps analysis](gaps.md) adds five more discovered since v1.0.0. This document zooms out to place all of them in the context of the broader orchestration ecosystem.

Categories:

1. [Multi-Agent Frameworks](#1-multi-agent-frameworks) — Code-first SDKs for building agent systems
2. [Agent Runners](#2-agent-runners) — Tools for executing agents in parallel
3. [IDE-Native Orchestration](#3-ide-native-orchestration) — AI built into the editor
4. [CLI-Native Tools](#4-cli-native-tools) — Terminal-first agent interfaces
5. [Autonomous Agents](#5-autonomous-agents) — Fully self-directed software engineers
6. [Full-Stack Builders](#6-full-stack-builders) — Vibe-coding platforms
7. [Workflow Engines](#7-workflow-engines) — Infrastructure for durable agent execution
8. [Commercial Platforms](#8-commercial-platforms) — Cloud-hosted agent services
9. [Protocols & Standards](#9-protocols--standards) — Interoperability layers
10. [Context & Memory](#10-context--memory) — Persistent agent state
11. [Orchestration Paradigms](#11-orchestration-paradigms) — Architectural patterns
12. [Observability](#12-observability) — Monitoring and evaluation
13. [Emerging Patterns](#13-emerging-patterns) — What's next

---

## 1. Multi-Agent Frameworks

Code-first SDKs for composing agents into collaborative systems.

| Framework | Creator | Key Differentiator | Language | URL |
|---|---|---|---|---|
| **LangGraph** | LangChain | DAG-based, lowest latency across benchmarks | Python/JS | [github](https://github.com/langchain-ai/langgraph) |
| **CrewAI** | CrewAI | Role-based mental model (agents have roles, goals, backstories) | Python | [crewai.com](https://www.crewai.com/) |
| **Microsoft Agent Framework** | Microsoft | AutoGen + Semantic Kernel merged; enterprise-grade (.NET/Python/Java) | Multi | [learn.microsoft.com](https://learn.microsoft.com/en-us/agent-framework/) |
| **OpenAI Agents SDK** | OpenAI | Production successor to Swarm; Agents, Handoffs, Guardrails | Python/TS | [github](https://github.com/openai/openai-agents-python) |
| **Google ADK** | Google | Three built-in orchestrators (Sequential, Parallel, Loop); bidirectional audio/video streaming | Python/TS/Go | [github](https://github.com/google/adk-python) |
| **AWS Strands** | AWS | Model-first (FM figures out the sequence); deep Bedrock integration | Python | [aws blog](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/) |
| **Pydantic AI** | Pydantic | Type-safe, "FastAPI feeling"; 8M monthly downloads | Python | [ai.pydantic.dev](https://ai.pydantic.dev/) |
| **smolagents** | Hugging Face | Agents write Python code instead of JSON tool calls (~30% fewer LLM calls) | Python | [github](https://github.com/huggingface/smolagents) |
| **LlamaIndex AgentWorkflow** | LlamaIndex | Event-driven async workflows; deep RAG integration | Python | [llamaindex.ai](https://www.llamaindex.ai/workflows) |
| **Haystack** | deepset | Pipeline architecture; PipelineTool exposes pipelines as LLM-callable tools | Python | [github](https://github.com/deepset-ai/haystack) |
| **Mastra** | Gatsby team | TypeScript-native; 3rd fastest-growing JS framework ever | TypeScript | [mastra.ai](https://mastra.ai/) |
| **BeeAI** | IBM | Framework-agnostic via ACP protocol; Linux Foundation governed | Python | [github](https://github.com/i-am-bee/beeai-framework) |
| **CAMEL-AI** | CAMEL-AI | Research-first; million-agent simulations | Python | [github](https://github.com/camel-ai/camel) |
| **Agency Swarm** | VRSEN | Production extension of OpenAI Agents SDK for swarm management | Python | [github](https://github.com/VRSEN/agency-swarm) |

### The Big Three Comparison

The most commonly compared multi-agent frameworks:

| Aspect | LangGraph | CrewAI | AutoGen (legacy) |
|---|---|---|---|
| **Paradigm** | Explicit graph | Role-based teams | Conversational |
| **Control** | Maximum (you define every edge) | Medium (framework handles handoffs) | Low (agents negotiate via chat) |
| **Learning Curve** | Steep | Gentle | Moderate |
| **Best For** | Complex stateful workflows | Team-like collaboration | Rapid prototyping |
| **Successor** | — | — | Microsoft Agent Framework |

---

## 2. Agent Runners

Tools for executing multiple agents in parallel with isolation and coordination.

| Tool | What It Does | Isolation | URL |
|---|---|---|---|
| **Claude Code Task Tool** | Native sub-agent parallelism (up to 7 agents) | Context window | Built into Claude Code |
| **Claude Code Background Agents** | Non-blocking agent spawning (Feb 2026) | Context window | Built into Claude Code |
| **Conductor** | macOS desktop app for parallel Claude Code / Codex agents | Git worktrees | [conductor.build](https://www.conductor.build/) |
| **claude-swarm** (affaan-m) | Dependency graphs, parallel execution, Opus Quality Gate | Process | [github](https://github.com/affaan-m/claude-swarm) |
| **claude-flow** (ruvnet) | Swarm orchestration with shared memory; dual Claude + Codex workers | Process | [github](https://github.com/ruvnet/claude-flow) |
| **ccswarm** (nwiizo) | Multi-agent orchestration with git worktree isolation | Git worktrees | [github](https://github.com/nwiizo/ccswarm) |
| **Zerg** | Parallel Claude Code orchestration; assumes failure and recovers | Process | [blog post](https://www.rockcybermusings.com/p/behold-zerg-parallel-claude-code-orchestration) |
| **Gas Town** (Yegge) | Beads + Agent Mail agent village; Mad Max terminology | Git worktrees | [github](https://github.com/steveyegge/gastown) |
| **VS Code Agent HQ** | Native multi-agent hub in VS Code v1.109+ | Workspaces | Built into VS Code |

### Hidden: Claude Code TeammateTool

A fully-implemented multi-agent orchestration system discovered inside Claude Code's binary, feature-flagged off. 13 operations with defined schemas, directory structures, and environment variables. Represents Anthropic's unreleased vision for native multi-agent Claude Code.

Source: [paddo.dev — Claude Code Hidden Swarm](https://paddo.dev/blog/claude-code-hidden-swarm/)

---

## 3. IDE-Native Orchestration

AI capabilities built directly into the development environment.

| IDE / Tool | Key Differentiator | Users | URL |
|---|---|---|---|
| **Cursor** | Composer for multi-file changes; up to 8 simultaneous agents; $29.3B valuation | 2.1M+ | [cursor.sh](https://cursor.sh/) |
| **Windsurf** | Graph-based Cascade engine maps entire codebase logic; automatic context discovery | — | [windsurf.com](https://windsurf.com/) |
| **Google Antigravity** | Manager View for parallel agent orchestration; Google ecosystem integration | — | Google product |
| **Cline** | Open-source; Plan/Act modes; model-agnostic (any LLM including local); MCP extensible | 4M+ | [github](https://github.com/saoudrizwan/claude-dev) |
| **Roo Code** | Role-based modes; Roo Cloud Agents work 24/7 via Slack/GitHub; Apache 2.0 | — | [github](https://github.com/RooCodeInc/Roo-Code) |
| **GitHub Copilot** | Deepest GitHub integration; Agent Mode + Cloud Agent; Mission Control | 15M+ | [github.com/features/copilot](https://github.com/features/copilot) |
| **Augment Code** | 200K-token context; semantic dependency graph; ISO 42001 + SOC 2 Type II | — | [augmentcode.com](https://www.augmentcode.com/) |
| **Sourcegraph Cody + Amp** | Best codebase understanding for very large monorepos; Apache 2.0 | — | [sourcegraph.com/cody](https://sourcegraph.com/cody) |
| **Continue.dev** | Most flexible model-agnostic architecture; 20K+ GitHub stars | — | [continue.dev](https://continue.dev/) |
| **Kilo Code** | Forked from Roo Code; structured modes; Memory Bank; 500+ models; $8M seed (GitLab co-founder) | 1.5M+ | [kilo.ai](https://kilo.ai/) |

---

## 4. CLI-Native Tools

Terminal-first interfaces for agent-assisted development.

| Tool | Key Differentiator | Stars/Users | URL |
|---|---|---|---|
| **Claude Code** | Anthropic's CLI agent; Task tool for parallelism; native MCP | — | [code.claude.com](https://code.claude.com/) |
| **OpenAI Codex CLI** | Rust-based; OS-level sandboxing; GPT-5.3-Codex model; Codex App (macOS) | 1M+ MAD | [github](https://github.com/openai/codex) |
| **Gemini CLI** | Generous free tier (60 req/min); 1M token context; ReAct loop | — | [github](https://github.com/google-gemini/gemini-cli) |
| **Aider** | Oldest CLI agent; deepest git integration; auto-commits; 100+ languages | 39K+ stars | [aider.chat](https://aider.chat/) |
| **Goose** (Block) | Desktop + CLI; Apache 2.0; MCP-native; Linux Foundation governed | 27K+ stars | [github](https://github.com/block/goose) |
| **OpenCode** | Go-based; LSP integration; multi-session; 75+ model providers | — | [github](https://github.com/opencode-ai/opencode) |
| **Warp** | Rust terminal + agent IDE; #1 on Terminal-bench; mixed-model approach | — | [warp.dev](https://www.warp.dev/) |

---

## 5. Autonomous Agents

Fully self-directed AI software engineers.

| Agent | Key Differentiator | URL |
|---|---|---|
| **Devin** (Cognition AI) | Own shell, editor, browser, sandbox; $73M ARR (June 2025); 14x faster on repo migrations | [devin.ai](https://devin.ai/) |

---

## 6. Full-Stack Builders

Vibe-coding platforms that generate complete applications.

| Platform | Key Differentiator | ARR / Users | URL |
|---|---|---|---|
| **Replit Agent** | Most autonomous full-stack builder; 50+ languages; revenue grew 10x in 9 months | 40M+ users | [replit.com](https://replit.com/) |
| **Bolt.new** | Fastest to prototype (28 min in benchmarks); runs in-browser via WebContainers | ~$100M ARR | [bolt.new](https://bolt.new/) |
| **Lovable** | Cleanest React/TypeScript output; $100M ARR in 8 months | — | [lovable.dev](https://lovable.dev/) |

---

## 7. Workflow Engines

Infrastructure for durable, fault-tolerant agent execution.

| Engine | Key Differentiator | Category | URL |
|---|---|---|---|
| **Temporal** | Durable execution; OpenAI uses it for Codex in production; crash-recovery + exactly-once | Durable execution | [temporal.io](https://temporal.io/) |
| **Prefect** | Most Pythonic; `@flow`/`@task` decorators; 6M+ monthly downloads | Python-native | [prefect.io](https://www.prefect.io/) |
| **Apache Airflow** | Largest ecosystem; strongest for batch ETL/ELT; Apache Foundation | DAG-based | [airflow.apache.org](https://airflow.apache.org/) |
| **Dagster** | Asset-first (what data exists and how it's produced); lineage tracking | Data-centric | [dagster.io](https://dagster.io/) |
| **Flyte** | K8s-native; typed interfaces; containerized execution | K8s-native | [flyte.org](https://flyte.org/) |
| **n8n** | Open-source; AI Agent Node with LangChain; multi-agent orchestration; 1700+ templates | Low-code | [n8n.io](https://n8n.io/) |
| **Langflow** | Visual orchestration of multi-agent conversations; deploy-as-API | Low-code | [github](https://github.com/langflow-ai/langflow) |
| **Flowise** | Visual builder on LangChain + LlamaIndex; three builder tiers | Low-code | [flowiseai.com](https://flowiseai.com/) |

---

## 8. Commercial Platforms

Cloud-hosted agent services and enterprise offerings.

| Platform | Key Differentiator | URL |
|---|---|---|
| **Amazon Bedrock AgentCore** | Framework-agnostic managed deployment; Identity, Gateway, Memory, Code Interpreter services | [aws](https://aws.amazon.com/bedrock/agentcore/) |
| **Azure AI Agent Service** | Native Azure + Microsoft Agent Framework integration | [azure](https://azure.microsoft.com/) |
| **Google Vertex AI Agent Builder** | Native Gemini; deployment path for ADK agents | [google cloud](https://cloud.google.com/products/agent-builder) |
| **Zencoder / Zenflow** | RED/GREEN/VERIFY loops; parallel agents with cross-agent code review | [zencoder.ai](https://zencoder.ai/) |
| **Zapier Agents** | 8,000+ integrations; task-based pricing; SOC 2 Type II | [zapier.com/agents](https://zapier.com/agents) |
| **Dify** | Self-hosted; 114K+ GitHub stars; dual-directional MCP support | [dify.ai](https://dify.ai/) |
| **Kore.ai** | Enterprise multi-agent orchestration with context handoff | [kore.ai](https://www.kore.ai/) |
| **Microsoft Copilot Studio** | Cross-Microsoft ecosystem; parent/child agent delegation | [microsoft](https://www.microsoft.com/en-us/microsoft-copilot/copilot-studio) |
| **Amazon Q Developer** | AWS-native coding assistant; IP indemnity on Pro tier | [aws](https://aws.amazon.com/q/developer/) |
| **Tabnine** | Air-gapped deployment; strongest privacy guarantees | [tabnine.com](https://www.tabnine.com/) |
| **Qodo** | Quality-first; 80% accuracy on cross-repo questions; automated test generation | [qodo.ai](https://www.qodo.ai/) |

---

## 9. Protocols & Standards

The interoperability layer that connects everything.

### MCP (Model Context Protocol)

Anthropic's open standard (donated to Linux Foundation, December 2025) for connecting AI systems to external tools and data. JSON-RPC 2.0 over LSP-inspired message flow.

- 10,000+ public MCP servers
- 97M+ monthly SDK downloads
- Adopted by ChatGPT, Cursor, Gemini, VS Code, Copilot
- "USB-C for AI"

**URL:** [modelcontextprotocol.io](https://modelcontextprotocol.io/)

### A2A (Agent2Agent Protocol)

Google-originated (now Linux Foundation) protocol for agent-to-agent communication. Uses Agent Cards (JSON) for capability discovery, HTTP/SSE/JSON-RPC transport.

- MCP = agent-to-tool; A2A = agent-to-agent
- 150+ supporting organizations
- gRPC support in v0.3

**URL:** [github](https://github.com/a2aproject/A2A)

### ACP (Agent Communication Protocol)

IBM Research protocol extending MCP with agent discovery and execution. Underlies BeeAI.

### AGENTS.md

Open, non-proprietary markdown format for guiding AI coding agents. 28.64% median runtime reduction, 16.58% token reduction in evaluations. OpenAI Codex has 88 AGENTS.md files in its repo.

**URL:** [agents.md](https://agents.md/)

### SKILL.md

Anthropic specification for defining modular, reusable AI agent capabilities as self-contained directories. Cross-platform portability.

---

## 10. Context & Memory

Solutions for the "50 First Dates" problem — agents forgetting everything between sessions.

| Tool | Approach | Key Differentiator | URL |
|---|---|---|---|
| **Beads** (Yegge) | Git-backed graph issue tracker | Hash-based IDs prevent merge collisions; compaction for context decay | [github](https://github.com/steveyegge/beads) |
| **Letta** (MemGPT) | Self-editing memory blocks | "LLM Operating System" — LLM manages its own virtual memory; Context Repositories (Feb 2026) | [letta.com](https://www.letta.com/) |
| **Mem0** | Memory-as-a-service | Pluggable, framework-agnostic; graph-based memory variant for relational structures | [mem0.ai](https://mem0.ai/) |
| **MCP Agent Mail** (Emanuel) | Async messaging + file leases | Git + SQLite dual persistence; advisory reservations instead of locks | [github](https://github.com/Dicklesworthstone/mcp_agent_mail) |
| **Claude Code Tasks** | Session-level task coordination | SQLite-backed; dependency-aware; session-scoped with opt-in persistence | Built into Claude Code |
| **Flux** | MCP-first Kanban | Team-level coordination with web dashboard | [paddo.dev](https://paddo.dev/blog/from-beads-to-tasks/) |

### The Memory Stack

These tools operate at different layers and are complementary:

```
┌─────────────────────────────────────┐
│  Team Level: Flux (Kanban + web UI) │
├─────────────────────────────────────┤
│  Project Level: Beads (git-native)  │
├─────────────────────────────────────┤
│  Session Level: Claude Code Tasks   │
└─────────────────────────────────────┘
```

---

## 11. Orchestration Paradigms

The architectural patterns that structure how agents collaborate.

### DAG-Based Orchestration
Tasks as nodes, edges as dependencies. Parallel execution of independent branches, strict ordering where needed. **Used by:** LangGraph, Airflow, Dagster, OpenSpec v1.0 (artifact DAG).

### Event-Driven Architecture
Agents react to async notifications via message brokers. Highly responsive, inherently decoupled. **Used by:** LlamaIndex Workflows, Kafka+Ray, Node-RED.

### Blackboard Pattern
Shared knowledge base where agents post and retrieve information. Asynchronous collaboration without direct communication. **Used by:** AWS Arbiter Pattern.

### Orchestrator-Worker
Central coordinator assigns tasks to specialized workers. **Used by:** CrewAI, most multi-agent frameworks, Claude Code Task tool.

### Handoff Orchestration
Agents dynamically delegate to each other without a central manager. Resembles a referral system. **Used by:** OpenAI Agents SDK, LlamaIndex AgentWorkflow.

### Hierarchical / Supervisor
Multi-level supervisors manage teams of agents. Scalable to very large populations. **Used by:** LangGraph (with supervisor nodes), enterprise deployments.

### Market-Based
Agents bid for tasks based on cost or utility; orchestrator assigns to best bidder. Dynamic resource allocation.

### Writer / Reviewer
Separate sessions for creation and evaluation. **Recommended by:** Anthropic for Claude Code parallel sessions.

### Ralph Loop (Stateless Iteration)
Each iteration spawns a fresh agent. All state lives on disk/git. One task per loop. **Created by:** Geoffrey Huntley. See [gaps.md](gaps.md).

### Rule of Five (Convergent Review)
Five passes with different focus areas produce convergent quality. **Created by:** Jeffrey Emanuel. **Adopted by:** Gas Town.

### ReWOO (Reasoning Without Observation)
Separates planning, execution, and synthesis into discrete stages. More predictable, fewer wasted tokens.

### Reflexion
Iterative self-critique and improvement. Agent evaluates its own output and self-corrects.

---

## 12. Observability

Monitoring, debugging, and evaluating agent systems.

| Platform | Key Differentiator | URL |
|---|---|---|
| **LangSmith** | Native LangChain/LangGraph integration; step-by-step debugging | [smith.langchain.com](https://smith.langchain.com/) |
| **Arize Phoenix** | Open-source; OpenInference standard; online evaluations | [arize.com](https://arize.com/) |
| **Braintrust** | Evaluation-first; failed traces → CI test cases in one click | [braintrust.dev](https://www.braintrust.dev/) |
| **Langfuse** | Strongest open-source alternative; self-hostable | [langfuse.com](https://langfuse.com/) |
| **Pydantic Logfire** | OpenTelemetry-based; tight Pydantic AI integration | [pydantic.dev/logfire](https://pydantic.dev/logfire) |

---

## 13. Emerging Patterns

### Context Engineering (Paradigm Shift)
Successor to "prompt engineering." Structuring everything an LLM needs — prompts, memory, tools, data — to make intelligent autonomous decisions reliably. Treats the model as a "programmable, context-aware engine" rather than a chatbot.

Source: [Anthropic — Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)

### 12-Factor Agent
Software engineering principles applied to LLM agents: own your prompts, own your context window, treat tool calls as structured outputs, separate reasoning from execution.

### Agent-as-MCP-Server
Agents expose themselves as MCP servers, allowing other agents to call them as tools. **Used by:** Dify, Codex CLI.

### Mixed-Model Orchestration
Different models for different sub-tasks within a single workflow (Claude for architecture, GPT for prototyping, Gemini for search grounding). **Used by:** Warp, claude-flow, most modern platforms.

### Human-on-the-Loop
Shift from human-in-the-loop (approval gates) to human-on-the-loop (monitoring without blocking). Deloitte: 38% of enterprises still use human-in-the-loop; 20% report fully autonomous operation.

### Agentic AI Foundation (Linux Foundation)
Co-founded by Anthropic, Block, OpenAI. Supported by Google, Microsoft, AWS, Cloudflare, Bloomberg. Stewards MCP, Goose, AGENTS.md, and other open standards.

---

## By the Numbers

| Metric | Value |
|---|---|
| Autonomous AI agent market (2026) | $8.5B (projected $35B by 2030) |
| Agentic AI spending forecast (2029) | $1.3T+ (CAGR 31.9%) |
| Enterprise AI agent adoption | 86% in production, pilot, or planning |
| Developer AI tool usage | ~85% regularly use AI for coding |
| MCP ecosystem | 10,000+ servers, 97M+ monthly SDK downloads |
| A2A protocol | 150+ supporting organizations |

---

## Sources

- [Deloitte: AI Agent Orchestration Predictions 2026](https://www.deloitte.com/us/en/insights/industry/technology/technology-media-and-telecom-predictions/2026/ai-agent-orchestration.html)
- [Towards AI: Developer's Guide to Agentic Frameworks 2026](https://pub.towardsai.net/a-developers-guide-to-agentic-frameworks-in-2026-3f22a492dc3d)
- [Shakudo: Top 9 AI Agent Frameworks February 2026](https://www.shakudo.io/blog/top-9-ai-agent-frameworks)
- [n8n: AI Agent Orchestration Frameworks](https://blog.n8n.io/ai-agent-orchestration-frameworks/)
- [DataCamp: CrewAI vs LangGraph vs AutoGen](https://www.datacamp.com/tutorial/crewai-vs-langgraph-vs-autogen)
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [Google ADK Documentation](https://google.github.io/adk-docs/)
- [AWS Strands Agents](https://aws.amazon.com/blogs/opensource/introducing-strands-agents-an-open-source-ai-agents-sdk/)
- [Microsoft Agent Framework](https://learn.microsoft.com/en-us/agent-framework/)
- [Anthropic: Effective Context Engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [A2A Protocol](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [AGENTS.md](https://agents.md/)
- [paddo.dev — Claude Code Hidden Swarm](https://paddo.dev/blog/claude-code-hidden-swarm/)

## Related

- [Comparison Matrix](comparison.md) — Deep comparison of six SDD tools
- [Gaps Analysis](gaps.md) — Five additional SDD frameworks
- [Beads, Agent Mail, and Gas Town](beads.md) — Agent memory and coordination
- [Recommendations](recommendations.md) — Which tool for which use case
