import {
  useEffect,
  useState,
  type CSSProperties,
  type DOMAttributes,
  type PointerEvent as RPointerEvent,
  type FocusEvent as RFocusEvent,
  type MouseEvent as RMouseEvent,
} from 'react'
import { tools } from './data'
import { SCORE_DIMS, ASSESSED_AS_OF, type Scores } from './types'
import { scoreFill, scoreBorder, SCORE_WORD, bucket, formatScore } from './score'
import { ScorePip } from './ScorePip'

// Treatments of the same data, swappable live (the A/B):
//  numbers   — exact value in every grid cell (the default)
//  punchcard — a dot sized + boldened by score (the diagram)
//  map       — collapse the 8 dims into two computed axes and scatter every tool:
//              quick-change fitness (X) vs large-scale fitness (Y). The trade-off
//              the whole comparison is about, on one plane.
type Mode = 'numbers' | 'punchcard' | 'map'

const MODES: { key: Mode; label: string; help: string }[] = [
  { key: 'punchcard', label: 'Punchcard', help: 'Bigger, bolder dot = higher score.' },
  { key: 'numbers', label: 'Numbers', help: 'Exact 1–5 in every cell.' },
  { key: 'map', label: 'Map', help: 'Quick-change fitness (→) vs large-scale fitness (↑), every tool a point.' },
]

interface Active {
  tool: string
  dim: keyof Scores
  // Captured geometry of the cell/point, so the popover can anchor to it without a ref.
  rect: { top: number; left: number; width: number; height: number }
  pinned: boolean // true = opened by click/tap (sticky); false = transient hover/focus
}

/** Punchcard dot diameter: score 1 → 9px … score 5 → 28px. */
export const dotPx = (v: number) => 9 + ((bucket(v) - 1) / 4) * 19
/** Place the popover below the anchor when there isn't room above it. */
const place = (r: Active['rect']) => (r.top < 168 ? 'bottom' : 'top')

// The two computed axes for the Map. Each is a mean of three of the eight scored
// dimensions — no new data, just a projection of what's already there.
export const quickAxis = (s: Scores) => (s.trivial + s.emergency + s.solo) / 3
export const largeAxis = (s: Scores) => (s.large + s.parallel + s.medium) / 3

function popStyle(r: Active['rect']): CSSProperties {
  const cx = Math.max(150, Math.min(window.innerWidth - 150, r.left + r.width / 2))
  const y = place(r) === 'bottom' ? r.top + r.height + 8 : r.top - 8
  return { '--pop-x': `${cx}px`, '--pop-y': `${y}px` } as CSSProperties
}

// Map plot geometry (SVG user units). Axes fit the data range, not a fixed 1–5 —
// the numeric scale stays honest (real tick values) but empty bands are squeezed out.
export const PLOT = { w: 600, h: 420, l: 56, r: 20, t: 18, b: 50 }
// Integer-aligned domain bracketing the data, clamped to the valid 1–5 score range.
export const domain = (vals: number[]): [number, number] => [
  Math.max(1, Math.floor(Math.min(...vals) - 0.25)),
  Math.min(5, Math.ceil(Math.max(...vals) + 0.25)),
]
const XD = domain(tools.map((t) => quickAxis(t.scores)))
const YD = domain(tools.map((t) => largeAxis(t.scores)))
const ticksIn = ([lo, hi]: [number, number]) => Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)
// Normalized 0–1 position within a domain; centers (0.5) if the domain has zero span
// (every tool identical on this axis) so a degenerate domain can't yield NaN coords.
const frac = (v: number, [lo, hi]: [number, number]) => (hi > lo ? (v - lo) / (hi - lo) : 0.5)
const mapX = (q: number) => PLOT.l + frac(q, XD) * (PLOT.w - PLOT.l - PLOT.r)
const mapY = (l: number) => PLOT.h - PLOT.b - frac(l, YD) * (PLOT.h - PLOT.t - PLOT.b)

