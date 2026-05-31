// Generates the mechanical comparison tables in docs/ from the tool JSONs —
// the same single source of truth the site's matrix/heatmap derive from, so the
// docs can never drift from the data again. Editorial tables (architectural
// philosophies, the worktree analysis) stay hand-maintained.
//
//   npm run gen:tables   # rewrite the GEN blocks in place
//   npm run gen:check     # exit 1 if any GEN block is stale (for CI / pre-commit)
//
// Each generated region is delimited in the markdown by:
//   <!-- GEN:<name> -->            (content)            <!-- /GEN:<name> -->
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const toolsDir = join(here, '..', 'src', 'data', 'tools')
const docsDir = join(here, '..', '..', 'docs')
const profilesDir = join(docsDir, 'tools')

const tools = readdirSync(toolsDir)
  .filter((f) => f.endsWith('.json') && f !== 'schema.json')
  .map((f) => JSON.parse(readFileSync(join(toolsDir, f), 'utf8')))
  .sort((a, b) => a.displayName.localeCompare(b.displayName))

// Which tools have a profile doc — resolved once, not per-render.
const profileSlugs = new Set(
  readdirSync(profilesDir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.slice(0, -'.md'.length)),
)

// — formatting helpers ————————————————————————————————————————————————
const bool = (v) => (v === true ? '✅' : v === 'limited' ? '⚠️' : '❌')
const yesNo = (v) => (v ? '**Yes**' : 'No')
const cfg = (v) => (v === 'yes' ? '✅' : v === 'removed' ? '⚠️ removed' : '❌')

// Link the tool name to its profile doc when one exists; plain text otherwise.
const name = (t) => (profileSlugs.has(t.tool) ? `[${t.displayName}](tools/${t.tool}.md)` : t.displayName)

const tierLabel = (t) => (t.tier === 'core' ? 'Core' : 'Emerging')
const maturity = (t) => `${t.maturity} (${t.version})`

// — table builders ————————————————————————————————————————————————————
function table(headers, rows) {
  const head = `| ${headers.join(' | ')} |`
  const sep = `|${headers.map(() => '---').join('|')}|`
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n')
  return [head, sep, body].join('\n')
}

const BLOCKS = {
  'quick-comparison': () =>
    table(
      ['Tool', 'Tier', 'License', 'Worktrees', 'Best For', 'Maturity (version)'],
      tools.map((t) => [name(t), tierLabel(t), t.license, yesNo(t.features.gitWorktrees), t.bestFor, maturity(t)]),
    ),

  'feature-matrix': () =>
    table(
      ['Tool', 'Worktrees', 'Multi-Agent', 'Parallel', 'Dashboard', 'MCP', 'IDE', 'Open Source', 'Complexity', 'Learning Curve', 'Spec Maturity'],
      tools.map((t) => [
        name(t),
        bool(t.features.gitWorktrees),
        bool(t.features.multiAgent),
        bool(t.features.parallel),
        t.features.dashboard,
        bool(t.features.mcp),
        bool(t.features.ideIntegration),
        bool(t.features.openSource),
        t.complexity,
        t.learningCurve,
        t.specMaturity ?? '—',
      ]),
    ),

  'agent-config': () =>
    table(
      ['Tool', 'AGENTS.md', 'CLAUDE.md', 'SKILL.md', 'Slash Commands'],
      tools
        .filter((t) => t.agentConfig)
        .map((t) => [
          name(t),
          cfg(t.agentConfig.agentsMd),
          cfg(t.agentConfig.claudeMd),
          t.agentConfig.skillMd === 'yes' ? '✅' : '❌',
          String(t.agentConfig.slashCommands),
        ]),
    ),
}

// — apply to files ————————————————————————————————————————————————————
// comparison.md owns all current GEN blocks; the map allows future fan-out.
const TARGETS = { 'comparison.md': ['quick-comparison', 'feature-matrix', 'agent-config'] }

// Escape a literal so it can be interpolated into a RegExp unchanged.
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const check = process.argv.includes('--check')
let stale = false

for (const [file, blocks] of Object.entries(TARGETS)) {
  const path = join(docsDir, file)
  if (!existsSync(path)) {
    // The site can be built from a checkout without the repo-root docs/ tree
    // (e.g. a deploy that only ships site/). Skip loudly rather than ENOENT.
    console.warn(`• ${file} not found at ${path} — skipping doc-table generation.`)
    continue
  }
  let text = readFileSync(path, 'utf8')
  for (const block of blocks) {
    const builder = BLOCKS[block]
    if (!builder) {
      console.error(`✗ ${file} — no generator for block "${block}" (TARGETS references a name missing from BLOCKS)`)
      stale = true
      continue
    }
    const open = `<!-- GEN:${block} -->`
    const close = `<!-- /GEN:${block} -->`
    const re = new RegExp(`${escapeRe(open)}[\\s\\S]*?${escapeRe(close)}`)
    if (!re.test(text)) {
      console.error(`✗ ${file} — missing sentinels for "${block}" (${open} … ${close})`)
      stale = true
      continue
    }
    const next = `${open}\n${builder()}\n${close}`
    if (text.includes(next)) continue
    if (check) {
      console.error(`✗ ${file} — GEN:${block} is stale (run \`npm run gen:tables\`)`)
      stale = true
    } else {
      text = text.replace(re, next)
    }
  }
  if (!check) writeFileSync(path, text)
}

if (check && stale) {
  console.error('\nDoc tables are stale or missing sentinels.')
  process.exit(1)
}
console.log(check ? '✓ Doc tables are up to date.' : `✓ Generated doc tables (${tools.length} tools).`)
