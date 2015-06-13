'use strict';

angular.module('myApp.orderMenu', [])
.controller('OrderMenuCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http', 
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

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

	$scope.minus = function (index) {

	};

	$scope.add = function (index) {

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

	$scope.getMenu = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/merchant/menu/get', {
			id: $scope.data.id
		});
			
		responsePromise.success(function(data, status, headers, config) {
			console.log(data);

			$scope.menu = data;
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.getMenu();
}]);