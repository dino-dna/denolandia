import { create as createLoggerConfig } from '../util/create-logger-config'
import { isDev } from 'common'
import { denolandia } from '../interfaces'
const createLogger = require('koa-pino-logger')
let prettyPrint = isDev ? true : !!process.env.PRETTY_REQUEST_LOGGING

export const middleware = function (opts: denolandia.IServiceConfig) {
  const config = createLoggerConfig({
    ...{
      name: 'http-logger',
      prettyPrint
    },
    ...opts.logger
  })
  return createLogger(config)
}
