#!/usr/bin/env bash
# set -x
set -e

printf "\n== SYS INSPECTION\n\n"
echo "uname -a"
uname -a
echo "echo \$PWD"
echo $PWD
echo $SHELL
echo $BASH
echo $USER

printf "\n== TOOLING INSPECTION\n\n"
echo "node -v:"
node -v
echo "docker -v:"
docker -v
echo "yarn -v:"
yarn -v

printf "\n== PACKAGE INSPECTION\n\n"
for package_name in $(ls packages)
do
  dir="$PWD/packages/$package_name"
  pkg="$dir/package.json"
  lock="$dir/yarn.lock"
  echo "inspecting $(basename $dir)"
  if [ -f $lock ]; then
    echo "  ✓ lock exists"
  else
    echo "  x lock missing"
  fi
  cat "$pkg" | jq '{name: .name, version: .version, dependencies: { common: .dependencies.common } }'
  echo
done
