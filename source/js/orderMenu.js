'use strict';

angular.module('myApp.orderMenu', [])
.controller('OrderMenuCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http', 
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.data = JSON.parse($stateParams.properties);

	if (!$scope.data) {
		$rootScope.go('/search');
	}

	var menu = $scope.data.restaurant.data.menu;
	$scope.menu = {};

	for (var i = 0; i < menu.length; i++) {
		$scope.menu[i] = {
			id: menu[i].id,
			name: menu[i].name,
			price: menu[i].price,
			count: 0
		};
	}

	if ($scope.isMenu === undefined) {
		$scope.isMenu = true;
	}

	$scope.goSearch = function () {	
		$rootScope.go('/search');
	};

	$scope.minus = function (id) {
		$scope.menu[id].count--;

		if ($scope.menu[id].count < 0) {
			$scope.menu[id].count = 0;
		}
	};

	$scope.add = function (id) {
		$scope.menu[id].count++;
	};

	$scope.goMenu = function () {
		$scope.isMenu = true;
	};

	$scope.goOrder = function () {
		$scope.isMenu = false;
	};

	$scope.checkout = function () {
		$rootScope.go('/checkout');
	};
}]);