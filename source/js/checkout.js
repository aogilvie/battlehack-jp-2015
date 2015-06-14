'use strict';

angular.module('myApp.checkout', [])
.controller('CheckoutCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http', 
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.data = JSON.parse($stateParams.properties);

	var responsePromise = $http.post(window.app.HOST + '/api/order/check/get', $scope.data);
		
	responsePromise.success(function(data, status, headers, config) {
		console.log(data)
		$scope.orders = data;
	});

	responsePromise.error(function(data, status, headers, config) {
		console.error('fail', data);
	});
}]);