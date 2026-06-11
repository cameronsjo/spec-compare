import { useRef, type KeyboardEvent } from 'react'
import type { usePlayerTimer } from './player'

type Player = ReturnType<typeof usePlayerTimer>

interface TransportBarProps {
  player: Player
  /** Label for the play button when stopped (becomes "Pause"/"Replay" otherwise). */
  playLabel?: string
  /** When both are set, render an inline step counter (e.g. "line 3 / 12"). */
  total?: number
  counterLabel?: string
}

/**
 * The Reset / Play·Pause·Replay / Step transport, shared by every step-through view.
 * Reads its state from a `usePlayerTimer` return so the disabled logic and a11y
 * structure live in one place. The optional inline counter covers the views that
 * want it next to the buttons; LoopPlayer omits it and renders its own below.
 */
export function TransportBar({ player, playLabel = 'Play', total, counterLabel }: TransportBarProps) {
  const { step, playing, atEnd, toggle, stepForward, reset } = player
  return (
    <div className="transport cluster">
      <button type="button" className="btn btn--secondary" onClick={reset} disabled={step === 0 && !playing}>
        Reset
      </button>
      <button type="button" className="btn" onClick={toggle}>
        {playing ? 'Pause' : atEnd ? 'Replay' : playLabel}
      </button>
      <button type="button" className="btn btn--secondary" onClick={stepForward} disabled={atEnd}>
        Step ›
      </button>
      {total != null && counterLabel && (
        <span className="step-counter">
          {counterLabel} <b>{step + 1}</b> / {total}
        </span>
      )}
    </div>
  )
}

interface TabItem {
  id: string
  label: string
}

interface TabPickerProps {
  items: TabItem[]
  active: string
  onSelect: (id: string) => void
  ariaLabel: string
  /** Extra class layered on the `.tabs` primitive (rarely needed). */
  className?: string
}

/**
 * View-switching tabs (the scenario pickers) on the Artificer `.tabs` primitive
 * with WAI-ARIA tablist semantics. React owns selection state and renders the
 * panel below, so the roving-tabindex math is the only thing delegated — to
 * `ArtificerTabs.nextIndex` (the module exists to kill that boilerplate). We
 * deliberately do NOT call enhance()/observe(): those toggle aria-controls
 * panels via `hidden`, which fights React's conditional rendering. Arrow keys +
 * Home/End move selection (automatic activation); `onSelect` drives the view.
 *
 * Filter/mode toggles (matrix tier filter, heatmap mode) are NOT tabs — they
 * stay `aria-pressed` button groups on the `.tab` pill styling.
 */
export function TabPicker({ items, active, onSelect, ariaLabel, className = '' }: TabPickerProps) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const activeIndex = items.findIndex((it) => it.id === active)
  // Exactly one tab must be focusable even if `active` matches no item.
  const rovingIndex = activeIndex < 0 ? 0 : activeIndex

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const target = window.ArtificerTabs?.nextIndex(e.key, rovingIndex, items.length, {
      orientation: 'horizontal',
    })
    if (target == null) return
    e.preventDefault()
    onSelect(items[target].id)
    tabRefs.current[target]?.focus()
  }

  return (
    <div className={`tabs ${className}`.trim()} role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
      {items.map((it, i) => (
        <button
          key={it.id}
          ref={(el) => {
            tabRefs.current[i] = el
          }}
          type="button"
          role="tab"
          aria-selected={it.id === active}
          tabIndex={i === rovingIndex ? 0 : -1}
          onClick={() => onSelect(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}
