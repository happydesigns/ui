export const snippetCollection = {
  type: 'page',
  source: {
    include: 'snippets/**/*.{md,yaml}',
    prefix: '/snippets',
  },
}

export const articleCollection = {
  type: 'page',
  source: {
    include: 'articles/**/*.{md,yaml}',
    prefix: '/articles',
  },
  traits: ['dates', 'authors', 'category', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
}

export const eventCollection = {
  type: 'page',
  source: {
    include: 'events/**/*.{md,yaml}',
    prefix: '/events',
  },
  traits: ['dates', 'location', 'category', 'links', 'status', 'header', 'toc', 'surround', 'copyButton', 'separator', 'backButton'],
}

export const pageCollection = {
  type: 'page',
  source: {
    include: 'pages/**/*.{md,yaml}',
    prefix: '/',
  },
  traits: ['layout', 'header', 'toc'],
}

export const userCollection = {
  type: 'data',
  source: 'users/**/*.{md,yaml}',
  traits: ['user'],
}

export const collections = {
  snippet: snippetCollection,
  article: articleCollection,
  event: eventCollection,
  page: pageCollection,
  user: userCollection,
}
