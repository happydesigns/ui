import type { Collections } from '@nuxt/content'

interface UsePageContentOptions<C extends keyof Collections = 'content'> {
  path?: string
  collection?: C
}

export function usePageContent<C extends keyof Collections = 'content'>(
  { path, collection = 'content' as C }: UsePageContentOptions<C> = {},
) {
  const route = useRoute()
  const key = path || route.path
  const handler = () => queryCollection(collection).path(key).first()
  return useAsyncData(key, handler, { watch: [() => key] })
}
