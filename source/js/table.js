'use strict';

angular.module('myApp.table', [])
.controller('TableCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', 
	function ($scope, $rootScope, $location, $state, $stateParams) {

	$scope.restaurant = JSON.parse($stateParams.properties);

	if (!$scope.restaurant) {
		$rootScope.go('/search');
	}

	$scope.goBack = function () {
		console.log($scope.restaurant)
		$rootScope.go('/restaurant', $scope.restaurant.id);
	};

	$scope.tableId = 3;
}]);