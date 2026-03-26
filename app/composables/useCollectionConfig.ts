import type { ArticleConfig, EventConfig } from '~/app.config'
import { createDefu } from 'defu'

/**
 * Custom defu that replaces arrays instead of merging them.
 * This is the standard way in defu to control array merging behavior.
 */
const defuReplace = createDefu((obj, key, value) => {
  if (Array.isArray(obj[key]) || Array.isArray(value)) {
    obj[key] = value
    return true
  }
})

/**
 * Resolves a collection configuration by recursively merging extended configurations.
 *
 * @param collectionName - The name of the collection to resolve configuration for.
 * @returns A computed property containing the resolved configuration.
 */
export function useCollectionConfig(collectionName: MaybeRefOrGetter<string | undefined>) {
  const appConfig = useAppConfig()

  return computed(() => {
    const name = toValue(collectionName)
    if (!name)
      return {} as Required<ArticleConfig & EventConfig>

    const resolveConfig = (colName: string, seen = new Set<string>()): any => {
      if (seen.has(colName)) {
        console.warn(`Circular dependency detected in collection extends: ${colName}`)
        return {}
      }
      seen.add(colName)

      const config = appConfig.app.collections?.[colName] || {}
      const baseName = config.extends

      if (baseName && baseName !== colName) {
        // We use defuReplace to ensure arrays (like breadcrumbs) are overwritten, not merged
        return defuReplace(config, resolveConfig(baseName, seen))
      }

      return config
    }

    return resolveConfig(name) as Required<ArticleConfig & EventConfig>
  })
}
