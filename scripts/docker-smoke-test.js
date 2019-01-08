require('perish')
const { promisify } = require('util')
const axios = require('axios')
const bluebird = require('bluebird')
const freeportCb = require('freeport')
const execa = require('execa')
const path = require('path')
const retry = require('promise-retry')

const RUN_ID = Date.now()
  .toString()
  .substr(-6)
const DB_CONTAINER_NAME = `db_${RUN_ID}`
const API_CONTAINER_NAME = `api_${RUN_ID}`

const CHILD_PROCCES_OPTS = { stdio: 'inherit' }

const cleanContainer = name => execa.shell(`docker kill ${name}`)
const cleanContainers = () =>
  Promise.all([DB_CONTAINER_NAME, API_CONTAINER_NAME].map(cleanContainer))
const freeport = promisify(freeportCb)
const isStopped = proc => proc.exitCode !== null
const log = (...args) =>
  console.error('[denolandia-container-smoke-test]', ...args)

const API_IMAGE = `denolandia-dash-service-${process.env.ENVIRONMENT}:latest`
const PG_IMAGE = 'postgres:alpine'
const ENV_FILE_FILENAME = path.resolve(__dirname, '../packages/api/.env.test')

/**
 * launch a db container and an api container on a private network. configure the
 * api to point to the db, and attempt to call an api route.
 */
async function go () {
  // create private network
  log('creating private, random smoke test network')
  const networkName = await createNetwork()
  const db = createDb(networkName)
  const runApi = () => createApi(networkName)
  const { process: api, port: apiPort } = await runApi()
  const state = {
    apiPort,
    proceses: { api, db }
  }
  try {
    await testApiRoute(state, runApi)
  } finally {
    Object.values(state.proceses).forEach(proc =>
      proc.catch(() => {
        // noop. let the container processes die ungracefully and not disrupt _this_ process
      })
    )
    log('cleaning smoke test containers')
    await cleanContainers()
    log('pruning docker networks')
    await execa.shell(`docker network rm ${networkName}`, CHILD_PROCCES_OPTS)
  }
}

async function createApi (networkName) {
  const port = await freeport()
  const apiArgs = [
    'run',
    '--name',
    API_CONTAINER_NAME,
    `--network`,
    networkName,
    '--rm',
    '--publish',
    `${port}:9090`,
    '--env-file',
    ENV_FILE_FILENAME,
    '--env',
    `DB_HOSTNAME=${DB_CONTAINER_NAME}`,
    API_IMAGE
  ]
  log(`running container: docker ${apiArgs.join(' ')}`)
  const process = execa('docker', apiArgs, CHILD_PROCCES_OPTS)
  return { process, port }
}

function createDb (networkName) {
  const dbArgs = [
    'run',
    `--network`,
    networkName,
    '--rm',
    '--name',
    DB_CONTAINER_NAME,
    `--env-file`,
    ENV_FILE_FILENAME,
    '--env',
    'POSTGRES_USER=denolandia',
    PG_IMAGE
  ]
  throw new Error('NO MORE POSTGRES_USER')
  // log(`running container: docker ${dbArgs.join(' ')}`)
  // return execa('docker', dbArgs, CHILD_PROCCES_OPTS)
}

async function createNetwork () {
  const networkName = `eops_smoke_${RUN_ID}`
  await execa.shell(
    `docker network create --driver bridge ${networkName}`,
    CHILD_PROCCES_OPTS
  )
  return networkName
}

async function testApiRoute (state, runApi) {
  return retry(
    async rt => {
      try {
        const url = `http://localhost:${state.apiPort}/api/hello`
        log(`attempting api call to ${url}`)
        const res = await axios.get(url)
        return log(`api responded with: ${res.data}`)
      } catch (err) {
        if (isStopped(state.proceses.db)) {
          throw new Error('db container is unexpectedly stopped')
        }
        if (isStopped(state.proceses.api)) {
          log('api died. attempting reboot')
          const { process: api, port: apiPort } = await runApi()
          state.proceses.api = api
          state.apiPort = apiPort
          await bluebird.delay(1000)
        }
        return rt(err)
      }
    },
    { factor: 1 }
  )
}

go()
