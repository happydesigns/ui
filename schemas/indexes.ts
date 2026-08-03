import type { CollectionIndex } from '@nuxt/content'

export const articleCollectionIndexes = [
  { columns: ['published', 'date'] },
  { columns: ['published', 'category', 'date'] },
] satisfies CollectionIndex[]

export const userCollectionIndexes = [
  { columns: ['username'], unique: true },
] satisfies CollectionIndex[]
