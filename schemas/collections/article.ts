import { defineTraitCollection } from 'nuxt-content-traits/utils'
import { authorsTrait } from '../traits/authors'
import { categoryTrait } from '../traits/category'
import { datesTrait } from '../traits/dates'
import { seoTrait } from '../traits/seo'
import { statusTrait } from '../traits/status'

export const articleCollectionTraits = defineTraitCollection([
  datesTrait,
  authorsTrait,
  categoryTrait,
  statusTrait,
  seoTrait,
])
