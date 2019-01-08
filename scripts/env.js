const dotenv = require('dotenv')
const fs = require('fs-extra')

const mod = {
  async load (envFilename) {
    try {
      await fs.lstat(envFilename)
    } catch (err) {
      if (err.code !== 'ENOENT') throw err
      console.warn(`${envFilename} not found. skipping env loading`)
      return
    }
    dotenv.load({ path: envFilename })
  }
}
module.exports = mod
