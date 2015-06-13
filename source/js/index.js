'use strict';
var $rootScope;

angular.module('myApp', [
	'ionic',
	'ngSanitize',
	'myApp.controllers',
	'myApp.login',
	'myApp.search',
	'myApp.restaurant',
	'myApp.table',
	'myApp.orderMenu',
	'myApp.checkout',
])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$stateProvider.state('home', {
		url:'/home', 
		templateUrl: 'views/login.html', 
		controller: 'IndexCtrl'
	});

	$stateProvider.state('search', {
		url:'/search', 
		templateUrl: 'views/search.html', 
		controller: 'SearchCtrl'
	});

	$stateProvider.state('restaurant', {
		url:'/restaurant:properties', 
		templateUrl: 'views/restaurant.html', 
		controller: 'RestaurantCtrl'
	});

	$stateProvider.state('table', {
		url:'/table:properties', 
		templateUrl: 'views/table.html', 
		controller: 'TableCtrl'
	});

	$stateProvider.state('orderMenu', {
		url:'/orderMenu:properties', 
		templateUrl: 'views/orderMenu.html', 
		controller: 'OrderMenuCtrl'
	});

	$stateProvider.state('checkout', {
		url:'/checkout:properties', 
		templateUrl: 'views/checkout.html', 
		controller: 'CheckoutCtrl'
	});

	$urlRouterProvider.otherwise('/home');
}])
var onRanging = function (event) {
	// event.unknown []
	// event.immediate []
	// event.near []
	// event.far []

	// Each beacon in the array has the following properties:
	// event.immediate[0].uuid
	// event.immediate[0].accuracy (cm)
	$rootScope.$broadcast('beaconsFound', event);
};
var app = {
	// Constants
	HOST: 'https://smartlet.herokuapp.com',
	// Application Constructor
	initialize: function() {
		this.bindEvents();
		bootstrapIonic();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
		document.addEventListener('iBeaconRanging', onRanging, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function () {
		app.receivedEvent('deviceready');
		// Start ranging
		window.iBeacon.addBeacons([
			{ uuid: '4AC9B27B-2CDE-C989-1B36-663865BD438C' },
			{ uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D' }, 
			{ uuid: '7C13FCD7-903A-F70E-23B2-000698DAB067' }
		]);
		window.iBeacon.startRangingBeaconsInRegion();

	},
	// Update DOM on a Received Event
	receivedEvent: function (id) {

	}
};

app.initialize();

function bootstrapIonic() {
	// BootStrap ionic / Angular
	angular.element(document).ready(function () {
		var injector = angular.bootstrap(document, ['myApp']);
		$rootScope = injector.get("$rootScope");
	});
}