const truthyValues = new Set(['1', 'on', 'true', 'yes'])

export const getOptionalEnv = (value?: string) => {
  const trimmed = value?.trim()
  return trimmed ? trimmed : undefined
}

export const getPluginBrandName = () => getOptionalEnv(process.env.PLUGIN_BRAND_NAME) || 'OD LABS'

export const isFlagEnabled = (value?: string) => {
  const normalized = value?.trim().toLowerCase()
  return normalized ? truthyValues.has(normalized) : false
}
