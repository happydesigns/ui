import { describe, expect, it } from 'vitest'
import { articleCollectionIndexes, userCollectionIndexes } from '../schemas/indexes'

describe('content collection indexes', () => {
  it('indexes article-like list filters', () => {
    expect(articleCollectionIndexes).toEqual([
      { columns: ['published', 'date'] },
      { columns: ['published', 'category', 'date'] },
    ])
  })

  it('enforces unique user lookup keys', () => {
    expect(userCollectionIndexes).toEqual([
      { columns: ['username'], unique: true },
    ])
  })
})
