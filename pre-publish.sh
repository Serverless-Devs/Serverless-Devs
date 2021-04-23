#!/bin/bash

ncc build lib/init/index.js -o release/init
ncc build lib/s.js -o release/s
ncc build lib/cli/index.js -o release/cli
ncc build lib/config/index.js -o release/config
ncc build lib/config/add/index.js -o release/config/add
ncc build lib/config/delete/index.js -o release/config/delete
ncc build lib/config/get/index.js -o release/config/get

ncc build lib/set/index.js -o release/set

ncc build lib/set/language/index.js -o release/set/language
ncc build lib/set/registry/index.js -o release/set/registry