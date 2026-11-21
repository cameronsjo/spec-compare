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
        , React + Vite. This is Stefano Borzi&apos;s fork of{' '}
        <a className="repo-link" href="https://github.com/cameronsjo/spec-compare" target="_blank" rel="noreferrer">
          spec-compare
        </a>{' '}
        by Cameron Sjo, who wrote the research and scoring for every tool except RPAC. Cameron uses OpenSpec (which
        scores well here) and keeps a personal, unreleased rig called cadence, filed down from Superpowers after it felt
        too rigid, so read the Superpowers assessment with that grain of salt. Stefano contributes to agent-toolkit and
        added the RPAC entry, so the same goes for RPAC. The scoring still aims to treat every tool on equal terms. Spot
        a bias or an error?{' '}
        <a className="repo-link" href="https://github.com/Helias/spec-compare/issues" target="_blank" rel="noreferrer">
          Open an issue
        </a>
        .
      </p>
      <p className="footer-fine">
        Hosting is GitHub Pages, which logs visitor IP addresses per{' '}
        <a
          className="repo-link"
          href="https://docs.github.com/site-policy/privacy-policies/github-general-privacy-statement"
          target="_blank"
          rel="noreferrer"
        >
          GitHub&apos;s privacy statement
        </a>
        .
      </p>
      <p className="footer-fine">
        No affiliation with, sponsorship by, or endorsement from any tool shown, except that the RPAC entry was added by
        an agent-toolkit contributor. Project names and marks belong to their respective owners.
      </p>
    </section>
  )
}
