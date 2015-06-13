'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', '$http', function ($scope, $rootScope, $location, $state, $http) {
	var beaconList = [];
	var beaconListLength = 0;
	var sendObject = { ids: []};

	var timeout = setInterval(function() {
		$scope.getRestaurants();
	}, 2000);

	$scope.$on('foundBeacons', function (beaconList) {
		beaconList = beaconList;
		beaconListLength = beaconList.length;
	});

	if (cordova.platformId === 'browser') {
		setInterval(function () {
			if (sendObject.ids.length === 0) {
				sendObject.ids.push('4AC9B27B-2CDE-C989-1B36-663865BD438C');
			}
			beaconListLength = Math.floor(Math.random()*3);
		}, 1000);
	}

	$scope.showList = beaconList.length;

	$scope.getRestaurants = function () {
		// Check list changed?
		if (beaconListLength !== beaconList.length) {
			// Request restaurant data from server
			beaconList.every(function (obj) {
				sendObject.ids.push(obj.uuid);
			});

			var responsePromise = $http.post(window.app.HOST + '/api/merchant/get', sendObject);
			
			responsePromise.success(function(data, status, headers, config) {
				$scope.restaurants = data.merchants;
				$scope.showList = $scope.restaurants.length;
			});

			responsePromise.error(function(data, status, headers, config) {
				console.error('fail', data);
			});

			responsePromise.finally(function() {
				// Stop the ion-refresher from spinning
		    	$scope.$broadcast('scroll.refreshComplete');
		    });
		}
	};

	$scope.goToRestaurant = function (id) {
		clearInterval(timeout);

		for (var i = 0; i < $scope.restaurants.length; i++) {
			var data = $scope.restaurants[i];

			if (id === data.id) {
				$rootScope.go('/restaurant', data);
				break;
			}
		}
	};

	$scope.getRestaurants();
}]);