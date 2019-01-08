export interface IDbConnectionProps {
  hostname?: string
  user?: string
  database?: string
  password?: string
  port?: number | string
}

export function getConnectionString (opts?: Partial<IDbConnectionProps>) {
  opts = opts || {}
  let { hostname, user, database, password, port } = opts
  hostname = hostname || process.env.DB_HOSTNAME || '127.0.0.1'
  user = user || process.env.POSTGRES_USER || 'api'
  password = password || process.env.POSTGRES_PASSWORD || 'apidev'
  database = database || process.env.POSTGRES_DATABASE || 'postgres'
  port =
    port ||
    (process.env.POSTGRES_PORT && parseInt(process.env.POSTGRES_PORT, 10)) ||
    5432
  const uri = `postgres://${user}:${password}@${hostname}:${port}/${database}`
  return uri
}
