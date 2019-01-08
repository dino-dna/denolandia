import { defaultsDeep } from 'lodash'
import { resolve } from 'path'
import * as Knex from 'knex'
const rootConfig = require('../../knexfile')

const apiRoot = resolve(__dirname, '../../')
const migrationRoot = resolve(apiRoot, './build/migrations')

export const getConfig: () => Knex.ConnectionConfig = (env?: string) => rootConfig[env || 'development'].connection

export function createKnex (configOverrides?: Partial<Knex.Config>, env?: string) {
  configOverrides = configOverrides || {}
  const config: Knex.Config = defaultsDeep({}, configOverrides, rootConfig[env || 'development'])
  const knex = Knex(config)
  return knex
}

export async function migrate (knex: Knex, migrateConfigOverrides?: Partial<Knex.MigratorConfig>) {
  migrateConfigOverrides = migrateConfigOverrides || {}
  await knex.migrate.latest({
    directory: migrationRoot,
    ...migrateConfigOverrides
  })
}
