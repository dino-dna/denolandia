import { memoize } from 'lodash'

export const maxLength = memoize((max: number) => (value: string) => {
  return value && value.trim().length > max ? `Must be ${max} characters or less` : undefined
})
export const maxValue = memoize((max: number) => (value: string) => {
  return value && parseInt(value, 10) > max ? `Must be less than or equal to ${max}` : undefined
})
export const minLength = memoize((min: number) => (value: string) => {
  return value && value.trim().length < min ? `Must be ${min} characters or more` : undefined
})
export const minValue = memoize((min: number) => (value: string) => {
  return value && parseInt(value, 10) < min ? `Must be at least ${min}` : undefined
})

export const number = (value: string) => (value && isNaN(Number(value)) ? 'Must be a number' : undefined)
export const integer = (value: string) =>
  value && (isNaN(Number(value)) || parseInt(value, 10) % 1 !== 0) ? 'Must be an integer' : undefined
export const required = (value: string) => (value && value.trim().length > 0 ? undefined : 'Required')
