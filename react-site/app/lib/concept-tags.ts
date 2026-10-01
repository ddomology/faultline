import registry from '../../../site/concept-tags.json' with { type: 'json' }

export interface ConceptTagGroup {
  id: string
  label: string
}

export interface ConceptTag {
  id: string
  label: string
  group: string
  icon: string
  aliases: string[]
}

export const conceptTags: ConceptTag[] = registry.tags
export const conceptTagGroups: ConceptTagGroup[] = registry.groups

const tagKey = (value: string) => value.normalize('NFKC').trim().toLocaleLowerCase('ko')
const byName = new Map<string, ConceptTag>()
for (const tag of conceptTags) {
  for (const name of [tag.id, tag.label, ...tag.aliases]) byName.set(tagKey(name), tag)
}

export function getConceptTag(value: string): ConceptTag | undefined {
  return byName.get(tagKey(value))
}

export function normalizeConceptTags(value: unknown): string[] {
  const values = Array.isArray(value) ? value : [value]
  const tags: string[] = []
  const seen = new Set<string>()
  for (const item of values) {
    if (typeof item !== 'string') continue
    const label = item.normalize('NFKC').trim()
    if (!label) continue
    const tag = getConceptTag(label)?.id || label
    const key = tagKey(tag)
    if (!seen.has(key)) { seen.add(key); tags.push(tag) }
  }
  return tags
}
