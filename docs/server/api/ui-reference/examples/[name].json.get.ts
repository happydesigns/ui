import { createError, defineEventHandler, getRouterParam } from 'nuxt/server'
import { getExampleSource } from '../../../utils/uiReference'

export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name')
    ?? event.context.params?.name
    ?? event.context.params?.['name.json']
    ?? Object.values(event.context.params ?? {})[0]
    ?? ''
  const example = getExampleSource(name)

  if (!example) {
    if (!import.meta.dev) {
      return {
        name,
        code: '',
        source: null,
        missing: true,
      }
    }

    throw createError({
      status: 404,
      statusText: 'Example not found',
    })
  }

  return example
})
