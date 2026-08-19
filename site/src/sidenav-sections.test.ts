import { describe, it, expect } from 'vitest'
import { defaultSectionOpen, onViewportChange, onNavigationActivates, onUserToggle, type SectionOpenState } from './sidenav-sections'

describe('defaultSectionOpen', () => {
  it('desktop: open regardless of whether the section is active', () => {
    expect(defaultSectionOpen('desktop', false)).toBe(true)
    expect(defaultSectionOpen('desktop', true)).toBe(true)
  })

  it('mobile: collapsed except for the section holding the active view', () => {
    expect(defaultSectionOpen('mobile', false)).toBe(false)
    expect(defaultSectionOpen('mobile', true)).toBe(true)
  })
})

describe('onNavigationActivates', () => {
  it('force-opens the section a navigation change just made active', () => {
    const collapsed: SectionOpenState = { open: false, touched: false }
    expect(onNavigationActivates(collapsed)).toEqual({ open: true, touched: false })
  })

  it('does not mark the section touched — only an explicit user toggle does', () => {
    const state: SectionOpenState = { open: false, touched: false }
    expect(onNavigationActivates(state).touched).toBe(false)
  })
})

describe('onUserToggle', () => {
  it('sets open to the requested value and marks the section touched', () => {
    expect(onUserToggle(true)).toEqual({ open: true, touched: true })
    expect(onUserToggle(false)).toEqual({ open: false, touched: true })
  })
})

describe('onViewportChange — manual toggle stickiness', () => {
  it('re-derives the default for an untouched section', () => {
    const untouchedOpen: SectionOpenState = { open: true, touched: false }
    // Was open on desktop (default); resize to mobile while not the active view.
    expect(onViewportChange(untouchedOpen, 'mobile', false)).toEqual({ open: false, touched: false })
  })

  it('leaves a touched section exactly as the user last set it, on any viewport', () => {
    const userCollapsedTheActiveSection: SectionOpenState = { open: false, touched: true }
    expect(onViewportChange(userCollapsedTheActiveSection, 'mobile', true)).toBe(userCollapsedTheActiveSection)
    expect(onViewportChange(userCollapsedTheActiveSection, 'desktop', true)).toBe(userCollapsedTheActiveSection)

    const userOpenedAnInactiveSection: SectionOpenState = { open: true, touched: true }
    expect(onViewportChange(userOpenedAnInactiveSection, 'mobile', false)).toBe(userOpenedAnInactiveSection)
  })
})
