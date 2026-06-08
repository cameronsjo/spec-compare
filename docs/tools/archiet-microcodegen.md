# archiet-microcodegen

**Type:** CLI code generator (multi-ecosystem)
**Website:** https://archiet.com
**Repository:** https://github.com/Anioko/spec-driven-development
**Status:** Stable
**License:** MIT
**Current Version:** v1.0.x

## Core Approach

archiet-microcodegen transforms a plain-text PRD or Markdown spec into a complete, bootable application using a deterministic 4-stage pipeline — **no LLM in the generation step**. The pipeline is the spec; the code is the output.

```
Stage 1: parse_prd(text)             → language-agnostic manifest
Stage 2: manifest_to_genome(manifest) → formal genome (entities, routes, auth)
Stage 3: render_genome(genome)        → {path: content} per stack
Stage 4: pack(files)                 → ZIP or writes to --out directory
```

The genome is grounded in ArchiMate 3.2 notation, making every generated application traceable to a formal architectural model.

## Spec-Driven Development Approach

archiet-microcodegen implements **Spec-to-Application (Level 4)**: the spec is compiled (not interpreted by an AI) into a running application. Each package installs from the native registry of its target ecosystem:

| Stack | Install |
|---|---|
| NestJS | `npx archiet-microcodegen-nestjs` |
| Go Chi | `go install github.com/aniekanasuquookono-web/archiet-microcodegen-go@latest` |
| Laravel | `composer global require archiet/microcodegen-laravel` |
| Spring Boot | `java -jar archiet-microcodegen-java.jar` |
| Rails | `gem install archiet-microcodegen-rails` |
| .NET | `dotnet tool install archiet-microcodegen-dotnet -g` |
| Tauri+Rust | `cargo install archiet-microcodegen-tauri` |
| FastAPI | `pip install archiet-microcodegen` |
| Flask | `pip install archiet-microcodegen-flask` |
| Django | `pip install archiet-microcodegen-django` |

## Key Features

- **Zero LLM in generation:** deterministic M2T transformation — same spec → same app every time
- **Complete output:** full bootable application, not code suggestions
- **Offline / air-gapped:** no API keys required
- **Single-file algorithms:** each ecosystem package is <1400 LOC
- **Reproducible:** commit the spec; regenerate on any machine and get the same ZIP
- **SDD guide:** [Anioko/spec-driven-development](https://github.com/Anioko/spec-driven-development) — maturity levels, Spec Kit comparison, `demo.sh`

## Installation

```bash
pip install archiet-microcodegen
git clone https://github.com/Anioko/spec-driven-development.git
cd spec-driven-development && ./demo.sh
```

## Best For

- Teams that need **reproducible** code generation (CI/CD pipelines, audit trails)
- **Air-gapped / regulated environments** where LLM API calls are not permitted
- Developers who want a **complete running app** from a spec, not scaffolding inside an IDE
- Greenfield projects where regeneration from an updated spec is acceptable

## Limitations

- **Greenfield only**: no brownfield/modification workflow (spec-change triggers full regen)
- **No LLM fallback**: complex or ambiguous PRDs produce simpler output rather than guessing
- **No IDE integration**: pure CLI
- **No multi-agent support**: single-pass pipeline
- **No dashboard**: output is files, not project state

## SDD Maturity Level

**Level 4 — Spec-to-Application**

| Level | LLM in generation? | Output | Examples |
|---|---|---|---|
| 1. Spec-First | Yes | Code suggestions | Spec-Kit, Kiro, BMad |
| 2. Spec-Anchored | Yes | Code suggestions, persistent spec | OpenSpec, Spec Kitty |
| 3. Spec-as-Source | Yes | Regenerated code | Tessl |
| 4. Spec-to-Application | **No** | Complete bootable application | archiet-microcodegen |

## Related

- [Comparison Matrix](../comparison.md)
- [SDD guide on GitHub](https://github.com/Anioko/spec-driven-development)
- [Dev.to introduction](https://dev.to/anioko1/spec-driven-development-without-an-ide-i-generated-nestjs-go-spring-boot-laravel-and-rust-3p26)
