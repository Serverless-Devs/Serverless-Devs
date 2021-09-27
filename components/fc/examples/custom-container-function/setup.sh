#!/usr/bin/env bash

set -e

# git clone && cd repo

source .env
s config add --AccessKeyID "$AccessKeyID" --AccessKeySecret "$AccessKeySecret" --AccountID "$AccountID" --aliasName "$aliasName"

s build --use-docker

s deploy --push-registry acr-internet --use-local -y
