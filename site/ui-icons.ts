import paths from "../data/icon-paths.json"

export type IconName = keyof typeof paths
export const iconPaths = paths

export function iconSvg(name: IconName): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="ui-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`
}
