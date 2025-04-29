<script setup lang="ts" generic="T extends FooterColumnLink">
import type { FooterColumn, FooterColumnLink, FooterColumnsProps, FooterColumnsSlots } from '@nuxt/ui-pro'
import { useAppConfig } from '#imports'

interface HFooterColumnProps<T> extends /* @vue-ignore */ FooterColumnsProps<T> {
  lgCols?: number
  xlCols?: number
}

const props = defineProps<HFooterColumnProps<T>>()
const slots = defineSlots<FooterColumnsSlots<T>>()
const appConfig = useAppConfig()

const footerColumns: FooterColumn<T>[] = props.columns
  ?? (appConfig?.app?.links?.footer as FooterColumn<T>[] | undefined)
  ?? []

const leftCount = slots.left ? slots.left({}).length : 0
const centerCount = footerColumns?.length ?? 0
const rightCount = slots.right ? slots.right({}).length : 0

const lgCount = Math.max(leftCount, centerCount, rightCount)
const totalCount = leftCount + centerCount + rightCount

const ui = {
  root: 'grid gap-8 grid-flow-row footer-cols-root',
  left: 'footer-cols-left',
  center: 'footer-cols-center',
  right: 'footer-cols-right',
}
</script>

<template>
  <UFooterColumns
    v-bind="props" :columns="footerColumns" :ui
    :style="{
      '--cols-sm': 1,
      '--cols-lg': props.lgCols ?? lgCount,
      '--cols-xl': props.xlCols ?? totalCount,
      '--span-left': leftCount,
      '--span-center': centerCount,
      '--span-right': rightCount,
    }"
  >
    <template v-if="leftCount > 0" #left>
      <slot name="left" />
    </template>
    <template v-if="rightCount > 0" #right>
      <slot name="right" />
    </template>
  </UFooterColumns>
</template>

<style>
@import "tailwindcss";

.footer-cols-left {
  grid-column: span var(--span-left);
}

.footer-cols-center {
  grid-column: span var(--span-center);
}

.footer-cols-right {
  grid-column: span var(--span-right);
}

.footer-cols-left,
.footer-cols-center,
.footer-cols-right {
  display: contents;
}
.footer-cols-root {
  grid-template-columns: repeat(var(--cols-sm), minmax(0, 1fr));
}

@media (min-width: theme(--breakpoint-lg)) {
  .footer-cols-root {
    grid-template-columns: repeat(var(--cols-lg), minmax(0, 1fr));
  }
}

@media (min-width: theme(--breakpoint-xl)) {
  .footer-cols-root {
    grid-template-columns: repeat(var(--cols-xl), minmax(0, 1fr));
  }
}

.footer-cols-root p:last-child {
  margin-bottom: 0;
}
</style>
