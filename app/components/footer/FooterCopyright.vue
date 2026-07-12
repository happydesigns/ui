<script setup lang="ts">
const props = defineProps<{
  copyrightYear?: number
  copyrightHolder?: string
  /** Optional URL for the copyright holder. When omitted, the holder is rendered as plain text. */
  copyrightHomepage?: string
}>()

interface CopyrightConfig {
  copyrightHolder?: string
  copyrightHomepage?: string
}

const appConfig = useAppConfig()
const copyright = appConfig.app?.meta?.copyright as CopyrightConfig | undefined

const copyrightYear = props.copyrightYear ?? new Date().getFullYear()
const copyrightHolder = props.copyrightHolder ?? copyright?.copyrightHolder ?? ''
const copyrightHomepage = props.copyrightHomepage ?? copyright?.copyrightHomepage ?? ''
</script>

<template>
  <div>
    <template v-if="$slots.copyright">
      <slot name="copyright" :copyright-year :copyright-homepage :copyright-holder />
    </template>
    <template v-else>
      <p class="text-muted text-sm">
        Copyright © {{ copyrightYear }}
        <ULink v-if="copyrightHomepage" :to="copyrightHomepage">
          {{ copyrightHolder }}
        </ULink>
        <span v-else>{{ copyrightHolder }}</span>
      </p>
    </template>
  </div>
</template>
