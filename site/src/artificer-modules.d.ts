/**
 * Ambient types for the vanilla Artificer modules loaded via plain `<script
 * defer>` tags in index.html (public/artificer/*.js, vendored by
 * scripts/revendor-artificer.sh) — theme.js binds the theme toggle,
 * icons.js hydrates `<i data-icon>`, tabs.js supplies the pure keyboard
 * state machine (controls.tsx), whimsy.js drives the wordmark shimmer +
 * seasonal footer greeting.
 *
 * These are TYPE-ONLY side-effect imports: `@cameronsjo/artificer/theme.js`
 * (etc.) resolves its `types` condition to the shipped `types/*.d.ts`, which
 * each declare `Window.Artificer*` / `Window.Whimsy` globally — this file
 * pulls that declaration in for tsc without bundling a second copy of the
 * module (the runtime stays the vendored script tags, never a JS import).
 */
import type {} from '@cameronsjo/artificer/theme.js'
import type {} from '@cameronsjo/artificer/icons.js'
import type {} from '@cameronsjo/artificer/tabs.js'
import type {} from '@cameronsjo/artificer/whimsy.js'
