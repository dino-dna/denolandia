import { denolandia } from '../interfaces'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as status from './status'

export async function bind (
  app: Koa,
  config: denolandia.IServiceConfig,
  router: Router,
  services: denolandia.IServices,
  gqlClient: denolandia.GqlClient
) {
  router.get('/status', status.get(app, services))
  router.get('/hello', (ctx: Koa.Context) => {
    ctx.body = 'world!'
  })
  app.use(router.routes()).use(router.allowedMethods())
}
