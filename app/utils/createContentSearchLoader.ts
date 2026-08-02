export interface ContentSearchLoaders<TNavigation, TFiles> {
  navigation: () => Promise<TNavigation>
  files: () => Promise<TFiles>
}

export interface ContentSearchLoaderCallbacks<TNavigation, TFiles> {
  success: (navigation: TNavigation, files: TFiles) => void
  error: (error: Error) => void
  pending?: () => void
}

export function createContentSearchLoader<TNavigation, TFiles>(
  loaders: ContentSearchLoaders<TNavigation, TFiles>,
  callbacks: ContentSearchLoaderCallbacks<TNavigation, TFiles>,
) {
  let loaded = false
  let pendingRequest: Promise<void> | undefined

  async function load() {
    if (loaded) {
      return
    }

    if (pendingRequest) {
      return pendingRequest
    }

    callbacks.pending?.()
    pendingRequest = Promise.all([loaders.navigation(), loaders.files()])
      .then(([navigation, files]) => {
        loaded = true
        callbacks.success(navigation, files)
      })
      .catch((cause: unknown) => {
        callbacks.error(cause instanceof Error ? cause : new Error(String(cause)))
      })
      .finally(() => {
        pendingRequest = undefined
      })

    return pendingRequest
  }

  return { load }
}
