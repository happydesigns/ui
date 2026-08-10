import type { HAppConfig, HAppConfigInput } from '../../app/types/config'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    app?: HAppConfigInput
  }

  interface AppConfig {
    app: HAppConfig
  }
}

export {}
