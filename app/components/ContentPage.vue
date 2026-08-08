<script setup lang="ts" generic="C extends PageCollectionName = 'page'">
import type { PageCollectionItemBase } from '@nuxt/content'
import type { PageCollectionName } from '../types/content'

defineOptions({ inheritAttrs: false })

const {
  collection = 'page' as C,
  path,
  page: suppliedPage,
} = defineProps<{
  /** Consumer-owned page collection. */
  collection?: C
  /** Route path override. The current route path is used by default. */
  path?: string
  /** Already resolved document, useful when a route needs project-specific side effects. */
  page?: PageCollectionItemBase | null
}>()

const fetched = suppliedPage === undefined
  ? await usePageContent<C>({
      collection: () => collection,
      path: () => path,
    })
  : undefined

const page = computed(() => suppliedPage === undefined ? fetched?.data.value : suppliedPage)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `${collection} ${path || useRoute().path} not found`,
    fatal: true,
  })
}
</script>

<template>
  <NuxtLayout
    v-if="page"
    name="content"
    :collection="collection"
    :path="path"
    :page="page"
  >
    <slot :page="page">
      <ContentRenderer
        :value="page"
        class="h-content"
        v-bind="$attrs"
      />
    </slot>
  </NuxtLayout>
</template>
