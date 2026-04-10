import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const packageJSON = require('../package.json') as {
  license?: string
  version?: string
}

const pluginMetaKey = '__odlabsPluginTemplateMeta'

export type PluginMetaInput = {
  brandName?: string
  packageName?: string
  publishedAt?: string
  repositoryURL?: string
}

export type ResolvedPluginMeta = {
  brandName: string
  installCommand?: string
  license: string
  npmURL?: string
  packageName?: string
  publishedAt?: string
  repositoryURL?: string
  version: string
}

export type DashboardHealthResponse = {
  collections: {
    media: null | number
    pages: null | number
    pluginCollection: number
    posts: null | number
  }
  meta: ResolvedPluginMeta
  status: 'ok'
  timestamp: string
}

const trimValue = (value?: string) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const resolvePluginMeta = (meta?: PluginMetaInput): ResolvedPluginMeta => {
  const brandName = trimValue(meta?.brandName) || 'OD LABS'
  const packageName = trimValue(meta?.packageName)
  const repositoryURL = trimValue(meta?.repositoryURL)
  const publishedAt = trimValue(meta?.publishedAt)

  return {
    brandName,
    installCommand: packageName ? `pnpm add ${packageName}` : undefined,
    license: packageJSON.license || 'UNLICENSED',
    npmURL: packageName ? `https://www.npmjs.com/package/${packageName}` : undefined,
    packageName,
    publishedAt,
    repositoryURL,
    version: packageJSON.version || '0.0.0',
  }
}

export const setPluginMeta = (config: any, meta: ResolvedPluginMeta): void => {
  const customConfig = ((config.custom || {}) as Record<string, unknown>) || {}

  config.custom = {
    ...customConfig,
    [pluginMetaKey]: meta,
  }
}

export const getPluginMeta = (config: any): ResolvedPluginMeta | undefined => {
  const customConfig = config.custom as Record<string, unknown> | undefined
  const storedMeta = customConfig?.[pluginMetaKey]

  if (!storedMeta || typeof storedMeta !== 'object') {
    return undefined
  }

  return storedMeta as ResolvedPluginMeta
}
