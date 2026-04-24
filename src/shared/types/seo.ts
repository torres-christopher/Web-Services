export interface SeoInput {
  title: string
  description: string
  path: string
  categoryName?: string
  categoryPath?: string
  toolName?: string
  toolPath?: string
}

export interface SeoMeta {
  // For all
  title: string
  metaDescription: string
  canonicalPath: string // Ie. "/pocet-znaku"

  // Open Graph values --> If no title/description/image absent
  ogTitle?: string
  ogDescription?: string
  ogImage?: string

  // Tool specific stuff
  toolName?: string | undefined
  toolPath?: string | undefined
  toolDescription?: string | undefined
  categoryName?: string | undefined
  categoryPath?: string | undefined

  // Structured data in JSON-LD
  jsonLd?: object
}
