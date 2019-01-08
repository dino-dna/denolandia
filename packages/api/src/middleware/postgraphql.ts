import { constants } from 'common'
import { create } from '../util/gql-client'
import { createConfiguration } from '../util/postgraphql'
import { format } from 'url'
import { postgraphile } from 'postgraphile'
import { denolandia } from '../interfaces'
import * as createDebug from 'debug'
import * as Koa from 'koa'

export const pgSettings: denolandia.PgSettingsConfigProvider = async req => {
  const ctx = (req as any)._koaCtx as Koa.Context
  // #lolsecurity
  const isAdmin =
    process.env.DENOLANDIA_ADMIN_TOKEN &&
    process.env.DENOLANDIA_ADMIN_TOKEN === ctx.accessToken &&
    process.env.DENOLANDIA_ADMIN_TOKEN.length > 30
  return {
    'denolandia.is_admin': isAdmin ? 'true' : 'false'
  }
}

export async function createMiddleware (
  opts: denolandia.IServiceConfig
): Promise<denolandia.GqlService> {
  const debug = createDebug('denolandia:services:postgraphql')
  const config = opts
  const uri = process.env.DATABASE_URL || config.db.uri
  const conf = createConfiguration({ pgSettings })
  debug(`loading postgraphql with config ${JSON.stringify(conf, null, 2)}`)
  const postgraphql = postgraphile(uri, 'denolandia', conf)
  const graphqlUrl = format({
    protocol: 'http',
    port: config.server.port,
    hostname: 'localhost',
    pathname: constants.GRAPHQL_PATH
  })
  return {
    client: create(graphqlUrl),
    middleware: postgraphql
  }
}
