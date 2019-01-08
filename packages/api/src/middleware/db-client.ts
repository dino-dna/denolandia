import * as Koa from 'koa'
import { denolandia } from '../interfaces'
import { createConnected } from '../util/db-client'

export function createMiddleware (config: denolandia.IServiceConfig) {
  return function middleware (ctx: Koa.Context, next: any) {
    Object.defineProperty(ctx, 'db', {
      async get () {
        if ((ctx as any).__pg_db) return (ctx as any).__pg_db
        const client = await createConnected(config.db.uri)
        ;(ctx as any).__pg_db = client
        return client
      }
    })
    return next()
  }
}
