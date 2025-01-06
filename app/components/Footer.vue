<script setup lang="ts">
import type { FooterLink } from '#ui-pro/types'

interface FooterColumn {
  label: string
  children: FooterLink[]
}

export interface FooterSocial {
  icon: string
  to: string
  label?: string
}

const props = defineProps<{
  links?: FooterColumn[]
  socials?: FooterSocial[]
  copyright?: string
  class?: string
  ui?: Partial<typeof config.value>
}>()

const appConfig = useAppConfig()
const { holder: copyrightHolder, homepage: copyrightHomepage } = appConfig.app?.meta?.copyright ?? {}
const copyrightYear = new Date().getFullYear()

const links = props.links ?? appConfig?.app?.footer?.links ?? []
const socials = props.socials ?? appConfig?.app?.footer?.socials ?? []

const slots = useSlots()
const leftColumnCount = slots.left ? slots.left({}).length : 0
const linkColumnCount = (links.length ?? 0) as number
const rightColumnCount = slots.right ? slots.right({}).length : 0

const lgColumnCount = Math.max(leftColumnCount, linkColumnCount, rightColumnCount)
const totalColumnCount = leftColumnCount + linkColumnCount + rightColumnCount

const config = computed((): { wrapper: string, footer: any, footerColumns: any } => ({
  wrapper: '~',
  footer: {
    top: {
      wrapper: '~ border-t border-gray-200 dark:border-gray-800',
      container: '~',
    },
    bottom: {
      wrapper: '~ border-t border-gray-200 dark:border-gray-800',
      container: '~ !py-6',
      left: '~',
      center: '~',
      right: '~',
    },
  },
  footerColumns: {
    wrapper: `~ xl:grid-cols-${totalColumnCount}`,
    left: `~ lg:grid-cols-${lgColumnCount} xl:grid-cols-none col-span-${leftColumnCount}`,
    center: `~ xl:col-span-${linkColumnCount}`,
    right: `~ lg:grid-cols-${lgColumnCount} xl:grid-cols-none col-span-${rightColumnCount}`,
    label: '~',
    base: '~',
    active: '~',
    inactive: '~',
    externalIcon: {
      name: '~',
      base: '~',
    },
  },
}))

const { ui: uiFooter, attrs: uiAttrs } = useUI('footer', toRef(props.ui?.footer), config.value.footer, toRef(props.class ?? ''), true)
const { ui: uiFooterColumns } = useUI('footer.columns', toRef(props.ui?.footerColumns), config.value.footerColumns)
</script>

<template>
  <UFooter :ui="uiFooter" v-bind="uiAttrs">
    <template #top>
      <UFooterColumns :links :ui="uiFooterColumns">
        <template #left>
          <div
            class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:grid-cols-none"
            :class="[`lg:grid-cols-${lgColumnCount}`]"
          >
            <slot name="left" />
          </div>
        </template>
        <template #right>
          <div
            class="flex flex-col lg:grid grid-flow-col auto-cols-fr gap-8 xl:grid-cols-none"
            :class="[`lg:grid-cols-${lgColumnCount}`]"
          >
            <slot name="right" />
          </div>
        </template>
      </UFooterColumns>
    </template>

    <template #left>
      <div class="text-gray-500 dark:text-gray-400 text-sm">
        <template v-if="$slots.copyright">
          <slot name="copyright" :copyright-year :copyright-homepage :copyright-holder />
        </template>
        <template v-else>
          Copyright © {{ copyrightYear }}
          <NuxtLink :to="copyrightHomepage">
            {{ copyrightHolder }}
          </NuxtLink>
        </template>
      </div>
    </template>

    <template #right>
      <div class="-ml-[0.375rem] flex space-x-4">
        <div v-for="(social, socialIndex) in socials" :key="socialIndex">
          <UButton
            target="_blank"
            :aria-label="social.label"
            :to="social.to"
            :icon="social.icon"
            v-bind="($ui.button.secondary as any)"
          />
        </div>
      </div>
    </template>
  </UFooter>
</template>
