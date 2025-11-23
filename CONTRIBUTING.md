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

To suggest a new spec-driven development tool for inclusion:

1. Open an issue with the tool name and repository/website
2. Provide evidence the tool is:
   - Actively maintained
   - Publicly available
   - Relevant to spec-driven development for AI coding
3. Include key differentiators from existing tools

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
4. **Review Process**: Maintainers will review within 7 days
5. **Addressing Feedback**: Make requested changes promptly
6. **Merge**: PRs will be merged once approved

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
├── README.md                  # Project overview
├── CONTRIBUTING.md            # This file
├── CHANGELOG.md              # Version history
├── LICENSE                   # License information
└── docs/
    └── spec-driven-development-tools-comparison.md  # Main comparison
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
