import { defineContentConfig } from '@nuxt/content'
import { pageCollectionConfig, snippetCollectionConfig } from '../content.config'

export default defineContentConfig({
  collections: {
    snippet: snippetCollectionConfig,
    page: pageCollectionConfig,
  },
})
