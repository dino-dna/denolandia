const { resolve } = require('path')
const debug = require('debug')('denolandia:knex:migration')
const fs = require('fs-extra')

const envFilename = resolve(
  __dirname,
  `.env.${process.env.NODE_ENV || 'development'}`
)

try {
  debug(`loading env file: ${envFilename}`)
  fs.lstatSync(envFilename)
  require('dotenv').config({ path: envFilename })
} catch (err) {
  if (err.code === 'ENOENT') {
    debug(`${envFilename} not found. skipping env load`)
  } else {
    throw err
  }
}

const HOSTNAME = process.env.DB_HOSTNAME || '127.0.0.1'

const base = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: HOSTNAME,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    searchPath: ['public']
  },
  migrations: {
    tableName: 'migrations',
    schemaName: 'public'
  }
}

const development = Object.assign({}, base)

const production = Object.assign({}, base)

const test = Object.assign({}, base)

const config = {
  development,
  production,
  test
}

debug(config)
// http://knexjs.org/#Migrations-CLI
module.exports = config
