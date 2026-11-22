# Contributing to Spec-Driven Development Tools Comparison

Thank you for your interest in contributing to this research project.

## How to Contribute

### Reporting Issues

If you find errors, outdated information, or missing tools:

1. Check existing issues to avoid duplicates
2. Open a new issue with:
   - Clear description of the error or omission
   - Links to authoritative sources
   - Suggested correction or addition

### Suggesting New Tools

To suggest a tool, open an issue with its name, its repository or website, and what it does that the tracked tools don't. Authors, maintainers, and contributors are welcome to suggest their own tools (see Disclosure below). An issue is usually the better route: the entry is written to this project's conventions either way, and most tool pull requests so far have been re-landed on a maintainer branch rather than merged as they were.

#### How a suggestion is assessed

Every suggestion, from anyone, goes through the same steps:

1. **Disclosure.** If you build, maintain, or contribute to the tool, say so. The entry records it, and the README and the site's Disclosure section list it. It does not change the verdict either way.
2. **Scope.** The tool has to be spec-driven development for AI coding, or adjacent to it and read as such (a skill collection or workflow bundle that coding agents run). A tool upstream of the coding loop, such as requirements elicitation on its own, gets a watch-list entry at most.
3. **Openness.** A license or platform that limits who can run the tool (one vendor's services, one hosted database) keeps it on the watch list, however good it is.
4. **Adoption.** An emerging-tier profile needs demonstrated traction: stars, downloads, releases, and active use. A tool that is early but fills a distinct niche goes on the watch list in [docs/gaps.md](docs/gaps.md) instead, with credit for what is new about it.
5. **Core tier.** Core tools get the full treatment: a workflow graph and a walkthrough of every scenario. Core is for established tools with tagged releases and contributors beyond the original author carrying a meaningful share of the work. A new suggestion enters at emerging tier at most.
6. **Verification.** Every claim that ships is checked against the tool's own repository and packages: license, published versions, that packages resolve, and architecture claims against the code. Claims from the tool's authors are treated as hypotheses until checked.
7. **Scores.** Tier, maturity, and heatmap scores are set by this project for every tool, so rows stay comparable. Scores proposed in a suggestion are read as input, not adopted.
8. **Outcome.** The suggestion gets a reply that says what was added and where, what verification found, and what changed from the suggestion and why. Watch-list entries and declined suggestions name a return trigger: the change, such as a release, an adoption level, or a feature, that would bring the tool back for another look. When it happens, comment on the original thread or open a new issue with current numbers.

Closed-source tools are watch-list only. Their claims trace only to public listings or vendor pages, and the entry says so. A profile needs source to inspect, or hands-on use by this project.

Suggestions are handled in batches, with no fixed turnaround.

#### If you open a pull request anyway

- Branch from a topic branch, not your fork's `main`. The PR should contain only the tool's files and the count updates that go with it. Changes for hosting your own copy of the site (analytics, preview images, links, attribution) can't merge here.
- Leave `site/package-lock.json` alone unless the change needs a dependency.
- `site/src/data/tools/<tool>.json` needs scores to validate. Fill them in as your best estimate; they will be re-scored.
- From `site/`, run `npm ci`, `npm run gen:tables`, `npm run build`, and `npm test` before pushing.
- Expect the work to land on a maintainer branch with your commits and authorship kept, or to be closed with a watch-list entry and a return trigger.

### Updating Research

To update or expand the comparison:

1. Fork the repository
2. Create a feature branch: `git checkout -b update/tool-name`
3. Make your changes with:
   - Accurate information from authoritative sources
   - Proper citations and links
   - Consistent markdown formatting
4. Test all links and verify accuracy
5. Submit a pull request with:
   - Clear description of changes
   - Sources for new information
   - Rationale for updates

## Research Standards

### Browser regression checks

From `site/`, run `npm ci`, then `npx playwright install chromium` once and
`npm run check:tab-focus`. The command builds the production app, owns a
temporary local preview, and checks first/last scenario-tab focus visibility at
desktop/mobile widths. To reuse installed Chrome instead of downloading a
browser, use `PLAYWRIGHT_CHROMIUM_CHANNEL=chrome npm run check:tab-focus`.

### Source Quality

All information must be:
- From authoritative sources (official docs, verified blog posts, reputable publications)
- Publicly verifiable
- Current and accurate as of the update date
- Properly cited with links

### Neutrality

- Present objective facts and feature comparisons
- Include both strengths and limitations
- Avoid promotional language
- Disclose potential conflicts of interest

### Structure

Follow the existing document structure:
- Use kebab-case for filenames (`tool-name.md`)
- Maintain consistent heading hierarchy
- Include tables for comparisons
- Add sources section for citations
- Update table of contents

## Code of Conduct

### Be Respectful

- Respect differing viewpoints and experiences
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy toward other contributors

### Be Professional

- Use welcoming and inclusive language
- Avoid personal attacks or inflammatory language
- Stay on topic and relevant
- Provide evidence-based arguments

## Pull Request Process

1. **Update Documentation**: Ensure README and comparison docs reflect your changes
2. **Add Sources**: Include citations for all new information
3. **Update Changelog**: Add entry to CHANGELOG.md
4. **Review Process**: PRs are reviewed in batches, with no fixed turnaround
5. **Addressing Feedback**: Make requested changes promptly
6. **Merge**: PRs that correct or update existing research are merged once approved; tool suggestions follow [Suggesting New Tools](#suggesting-new-tools)

## Commit Message Format

Use Conventional Commits format:

```
<type>: <description>

[optional body]

[optional footer]
```

Types:
- `docs`: Documentation updates
- `feat`: New tool or feature addition
- `fix`: Correction of errors or outdated info
- `refactor`: Restructuring without content changes
- `chore`: Maintenance tasks

Example:
```
docs: add Cursor IDE to comparison matrix

- Added Cursor Plan Mode to tools overview
- Updated comparison table with Cursor features
- Included sources from Cursor documentation

Co-Authored-By: Claude <noreply@anthropic.com>
```

## File Organization

```
spec-compare/
├── README.md                           # Project overview
├── CONTRIBUTING.md                     # This file
├── CHANGELOG.md                        # Version history
├── LICENSE                             # License information
├── site/                               # Interactive comparison site (React + Vite)
│   ├── src/
│   │   ├── data/tools/                 # One JSON per tool — single source of truth
│   │   ├── *.tsx                       # Views: compare, matrix, heatmap, guide, profiles
│   │   └── types.ts, data.ts, score.ts # Schema + auto-discovery + color scale
│   ├── scripts/validate-tools.mjs      # AJV + cross-tool invariant checks
│   └── public/artificer/               # Vendored Artificer design system
└── docs/
    ├── comparison.md                   # Side-by-side feature matrices
    ├── use-case-scoring.md             # 12 use cases graded + heatmap
    ├── iterative-development.md        # Spec modification workflows
    ├── recommendations.md              # Decision frameworks
    ├── critical-analysis.md            # Concerns and critiques
    ├── sources.md                      # All citations
    ├── landscape.md                    # 30+ orchestration tools
    ├── beads.md                        # Agent memory layer
    ├── gaps.md                         # Newly discovered frameworks
    ├── git-worktree-support.md         # Worktree analysis
    ├── cheatsheet-beads-openspec.md    # Practical workflow guide
    └── tools/                       # Full profile docs (most tools get a JSON row only; see data/tools/)
        ├── spec-kit.md
        ├── spec-kitty.md
        ├── bmad-method.md
        ├── openspec.md
        ├── kiro.md
        ├── tessl.md
        ├── superpowers.md
        ├── traycer.md
        ├── gsd.md
        └── ralph-loop.md
```

## Questions?

Open an issue for:
- Clarification on contribution process
- Discussion of major changes
- Questions about research methodology
- Suggestions for improvement

## Recognition

Contributors will be acknowledged in:
- Git commit history
- Pull request descriptions
- Future changelog entries

Thank you for helping improve this research resource.
