#!/bin/bash
pkg bin/s -t node16-macos-x64 --out-path pkg/macos
pkg bin/s-cli -t node16-macos-x64 --out-path pkg/macos

pkg bin/s -t node16-linux-x64 --out-path pkg/linux
pkg bin/s-cli -t node16-linux-x64 --out-path pkg/linux


# pkg . -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-clean -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-cli -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-component -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-config -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-config-add -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-config-delete -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-config-get -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-config-rename -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-edit -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-init -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-set -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-set-analysis -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-set-proxy -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-set-registry -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-set-workspace -t node16-linux-x64 --out-path pkg/linux
# pkg bin/s-verify -t node16-linux-x64 --out-path pkg/linux