import { defineTraitCollection } from 'nuxt-content-traits/utils'
import { layoutTrait } from '../traits/layout'
import { seoTrait } from '../traits/seo'

export const pageCollectionTraits = defineTraitCollection([
  layoutTrait,
  seoTrait,
])
