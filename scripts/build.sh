#!/bin/bash

export BUILD_STAGE=$1
export BUILD_DIR=${PROJECT_DIR}/.build
export BUILD_DIR_API=${BUILD_DIR}/api
export BUILD_DIR_UI=${BUILD_DIR}/ui

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
# sam validate --template ${PROJECT_DIR}/src/template.yaml
# sam build \
#     --build-dir ${BUILD_DIR_API} \
#     --template  ${PROJECT_DIR}/src/template.yaml \
#     --base-dir  ${PROJECT_DIR}/src/ \
#     --manifest  ${PROJECT_DIR}/src/api/requirements.txt

# build ui
pushd ${PROJECT_DIR}/src/ui/
npm install
npm run build
