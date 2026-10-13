import { defineEventHandler } from 'nuxt/server'
import { getVariantReferences } from '../../utils/uiReference'

export default defineEventHandler(() => {
  return {
    variants: getVariantReferences(),
  }
})
