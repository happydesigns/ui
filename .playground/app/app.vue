<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

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
  <UApp>
    <UHeader>
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter>
      <template #top>
        <UContainer>
          <HFooterColumns>
            <template #left>
              left
            </template>
            <template #right>
              right
            </template>
          </HFooterColumns>
        </UContainer>
      </template>

      <template #left>
        <HFooterCopyright />
      </template>

      <template #right>
        <HFooterButtons :buttons="footerButtons" />
      </template>
    </UFooter>
  </UApp>
</template>
