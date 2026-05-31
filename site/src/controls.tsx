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
      <button className="btn btn--secondary" onClick={reset} disabled={step === 0 && !playing}>
        Reset
      </button>
      <button className="btn" onClick={toggle}>
        {playing ? 'Pause' : atEnd ? 'Replay' : playLabel}
      </button>
      <button className="btn btn--secondary" onClick={stepForward} disabled={atEnd}>
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
  /** Wrapper class — defaults to the scenario-tab styling; pass e.g. "wire-mode" to vary it. */
  className?: string
}

/** A row of pill tabs (harness / scenario / mode pickers) with shared a11y wiring. */
export function TabPicker({ items, active, onSelect, ariaLabel, className = 'scenario-tabs' }: TabPickerProps) {
  return (
    <div className={`${className} cluster`} role="group" aria-label={ariaLabel}>
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          aria-pressed={it.id === active}
          className={`btn btn--ghost tab ${it.id === active ? 'tab--active' : ''}`}
          onClick={() => onSelect(it.id)}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}
