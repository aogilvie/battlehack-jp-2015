'use strict';

angular.module('myApp.checkout', [])
.controller('CheckoutCtrl', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {
	$scope.pay = function () {
		// Paypal payment system
	};
}]);