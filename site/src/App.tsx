import { useEffect, useRef, useState } from 'react'
import { tools, coreTools, toolBySlug } from './data'
import { KIND_COLOR, KIND_LABEL, ASSESSED_AS_OF, type PhaseKind } from './types'
import { WorkflowCompare } from './WorkflowCompare'
import { WorkflowPlayer } from './WorkflowPlayer'
import { FeatureMatrix } from './FeatureMatrix'
import { ScoringHeatmap } from './ScoringHeatmap'
import { ToolProfile } from './ToolProfile'
import { DecisionGuide } from './DecisionGuide'
import { About } from './About'
import { Disclosure } from './Disclosure'

// Overview surfaces, then per-tool profiles. nav holds an overview id, an about-view id, or a tool slug.
// Exported for the routing test (every view id classifies, none collides with a tool slug).
export const OVERVIEW = [
  { id: 'compare', label: 'Compare workflows' },
  { id: 'matrix', label: 'Feature matrix' },
  { id: 'heatmap', label: 'Scoring heatmap' },
  { id: 'decision', label: 'Decision guide' },
] as const

// Provenance + disclosure, split out of the old footer into their own sidenav views.
export const ABOUT = [
  { id: 'about', label: 'About' },
  { id: 'disclosure', label: 'Disclosure' },
] as const

// A nav id is a "view" (not a tool slug) when it names an overview surface or an about view.
export const isViewId = (id: string) => OVERVIEW.some((o) => o.id === id) || ABOUT.some((a) => a.id === id)

const emergingTools = tools.filter((t) => t.tier === 'emerging')

const KINDS: PhaseKind[] = ['govern', 'specify', 'design', 'tasks', 'implement', 'review', 'archive', 'decision']

