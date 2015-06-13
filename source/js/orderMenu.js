'use strict';

angular.module('myApp.orderMenu', [])
.controller('OrderMenuCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', 
	function ($scope, $rootScope, $location, $state, $stateParams) {

	$scope.data = JSON.parse($stateParams.properties);

	if (!$scope.data) {
		$rootScope.go('/search');
	}

	if ($scope.isMenu === undefined) {
		$scope.isMenu = true;
	}

	$scope.goSearch = function () {	
		$rootScope.go('/search');
	};

	$scope.minus = function () {

	};

	$scope.add = function () {

	};

	$scope.goMenu = function () {
		console.log($scope.isMenu)
		$scope.isMenu = true;
	};

	$scope.goOrder = function () {
		console.log($scope.isMenu)
		$scope.isMenu = false;
	};

	$scope.menu = [{
		name: 'chicken',
		price: 200,
	}, {
		name: 'lamb',
		price: 1000
	}];
}]);