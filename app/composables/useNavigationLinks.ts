import type { FooterColumn, FooterColumnLink, NavigationMenuItem } from '@nuxt/ui'
import { createSharedComposable } from '@vueuse/core'

function withActiveState<T extends { to?: unknown, children?: T[] }>(items: T[], currentPath: string): T[] {
  return items.map((item) => {
    const children = item.children ? withActiveState(item.children, currentPath) : undefined

    return {
      ...item,
      ...(children ? { children } : {}),
      active: isNavigationTargetActive(currentPath, item.to)
        || Boolean(children?.some(child => 'active' in child && child.active)),
    }
  })
}

function _useHeaderLinks() {
  const appConfig = useAppConfig()
  const route = useRoute()
  const headerLinks = computed(() => withActiveState(
    (appConfig.app.links.header ?? []) as NavigationMenuItem[],
    route.path,
  ))

  return { headerLinks }
}

function _useFooterLinks() {
  const appConfig = useAppConfig()
  const route = useRoute()
  const footerLinks = computed(() => ((appConfig.app.links.footer ?? []) as FooterColumn[]).map(column => ({
    ...column,
    children: withActiveState((column.children ?? []) as FooterColumnLink[], route.path),
  })))

  return { footerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks
export const useFooterLinks = import.meta.client ? createSharedComposable(_useFooterLinks) : _useFooterLinks
