export default defineNuxtPlugin(async () => {
  const { data: settings } = await useAsyncData('site-settings', () => queryCollection('settings').first())

  watchEffect(() => {
    if (!settings.value)
      return

    updateAppConfig({
      variants: {
        copyButton: {
          config: {
            copyButton: settings.value.copyButton,
          },
        },
      },
    })
  })
})
