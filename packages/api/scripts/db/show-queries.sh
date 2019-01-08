#!/usr/bin/env bash
. scripts/db/psql-cmd.sh

mypsql <<SQL
SELECT pid, age(clock_timestamp(), query_start), usename, query
FROM pg_stat_activity
WHERE query != '<IDLE>' AND query NOT ILIKE '%pg_stat_activity%'
ORDER BY query_start desc;
SQL
