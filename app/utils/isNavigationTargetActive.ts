export function isNavigationTargetActive(currentPath: string, target?: unknown): boolean {
  if (typeof target !== 'string' || !target.startsWith('/') || target.startsWith('//')) {
    return false
  }

  const targetPath = target.split(/[?#]/, 1)[0] || '/'
  const normalizedCurrent = currentPath === '/' ? '/' : currentPath.replace(/\/+$/, '')
  const normalizedTarget = targetPath === '/' ? '/' : targetPath.replace(/\/+$/, '')

  return normalizedCurrent === normalizedTarget
    || (normalizedTarget !== '/' && normalizedCurrent.startsWith(normalizedTarget.concat('/')))
}
