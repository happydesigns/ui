<script setup lang="ts">
const appConfig = useAppConfig()
const footerButtons = appConfig?.app?.meta?.socials
</script>

<template>
  <UFooter>
    <template #top>
      <UContainer>
        <HFooterColumns>
          <template #right>
            <Snippet path="/snippets/address" :prose="false" class="text-sm" />
            <Snippet path="/snippets/contact" :prose="false" class="text-sm" />
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
