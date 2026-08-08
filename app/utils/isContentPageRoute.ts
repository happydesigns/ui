interface ContentRouteLocation {
  path?: string
  fullPath?: string
}

const FILE_PATH_PATTERN = /\/[^/]+\.[0-9a-z]+$/i

/**
 * Keeps a catch-all content page away from Nuxt internals, API routes and
 * requests that look like public files.
 */
export function isContentPageRoute(route: ContentRouteLocation): boolean {
  const path = route.path ?? route.fullPath?.split(/[?#]/, 1)[0] ?? ''

  if (path.startsWith('/_') || path === '/api' || path.startsWith('/api/')) {
    return false
  }

  return !FILE_PATH_PATTERN.test(path)
}
