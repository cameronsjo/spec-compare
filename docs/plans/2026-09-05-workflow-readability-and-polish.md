# Workflow readability and interaction polish

Cameron flagged the tiny Superpowers graph after the performance patch and asked Codex to find other small quirks without changing the site's design.

## Approach and evidence

- At an 820 px viewport, the single-tool layout reserves 340 px for the inspector, leaving only 76 px of SVG width for Superpowers' 302-unit diagram. Its 13 px labels render at about 3.3 px. The SVG keeps its original height, producing a tiny drawing centered in a tall blank card.
- Use a container-dependent layout: stack graph and inspector when their own space is narrow, retain readable SVG dimensions, and keep playback controls above the graph where they are accessible in both layouts. Preserve the existing comparison carousel.
- Core-tool profiles should show their name and pinned version, consistent with the emerging profiles. Inspector phase colors should use the existing shared phase palette instead of a separate partial mapping.
- An independent Codex browser audit found that the mobile matrix visually hides 15 sortable header buttons but leaves them in the keyboard tab sequence. Provide visible mobile sorting controls and remove hidden controls from the tab sequence.
- Continue the bounded interaction audit for reproduced defects; record any additions before fixing them.
- Map followup: the mobile plot renders tool labels at roughly 6 px, and GSD/Superpowers share identical coordinates, making GSD unreachable by tapping the point. Add a visible tool selector that opens the existing score detail for any tool; hide unreadable tool labels on phones. Keep the plotted coordinates honest. Navigation, view switching, and mobile theme toggling passed the independent audit.
- Declined: shrinking diagrams to force two columns, adding a charting dependency, redesigning the theme, or reopening the shipped LCP work.

## Checklist

- [x] Reproduce graph sizing across all eight core tools and five viewport widths.
- [x] Fix single-tool graph layout, playback placement, profile identity, and phase-color consistency. Browser measurements pass all 40 tool/viewport cases at native SVG scale with natural height and no document overflow.
- [ ] Fix mobile matrix sorting and invisible keyboard stops.
- [ ] Complete the interaction audit and disposition its findings.
- [ ] Run build/tests and browser checks, including regression checks for the shipped carousel.
- [ ] Review the full diff, update changelog, commit and push a reviewable PR.

The previous performance/carousel patch is live as PR #48, merge commit `a3f5acd`.
