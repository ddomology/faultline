import { difficultyBarBody, difficultyBarCount } from "./scripts/difficulty-bars"

export default function DifficultyBars({ difficulty }: { difficulty: string }) {
  const count = difficultyBarCount(difficulty)
  if (!count) return null
  return <svg xmlns="http://www.w3.org/2000/svg" class="difficulty-bars" width="24" height="14" viewBox="0 0 24 14" data-level={count} aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: difficultyBarBody(count) }} />
}
