#!/bin/bash
ncc cache clean
ncc build lib/index.js -o lib
ncc build lib/init/index.js -o lib/init
ncc build lib/cli/index.js -o lib/cli
ncc build lib/config/index.js -o lib/config
ncc build lib/config/add/index.js -o lib/config/add
ncc build lib/config/delete/index.js -o lib/config/delete
ncc build lib/config/get/index.js -o lib/config/get
ncc build lib/set/index.js -o lib/set
ncc build lib/set/language/index.js -o lib/set/language
ncc build lib/set/registry/index.js -o lib/set/registry