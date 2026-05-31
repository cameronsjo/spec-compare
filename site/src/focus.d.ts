/**
 * Ambient typing for the Artificer focus-trap helper
 * (public/artificer/artificer-focus.js, loaded as a plain <script defer>).
 * Only the surface this app uses is declared — `trap` for the mobile nav drawer,
 * which cycles Tab within the element, fires `onEscape` on Esc, and restores
 * focus to the previously-focused element on `release()`.
 */
interface ArtificerFocusApi {
  /** Trap focus inside `el`. Returns a handle whose `release()` untraps + restores focus. */
  trap(el: Element | null, opts?: { onEscape?: (e: KeyboardEvent) => void }): { release(): void }
}

interface Window {
  ArtificerFocus?: ArtificerFocusApi
}
