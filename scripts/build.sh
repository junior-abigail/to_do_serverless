#!/bin/bash

BUILD_STAGE=$1
BACKEND_BUILD_DIR=${PROJECT_DIR}/.build_output

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

# build api
sam validate --template ${PROJECT_DIR}/src/template.yaml
sam build \
    --build-dir ${BACKEND_BUILD_DIR} \
    --template  ${PROJECT_DIR}/src/template.yaml \
    --base-dir  ${PROJECT_DIR}/src/ \
    --manifest  ${PROJECT_DIR}/src/api/requirements.txt

# build ui
## TODO
