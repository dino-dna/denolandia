#!/usr/bin/env bash

function mypsql () {
  psql -h localhost -U api $@
}
