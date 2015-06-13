'use strict';

angular.module('myApp.restaurant', [])
.controller('RestaurantCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', 
	function ($scope, $rootScope, $location, $state, $stateParams) {

	$scope.restaurant = JSON.parse($stateParams.properties);

	$scope.goBack = function () {
		$rootScope.go('/search');
	};

	$scope.goTable = function () {
		$rootScope.go('/table', $scope.restaurant);
	};
}]);