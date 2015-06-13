'use strict';
var $rootScope;

angular.module('myApp', [
    'ionic',
    'ngSanitize',
    'myApp.controllers'
]).
config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {url:'/home', templateUrl: 'views/login.html', controller: 'IndexCtrl'});
    $stateProvider.state('link1', {url:'/link1:properties', templateUrl: 'views/link1.html', controller: 'LoginCtrl'});
    $stateProvider.state('link2', {url:'/link2', templateUrl: 'views/link2.html', controller: 'AnotherCtrl'});
    $urlRouterProvider.otherwise('/home');
}]);

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
