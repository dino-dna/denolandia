import { denolandia } from '../interfaces'

// var socket = require('socket.io')
// var common = require('common')
// var events = require('events')

module.exports = function wsService (config: denolandia.IServiceInputs) {
  // @TODO revive websockets when ready
  return config
  // const { app, opts, logger } = config
  // var emitter = new events.EventEmitter()
  // var userIdSocketMap = new Map()
  // var socketUserMap = new Map()
  // var io = socket(app.linkupServer)
  // io.on('connection', socket => {
  //   socket.on(common.msg.USER_AUTHENTICATED, async ({ id }) => {
  //     if (!id) {
  //       return logger.error(
  //         `invalid user attempted to auth over sockets: ${id}`
  //       )
  //     }
  //     userIdSocketMap.set(id, socket)
  //     socketUserMap.set(socket, id)
  //   })
  //   socket.on('disconnect', reason => {
  //     if (socketUserMap.has(socket)) {
  //       let userId = socketUserMap.get(socket)
  //       socketUserMap.delete(socket)
  //       userIdSocketMap.delete(userId)
  //       // emitter.emit(msg.ON_USER_DISCONNECT, {userId, socket})
  //     }
  //   })
  // })
  // return {
  //   emitter,
  //   io,
  //   userIdSocketMap,
  //   socketUserMap
  // }
}
