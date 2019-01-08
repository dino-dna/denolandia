import * as pino from 'pino'
import { create as createLoggerConfig, ICreateLogger } from '../util/create-logger-config'

export function create (opts: ICreateLogger): pino.Logger {
  return pino(createLoggerConfig(opts))
}
