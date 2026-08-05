import { mergeVariantSchemas } from '@happydesigns/nuxt-variants/schemas'
import { variantSchemas } from './traits'

/**
 * Source-agnostic schemas for consumer-owned Nuxt Content collections.
 *
 * Collection names, sources, prefixes and any project-specific schema fields
 * intentionally remain in the consuming application's `content.config.ts`.
 */
export const collectionSchemas = {
  content: mergeVariantSchemas(['content'], variantSchemas),
  article: mergeVariantSchemas(['article'], variantSchemas),
  event: mergeVariantSchemas(['event'], variantSchemas),
  user: mergeVariantSchemas(['user'], variantSchemas),
}
