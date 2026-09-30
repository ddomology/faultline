import { iconSvg } from "./ui-icons"

const languageNames: Record<string, string> = {
  text: "텍스트", plaintext: "텍스트", txt: "텍스트", plain: "텍스트",
  powershell: "PowerShell", ps: "PowerShell", ps1: "PowerShell", psm1: "PowerShell", psd1: "PowerShell", pwsh: "PowerShell",
  javascript: "JavaScript", js: "JavaScript", jsx: "JSX",
  typescript: "TypeScript", ts: "TypeScript", tsx: "TSX",
  sql: "SQL", json: "JSON", jsonc: "JSONC", json5: "JSON5",
  html: "HTML", xml: "XML", svg: "SVG", css: "CSS", scss: "SCSS",
  bash: "Bash", sh: "Shell", shell: "Shell", shellscript: "Shell",
  console: "터미널", shellsession: "터미널", "shell-session": "터미널", zsh: "Zsh", fish: "Fish",
  python: "Python", py: "Python", http: "HTTP", https: "HTTP",
  yaml: "YAML", yml: "YAML", toml: "TOML", ini: "INI", dotenv: "환경 변수", env: "환경 변수",
  markdown: "Markdown", md: "Markdown", diff: "Diff", patch: "Diff",
  c: "C", cpp: "C++", csharp: "C#", cs: "C#", java: "Java",
  go: "Go", rust: "Rust", rs: "Rust", ruby: "Ruby", rb: "Ruby",
  php: "PHP", blade: "Blade", perl: "Perl", raku: "Raku",
  dockerfile: "Dockerfile", docker: "Dockerfile", nginx: "Nginx",
  mjs: "JavaScript", cjs: "JavaScript", mts: "TypeScript", cts: "TypeScript",
  vue: "Vue", svelte: "Svelte", astro: "Astro", angular: "Angular",
  sass: "Sass", less: "Less", stylus: "Stylus", postcss: "PostCSS",
  graphql: "GraphQL", gql: "GraphQL", mdx: "MDX", latex: "LaTeX", tex: "LaTeX",
  kt: "Kotlin", kotlin: "Kotlin", scala: "Scala", swift: "Swift", dart: "Dart",
  r: "R", julia: "Julia", lua: "Lua", luau: "Luau", zig: "Zig",
  cxx: "C++", cc: "C++", "c++": "C++", h: "C", hpp: "C++",
  "c#": "C#", "objective-c": "Objective-C", objc: "Objective-C",
  "objective-cpp": "Objective-C++", fsharp: "F#", fs: "F#", "f#": "F#",
  elixir: "Elixir", ex: "Elixir", erlang: "Erlang", clojure: "Clojure",
  haskell: "Haskell", hs: "Haskell", ocaml: "OCaml", scheme: "Scheme",
  lisp: "Lisp", commonlisp: "Common Lisp", racket: "Racket",
  "emacs-lisp": "Emacs Lisp", elisp: "Emacs Lisp",
  bat: "Batch", batch: "Batch", cmd: "Batch", awk: "AWK",
  makefile: "Makefile", make: "Makefile", cmake: "CMake",
  terraform: "Terraform", hcl: "HCL", tf: "Terraform", nix: "Nix",
  prisma: "Prisma", protobuf: "Protocol Buffers", proto: "Protocol Buffers",
  csv: "CSV", tsv: "TSV", jsonl: "JSON Lines", ndjson: "JSON Lines",
  httprequest: "HTTP", tcp: "TCP", log: "로그", properties: "Properties",
  mysql: "MySQL", mariadb: "MariaDB", postgresql: "PostgreSQL", postgres: "PostgreSQL", pgsql: "PostgreSQL",
  sqlite: "SQLite", oracle: "Oracle SQL", plsql: "PL/SQL", tsql: "T-SQL", sqlserver: "T-SQL",
  mssql: "T-SQL", transactsql: "T-SQL", db2: "DB2 SQL", db2i: "DB2 for i SQL",
  bigquery: "BigQuery SQL", snowflake: "Snowflake SQL", redshift: "Redshift SQL",
  duckdb: "DuckDB SQL", clickhouse: "ClickHouse SQL", hive: "Hive SQL", spark: "Spark SQL",
  trino: "Trino SQL", presto: "Presto SQL", tidb: "TiDB SQL", singlestoredb: "SingleStore SQL", n1ql: "N1QL",
  lwc: "LWC", mjml: "MJML", flow: "Flow", kotlin_script: "Kotlin", objcpp: "Objective-C++", "objective-c++": "Objective-C++",
  handlebars: "Handlebars", hbs: "Handlebars", liquid: "Liquid", pug: "Pug",
  regex: "정규 표현식", regexp: "정규 표현식", wasm: "WebAssembly", wat: "WebAssembly",
  asm: "Assembly", assembly: "Assembly", nasm: "Assembly", mermaid: "Mermaid",
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

    const formattedCode = pre.querySelector<HTMLElement>(':scope > code[data-reader-view="formatted"]')
    const variants = formattedCode ? [code, formattedCode] : [code]
    const sources = new Map(variants.map(variant => [variant, sourceText(variant, pre)]))
    const originalAttributes = variants.map(variant => ({
      code: variant,
      hidden: variant.hidden,
      tabIndex: variant.getAttribute("tabindex"),
      ariaLabel: variant.getAttribute("aria-label"),
    }))
    let activeCode = formattedCode && !formattedCode.hidden ? formattedCode : code
    const initiallyFormatted = activeCode === formattedCode
    code.hidden = initiallyFormatted
    if (formattedCode) formattedCode.hidden = !initiallyFormatted
    const figure = pre.parentElement?.matches("figure[data-rehype-pretty-code-figure]") ? pre.parentElement : null
    const language = (code.dataset.readerLanguage || pre.dataset.readerLanguage || figure?.dataset.readerLanguage ||
      code.dataset.language || pre.dataset.language ||
      [...code.classList].find(name => name.startsWith("language-"))?.slice(9) || "text").toLowerCase()
    const languageLabel = languageNames[language] || language
    const fragment = code.hasAttribute("data-reader-fragment") || pre.hasAttribute("data-reader-fragment") ||
      figure?.hasAttribute("data-reader-fragment")
    const toolbar = document.createElement("div")
    toolbar.className = "code-toolbar"
    const label = document.createElement("span")
    label.className = "code-language"
    label.textContent = fragment ? `${languageLabel} · 조각` : languageLabel
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
    const initialCopyLabel = initiallyFormatted ? "정렬본 복사" : "원문 복사"
    button.setAttribute("aria-label", initialCopyLabel)
    button.title = initialCopyLabel
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
    const viewGroup = document.createElement("div")
    viewGroup.className = "code-view-switch"
    viewGroup.setAttribute("role", "group")
    viewGroup.setAttribute("aria-label", "코드 표시")
    const sourceButton = document.createElement("button")
    sourceButton.className = "code-view-button"
    sourceButton.type = "button"
    sourceButton.textContent = "원문"
    sourceButton.setAttribute("aria-label", "원문 보기")
    sourceButton.setAttribute("aria-pressed", String(!initiallyFormatted))
    sourceButton.title = "원문 보기"
    const formattedButton = document.createElement("button")
    formattedButton.className = "code-view-button"
    formattedButton.type = "button"
    formattedButton.textContent = "정렬"
    formattedButton.setAttribute("aria-label", "정렬해서 보기")
    formattedButton.setAttribute("aria-pressed", String(initiallyFormatted))
    formattedButton.title = "정렬해서 보기"
    if (formattedCode) {
      viewGroup.append(sourceButton, formattedButton)
      actions.append(viewGroup)
    }
    actions.append(wrapButton, button)
    toolbar.append(label, actions)
    pre.prepend(toolbar)

    let disposed = false
    let frame = 0
    let timeout: ReturnType<typeof setTimeout> | undefined
    let copySequence = 0
    const setAttribute = (target: HTMLElement, name: string, value: string | null) => {
      if (value === null) target.removeAttribute(name)
      else target.setAttribute(name, value)
    }
    const updateOverflow = () => {
      if (disposed) return
      const wrapped = pre.classList.contains("is-wrapped")
      const overflowing = activeCode.scrollWidth > activeCode.clientWidth + 1
      // Keep the toggle available while wrapping is on, even after a resize.
      wrapButton.hidden = !wrapped && !overflowing
      for (const original of originalAttributes) {
        const isActive = original.code === activeCode
        if (original.tabIndex === null) {
          setAttribute(original.code, "tabindex", isActive && overflowing ? "0" : null)
        }
        if (original.ariaLabel === null) {
          setAttribute(original.code, "aria-label", isActive && overflowing ? `${languageLabel} 코드, 가로로 스크롤 가능` : null)
        }
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
      if (wrapped) activeCode.scrollLeft = 0
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
        await navigator.clipboard.writeText(sources.get(activeCode) ?? "")
        if (disposed || sequence !== copySequence) return
        show("복사됨", true)
      } catch {
        if (disposed || sequence !== copySequence) return
        show("복사 실패")
      }
      timeout = setTimeout(() => show("복사"), 2000)
    }

    const selectView = (nextCode: HTMLElement) => {
      if (nextCode === activeCode) return
      // A pending copy belongs to the previously visible variant.
      copySequence++
      clearTimeout(timeout)
      show("복사")
      activeCode = nextCode
      for (const variant of variants) variant.hidden = variant !== activeCode
      const formatted = activeCode === formattedCode
      sourceButton.setAttribute("aria-pressed", String(!formatted))
      formattedButton.setAttribute("aria-pressed", String(formatted))
      const copyLabel = formatted ? "정렬본 복사" : "원문 복사"
      button.setAttribute("aria-label", copyLabel)
      button.title = copyLabel
      if (pre.classList.contains("is-wrapped")) activeCode.scrollLeft = 0
      updateOverflow()
      scheduleOverflow()
    }
    const selectSource = () => selectView(code)
    const selectFormatted = () => { if (formattedCode) selectView(formattedCode) }
    sourceButton.addEventListener("click", selectSource)
    formattedButton.addEventListener("click", selectFormatted)
    wrapButton.addEventListener("click", toggleWrap)
    button.addEventListener("click", copy)
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleOverflow)
    variants.forEach(variant => observer?.observe(variant))
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
      sourceButton.removeEventListener("click", selectSource)
      formattedButton.removeEventListener("click", selectFormatted)
      for (const original of originalAttributes) {
        setAttribute(original.code, "tabindex", original.tabIndex)
        setAttribute(original.code, "aria-label", original.ariaLabel)
        original.code.hidden = original.hidden
      }
      pre.classList.remove("is-wrapped")
      toolbar.remove()
      installed.delete(pre)
    })
  })
})
