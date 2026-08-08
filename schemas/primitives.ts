import { property } from '@nuxt/content'
import { z } from 'zod'

/** Studio-aware string field for media stored in the consumer application. */
export const mediaSourceSchema = property(z.string()).editor({ input: 'media' })

/** Accessible baseline for content-managed images. Projects can extend it. */
export const contentImageSchema = z.object({
  src: mediaSourceSchema,
  alt: z.string(),
})

/**
 * Creates a Studio-aware schema that inherits the current Nuxt UI PageSection
 * props while retaining project-specific fields.
 */
export function createPageSectionSchema<T extends Record<string, z.ZodType>>(shape: T) {
  return property(z.object(shape)).inherit('@nuxt/ui/components/PageSection.vue')
}
