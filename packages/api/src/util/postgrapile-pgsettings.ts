import { denolandia } from '../interfaces'

export interface denolandiaPgSettings {}
export type PgSettingsGenerator = (
  serverProvidedConfig: denolandiaPgSettings,
  clientProvidedKV: any
) => denolandia.PgQueryConfigMap
export const generateConfigKVPairs: PgSettingsGenerator = (
  serverProvidedConfig,
  clientProvidedKV
) => {
  const {} = serverProvidedConfig
  const config = {}
  return config
}
