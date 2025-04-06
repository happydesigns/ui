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
      Main
    </UMain>

    <!-- <HFooter /> -->

    <!-- <UFooter>
      <template #top>
        <UContainer>
          <HFooterColumns />
        </UContainer>
      </template>

      <template #left>
        <HFooterCopyright />
      </template>

      <template #right>
        <HFooterButtons :buttons="footerButtons" />
      </template>
    </UFooter> -->

    <!-- <HFooter /> -->

    <!-- <HFooter>
      <template #left>
        <p>Left 1</p>
      </template>
      <template #right>
        <p>Right 1</p>
        <p>Right 2</p>
      </template>
      <template #copyright="{ copyrightYear, copyrightHolder, copyrightHomepage }">
        <p class="text-gray-500 dark:text-gray-400 text-sm">
          Copyright © {{ copyrightYear }}
          <NuxtLink :to="copyrightHomepage">
            {{ copyrightHolder }}
          </NuxtLink>
        </p>
      </template>
    </HFooter> -->
  </UApp>
</template>
