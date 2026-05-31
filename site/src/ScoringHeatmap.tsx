import { useState } from 'react'
import { tools } from './data'
import { SCORE_DIMS, type Scores } from './types'
import { scoreFill, scoreBorder, SCORE_WORD } from './score'

interface Selected {
  tool: string
  dim: keyof Scores
}

/** Color-graded score grid (1–5 → token intensity). Click a cell for the reasoning. */
export function ScoringHeatmap() {
  const [sel, setSel] = useState<Selected | null>(null)

  const selectedTool = sel ? tools.find((t) => t.tool === sel.tool) : undefined
  const selectedDim = sel ? SCORE_DIMS.find((d) => d.key === sel.dim) : undefined
  const selectedScore = selectedTool && sel ? selectedTool.scores[sel.dim] : undefined

  return (
    <section className="heatmap-view stack stack--md">
      <div className="table-scroll">
        <table className="heatmap-table">
          <thead>
            <tr>
              <th scope="col" className="th-tool">Tool</th>
              {SCORE_DIMS.map((d) => (
                <th key={d.key} scope="col" title={d.help}>
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr key={t.tool}>
                <th scope="row" className="th-tool">
                  <span className="th-tool-inner">
                    <span className={`tier-dot tier-dot--${t.tier}`} title={t.tier} />
                    <span className="row-tool">{t.displayName}</span>
                  </span>
                </th>
                {SCORE_DIMS.map((d) => {
                  const v = t.scores[d.key]
                  const isOverall = d.key === 'overall'
                  const active = sel?.tool === t.tool && sel?.dim === d.key
                  return (
                    <td key={d.key} className={isOverall ? 'cell-overall' : undefined}>
                      <button
                        type="button"
                        className={`heat-cell ${active ? 'heat-cell--active' : ''}`}
                        style={{ background: scoreFill(v), borderColor: active ? scoreBorder(v) : 'transparent' }}
                        aria-label={`${t.displayName} — ${d.label}: ${v}`}
                        aria-pressed={active}
                        onClick={() => setSel(active ? null : { tool: t.tool, dim: d.key })}
                      >
                        {Number.isInteger(v) ? v : v.toFixed(1)}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTool && selectedDim && selectedScore != null ? (
        <div className="card card--active heat-detail">
          <div className="heat-detail-head">
            <span className="score-pip" style={{ background: scoreFill(selectedScore), borderColor: scoreBorder(selectedScore) }}>
              {Number.isInteger(selectedScore) ? selectedScore : selectedScore.toFixed(1)}
            </span>
            <b>{selectedTool.displayName}</b>
            <span className="fg-secondary">· {selectedDim.label}</span>
          </div>
          <p className="heat-detail-body">
            <b className="anchor">{SCORE_WORD[Math.round(selectedScore)]}</b> — {selectedDim.help}.
          </p>
        </div>
      ) : (
        <p className="view-foot">
          <b className="anchor">5</b> = purpose-built · <b className="anchor">3</b> = noticeable overhead ·{' '}
          <b className="anchor">1</b> = avoid. Click any cell for detail. <b>Context</b> = memory, context-window and
          multi-session handling — GSD, Ralph Loop and Kilo Code score highest.
        </p>
      )}
    </section>
  )
}
