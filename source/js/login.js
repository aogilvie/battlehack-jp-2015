angular.module('myApp.login', [])
.controller('LoginCtrl', ['$scope', '$rootScope', '$window', '$state', '$location', function ($scope, $rootScope, $window, $state, $location) {
	// Login controller
	function loginFacebook() {
		function fbSuccess(result) {
			console.log(JSON.stringify(result));
			$rootScope.go('/search');
		}
		function fbFailure(error) {
			console.error(JSON.stringify(error));
		}

		if (window.cordova.platformId === 'browser') {
			// window.facebookConnectPlugin.browserInit('1601282223489096');
			// auto login in development
			fbSuccess({ id: '0000000001', secret: 'abc123456789' });
			return;
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