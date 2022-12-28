#!/bin/bash
pkg bin/s -t node16-macos-x64 --out-path pkg/macos
pkg bin/s -t node16-linux-x64 --out-path pkg/linux
pkg bin/s -t node16-win-x64 --out-path pkg/windows