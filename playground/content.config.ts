import { defineContentConfig } from '@nuxt/content'
import { articleCollectionConfig, pageCollectionConfig, snippetCollectionConfig } from '../content.config'

export default defineContentConfig({
  collections: {
    article: articleCollectionConfig,
    page: pageCollectionConfig,
    snippet: snippetCollectionConfig,
  },
})
