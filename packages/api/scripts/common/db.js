const { Client } = require('pg')
const knexFile = require('../../knexfile.js')

module.exports = {
  getDb () {
    const env = process.env.NODE_ENV
    if (!env || !knexFile[env]) throw new Error(`no db connection for NODE_ENV ${env}`)
    return new Client(knexFile[env].connection)
  }
}
