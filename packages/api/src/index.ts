import {
  common as createCommonMiddlewares,
  createPostgraphqlMiddleware
} from './middleware'
import { pgSettings } from './middleware/postgraphql'
import { bind as bindRoutes } from './routes'
import { defaultsDeep } from 'lodash'
import { init as initServices } from './services'
import { denolandia } from './interfaces'
import { promisify } from 'bluebird'
import { PUBLIC_DIRNAME } from './constants'
import { resolve } from 'path'
import { Server } from 'http'
import * as common from 'common'
import * as fs from 'fs-extra'
import * as Koa from 'koa'
import * as mount from 'koa-mount'
import * as Router from 'koa-router'
import * as util from './util'
import serve = require('koa-static')
var cors = require('koa-cors')

const { getConnectionString: getPostgresConnectionString } = util.dbConfig

export class Service {
  public config: denolandia.IServiceConfig
  public gqlMiddleware: Koa.Middleware
  public services: denolandia.IServices
  public server: Server

  async createConfig (
    opts: Partial<denolandia.IServiceConfig>
  ): Promise<denolandia.IServiceConfig> {
    const name = process.env.SERVICE_NAME || common.constants.APP_NAME
    const defaultConfig: Partial<denolandia.IServiceConfig> = {
      db: {
        uri: process.env.DATABASE_URL || getPostgresConnectionString()
      },
      logger: {
        level: process.env.LOG_LEVEL || common.isDev ? 'debug' : 'warn',
        name,
        prettyPrint: common.isDev ? true : !!process.env.PRETTY_REQUEST_LOGGING
      },
      middlewares: {
        common: []
      },
      name,
      pgSettings,
      server: {
        port: process.env.PORT ? parseInt(process.env.PORT) : 9090
      },
      refreshViews: {
        toRefresh: [],
        client: null as any // late bind downstream
      }
    }
    const config: denolandia.IServiceConfig = defaultsDeep(opts, defaultConfig)
    if (!config.middlewares.common.length) {
      config.middlewares.common = createCommonMiddlewares(config)
    }
    return config
  }

  async start (opts: Partial<denolandia.IServiceConfig>) {
    const config = await this.createConfig(opts)
    const { server: { port } } = config
    this.config = config

    // root app
    const app = new Koa()
    app.proxy = common.isProd
    config.middlewares.common.forEach(mw => app.use(mw))

    // static server
    const fileserver = new Koa()
    const staticHandler = serve(PUBLIC_DIRNAME, { defer: false })
    const {
      client: gqlClient,
      middleware: gqlMiddleware
    } = await createPostgraphqlMiddleware(config)
    this.gqlMiddleware = gqlMiddleware
    const uiBuildDir = resolve(__dirname, '../../ui/build')
    const uiBuildExists = await fs.pathExists(uiBuildDir)
    const localUiLinkExists = await fs.pathExists(PUBLIC_DIRNAME)
    if (!localUiLinkExists) {
      !uiBuildExists &&
        console.warn(
          [
            `static UI build does not exist: ${uiBuildDir}. you cannot access a copy of the ui`,
            `from http://localhost:${port} until the ui is built, and server restarted.`
          ].join(' ')
        )
      if (uiBuildExists && !localUiLinkExists) {
        console.log(`linking UI build into API`)
        await fs.symlink(uiBuildDir, PUBLIC_DIRNAME)
      }
    }
    fileserver.use((ctx: Koa.Context, next: any) => {
      return ctx.request.path.match(/^\/graph|^\/_post/)
        ? gqlMiddleware(ctx, next)
        : staticHandler(ctx, async () => {
          if (ctx.status === 404) {
            ctx.body = fs.createReadStream(`${PUBLIC_DIRNAME}/index.html`)
            ctx.type = 'html'
          }
          await next()
        })
    })
    common.isDev && fileserver.use(cors())

    // api server
    const api = new Koa()
    const router = new Router()
    const services = await initServices(api, config)
    common.isDev && api.use(cors())
    api.context.services = services
    await bindRoutes(api, config, router, services, gqlClient)

    // run
    app.context.services = services
    app.context.gqlClient = gqlClient
    app.use(mount('/api', api))
    app.use(mount('/', fileserver))
    this.services = services
    this.server = app.listen(port)
    services.logger.debug(`environment: ${process.env.NODE_ENV}`)
    services.logger.debug(`configuration: ${JSON.stringify(config, null, 2)}`)
    services.logger.info(`🚀  listening @ http://localhost:${port}`)
  }

  async stop () {
    if (this.gqlMiddleware) await (this.gqlMiddleware as any).pgPool.end()
    // @TODO remove when pubsub issue resolved above
    await new Promise(res => setTimeout(res, 1000))
    if (this.server) await promisify(this.server.close.bind(this.server))()
  }
}

export { createCommonMiddlewares, util, denolandia }
