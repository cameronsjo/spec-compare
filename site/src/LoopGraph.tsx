import { useMemo } from 'react'
import type { Edge, ToolSpec } from './types'
import { KIND_COLOR } from './types'

const NODE_W = 200
const NODE_H = 40
const ROW_H = 74
const TOP = 16

// Loopback geometry. Non-adjacent edges arc out into a side gutter; when several
// share a side they fan into separate lanes so the curves (and their labels)
// don't stack on top of each other or collide with the node boxes.
const LANE_BASE = 48 // control-point distance of the first arc beyond the node edge
const LANE_STEP = 42 // extra distance for each additional concurrent arc on that side
const LABEL_ROOM = 30 // padding beyond the outermost arc so its label clears the edge
const MIN_SIDE = 24 // gutter when a side carries no arcs

export interface ActiveEdge {
  from: string
  to: string
}

interface Props {
  spec: ToolSpec
  activeNodeId?: string
  activeEdge?: ActiveEdge | null
  /** When set, nodes become clickable. */
  onNodeClick?: (id: string) => void
}

/** Pure renderer: a tool's spec workflow as a vertical column of phases with curved edges. */
export function LoopGraph({ spec, activeNodeId, activeEdge, onNodeClick }: Props) {
  const phases = spec.phases ?? []
  const edges = spec.edges ?? []

  const rowOf = useMemo(() => {
    const m = new Map<string, number>()
    phases.forEach((n, i) => m.set(n.id, i))
    return m
  }, [phases])

  // Assign each non-adjacent edge a lane on its side (right = forward, left = backward),
  // then size each gutter to hold its widest lane plus room for the label.
  const { laneOf, leftPad, rightPad } = useMemo(() => {
    const laneOf = new Map<number, number>()
    let left = 0
    let right = 0
    edges.forEach((e, i) => {
      const fr = rowOf.get(e.from)
      const tr = rowOf.get(e.to)
      if (fr == null || tr == null || tr === fr + 1) return
      if (tr > fr) laneOf.set(i, right++)
      else laneOf.set(i, left++)
    })
    const sidePad = (count: number) =>
      count === 0 ? MIN_SIDE : LANE_BASE + (count - 1) * LANE_STEP + LABEL_ROOM
    return { laneOf, leftPad: sidePad(left), rightPad: sidePad(right) }
  }, [edges, rowOf])

  const width = leftPad + NODE_W + rightPad
  const nodeX = leftPad
  const centerX = nodeX + NODE_W / 2
  const yTop = (row: number) => TOP + row * ROW_H
  const yMid = (row: number) => yTop(row) + NODE_H / 2
  const height = TOP + phases.length * ROW_H

  // Unique marker ids per tool — many graphs render at once in Compare view,
  // and SVG ids are document-scoped, so shared ids would all resolve to the first.
  const arrowId = `arrow-${spec.tool}`
  const arrowActiveId = `arrow-active-${spec.tool}`

  const edgePath = (e: Edge, idx: number): { d: string; mx: number; my: number } | null => {
    const fr = rowOf.get(e.from)
    const tr = rowOf.get(e.to)
    if (fr == null || tr == null) return null

    // Forward & adjacent → straight vertical segment between the boxes.
    if (tr === fr + 1) {
      const y1 = yTop(fr) + NODE_H
      const y2 = yTop(tr)
      return { d: `M ${centerX} ${y1} L ${centerX} ${y2}`, mx: centerX, my: (y1 + y2) / 2 }
    }

    const forward = tr > fr
    const lane = laneOf.get(idx) ?? 0
    const ctrlDist = LANE_BASE + lane * LANE_STEP
    // Forward non-adjacent → arc on the right; backward → arc on the left.
    const edgeX = forward ? nodeX + NODE_W : nodeX
    const ctrlX = forward ? edgeX + ctrlDist : edgeX - ctrlDist
    const y1 = yMid(fr)
    const y2 = yMid(tr)
    // Label rides the curve's apex (x at t=0.5 is ¼·edge + ¾·ctrl), out in the gutter.
    const apexX = 0.25 * edgeX + 0.75 * ctrlX
    return {
      d: `M ${edgeX} ${y1} C ${ctrlX} ${y1}, ${ctrlX} ${y2}, ${edgeX} ${y2}`,
      mx: apexX,
      my: (y1 + y2) / 2,
    }
  }

  const isActiveEdge = (e: Edge) =>
    activeEdge != null && activeEdge.from === e.from && activeEdge.to === e.to

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      role="img"
      aria-label={`${spec.displayName} workflow graph`}
    >
      <defs>
        <marker id={arrowId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--dia-edge-strong)" />
        </marker>
        <marker id={arrowActiveId} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-bright)" />
        </marker>
      </defs>

      {/* edges first, under the nodes */}
      {edges.map((e, i) => {
        const p = edgePath(e, i)
        if (!p) return null
        const active = isActiveEdge(e)
        const label = e.on ?? e.label
        return (
          <g key={`e${i}`}>
            <path
              d={p.d}
              fill="none"
              stroke={active ? 'var(--accent-bright)' : 'var(--dia-edge)'}
              strokeWidth={active ? 2.5 : 1.5}
              markerEnd={active ? `url(#${arrowActiveId})` : `url(#${arrowId})`}
              opacity={active ? 1 : 0.65}
            />
            {label && (
              <text
                x={p.mx}
                y={p.my}
                fill={active ? 'var(--accent-bright)' : 'var(--fg-secondary)'}
                fontSize="10"
                fontFamily="var(--font-mono)"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {label}
              </text>
            )}
          </g>
        )
      })}

      {/* nodes */}
      {phases.map((n) => {
        const row = rowOf.get(n.id)!
        const active = n.id === activeNodeId
        const color = KIND_COLOR[n.kind]
        const clickable = Boolean(onNodeClick)
        return (
          <g
            key={n.id}
            onClick={clickable ? () => onNodeClick!(n.id) : undefined}
            onKeyDown={
              clickable
                ? (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onNodeClick!(n.id)
                    }
                  }
                : undefined
            }
            tabIndex={clickable ? 0 : undefined}
            role={clickable ? 'button' : undefined}
            aria-label={clickable ? n.label : undefined}
            style={clickable ? { cursor: 'pointer' } : undefined}
          >
            <rect
              x={nodeX}
              y={yTop(row)}
              width={NODE_W}
              height={NODE_H}
              rx={8}
              fill={active ? 'var(--bg-overlay)' : 'var(--dia-node-bg)'}
              stroke={active ? color : 'var(--dia-node-border)'}
              strokeWidth={active ? 3 : 1.5}
            />
            {/* kind color chip on the left edge */}
            <rect x={nodeX} y={yTop(row)} width={6} height={NODE_H} rx={3} fill={color} />
            <text
              x={centerX + 3}
              y={yMid(row)}
              fill={active ? 'var(--fg)' : 'var(--dia-node-fg)'}
              fontSize="13"
              fontFamily="var(--font-mono)"
              fontWeight={active ? 700 : 400}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export { NODE_W }
