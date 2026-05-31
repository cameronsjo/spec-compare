import { describe, expect, it } from 'vitest'
import { tools, coreTools, sharedScenarios, toolBySlug } from './data'
import { SCORE_DIMS } from './types'

// Exercises import.meta.glob auto-discovery + the cross-tool aggregation at runtime —
// the layer `tsc` can't prove resolves (the matrix/heatmap derive from this).
describe('tool data aggregation', () => {
  it('discovers all 11 tools, 6 of them core', () => {
    expect(tools).toHaveLength(11)
    expect(coreTools).toHaveLength(6)
    expect(coreTools.map((t) => t.tool).sort()).toEqual([
      'bmad-method',
      'kiro',
      'openspec',
      'spec-kit',
      'spec-kitty',
      'tessl',
    ])
  })

  it('shares all 6 canonical scenarios across every core tool', () => {
    expect(sharedScenarios.map((s) => s.id)).toEqual([
      'trivial-mod',
      'greenfield',
      'refactor',
      'bug-fix',
      'parallel-dev',
      'cross-cutting',
    ])
  })

  it('keeps every core scenario step pointing at a declared phase', () => {
    for (const t of coreTools) {
      const ids = new Set(t.phases!.map((p) => p.id))
      for (const sc of t.scenarios!) {
        for (const step of sc.steps) expect(ids.has(step), `${t.tool}/${sc.id}:${step}`).toBe(true)
        expect(sc.score).toBeGreaterThanOrEqual(1)
        expect(sc.score).toBeLessThanOrEqual(5)
      }
    }
  })

  it('emerging tools carry scores but no fabricated workflow', () => {
    for (const t of tools.filter((t) => t.tier === 'emerging')) {
      expect(t.phases).toBeUndefined()
      expect(t.scenarios).toBeUndefined()
    }
  })

  it('every tool has a full 8-dimension score block in 1–5', () => {
    for (const t of tools) {
      for (const d of SCORE_DIMS) {
        const v = t.scores[d.key]
        expect(v, `${t.tool}.${d.key}`).toBeGreaterThanOrEqual(1)
        expect(v).toBeLessThanOrEqual(5)
      }
    }
  })

  it('resolves a tool by slug', () => {
    expect(toolBySlug('openspec')?.displayName).toBe('OpenSpec')
    expect(toolBySlug('nope')).toBeUndefined()
  })
})
