import 'perish'
import { resolve } from 'path'
import { Service } from './index'
import * as fs from 'fs-extra'
const debug = require('debug')('denolandia:api:bin')
const dotenv = require('dotenv')

async function start () {
  const envConfigFilename = resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
  try {
    await fs.lstat(envConfigFilename)
    debug(`booting with env file: ${envConfigFilename}`)
    dotenv.config({ path: envConfigFilename })
  } catch (err) {
    debug(`booting without env file. no file found: ${envConfigFilename}`)
  }
  if (!process.env.NODE_ENV) {
    console.error(
      [
        'please set a NODE_ENV environment variable. ',
        'for example, add \n\n\texport NODE_ENV=development\n\n',
        'into your .bashrc or simply run NODE_ENV=development <script>'
      ].join('')
    )
    process.exit(1)
  }
  var service = new Service()
  service.start({})
}
start()
