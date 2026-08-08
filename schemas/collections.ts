import { createVariantSchemaResolver } from '@happydesigns/nuxt-variants/schemas'
import { variantSchemas } from './traits'
import { variantRegistry } from './variants'

const resolveVariantSchema = createVariantSchemaResolver(variantRegistry, variantSchemas)

/**
 * Source-agnostic schemas for consumer-owned Nuxt Content collections.
 *
 * Collection names, sources, prefixes and any project-specific schema fields
 * intentionally remain in the consuming application's `content.config.ts`.
 */
export const collectionSchemas = {
  content: resolveVariantSchema(['content']),
  article: resolveVariantSchema(['article']),
  event: resolveVariantSchema(['event']),
  user: resolveVariantSchema(['user']),
}
