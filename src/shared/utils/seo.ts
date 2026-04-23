import { env } from '../../config/env.js'

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

export const buildSeoMeta = (input: SeoInput) => {
  const output: SeoMeta = {
    title: input.title,
    metaDescription: input.description,
    canonicalPath: input.path,

    ogTitle: input.title,
    ogDescription: input.description,
    ogImage: `${env.SITE_URL}/images/og-default.png`,

    toolName: input?.toolName,
    toolPath: input?.toolPath,
    toolDescription: undefined,
    categoryName: input?.categoryName,
    categoryPath: input?.categoryPath,

    // Only if input.category exists
    jsonLd: input.categoryName
      ? {
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: input.title,
          description: input.description,
          url: `${env.SITE_URL}${input.path}`,
          applicationCategory: 'UtilityApplication',
          operatingSystem: 'Web',
          inLanguage: 'cs',
        }
      : undefined,
  }
  return output
}
