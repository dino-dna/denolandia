import { createMiddleware as createDbClientMiddleware } from './db-client'
import { createMiddleware as createHelmetMiddleware } from './helmet'
import { createMiddleware as createPostgraphqlMiddleware } from './postgraphql'
import { middleware as accessToken } from './accessToken'
import { middleware as bodyParser } from './body-parser'
import { middleware as compress } from './compress'
import { middleware as errorHandler } from './error-handler'
import { middleware as logger } from './logger'
import { middleware as responseTime } from './response-time'
import { denolandia } from '../interfaces'
import * as createDebug from 'debug'
import * as Koa from 'koa'

export const common = function createMiddlewares (
  config: denolandia.IServiceConfig
) {
  const debug = createDebug('denolandia:common:middleware')
  const middlewares = [
    { fn: responseTime, name: 'responseTime' },
    { fn: logger(config), name: 'logger' },
    { fn: errorHandler, name: 'errorHandler' },
    { fn: createHelmetMiddleware(), name: 'helmet' },
    { fn: bodyParser, name: 'bodyParser' },
    { fn: compress, name: 'compress' },
    { fn: accessToken, name: 'accessToken' },
    { fn: createDbClientMiddleware(config), name: 'dbClient' }
  ].map((meta, i) => {
    const wrappedMiddleware: Koa.Middleware = async (ctx, next) => {
      debug(`entering middleware ${i} [${meta.name}] `)
      const res = await meta.fn(ctx, next)
      debug(`exiting middleware ${i} [${meta.name}]`)
      return res
    }
    ;(wrappedMiddleware as any).middlewareName = meta.name
    return wrappedMiddleware
  })
  return middlewares
}

export { createPostgraphqlMiddleware }
