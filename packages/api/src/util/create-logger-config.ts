import { isDev } from 'common'
import { IncomingMessage, ServerResponse } from 'http'

export interface ICreateLogger {
  serializers?: any
  name: string
  level?: string
  prettyPrint?: boolean
}

export function create (opts: ICreateLogger) {
  const config: Partial<ICreateLogger> = {
    name: opts.name,
    level: opts.level || 'info',
    prettyPrint: opts.prettyPrint || false
  }
  if (isDev) {
    config.serializers = {
      req: (req: IncomingMessage) => {
        return `${req.method} ${req.url}`
      },
      res: (res: ServerResponse) => {
        return `${res.statusCode}`
      }
    }
  }
  return config
}
