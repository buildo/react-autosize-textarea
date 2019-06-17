#!/bin/sh

set -e

yarn install --no-progress
yarn typecheck
yarn test
