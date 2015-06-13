'use strict';

angular.module('myApp.restaurant', [])
.controller('RestaurantCtrl', ['$scope', '$rootScope', '$location', '$state', '$stateParams', function ($scope, $rootScope, $location, $state, $stateParams) {
	var id = JSON.parse($stateParams.properties);

	$scope.title = 'Restaurant';
}]);