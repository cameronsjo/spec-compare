import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { ASSESSED_AS_OF, SWEPT_AS_OF } from './types'

// The site and the README each state the last version sweep. Nothing else ties
// them together, so a sweep that bumps one and not the other would go unnoticed.
const here = dirname(fileURLToPath(import.meta.url))
const readme = readFileSync(join(here, '..', '..', 'README.md'), 'utf8')

describe('assessment and sweep dates', () => {
  it('matches README "Versions current as of" to SWEPT_AS_OF', () => {
    expect(readme).toContain(`Versions current as of ${SWEPT_AS_OF}`)
  })

  // ISO dates compare correctly as strings. An assessment cannot predate the sweep
  // it follows.
  it('keeps the latest assessment on or after the last sweep', () => {
    expect(ASSESSED_AS_OF >= SWEPT_AS_OF).toBe(true)
  })
})
