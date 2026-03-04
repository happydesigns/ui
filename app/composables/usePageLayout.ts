export interface PageWithLayout {
  title?: string
  description?: string
  layout?: {
    metadataComponent?: 'none' | 'header' | 'hero'
    container?: boolean
    toc?: boolean
    prose?: boolean
  }
  hero?: Record<string, unknown>
  header?: Record<string, unknown>
}

export function usePageLayout<T extends PageWithLayout>(page: Ref<T | null | undefined>) {
  const metadata = computed(() => page.value?.layout || {})

  const activeComponent = computed(() => metadata.value.metadataComponent || 'header')

  const heroProps = computed(() => {
    if (activeComponent.value !== 'hero') return null
    return {
      title: page.value?.title,
      description: page.value?.description,
      ...page.value?.hero,
    }
  })

  const headerProps = computed(() => {
    if (activeComponent.value !== 'header') return null
    return {
      title: page.value?.title,
      description: page.value?.description,
      ...page.value?.header,
    }
  })

  const isContainer = computed(() => metadata.value.container !== false)
  const isProse = computed(() => metadata.value.prose !== false)
  const hasToc = computed(() => !!metadata.value.toc)

  const containerClass = computed(() =>
    !isContainer.value ? 'px-0 max-w-none' : undefined,
  )

  return {
    activeComponent,
    heroProps,
    headerProps,
    containerClass,
    isProse,
    hasToc,
  }
}

