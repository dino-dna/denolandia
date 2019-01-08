import { create as createLogger } from './logger'
import { createConnected } from '../util/db-client'
import { denolandia } from '../interfaces'
import { refreshViews, RefreshOptions } from './view-refresher'
import * as Koa from 'koa'
import * as scraper from 'package-scraper'

var wsService = require('./ws')

export async function init (
  app: Koa,
  config: denolandia.IServiceConfig
): Promise<denolandia.IServices> {
  const logger = createLogger(config.logger)
  var payload: denolandia.IServiceInputs = {
    app,
    config,
    services: {
      logger,
      refreshViews: {}
    }
  }
  // public services
  payload.services.ws = wsService(payload)

  const refreshViewsWithDb: RefreshOptions = {
    toRefresh: [...config.refreshViews.toRefresh],
    client: await createConnected(config.db.uri)
  }
  payload.services.refreshViews = refreshViews(refreshViewsWithDb, logger)

  const client = await createConnected(config.db.uri)
  scraper.scrapeDatabase({
    poll: true,
    leadingEdge: !!(await client.query('select * from denolandia.packages'))
      .rowCount
  })
  client.end(() => {})

  // general purpose services
  return payload.services
}
