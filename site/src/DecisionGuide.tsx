import { useState } from 'react'
import { toolBySlug } from './data'

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

interface Crumb {
  q: string
  answer: string
}

/** Interactive flowchart: walk the decision matrix to a recommended tool. */
export function DecisionGuide({ onSelectTool }: { onSelectTool: (slug: string) => void }) {
  const [nodeId, setNodeId] = useState('start')
  const [path, setPath] = useState<Crumb[]>([])

  const node = TREE[nodeId]

  const choose = (q: string, label: string, to: string) => {
    setPath((p) => [...p, { q, answer: label }])
    setNodeId(to)
  }
  const restart = () => {
    setNodeId('start')
    setPath([])
  }

  return (
    <section className="decision stack stack--md">
      <p className="decision-lede">
        Answer a couple of questions and follow the documented decision matrix to a recommended tool.
      </p>

      {path.length > 0 && (
        <ol className="decision-crumbs">
          {path.map((c, i) => (
            <li key={i}>
              <span className="crumb-q">{c.q}</span>
              <span className="crumb-a">{c.answer}</span>
            </li>
          ))}
        </ol>
      )}

      {node.kind === 'question' ? (
        <div className="card decision-card">
          <h2 className="decision-q">{node.q}</h2>
          <div className="decision-answers">
            {node.answers.map((a) => (
              <button key={a.label} type="button" className="btn decision-answer" onClick={() => choose(node.q, a.label, a.to)}>
                <span className="answer-label">{a.label}</span>
                {a.hint && <span className="answer-hint">{a.hint}</span>}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <ResultCard slug={node.tool} why={node.why} onView={() => onSelectTool(node.tool)} onRestart={restart} />
      )}

      {node.kind === 'question' && path.length > 0 && (
        <button type="button" className="btn btn--ghost decision-restart" onClick={restart}>
          ↺ Start over
        </button>
      )}
    </section>
  )
}

function ResultCard({ slug, why, onView, onRestart }: { slug: string; why: string; onView: () => void; onRestart: () => void }) {
  const spec = toolBySlug(slug)
  return (
    <div className="card card--active decision-result">
      <span className="decision-result-label">Recommended</span>
      <h2 className="decision-result-name">{spec?.displayName ?? slug}</h2>
      <p className="decision-result-why">{why}</p>
      <div className="cluster">
        <button type="button" className="btn" onClick={onView}>
          View {spec?.displayName ?? slug} →
        </button>
        <button type="button" className="btn btn--ghost" onClick={onRestart}>
          ↺ Start over
        </button>
      </div>
    </div>
  )
}
