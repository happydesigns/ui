import type { Collections } from '@nuxt/content'
import type { MaybeRefOrGetter } from 'vue'
import { computed, toValue } from 'vue'

interface UsePageContentOptions<C extends keyof Collections = 'page'> {
  path?: MaybeRefOrGetter<string | undefined>
  collection?: MaybeRefOrGetter<C>
}

export function usePageContent<C extends keyof Collections = 'page'>(
  { path, collection }: UsePageContentOptions<C> = {},
) {
  const route = useRoute()
  const resolvedPath = computed(() => toValue(path) ?? route.path)
  const resolvedCollection = computed(() => (toValue(collection) ?? ('page' as C)) as C)
  const key = computed(() => `${String(resolvedCollection.value)}:${resolvedPath.value}`)

  const handler = () => queryCollection(resolvedCollection.value).path(resolvedPath.value).first()
  return useAsyncData(key, handler, { watch: [resolvedPath, resolvedCollection] })
}
