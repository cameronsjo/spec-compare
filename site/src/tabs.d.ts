/**
 * Ambient typing for the Artificer tablist keyboard helper
 * (public/artificer/artificer-tabs.js, loaded as a plain <script defer>).
 * This app uses ONLY the pure `nextIndex` state machine — React owns selection
 * state and panel rendering, so we deliberately skip enhance()/observe() (they
 * toggle aria-controls panels via `hidden`, which fights React's conditional
 * rendering). `nextIndex` returns the index focus/selection should move to for a
 * key, or null when the key isn't a tab-navigation key (caller does nothing).
 */
interface ArtificerTabsApi {
  nextIndex(
    key: string,
    current: number,
    count: number,
    opts?: { orientation?: 'horizontal' | 'vertical' },
  ): number | null
}

interface Window {
  ArtificerTabs?: ArtificerTabsApi
}
