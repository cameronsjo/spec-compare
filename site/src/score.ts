// Single-hue sequential scale: score 1–5 → faint → bold accent. The numeral always
// carries the exact value, so color encodes only magnitude — one hue, no rainbow.
// (Replaced an earlier 5-color diverging scale that read as noise at grid scale.)
const PCT: Record<number, number> = { 1: 10, 2: 22, 3: 36, 4: 52, 5: 70 }

function bucket(score: number): number {
  return Math.max(1, Math.min(5, Math.round(score)))
}

/** Translucent accent fill, graded by score — heatmap cells + score chips. */
export function scoreFill(score: number): string {
  return `color-mix(in srgb, var(--accent) ${PCT[bucket(score)]}%, transparent)`
}

/** A slightly stronger accent edge in the same hue, for borders/active state. */
export function scoreBorder(score: number): string {
  return `color-mix(in srgb, var(--accent) ${Math.min(82, PCT[bucket(score)] + 18)}%, transparent)`
}

export const SCORE_WORD: Record<number, string> = {
  1: 'Very poor — avoid',
  2: 'Poor — significant friction',
  3: 'Good — noticeable overhead',
  4: 'Very good — minor adjustments',
  5: 'Excellent — purpose-built',
}
