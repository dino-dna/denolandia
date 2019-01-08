import { jsObjectAsArg, toQueryArgString } from './args'
import nanographql = require('nanographql')
import { columns } from '../../columns/packages'
const camelCase = require('lodash/camelCase')

export function getAll (opts?: denolandiaQL.IAllPackagesOnQueryArguments) {
  return nanographql(`
    {
      allPackages ${toQueryArgString(opts)} {
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
export function upsertPackageBody (listing: denolandiaQL.IPackageInput) {
  return nanographql(`
    mutation {
      upsertPackage(input: {
        package: ${jsObjectAsArg(listing)}
      }) {
        clientMutationId
      }
    }
  ` as any)()
}
