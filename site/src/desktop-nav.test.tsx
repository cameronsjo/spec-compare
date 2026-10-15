// @vitest-environment jsdom
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { DesktopNav } from './DesktopNav'
import { App } from './App'
import { tools } from './data'

let host: HTMLDivElement
let root: Root

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })
  vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener() {}, removeEventListener() {} })))
  vi.stubGlobal('ResizeObserver', class { observe() {} unobserve() {} disconnect() {} })
  host = document.createElement('div')
  document.body.append(host)
  root = createRoot(host)
})

afterEach(() => {
  act(() => root.unmount())
  host.remove()
  vi.unstubAllGlobals()
})

function renderNav(active: string) {
  act(() => root.render(<DesktopNav style={{}} groups={[
    { key: 'overview', label: 'Overview', items: [{ key: 'compare', label: 'Compare', active: active === 'compare' }] },
    { key: 'core', label: 'Core tools', items: [{ key: 'core-tool', label: 'Core tool', active: active === 'core-tool' }] },
    { key: 'emerging', label: 'Emerging tools', items: [{ key: 'emerging-tool', label: 'Emerging tool', active: active === 'emerging-tool' }] },
  ]} />))
}

function sections() {
  return [...host.querySelectorAll('details')]
}

it('opens a previously closed group when navigation activates it after mount', () => {
  renderNav('core-tool')
  expect(sections().map(section => section.open)).toEqual([true, false])
  renderNav('emerging-tool')
  expect(sections().map(section => section.open)).toEqual([true, true])
  expect(host.querySelector('[aria-current="page"]')?.textContent).toBe('Emerging tool')
})

it('preserves a deliberate collapse until the group is activated by a new navigation', () => {
  renderNav('emerging-tool')
  const emerging = sections()[1]
  act(() => {
    emerging.open = false
    emerging.dispatchEvent(new Event('toggle'))
  })
  renderNav('emerging-tool')
  expect(emerging.open).toBe(false)
  renderNav('compare')
  expect(emerging.open).toBe(false)
  renderNav('emerging-tool')
  expect(emerging.open).toBe(true)
})

it('wires real App groups into one desktop navigation landmark with Overview outside disclosures', () => {
  act(() => root.render(<App />))
  const rail = host.querySelector('.desktop-nav')!
  expect(rail.tagName).toBe('NAV')
  expect(rail.getAttribute('aria-label')).toBe('Tools')
  expect(rail.querySelectorAll('nav')).toHaveLength(0)
  const overview = [...rail.querySelectorAll('button')].find(button => button.textContent === 'Compare workflows')!
  expect(overview).toBeDefined()
  expect(overview.closest('details')).toBeNull()
  expect([...rail.querySelectorAll('details')].every(section => !section.open)).toBe(true)
  const emerging = [...rail.querySelectorAll('details')].find(section => section.querySelector('summary')?.textContent === 'Emerging tools')!
  expect(emerging.querySelectorAll('button')).toHaveLength(tools.filter(tool => tool.tier === 'emerging').length)
})
