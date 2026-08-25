import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { AppShell, AppShellContent, Appbar, NavDrawer, SideNav, SideNavFooter, ThemeToggle, type SideNavGroup } from '@cameronsjo/artificer/react'
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

// Matches --bp-tablet (800px), which the Appbar/SideNav chrome components key
// their own hamburger/drawer takeover off of internally.
const SIDENAV_STICKY_STYLE = { '--sidenav-sticky-top': 'calc(56px + var(--s-md))' } as CSSProperties

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

  // The between-surface spine: overview surfaces, then core tools, then emerging tools,
  // then about. SideNav owns the flat (desktop rail) / collapsible-sections (drawer)
  // rendering and, in `sections` mode, the whole open-state machine — this is only the
  // group/item DATA, shared by both SideNav instances below.
  const navGroups: SideNavGroup[] = [
    {
      key: 'overview',
      label: 'Overview',
      items: OVERVIEW.map((o) => ({ key: o.id, label: o.label, active: nav === o.id, onSelect: () => selectNav(o.id) })),
    },
    {
      key: 'core',
      label: 'Core tools',
      items: coreTools.map((t) => ({ key: t.tool, label: t.displayName, active: nav === t.tool, onSelect: () => selectNav(t.tool) })),
    },
    {
      key: 'emerging',
      label: 'Emerging tools',
      items: emergingTools.map((t) => ({ key: t.tool, label: t.displayName, active: nav === t.tool, onSelect: () => selectNav(t.tool) })),
    },
    {
      key: 'about',
      label: 'About',
      items: ABOUT.map((a) => ({ key: a.id, label: a.label, active: nav === a.id, onSelect: () => selectNav(a.id) })),
    },
  ]

  // The persistent whimsy: the wordmark breathes the ultrathink shimmer for three
  // hue-cycles on load, then drifts glacially. Appbar is a plain function component
  // (no forwardRef), so there's no ref prop to reach its rendered `.wordmark` span —
  // query it by selector, scoped to the app root, once after mount.
  const appRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = appRef.current?.querySelector<HTMLElement>('.appbar__brand .wordmark') ?? null
    const cancel = window.Whimsy?.run(el, { loops: 3, settle: 'glacial' })
    return () => cancel?.()
  }, [])

  // The icon script only hydrates `<i data-icon>` once on DOMContentLoaded, which
  // misses anything React mounts later (the hamburger, the drawer, sidenav rows).
  // observe() re-hydrates and watches for inserted nodes so those icons aren't blank.
  useEffect(() => window.ArtificerIcons?.observe(), [])

  // Same DOMContentLoaded miss as the icons above: Whimsy scans for
  // [data-whimsy-greeting] on load and never re-scans (its auto-init calls
  // greeting(), not observe()), so the footer — mounted later by React — is
  // always empty at scan time and the seasonal swap silently never happens.
  // One re-run after mount is enough; the footer is never unmounted.
  useEffect(() => {
    window.Whimsy?.greeting()
  }, [])

  return (
    <div className="app container container--lg surface-tool" ref={appRef}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Appbar
        brand="spec-driven development"
        brandHref="#main"
        brandWhimsy
        contained
        menu={{ controls: 'nav-drawer', open: navOpen, onClick: () => setNavOpen((open) => !open) }}
        actions={<ThemeToggle inline />}
      />

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

      <AppShell rail="210px" gap="var(--s-lg)">
        <SideNav groups={navGroups} sticky style={SIDENAV_STICKY_STYLE} />

        <AppShellContent id="main">
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
                <span className="badge badge--steel lang-badge">{spec.maturity}</span>
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
        </AppShellContent>
      </AppShell>

      <NavDrawer open={navOpen} onClose={() => setNavOpen(false)} id="nav-drawer">
        <SideNav groups={navGroups} sections footer={<SideNavFooter />} />
      </NavDrawer>

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
