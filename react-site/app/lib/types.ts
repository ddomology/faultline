export type View = 'notes' | 'concepts'
export interface NoteMeta {
  slug: string
  routePath: string
  title: string
  originalTitle: string
  explorerTitle: string
  number: string
  category: string
  categoryTitle: string
  difficulty: string
  noteKind: 'problem' | 'solution' | 'note'
  labUrl: string
  view: View
  sourcePath: string
}
export interface Note extends NoteMeta {
  html: string
  toc: { id: string; text: string; depth: number }[]
}
export interface Catalog {
  notes: NoteMeta[]
  categories: { id: string; title: string; number: string; count: number }[]
  counts: { notes: number; concepts: number }
  brand: { name: string; tagline: string; description: string }
}
export interface Deployment {
  basePath: string
  siteUrl: string
  repositoryUrl: string
}
