import type { ContentNavigationItem } from '@nuxt/content'
import type { ContentSearchFile } from '@nuxt/ui'
import { createContentSearchLoader } from '../utils/createContentSearchLoader'

export interface ContentSearchDataLoaders {
  navigation?: () => Promise<ContentNavigationItem[]>
  files?: () => Promise<ContentSearchFile[]>
}

export function useContentSearchData(loaders: ContentSearchDataLoaders = {}) {
  const navigation = shallowRef<ContentNavigationItem[]>([])
  const files = shallowRef<ContentSearchFile[]>([])
  const status = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
  const error = shallowRef<Error>()

  const loader = createContentSearchLoader({
    navigation: loaders.navigation ?? (() => $fetch<ContentNavigationItem[]>('/api/navigation.json')),
    files: loaders.files ?? (() => $fetch<ContentSearchFile[]>('/api/search.json')),
  }, {
    pending: () => {
      status.value = 'pending'
      error.value = undefined
    },
    success: (loadedNavigation, loadedFiles) => {
      navigation.value = loadedNavigation
      files.value = loadedFiles
      status.value = 'success'
    },
    error: (cause) => {
      error.value = cause
      status.value = 'error'
    },
  })

  return {
    navigation,
    files,
    status,
    error,
    load: loader.load,
  }
}
