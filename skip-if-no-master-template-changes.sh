#!/usr/bin/env bash

if [[ "$CIRCLE_BRANCH" == "master" ]] && [[ ! -f build_tmp/template ]]
then
    circleci-agent step halt
fi
