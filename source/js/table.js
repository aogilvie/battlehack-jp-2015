'use strict';

angular.module('myApp.table', [])
.controller('TableCtrl', [
	'$scope', '$rootScope', '$location', '$state', '$stateParams', '$http',
	function ($scope, $rootScope, $location, $state, $stateParams, $http) {

	$scope.fbImage = 'http://graph.facebook.com/' + window.user.id + '/picture?type=square';
	$scope.foundTable;
	$scope.restaurant = JSON.parse($stateParams.properties);

	if (!$scope.restaurant) {
		$rootScope.go('/search');
	}

	$scope.tableId = 'B9407F30-F5F8-466E-AFF9-25556B57FE6D';
	$scope.$on('beaconsFound', function(event, data){
		if (data.immediate && data.immediate.length > 0) {
			if (data.immediate[0].accuracy < 0.3) {
				// Close to a table beacon (30cm)
				if ($scope.tableId === data.immediate[0].uuid) {
					console.log('at a table');
					$scope.foundTable = true;
				}
			}
		}
	});

	var timeout = setInterval(function() {
		$scope.getUsers();
	}, 1000);


	$scope.goBack = function () {
		$rootScope.go('/restaurant', $scope.restaurant);
	};

	$scope.goToOrderMenu = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/merchant/table/join/', {
			secret: window.user.secret || 'secret',
			merchantId: $scope.restaurant.uid,
			tableId: $scope.tableId,
			userId: window.user.id
		});
			
		responsePromise.success(function(data, status, headers, config) {
			clearInterval(timeout);

			$rootScope.go('/orderMenu', {
				restaurant: $scope.restaurant,
				tableId: $scope.tableId,
				data: data
			});
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.getUsers = function () {
		var responsePromise = $http.post(window.app.HOST + '/api/merchant/table/users/', {
			secret: 'secret',
			merchantId: $scope.restaurant.uid,
			tableId: $scope.tableId
		});
			
		responsePromise.success(function(data, status, headers, config) {
			$scope.players = data.users;
		});

		responsePromise.error(function(data, status, headers, config) {
			console.error('fail', data);
		});
	};

	$scope.scanBeacons = function () {

	};
}]);