import type { PageCollectionItemBase, PageCollections } from '@nuxt/content'
import type { AsyncData } from 'nuxt/app'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

type PageForCollection<C extends string> = C extends keyof PageCollections
  ? PageCollections[C]
  : PageCollectionItemBase

interface UsePageContentOptions<C extends string = 'page'> {
  path?: MaybeRefOrGetter<string | undefined>
  collection?: MaybeRefOrGetter<C>
}

/**
 * Fetches a page without requiring the layer to own its collection definition.
 * Known consumer collection names retain their generated Nuxt Content type.
 */
export function usePageContent<C extends string = 'page', B extends object = object>(
  { path, collection }: UsePageContentOptions<C> = {},
) {
  const route = useRoute()
  const resolvedPath = computed(() => toValue(path) ?? route.path)
  const resolvedCollection = computed(() => (toValue(collection) ?? ('page' as C)) as C)
  const key = computed(() => `${resolvedCollection.value}:${resolvedPath.value}`)

  const handler = () => queryCollection(resolvedCollection.value as keyof PageCollections)
    .path(resolvedPath.value)
    .first()

  return useAsyncData(key, handler) as unknown as AsyncData<(PageForCollection<C> & B) | null, Error | null>
}
