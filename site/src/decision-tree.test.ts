import { describe, expect, it } from 'vitest'
import { TREE } from './DecisionGuide'
import { toolBySlug } from './data'

// The decision guide walks TREE by following each answer's `to`. A dangling id or a
// non-terminating path would strand the user mid-flow — assert the graph is sound.
describe('decision TREE integrity', () => {
  it('starts at a question node', () => {
    expect(TREE.start).toBeDefined()
    expect(TREE.start.kind).toBe('question')
  })

  it('every answer points at a declared node', () => {
    for (const [id, node] of Object.entries(TREE)) {
      if (node.kind !== 'question') continue
      for (const a of node.answers) expect(TREE[a.to], `${id} → ${a.to}`).toBeDefined()
    }
  })

  it('every result recommends a real tool', () => {
    for (const node of Object.values(TREE)) {
      if (node.kind !== 'result') continue
      expect(toolBySlug(node.tool), node.tool).toBeDefined()
    }
  })

  it('every path from start terminates at a result (no cycles, no dead ends)', () => {
    const terminates = (id: string, seen: Set<string>): boolean => {
      const node = TREE[id]
      if (!node) return false
      if (node.kind === 'result') return true
      if (seen.has(id)) return false // cycle
      const next = new Set(seen).add(id)
      return node.answers.every((a) => terminates(a.to, next))
    }
    expect(terminates('start', new Set())).toBe(true)
  })

  it('leaves no unreachable nodes', () => {
    const reached = new Set<string>()
    const walk = (id: string) => {
      if (reached.has(id)) return
      reached.add(id)
      const node = TREE[id]
      if (node?.kind === 'question') node.answers.forEach((a) => walk(a.to))
    }
    walk('start')
    expect([...Object.keys(TREE)].filter((id) => !reached.has(id))).toEqual([])
  })
})
