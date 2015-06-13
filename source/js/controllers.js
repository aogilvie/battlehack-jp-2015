'use strict';

angular.module('myApp.controllers', [])
.controller('IndexCtrl', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {
    // Out main controller
    $rootScope.back = function () {
        $window.history.back();
    }
    
    $rootScope.go = function (path, properties) {
        if (properties) {
            properties = JSON.stringify(properties);
            path = path.split("/");
            $state.go(path[1], { properties: properties });
        } else {
            $location.url(path);
        }
    }
}])