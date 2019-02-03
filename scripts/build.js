#! /usr/bin/env node
require('perish')
const { resolve } = require('path')
const bluebird = require('bluebird')
const chalk = require('chalk')
const execa = require('execa')
const fs = require('fs-extra')
const globCb = require('glob')
const meow = require('meow')
const path = require('path')
const util = require('util')
const glob = util.promisify(globCb)

const LOG_PREFIX = chalk.blue.bold('denolandia-ops-builder :: ')
const ROOT_DIRNAME = resolve(__dirname, '..')
const PKGS_DIRNAME = resolve(ROOT_DIRNAME, 'packages')

const log = (...args) => console.log(LOG_PREFIX, ...args)
const readJson = filename => fs.readFile(filename).then(JSON.parse)

class BuildTask {
  constructor (opts) {
    this.name = opts.name
    this.dependencies = opts.dependencies
    this.dirname = opts.dirname
  }
  async build () {
    if (this._building) return this._building
    log(`[${this.name}] starting ${this.dependencies.length} dependent builds`)
    this._building = this.buildDependenciesAndSelf()
    await this._building
    return this._building
  }
  async buildDependenciesAndSelf () {
    await Promise.all(this.dependencies.map(dep => dep.build()))
    log(`[${this.name}] starting self build @ ${this.dirname}`)
    await execa('yarn', ['build'], { cwd: this.dirname, stdio: 'inherit' })
    log(`[${this.name}] complete`)
  }
}
/**
 * # compile precedence graph
 * common
 * |                \
 * module-scraper    ui
 * |
 * api
 */

async function buildPackages ({ skipUi }) {
  const projectRootDirnames = await glob(`${PKGS_DIRNAME}/*`)
  const pkgJsonsByProjectName = await bluebird.reduce(
    projectRootDirnames,
    async (agg, root) => ({
      ...agg,
      ...{
        [path.basename(root)]: {
          dirname: root,
          package: await readJson(resolve(root, 'package.json'))
        }
      }
    }),
    {}
  )
  const common = new BuildTask({
    name: 'common',
    dependencies: [],
    dirname: pkgJsonsByProjectName.common.dirname
  })
  const packageScraper = new BuildTask({
    name: 'module-scraper',
    dependencies: [common],
    dirname: pkgJsonsByProjectName['module-scraper'].dirname
  })
  const ui = new BuildTask({
    name: 'ui',
    dependencies: [common],
    dirname: pkgJsonsByProjectName.ui.dirname
  })
  const api = new BuildTask({
    name: 'api',
    dependencies: [common, packageScraper],
    dirname: pkgJsonsByProjectName.api.dirname
  })
  await api.build()
  // common needs to be built a 2nd time, for better or worse.  why? because the
  // api build creates table definitions in common, created a chicken before the egg
  // situation.  not the best, but this guarantees that the UI build and the API build
  // both have fully shared table definition sets
  await common.build()
  await ui.build()
}

const cli = meow(
  `
Usage
  $ node scripts/build <input>

Options
  --skip-ui Skip UI build
  --obama, -o  Inspires hope into your build.  Or does it...

Examples
  $ build build # compile all subprojects, max parallelization!
`,
  {
    flags: {
      obama: {
        type: 'boolean',
        alias: 'o'
      },
      skipUi: {
        type: 'boolean'
      }
    }
  }
)
async function go () {
  // await env.load()
  const cmd = cli.input[0]
  if (cli.flags.obama) {
    const res = await execa.shell('curl --silent https://api.tronalddump.io/random/quote | jq .value')
    console.log(`Trump says:\n\t${res.stdout}`)
  }
  if (cmd === 'packages') buildPackages({ skipUi: cli.flags.skipUi })
  else {
    console.error(`unsupported cmd: ${cmd}`)
    process.exit(1)
  }
}
go()
