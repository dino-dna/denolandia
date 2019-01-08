import { gql } from 'common'
import fetch from 'node-fetch' // { RequestInit }

export const create = function createNodeGqlClient (url: string) {
  return gql.client.create(fetch, url)
}
