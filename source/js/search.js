'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', '$http', function ($scope, $rootScope, $location, $state, $http) {
	var beaconList = [];
	var beaconMap = {};
	var beaconListLength = 0;
	var sendObject = { ids: []};

	var timeout = setInterval(function() {
		$scope.getRestaurants();
	}, 1000);

	$scope.$on('beaconsFound', function (event, beacons) {
/*
beacons = { immediate: [] }, { far .... }

*/
		
		if (beacons.immediate && beacons.immediate.length > 0) {
			var exists = false;
			
			beacons.immediate.every(function (b) {
				if (!beaconMap.hasOwnProperty(b.uuid)) {
					b.timestamp = Date.now();
					beaconMap[b.uuid] = b;
				}
			});
		}
		/*
		if (beacons.near && beacons.near.length > 0) {
			beaconList.near.push(beacons.near);
		}
		if (beacons.far && beacons.far.length > 0) {
			beaconList.far.push(beacons.far);
		}*/
		// console.log("Beacon immediate: " + event.immediate[0].uuid + " - " + event.immediate[0].accuracy)
//		beaconListLength = beaconList.length;
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
		// if (beaconListLength !== beaconList.length) {
			// Request restaurant data from server
		
		var now = Date.now();
		for (var key in beaconMap) {
			if (now - beaconMap[key].timestamp > 10000) {
				delete beaconMap[key];	
			}
		}
			sendObject.ids = Object.keys(beaconMap);
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
		// }
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