import { useMemo, useState, type ReactNode } from 'react'
import { tools } from './data'
import type { ToolSpec } from './types'

type Tier = 'all' | 'core' | 'emerging'

// Numeric sort key for an agent-config flag, so these columns order the same way
// the boolean columns do (best → worst) instead of lexicographically. Missing
// agentConfig (emerging tools) sorts below everything as n/a.
function agentFlagSort(v: 'yes' | 'no' | 'removed' | undefined): number {
  return v === 'yes' ? 2 : v === 'removed' ? 1 : v === 'no' ? 0 : -1
}

// A boolean/enum capability cell. Artificer-toned glyphs (not emoji): a success
// check, a muted x, an attention tilde for partial. n/a renders a plain dash upstream.
function Flag({ value }: { value: boolean | 'limited' | 'yes' | 'no' | 'removed' }) {
  if (value === true || value === 'yes') return <span className="flag flag--yes" title="Yes" aria-label="yes">✓</span>
  if (value === 'limited') return <span className="flag flag--partial" title="Limited" aria-label="limited">~</span>
  if (value === 'removed') return <span className="flag flag--partial" title="Removed in v1.0" aria-label="removed">~</span>
  return <span className="flag flag--no" title="No" aria-label="no">✗</span>
}

interface Column {
  key: string
  label: string
  /** sortable value for a tool */
  value: (t: ToolSpec) => string | number
  /** cell renderer */
  cell: (t: ToolSpec) => ReactNode
}

const COLUMNS: Column[] = [
  { key: 'maturity', label: 'Maturity', value: (t) => t.maturity, cell: (t) => <span className="cell-text">{t.maturity}</span> },
  { key: 'license', label: 'License', value: (t) => t.license, cell: (t) => <span className="cell-text">{t.license}</span> },
  { key: 'complexity', label: 'Complexity', value: (t) => t.complexity, cell: (t) => <span className="cell-text">{t.complexity}</span> },
  { key: 'worktrees', label: 'Worktrees', value: (t) => Number(t.features.gitWorktrees), cell: (t) => <Flag value={t.features.gitWorktrees} /> },
  { key: 'multiAgent', label: 'Multi-agent', value: (t) => (t.features.multiAgent === true ? 2 : t.features.multiAgent === 'limited' ? 1 : 0), cell: (t) => <Flag value={t.features.multiAgent} /> },
  { key: 'parallel', label: 'Parallel', value: (t) => Number(t.features.parallel), cell: (t) => <Flag value={t.features.parallel} /> },
  { key: 'dashboard', label: 'Dashboard', value: (t) => t.features.dashboard, cell: (t) => <span className="cell-text">{t.features.dashboard}</span> },
  { key: 'mcp', label: 'MCP', value: (t) => Number(t.features.mcp), cell: (t) => <Flag value={t.features.mcp} /> },
  { key: 'ide', label: 'IDE', value: (t) => Number(t.features.ideIntegration), cell: (t) => <Flag value={t.features.ideIntegration} /> },
  { key: 'oss', label: 'Open source', value: (t) => Number(t.features.openSource), cell: (t) => <Flag value={t.features.openSource} /> },
  { key: 'agentsMd', label: 'AGENTS.md', value: (t) => agentFlagSort(t.agentConfig?.agentsMd), cell: (t) => (t.agentConfig ? <Flag value={t.agentConfig.agentsMd} /> : <span className="cell-dash">—</span>) },
  { key: 'claudeMd', label: 'CLAUDE.md', value: (t) => agentFlagSort(t.agentConfig?.claudeMd), cell: (t) => (t.agentConfig ? <Flag value={t.agentConfig.claudeMd} /> : <span className="cell-dash">—</span>) },
  { key: 'skillMd', label: 'SKILL.md', value: (t) => agentFlagSort(t.agentConfig?.skillMd), cell: (t) => (t.agentConfig ? <Flag value={t.agentConfig.skillMd} /> : <span className="cell-dash">—</span>) },
  { key: 'slash', label: 'Slash cmds', value: (t) => t.agentConfig?.slashCommands ?? -1, cell: (t) => <span className="cell-text">{t.agentConfig ? t.agentConfig.slashCommands : '—'}</span> },
]

/** Sortable + tier-filterable capability table, aggregated across every tool JSON. */
export function FeatureMatrix() {
  const [tier, setTier] = useState<Tier>('all')
  const [sortKey, setSortKey] = useState<string>('name')
  const [dir, setDir] = useState<1 | -1>(1)

  const rows = useMemo(() => {
    const filtered = tools.filter((t) => tier === 'all' || t.tier === tier)
    const col = COLUMNS.find((c) => c.key === sortKey)
    const valueOf = (t: ToolSpec) => (col ? col.value(t) : t.displayName)
    return [...filtered].sort((a, b) => {
      const av = valueOf(a)
      const bv = valueOf(b)
      if (av < bv) return -1 * dir
      if (av > bv) return 1 * dir
      return a.displayName.localeCompare(b.displayName)
    })
  }, [tier, sortKey, dir])

  const sortBy = (key: string) => {
    if (key === sortKey) setDir((d) => (d === 1 ? -1 : 1))
    else {
      setSortKey(key)
      setDir(1)
    }
  }
  const arrow = (key: string) => (key === sortKey ? (dir === 1 ? ' ▲' : ' ▼') : '')

  return (
    <section className="matrix-view stack stack--md">
      <div className="cluster matrix-controls">
        {(['all', 'core', 'emerging'] as Tier[]).map((t) => (
          <button
            key={t}
            type="button"
            className={`btn btn--ghost tab ${tier === t ? 'tab--active' : ''}`}
            aria-pressed={tier === t}
            onClick={() => setTier(t)}
          >
            {t === 'all' ? 'All tools' : t === 'core' ? 'Core' : 'Emerging'}
          </button>
        ))}
        <span className="matrix-legend">
          <span className="flag flag--yes">✓</span> yes · <span className="flag flag--partial">~</span> partial / removed ·{' '}
          <span className="flag flag--no">✗</span> no · <span className="cell-dash">—</span> n/a
        </span>
      </div>

      <div className="table-scroll matrix-scroll scroll-x scroll-x--fade" tabIndex={0}>
        <table className="table table--sticky-head table--sticky-col table--responsive matrix-table">
          <thead>
            <tr>
              <th scope="col" className="th-tool" aria-sort={sortKey === 'name' ? (dir === 1 ? 'ascending' : 'descending') : 'none'}>
                <button type="button" className="th-btn" onClick={() => sortBy('name')}>
                  Tool{arrow('name')}
                </button>
              </th>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col" aria-sort={sortKey === c.key ? (dir === 1 ? 'ascending' : 'descending') : 'none'}>
                  <button type="button" className="th-btn" onClick={() => sortBy(c.key)}>
                    {c.label}
                    {arrow(c.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.tool}>
                <th scope="row" className="th-tool">
                  <span className="th-tool-inner">
                    <span className={`tier-dot tier-dot--${t.tier}`} title={t.tier} />
                    <span className="row-tool">{t.displayName}</span>
                  </span>
                </th>
                {COLUMNS.map((c) => (
                  <td key={c.key} data-label={c.label}>{c.cell(t)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="view-foot">
        Cells are aggregated live from each tool's JSON — the single source of truth. Sort by any column; filter by tier.
      </p>
    </section>
  )
}
