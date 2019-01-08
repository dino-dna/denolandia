const path = require('path')
const chokidar = require('chokidar')
const bb = require('bluebird')

const BUILD_DIRNAME = path.resolve(__dirname, '../build')
const MIGRATION_DIRNAME = path.resolve(BUILD_DIRNAME, 'migrations')

const watcher = chokidar.watch(BUILD_DIRNAME)
watcher.on('addDir', async createdPath => {
  if (createdPath !== MIGRATION_DIRNAME) return
  bb.delay(500) // let the rest of the compile process bottom out, sloppily
  process.exit(0)
})
setTimeout(() => {
  throw new Error(`timed out building: ${MIGRATION_DIRNAME}`)
}, 15 * 1000)
