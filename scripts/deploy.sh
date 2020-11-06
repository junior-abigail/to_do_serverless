#!/bin/bash

export BUILD_STAGE=${1:-'dev'}
export AWS_REGION=${2:-'us-east-1'}
export S3_BUCKET_NAME=${3:-'jmm-to-do-ui'}

export PROJECT_DIR=$(pwd)
export BUILD_DIR=${PROJECT_DIR}/.build
export BUILD_DIR_API=${BUILD_DIR}/api
export BUILD_DIR_UI=${BUILD_DIR}/ui

set -e

if [ -z "${BUILD_STAGE}" ]; then
    echo "usage: source deploy.sh <build_stage>"
    exit 1
fi

if [ ! -d .venv ]; then
    echo "creating virtual environment"
    python3 -m venv .venv
fi

source .venv/bin/activate
python3 -m pip install --upgrade pip
pip install --upgrade aws-sam-cli

rm -rf ${BUILD_DIR}
mkdir -p ${BUILD_DIR_API} ${BUILD_DIR_UI}

# build api
sam validate --template ${PROJECT_DIR}/src/template.yaml
sam build \
    --build-dir ${BUILD_DIR_API} \
    --template  ${PROJECT_DIR}/src/template.yaml \
    --base-dir  ${PROJECT_DIR}/src/ \
    --manifest  ${PROJECT_DIR}/src/api/requirements.txt

# deploy backend
sam deploy \
    --template     ${BUILD_DIR_API}/template.yaml \
    --stack-name   ToDo-${BUILD_STAGE} \
    --capabilities CAPABILITY_NAMED_IAM \
    --s3-bucket    jmm-sam-deployments \
    --parameter-overrides \
        ParameterKey=Lifecycle,ParameterValue=${BUILD_STAGE}

export API_ID=$(aws apigateway get-rest-apis | python3 -c '\
    import sys, json; apis = json.load(sys.stdin)["items"]; \
    print(next(api["id"] for api in apis if api["name"] == "ToDo-dev"))')

export API_URL="https://${API_ID}.execute-api.${AWS_REGION}.amazonaws.com/v1"

# build ui
pushd ${PROJECT_DIR}/src/ui/
npm install
npm run build

# deploy ui
aws s3 sync ${BUILD_DIR_UI} s3://${S3_BUCKET_NAME} --acl public-read

set +e
