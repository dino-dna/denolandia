#! /usr/bin/env bash
. scripts/db/psql-cmd.sh
$mypsql $@

# util

## copy listings table to local file
# echo "copy denolandia.listings to stdout csv header;" | ./psql.sh  > listings.bulk.csv
