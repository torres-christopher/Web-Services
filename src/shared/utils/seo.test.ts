// seo.test.ts
import { describe, it, expect } from 'vitest'
import { buildSeoMeta } from './seo.js'

describe('buildSeoMeta', () => {
  it('returns correct title', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
    })
    expect(result.title).toBe('Test')
  })

  it('generates canonical path', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
    })
    expect(result.canonicalPath).toBe('/test')
  })

  it('defaults og fields to core values', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
    })
    expect(result.ogTitle).toBe('Test')
    expect(result.ogDescription).toBe('Description')
    expect(result.ogImage).toContain('/images/og-default.png')
  })

  it('generates toolCategory when provided', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
      categoryName: 'text-editors',
    })
    expect(result.categoryName).toBe('text-editors')
  })

  it('generates jsonLd when category provided', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
      categoryName: 'text-editors',
    })
    expect(result.jsonLd).toBeDefined()
    expect(result.jsonLd).toHaveProperty('@type', 'WebApplication')
  })

  it('omits jsonLd when no category', () => {
    const result = buildSeoMeta({
      title: 'Test',
      description: 'Description',
      path: '/test',
    })
    expect(result.jsonLd).toBeUndefined()
  })
})
