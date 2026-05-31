import { scoreFill, scoreBorder, SCORE_WORD } from './score'

/** A small colored chip showing a 1–5 score. Hue encodes fitness (red → green). */
export function ScorePip({ score, label }: { score: number; label?: string }) {
  const rounded = Math.max(1, Math.min(5, Math.round(score)))
  return (
    <span
      className="score-pip"
      style={{ background: scoreFill(score), borderColor: scoreBorder(score) }}
      title={label ?? SCORE_WORD[rounded]}
    >
      {Number.isInteger(score) ? score : score.toFixed(1)}
    </span>
  )
}
