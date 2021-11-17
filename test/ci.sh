#!/bin/bash
echo './bin/s -v'
./bin/s -v

echo './bin/s -h'
./bin/s -h

echo './bin/s config add --AccountID 12345 --AccessKeyID 12345 --AccessKeySecret 12345 -a test -f'
./bin/s config add --AccountID 12345 --AccessKeyID 12345 --AccessKeySecret 12345 -a test -f

echo './bin/s config get'
./bin/s config get

echo './bin/s config delete -a test'
./bin/s config delete -a test

echo './bin/s cli fc-api listServices'
./bin/s cli fc-api

echo './bin/s component'
./bin/s component

echo './bin/s component --component fc-api'
./bin/s component --component fc-api

echo './bin/s clean --component fc-api'
./bin/s clean --component fc-api

echo './bin/s clean --cache'
./bin/s clean --cache



