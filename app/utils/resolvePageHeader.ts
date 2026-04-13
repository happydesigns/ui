import type { PageCollectionItemBase } from '@nuxt/content'
import type { PageHeaderProps } from '@nuxt/ui'

export default function resolvePageHeader(page: Partial<PageCollectionItemBase> | null | undefined): PageHeaderProps | null {
  if (!page) {
    return null
  }

  const { header } = page as PageCollectionItemBase & { header?: Partial<PageHeaderProps> }

  return {
    ...header,
    title: header?.title ?? page.title,
    description: header?.description ?? page.description,
  }
}
