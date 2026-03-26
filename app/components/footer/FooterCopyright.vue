<script setup lang="ts">
const props = defineProps<{
  copyrightYear?: number
  copyrightHolder?: string
  copyrightHomepage?: string
}>()

const appConfig = useAppConfig()

const copyrightYear = props.copyrightYear ?? new Date().getFullYear()
const copyrightHolder = props.copyrightHolder ?? appConfig.app?.meta?.copyright?.copyrightHolder ?? ''
const copyrightHomepage = props.copyrightHomepage ?? appConfig.app?.meta?.copyright?.copyrightHomepage ?? ''
</script>

<template>
  <div>
    <template v-if="$slots.copyright">
      <slot name="copyright" :copyright-year :copyright-homepage :copyright-holder />
    </template>
    <template v-else>
      <p class="text-muted text-sm">
        Copyright © {{ copyrightYear }}
        <ULink :to="copyrightHomepage" target="_blank">
          {{ copyrightHolder }}
        </ULink>
      </p>
    </template>
  </div>
</template>
