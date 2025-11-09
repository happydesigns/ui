<script setup lang="ts">
import { HFooterColumnHeading } from '#components'

const appConfig = useAppConfig()
const footerButtons = appConfig?.app?.meta?.socials
</script>

<template>
  <USeparator icon="i-simple-icons-nuxtdotjs" class="h-px" />

  <UFooter>
    <template #top>
      <UContainer>
        <HFooterColumns>
          <template #right>
            <Snippet path="/snippets/address" :components="{ h3: HFooterColumnHeading }" class="text-sm" />
            <Snippet path="/snippets/contact" :components="{ h3: HFooterColumnHeading }" class="text-sm" />
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
</template>
