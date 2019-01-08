import { PostGraphileOptions } from 'postgraphile'
import { constants, isDev } from 'common'
import { denolandia } from '../interfaces'
import { PgMutationUpsertPlugin } from 'postgraphile-upsert-plugin'
const PostGraphileConnectionFilterPlugin = require('postgraphile-plugin-connection-filter')

export const createConfiguration = (opts?: {
pgSettings?: denolandia.PgSettingsConfigProvider
}) => {
  opts = opts || {}
  return {
    appendPlugins: [PostGraphileConnectionFilterPlugin, PgMutationUpsertPlugin],
    debug: isDev,
    disableQueryLog: true,
    enableCors: isDev,
    graphiql: true,
    graphiqlRoute: constants.GRAPHIQL_PATH,
    graphqlRoute: constants.GRAPHQL_PATH,
    ignoreRBAC: false,
    pgSettings: opts.pgSettings,
    showErrorStack: isDev,
    watchPg: false
  } as Partial<PostGraphileOptions>
}
