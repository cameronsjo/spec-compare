import type { ToolSpec } from './types'
import { SCORE_DIMS } from './types'
import { Anchored } from './Anchored'
import { ScorePip } from './ScorePip'

/** Per-tool profile: metadata badges, score row, key features, limitations, links. */
export function ToolProfile({ spec }: { spec: ToolSpec }) {
  const badges: { label: string; value?: string }[] = [
    { label: 'Maturity', value: spec.maturity },
    { label: 'License', value: spec.license },
    { label: 'Complexity', value: spec.complexity },
    { label: 'Learning', value: spec.learningCurve },
    { label: 'Philosophy', value: spec.philosophy },
    { label: 'Spec rigor', value: spec.specMaturity },
    { label: 'Version', value: spec.version },
  ]

  return (
    <section className="profile stack stack--md">
      <header className="profile-head">
        <div className="profile-title">
          <h2 className="profile-name">{spec.displayName}</h2>
          <span className={`badge tier-badge ${spec.tier === 'emerging' ? 'badge--steel' : 'tier-badge--core'}`}>{spec.tier}</span>
        </div>
        <p className="profile-tagline">{spec.tagline}</p>
        <div className="profile-meta cluster">
          <span className="vendor">{spec.vendor}</span>
          {spec.repo && (
            <a className="repo-link" href={spec.repo} target="_blank" rel="noreferrer">
              {spec.repo.replace('https://github.com/', 'github.com/')}
            </a>
          )}
          {spec.website && (
            <a className="repo-link" href={spec.website} target="_blank" rel="noreferrer">
              {spec.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
            </a>
          )}
        </div>
      </header>

      <div className="badge-grid">
        {badges
          .filter((b) => b.value)
          .map((b) => (
            <div key={b.label} className="stat badge-cell">
              <span className="badge-label">{b.label}</span>
              <span className="badge-value">{b.value}</span>
            </div>
          ))}
        <div className="stat badge-cell">
          <span className="badge-label">Best for</span>
          <span className="badge-value">{spec.bestFor}</span>
        </div>
      </div>

      <div className="card profile-scores">
        <div className="profile-scores-head">Use-case scores</div>
        <div className="score-row">
          {SCORE_DIMS.map((d) => (
            <div key={d.key} className="score-cell" title={d.help}>
              <ScorePip score={spec.scores[d.key]} />
              <span className="score-cell-label">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="profile-cols">
        <div className="card profile-list">
          <h3 className="profile-list-head">Key features</h3>
          <ul className="bullets">
            {spec.keyFeatures.map((f, i) => (
              <li key={i}>
                <Anchored text={f} />
              </li>
            ))}
          </ul>
        </div>
        <div className="card profile-list">
          <h3 className="profile-list-head">Limitations</h3>
          <ul className="bullets bullets--muted">
            {spec.limitations.map((l, i) => (
              <li key={i}>
                <Anchored text={l} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
