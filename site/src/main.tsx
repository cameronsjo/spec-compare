import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Artificer design system, consumed from the published package (no longer vendored).
// CSS first so app overrides win; the relative url('assets/fonts/…') in artificer.css
// resolves from node_modules and Vite emits the woff2 into dist/assets.
import '@cameronsjo/artificer/artificer.css'
import '@cameronsjo/artificer/whimsy.css'
import '@cameronsjo/artificer/print.css' // self-gated in @media print; safe to import plainly
// Window-global IIFEs — bare imports run the side effect, attaching the helpers
// before createRoot so App's effects (Whimsy.run, ArtificerIcons.observe,
// ArtificerFocus.trap) find them. theme.js is NOT imported: App owns the toggle in
// React and index.html's inline bootstrap owns pre-paint.
import '@cameronsjo/artificer/focus.js' // window.ArtificerFocus
import '@cameronsjo/artificer/icons.js' // window.ArtificerIcons
import '@cameronsjo/artificer/whimsy.js' // window.Whimsy
import { App } from './App'
import './styles.css' // app overrides — MUST stay last so the cascade lands on top of Artificer

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
