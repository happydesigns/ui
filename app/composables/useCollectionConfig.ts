import type { ArticleConfig, EventConfig } from '~/app.config'

/**
 * Resolves a collection configuration from app.config.
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

    return (appConfig.content.collections?.[name] || {}) as Required<ArticleConfig & EventConfig>
  })
}
