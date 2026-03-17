/**
 * Resolves a page's header object by merging it with the page's title and description as fallbacks.
 *
 * @param page - The page object containing header, title, and description.
 * @returns The resolved header object or null if the page is missing.
 */
export default function resolvePageHeader(page: any) {
  if (!page) {
    return null
  }

  return {
    ...page.header,
    title: page.header?.title || page.title,
    description: page.header?.description || page.description,
  }
}
