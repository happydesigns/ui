export default defineEventHandler(() => {
  return {
    collections: getCollectionReferences(),
  }
})
