export default defineEventHandler((event) => {
  const rawName = getRouterParam(event, 'name')
    ?? event.context.params?.name
    ?? event.context.params?.['name.json']
    ?? Object.values(event.context.params ?? {})[0]
    ?? ''
  const name = normalizeComponentName(rawName)
  const meta = getComponentReference(name)

  return {
    name,
    meta,
    source: getComponentSource(name),
  }
})
