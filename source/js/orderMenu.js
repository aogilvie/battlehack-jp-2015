'use strict';

angular.module('myApp.orderMenu', [])
.controller('OrderMenuCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http', 
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.fbImage = 'http://graph.facebook.com/' + window.user.id + '/picture?type=square';

	$scope.data = JSON.parse($stateParams.properties);

	if (!$scope.data) {
		$rootScope.go('/search');
	}

	var menu = $scope.data.restaurant.data.menu;
	$scope.menu = {};

	for (var i = 0; i < menu.length; i++) {
		$scope.menu[i] = {
			id: menu[i].id - 1,
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

		$scope.place();
	};

	$scope.add = function (id) {
		$scope.menu[id].count++;
		$scope.place();
	};

	$scope.goMenu = function () {
		$scope.isMenu = true;
	};

	$scope.goOrder = function () {
		$scope.isMenu = false;
	};

	$scope.checkout = function () {
		clearInterval(timeout);

		$rootScope.go('/checkout', {
			secret: window.user.secret || 'secret',
			merchantId: $scope.data.restaurant.uid,
			tableId: $scope.data.tableId,
			userId: window.user.id || 'userId',
			restaurant: $scope.data.restaurant
		});
	};

	$scope.place = function () {
		var items = [];

		for (var i in $scope.menu) {
			items.push({
				id: $scope.menu[i].id + 1,
				amount: $scope.menu[i].count
			});
		}

		var responsePromise = $http.post(window.app.HOST + '/api/order/place', {
			secret: window.user.secret || 'secret',
			merchantId: $scope.data.restaurant.uid,
			tableId: $scope.data.tableId,
			userId: window.user.id || 'userId',
			items: items
		});
			
		responsePromise.success(function(data, status, headers, config) {
			$scope.orders = data;
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.getOrderUpdate = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/order/get', {
			secret: window.user.secret || 'secret',
			merchantId: $scope.data.restaurant.uid,
			tableId: $scope.data.tableId,
			userId: window.user.id || 'userId',
		});
			
		responsePromise.success(function(data, status, headers, config) {
			$scope.orders = data;
			console.log(data)
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	var timeout = setInterval(function() {
		$scope.getOrderUpdate();
	}, 1000);


	$scope.place();
}]);