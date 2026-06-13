export default defineEventHandler((event) => {
  const name = getRouterParam(event, 'name') ?? ''
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
      statusCode: 404,
      statusMessage: 'Example not found',
    })
  }

  return example
})
