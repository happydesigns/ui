export function getPageLayoutUi(hasToc: boolean) {
  return {
    root: 'lg:grid-cols-12',
    center: hasToc ? 'lg:col-span-9' : 'lg:col-span-12',
    right: 'lg:col-span-3',
  }
}
