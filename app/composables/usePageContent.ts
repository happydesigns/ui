import type { Collections } from '@nuxt/content'
import type { AsyncData } from 'nuxt/app'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

interface UsePageContentOptions<C extends keyof Collections = 'page'> {
  path?: MaybeRefOrGetter<string | undefined>
  collection?: MaybeRefOrGetter<C>
}

/**
 * Composable to fetch content from a Nuxt Content collection.
 *
 * @param options - Configuration options for fetching content
 * @param options.path - Optional path to fetch. Defaults to current route path.
 * @param options.collection - Optional collection to fetch from. Defaults to 'page'.
 */
export function usePageContent<C extends keyof Collections = 'page', B = object>(
  { path, collection }: UsePageContentOptions<C> = {},
) {
  const route = useRoute()
  const resolvedPath = computed(() => toValue(path) ?? route.path)
  const resolvedCollection = computed(() => (toValue(collection) ?? ('page' as C)) as C)
  const key = computed(() => `${String(resolvedCollection.value)}:${resolvedPath.value}`)

  const handler = () => queryCollection(resolvedCollection.value as keyof Collections).path(resolvedPath.value).first()

  return useAsyncData(key, handler, {
    watch: [resolvedPath, resolvedCollection],
  }) as unknown as AsyncData<(Collections[C] & B) | null, Error | null>
}
