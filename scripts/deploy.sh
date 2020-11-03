#!/bin/bash

export BUILD_STAGE=$1
export PROJECT_DIR=$(pwd)

set -e

if [ -z "${BUILD_STAGE}" ]; then
    echo "usage: source deploy.sh <build_stage>"
    exit 1
fi

source ${PROJECT_DIR}/scripts/build.sh ${BUILD_STAGE}

# # deploy backend
# sam deploy \
#     --template     ${BUILD_DIR_API}/template.yaml \
#     --stack-name   ToDo-${BUILD_STAGE} \
#     --capabilities CAPABILITY_NAMED_IAM \
#     --s3-bucket    jmm-sam-deployments \
#     --parameter-overrides \
#         ParameterKey=Lifecycle,ParameterValue=${BUILD_STAGE}

# deploy ui
## TODO

set +e
