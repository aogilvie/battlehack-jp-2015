'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', '$http', function ($scope, $rootScope, $location, $state, $http) {
	var beaconList = [];
	var beaconListLength = 0;
	var sendObject = { ids: []};

	var timeout = setInterval(function() {
		$scope.getRestaurants();
	}, 1000);

	$scope.$on('beaconsFound', function (event) {
		console.log('immediate', event.immediate);
		console.log('near', event.near);
		console.log('far', event.far);
		if (event.immediate && event.immediate.length > 0) {
			beaconList.push(event.immediate);
		}
		if (event.near && event.near.length > 0) {
			beaconList.push(event.near);
		}
		if (event.far && event.far.length > 0) {
			beaconList.push(event.far);
		}
		// debugger;
		// console.log("Beacon immediate: " + event.immediate[0].uuid + " - " + event.immediate[0].accuracy)
		beaconListLength = beaconList.length;
	});

	//if (cordova.platformId === 'browser') {
		setInterval(function () {
			if (sendObject.ids.length === 0) {
				sendObject.ids.push('4AC9B27B-2CDE-C989-1B36-663865BD438C');
			}
			beaconListLength = Math.floor(Math.random()*3);
		}, 1000);
	//}

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