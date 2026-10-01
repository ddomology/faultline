import { Link } from 'react-router'
import { getConceptTag, normalizeConceptTags } from '../lib/concept-tags'
import '../styles/concept-tags.scss'

// Only checked-in artwork can enter the SVG renderer. A Markdown tag is never SVG.
const artwork = import.meta.glob<string>([
  '../../../site/assets/icons/topics/*.svg',
  '../../../site/assets/icons/concepts/*.svg',
], { query: '?raw', import: 'default', eager: true })
const iconBodies = new Map(Object.entries(artwork).map(([path, svg]) => [
  path.split('/icons/')[1],
  svg.replace(/^.*?<svg\b[^>]*>/s, '').replace(/<\/svg>\s*$/, '')
    .replace(/<title\b[^>]*>.*?<\/title>/gs, ''),
]))

function TagIcon({ value }: { value: string }) {
  const tag = getConceptTag(value)
  const body = tag && iconBodies.get(tag.icon)
  return body ? <svg className="concept-tag-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML={{ __html: body }} />
    : <span className="concept-tag-hash" aria-hidden="true">#</span>
}

export default function ConceptTags({ tags }: { tags: string[] }) {
  const values = normalizeConceptTags(tags)
  if (!values.length) return null
  return <ul className="concept-tags" aria-label="개념 태그">
    {values.map(value => {
      const tag = getConceptTag(value)
      const label = tag?.label || value
      const search = new URLSearchParams({ view: 'concepts', tag: tag?.id || value })
      return <li key={value}><Link className="concept-tag" to={`/?${search}`} aria-label={`${label} 개념 노트 보기`}>
        <TagIcon value={value} /><span className="concept-tag-label">{label}</span>
      </Link></li>
    })}
  </ul>
}

export function ConceptTagFilter({ tag, clearHref }: { tag: string; clearHref: string }) {
  const label = getConceptTag(tag)?.label || tag
  return <div className="concept-tag-filter" aria-label="적용된 태그 필터">
    <span className="concept-tag-filter-title">태그</span>
    <Link className="concept-tag" to={clearHref} preventScrollReset aria-label={`${label} 태그 필터 해제`}>
      <TagIcon value={tag} /><span className="concept-tag-label">{label}</span>
      <svg className="concept-tag-clear" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="m4 4 8 8m0-8-8 8" /></svg>
    </Link>
  </div>
}
