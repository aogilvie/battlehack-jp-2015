'use strict';

angular.module('myApp.search', [])
.controller('SearchCtrl', ['$scope', '$rootScope', '$location', '$state', function ($scope, $rootScope, $location, $state) {
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
		name: 'Sushi King',
		url: 'https://lh5.googleusercontent.com/VyIBTIk3uTvC6Beu3TvMRAUSR3g0YWfMfSZPka3QmABaRaRNMrgE2776L5sOtRp5nzvOsEk6nH3IYwM=w1256-h558',
		description: 'Sushi'
	}, {
		id: '2',
		name: 'Yoshinoya'
	}, {
		id: '1',
		name: 'Sushi King'
	}];
}]);