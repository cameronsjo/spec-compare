// Pure open-state decisions for the drawer's collapsible `.sidenav__section`s
// (App.tsx's ToolNav). Kept free of React/DOM so the rules are unit-testable
// without mounting a component or faking matchMedia.

export type Viewport = 'desktop' | 'mobile'

export interface SectionOpenState {
  open: boolean
  /** Set once the user explicitly toggles the section's <summary>. A touched
   * section's open state is never overwritten by a later viewport default
   * recompute — only another explicit toggle changes it from here on. */
  touched: boolean
}

/**
 * The default open state for a fresh read of the viewport: desktop opens
 * every section (the persistent sidenav has room), mobile opens only the
 * section holding the active view (a fresh drawer mount shouldn't dump a
 * wall of expanded rows).
 */
export function defaultSectionOpen(viewport: Viewport, isActive: boolean): boolean {
  return viewport === 'desktop' || isActive
}

/**
 * A viewport change (resize, rotation, breakpoint crossing) re-derives the
 * default — but only for a section the user hasn't manually toggled. A
 * manual toggle always outranks a later default recompute.
 */
export function onViewportChange(state: SectionOpenState, viewport: Viewport, isActive: boolean): SectionOpenState {
  if (state.touched) return state
  return { ...state, open: defaultSectionOpen(viewport, isActive) }
}

/**
 * `nav` transitioning into this section's active view force-opens it — a
 * collapsed section can't show `aria-current="page"`. This does NOT mark the
 * section touched (touched is reserved for an explicit user toggle) and the
 * caller is responsible for only invoking it on the false->true edge, not on
 * every render while already active — see the effect's `[isActive]`
 * dependency in App.tsx. That means a user who deliberately collapses the
 * section that's ALREADY active is never fought: isActive hasn't changed, so
 * this function is never called again for that section until nav leaves and
 * re-enters it.
 */
export function onNavigationActivates(state: SectionOpenState): SectionOpenState {
  return { ...state, open: true }
}

/** An explicit user click on the <summary> — always wins, and marks the
 * section touched so no later viewport recompute can override it. */
export function onUserToggle(nextOpen: boolean): SectionOpenState {
  return { open: nextOpen, touched: true }
}
