'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', '$http', function ($scope, $rootScope, $location, $state, $http) {
	var beaconList = [];
	var beaconListLength = 0;
	var sendObject = { ids: []};
	var timeout = setInterval(function() {
		// Check list changed?
		if (beaconListLength !== beaconList.length) {
			// Request restaurant data from server
			beaconList.every(function (obj) {
				sendObject.ids.push(obj.uuid);
			});

			var responsePromise = $http.post(window.app.HOST + "/api/merchant/get", sendObject);
			responsePromise.success(function(data, status, headers, config) {
				$scope.restaurants = data.merchants;
				// $scope.$digest();
			});
			responsePromise.error(function(data, status, headers, config) {
				console.error('fail', data);
			});
		}
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
	$scope.title = 'Nearby Restaurants';

	$scope.showList = true;

	$scope.beaconsIds = [];

	$scope.getRestaurants = function () {

	};

	$scope.goToRestaurant = function (index) {
		clearTimout(timeout);
		$rootScope.go('/restaurant', index);
	};
}]);