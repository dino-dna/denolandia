import { asDate } from './dates'

export function validate (record: any, tableMapping: any) {
  const errors = []
  for (const key in record) {
    const value = record[key]
    const mapping = tableMapping[key]
    if (!mapping) errors.push(`"${key}" not found in listing => column mapping`)
    else if (value !== null && mapping.jsType !== typeof value) {
      // dates are special case strings, as there is no standard serialization
      // for them as primitives. thus, we embed them as strings, sniff for them,
      // and carry on.
      if (mapping.jsType === 'date' && asDate(value)) continue // pass
      const msg = [
        `column "${key}" was expected to a ${mapping.jsType}`,
        `but received a ${typeof value}. omitting value`
      ].join(', ')
      errors.push(msg)
      record[key] = null
    }
  }
  return errors
}
