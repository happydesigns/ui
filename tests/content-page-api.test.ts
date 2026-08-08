import { describe, expect, it } from 'vitest'
import { isContentPageRoute } from '../app/utils/isContentPageRoute'
import { contentImageSchema, createPageSectionSchema } from '../schemas/primitives'

describe('content page API', () => {
  it.each([
    ['/about', true],
    ['/legal/privacy', true],
    ['/api', false],
    ['/api/search.json', false],
    ['/_nuxt/app.js', false],
    ['/assets/logo.svg', false],
    ['/release.v2/notes', true],
    ['/release.v2', false],
  ])('classifies %s as %s', (path, expected) => {
    expect(isContentPageRoute({ path })).toBe(expected)
  })

  it('ignores query strings when only fullPath is available', () => {
    expect(isContentPageRoute({ fullPath: '/about?preview=true' })).toBe(true)
    expect(isContentPageRoute({ fullPath: '/robots.txt?preview=true' })).toBe(false)
  })

  it('provides extensible media and Nuxt UI section schemas', async () => {
    const image = await contentImageSchema['~standard'].validate({ src: '/image.jpg', alt: '' })
    const invalidImage = await contentImageSchema['~standard'].validate({ src: '/image.jpg' })
    const sectionSchema = createPageSectionSchema({ image: contentImageSchema.optional() })
    const section = await sectionSchema['~standard'].validate({
      title: 'Section',
      image: { src: '/image.jpg', alt: 'Example' },
    })

    expect(image.issues).toBeUndefined()
    expect(invalidImage.issues).toBeDefined()
    expect(section.issues).toBeUndefined()
  })
})
