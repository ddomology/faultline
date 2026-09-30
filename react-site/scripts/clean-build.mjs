import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Pre-rendering must never reuse a server bundle from the previous build. Keep
// the last successful dist until exportStatic replaces it after validation.
rmSync(fileURLToPath(new URL('../build', import.meta.url)), { recursive: true, force: true })
