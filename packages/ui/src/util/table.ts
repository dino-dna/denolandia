import { Column } from 'react-table'
import { gql } from 'common'
import { isNumber, snakeCase, toUpper, camelCase, startCase } from 'lodash'
import { JsPgColumnMapping } from 'common'

export type Sorted = {
  id: string
  desc: boolean
}

export const toSortEnumKey = (sorted: Sorted) => `${toUpper(snakeCase(sorted.id))}_${sorted.desc ? 'DESC' : 'ASC'}`

export const toGqlFilters = (toFilter: TableFilter[], columnTypeMappingByColumnName: any): any => {
  const filters = toFilter
    .map(({ id, value: rawValue }) => {
      const mapping = columnTypeMappingByColumnName[snakeCase(id)]
      if (!mapping) {
        console.error(`type mapping not found for ${id}`)
        return null
      }
      let value: any = rawValue
      let operator = null
      if (!rawValue) return null
      if (rawValue.startsWith('>') || rawValue.startsWith('<') || rawValue.startsWith('=')) {
        operator = rawValue[0]
        value = rawValue.substr(1)
      }
      const float: number = parseFloat(value || '')
      if (mapping.jsType === 'number' && !Number.isNaN(float)) value = float
      if (isNumber(value)) {
        const filterer = (operator === '>' && 'greaterThan') || (operator === '<' && 'lessThan') || 'equalTo'
        return {
          [id]: {
            [filterer]: value
          }
        }
      }
      return {
        [id]: {
          includes: value
        }
      }
    })
    .filter(i => i)
  return filters
}

export type GqlListingFilterRequest < T > = {
  name: string
  filter: T | null
}

export type TableFilter = { id: string; value: string }

export interface RequestTableDataConfig {
  pageSize: number
  page: number
  sorted: any
  filtered: TableFilter[]
  columnTypeMappingByColumnName: any
}

export const fromTypeMapping: (mapping: JsPgColumnMapping) => Column = ({ name }) => ({
  Header: startCase(name),
  accessor: camelCase(name)
})

export const getModulesBody = (requestConfig: RequestTableDataConfig) => {
  const { filtered, columnTypeMappingByColumnName, sorted, page, pageSize } = requestConfig
  let queryOpts: denolandiaQL.IAllModulesOnQueryArguments = {}
  if (filtered && filtered.length) {
    queryOpts.filter = {
      and: toGqlFilters(filtered, columnTypeMappingByColumnName)
    }
  }
  if (sorted && sorted.length) queryOpts.orderBy = sorted.map(toSortEnumKey)
  if (pageSize) queryOpts.first = pageSize
  if (page) queryOpts.offset = pageSize * page
  return gql.queries.modules.getAll(queryOpts)
}

export async function requestData (requestConfig: RequestTableDataConfig) {
  const { pageSize } = requestConfig
  const body = getModulesBody(requestConfig)
  const res = await window.fetch('/graphql', {
    headers: { 'Content-Type': 'application/json' },
    method: 'post',
    body
  })
  // @TODO post notification
  const json = await res.json()
  if (json.errors) console.error(json.errors)
  const { edges, totalCount } = (json.data as denolandiaQL.IQuery).allModules!
  return {
    rows: (edges as denolandiaQL.IModulesEdge[]).map(edge => edge.node || {}),
    pages: Math.ceil(totalCount! / pageSize)
  }
}
