import * as common from 'common'
import * as Knex from 'knex'

export async function up (knex: Knex) {
  await knex.raw(`
    create table denolandia.packages (
      ${common.columns.packages.columns.map(column => column.sql).join(',\n')},
      primary key (name, organization_name, project_name),
      unique (id)
    );
  `)
  await knex.raw(`
    alter table denolandia.packages enable row level security;
    alter table denolandia.packages force row level security;
  `)
  await knex.raw(`
    create policy update_packages
      on denolandia.packages
      using (true)
      with check (
        denolandia.is_admin()
      );
  `)
}

export async function down (knex: Knex) {
  await knex.raw('drop table denolandia.packages')
}
