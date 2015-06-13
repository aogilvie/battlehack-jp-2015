'use strict';

angular.module('myApp.table', [])
.controller('TableCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http',
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.restaurant = JSON.parse($stateParams.properties);

	if (!$scope.restaurant) {
		$rootScope.go('/search');
	}

	$scope.tableId = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';

	$scope.goBack = function () {
		$rootScope.go('/restaurant', $scope.restaurant);
	};

	$scope.goToOrderMenu = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/table/join/', {
			secret: 'secret',
			merchantId: $scope.restaurant.uid,
			tableId: $scope.tableId,
			userId: 'userId'
		});
			
		responsePromise.success(function(data, status, headers, config) {
			console.log(data)

			clearTimeout(timeout);

			$rootScope.go('/orderMenu', {
				id: $scope.restaurant.uid,
				tableId: $scope.tableId,
				data: data
			});
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.players = [67563683055, 67563683056];


	var timeout = setInterval(function() {
		$scope.getUsers();
	}, 1000);

	$scope.getUsers = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/table/users/', {
			secret: 'secret',
			merchantId: $scope.restaurant.uid,
			tableId: $scope.tableId
		});
			
		responsePromise.success(function(data, status, headers, config) {

			console.log(data)

			//$scope.players = data;
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.scanBeacons = function () {

	};
}]);