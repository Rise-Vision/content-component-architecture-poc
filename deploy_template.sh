#!/usr/bin/env bash

TEMPLATES_BASE=$1
STAGE=$2
PRODUCT_CODE=$3
TEMPLATE=$4

STAGE_LIST=$STAGE
if [[ $STAGE == 'all' ]]
then
  STAGE_LIST='staging,beta,stable'
fi

for current_stage in $( echo $STAGE_LIST | tr ',' '\n' )
do
  TARGET=$TEMPLATES_BASE/$STAGE/templates/$PRODUCT_CODE

  echo Deploying $STAGE_LIST version of $TEMPLATE to $TARGET

  echo gsutil -m rsync -d -r $TEMPLATE/build/prod $TARGET
  echo gsutil -m setmeta -r -h "Cache-Control:private, max-age=0" $TARGET
  echo gsutil -m acl -r ch -u AllUsers:R $TARGET
done
