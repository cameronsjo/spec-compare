import { useEffect, useState, type CSSProperties } from 'react'
import { safeHref, type SideNavGroup } from '@cameronsjo/artificer/react'

function NavRows({ group }: { group: SideNavGroup }) {
  return group.items.map(item => {
    const content = <>
      {item.icon && <i data-icon={item.icon} aria-hidden="true" />}
      <span className="label">{item.label}</span>
      {item.count != null && <span className="count">{item.count}</span>}
    </>
    const href = safeHref(item.href)
    const current = item.active ? 'page' : undefined
    return href
      ? <a key={item.key} href={href} aria-current={current} onClick={item.onSelect}>{content}</a>
      : <button key={item.key} type="button" aria-current={current} onClick={item.onSelect}>{content}</button>
  })
}

function NavSection({ group }: { group: SideNavGroup }) {
  const active = group.items.some(item => item.active)
  const [open, setOpen] = useState(active)
  useEffect(() => { if (active) setOpen(true) }, [active])
  return (
    <details className="sidenav__section" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary>{group.label}</summary>
      <NavRows group={group} />
    </details>
  )
}

/**
 * Overview stays visible. Artificer 0.27's `SideNav sections` always defaults
 * desktop groups open and exposes no collapsed-default prop. Keep the small
 * state adapter here, with the native row grammar inside ONE nav landmark.
 * See docs/artificer-adaptations.md; never nest SideNav navs in these groups.
 */
export function DesktopNav({ groups, style }: { groups: SideNavGroup[]; style: CSSProperties }) {
  return (
    <nav className="sidenav sidenav--sticky desktop-nav" aria-label="Tools" style={style}>
      {groups.map(group => group.key === 'overview'
        ? <div key={group.key}>
            <div className="sidenav__group">{group.label}</div>
            <NavRows group={group} />
          </div>
        : <NavSection key={group.key} group={group} />)}
    </nav>
  )
}
