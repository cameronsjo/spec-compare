import { describe, expect, it } from 'vitest'
import { bucket, formatScore, scoreFill, scoreBorder } from './score'

// The single-hue scale + its formatting helpers. Pure numeric → string maps;
// these back every cell, chip, and popover, so the invariants are load-bearing.
describe('score scale', () => {
  describe('bucket', () => {
    it('rounds to the nearest integer', () => {
      expect(bucket(3.4)).toBe(3)
      expect(bucket(3.5)).toBe(4)
      expect(bucket(3.6)).toBe(4)
    })
    it('clamps below 1 and above 5', () => {
      expect(bucket(0)).toBe(1)
      expect(bucket(-9)).toBe(1)
      expect(bucket(7)).toBe(5)
      expect(bucket(4.9)).toBe(5)
    })
  })

  describe('formatScore', () => {
    it('renders integers bare', () => {
      expect(formatScore(3)).toBe('3')
      expect(formatScore(2.0)).toBe('2')
    })
    it('renders decimals to one place', () => {
      expect(formatScore(3.4)).toBe('3.4')
      expect(formatScore(3.45)).toBe('3.5') // toFixed rounds
    })
  })

  describe('scoreFill / scoreBorder', () => {
    it('emits a single-hue color-mix against --accent', () => {
      for (const v of [1, 2, 3, 4, 5]) {
        expect(scoreFill(v)).toMatch(/^color-mix\(in srgb, var\(--accent\) \d+%, transparent\)$/)
        expect(scoreBorder(v)).toMatch(/^color-mix\(in srgb, var\(--accent\) \d+%, transparent\)$/)
      }
    })

    const pct = (s: string) => Number(s.match(/(\d+)%/)![1])

    it('grades fill monotonically with score', () => {
      const fills = [1, 2, 3, 4, 5].map((v) => pct(scoreFill(v)))
      for (let i = 1; i < fills.length; i++) expect(fills[i]).toBeGreaterThan(fills[i - 1])
    })

    it('keeps the border a touch stronger than the fill, capped at 82%', () => {
      expect(pct(scoreBorder(1))).toBe(pct(scoreFill(1)) + 18)
      expect(pct(scoreBorder(5))).toBe(82) // 70 + 18 = 88, capped
    })

    it('buckets non-integer scores before grading', () => {
      expect(scoreFill(3.4)).toBe(scoreFill(3))
      expect(scoreFill(3.6)).toBe(scoreFill(4))
    })
  })
})
