#!/bin/bash

rm -rf source/libs/
mkdir -p source/libs/
cp -R bower_components/ionic/release/js/ionic.bundle.js source/libs/

rm -rf mobile/www/
cp -R source mobile/www/

pushd mobile/
../node_modules/cordova/bin/cordova prepare
popd