import { z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])
const targetEnum = z.enum(['_blank', '_parent', '_self', '_top'])

const as = z.any().optional()
const title = z.string().nonempty()
const description = z.string().nonempty()
const icon = z.string().nonempty().editor({ input: 'icon' })
const orientation = orientationEnum.optional()
const label = z.string().nonempty()
const to = z.string().nonempty()
const headline = z.string().optional()
const size = sizeEnum.optional()
const trailing = z.boolean().optional()
const target = z.union([targetEnum, z.string()]).optional()
const color = colorEnum.optional()
const variant = variantEnum.optional()
const reverse = z.boolean().optional()

function createBaseSchema() {
  return z.object({
    title,
    description,
  })
}

function createLinkSchema() {
  return z.object({
    label,
    to,
    icon,
    size,
    trailing,
    target,
    color,
    variant,
  })
}

const links = z.array(createLinkSchema()).optional()

/**
 * Clean schema for the Page Header.
 * Title and Description are optional to allow inheritance from root metadata.
 */
export const pageHeaderSchema = z.object({
  title: title.optional(),
  description: description.optional(),
  headline: headline.optional(),
  links: links.optional(),
})

export const pageHeroSchema = createBaseSchema().extend({
  as,
  headline,
  links,
  orientation,
  reverse,
})

export const pageSectionSchema = createBaseSchema().extend({
  as,
  headline,
  icon,
  links,
  orientation,
  reverse,
})
