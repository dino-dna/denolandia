import 'perish'
import { API_ROOT_DIRNAME } from '../constants'
import { createPostGraphileSchema } from 'postgraphile'
import { generateNamespace } from '@gql2ts/from-schema'
import { getConnectionString } from './db-config'
import { isDev } from 'common'
import { resolve } from 'path'
import * as bluebird from 'bluebird'
import * as fs from 'fs-extra'
import { createConfiguration } from './postgraphql'
const SCHEMA_NAME = 'denolandiaQL'

const packagesRoot = resolve(API_ROOT_DIRNAME, '..')
const envFilename = resolve(API_ROOT_DIRNAME, `.env.development`)

async function createTypings () {
  require('dotenv').config({ path: envFilename })
  const uri = process.env.DATABASE_URL || (await getConnectionString())
  const schema = await createPostGraphileSchema(uri, 'denolandia', {
    ...(createConfiguration() as any),
    ...{ includeExtensionResources: true }
  })
  const tsSchema = generateNamespace(SCHEMA_NAME, schema as any)
  // extract only folders from packages/ dir.
  // in theory, that's all there ever is, but weird little system file artifacts
  // have crept in, e.g. .DS_Store, etc
  const subpackageDirnames = await bluebird.filter(
    (await fs.readdir(packagesRoot)).map(str => resolve(packagesRoot, str)),
    pkgFilename => fs.lstat(pkgFilename).then(stat => stat.isDirectory())
  )
  await Promise.all(
    subpackageDirnames.map(async pkgRoot => {
      const pkgTypingsDirname = resolve(pkgRoot, 'typings')
      const typingFilename = resolve(pkgTypingsDirname, `${SCHEMA_NAME}.d.ts`)
      try {
        await fs.mkdir(pkgTypingsDirname)
      } catch (err) {
        if (err.code !== 'EEXIST') throw err
      }
      return fs.writeFile(typingFilename, tsSchema)
    })
  )
}

void (async function go () {
  if (!isDev) return
  await createTypings()
  console.log('[create-schema-typings] typings created successfully')
})()
