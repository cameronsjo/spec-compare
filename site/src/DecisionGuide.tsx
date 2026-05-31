import { useState } from 'react'
import { toolBySlug } from './data'
import { ASSESSED_AS_OF } from './types'

// The decision tree from docs/use-case-scoring.md §Decision Matrix, verbatim in shape.
type Step =
  | { kind: 'question'; q: string; answers: { label: string; hint?: string; to: string }[] }
  | { kind: 'result'; tool: string; why: string }

const TREE: Record<string, Step> = {
  start: {
    kind: 'question',
    q: 'Is this a modification or a greenfield build?',
    answers: [
      { label: 'Modification', hint: 'Changing existing code', to: 'r-openspec' },
      { label: 'Greenfield', hint: 'Building 0 → 1', to: 'q2' },
    ],
  },
  q2: {
    kind: 'question',
    q: 'Is this a large or complex feature?',
    answers: [
      { label: 'No', hint: 'Small / medium scope', to: 'r-speckit' },
      { label: 'Yes', hint: 'Many components', to: 'q3' },
    ],
  },
  q3: {
    kind: 'question',
    q: 'Do you need parallel development?',
    answers: [
      { label: 'Yes', hint: 'Multiple teams / agents at once', to: 'r-kitty' },
      { label: 'No', hint: 'Single track', to: 'q4' },
    ],
  },
  q4: {
    kind: 'question',
    q: 'Is this enterprise-scale?',
    answers: [
      { label: 'Yes', hint: 'Org-wide, many stakeholders', to: 'r-bmad' },
      { label: 'No', hint: 'Team-scale', to: 'r-speckit' },
    ],
  },
  'r-openspec': { kind: 'result', tool: 'openspec', why: 'Purpose-built for modifications — lightweight delta format with an audit trail.' },
  'r-speckit': { kind: 'result', tool: 'spec-kit', why: 'Constitution-driven governance, purpose-built for greenfield 0 → 1.' },
  'r-kitty': { kind: 'result', tool: 'spec-kitty', why: 'The only tool with built-in worktree isolation + a kanban dashboard for parallel work.' },
  'r-bmad': { kind: 'result', tool: 'bmad-method', why: '21 specialized agents and 50+ workflows for enterprise-scale planning.' },
}

interface Choice {
  from: string
  label: string
  to: string
}

/**
 * Visible decision flowchart. Each answered question stays on screen as a node with
 * its fork shown — the chosen branch lit, the road-not-taken dimmed — connected down
 * to the next node, ending in a recommendation. Any earlier answer is re-selectable,
 * which truncates the path there and re-routes, so the whole logic stays explorable.
 */
export function DecisionGuide({ onSelectTool }: { onSelectTool: (slug: string) => void }) {
  const [choices, setChoices] = useState<Choice[]>([])

  // Walk the chosen path to derive the visited question nodes + the current node.
  const visited: string[] = []
  let id = 'start'
  for (const c of choices) {
    visited.push(id)
    id = c.to
  }
  const current = TREE[id]

  // Choosing on the node at `depth` truncates everything after it, then re-routes.
  const pick = (fromId: string, depth: number, label: string, to: string) =>
    setChoices((cs) => [...cs.slice(0, depth), { from: fromId, label, to }])
  const restart = () => setChoices([])

  return (
    <section className="decision stack stack--md">
      <p className="decision-lede">
        Walk the questions — your path lights up as you go. Change any earlier answer to re-route; the road not taken
        stays visible the whole way down.
      </p>

      <ol className="flow">
        {visited.map((vid, i) => {
          const node = TREE[vid]
          if (node.kind !== 'question') return null
          const chosen = choices[i]
          return (
            <li key={`${vid}-${i}`} className="flow-node flow-node--resolved">
              <div className="flow-q">{node.q}</div>
              <div className="flow-opts">
                {node.answers.map((a) => {
                  const isChosen = a.label === chosen.label
                  return (
                    <button
                      key={a.label}
                      type="button"
                      className={`flow-opt ${isChosen ? 'flow-opt--chosen' : 'flow-opt--dim'}`}
                      aria-pressed={isChosen}
                      onClick={() => pick(vid, i, a.label, a.to)}
                    >
                      <span className="flow-opt-label">{a.label}</span>
                      {a.hint && <span className="flow-opt-hint">{a.hint}</span>}
                    </button>
                  )
                })}
              </div>
              <FlowLink label={chosen.label} />
            </li>
          )
        })}

        {current.kind === 'question' ? (
          <li className="flow-node flow-node--active">
            <div className="flow-q">{current.q}</div>
            <div className="flow-opts">
              {current.answers.map((a) => (
                <button
                  key={a.label}
                  type="button"
                  className="flow-opt flow-opt--live"
                  onClick={() => pick(id, visited.length, a.label, a.to)}
                >
                  <span className="flow-opt-label">{a.label}</span>
                  {a.hint && <span className="flow-opt-hint">{a.hint}</span>}
                </button>
              ))}
            </div>
          </li>
        ) : (
          <li className="flow-node flow-node--result">
            <ResultNode slug={current.tool} why={current.why} onView={() => onSelectTool(current.tool)} />
          </li>
        )}
      </ol>

      {choices.length > 0 && (
        <button type="button" className="btn btn--ghost decision-restart" onClick={restart}>
          ↺ Start over
        </button>
      )}

      <p className="view-foot">
        A heuristic distilled from the research docs — recommendations are a considered opinion (Cameron + Claude),
        assessed <b>{ASSESSED_AS_OF}</b>, not a guarantee of fit.
      </p>
    </section>
  )
}

/** Labeled connector between flow nodes — the edge that makes the branch explicit. */
function FlowLink({ label }: { label: string }) {
  return (
    <div className="flow-link" aria-hidden="true">
      <span className="flow-link-arrow">↓</span>
      <span className="flow-link-label">{label}</span>
    </div>
  )
}

function ResultNode({ slug, why, onView }: { slug: string; why: string; onView: () => void }) {
  const spec = toolBySlug(slug)
  return (
    <div className="card card--active flow-result">
      <span className="flow-result-label">Recommended</span>
      <h2 className="flow-result-name">{spec?.displayName ?? slug}</h2>
      {spec?.version && <span className="flow-result-version">assessed at {spec.version}</span>}
      <p className="flow-result-why">{why}</p>
      <button type="button" className="btn" onClick={onView}>
        View {spec?.displayName ?? slug} →
      </button>
    </div>
  )
}
