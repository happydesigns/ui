/* eslint-disable regexp/no-super-linear-backtracking, regexp/no-useless-character-class, regexp/prefer-w, regexp/use-ignore-case */
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join, relative, resolve } from 'node:path'
import process from 'node:process'

export interface SourceReference {
  path: string
  github: string
}

export interface ComponentPropReference {
  name: string
  type: string
  required: boolean
  default?: string
  description?: string
}

export interface ComponentSlotReference {
  name: string
  type?: string
  description?: string
}

const repoRoot = resolve(process.env.HAPPYDESIGNS_UI_ROOT ?? process.env.INIT_CWD ?? process.cwd())
const componentRoot = resolve(repoRoot, 'app/components')
const exampleRoot = resolve(repoRoot, 'docs/app/components/content/examples')
const githubBase = 'https://github.com/happydesigns/ui/blob/main'

function walkFiles(dir: string, extension: string): string[] {
  if (!existsSync(dir)) {
    return []
  }

  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      return walkFiles(path, extension)
    }
    return entry.isFile() && entry.name.endsWith(extension) ? [path] : []
  })
}

function toPascalCase(value: string) {
  return value
    .replace(/^H(?=[A-Z])/, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function normalizeComponentName(value: string) {
  const pascal = toPascalCase(value.replace(/\.json$/, ''))
  return pascal.startsWith('H') ? pascal : `H${pascal}`
}

export function normalizeExampleName(value: string) {
  return toPascalCase(value.replace(/\.json$/, ''))
}

export function getComponentSource(name: string): SourceReference | null {
  const file = getComponentFile(name)

  if (!file) {
    return null
  }

  const repoPath = relative(repoRoot, file).replace(/\\/g, '/')
  return {
    path: repoPath,
    github: `${githubBase}/${repoPath}`,
  }
}

function getComponentFile(name: string) {
  const normalized = normalizeComponentName(name).replace(/^H/, '')
  return walkFiles(componentRoot, '.vue')
    .find(path => basename(path, '.vue') === normalized)
}

function readComponentSource(name: string) {
  const file = getComponentFile(name)
  return file ? readFileSync(file, 'utf-8') : ''
}

function findBalanced(source: string, openIndex: number, openChar: string, closeChar: string) {
  let depth = 0
  let quote: string | null = null

  for (let index = openIndex; index < source.length; index++) {
    const char = source[index]
    const previous = source[index - 1]

    if (quote) {
      if (char === quote && previous !== '\\') {
        quote = null
      }
      continue
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      continue
    }

    if (char === openChar) {
      depth++
      continue
    }

    if (char === closeChar) {
      depth--
      if (depth === 0) {
        return source.slice(openIndex + 1, index)
      }
    }
  }

  return ''
}

function extractTypeArgument(source: string, macro: string) {
  const macroIndex = source.indexOf(`${macro}<`)
  if (macroIndex === -1) {
    return ''
  }

  const openIndex = source.indexOf('<', macroIndex)
  return findBalanced(source, openIndex, '<', '>')
}

function resolveReferencedType(source: string, typeName: string) {
  const name = typeName.replace(/<.*$/, '').trim()
  const interfacePattern = new RegExp(`interface\\s+${name}(?:<[^>]+>)?[^\\{]*\\{`)
  const interfaceMatch = interfacePattern.exec(source)

  if (interfaceMatch?.index !== undefined) {
    const openIndex = source.indexOf('{', interfaceMatch.index)
    return findBalanced(source, openIndex, '{', '}')
  }

  const typePattern = new RegExp(`type\\s+${name}(?:<[^>]+>)?\\s*=\\s*\\{`)
  const typeMatch = typePattern.exec(source)

  if (typeMatch?.index !== undefined) {
    const openIndex = source.indexOf('{', typeMatch.index)
    return findBalanced(source, openIndex, '{', '}')
  }

  return ''
}

function splitTopLevelFields(block: string) {
  const fields: string[] = []
  let current = ''
  let depth = 0
  let quote: string | null = null

  for (let index = 0; index < block.length; index++) {
    const char = block.charAt(index)
    const previous = block.charAt(index - 1)

    if (quote) {
      current += char
      if (char === quote && previous !== '\\') {
        quote = null
      }
      continue
    }

    if (char === '\'' || char === '"' || char === '`') {
      quote = char
      current += char
      continue
    }

    if ('{[(<'.includes(char)) {
      depth++
    }
    if ('}])>'.includes(char)) {
      depth--
    }

    if ((char === '\n' || char === ';' || char === ',') && depth === 0) {
      if (current.trim()) {
        fields.push(current)
      }
      current = ''
      continue
    }

    current += char
  }

  if (current.trim()) {
    fields.push(current)
  }

  return fields
}

function extractComment(field: string) {
  const commentMatch = field.match(/\/\*\*([\s\S]*?)\*\//)
  if (!commentMatch) {
    return undefined
  }

  return commentMatch[1]!
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, '').trim())
    .filter(Boolean)
    .join(' ')
}

function cleanField(field: string) {
  return field
    .replace(/\/\*\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*$/gm, '')
    .trim()
}

function parsePropsBlock(block: string): ComponentPropReference[] {
  return splitTopLevelFields(block)
    .map((field) => {
      const description = extractComment(field)
      const cleaned = cleanField(field)
      const match = cleaned.match(/^([A-Za-z_$][\w$-]*)\??\s*:\s*([\s\S]+)$/)

      if (!match) {
        return null
      }

      return {
        name: match[1]!,
        type: match[2]!.trim(),
        required: !cleaned.startsWith(`${match[1]}?`),
        description,
      }
    })
    .filter(Boolean) as ComponentPropReference[]
}

function parseTemplateSlots(source: string): ComponentSlotReference[] {
  const slots = [...source.matchAll(/<slot(?:\s+name="([^"]+)")?/g)]
    .map(match => match[1] ?? 'default')

  return Array.from(new Set(slots), name => ({ name }))
}

export function getComponentReference(name: string) {
  const source = readComponentSource(name)

  if (!source) {
    return null
  }

  const rawProps = extractTypeArgument(source, 'defineProps')
  const propsBlock = rawProps.trim().startsWith('{')
    ? findBalanced(rawProps, rawProps.indexOf('{'), '{', '}')
    : resolveReferencedType(source, rawProps)

  const rawSlots = extractTypeArgument(source, 'defineSlots')
  const slots = rawSlots
    ? [{ name: 'typed slots', type: rawSlots.trim() }]
    : parseTemplateSlots(source)

  return {
    props: propsBlock ? parsePropsBlock(propsBlock) : [],
    slots,
  }
}

export function getExampleSource(name: string) {
  const normalized = normalizeExampleName(name)
  const file = walkFiles(exampleRoot, '.vue')
    .find(path => basename(path, '.vue') === normalized)

  if (!file) {
    return null
  }

  const repoPath = relative(repoRoot, file).replace(/\\/g, '/')
  return {
    name: normalized,
    code: readFileSync(file, 'utf-8'),
    source: {
      path: repoPath,
      github: `${githubBase}/${repoPath}`,
    },
  }
}

function extractBlock(source: string, startIndex: number) {
  const openIndex = source.indexOf('{', startIndex)
  if (openIndex === -1) {
    return ''
  }

  let depth = 0
  for (let index = openIndex; index < source.length; index++) {
    const char = source[index]
    if (char === '{') {
      depth++
    }
    if (char === '}') {
      depth--
      if (depth === 0) {
        return source.slice(openIndex, index + 1)
      }
    }
  }

  return ''
}

export function getVariantReferences() {
  const sourcePath = resolve(repoRoot, 'nuxt.config.ts')
  const source = readFileSync(sourcePath, 'utf-8')
  const registryIndex = source.indexOf('registry:')
  const registry = extractBlock(source, registryIndex)
  const names = [...registry.matchAll(/^\s{6}([a-zA-Z][\w]*):\s*\{/gm)].map(match => match[1]!)
  const appConfig = readFileSync(resolve(repoRoot, 'app/app.config.ts'), 'utf-8')

  return names.map((name, index) => {
    const start = registry.indexOf(`${name}:`)
    const end = index + 1 < names.length ? registry.indexOf(`${names[index + 1]!}:`, start) : registry.length
    const block = registry.slice(start, end)
    const extendsMatch = block.match(/extends:\s*\[([^\]]*)\]/)
    const extendsList = extendsMatch?.[1]?.split(',')

      .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean) ?? []

    return {
      name,
      kind: extendsList.length ? 'collection' : appConfig.includes(`${name}: { config`) ? 'configured feature' : 'schema feature',
      extends: extendsList,
      hasRuntimeConfig: appConfig.includes(`${name}: {`) && appConfig.includes('config'),
      source: 'nuxt.config.ts',
    }
  })
}

export function getCollectionReferences() {
  const sourcePath = resolve(repoRoot, 'schemas/collections.ts')
  const source = readFileSync(sourcePath, 'utf-8')
  const matches = [...source.matchAll(/^\s{2}([a-zA-Z][\w]*):\s*defineCollection\(\{/gm)]

  return matches.map((match, index) => {
    const name = match[1]!
    const start = match.index ?? 0
    const end = index + 1 < matches.length ? matches[index + 1]!.index ?? source.length : source.length
    const block = source.slice(start, end)
    const type = block.match(/type:\s*'([^']+)'/)?.[1] ?? 'page'
    const prefix = block.match(/prefix:\s*'([^']+)'/)?.[1] ?? ''
    const include = block.match(/include:\s*'([^']+)'/)?.[1]
    const sourceValue = block.match(/source:\s*'([^']+)'/)?.[1]
    const variants = block.match(/mergeVariantSchemas\(\[([^\]]*)\]/)?.[1]?.split(',')

      .map(item => item.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean) ?? []

    return {
      name,
      type,
      source: include ?? sourceValue ?? '',
      prefix,
      variants,
    }
  })
}
