'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {
	$scope.title = 'Nearby Restaurants';

	$scope.showList = true;

	$scope.beaconsIds = [];

	$scope.scanBeacons = function () {

	};

	$scope.getRestaurants = function () {

	};

	$scope.goToRestaurant = function (index) {
		$rootScope.go('/restaurant', index);
	};

	$scope.restaurants = [{
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}];
}]);