const retry = require('promise-retry')
const fetch = require('node-fetch')
const bb = require('bluebird')

async function testConnection () {
  const res = await fetch(`http://localhost:${process.env.PORT || 9090}/api/hello`, { method: 'get' })
  const text = await res.text()
  if (!text.match(/world/i)) throw new Error('hello did not respond with world')
  await bb.delay(1000)
}

retry(tryAgain => testConnection().catch(() => tryAgain()))
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err)
    process.exit(1)
  })
