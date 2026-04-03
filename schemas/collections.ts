export const snippet = {
  type: 'page',
  source: {
    include: 'snippets/**/*.{md,yaml}',
    prefix: '/snippets',
  },
}

export const article = {
  type: 'page',
  source: {
    include: 'articles/**/*.{md,yaml}',
    prefix: '/articles',
  },
  traits: ['dates', 'authors', 'category', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
}

export const event = {
  type: 'page',
  source: {
    include: 'events/**/*.{md,yaml}',
    prefix: '/events',
  },
  traits: ['dates', 'location', 'category', 'links', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
}

export const page = {
  type: 'page',
  source: {
    include: 'pages/**/*.{md,yaml}',
    prefix: '/',
  },
  traits: ['layout', 'header', 'toc'],
}

export const user = {
  type: 'data',
  source: 'users/**/*.{md,yaml}',
  traits: ['user'],
}

export const collections = { snippet, article, event, page, user }
