import * as Koa from 'koa'
import { denolandia } from '../interfaces'

export function get (app: Koa, services: denolandia.IServices) {
  return function respondStatus (ctx: Koa.Context) {
    ctx.body = {}
  }
}
