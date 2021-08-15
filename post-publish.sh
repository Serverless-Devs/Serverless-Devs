#!/bin/bash
ncc cache clean
ncc build lib/index.js -m -o lib
ncc build lib/init/index.js -m -o lib/init
ncc build lib/cli/index.js -m -o lib/cli
ncc build lib/config/index.js -m -o lib/config
ncc build lib/config/add/index.js -m -o lib/config/add
ncc build lib/config/delete/index.js -m -o lib/config/delete
ncc build lib/config/get/index.js -m -o lib/config/get
ncc build lib/set/index.js -m -o lib/set
ncc build lib/set/registry/index.js -m -o lib/set/registry