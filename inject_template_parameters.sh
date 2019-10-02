#!/usr/bin/env bash

TEMPLATE=$1
PRODUCT_CODE=$2

PACKAGE_VERSION=$(grep version $TEMPLATE/package.json | grep -o '[0-9.]*')
TEMPLATE_FILE=$TEMPLATE/build/prod/src/template.html

echo Injecting product_code and template_version to Template

NEW_EXPR="<head><script>var TEMPLATE_PRODUCT_CODE='$PRODUCT_CODE';var TEMPLATE_VERSION='$PACKAGE_VERSION';var TEMPLATE_NAME='$TEMPLATE';</script>"
sed -i.bak '0,/<head>/{s@<head>@'"$NEW_EXPR"'@}' $TEMPLATE_FILE && rm $TEMPLATE_FILE.bak