// Greedy label de-collision: place each label beside its dot (flipping to the left
// near the right wall so it never overflows), then nudge it down until it clears
// every label already placed. A leader line ties a moved label back to its dot.
// Sorted top-to-bottom so the upper label of a colliding pair keeps its spot.
export interface Laid {
  spec: (typeof tools)[number]
  x: number
  y: number
  lx: number
  ly: number
  anchor: 'start' | 'end'
  moved: boolean
}
export function layoutLabels(): Laid[] {
  const CHAR = 6 // ~px per char at the 10px mono label size
  const LH = 14 // line height for a downward nudge
  const placed: { x1: number; y1: number; x2: number; y2: number }[] = []
  const hit = (a: (typeof placed)[number], b: (typeof placed)[number]) =>
    a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2
  return [...tools]
    .map((spec) => ({ spec, x: mapX(quickAxis(spec.scores)), y: mapY(largeAxis(spec.scores)) }))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map(({ spec, x, y }) => {
      const w = spec.displayName.length * CHAR
      // Flip left when a right-placed label would cross the right edge.
      const left = x + 11 + w > PLOT.w - 2
      const lx = left ? x - 11 : x + 11
      const box = (yy: number) =>
        left
          ? { x1: lx - w, y1: yy - 7, x2: lx, y2: yy + 6 }
          : { x1: lx, y1: yy - 7, x2: lx + w, y2: yy + 6 }
      let ly = y
      let b = box(ly)
      for (let i = 0; i < 14 && placed.some((p) => hit(p, b)); i++) {
        ly += LH
        b = box(ly)
      }
      placed.push(b)
      return { spec, x, y, lx, ly, anchor: left ? ('end' as const) : ('start' as const), moved: Math.abs(ly - y) > 1 }
    })
}

// Computed once: layout closes only over module-static data (tools + axis domain),
// so there's nothing reactive to recompute on the Map's frequent hover re-renders.
const LAID = layoutLabels()

/**
 * Color-graded score grid (1–5 → single-hue intensity), with a swappable graphical
 * treatment and a mobile-friendly detail popover: hover/focus on desktop, tap on
 * touch (it pins, and a bottom-sheet variant takes over via CSS at narrow widths).
 */
