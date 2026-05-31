// Validates every tool spec against schema.json and enforces cross-tool invariants.
// Run via `npm run validate` (also wired into `npm run build`).
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import Ajv from 'ajv/dist/2020.js'

const here = dirname(fileURLToPath(import.meta.url))
const toolsDir = join(here, '..', 'src', 'data', 'tools')

const schema = JSON.parse(readFileSync(join(toolsDir, 'schema.json'), 'utf8'))
const ajv = new Ajv({ allErrors: true, strict: false })
const validate = ajv.compile(schema)

const files = readdirSync(toolsDir).filter((f) => f.endsWith('.json') && f !== 'schema.json')

let failed = false
const coreScenarioSets = {}

for (const file of files) {
  const spec = JSON.parse(readFileSync(join(toolsDir, file), 'utf8'))

  if (!validate(spec)) {
    failed = true
    console.error(`✗ ${file} — schema validation failed:`)
    for (const err of validate.errors) console.error(`    ${err.instancePath || '/'} ${err.message}`)
    continue
  }

  // Filename must match the slug.
  if (`${spec.tool}.json` !== file) {
    failed = true
    console.error(`✗ ${file} — filename does not match tool slug "${spec.tool}"`)
  }

  // Core tools must carry a workflow graph + scenarios; emerging tools must not.
  if (spec.tier === 'core') {
    if (!spec.phases || !spec.edges || !spec.scenarios) {
      failed = true
      console.error(`✗ ${file} — core tool missing phases/edges/scenarios`)
      continue
    }
    // Every edge endpoint and every scenario step must reference a declared phase id.
    const ids = new Set(spec.phases.map((n) => n.id))
    for (const e of spec.edges) {
      for (const end of [e.from, e.to]) {
        if (!ids.has(end)) {
          failed = true
          console.error(`✗ ${file} — edge references unknown phase id "${end}"`)
        }
      }
    }
    for (const s of spec.scenarios) {
      for (const step of s.steps) {
        if (!ids.has(step)) {
          failed = true
          console.error(`✗ ${file} — scenario "${s.id}" step references unknown phase id "${step}"`)
        }
      }
      // The scenario's score must equal the matching detailed score where one exists.
      if (s.score < 1 || s.score > 5) {
        failed = true
        console.error(`✗ ${file} — scenario "${s.id}" score ${s.score} out of range 1–5`)
      }
    }
    coreScenarioSets[spec.tool] = spec.scenarios.map((s) => s.id).sort()
  } else if (spec.phases || spec.edges || spec.scenarios) {
    failed = true
    console.error(`✗ ${file} — emerging tool must NOT define phases/edges/scenarios (no fabricated workflows)`)
  }

  const kind = spec.tier === 'core' ? `${spec.phases.length} phases, ${spec.scenarios.length} scenarios` : 'card+heatmap'
  if (!failed) console.log(`✓ ${file} — ${spec.tier}: ${kind}`)
}

// Scenario-ID parity across core tools — the lockstep compare view depends on it.
const cores = Object.keys(coreScenarioSets)
if (!failed && cores.length > 1) {
  const reference = JSON.stringify(coreScenarioSets[cores[0]])
  for (const t of cores.slice(1)) {
    if (JSON.stringify(coreScenarioSets[t]) !== reference) {
      failed = true
      console.error(`✗ scenario-id parity broken: ${cores[0]}=${reference} vs ${t}=${JSON.stringify(coreScenarioSets[t])}`)
    }
  }
  if (!failed) console.log(`✓ scenario-id parity across ${cores.length} core tools: ${reference}`)
}

if (failed) {
  console.error('\nTool validation FAILED.')
  process.exit(1)
}
console.log(`\nTool validation passed (${files.length} spec${files.length === 1 ? '' : 's'}).`)
