window.user = window.user || {};

angular.module('myApp.login', [])
.controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$state', '$location', function ($scope, $rootScope, $window, $state, $location) {
	// Login controller
	function loginFacebook() {
		var fbSuccess = function(result) {
			console.log('logged in: ', result);
			window.user = {
				id: result.authResponse.userID,
				secret: result.authResponse.accessToken
			};
			setTimeout(function() {
				$rootScope.go('/search');
			}, 500);
			
		}
		var fbFailure = function(error) {
			// console.error(JSON.stringify(error));
			// auto login in development
			fbSuccess({ id: '0000000001', secret: 'abc123456789' });
		}

		if (window.cordova.platformId === 'browser') {
			window.facebookConnectPlugin.browserInit('1601282223489096');
		}
		window.facebookConnectPlugin.login(['email'], fbSuccess, fbFailure);
	}

	$rootScope.login = function (provider) {
		switch (provider) {
			case 'facebook': {
				loginFacebook();

			}
		}
	};
}]);