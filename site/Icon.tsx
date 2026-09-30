import { IconName, iconPaths } from "./scripts/ui-icons"

export default function Icon({ name, className = "" }: { name: IconName, className?: string }) {
  return <svg xmlns="http://www.w3.org/2000/svg" class={`ui-icon ${className}`.trim()} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={{ __html: iconPaths[name] }} />
}
