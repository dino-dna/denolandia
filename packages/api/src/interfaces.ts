import { RequestInit } from 'node-fetch'
import * as Koa from 'koa'
import * as pino from 'pino'

export namespace denolandia {
  export type GqlClient = (
    opts: RequestInit
  ) => Promise<denolandiaQL.IQuery | denolandiaQL.IMutation>

  export type GqlService = {
    client: GqlClient
    middleware: Koa.Middleware
  }

  export interface PgQueryConfigMap {}

  export type PgSettingsConfigProvider = (
    req: IncomingMessage
  ) => Promise<PgQueryConfigMap>

  export type IServices = {
    logger: pino.Logger
    ws?: any
    graphql?: any
    refreshViews: TableRefreshManagerByName
  }

  export interface IServiceConfig {
    db: IServiceDatabaseConfig
    logger: {
      name: string
      level: string
      prettyPrint: boolean
    }
    name: string
    pgSettings: PgSettingsConfigProvider
    server: {
      port: number
    }
    middlewares: {
      common: Koa.Middleware[]
    }
    refreshViews: RefreshOptions
  }

  export interface IServiceDatabaseConfig {
    uri: string
  }

  export interface IServiceInputs {
    app: Koa
    config: IServiceConfig
    services: IServices
  }
}
// extend context to enable us to tack on our own props, which is idiomatic koa
import { IncomingMessage } from 'http'
import { Client } from 'pg'
import {
  RefreshOptions,
  TableRefreshManagerByName
} from './services/view-refresher'
declare module 'koa' {
  export interface BaseContext {
    accessToken: string | null
    db: Client
    services: denolandia.IServices
    gqlClient: denolandia.GqlClient
    log: pino.Logger
    // https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims
    userClaims?: {
      'http://denolandia/roles': string[]
      exp: number
      iat: number
      at_hash: string
      aud: string
      iss: string
      nonce: string
      sub: string // user identifier!
    }
  }
}
