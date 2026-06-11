import { tools, coreTools } from './data'
import { ASSESSED_AS_OF } from './types'

/**
 * What the site is + how the numbers are derived. Absorbs the masthead badges and
 * the old footer's "Sourced" provenance paragraph — the bias/affiliation copy lives
 * separately in Disclosure.
 */
export function About() {
  return (
    <section className="about stack stack--md">
      <h2 className="profile-name">About this build</h2>
      <p className="lede t-body-lg">
        {tools.length} spec-driven-development tools, one <b className="anchor">workflow</b> apiece. Step the same
        change through every core tool in lockstep and watch where the loops diverge — then compare them{' '}
        <b className="anchor">feature-for-feature</b> and <b className="anchor">across use cases</b>.
      </p>
      <div className="masthead-meta cluster" aria-label="At a glance">
        <span className="badge badge--ghost">{tools.length} tools</span>
        <span className="badge badge--ghost">{coreTools.length} full workflows</span>
        <span className="badge badge--ghost">7-dimension scoring</span>
        <span className="badge badge--ghost">assessed {ASSESSED_AS_OF}</span>
      </div>

      <h3 className="profile-list-head">How the scores are derived</h3>
      <p className="prose">
        <b className="anchor">Independent &amp; unofficial.</b> Profiles, feature matrices and use-case scores are
        extracted from the spec-compare research docs — no fabricated attributes — pinned to each tool's version and
        assessed {ASSESSED_AS_OF}. They can be incomplete, simplified, or out of date, and may not match current
        behaviour.
      </p>
    </section>
  )
}
