---
title: Composing a branded app shell
authors:
  - happydesigns
category: Guide
date: 2026-07-26
description: Build a responsive header and footer from shared navigation behavior while keeping the visible composition entirely project-owned.
published: true
toc: true
---

A good app shell feels specific to the website even when its behavior comes from a shared layer. The composition is local; the conventions underneath it are reusable.

## Start with route-aware links

`useHeaderLinks` and `useFooterLinks` resolve the project navigation and add active states for exact routes and their sections. External links remain external and never become active accidentally.

```vue [components/AppHeader.vue]
<script setup lang="ts">
const { headerLinks } = useHeaderLinks()
</script>

<template>
  <UHeader>
    <UNavigationMenu :items="headerLinks" />
  </UHeader>
</template>
```

## Compose the visible brand locally

The project decides how the wordmark, primary action, search trigger, mobile navigation, and footer columns fit together. Shared components provide consistent mechanics, not a mandatory visual identity.

## Check the shell at the edges

Test narrow screens, long labels, nested routes, keyboard focus, and both color modes. Those edge cases determine whether a shell is genuinely reusable.
## Keep the composition honest

| Layer responsibility | Local responsibility |
| --- | --- |
| Resolve active links | Arrange the desktop and mobile navigation |
| Provide search behavior | Choose where the search trigger appears |
| Preserve accessible focus | Apply the project’s visual identity |

The playground header demonstrates this split directly: its wordmark, documentation action, and responsive arrangement are local, while route state and search come from the layer.

## Verify the interaction contract

1. Reach every action with the keyboard.
2. Open and close mobile navigation without losing focus.
3. Confirm that a nested route keeps its parent section active.
4. Repeat the check in both color modes and at narrow widths.
