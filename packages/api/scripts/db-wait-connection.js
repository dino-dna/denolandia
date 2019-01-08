const retry = require('promise-retry')
const { getDb } = require('./common/db')

async function testConnection () {
  const db = getDb()
  await db.connect()
}

retry(tryAgain => {
  return testConnection().catch(() => tryAgain())
})
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    console.error('failed connecting to database after 10 tries')
    process.exit(1)
  })
