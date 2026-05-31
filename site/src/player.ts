import { useEffect, useState } from 'react'
import type { ActiveEdge } from './LoopGraph'

export const STEP_MS = 950

/** The active edge for a step transition, if both endpoints are known. */
export function edgeBetween(fromId?: string, toId?: string): ActiveEdge | null {
  return fromId && toId ? { from: fromId, to: toId } : null
}

/**
 * Shared transport for the step-through views. Owns the step index + play state and
 * the setTimeout-driven advance (with cleanup). Resets to the start whenever
 * `resetKey` changes — pass the scenario/harness identity so switching resets cleanly.
 */
export function usePlayerTimer(length: number, resetKey?: unknown) {
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    setStep(0)
    setPlaying(false)
  }, [resetKey])

  const atEnd = step >= length - 1

  useEffect(() => {
    if (!playing) return
    if (atEnd) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setStep((s) => s + 1), STEP_MS)
    return () => clearTimeout(t)
  }, [playing, step, atEnd, length])

  const toggle = () => (atEnd ? (setStep(0), setPlaying(true)) : setPlaying((p) => !p))
  const stepForward = () => setStep((s) => Math.min(s + 1, length - 1))
  const reset = () => {
    setStep(0)
    setPlaying(false)
  }

  return { step, playing, atEnd, toggle, stepForward, reset }
}
