import paths from "../data/topic-icon-paths.json"

// Authored SVG bodies only. Unknown categories retain a neutral notebook icon.
const fallback = '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 3v18M11 8h5m-5 4h5"/>'

export function topicIconBody(category: string): string {
  return Object.hasOwn(paths, category) ? paths[category as keyof typeof paths] : fallback
}

export function topicIconSvg(category: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="topic-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${topicIconBody(category)}</svg>`
}
