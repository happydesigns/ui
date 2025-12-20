---
layout:
  metadataComponent: hero
  container: true
  toc: true
  prose: true
hero:
  title: "Welcome to Nuxt Layer Base"
  description: "A modern Nuxt starter with typed content schemas and beautiful UI."
  icon: "i-lucide-rocket"
  ui:
    root: "bg-gradient-to-r from-blue-100 to-blue-300 text-blue-900"
    title: "text-5xl font-bold"
    description: "mt-4 text-lg"
  links:
    - label: "Get Started"
      to: "/getting-started"
      color: primary
      size: xl
    - label: "Nuxt UI Docs"
      to: "https://ui.nuxt.com/"
      color: neutral
      size: lg
header:
  title: "Explore the Features"
  description: "See how to configure layout, UI, and content schemas."
  headline: "Nuxt Layer Base Demo"
  icon: "i-lucide-sparkles"
  links:
    - label: "Features"
      to: "#features"
      color: secondary
      size: md
---

# Features

This demo page shows how to use typed content schemas and Nuxt UI components together.

## Hero Section

- Customizable title, description, icon, and links
- Supports UI slot classes for styling

## Header Section

- Headline, icon, and navigation links
- All props are type-checked

## Links

- Only valid color values: primary, secondary, neutral, error, warning, success, info
- Size options: xs, sm, md, lg, xl

## Conclusion

Edit this file to try out different props and see live changes in your Nuxt app.
