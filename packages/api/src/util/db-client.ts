import { Client } from 'pg'

export function create (uri?: string) {
  return new Client(uri || process.env.DATABASE_URL)
}

export async function createConnected (uri?: string) {
  const client = create(uri)
  await client.connect()
  return client
}
