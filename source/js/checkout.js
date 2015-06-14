'use strict';

angular.module('myApp.checkout', [])
.controller('CheckoutCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http', 
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.data = JSON.parse($stateParams.properties);

	var responsePromise = $http.post(window.app.HOST + '/api/order/check/get', $scope.data);
		
	responsePromise.success(function(data, status, headers, config) {
		console.log(data)
		$scope.check = data.check;
	});

	responsePromise.error(function(data, status, headers, config) {
		console.error('fail', data);
	});

	$scope.goBack = function () {
		$rootScope.go('/orderMenu', {
			restaurant: $scope.data.restaurant,
			tableId: $scope.data.tableId
		});
	};
}]);