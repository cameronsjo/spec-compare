/**
 * Ambient typing for the Artificer Whimsy helper (public/artificer/artificer-whimsy.js,
 * loaded as a plain <script defer>). Only the surface this app uses is declared —
 * `run` for the persistent title shimmer and `celebrate` for the one-shot
 * "turn complete" moment. `ignite`/`clear` round out the manual toggle.
 */
interface WhimsyApi {
  /** Ignite `el`, then settle after `loops` hue-cycles. For long "thinking" states. */
  run(el: Element | null, opts?: { loops?: number; settle?: 'static' | 'glacial' }): () => void
  /** One-shot: light `el` for `ms` (default 2600) then clear. For whimsical operations. */
  celebrate(el: Element | null, ms?: number): void
  /** Manually add the flowing-gradient state. */
  ignite(el: Element | null): void
  /** Manually remove the flowing-gradient state. */
  clear(el: Element | null): void
}

interface Window {
  Whimsy?: WhimsyApi
}
