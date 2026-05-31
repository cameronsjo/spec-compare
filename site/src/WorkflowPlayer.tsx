import { useEffect, useRef } from 'react'
import type { ToolSpec } from './types'
import { KIND_LABEL, SCENARIO_META } from './types'
import { scenario } from './data'
import { Anchored } from './Anchored'
import { LoopGraph } from './LoopGraph'
import { edgeBetween, usePlayerTimer } from './player'
import { TabPicker, TransportBar } from './controls'
import { ScorePip } from './ScorePip'
import { SCORE_WORD } from './score'

interface Props {
  spec: ToolSpec
  scenarioId: string
  onScenarioChange?: (id: string) => void
}

/** Single-tool player: scenario tabs + transport + the live phase / score inspector. */
export function WorkflowPlayer({ spec, scenarioId, onScenarioChange }: Props) {
  const scenarios = spec.scenarios ?? []
  const sc = scenario(spec, scenarioId) ?? scenarios[0]
  const player = usePlayerTimer(sc.steps.length, `${spec.tool}:${scenarioId}`)
  const { step, atEnd, playing } = player

  const captionRef = useRef<HTMLSpanElement>(null)
  const wasPlaying = useRef(false)

  const activeNodeId = sc.steps[step]
  const activeEdge = edgeBetween(sc.steps[step - 1], sc.steps[step])
  const node = spec.phases!.find((n) => n.id === activeNodeId)
  const meta = SCENARIO_META[sc.id]

  // The one whimsical operation: reaching the terminal phase IS the workflow completing.
  useEffect(() => {
    if (playing) wasPlaying.current = true
  }, [playing])
  useEffect(() => {
    if (atEnd && wasPlaying.current) {
      wasPlaying.current = false
      window.Whimsy?.celebrate(captionRef.current, 2200)
    }
  }, [atEnd])

  return (
    <div className="player">
      <TabPicker
        ariaLabel="Scenarios"
        items={scenarios.map((s) => ({ id: s.id, label: SCENARIO_META[s.id]?.title ?? s.id }))}
        active={scenarioId}
        onSelect={(id) => onScenarioChange?.(id)}
      />

      <p className="scenario-title">
        <Anchored text={meta?.title ?? sc.id} />
        <ScorePip score={sc.score} />
      </p>
      {meta?.description && <p className="scenario-desc">{meta.description}</p>}

      <div className="player-body">
        <div className="card graph-pane">
          <LoopGraph spec={spec} activeNodeId={activeNodeId} activeEdge={activeEdge} />
        </div>

        <aside className="inspector">
          <TransportBar player={player} playLabel="Play" />

          <div className="step-counter">
            step <b>{step + 1}</b> / {sc.steps.length}
            {atEnd && (
              <span className="turn-complete" ref={captionRef}>
                workflow complete
              </span>
            )}
          </div>

          {node && (
            <div className="card card--active node-card">
              <div className="node-card-head">
                <span className={`dot dot--${dotFor(node.kind)}`} />
                <b>{node.label}</b>
              </div>
              <div className="node-kind">{KIND_LABEL[node.kind]}</div>
              {node.command && <code className="source-ref">{node.command}</code>}
              {node.note && (
                <p className="node-note">
                  <Anchored text={node.note} />
                </p>
              )}
            </div>
          )}

          <div className="card score-card">
            <div className="score-card-head">
              <ScorePip score={sc.score} />
              <span className="score-word">{SCORE_WORD[Math.round(sc.score)]}</span>
            </div>
            {sc.note && (
              <p className="scenario-note">
                <Anchored text={sc.note} />
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

// Map phase kinds onto the Artificer status-dot variants that exist in the CSS.
function dotFor(kind: string): string {
  switch (kind) {
    case 'decision':
      return 'urgent'
    case 'tasks':
      return 'attention'
    case 'implement':
      return 'success'
    default:
      return 'accent'
  }
}
