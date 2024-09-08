import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  safelist: [
    {
      pattern: /grid-cols-([1-9])/,
      variants: ['lg', 'xl'],
    },
    {
      pattern: /col-span-([1-9])/,
      variants: ['xl'],
    },
  ],
}
