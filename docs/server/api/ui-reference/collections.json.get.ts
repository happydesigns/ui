import { defineEventHandler } from 'nuxt/server'
import { getCollectionReferences } from '../../utils/uiReference'

export default defineEventHandler(() => {
  return {
    collections: getCollectionReferences(),
  }
})
