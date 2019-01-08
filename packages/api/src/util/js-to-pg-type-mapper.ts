import { isDate, isString, isBoolean, isNumber, isInteger } from 'lodash'

export function map (value: any) {
  if (isString(value)) return 'varchar'
  if (isInteger(value)) return 'real'
  if (isNumber(value)) return 'real'
  if (isBoolean(value)) return 'boolean'
  if (isDate(value)) return 'timestamp with time zone'
  console.warn(`unknown type for ${typeof value}! using varcar`)
  return 'varchar'
}
