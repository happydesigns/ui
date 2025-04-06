<script setup lang="ts" generic="T extends FooterColumnLink">
import type { FooterColumnLink, FooterColumnsProps, FooterColumnsSlots } from '@nuxt/ui-pro'
import { tv } from 'tailwind-variants'

// interface FooterColumn {
//   label: string
//   children: FooterLink[]
// }

// const props = defineProps<{
//   links?: FooterColumn[]
//   copyright?: string
//   class?: string
//   ui?: Partial<typeof config.value>
// }>()

interface HFooterColumnProps<T> extends /* @vue-ignore */ FooterColumnsProps<T> {
}

const props = defineProps<HFooterColumnProps<T>>()
const slots = defineSlots<FooterColumnsSlots<T>>()

const appConfig = useAppConfig()
const columns = props.columns ?? appConfig?.app?.footer?.links ?? []

const leftColumnCount = slots.left ? slots.left({}).length : 0
const centerColumnCount = (columns.length ?? 0) as number
const rightColumnCount = slots.right ? slots.right({}).length : 0

const lgColumnCount = Math.max(leftColumnCount, centerColumnCount, rightColumnCount)
const totalColumnCount = leftColumnCount + centerColumnCount + rightColumnCount

const footerColumns = tv({
  slots: appConfig.uiPro?.footerColumns?.slots || {},
  // extend: props.ui,
})

const ui = footerColumns()
</script>

<template>
  <UFooterColumns :columns="appConfig.app?.footer?.links" :ui="{ root: 'xl:grid-cols-2 bg-red-500' }">
    <template #left>
      <template v-if="$slots.left">
        <div class="bg-red-500">
          {{ lgColumnCount }} {{ totalColumnCount }}
          <slot name="left" />
        </div>
      </template>
    </template>
    <template #right>
      <template v-if="$slots.right">
        <slot name="right" />
      </template>
      <!-- <div :class="ui?.center?.()" class="flex flex-col lg:grid grid-flow-col auto cols-fr gap-8 xl:col-span-2 grid-cols-3 xl:grid-cols-none text-sm">
        <Snippet path="/snippets/address" :prose="false" />
        <Snippet path="/snippets/contact" :prose="false" />
      </div> -->
    </template>
  </UFooterColumns>
</template>
