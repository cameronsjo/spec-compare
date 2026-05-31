import { scoreFill, scoreBorder, SCORE_WORD, bucket, formatScore } from './score'

/** A small colored chip showing a 1–5 score. Hue encodes fitness (red → green). */
export function ScorePip({ score, label }: { score: number; label?: string }) {
  return (
    <span
      className="score-pip"
      style={{ background: scoreFill(score), borderColor: scoreBorder(score) }}
      title={label ?? SCORE_WORD[bucket(score)]}
    >
      {formatScore(score)}
    </span>
  )
}
