/**
 * Resolves a category badge reactively using the global application configuration.
 *
 * @param category - The reactive category string to resolve.
 * @returns A computed property containing the resolved badge configuration.
 */
export function useCategoryBadge(category: MaybeRefOrGetter<string | undefined | null>) {
  const appConfig = useAppConfig()

  return computed(() => {
    const categoryKey = toValue(category)
    const categories = appConfig.app?.article?.categories

    if (categoryKey && categories && categoryKey in categories) {
      return categories[categoryKey]
    }

    return {
      label: categoryKey ?? '',
      color: 'primary',
    }
  })
}
