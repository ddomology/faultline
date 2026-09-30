const filledBars: Record<string, number> = { Apprentice: 1, Practitioner: 2, Expert: 3 }

export function difficultyBarCount(difficulty: string): number {
  return Object.hasOwn(filledBars, difficulty) ? filledBars[difficulty] : 0
}

export function difficultyBarBody(count: number): string {
  return [1, 9, 17].map((x, index) => `<rect x="${x}" y="3" width="5" height="8" rx="1" class="${index < count ? "is-filled" : "is-empty"}" />`).join("")
}

export function difficultyBarsSvg(difficulty: string): string {
  const count = difficultyBarCount(difficulty)
  if (!count) return ""
  return `<svg xmlns="http://www.w3.org/2000/svg" class="difficulty-bars" width="24" height="14" viewBox="0 0 24 14" data-level="${count}" aria-hidden="true" focusable="false">${difficultyBarBody(count)}</svg>`
}
