angular.module('myApp.login', [])
.controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$state', '$location', function ($scope, $rootScope, $window, $state, $location) {
	// Login controller
	function loginFacebook() {
		function fbSuccess(result) {
			console.log(JSON.stringify(error))
		}
		function fbFailure(error) {
			console.error(JSON.stringify(error));
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