/**
 * Ambient typing for the Artificer icon helper
 * (public/artificer/artificer-icons.js, loaded as a plain <script defer>).
 *
 * The script auto-hydrates `<i data-icon="name">` placeholders once on
 * DOMContentLoaded — a one-shot pass that misses any node React mounts after
 * first paint (the hamburger, the drawer). `observe()` re-hydrates and then
 * watches for inserted nodes; the app calls it once at mount so dynamic icons
 * aren't blank.
 */
interface ArtificerIconsApi {
  /** Hydrate `root` now and watch it for inserted icons. Returns a disconnect fn. */
  observe(root?: Element | null): () => void
  /** One-shot hydrate of `root` (no observer). */
  hydrate(root?: Element | null): void
}

interface Window {
  ArtificerIcons?: ArtificerIconsApi
}
