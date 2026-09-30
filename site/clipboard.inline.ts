import { iconSvg } from "./ui-icons"

document.addEventListener("nav", () => {
  const languageNames: Record<string, string> = { text: "텍스트", plaintext: "텍스트", powershell: "PowerShell", ps1: "PowerShell", javascript: "JavaScript", js: "JavaScript", typescript: "TypeScript", ts: "TypeScript", sql: "SQL", json: "JSON", html: "HTML", css: "CSS", bash: "Bash", python: "Python", http: "HTTP", yaml: "YAML" }
  document.querySelectorAll<HTMLPreElement>(".center article pre").forEach(pre => {
    const code = pre.querySelector("code")
    if (!code || pre.querySelector(".code-toolbar") || pre.classList.contains("mermaid")) return
    const source = code.dataset.clipboard ? JSON.parse(code.dataset.clipboard) : code.innerText
    const toolbar = document.createElement("div")
    toolbar.className = "code-toolbar"
    const label = document.createElement("span")
    label.className = "code-language"
    const language = code.dataset.language || pre.dataset.language || "text"
    label.textContent = languageNames[language] || language
    const button = document.createElement("button")
    button.className = "clipboard-button"
    button.type = "button"
    button.ariaLabel = "코드 복사"
    const feedback = document.createElement("span")
    feedback.setAttribute("aria-live", "polite")
    const show = (text: string, copied = false) => {
      button.innerHTML = iconSvg(copied ? "check" : "copy")
      feedback.textContent = text
      button.append(feedback)
    }
    show("복사")
    let timeout: ReturnType<typeof setTimeout>
    const copy = async () => {
      clearTimeout(timeout)
      try {
        await navigator.clipboard.writeText(source)
        show("복사됨", true)
      } catch {
        show("복사 실패")
      }
      timeout = setTimeout(() => show("복사"), 2000)
    }
    button.addEventListener("click", copy)
    window.addCleanup(() => { button.removeEventListener("click", copy); clearTimeout(timeout) })
    toolbar.append(label, button)
    pre.prepend(toolbar)
  })
})
