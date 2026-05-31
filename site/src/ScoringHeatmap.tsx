import { useEffect, useState, type CSSProperties } from 'react'
import { tools } from './data'
import { SCORE_DIMS, ASSESSED_AS_OF, type Scores } from './types'
import { scoreFill, scoreBorder, SCORE_WORD } from './score'

// Three graphical treatments of the same 1–5 grid, swappable live (the A/B):
//  numbers   — exact value in every cell (the baseline)
//  wash      — pure intensity swatch, value moves into the popover (classic heatmap)
//  punchcard — a dot whose size + boldness encodes the score (the diagram)
type Mode = 'numbers' | 'wash' | 'punchcard'

const MODES: { key: Mode; label: string; help: string }[] = [
  { key: 'numbers', label: 'Numbers', help: 'Exact 1–5 in every cell.' },
  { key: 'wash', label: 'Color wash', help: 'Bolder accent = higher score.' },
  { key: 'punchcard', label: 'Punchcard', help: 'Bigger, bolder dot = higher score.' },
]

interface Active {
  tool: string
  dim: keyof Scores
  // Captured cell geometry, so the popover can anchor to it (desktop) without a ref.
  rect: { top: number; left: number; width: number; height: number }
  pinned: boolean // true = opened by click/tap (sticky); false = transient hover/focus
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(1))
const bucket = (v: number) => Math.max(1, Math.min(5, Math.round(v)))
/** Punchcard dot diameter: score 1 → 9px … score 5 → 28px. */
const dotPx = (v: number) => 9 + ((bucket(v) - 1) / 4) * 19
/** Place the popover below the cell when there isn't room above it. */
const place = (r: Active['rect']) => (r.top < 168 ? 'bottom' : 'top')

function popStyle(r: Active['rect']): CSSProperties {
  const cx = Math.max(150, Math.min(window.innerWidth - 150, r.left + r.width / 2))
  const y = place(r) === 'bottom' ? r.top + r.height + 8 : r.top - 8
  return { '--pop-x': `${cx}px`, '--pop-y': `${y}px` } as CSSProperties
}

/**
 * Color-graded score grid (1–5 → single-hue intensity), with a swappable graphical
 * treatment and a mobile-friendly detail popover: hover/focus on desktop, tap on
 * touch (it pins, and a bottom-sheet variant takes over via CSS at narrow widths).
 */
export function ScoringHeatmap() {
  const [mode, setMode] = useState<Mode>('numbers')
  const [active, setActive] = useState<Active | null>(null)

  const show = (tool: string, dim: keyof Scores, el: HTMLElement, pinned: boolean) => {
    const r = el.getBoundingClientRect()
    setActive({ tool, dim, rect: { top: r.top, left: r.left, width: r.width, height: r.height }, pinned })
  }
  const clearHover = () => setActive((a) => (a && !a.pinned ? null : a))

  // A pinned popover is anchored to a viewport rect, so it would drift on scroll/resize
  // and linger past intent — dismiss it on Escape, scroll, or resize.
  useEffect(() => {
    if (!active) return
    const close = () => setActive(null)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
    }
  }, [active])

  const activeTool = active ? tools.find((t) => t.tool === active.tool) : undefined
  const activeDim = active ? SCORE_DIMS.find((d) => d.key === active.dim) : undefined
  const activeScore = activeTool && active ? activeTool.scores[active.dim] : undefined

  return (
    <section className="heatmap-view stack stack--md">
      <div className="cluster matrix-controls">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`btn btn--ghost tab ${mode === m.key ? 'tab--active' : ''}`}
            aria-pressed={mode === m.key}
            onClick={() => setMode(m.key)}
          >
            {m.label}
          </button>
        ))}
        <span className="matrix-legend">
          {MODES.find((m) => m.key === mode)!.help} Hover or tap a cell for detail.
        </span>
      </div>

      <div className="table-scroll">
        <table className={`heatmap-table heatmap-table--${mode}`}>
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
                    <span className="row-tool-wrap">
                      <span className="row-tool">{t.displayName}</span>
                      <span className="row-version" title={`Assessment pinned to ${t.version}`}>{t.version}</span>
                    </span>
                  </span>
                </th>
                {SCORE_DIMS.map((d) => {
                  const v = t.scores[d.key]
                  const isOverall = d.key === 'overall'
                  // Overall is the at-a-glance summary — always a numeral, in every mode.
                  const asNumber = mode === 'numbers' || isOverall
                  const on = active?.tool === t.tool && active?.dim === d.key
                  const fill = asNumber || mode === 'wash' ? scoreFill(v) : 'transparent'
                  return (
                    <td key={d.key} className={isOverall ? 'cell-overall' : undefined}>
                      <button
                        type="button"
                        className={`heat-cell ${on ? 'heat-cell--active' : ''}`}
                        style={{ background: fill, borderColor: on ? scoreBorder(v) : 'transparent' }}
                        aria-label={`${t.displayName} — ${d.label}: ${fmt(v)} of 5`}
                        aria-pressed={on && active?.pinned ? true : undefined}
                        onPointerEnter={(e) => e.pointerType === 'mouse' && show(t.tool, d.key, e.currentTarget, false)}
                        onPointerLeave={(e) => e.pointerType === 'mouse' && clearHover()}
                        onFocus={(e) => show(t.tool, d.key, e.currentTarget, false)}
                        onBlur={clearHover}
                        onClick={(e) =>
                          on && active?.pinned ? setActive(null) : show(t.tool, d.key, e.currentTarget, true)
                        }
                      >
                        {asNumber ? (
                          <span className="heat-num">{fmt(v)}</span>
                        ) : mode === 'punchcard' ? (
                          <span
                            className="heat-dot"
                            style={{ width: `${dotPx(v)}px`, height: `${dotPx(v)}px`, background: scoreBorder(v) }}
                          />
                        ) : null}
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && activeTool && activeDim && activeScore != null && (
        <>
          {/* Scrim catches outside taps to dismiss; CSS shows it only at bottom-sheet widths. */}
          <div className="heat-pop-scrim" onClick={() => setActive(null)} />
          <div
            className="heat-pop card"
            role="dialog"
            aria-label={`${activeTool.displayName} — ${activeDim.label}`}
            data-place={place(active.rect)}
            style={popStyle(active.rect)}
          >
            <div className="heat-pop-head">
              <span
                className="score-pip"
                style={{ background: scoreFill(activeScore), borderColor: scoreBorder(activeScore) }}
              >
                {fmt(activeScore)}
              </span>
              <b>{activeTool.displayName}</b>
              <span className="fg-secondary">· {activeDim.label}</span>
            </div>
            <p className="heat-pop-body">
              <b className="anchor">{SCORE_WORD[Math.round(activeScore)]}</b> — {activeDim.help}.
            </p>
            <p className="heat-pop-foot">
              Pinned to <b>{activeTool.version}</b> · assessed {ASSESSED_AS_OF}
            </p>
          </div>
        </>
      )}

      <p className="view-foot">
        <b className="anchor">5</b> = purpose-built · <b className="anchor">3</b> = noticeable overhead ·{' '}
        <b className="anchor">1</b> = avoid. Scores assessed <b>{ASSESSED_AS_OF}</b> — a considered opinion, not a
        benchmark. <b>Context</b> = memory, context-window and multi-session handling.
      </p>
    </section>
  )
}
