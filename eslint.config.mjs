import antfu from '@antfu/eslint-config'
import { createConfigForNuxt } from '@nuxt/eslint-config'

const nuxt = createConfigForNuxt({
  features: {
    standalone: false,
  },
})

export default antfu(
  { ignores: ['.agents/**'] },
  {
    name: 'tailwind/yaml/rules',
    files: ['**/*.yaml', '**/*.yml'],
    rules: {
      'yaml/plain-scalar': ['off'],
    },
  },
  {
    name: 'nuxt-studio/md/rules',
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': ['off'],
    },
  },
  nuxt,
  {
    name: 'nuxt/layout/rules',
    files: ['app/layouts/**/*.vue'],
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  },
)
