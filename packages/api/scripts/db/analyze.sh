#!/usr/bin/env bash
. scripts/db/psql-cmd.sh

mypsql > analysis.json <<SQL
EXPLAIN (ANALYZE, COSTS, VERBOSE, BUFFERS, FORMAT JSON)
  select *
  from "denolandia"."premium"
  where (TRUE) and (TRUE)
  order by "mls" DESC
  limit 10;
SQL
