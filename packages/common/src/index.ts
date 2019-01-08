export * from './interfaces'
import * as gql from './gql'
import * as notifcations from './notifications'
import * as packagesColumns from './columns/packages'
import * as random from './random'

export const columns = { packages: packagesColumns }
export { gql, notifcations, random }

export const msg = {}

export const isDev = process.env.NODE_ENV === 'development'
export const isTest = process.env.NODE_ENV === 'test'
export const isProd = !isDev && !isTest
export const constants = {
  CACHED_USER_INFO_COOKIE_NAME: 'x-user-dna',
  GRAPHIQL_PATH: '/graphiql',
  GRAPHQL_PATH: '/graphql',
  APP_NAME: 'Denolandia'
}
