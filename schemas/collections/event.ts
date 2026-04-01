import { defineTraitCollection } from 'nuxt-content-traits/utils'
import { categoryTrait } from '../traits/category'
import { datesTrait } from '../traits/dates'
import { linksTrait } from '../traits/links'
import { locationTrait } from '../traits/location'
import { seoTrait } from '../traits/seo'
import { statusTrait } from '../traits/status'

export const eventCollectionTraits = defineTraitCollection([
  datesTrait,
  locationTrait,
  categoryTrait,
  linksTrait,
  statusTrait,
  seoTrait,
])
