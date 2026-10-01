import { LEVEL_NAMES } from '../lib/library-query'

export default function Difficulty({ level, compact = false }: { level: string; compact?: boolean }) {
  const count = ['Apprentice', 'Practitioner', 'Expert'].indexOf(level) + 1
  if (!count) return null
  const label = `난이도 ${LEVEL_NAMES[level]} · ${level}`
  return <span className="note-level" role="img" aria-label={label} title={label}>
    <svg className="difficulty-bars" width="24" height="14" viewBox="0 0 24 14" aria-hidden="true">
      {[1, 9, 17].map((x, i) => <rect key={x} x={x} y="3" width="5" height="8" rx="1" className={i < count ? 'is-filled' : 'is-empty'} />)}
    </svg>{!compact && <span aria-hidden="true">{LEVEL_NAMES[level]}</span>}
  </span>
}
