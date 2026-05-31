import type { Scenario, ToolSpec } from './types'
import { SCENARIO_ORDER, SCENARIO_META } from './types'

// Auto-discover every tool spec next to the schema. New tool files drop in without
// touching this module. schema.json has no `tool` field, so it's filtered out.
const modules = import.meta.glob<{ default: unknown }>('./data/tools/*.json', { eager: true })

export const tools: ToolSpec[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('schema.json'))
  .map(([, mod]) => mod.default as ToolSpec)
  .filter((t): t is ToolSpec => Boolean(t && (t as ToolSpec).tool))
  .sort((a, b) => a.displayName.localeCompare(b.displayName))

/** Core tools get full workflow treatment (graph + scenario player). */
export const coreTools = tools.filter((t) => t.tier === 'core')

export function toolBySlug(slug: string): ToolSpec | undefined {
  return tools.find((t) => t.tool === slug)
}

export function scenario(spec: ToolSpec, id: string): Scenario | undefined {
  return spec.scenarios?.find((s) => s.id === id)
}

// Scenario ids present in every core tool, in canonical order — the basis of the
// lockstep comparison view. Titles come from SCENARIO_META (single source).
export const sharedScenarios: { id: string; title: string; description: string }[] = SCENARIO_ORDER.filter(
  (id) => (coreTools.length > 0 ? coreTools.every((t) => t.scenarios?.some((sc) => sc.id === id)) : false),
).map((id) => ({ id, title: SCENARIO_META[id]?.title ?? id, description: SCENARIO_META[id]?.description ?? '' }))
