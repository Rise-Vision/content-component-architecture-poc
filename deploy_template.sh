#!/usr/bin/env bash

TEMPLATES_BASE=$1
STAGE_LIST=$2
PRODUCT_CODE=$3
TEMPLATE=$4

for STAGE in $( echo $STAGE_LIST | tr ',' '\n' )
do
  TARGET=$TEMPLATES_BASE/$STAGE/templates/$PRODUCT_CODE

  echo Deploying $STAGE version of $TEMPLATE to $TARGET

  if [[ "$CIRCLE_BRANCH" == "master" ]] # still not deploy on master
  then
    echo gsutil -m rsync -d -r $TEMPLATE/build/prod $TARGET
    echo gsutil -m setmeta -r -h "Cache-Control:private, max-age=0" $TARGET
    echo gsutil -m acl -r ch -u AllUsers:R $TARGET
  else
    gsutil -m rsync -d -r $TEMPLATE/build/prod $TARGET
    gsutil -m setmeta -r -h "Cache-Control:private, max-age=0" $TARGET
    gsutil -m acl -r ch -u AllUsers:R $TARGET
  fi
done
