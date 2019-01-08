import * as Koa from 'koa'
import { ApiError } from '../errors'

export async function middleware (ctx: Koa.BaseContext, next: any) {
  try {
    const res = await next()
    return res
  } catch (err) {
    if (err instanceof ApiError) {
      let apiErr = err as ApiError
      ctx.status = (apiErr as any).status || (apiErr.constructor as typeof ApiError).status
      ctx.body = {
        error: apiErr.message || (apiErr.constructor as typeof ApiError).defaultMessage
      }
    } else {
      ctx.body = { error: 'Fatal error' }
      ctx.status = err.status || 500
      ctx.log.error(err)
    }
  }
}
