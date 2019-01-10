import * as helmet from 'koa-helmet'
import { isDev } from 'common'

export function createMiddleware () {
  const options = {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'", 'data:'],
        fontSrc: ["'self'", 'data:', 'https://fonts.gstatic.com/', 'https://fonts.googleapis.com/'],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.gstatic.com/', 'https://fonts.googleapis.com/']
      }
    },
    referrerPolicy: { policy: 'no-referrer' }
  }
  // note that these options are mutually exclusive
  if (isDev) {
    // enable these tso that GraphiQL can work
    options.contentSecurityPolicy.directives.scriptSrc.push("'unsafe-inline'")
    options.contentSecurityPolicy.directives.scriptSrc.push("'unsafe-eval'")
  } else {
    // note that this hash is the single exception that we make to load the initial page loader javascript
    // that is an inline script in the root index.html page.  This whitelists the otherwise unsafe
    // inline javascript
    // options.contentSecurityPolicy.directives.scriptSrc.push("'sha256-1xxiJKv6VDywL35FZhTROWe1ONocWj7o9fVyBy3IAGg='")
  }
  return helmet(options)
}
