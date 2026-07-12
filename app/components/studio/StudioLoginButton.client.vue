<script setup lang="ts">
import type { StudioUser } from 'nuxt-studio/app'

withDefaults(defineProps<{
  /** Accessible label for the icon-only button. */
  ariaLabel?: string
  /** Icon rendered by the underlying UButton. */
  icon?: string
  /** Optional visible button label. */
  label?: string
}>(), {
  ariaLabel: 'Open Nuxt Studio',
  icon: 'i-lucide-log-in',
})

interface StudioSession {
  user?: StudioUser | null
}

const runtimeConfig = useRuntimeConfig()
const sessionCheckCookie = useCookie<string | null>('studio-session-check')
const sessionUser = ref<StudioUser | null | undefined>()

const studio = computed(() => runtimeConfig.public.studio)
const studioRoute = computed(() => studio.value.route || '/_studio')

onMounted(async () => {
  if (studio.value.dev) {
    return
  }

  if (String(sessionCheckCookie.value) !== 'true') {
    sessionUser.value = null
    return
  }

  try {
    const session = await $fetch('/__nuxt_studio/auth/session') as StudioSession
    sessionUser.value = session.user ?? null
  }
  catch {
    sessionUser.value = null
  }

  if (!sessionUser.value?.email) {
    sessionCheckCookie.value = null
  }
})

const isLoggedIn = computed(() => {
  if (studio.value.dev) {
    return true
  }

  if (String(sessionCheckCookie.value) !== 'true') {
    return false
  }

  if (sessionUser.value === undefined) {
    return true
  }

  return Boolean(sessionUser.value?.email)
})
</script>

<template>
  <UButton
    v-if="!isLoggedIn"
    :to="studioRoute"
    external
    :aria-label="ariaLabel"
    :icon="icon"
    :label="label"
    color="neutral"
    variant="outline"
    size="sm"
    class="fixed bottom-2 left-2 z-50 print:hidden"
  />
</template>