export function App() {
  const [nav, setNav] = useState<string>('compare') // overview id, about-view id, OR tool slug
  const [scenarioId, setScenarioId] = useState('trivial-mod') // lifted — persists across switches
  const [navOpen, setNavOpen] = useState(false) // mobile drawer

  const spec = isViewId(nav) ? undefined : toolBySlug(nav)
  const showLegend = nav === 'compare' || (spec?.tier === 'core')

  const selectNav = (id: string) => {
    setNav(id)
    setNavOpen(false)
  }

  // The persistent whimsy: the wordmark breathes the ultrathink shimmer for three
  // hue-cycles on load, then drifts glacially. React mounts after DOMContentLoaded.
  const titleRef = useRef<HTMLAnchorElement>(null)
  useEffect(() => {
    const cancel = window.Whimsy?.run(titleRef.current, { loops: 3, settle: 'glacial' })
    return () => cancel?.()
  }, [])

  // The icon script only hydrates `<i data-icon>` once on DOMContentLoaded, which
  // misses anything React mounts later (the hamburger, the drawer). observe()
  // re-hydrates and watches for inserted nodes so those icons aren't blank.
  useEffect(() => window.ArtificerIcons?.observe(), [])

  // Same DOMContentLoaded miss as the icons above: Whimsy scans for
  // [data-whimsy-greeting] on load and never re-scans (its auto-init calls
  // greeting(), not observe()), so the footer — mounted later by React — is
  // always empty at scan time and the seasonal swap silently never happens.
  // One re-run after mount is enough; the footer is never unmounted.
  useEffect(() => {
    window.Whimsy?.greeting()
  }, [])

  // Mobile drawer focus management — inert when closed, focus-trapped when open.
  const drawerRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = drawerRef.current
    if (!el) return
    if (!navOpen) {
      el.setAttribute('inert', '')
      return
    }
    el.removeAttribute('inert')
    const handle = window.ArtificerFocus?.trap(el, { onEscape: () => setNavOpen(false) })
    return () => handle?.release()
  }, [navOpen])

  return (
    <div className="app container container--lg surface-tool" data-nav-open={navOpen ? '' : undefined}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="appbar">
        <button
          type="button"
          className="btn btn--ghost btn--icon appbar__menu-btn"
          aria-label="Open navigation"
          aria-expanded={navOpen}
          aria-controls="nav-drawer"
          onClick={() => setNavOpen(true)}
        >
          <i data-icon="menu" data-icon-size="32" />
        </button>
        {/* Native composition: `.wordmark` on the `.appbar__brand` flex container.
            v0.18 makes `.wordmark` inline-block (blockified as a flex item), so its
            ::after accent period stays an inline box rather than a detached flex
            item — the #81 workaround (separate inline span) is no longer needed. */}
        <a className="appbar__brand wordmark whimsy" href="#main" ref={titleRef}>
          spec-driven development
        </a>
        <span className="appbar__spacer" />
        <div className="appbar__actions">
          <button className="theme-toggle theme-toggle--inline" data-theme-toggle aria-label="Toggle theme" />
        </div>
      </header>

      <section className="intro stack stack--sm">
        <p className="lede t-body-lg">
          {tools.length} spec-driven-development tools, one <b className="anchor">workflow</b> apiece. See how each tool{' '}
          <b className="anchor">runs a change</b>, <b className="anchor">scores across use cases</b>, and{' '}
          <b className="anchor">stacks up feature-for-feature</b> — all{' '}
          <b className="anchor">extracted from deep research</b>.
        </p>
        <div className="masthead-meta cluster" aria-label="About this build">
          <span className="badge badge--ghost">{tools.length} tools</span>
          <span className="badge badge--ghost">{coreTools.length} full workflows</span>
          <span className="badge badge--ghost">7-dimension scoring</span>
          <span className="badge badge--ghost">assessed {ASSESSED_AS_OF}</span>
        </div>
      </section>

      <div className="app-shell">
        <aside className="app-sidenav">
          <ToolNav nav={nav} onSelect={selectNav} />
        </aside>

        <main id="main" className="stack stack--lg">
          {showLegend && <Legend />}

          {tools.length === 0 ? (
            <p className="empty">
              <b className="anchor">No tool specs found.</b> Add files under <code>src/data/tools/</code>.
            </p>
          ) : nav === 'compare' ? (
            <WorkflowCompare scenarioId={scenarioId} onScenarioChange={setScenarioId} />
          ) : nav === 'matrix' ? (
            <FeatureMatrix />
          ) : nav === 'heatmap' ? (
            <ScoringHeatmap />
          ) : nav === 'decision' ? (
            <DecisionGuide onSelectTool={selectNav} />
          ) : nav === 'about' ? (
            <About />
          ) : nav === 'disclosure' ? (
            <Disclosure />
          ) : !spec ? (
            <p className="empty">
              <b className="anchor">Tool not found.</b>
            </p>
          ) : spec.tier === 'core' ? (
            <>
              <div className="harness-meta">
                <span className="badge lang-badge">{spec.maturity}</span>
                <span className="loop-style">{spec.tagline}</span>
                {spec.repo && (
                  <a className="repo-link" href={spec.repo} target="_blank" rel="noreferrer">
                    {spec.repo.replace('https://github.com/', '')}
                  </a>
                )}
              </div>
              <WorkflowPlayer spec={spec} scenarioId={scenarioId} onScenarioChange={setScenarioId} />
            </>
          ) : (
            <ToolProfile spec={spec} />
          )}
        </main>
      </div>

      {/* Mobile drawer: scrim + off-canvas sidenav. data-nav-open on .app drives both. */}
      <div className="nav-scrim" onClick={() => setNavOpen(false)} />
      <aside id="nav-drawer" className="nav-drawer" aria-hidden={!navOpen} ref={drawerRef}>
        <ToolNav nav={nav} onSelect={selectNav} />
      </aside>

      {/* Three-zone colophon (Artificer .colophon / .colophon__spine, #97/#324): the
          links open the full About + Disclosure views (the old provenance/affiliation
          copy lives there now). No zone-1 label grid and no zone-3 fine print here —
          this site moved its disclosure prose into the Disclosure view on purpose. */}
      <footer className="colophon">
        <div className="container">
          <div className="colophon__spine">
            <b className="anchor">Independent &amp; unofficial</b>
            {/* Seasonal sign-off. The inline text IS the off-season line — Whimsy reads it
                as the fallback and swaps in "happy pride" (full latched rainbow) for June,
                so the markup still renders honestly with JS disabled. */}
            <span data-whimsy-greeting="" data-whimsy-greeting-class="whimsy--glacial">
              kindness is a choice.
            </span>
            <nav className="cluster">
              <button type="button" className="btn btn--link" onClick={() => selectNav('about')}>
                About
              </button>
              <button type="button" className="btn btn--link" onClick={() => selectNav('disclosure')}>
                Disclosure
              </button>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

/**
 * The between-surface spine: overview surfaces, then core tools, then emerging tools.
 * These switch app state rather than navigate, so they're <button>s — styles.css
 * carries a `.sidenav button` shim matching Artificer's `.sidenav a` grammar.
 */
function ToolNav({ nav, onSelect }: { nav: string; onSelect: (id: string) => void }) {
  return (
    <nav className="sidenav" aria-label="Views and tools">
      <div className="sidenav__group">Overview</div>
      {OVERVIEW.map((o) => (
        <button key={o.id} type="button" aria-current={nav === o.id ? 'page' : undefined} onClick={() => onSelect(o.id)}>
          <span className="label">{o.label}</span>
        </button>
      ))}

      <div className="sidenav__group">Core tools</div>
      {coreTools.map((t) => (
        <button key={t.tool} type="button" aria-current={nav === t.tool ? 'page' : undefined} onClick={() => onSelect(t.tool)}>
          <span className="label">{t.displayName}</span>
        </button>
      ))}

      <div className="sidenav__group">Emerging tools</div>
      {emergingTools.map((t) => (
        <button key={t.tool} type="button" aria-current={nav === t.tool ? 'page' : undefined} onClick={() => onSelect(t.tool)}>
          <span className="label">{t.displayName}</span>
        </button>
      ))}

      <div className="sidenav__group">About</div>
      {ABOUT.map((a) => (
        <button key={a.id} type="button" aria-current={nav === a.id ? 'page' : undefined} onClick={() => onSelect(a.id)}>
          <span className="label">{a.label}</span>
        </button>
      ))}
    </nav>
  )
}

function Legend() {
  return (
    <div className="legend cluster" aria-label="Phase kinds">
      {KINDS.map((k) => (
        <span key={k} className="legend-item">
          <span className="dot" style={{ background: KIND_COLOR[k] }} />
          <span className="t-label-sm">{KIND_LABEL[k]}</span>
        </span>
      ))}
    </div>
  )
}
