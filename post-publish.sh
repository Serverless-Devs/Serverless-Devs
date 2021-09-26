#!/bin/bash
ncc cache clean
ncc build lib/index.js -m -e @serverless-devs/core -e update-notifier -o lib
ncc build lib/init/index.js -m -e @serverless-devs/core -e update-notifier -o lib/init
ncc build lib/cli/index.js -m -e @serverless-devs/core -e update-notifier -o lib/cli
ncc build lib/config/index.js -m -e @serverless-devs/core -e update-notifier -o lib/config
ncc build lib/config/add/index.js -m -e @serverless-devs/core -e update-notifier -o lib/config/add
ncc build lib/config/delete/index.js -m -e @serverless-devs/core -e update-notifier -o lib/config/delete
ncc build lib/config/get/index.js -m -e @serverless-devs/core -e update-notifier -o lib/config/get
ncc build lib/set/index.js -m -e @serverless-devs/core -e update-notifier -o lib/set
ncc build lib/set/registry/index.js -m -e @serverless-devs/core -e update-notifier -o lib/set/registry
ncc build lib/set/locale/index.js -m -e @serverless-devs/core -e update-notifier -o lib/set/locale
ncc build lib/set/analysis/index.js -m -e @serverless-devs/core -e update-notifier -o lib/set/analysis