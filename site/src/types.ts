// When the scores, feature flags, and tool versions were last swept against the
// research docs. Single source of truth for the "pinned as of" stamp shown across
// the site; mirrors README's "Last Updated". Bump this whenever the docs are re-swept.
export const ASSESSED_AS_OF = '2026-07-23'

// Phase-kind vocabulary for spec-driven-development workflows. Fixed + colorable,
// so phases are comparable across tools the way agentic-harnesses compared node kinds.
export type PhaseKind =
  | 'govern' // constitution / principles
  | 'specify' // spec / requirements / draft
  | 'design' // plan / architecture / solutioning
  | 'tasks' // task breakdown
  | 'implement' // codegen / execution
  | 'review' // review / validation
  | 'archive' // persist / version specs
  | 'decision' // branch points

export interface Phase {
  id: string
  label: string
  kind: PhaseKind
  /** Slash command or CLI action that drives this phase, e.g. '/speckit.specify'. */
  command?: string
  note?: string
}

export interface Edge {
  from: string
  to: string
  on?: string
  label?: string
}

/** Per-use-case walkthrough: the node path, plus the documented score + reasoning. */
export interface Scenario {
  id: string
  steps: string[]
  /** 1–5 fitness score for this use case (from docs/use-case-scoring.md). */
  score: number
  note?: string
}

export type Maturity = 'Production' | 'Stable' | 'Active Dev' | 'Preview' | 'Beta'
export type Tier = 'core' | 'emerging'
export type Philosophy = 'constitution' | 'agent' | 'change' | 'context' | 'loop'
export type SpecMaturity = 'Spec-First' | 'Spec-Anchored' | 'Spec-as-Source'
export type Complexity = 'Low' | 'Medium' | 'High' | 'Very High'

/** Boolean capabilities (→ ✅/❌) and small enums (→ ⚠️ / text) for the feature matrix. */
export interface Features {
  gitWorktrees: boolean
  multiAgent: boolean | 'limited'
  dashboard: string // 'No' | 'CLI' | 'Kanban' | 'IDE' | 'Desktop'
  mcp: boolean
  ideIntegration: boolean
  openSource: boolean
  parallel: boolean
}

/** How the tool communicates with AI agents (docs/comparison.md §Agent Configuration). */
export interface AgentConfig {
  agentsMd: 'yes' | 'no' | 'removed'
  claudeMd: 'yes' | 'no' | 'removed'
  skillMd: 'yes' | 'no'
  slashCommands: number
}

/** Heatmap dimensions — numeric 1–5 (docs/use-case-scoring.md §Expanded Heatmap). */
export interface Scores {
  trivial: number
  medium: number
  large: number
  parallel: number
  emergency: number
  solo: number
  contextMgmt: number
  overall: number
}

export interface ToolSpec {
  tool: string
  displayName: string
  vendor: string
  repo?: string
  website?: string
  /** The release this assessment is pinned to (or an explicit non-version label). Required. */
  version: string
  license: string
  maturity: Maturity
  tier: Tier
  philosophy?: Philosophy
  specMaturity?: SpecMaturity
  tagline: string
  bestFor: string
  complexity: Complexity
  learningCurve: string
  features: Features
  agentConfig?: AgentConfig
  phases?: Phase[]
  edges?: Edge[]
  scenarios?: Scenario[]
  scores: Scores
  keyFeatures: string[]
  limitations: string[]
}

// Phase kind → Artificer semantic token. Categorical, restrained to the system palette.
export const KIND_COLOR: Record<PhaseKind, string> = {
  govern: 'var(--brand-purple)',
  specify: 'var(--accent)',
  design: 'var(--steel)',
  tasks: 'var(--attention)',
  implement: 'var(--success)',
  review: 'var(--accent-bright)',
  archive: 'var(--fg-disabled)',
  decision: 'var(--urgent)',
}

export const KIND_LABEL: Record<PhaseKind, string> = {
  govern: 'govern',
  specify: 'specify',
  design: 'design',
  tasks: 'tasks',
  implement: 'implement',
  review: 'review',
  archive: 'archive',
  decision: 'decision',
}

// Canonical scenario order + shared titles/descriptions. Each tool JSON carries only
// {id, steps, score, note}; the human-facing prose lives here once.
export const SCENARIO_ORDER = [
  'trivial-mod',
  'greenfield',
  'refactor',
  'bug-fix',
  'parallel-dev',
  'cross-cutting',
] as const

export const SCENARIO_META: Record<string, { title: string; description: string }> = {
  'trivial-mod': {
    title: 'Trivial modification',
    description: 'Change a primary button from blue to green — a one-line CSS change.',
  },
  greenfield: {
    title: 'Greenfield feature',
    description: 'Build a user-authentication system from scratch: login, signup, password reset.',
  },
  refactor: {
    title: 'Medium refactor',
    description: 'Refactor a component to composition instead of props drilling, across files.',
  },
  'bug-fix': {
    title: 'Production bug fix',
    description: "Form validation rejects emails containing a '+' character. Fix it fast.",
  },
  'parallel-dev': {
    title: 'Parallel development',
    description: 'Three teams building five features simultaneously without conflicts.',
  },
  'cross-cutting': {
    title: 'Cross-cutting change',
    description: 'Add a GDPR consent checkbox to all fifteen forms in the application.',
  },
}

// Heatmap columns, in order. `overall` is the rightmost summary column.
export const SCORE_DIMS: { key: keyof Scores; label: string; help: string }[] = [
  { key: 'trivial', label: 'Trivial', help: 'One-line / button-color changes' },
  { key: 'medium', label: 'Medium', help: 'Refactors and medium modifications' },
  { key: 'large', label: 'Large', help: 'Greenfield features, design systems' },
  { key: 'parallel', label: 'Parallel', help: 'Multi-team / multi-agent isolation' },
  { key: 'emergency', label: 'Emergency', help: 'Production-down hotfixes' },
  { key: 'solo', label: 'Solo', help: 'Solo developer, side projects' },
  { key: 'contextMgmt', label: 'Context', help: 'Memory, context-window, multi-session' },
  { key: 'overall', label: 'Overall', help: 'Weighted average across categories' },
]
