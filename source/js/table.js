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
		$rootScope.go('/restaurant', $scope.restaurant.id);
	};

	$scope.goToOrderMenu = function () {
		$rootScope.go('/orderMenu', {
			id: $scope.restaurant.id,
			tableId: 3
		});
	};

	$scope.tableId = 3;
}]);