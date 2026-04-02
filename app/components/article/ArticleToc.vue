<script setup lang="ts">
import type { PageCollections } from '@nuxt/content'

const props = defineProps<{
  page?: any
  collection?: keyof PageCollections
}>()

const appConfig = useAppConfig()
const { hasTrait } = useCollectionTraits(props.collection || 'article')

const show = computed(() =>
  hasTrait('toc')
  && props.page?.toc !== false
  && props.page?.body?.toc?.links?.length,
)
</script>

<template>
  <UContentToc
    v-if="show"
    :links="page.body.toc.links"
    :title="page.body.toc.title || appConfig.app.toc?.title"
  />
</template>
