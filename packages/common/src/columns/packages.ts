import { JsPgColumnMapping } from '../interfaces'

export const columnsByName = {
  id: {
    name: 'id',
    jsType: 'number',
    pgType: 'int',
    sql: 'id serial'
  },
  name: {
    name: 'name',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'name varchar not null'
  },
  organization_name: {
    name: 'organization_name',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'organization_name varchar not null'
  },
  project_name: {
    name: 'project_name',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'project_name varchar not null'
  },
  description_html: {
    name: 'description_html',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'description_html varchar'
  },
  homepage_url: {
    name: 'homepage_url',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'homepage_url varchar'
  },
  topics: {
    name: 'topics',
    jsType: 'object',
    pgType: 'jsonb',
    sql: 'topics jsonb'
  },
  issue_count: {
    name: 'issue_count',
    jsType: 'number',
    pgType: 'int',
    sql: 'issue_count int'
  },
  stargazer_count: {
    name: 'stargazer_count',
    jsType: 'number',
    pgType: 'int',
    sql: 'stargazer_count int'
  },
  repository_url: {
    name: 'repository_url',
    jsType: 'string',
    pgType: 'varchar',
    sql: 'repository_url varchar not null'
  }
}

export const columns: JsPgColumnMapping[] = Object.values(columnsByName)
