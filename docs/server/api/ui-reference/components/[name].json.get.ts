export default defineEventHandler((event) => {
  const rawName = getRouterParam(event, 'name') ?? ''
  const name = normalizeComponentName(rawName)
  const meta = getComponentReference(name)

  return {
    name,
    meta,
    source: getComponentSource(name),
  }
})
