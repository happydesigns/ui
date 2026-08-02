import { queryCollectionNavigation } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const entries = await Promise.all(getSearchCollections().map((config) => {
    const query = queryCollectionNavigation(event, asPageCollection(config.name))
    return applySearchCollectionConfig(query, config)
  }))

  return entries.flat()
})
