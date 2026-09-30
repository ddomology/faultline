import catalog from "./data/topic-catalog.json"
import brand from "./data/brand.json"

const topics: Record<string, string> = {
  "sql-injection": "SQLi",
  "cross-site-scripting": "XSS",
  "cross-site-request-forgery-csrf": "CSRF",
  "clickjacking": "클릭재킹",
  "dom-based-vulnerabilities": "DOM",
  "cross-origin-resource-sharing-cors": "CORS",
  "xml-external-entity-xxe-injection": "XXE",
  "server-side-request-forgery-ssrf": "SSRF",
  "http-request-smuggling": "스머글링",
  "os-command-injection": "OS 명령",
  "server-side-template-injection": "SSTI",
  "path-traversal": "경로 탐색",
  "access-control-vulnerabilities": "접근 제어",
  "authentication": "인증",
  "websockets": "WebSocket",
  "web-cache-poisoning": "캐시 오염",
  "insecure-deserialization": "역직렬화",
  "information-disclosure": "정보 노출",
  "business-logic-vulnerabilities": "로직",
  "http-host-header-attacks": "Host 헤더",
  "oauth-authentication": "OAuth",
  "file-upload-vulnerabilities": "파일 업로드",
  "jwt": "JWT",
  "essential-skills": "기본 기술",
  "prototype-pollution": "프로토타입",
  "graphql-api-vulnerabilities": "GraphQL",
  "race-conditions": "경쟁 조건",
  "nosql-injection": "NoSQLi",
  "api-testing": "API",
  "web-llm-attacks": "LLM",
  "web-cache-deception": "캐시 기만",
}

const titles = new Map<string, string>()
for (const category of catalog.categories) {
  const labs = catalog.labs.filter(lab => lab.category === category.id)
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
  labs.forEach((lab, index) => {
    titles.set(lab.notePath.replace(/\.md$/, ""), `${topics[category.id] || "실습"} #${index + 1} · ${brand.name}`)
  })
}

export function tabTitle(slug: string, title: string): string {
  if (slug === "index") return `${brand.name} · 웹 보안 노트`
  if (slug === "404") return `페이지 없음 · ${brand.name}`
  const labTitle = titles.get(slug)
  if (labTitle) return labTitle
  const chars = Array.from(title)
  return `${chars.length > 12 ? chars.slice(0, 11).join("") + "…" : title} · ${brand.name}`
}
