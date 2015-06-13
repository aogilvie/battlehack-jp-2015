'use strict';

angular.module('myApp.restaurant', [])
.controller('RestaurantCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', 
	function ($scope, $rootScope, $location, $state, $stateParams) {

	var id = JSON.parse($stateParams.properties);

	$scope.goBack = function () {
		$rootScope.go('/search');
	};

	$scope.goTable = function () {
		$rootScope.go('/table', $scope.restaurant);
	};

	$scope.restaurant = {
		id: id,
		name: 'battleshop',
		address: 'asdnasjkdan',
		infos: {
			"open": "123",
			"phone": "123",
			"website": "123",
			"seats": "123"
		}
	};
}]);