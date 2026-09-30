export function socialMeta({ title, description, url, image, brand, article = false }: { title: string; description: string; url: string; image: string; brand: string; article?: boolean }) {
  return [
    { title }, { name: 'description', content: description },
    { property: 'og:title', content: title }, { property: 'og:description', content: description },
    { property: 'og:site_name', content: brand }, { property: 'og:type', content: article ? 'article' : 'website' },
    { property: 'og:url', content: url }, { property: 'og:locale', content: 'ko_KR' },
    { property: 'og:image', content: image }, { property: 'og:image:width', content: '1200' }, { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' }, { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description }, { name: 'twitter:image', content: image },
    { tagName: 'link' as const, rel: 'canonical', href: url },
  ]
}
