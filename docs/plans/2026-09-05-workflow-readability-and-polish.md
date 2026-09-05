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
- [x] Fix mobile matrix sorting and invisible keyboard stops. Browser checks verify the visible sort field and direction button, correct row ordering, and removal of hidden header/wrapper tab stops.
- [x] Complete the interaction audit and disposition its findings. Map labels and coincident points are handled by the visible Inspect tool selector and existing score detail; GSD and Superpowers can be selected independently. Navigation and theme controls passed without changes.
- [x] Run build/tests and browser checks, including regression checks for the shipped carousel. `npm run build && npm test` passes all 39 tests. Chromium and WebKit each pass 40 graph sizing cases; dark/light interaction checks pass at 390/820/1440 px. The prior carousel assertions still pass at 320/390/800/1440 px.
- [ ] Review the full diff, update changelog, commit and push a reviewable PR.

The previous performance/carousel patch is live as PR #48, merge commit `a3f5acd`.

## Verification record

- `node /private/tmp/spec-compare-polish/graphs.cjs http://127.0.0.1:4178/polish/ fixed` and the same command with `BROWSER=webkit` verify all eight core tools at 390/820/1024/1280/1440 px. Both result sets assert scale ≥ 1, SVG height equal to its viewBox height, and no document overflow. Superpowers' phase labels improve from about 3.3 px to 13 px at 820 px.
- `node /private/tmp/spec-compare-polish/checks.cjs` verifies visible mobile keyboard stops, row sorting, independent GSD/Superpowers selection, Escape dismissal, graph/transport placement, and phase-color agreement with the legend in dark/light themes at 390/820/1440 px.
- `node /private/tmp/spec-compare-perf/check-render.cjs http://127.0.0.1:4178/polish/` verifies the previously shipped carousel's physical touch targets and fitted card heights.
- An independent Codex review reconfirmed native select keyboard operation, desktop/mobile sorting behavior across the 640 px breakpoint, map detail dismissal, and keyboard scrolling of mobile graphs. No review blocker remained.
- Narrow phones intentionally scroll wider diagrams horizontally instead of reducing label size. Map coordinates are unchanged; the selector disambiguates coincident tools without shifting their scores.
