import * as Knex from 'knex'

const user = 'api'

export async function up (knex: Knex) {
  await knex.raw(
    `create role ${user} with login password '${
      process.env.POSTGRES_PASSWORD_API_USER
    }';`
  )
  await knex.raw(`
    grant usage on schema auth to ${user};
    grant usage on schema denolandia to ${user};
    grant all on all tables in schema denolandia to ${user};
    grant all on all sequences in schema denolandia to ${user};
    grant execute on all functions in schema denolandia to ${user};
  `)
}

export async function down (knex: Knex) {
  await knex.raw(`drop role ${user};`)
}
