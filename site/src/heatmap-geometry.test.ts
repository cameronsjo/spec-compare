import { describe, expect, it } from 'vitest'
import { domain, dotPx, layoutLabels, largeAxis, quickAxis, PLOT, type Laid } from './ScoringHeatmap'
import { tools } from './data'
import type { Scores } from './types'

const scores = (p: Partial<Scores>): Scores => ({
  trivial: 3,
  medium: 3,
  large: 3,
  parallel: 3,
  emergency: 3,
  solo: 3,
  contextMgmt: 3,
  overall: 3,
  ...p,
})

describe('map axes (computed projections)', () => {
  it('quickAxis means trivial + emergency + solo', () => {
    expect(quickAxis(scores({ trivial: 5, emergency: 2, solo: 2 }))).toBeCloseTo(3)
    expect(quickAxis(scores({ trivial: 1, emergency: 1, solo: 1 }))).toBe(1)
  })
  it('largeAxis means large + parallel + medium', () => {
    expect(largeAxis(scores({ large: 5, parallel: 4, medium: 3 }))).toBeCloseTo(4)
  })
  it('ignores the dimensions outside its three', () => {
    // contextMgmt / overall must not move either axis
    const a = quickAxis(scores({ trivial: 4, emergency: 4, solo: 4, contextMgmt: 1, overall: 1 }))
    expect(a).toBe(4)
  })
})

describe('domain (integer-aligned, clamped to 1–5)', () => {
  it('brackets the data with quarter-point padding, floored/ceiled', () => {
    expect(domain([1, 3.67])).toEqual([1, 4])
    expect(domain([2.67, 4.67])).toEqual([2, 5])
  })
  it('never escapes the valid 1–5 range', () => {
    expect(domain([1, 1])).toEqual([1, 2]) // floor(0.75)=0 → clamped to 1
    expect(domain([5, 5])).toEqual([4, 5]) // ceil(5.25)=6 → clamped to 5
  })
})

describe('dotPx (punchcard diameter)', () => {
  it('maps 1 → 9px and 5 → 28px', () => {
    expect(dotPx(1)).toBe(9)
    expect(dotPx(5)).toBe(28)
  })
  it('is monotonic and buckets fractional scores', () => {
    expect(dotPx(2)).toBeGreaterThan(dotPx(1))
    expect(dotPx(3.4)).toBe(dotPx(3))
  })
})

describe('layoutLabels de-collision invariant', () => {
  const laid = layoutLabels()
  const CHAR = 6 // mirrors the source label-width estimate
  const boxOf = (l: Laid) => {
    const w = l.spec.displayName.length * CHAR
    return l.anchor === 'end'
      ? { x1: l.lx - w, y1: l.ly - 7, x2: l.lx, y2: l.ly + 6 }
      : { x1: l.lx, y1: l.ly - 7, x2: l.lx + w, y2: l.ly + 6 }
  }
  const overlap = (a: ReturnType<typeof boxOf>, b: ReturnType<typeof boxOf>) =>
    a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2

  it('lays out one entry per tool', () => {
    expect(laid).toHaveLength(tools.length)
  })

  it('produces no overlapping label boxes', () => {
    const boxes = laid.map(boxOf)
    let collisions = 0
    for (let i = 0; i < boxes.length; i++)
      for (let j = i + 1; j < boxes.length; j++) if (overlap(boxes[i], boxes[j])) collisions++
    expect(collisions).toBe(0)
  })

  it('keeps every label inside the plot width', () => {
    for (const l of laid) {
      const b = boxOf(l)
      expect(b.x1, l.spec.displayName).toBeGreaterThanOrEqual(0)
      expect(b.x2, l.spec.displayName).toBeLessThanOrEqual(PLOT.w)
    }
  })

  it('flags a label as moved only when its baseline left its dot', () => {
    for (const l of laid) expect(l.moved).toBe(Math.abs(l.ly - l.y) > 1)
  })
})
