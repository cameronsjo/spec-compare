import { expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { DesktopNav } from './DesktopNav'

it('keeps Overview visible, collapses inactive tools, and opens the active tool group', () => {
  const html = renderToStaticMarkup(<DesktopNav style={{}} groups={[
    { key: 'overview', label: 'Overview', items: [{ key: 'compare', label: 'Compare' }] },
    { key: 'core', label: 'Core tools', items: [{ key: 'core-tool', label: 'Core tool' }] },
    { key: 'emerging', label: 'Emerging tools', items: [{ key: 'emerging-tool', label: 'Emerging tool', active: true }] },
  ]} />)
  expect(html).toContain('aria-label="Overview"')
  expect(html).toMatch(/<details class="sidenav__section"><summary>Core tools<\/summary>/)
  expect(html).toMatch(/<details class="sidenav__section" open=""><summary>Emerging tools<\/summary>/)
  expect(html).toContain('aria-current="page"')
})
