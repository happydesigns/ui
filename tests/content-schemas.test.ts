import { describe, expect, it } from 'vitest'
import { collectionSchemas } from '../schemas/collections'

describe('public content schemas', () => {
  it.each([true, false])('accepts toc=%s independently of layout', async (toc) => {
    const result = await collectionSchemas.content['~standard'].validate({ layout: 'content', toc })
    expect(result.issues).toBeUndefined()
    expect(result).toMatchObject({ value: { layout: 'content', toc } })
  })

  it('rejects unsupported layouts', async () => {
    const result = await collectionSchemas.content['~standard'].validate({ layout: 'unknown' })
    expect(result.issues).toBeDefined()
  })

  it('defaults articles to published and permits explicit drafts', async () => {
    const defaults = await collectionSchemas.article['~standard'].validate({})
    const draft = await collectionSchemas.article['~standard'].validate({ published: false })
    expect(defaults).toMatchObject({ value: { published: true } })
    expect(draft).toMatchObject({ value: { published: false } })
  })
})
