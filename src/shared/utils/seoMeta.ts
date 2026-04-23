import { env } from '../../config/env.js'
import type { SeoInput, SeoMeta } from '../types/seo.js'

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
