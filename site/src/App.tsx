import { useEffect, useRef, useState } from 'react'
import { tools, coreTools, toolBySlug } from './data'
import { KIND_COLOR, KIND_LABEL, ASSESSED_AS_OF, type PhaseKind } from './types'
import { WorkflowCompare } from './WorkflowCompare'
import { WorkflowPlayer } from './WorkflowPlayer'
import { FeatureMatrix } from './FeatureMatrix'
import { ScoringHeatmap } from './ScoringHeatmap'
import { ToolProfile } from './ToolProfile'
import { DecisionGuide } from './DecisionGuide'

// Overview surfaces, then per-tool profiles. nav holds either an overview id or a tool slug.
const OVERVIEW = [
  { id: 'compare', label: 'Compare workflows' },
  { id: 'matrix', label: 'Feature matrix' },
  { id: 'heatmap', label: 'Scoring heatmap' },
  { id: 'decision', label: 'Decision guide' },
] as const

const emergingTools = tools.filter((t) => t.tier === 'emerging')

const KINDS: PhaseKind[] = ['govern', 'specify', 'design', 'tasks', 'implement', 'review', 'archive', 'decision']

export function App() {
  const [nav, setNav] = useState<string>('compare') // overview id OR tool slug
  const [scenarioId, setScenarioId] = useState('trivial-mod') // lifted — persists across switches
  const [navOpen, setNavOpen] = useState(false) // mobile drawer

  const isOverview = OVERVIEW.some((o) => o.id === nav)
  const spec = isOverview ? undefined : toolBySlug(nav)
  const showLegend = nav === 'compare' || (spec?.tier === 'core')

  const selectNav = (id: string) => {
    setNav(id)
    setNavOpen(false)
  }

  // The persistent whimsy: the wordmark breathes the ultrathink shimmer for three
  // hue-cycles on load, then drifts glacially. React mounts after DOMContentLoaded.
  const titleRef = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const cancel = window.Whimsy?.run(titleRef.current, { loops: 3, settle: 'glacial' })
    return () => cancel?.()
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
          <i data-icon="menu" />
        </button>
        {/* `wordmark` lives on the inline text span, NOT the .appbar__brand flex
            container — its ::after accent period would otherwise become a flex item
            and the container `gap` would detach it ("word ." not "word."). See
            cameronsjo/artificer-design-system#81. */}
        <a className="appbar__brand" href="#main">
          <span className="wordmark whimsy" ref={titleRef}>
            spec-driven development
          </span>
        </a>
        <span className="appbar__spacer" />
        <div className="appbar__actions">
          <ThemeToggle />
        </div>
      </header>

      <section className="intro stack stack--sm">
        <p className="lede t-body-lg">
          Eleven spec-driven-development tools, one <b className="anchor">workflow</b> apiece. See how each tool{' '}
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
          ) : !spec ? (
            <p className="empty">
              <b className="anchor">Tool not found.</b>
            </p>
          ) : spec.tier === 'core' ? (
            <>
              <div className="harness-meta">
                <span className="lang-badge">{spec.maturity}</span>
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

      {/* Honest footer: provenance | disclosure side by side, full-width fine print
          below. Bias + affiliation lines are sign-off copy (statements about a
          person). Pattern: agentic-harnesses/docs/disclaimer-footer-pattern.md. */}
      <footer className="app-footer">
        <div className="footer-grid">
          <section className="footer-col">
            <span className="footer-label">Sourced</span>
            <p>
              <b className="anchor">Independent &amp; unofficial.</b> Profiles, feature matrices and use-case scores are
              extracted from the spec-compare research docs — no fabricated attributes — pinned to each tool's version
              and assessed {ASSESSED_AS_OF}. They can be incomplete, simplified, or out of date, and may not match
              current behaviour.
            </p>
          </section>
          <section className="footer-col">
            <span className="footer-label">Disclosure</span>
            <p>
              Built with the{' '}
              <a className="repo-link" href="https://cameronsjo.github.io/artificer/" target="_blank" rel="noreferrer">
                <b className="anchor">Artificer design system</b>
              </a>
              , React + Vite. Written by — and with — a
              spec-driven-development practitioner who uses OpenSpec (which scores well here) and keeps a personal,
              unreleased rig of their own — cadence — filed down from Superpowers after it felt too rigid. So read the
              Superpowers assessment with that grain of salt; the scoring still aims to treat every tool on equal terms.
              Spot a bias or an error?{' '}
              <a className="repo-link" href="https://github.com/cameronsjo/spec-compare/issues" target="_blank" rel="noreferrer">
                Open an issue
              </a>
              .
            </p>
          </section>
        </div>
        <p className="footer-fine">
          No affiliation with, sponsorship by, or endorsement from any tool shown. Project names and marks belong to
          their respective owners.
        </p>
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
    </nav>
  )
}

const THEME_KEY = 'artificer.theme'

function readTheme(): 'light' | 'dark' {
  const attr = document.documentElement.getAttribute('data-theme')
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/**
 * Owns the theme toggle in React. The vendored artificer-theme.js binds on
 * DOMContentLoaded — before this SPA mounts — so its click handler never attaches.
 * We drive the same `data-theme` attribute + `artificer.theme` key here.
 */
function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>(readTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // localStorage unavailable (private mode etc.) — theme still applies for the session.
    }
  }, [theme])

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label="Toggle light or dark theme"
      onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
    >
      <span className="dot" />
      <span>{theme === 'light' ? 'Light' : 'Dark'}</span>
    </button>
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
