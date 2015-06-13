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

	$urlRouterProvider.otherwise('/home');
}])

var app = {
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
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function () {
		app.receivedEvent('deviceready');
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