import * as Knex from 'knex'

const schemaNames = ['auth', 'denolandia']

export async function up (knex: Knex) {
  await Promise.all(
    schemaNames.map(schemaName => knex.raw(`create schema ${schemaName}`))
  )
  await knex.raw(`
    CREATE OR REPLACE FUNCTION denolandia.is_admin() RETURNS boolean AS $$
      BEGIN
        RETURN nullif(current_setting('denolandia.is_admin', true), '')::text = 'true';
      END;
    $$ LANGUAGE plpgsql stable security definer;
  `)
}

export async function down (knex: Knex) {
  await Promise.all(
    schemaNames
      .reverse()
      .map(schemaName => knex.raw(`drop schema ${schemaName} cascade`))
  )
}
