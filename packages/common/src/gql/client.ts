import { defaultsDeep } from 'lodash'
// @warn: used _strictly_ for typing. module not present. all fns must BYO-fetch
import { RequestInit, Response, Request } from 'node-fetch'

type Fetch = (url: string | Request, init?: RequestInit) => Promise<Response>

const DEFAULT_FETCH_INIT = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST'
}

export type GQLClient = (
  opts: RequestInit
) => Promise<denolandiaQL.IQuery | denolandiaQL.IMutation>

export type GQLBoundClient = (
  fetch: Fetch,
  url: string,
  fetchOpts: RequestInit
) => Promise<any>

export const client: GQLBoundClient = async function client (
  fetch,
  url,
  fetchOpts
) {
  try {
    const req = defaultsDeep({}, DEFAULT_FETCH_INIT, fetchOpts)
    const res = await fetch(url, req)
    const json: denolandiaQL.IGraphQLResponseRoot = await res.json()
    if (json.errors) {
      if (json.errors.length) {
        const error = json.errors[0]
        throw new Error(error.message)
      } else {
        throw new Error(
          `request failed with status: ${res.status} - ${
            res.statusText
          } (${url})`
        )
      }
    }
    if (res.status >= 400) {
      const err = new Error(res.statusText)
      ;(err as any).res = res
      throw err
    }
    return json.data!
  } catch (err) {
    throw err
  }
}

export function create (fetch: Fetch, url: string): GQLClient {
  return function boundClient (opts: RequestInit) {
    return client(fetch, url, opts)
  }
}
