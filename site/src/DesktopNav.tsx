import { useEffect, useState, type CSSProperties } from 'react'
import { SideNav, type SideNavGroup } from '@cameronsjo/artificer/react'

function NavSection({ group }: { group: SideNavGroup }) {
  const active = group.items.some(item => item.active)
  const [open, setOpen] = useState(active)
  useEffect(() => { if (active) setOpen(true) }, [active])
  return (
    <details className="sidenav__section" open={open} onToggle={e => setOpen(e.currentTarget.open)}>
      <summary>{group.label}</summary>
      <SideNav groups={[group]} aria-label={`${group.label}`} />
    </details>
  )
}

/** Overview stays visible; long tool lists are reachable through disclosures. */
export function DesktopNav({ groups, style }: { groups: SideNavGroup[]; style: CSSProperties }) {
  return (
    <div className="sidenav sidenav--sticky desktop-nav" style={style}>
      {groups.map(group => group.key === 'overview'
        ? <SideNav key={group.key} groups={[group]} aria-label="Overview" />
        : <NavSection key={group.key} group={group} />)}
    </div>
  )
}
