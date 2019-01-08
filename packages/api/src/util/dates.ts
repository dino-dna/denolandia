import { DateTime } from 'luxon'

export const PARSE_DATE_FORMATS = ['m/d/y', 'mm/d/y', 'm/dd/y', 'm/d/yy', 'mm/dd/y', 'm/dd/yy', 'mm/d/yy']

export const isLikelyDate = (str: string) => !!str.match(/(-|\/)/)
export const asDate: (value: any) => Date | null = value => {
  if (!value || !value.match || !isLikelyDate(value)) return null
  for (const format of PARSE_DATE_FORMATS) {
    const date = DateTime.fromFormat(value, format)
    if (!date.invalidReason) return date.toJSDate()
  }
  return null
}
