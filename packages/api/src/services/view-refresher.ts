import { Client } from 'pg'
import { debounceTime, startWith, tap } from 'rxjs/operators'
import { Logger } from 'pino'
import { noop, map } from 'lodash'
import { denolandia } from '../interfaces'
import { Subject, from, Observable, Subscription } from 'rxjs'

export type TableRefreshManager = {
  subject: Subject<any>
  observable: Observable<any>
  subscriber: Subscription
}

export type TableRefreshManagerByName = {
  [tableName: string]: TableRefreshManager
}

export interface TableRefreshOptions {
  configPairs?: denolandia.PgQueryConfigMap
  refreshIntervalSeconds?: number
  tableName: string
}
export interface RefreshOptions {
  toRefresh: TableRefreshOptions[]
  client: Client
}
export function refreshViews (
  opts: RefreshOptions,
  logger: Logger
): TableRefreshManagerByName {
  const { toRefresh, client } = opts
  return toRefresh.reduce((agg, refresh) => {
    const subject = new Subject()
    const observable = from(subject).pipe(
      debounceTime(3e4),
      startWith(0),
      tap(() => refreshSingle(subject, refresh, client, logger))
    )
    const subscriber = observable.subscribe(noop)
    return {
      ...agg,
      [refresh.tableName]: {
        subject,
        observable,
        subscriber
      }
    }
  }, {})
}

export function refreshSingle (
  subject: Subject<any>,
  refresh: TableRefreshOptions,
  client: Client,
  logger: Logger
) {
  const configSql = map(refresh.configPairs || {}, (value, key) => {
    if (value === undefined) { throw new Error(`illegal undfined db setting for: "${key}"`) }
    // const serializedValue: string | number | null = ['string', 'boolean'].includes(typeof value) ? `'${value}'` : value
    // return `select set_config('${key}', ${serializedValue}, true);`
    return `select set_config('${key}', '${value}', true);`
  }).join('')
  const refreshSql = `refresh materialized view ${refresh.tableName}`
  logger.info(`refreshing materialized view "${refresh.tableName}"`)
  client.query([configSql, refreshSql].filter(Boolean).join(';'))
  setTimeout(() => {
    subject.next()
  }, (refresh.refreshIntervalSeconds || 86400) * 1000)
}
