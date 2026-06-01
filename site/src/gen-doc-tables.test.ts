import { execFileSync } from 'node:child_process'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

// Black-box coverage for scripts/gen-doc-tables.mjs — the doc-table generator that
// keeps comparison.md in sync with the tool JSONs. The script is a side-effecting CLI
// (top-level reads + writes comparison.md, process.exit in --check mode) with no
// exports, so it is exercised via subprocess + by asserting the committed doc against
// the JSON data. See the testability note in the polish report for the importability gap.

const here = dirname(fileURLToPath(import.meta.url))
const scriptPath = join(here, '..', 'scripts', 'gen-doc-tables.mjs')
const toolsDir = join(here, 'data', 'tools')
const comparisonPath = join(here, '..', '..', 'docs', 'comparison.md')

const loadTools = () =>
  readdirSync(toolsDir)
    .filter((f: string) => f.endsWith('.json') && f !== 'schema.json')
    .map((f: string) => JSON.parse(readFileSync(join(toolsDir, f), 'utf8')))

/** Return the text between a GEN block's sentinels, or null if the block is absent. */
const genBlock = (doc: string, name: string): string | null => {
  const m = doc.match(new RegExp(`<!-- GEN:${name} -->([\\s\\S]*?)<!-- /GEN:${name} -->`))
  return m ? m[1] : null
}

const BLOCK_NAMES = ['quick-comparison', 'feature-matrix', 'agent-config'] as const

describe('gen-doc-tables: drift guard (subprocess)', () => {
  it('--check exits 0 when the committed tables match the JSON data', () => {
    // Throws (non-zero exit) if any GEN block is stale or a sentinel is missing —
    // the same guarantee the build relies on via `npm run gen:check`.
    const out = execFileSync(process.execPath, [scriptPath, '--check'], { encoding: 'utf8' })
    expect(out).toContain('up to date')
  })
})

describe('gen-doc-tables: committed doc reflects the data', () => {
  const doc = readFileSync(comparisonPath, 'utf8')
  const tools = loadTools()

  it('declares all three GEN blocks with balanced sentinels', () => {
    for (const name of BLOCK_NAMES) {
      expect(genBlock(doc, name), `block ${name}`).not.toBeNull()
    }
  })

  it('lists every tool in the quick-comparison block', () => {
    const block = genBlock(doc, 'quick-comparison') ?? ''
    for (const t of tools) {
      expect(block, `${t.tool} missing from quick-comparison`).toContain(t.displayName)
    }
  })

  it('lists exactly the agentConfig-bearing tools in the agent-config block', () => {
    const block = genBlock(doc, 'agent-config') ?? ''
    for (const t of tools) {
      const present = block.includes(t.displayName)
      expect(present, `${t.tool} agent-config presence`).toBe(Boolean(t.agentConfig))
    }
  })
})
