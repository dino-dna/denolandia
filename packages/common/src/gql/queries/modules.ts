import { jsObjectAsArg, toQueryArgString } from './args'
import nanographql = require('nanographql')
import { columns } from '../../columns/modules'
const camelCase = require('lodash/camelCase')

export function getAll (opts?: denolandiaQL.IAllModulesOnQueryArguments) {
  return nanographql(`
    {
      allModules ${toQueryArgString(opts)} {
        totalCount
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          node {
            ${columns.map(column => camelCase(column.name)).join('\n')}
          }
        }
      }
    }
  `)()
}
export function upsertModuleBody (listing: denolandiaQL.IModuleInput) {
  return nanographql(`
    mutation {
      upsertModule(input: {
        module: ${jsObjectAsArg(listing)}
      }) {
        clientMutationId
      }
    }
  ` as any)()
}
