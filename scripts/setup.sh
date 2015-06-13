#!/bin/bash

./node_modules/bower/bin/bower install ionic
./node_modules/cordova/bin/cordova create mobile

pushd mobile
../node_modules/cordova/bin/cordova platform add ios android browser
../node_modules/cordova/bin/cordova plugin add com.paypal.cordova.mobilesdk
../node_modules/cordova/bin/cordova plugin add org.apache.cordova.console
../node_modules/cordova/bin/cordova plugin add https://github.com/aogilvie/phonegap-plugin-iBeacon
../node_modules/cordova/bin/cordova plugin add https://github.com/aogilvie/phonegap-facebook-plugin --variable APP_ID=1601282223489096 --variable APP_NAME=smartlet

popd
