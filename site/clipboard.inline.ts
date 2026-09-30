import { iconSvg } from "./ui-icons"

const languageNames: Record<string, string> = {
  text: "텍스트", plaintext: "텍스트", txt: "텍스트", plain: "텍스트",
  powershell: "PowerShell", ps1: "PowerShell", psm1: "PowerShell",
  javascript: "JavaScript", js: "JavaScript", jsx: "JSX",
  typescript: "TypeScript", ts: "TypeScript", tsx: "TSX",
  sql: "SQL", json: "JSON", jsonc: "JSONC", json5: "JSON5",
  html: "HTML", xml: "XML", svg: "SVG", css: "CSS", scss: "SCSS",
  bash: "Bash", sh: "Shell", shell: "Shell", shellscript: "Shell",
  console: "터미널", shellsession: "터미널", zsh: "Zsh", fish: "Fish",
  python: "Python", py: "Python", http: "HTTP", https: "HTTP",
  yaml: "YAML", yml: "YAML", toml: "TOML", ini: "INI", dotenv: "환경 변수",
  markdown: "Markdown", md: "Markdown", diff: "Diff", patch: "Diff",
  c: "C", cpp: "C++", csharp: "C#", cs: "C#", java: "Java",
  go: "Go", rust: "Rust", rs: "Rust", ruby: "Ruby", rb: "Ruby",
  php: "PHP", perl: "Perl", dockerfile: "Dockerfile", nginx: "Nginx",
}

const installed = new WeakSet<HTMLPreElement>()

function sourceText(code: HTMLElement, pre: HTMLPreElement): string {
  const figure = pre.parentElement?.matches("figure[data-rehype-pretty-code-figure]") ? pre.parentElement : null
  const clipboard = code.dataset.clipboard ?? pre.dataset.clipboard ?? figure?.dataset.clipboard
  if (clipboard !== undefined) {
    try {
      const source: unknown = JSON.parse(clipboard)
      if (typeof source === "string") return source
    } catch {
      // A malformed optional attribute must not break the remaining blocks.
    }
  }
  // textContent preserves tabs and line breaks without depending on wrapping.
  return code.textContent ?? ""
}

document.addEventListener("nav", () => {
  document.querySelectorAll<HTMLPreElement>(".center article pre").forEach(pre => {
    const code = pre.querySelector<HTMLElement>(":scope > code")
    if (!code || installed.has(pre) || pre.classList.contains("mermaid") || code.classList.contains("mermaid")) return
    installed.add(pre)

    const source = sourceText(code, pre)
    const figure = pre.parentElement?.matches("figure[data-rehype-pretty-code-figure]") ? pre.parentElement : null
    const language = (code.dataset.readerLanguage || pre.dataset.readerLanguage || figure?.dataset.readerLanguage ||
      code.dataset.language || pre.dataset.language ||
      [...code.classList].find(name => name.startsWith("language-"))?.slice(9) || "text").toLowerCase()
    const languageLabel = languageNames[language] || language
    const toolbar = document.createElement("div")
    toolbar.className = "code-toolbar"
    const label = document.createElement("span")
    label.className = "code-language"
    label.textContent = languageLabel
    const actions = document.createElement("div")
    actions.className = "code-actions"

    const wrapButton = document.createElement("button")
    wrapButton.className = "code-wrap-button"
    wrapButton.type = "button"
    wrapButton.textContent = "줄바꿈"
    wrapButton.setAttribute("aria-pressed", "false")
    wrapButton.setAttribute("aria-label", "긴 코드 줄바꿈")
    wrapButton.hidden = true

    const button = document.createElement("button")
    button.className = "clipboard-button"
    button.type = "button"
    button.setAttribute("aria-label", "코드 복사")
    const copyIcon = document.createElement("span")
    copyIcon.className = "clipboard-icon"
    copyIcon.innerHTML = iconSvg("copy")
    const doneIcon = document.createElement("span")
    doneIcon.className = "clipboard-done-icon"
    doneIcon.innerHTML = iconSvg("check")
    doneIcon.hidden = true
    const feedback = document.createElement("span")
    feedback.className = "clipboard-feedback"
    feedback.setAttribute("aria-live", "polite")
    feedback.setAttribute("aria-atomic", "true")
    feedback.textContent = "복사"
    button.append(copyIcon, doneIcon, feedback)
    actions.append(wrapButton, button)
    toolbar.append(label, actions)
    pre.prepend(toolbar)

    let disposed = false
    let frame = 0
    let timeout: ReturnType<typeof setTimeout> | undefined
    let copySequence = 0
    const originalTabIndex = code.getAttribute("tabindex")
    const originalAriaLabel = code.getAttribute("aria-label")
    const setAttribute = (name: string, value: string | null) => {
      if (value === null) code.removeAttribute(name)
      else code.setAttribute(name, value)
    }
    const updateOverflow = () => {
      if (disposed) return
      const wrapped = pre.classList.contains("is-wrapped")
      const overflowing = code.scrollWidth > code.clientWidth + 1
      // Keep the toggle available while wrapping is on, even after a resize.
      wrapButton.hidden = !wrapped && !overflowing
      if (originalTabIndex === null) setAttribute("tabindex", overflowing ? "0" : null)
      if (originalAriaLabel === null) {
        setAttribute("aria-label", overflowing ? `${languageLabel} 코드, 가로로 스크롤 가능` : null)
      }
    }
    const scheduleOverflow = () => {
      if (disposed || frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        updateOverflow()
      })
    }
    const toggleWrap = () => {
      const wrapped = pre.classList.toggle("is-wrapped")
      wrapButton.setAttribute("aria-pressed", String(wrapped))
      // Reset a previous horizontal offset when switching to wrapped lines.
      if (wrapped) code.scrollLeft = 0
      updateOverflow()
    }
    const show = (text: string, copied = false) => {
      copyIcon.hidden = copied
      doneIcon.hidden = !copied
      feedback.textContent = text
    }
    const copy = async () => {
      const sequence = ++copySequence
      clearTimeout(timeout)
      try {
        await navigator.clipboard.writeText(source)
        if (disposed || sequence !== copySequence) return
        show("복사됨", true)
      } catch {
        if (disposed || sequence !== copySequence) return
        show("복사 실패")
      }
      timeout = setTimeout(() => show("복사"), 2000)
    }

    wrapButton.addEventListener("click", toggleWrap)
    button.addEventListener("click", copy)
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleOverflow)
    observer?.observe(code)
    observer?.observe(pre)
    if (!observer) window.addEventListener("resize", scheduleOverflow)
    document.fonts?.addEventListener("loadingdone", scheduleOverflow)
    void document.fonts?.ready.then(scheduleOverflow)
    updateOverflow()

    window.addCleanup(() => {
      disposed = true
      clearTimeout(timeout)
      cancelAnimationFrame(frame)
      observer?.disconnect()
      window.removeEventListener("resize", scheduleOverflow)
      document.fonts?.removeEventListener("loadingdone", scheduleOverflow)
      wrapButton.removeEventListener("click", toggleWrap)
      button.removeEventListener("click", copy)
      setAttribute("tabindex", originalTabIndex)
      setAttribute("aria-label", originalAriaLabel)
      pre.classList.remove("is-wrapped")
      toolbar.remove()
      installed.delete(pre)
    })
  })
})
