<script setup lang="ts">
import type { HeaderProps, NavigationMenuItem, NavigationMenuProps } from '@nuxt/ui'

type NavigationProps = Omit<NavigationMenuProps, 'items' | 'orientation' | 'modelValue' | 'defaultValue' | 'type'>

interface Props extends HeaderProps {
  /** Override the app-config navigation for this header instance. */
  items?: NavigationMenuItem[]
  /** Props forwarded to the desktop navigation menu. */
  navigation?: NavigationProps
  /** Props forwarded to the mobile navigation menu. */
  mobileNavigation?: NavigationProps
}

const props = withDefaults(defineProps<Props>(), {
  autoClose: true,
  toggle: true,
})
const open = defineModel<boolean>('open', { default: false })

const { headerLinks } = useHeaderLinks()
const items = computed(() => props.items ?? headerLinks.value)
const headerProps = computed<HeaderProps>(() => ({
  as: props.as,
  autoClose: props.autoClose,
  class: props.class,
  menu: props.menu,
  mode: props.mode,
  title: props.title,
  to: props.to,
  toggle: props.toggle,
  toggleSide: props.toggleSide,
  ui: props.ui,
}))
</script>

<template>
  <UHeader v-model:open="open" v-bind="headerProps">
    <template v-if="$slots.left" #left="slotProps">
      <slot name="left" v-bind="slotProps" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <slot name="navigation" :items="items">
      <UNavigationMenu
        v-bind="props.navigation"
        :items="items"
        orientation="horizontal"
      />
    </slot>

    <template v-if="$slots.right" #right>
      <slot name="right" />
    </template>

    <template #body="slotProps">
      <slot name="body" v-bind="slotProps" :items="items">
        <slot name="body-before" :items="items" />
        <slot name="mobile-navigation" :items="items">
          <UNavigationMenu
            v-bind="props.mobileNavigation"
            :items="items"
            orientation="vertical"
          />
        </slot>
        <slot name="body-after" :items="items" />
      </slot>
    </template>

    <template v-if="$slots.content" #content="slotProps">
      <slot name="content" v-bind="slotProps" :items="items" />
    </template>

    <template v-if="$slots.top" #top>
      <slot name="top" />
    </template>

    <template v-if="$slots.bottom" #bottom>
      <slot name="bottom" />
    </template>
  </UHeader>
</template>
