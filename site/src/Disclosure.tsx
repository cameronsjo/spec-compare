/**
 * Bias + affiliation sign-off (statements about a person), plus the no-affiliation
 * legal fine print. Pulled out of the footer so it reads as a deliberate disclosure,
 * not a wall of text down one edge. Pattern: agentic-harnesses/docs/disclaimer-footer-pattern.md.
 */
export function Disclosure() {
  return (
    <section className="disclosure stack stack--md">
      <h2 className="profile-name">Disclosure</h2>
      <p className="prose">
        Built with the{' '}
        <a className="repo-link" href="https://cameronsjo.github.io/artificer/" target="_blank" rel="noreferrer">
          <b className="anchor">Artificer design system</b>
        </a>
        , React + Vite. Written by — and with — a spec-driven-development practitioner who uses OpenSpec (which scores
        well here) and keeps a personal, unreleased rig of their own — cadence — filed down from Superpowers after it
        felt too rigid. So read the Superpowers assessment with that grain of salt; the scoring still aims to treat
        every tool on equal terms. Spot a bias or an error?{' '}
        <a className="repo-link" href="https://github.com/cameronsjo/spec-compare/issues" target="_blank" rel="noreferrer">
          Open an issue
        </a>
        .
      </p>
      <p className="footer-fine">
        No affiliation with, sponsorship by, or endorsement from any tool shown. Project names and marks belong to their
        respective owners.
      </p>
    </section>
  )
}
