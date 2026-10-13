import { queryCollectionSearchSections } from '@nuxt/content/server'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async (event) => {
  setSearchCacheHeaders(event)
  const entries = await Promise.all(getSearchCollections().map((config) => {
    const query = queryCollectionSearchSections(event, asPageCollection(config.name))
    return applySearchCollectionConfig(query, config)
  }))

  return entries.flat()
})
