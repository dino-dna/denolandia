export function jsObjectAsArg (obj: object) {
  return JSON.stringify(obj).replace(/"([^"]+)":/g, '$1:')
}

export interface GqlQueryParams<OrderBy, Condition> {
  /**
   * Only read the first `n` values of the set.
   */
  first?: number | null

  /**
   * Only read the last `n` values of the set.
   */
  last?: number | null

  /**
   * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
   */
  offset?: number | null

  /**
   * Read all values in the set before (above) this cursor.
   */
  before?: any | null

  /**
   * Read all values in the set after (below) this cursor.
   */
  after?: any | null

  /**
   * The method to use when ordering `Listing`.
   * @default [{"alias":"primary_key_asc","specs":[["id",true]],"unique":true}]
   */
  orderBy?: Array<OrderBy> | null

  /**
   * A condition to be used in determining which values should be returned by the collection.
   */
  condition?: Condition | null

  filter?: any | null
}

export function toQueryArgString (opts: GqlQueryParams<any, any> | undefined) {
  if (!opts || !Object.keys(opts).length) return ''
  const { first, orderBy, offset, filter } = opts
  const args = []
  if (orderBy) args.push(`orderBy: [${orderBy.join(', ')}]`)
  if (first) args.push(`first: ${first}`)
  if (offset) args.push(`offset: ${offset}`)
  if (filter) args.push(`filter: ${jsObjectAsArg(filter)}`)
  return `(\n\t${args.join(',\n\t')}\n)`
}
