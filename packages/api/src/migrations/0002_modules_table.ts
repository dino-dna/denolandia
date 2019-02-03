import * as common from 'common'
import * as Knex from 'knex'

export async function up (knex: Knex) {
  await knex.raw(`
    create table denolandia.modules (
      ${common.columns.modules.columns.map(column => column.sql).join(',\n')},
      primary key (name, organization_name, project_name),
      unique (id)
    );
  `)
  await knex.raw(`
    alter table denolandia.modules enable row level security;
    alter table denolandia.modules force row level security;
  `)
  await knex.raw(`
    create policy update_modules
      on denolandia.modules
      using (true)
      with check (
        denolandia.is_admin()
      );
  `)
}

export async function down (knex: Knex) {
  await knex.raw('drop table denolandia.modules')
}
