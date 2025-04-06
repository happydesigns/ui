<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'
// import type { FooterProps } from '@nuxt/ui-pro'
// import { tv } from 'tailwind-variants'

// interface AppFooterProps extends /* @vue-ignore */ FooterProps {
// }

// const props = defineProps<AppFooterProps>()
const appConfig = useAppConfig()
const columns = appConfig?.app?.footer?.links ?? []

// const footer = tv({
//   slots: appConfig.uiPro?.footer?.slots || {},
//   extend: props.ui,
// })

// const ui = footer({ class: props.class })

const footerButtons: ButtonProps[] = [
  {
    icon: 'i-simple-icons-discord',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://chat.nuxt.dev',
    target: '_blank',
  },
  {
    icon: 'i-simple-icons-x',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://x.com/nuxt_js',
    target: '_blank',
  },
  {
    icon: 'i-simple-icons-github',
    color: 'neutral',
    variant: 'ghost',
    to: 'https://github.com/nuxt/nuxt',
    target: '_blank',
  },
]
</script>

<template>
  <UFooter>
    <template #top>
      <UContainer>
        <HFooterColumns :columns />
      </UContainer>
    </template>

    <template #left>
      <HFooterCopyright />
    </template>

    <template #right>
      <HFooterButtons :buttons="footerButtons" />
    </template>
  </UFooter>
</template>
