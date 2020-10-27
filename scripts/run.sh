#!/bin/bash

BUILD_STAGE=$1
PROJECT_DIR=$(pwd)

set -e

if [ -z "${BUILD_STAGE}" ]; then
    echo "usage: source deploy.sh <build_stage>"
    exit 1
fi

source ${PROJECT_DIR}/scripts/build.sh ${BUILD_STAGE}

# run api
sam local start-api --template ${BACKEND_BUILD_DIR}/template.yaml

set +e
