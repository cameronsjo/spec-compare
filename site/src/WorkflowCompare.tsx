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

  // Filmstrip measurement, at every width. `active` tracks the card nearest the
  // strip's center and drives the dot pager. The strip's height follows the
  // tallest card in view (desktop) or the active card (below 800px, one card
  // per screen with CSS scroll-snap). All layout reads happen before any write,
  // and a write is skipped when the value is unchanged, so scrolling doesn't
  // force a reflow per frame.
  const gridRef = useRef<HTMLDivElement>(null)
  const [scroll, setScroll] = useState({ overflowing: false, active: 0 })
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    let lastVisible = ''
    let lastActive = ''
    const update = () => {
      const grid = el.getBoundingClientRect()
      const center = grid.left + el.clientWidth / 2
      let active = 0
      let best = Infinity
      let visibleHeight = 0
      Array.from(el.children).forEach((c, i) => {
        const card = c as HTMLElement
        const rect = card.getBoundingClientRect()
        const dist = Math.abs(rect.left + rect.width / 2 - center)
        if (dist < best) {
          best = dist
          active = i
        }
        // Tallest card with any part inside the strip's visible box.
        if (rect.right > grid.left && rect.left < grid.left + el.clientWidth) {
          visibleHeight = Math.max(visibleHeight, rect.height)
        }
      })
      // Desktop: the strip is as tall as the cards in view, not the tallest of
      // all eight, so the dot pager sits under what the reader sees.
      // border-box: the height includes the strip's bottom padding.
      const padBottom = parseFloat(getComputedStyle(el).paddingBottom) || 0
      const card = el.children[active] as HTMLElement | undefined
      const activeHeight = card ? `${card.getBoundingClientRect().height}px` : ''
      const overflowing = el.scrollWidth > el.clientWidth + 1
      const visible = `${visibleHeight + padBottom}px`
      if (visible !== lastVisible) {
        el.style.setProperty('--visible-cards-height-total', visible)
        lastVisible = visible
      }
      if (activeHeight && activeHeight !== lastActive) {
        el.style.setProperty('--active-card-height', activeHeight)
        lastActive = activeHeight
      }
      setScroll((previous) => previous.active === active && previous.overflowing === overflowing
        ? previous : { overflowing, active })
    }
    update()
    // Fonts, scenario captions, and viewport changes can resize a card without
    // a scroll event. The mobile strip must follow its visible card each time.
    const observer = new ResizeObserver(update)
    Array.from(el.children).forEach((card) => observer.observe(card))
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const scrollToCard = (i: number) => {
    const el = gridRef.current
    const card = el?.children[i] as HTMLElement | undefined
    if (!el || !card) return
    const grid = el.getBoundingClientRect()
    const rect = card.getBoundingClientRect()
    el.scrollTo({
      left: el.scrollLeft + rect.left - grid.left - (el.clientWidth - rect.width) / 2,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    })
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

      {/* A scroll region must be keyboard-reachable (axe scrollable-region-focusable);
          .scroll-x supplies the focus ring. */}
      <div
        className="compare-grid scroll-x"
        ref={gridRef}
        tabIndex={0}
        role="region"
        aria-label="Tool workflows for this scenario"
      >
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

      {/* Position indicator, shown whenever the strip overflows.
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
