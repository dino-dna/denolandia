import { dirname, basename } from 'path'
import * as createDebug from 'debug'
import * as fs from 'fs-extra'
import * as Koa from 'koa'
import multer = require('koa-multer')

const debug = createDebug('denolandia:upload:generic')

export async function generic (ctx: Koa.Context, filename: string) {
  const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
      const destDirname = dirname(filename)
      try {
        await fs.mkdirp(destDirname)
      } catch (err) {
        if (err.code !== 'EEXIST') {
          cb(err, '')
          throw err
        }
      }
      cb(null, destDirname)
    },
    filename: (req, file, cb) => cb(null, basename(filename))
  })
  const mult = multer({ storage })
  const handler = mult.any()
  await handler(ctx, async () => {
    debug(`tempfile ${filename} written successfully`)
  })
}
