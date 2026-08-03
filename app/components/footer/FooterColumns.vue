<script setup lang="ts" generic="T extends FooterColumnLink">
import type { FooterColumn, FooterColumnLink, FooterColumnsProps, FooterColumnsSlots, SlotClass } from '@nuxt/ui'
import { useAppConfig } from '#imports'

interface HFooterColumnProps<T extends FooterColumnLink> extends /* @vue-ignore */ FooterColumnsProps<T> {
  /** Fixed column count from the lg breakpoint. Defaults to responsive auto-fit. */
  lgCols?: number
  /** Fixed column count from the xl breakpoint. Defaults to responsive auto-fit. */
  xlCols?: number
}

const props = defineProps<HFooterColumnProps<T>>()
const slots = defineSlots<FooterColumnsSlots<T>>()
const appConfig = useAppConfig()

const footerColumns = computed<FooterColumn<T>[]>(() => (
  props.columns
  ?? (appConfig.app.links.footer as FooterColumn<T>[] | undefined)
  ?? []
))

const hasLeft = Boolean(slots.left)
const hasRight = Boolean(slots.right)

function withLayoutClass(base: string, override?: SlotClass): SlotClass {
  if (typeof override === 'function')
    return defaults => [base, override(defaults)]

  return [base, override]
}

const ui = computed(() => ({
  ...props.ui,
  root: withLayoutClass('footer-cols-root all:grid grid-flow-row gap-y-12 gap-x-8', props.ui?.root),
  left: withLayoutClass('footer-cols-left', props.ui?.left),
  center: withLayoutClass('footer-cols-center', props.ui?.center),
  right: withLayoutClass('footer-cols-right', props.ui?.right),
}))

const layoutStyle = computed(() => ({
  ...(props.lgCols === undefined ? {} : { '--cols-lg': props.lgCols }),
  ...(props.xlCols === undefined ? {} : { '--cols-xl': props.xlCols }),
}))
</script>

<template>
  <UFooterColumns
    v-bind="props"
    :columns="footerColumns"
    :ui="ui"
    :style="layoutStyle"
  >
    <template v-if="hasLeft" #left>
      <slot name="left" />
    </template>
    <template v-if="hasRight" #right>
      <slot name="right" />
    </template>
  </UFooterColumns>
</template>
