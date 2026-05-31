import { useEffect, useMemo, useRef, useState } from 'react'
import { coreTools, sharedScenarios } from './data'
import { SCENARIO_META } from './types'
import { Anchored } from './Anchored'
import { LoopGraph } from './LoopGraph'
import { edgeBetween, usePlayerTimer } from './player'
import { TabPicker, TransportBar } from './controls'
import { ScorePip } from './ScorePip'

interface Props {
  scenarioId: string
  onScenarioChange: (id: string) => void
}

/** The headline feature: every core tool runs the SAME scenario, stepped in lockstep. */
export function WorkflowCompare({ scenarioId, onScenarioChange }: Props) {
  const shimmerRef = useRef<HTMLSpanElement>(null)
  const wasPlaying = useRef(false)
  // Finish flourish: idle → in (spectrum shimmer) → desat (quick crossfade to
  // silver) → out (slow ~2.75s disappear) → idle.
  const [phase, setPhase] = useState<'idle' | 'in' | 'desat' | 'out'>('idle')

  // Per-tool resolved scenario for the current id.
  const columns = useMemo(
    () =>
      coreTools.map((spec) => ({
        spec,
        sc: spec.scenarios!.find((s) => s.id === scenarioId) ?? spec.scenarios![0],
      })),
    [scenarioId],
  )

  const maxSteps = useMemo(() => Math.max(1, ...columns.map((c) => c.sc.steps.length)), [columns])
  const player = usePlayerTimer(maxSteps, scenarioId)
  const { step, playing, atEnd } = player

  // One whimsical operation for the whole comparison: every tool has reached its
  // terminal. Latch wasPlaying while playing so we only fire on the play→end edge.
  useEffect(() => {
    if (playing) wasPlaying.current = true
  }, [playing])
  useEffect(() => {
    if (atEnd && wasPlaying.current) {
      wasPlaying.current = false
      setPhase('in')
    }
  }, [atEnd])

  // Spectrum shimmer, hold ~0.85s, then quickly desaturate toward silver.
  useEffect(() => {
    if (phase !== 'in') return
    window.Whimsy?.ignite(shimmerRef.current)
    const t = setTimeout(() => setPhase('desat'), 850)
    return () => clearTimeout(t)
  }, [phase])

  // Crossfade the shimmer out (revealing silver beneath), then start the long fade.
  useEffect(() => {
    if (phase !== 'desat') return
    const t = setTimeout(() => setPhase('out'), 360)
    return () => clearTimeout(t)
  }, [phase])

  // Silver caption dissolves over ~2.75s, then unmounts.
  useEffect(() => {
    if (phase !== 'out') return
    const t = setTimeout(() => setPhase('idle'), 2750)
    return () => clearTimeout(t)
  }, [phase])

  // Reset the flourish when the scenario changes mid-animation — including the
  // wasPlaying latch, so a manual Step to the end of the next scenario can't fire
  // a spurious completion shimmer.
  useEffect(() => {
    setPhase('idle')
    wasPlaying.current = false
  }, [scenarioId])

  const meta = SCENARIO_META[scenarioId]

  // Mobile carousel: below 800px the filmstrip becomes one full-bleed card per
  // screen (CSS scroll-snap). `active` tracks the card nearest the viewport center
  // and drives the dot pager. Width-agnostic, so it's harmless on the desktop grid.
  const gridRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState({ overflowing: false, active: 0 })
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const update = () => {
      const center = el.scrollLeft + el.clientWidth / 2
      let active = 0
      let best = Infinity
      Array.from(el.children).forEach((c, i) => {
        const card = c as HTMLElement
        const dist = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center)
        if (dist < best) {
          best = dist
          active = i
        }
      })
      setScroll({ overflowing: el.scrollWidth > el.clientWidth + 1, active })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const scrollToCard = (i: number) => {
    const el = gridRef.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' })
  }

  return (
    <section className="compare">
      <div className="compare-controls">
        <TabPicker
          ariaLabel="Scenario"
          items={sharedScenarios.map((s) => ({ id: s.id, label: s.title }))}
          active={scenarioId}
          onSelect={onScenarioChange}
        />
        <TransportBar player={player} playLabel="Play all" total={maxSteps} counterLabel="step" />
      </div>

      <p className="scenario-title">
        <Anchored text={meta?.title ?? scenarioId} />
        {phase !== 'idle' && (
          <span className={`turn-complete ${phase === 'out' ? 'turn-complete--out' : ''}`}>
            <span className="tc-plain">all done</span>
            {(phase === 'in' || phase === 'desat') && (
              <span
                ref={shimmerRef}
                className={`tc-shimmer whimsy ${phase === 'desat' ? 'tc-shimmer--hidden' : ''}`}
              >
                all done
              </span>
            )}
          </span>
        )}
      </p>
      {meta?.description && <p className="scenario-desc">{meta.description}</p>}

      <div className="compare-grid" ref={gridRef}>
        {columns.map(({ spec, sc }) => {
          // Each tool clamps the global step to its own path length, then holds at its terminal.
          const local = Math.min(step, sc.steps.length - 1)
          const activeNodeId = sc.steps[local]
          const activeEdge = edgeBetween(sc.steps[local - 1], sc.steps[local])
          const node = spec.phases!.find((n) => n.id === activeNodeId)
          const done = step >= sc.steps.length - 1
          return (
            <div key={spec.tool} className={`card compare-col ${done ? 'compare-col--done' : ''}`}>
              <header className="compare-col-head">
                <b>{spec.displayName}</b>
                <ScorePip score={sc.score} />
              </header>
              <div className="loop-style">{spec.tagline}</div>
              <LoopGraph spec={spec} activeNodeId={activeNodeId} activeEdge={activeEdge} />
              <div className="compare-caption">
                {node ? (
                  <>
                    <b>{node.label}</b>
                    {node.command && <code className="source-ref">{node.command}</code>}
                  </>
                ) : (
                  <span className="fg-secondary">—</span>
                )}
                <span className="path-len">
                  {sc.steps.length} step{sc.steps.length === 1 ? '' : 's'}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile carousel position indicator (CSS hides it on the desktop filmstrip).
          One dot per tool; tap to jump. */}
      {scroll.overflowing && (
        <div className="compare-dots" role="group" aria-label="Jump to tool">
          {columns.map(({ spec }, i) => (
            <button
              key={spec.tool}
              type="button"
              className={`compare-dot ${i === scroll.active ? 'compare-dot--active' : ''}`}
              aria-label={`Show ${spec.displayName}`}
              aria-current={i === scroll.active ? 'true' : undefined}
              onClick={() => scrollToCard(i)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
