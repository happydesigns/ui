<script setup lang="ts">
import type { FooterLink } from '#ui-pro/types'

interface FooterColumn {
  label: string
  children: FooterLink[]
}

interface FooterSocial {
  icon: string
  to: string
  label?: string
}

const props = defineProps<{
  links: FooterColumn[]
  socials: FooterSocial[]
  copyright?: string
  class?: string
  ui?: Partial<typeof config.value>
  columns?: { left?: number, links?: number, right?: number }
}>()

const appConfig = useAppConfig()
const copyrightOwner = appConfig.meta.copyright.name

const year = new Date().getFullYear()
const copyrightDefault = `Copyright © ${year} ${copyrightOwner}`

const leftColumnCount = (props.columns?.left ?? 0) as number
const linkColumnCount = (props.columns?.links ?? props.links.length ?? 0) as number
const rightColumnCount = (props.columns?.right ?? 0) as number

const lgColumnCount = Math.max(leftColumnCount, linkColumnCount, rightColumnCount)
const totalColumnCount = ((props.columns?.left ?? 0) + linkColumnCount + (props.columns?.right ?? 0)) as number

const config = computed(() => ({
  footer: {
    wrapper: '',
    top: {
      wrapper: 'border-t border-gray-200 dark:border-gray-800',
      container: 'py-8 lg:py-12',
    },
    bottom: {
      wrapper: 'border-t border-gray-200 dark:border-gray-800',
      container: '!py-6',
      left: '~',
      center: '~',
      right: '~',
    },
  },
  footerColumns: {
    wrapper: `xl:grid-cols-${totalColumnCount}`,
    left: `lg:grid-cols-${lgColumnCount} xl:grid-cols-none col-span-${leftColumnCount}`,
    center: `xl:col-span-${linkColumnCount}`,
    right: `lg:grid-cols-${lgColumnCount} xl:grid-cols-none col-span-${rightColumnCount}`,
    label: '',
    list: '',
    base: '',
    active: '',
    inactive: '',
    externalIcon: {
      name: '',
      base: '',
    },
  },
}))

const { ui: uiFooter, attrs: uiAttrs } = useUI('footer', toRef(props.ui?.footer), config.value.footer, toRef(props.class ?? ''), true)
const { ui: uiFooterColumns } = useUI('footer.columns', toRef(props.ui?.footerColumns), config.value.footerColumns)
</script>

<template>
  <UFooter :ui="uiFooter" v-bind="uiAttrs">
    <template #top>
      <UFooterColumns :links="links" :ui="uiFooterColumns">
        <template #left>
          <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:grid-cols-none" :class="[`grid-cols-${lgColumnCount}`]">
            <slot name="left" />
          </div>
        </template>
        <template #right>
          <div class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:grid-cols-none" :class="[`grid-cols-${lgColumnCount}`]">
            <slot name="right" />
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        {{ copyright ?? copyrightDefault }}
      </p>
    </template>

    <template #right>
      <div class="-ml-[0.375rem] flex space-x-4">
        <div v-for="(social, socialIndex) in socials" :key="socialIndex">
          <UButton
            :aria-label="social.label"
            :to="social.to"
            target="_blank"
            :icon="social.icon"
            v-bind="($ui.button.secondary as any)"
          />
        </div>
      </div>
    </template>
  </UFooter>
</template>
