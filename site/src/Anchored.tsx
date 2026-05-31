import { Fragment } from 'react'

/**
 * Render a string with `**…**` spans promoted to Artificer anchor words —
 * the system's primary scan mechanism (bold 3–5 words; the bolded path reads
 * alone). Loop-spec notes/titles are author-controlled plain strings, so the
 * marker stays in the data and rendering adds no markup the data didn't ask for.
 */
export function Anchored({ text }: { text: string }) {
  // Capturing split: odd indices are the **bolded** spans.
  const parts = text.split(/\*\*(.+?)\*\*/g)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <b key={i} className="anchor">
            {part}
          </b>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}
