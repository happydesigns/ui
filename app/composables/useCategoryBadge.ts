/**
 * Resolves a category badge reactively using the global application configuration.
 *
 * @param category - The reactive category string to resolve.
 * @param collection - The collection to resolve categories for. Defaults to 'article'.
 * @returns A computed property containing the resolved badge configuration.
 */
export function useCategoryBadge(
  category: MaybeRefOrGetter<string | undefined | null>,
  collection: MaybeRefOrGetter<string> = 'article',
) {
  const config = useCollectionConfig(collection)

  return computed(() => {
    const categoryKey = toValue(category)
    const categories = config.value.categories

    if (categoryKey && categories && categoryKey in categories) {
      return categories[categoryKey]
    }

    return {
      label: categoryKey ?? '',
      color: 'primary',
    }
  })
}
