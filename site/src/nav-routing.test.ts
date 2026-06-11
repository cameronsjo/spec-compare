import { describe, it, expect } from 'vitest'
import { OVERVIEW, ABOUT, isViewId } from './App'
import { tools } from './data'

// App routes a nav id by asking isViewId() first: a "view" id renders an overview /
// about surface, anything else is looked up as a tool slug. These invariants guard
// that split — a view id that collided with a real slug would silently shadow the
// tool (it would never reach toolBySlug), and a declared view id that failed to
// classify would fall through to the "Tool not found" branch.
const viewIds = [...OVERVIEW.map((o) => o.id), ...ABOUT.map((a) => a.id)]
const toolSlugs = tools.map((t) => t.tool)

describe('nav view-id routing', () => {
  it('classifies every declared view id as a view', () => {
    for (const id of viewIds) expect(isViewId(id)).toBe(true)
  })

  it('does not classify any tool slug as a view (slugs must reach the tool lookup)', () => {
    for (const slug of toolSlugs) expect(isViewId(slug)).toBe(false)
  })

  it('treats unknown / empty ids as non-views', () => {
    expect(isViewId('does-not-exist')).toBe(false)
    expect(isViewId('')).toBe(false)
  })

  it('keeps view ids disjoint from tool slugs (no view shadows a reachable tool)', () => {
    const collisions = viewIds.filter((id) => toolSlugs.includes(id))
    expect(collisions).toEqual([])
  })

  it('has unique view ids across the overview and about groups', () => {
    expect(new Set(viewIds).size).toBe(viewIds.length)
  })
})
