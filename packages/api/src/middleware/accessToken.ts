import * as Koa from 'koa'

export async function middleware (ctx: Koa.Context, next: any) {
  Object.defineProperty(ctx, 'accessToken', {
    get () {
      let jwt = ctx.request.headers.id_token
      if (!jwt) {
        try {
          jwt = ctx.request.headers.authorization.match(/Bearer (.*)/)[1]
        } catch (err) {
          return null
        }
      }
      return jwt
    }
  })
  return next()
}