export function ScoringHeatmap() {
  const [mode, setMode] = useState<Mode>('punchcard')
  const [active, setActive] = useState<Active | null>(null)

  const show = (tool: string, dim: keyof Scores, el: Element, pinned: boolean) => {
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
    // Desktop outside-click dismissal: the scrim only covers the bottom-sheet layout,
    // so a floating popover needs a capture listener that ignores clicks on a cell/point
    // or inside the popover itself (so pin-on-click and in-popover taps survive).
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest('.heat-pop, .heat-cell, .map-pt')) return
      close()
    }
    window.addEventListener('keydown', onKey)
    window.addEventListener('scroll', close, true)
    window.addEventListener('resize', close)
    window.addEventListener('pointerdown', onPointerDown, true)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('scroll', close, true)
      window.removeEventListener('resize', close)
      window.removeEventListener('pointerdown', onPointerDown, true)
    }
    // Key on presence, not identity: moving between cells keeps `active` non-null, so
    // the listeners bind once on open and unbind on close — not on every hover.
  }, [active != null])

  const activeTool = active ? tools.find((t) => t.tool === active.tool) : undefined
  const activeDim = active ? SCORE_DIMS.find((d) => d.key === active.dim) : undefined
  const activeScore = activeTool && active ? activeTool.scores[active.dim] : undefined

  // Shared point/cell handlers — pointer (mouse only for hover), focus, and click-to-pin.
  // Typed as DOMAttributes<Element> so the bag spreads onto both <button> and <g>.
  const cellHandlers = (tool: string, dim: keyof Scores): DOMAttributes<Element> => ({
    // A pinned popover is sticky until dismissed — transient hover/focus must not overwrite it.
    // (Leave/blur stay unguarded: clearHover already no-ops while pinned.)
    onPointerEnter: (e: RPointerEvent) =>
      e.pointerType === 'mouse' && !active?.pinned && show(tool, dim, e.currentTarget, false),
    onPointerLeave: (e: RPointerEvent) => e.pointerType === 'mouse' && clearHover(),
    onFocus: (e: RFocusEvent) => !active?.pinned && show(tool, dim, e.currentTarget, false),
    onBlur: clearHover,
    onClick: (e: RMouseEvent) =>
      active?.tool === tool && active?.dim === dim && active?.pinned
        ? setActive(null)
        : show(tool, dim, e.currentTarget, true),
  })

  return (
    <section className="heatmap-view stack stack--md">
      <div className="cluster matrix-controls">
        {MODES.map((m) => (
          <button
            key={m.key}
            type="button"
            className={`btn btn--ghost tab ${mode === m.key ? 'tab--active' : ''}`}
            aria-pressed={mode === m.key}
            // Clear any open popover first — its anchored score/label would otherwise carry
            // into the new mode (a cell popover relabeled as map content shows the wrong number).
            onClick={() => {
              setActive(null)
              setMode(m.key)
            }}
          >
            {m.label}
          </button>
        ))}
        <span className="matrix-legend">
          {MODES.find((m) => m.key === mode)!.help} Hover or tap for detail.
        </span>
      </div>

      {mode === 'map' ? (
        <ScatterMap active={active} handlers={cellHandlers} />
      ) : (
        <div className="table-scroll">
          <table className={`table table--sticky-head heatmap-table heatmap-table--${mode}`}>
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
                    return (
                      <td key={d.key} className={isOverall ? 'cell-overall' : undefined}>
                        <button
                          type="button"
                          className={`heat-cell ${on ? 'heat-cell--active' : ''}`}
                          style={{ background: asNumber ? scoreFill(v) : 'transparent', borderColor: on ? scoreBorder(v) : 'transparent' }}
                          aria-label={`${t.displayName} — ${d.label}: ${formatScore(v)} of 5`}
                          aria-pressed={on && active?.pinned ? true : undefined}
                          {...cellHandlers(t.tool, d.key)}
                        >
                          {asNumber ? (
                            <span className="heat-num">{formatScore(v)}</span>
                          ) : (
                            <span
                              className="heat-dot"
                              style={{ width: `${dotPx(v)}px`, height: `${dotPx(v)}px`, background: scoreBorder(v) }}
                            />
                          )}
                        </button>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {active && activeTool && activeDim && activeScore != null && (
        <>
          {/* Scrim catches outside taps to dismiss; CSS shows it only at bottom-sheet widths. */}
          <div className="heat-pop-scrim" onClick={() => setActive(null)} />
          <div
            className="heat-pop card"
            role="tooltip"
            aria-label={`${activeTool.displayName} — ${mode === 'map' ? 'map position' : activeDim.label}`}
            data-place={place(active.rect)}
            style={popStyle(active.rect)}
          >
            <div className="heat-pop-head">
              <ScorePip score={activeScore} />
              <b>{activeTool.displayName}</b>
              <span className="fg-secondary">· {mode === 'map' ? 'Overall' : activeDim.label}</span>
            </div>
            {mode === 'map' ? (
              <p className="heat-pop-body">
                Quick-change <b className="anchor">{quickAxis(activeTool.scores).toFixed(1)}</b> · large-scale{' '}
                <b className="anchor">{largeAxis(activeTool.scores).toFixed(1)}</b> — {activeTool.bestFor.toLowerCase()}.
              </p>
            ) : (
              <p className="heat-pop-body">
                <b className="anchor">{SCORE_WORD[bucket(activeScore)]}</b> — {activeDim.help}.
              </p>
            )}
            <p className="heat-pop-foot">
              Pinned to <b>{activeTool.version}</b> · assessed {ASSESSED_AS_OF}
            </p>
          </div>
        </>
      )}

      <p className="view-foot">
        {mode === 'map' ? (
          <>
            Axes are computed from the scores — <b>quick-change</b> = trivial + emergency + solo; <b>large-scale</b> =
            large + parallel + medium. Top-right = strong on both.
          </>
        ) : (
          <>
            <b className="anchor">5</b> = purpose-built · <b className="anchor">3</b> = noticeable overhead ·{' '}
            <b className="anchor">1</b> = avoid. <b>Context</b> = memory, context-window and multi-session handling.
          </>
        )}{' '}
        Scores assessed <b>{ASSESSED_AS_OF}</b> — a considered opinion, not a benchmark.
      </p>
    </section>
  )
}

/** The Map treatment: an x/y scatter of every tool on the two computed fitness axes. */
function ScatterMap({
  active,
  handlers,
}: {
  active: Active | null
  handlers: (tool: string, dim: keyof Scores) => DOMAttributes<Element>
}) {
  const midX = 3 >= XD[0] && 3 <= XD[1]
  const midY = 3 >= YD[0] && 3 <= YD[1]
  return (
    <div className="heat-map">
      {/* role="group" (not "img") keeps the focusable <g role="button"> points in the
          a11y tree — role="img" would make every descendant presentational. */}
      <svg viewBox={`0 0 ${PLOT.w} ${PLOT.h}`} role="group" aria-label="Tools mapped by quick-change vs large-scale fitness" className="heat-map-svg">
        {/* gridlines + tick labels (only the data-bracketing range) */}
        {ticksIn(XD).map((n) => (
          <g key={`gx${n}`}>
            <line className="map-grid" x1={mapX(n)} y1={mapY(YD[0])} x2={mapX(n)} y2={mapY(YD[1])} />
            <text className="map-tick" x={mapX(n)} y={mapY(YD[0]) + 16} textAnchor="middle">{n}</text>
          </g>
        ))}
        {ticksIn(YD).map((n) => (
          <g key={`gy${n}`}>
            <line className="map-grid" x1={mapX(XD[0])} y1={mapY(n)} x2={mapX(XD[1])} y2={mapY(n)} />
            <text className="map-tick" x={mapX(XD[0]) - 10} y={mapY(n) + 3} textAnchor="end">{n}</text>
          </g>
        ))}
        {/* midline split at 3 (quadrant divider), where it falls inside the range */}
        {midX && <line className="map-mid" x1={mapX(3)} y1={mapY(YD[0])} x2={mapX(3)} y2={mapY(YD[1])} />}
        {midY && <line className="map-mid" x1={mapX(XD[0])} y1={mapY(3)} x2={mapX(XD[1])} y2={mapY(3)} />}
        {/* axis titles */}
        <text className="map-axis" x={(mapX(XD[0]) + mapX(XD[1])) / 2} y={PLOT.h - 8} textAnchor="middle">
          Quick-change fitness →
        </text>
        <text className="map-axis" transform={`rotate(-90 14 ${(mapY(YD[0]) + mapY(YD[1])) / 2})`} x={14} y={(mapY(YD[0]) + mapY(YD[1])) / 2} textAnchor="middle">
          Large-scale fitness →
        </text>
        {/* points — labels are de-collided, with a leader line when one was nudged */}
        {LAID.map(({ spec: t, x, y, lx, ly, anchor, moved }) => {
          const on = active?.tool === t.tool
          return (
            <g
              key={t.tool}
              className={`map-pt ${on ? 'map-pt--on' : ''}`}
              tabIndex={0}
              role="button"
              aria-label={`${t.displayName}: quick-change ${quickAxis(t.scores).toFixed(1)}, large-scale ${largeAxis(t.scores).toFixed(1)}, overall ${formatScore(t.scores.overall)}`}
              {...handlers(t.tool, 'overall')}
            >
              {moved && <line className="map-leader" x1={x} y1={y} x2={lx} y2={ly - 3} />}
              <circle cx={x} cy={y} r={16} fill="transparent" />
              <circle
                className="map-dot"
                cx={x}
                cy={y}
                r={on ? 9 : 6.5}
                fill={scoreFill(t.scores.overall)}
                stroke={t.tier === 'core' ? 'var(--accent)' : 'var(--steel)'}
                strokeWidth={on ? 2.5 : 1.5}
              />
              <text className="map-label" x={lx} y={ly + 3} textAnchor={anchor}>{t.displayName}</text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
