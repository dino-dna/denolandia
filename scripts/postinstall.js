const execa = require('execa')

const isProd = (process.env.NODE_ENV || '').match(/prod/i)

if (isProd) execa.shell(`yarn postinstall:prod`, { stdio: 'inherit' })
else console.warn('skipping post install hook - production not detected')
