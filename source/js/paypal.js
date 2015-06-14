'use strict';

angular.module('myApp.paypal', [])
.controller('PaypalCtrl', function($scope) {
	function init() {
		var clientIDs = {
			'PayPalEnvironmentProduction': '123',
			'PayPalEnvironmentSandbox': 'AZrRDYyU01FEHsmEx-cDCvuljfbQZBuQD5Zw0AVq59C8Mbtc4ngl16a8DZwhRW5KQqJBvicJaxmWWkV0'
		};

		PayPalMobile.init(clientIDs, onPayPalMobileInit);
	};

	function onPayPalMobileInit() {
		PayPalMobile.prepareToRender('PayPalEnvironmentSandbox', function () {
			var config = new PayPalConfiguration({ 
				merchantName: 'Battlehack', 
				merchantPrivacyPolicyURL: 'https://mytestshop.com/policy', 
				merchantUserAgreementURL: 'https://mytestshop.com/agreement'
			});

			return config;
		}, function () {
		  	// further setup
		  	console.log('next step');
		  	PayPalMobile.renderSinglePaymentUI(createPayment(), onSuccesfulPayment, onUserCanceled);
		  	
		});
	};

	function onSuccesfulPayment (payment) {
		//alert('Payment Success! ' + JSON.stringify(payment));

		var responsePromise = $http.post(window.app.HOST + '/api/order/check/', {
			secret: window.user.secret || 'secret',
			merchantId: window.restaurant.uid,
			tableId: window.tableId,
			userId: window.user.id,
			receipt: payment
		});
			
		responsePromise.success(function(data, status, headers, config) {
			console.log('payment success: ' + JSON.stringify(payment, null, 4));
			$rootScope.go('/home');
		});

		$rootScope.go('/home');
	}

	function onAuthorizationCallback (authorization) {
		console.log('authorization: ' + JSON.stringify(authorization, null, 4));
	}

	function onUserCanceled(result) {

	}

	function createPayment() {
		// for simplicity use predefined amount
		// optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
		var paymentDetails = new PayPalPaymentDetails(window.ppInfo.amount.total || 0, '0.00', '0.00');
		var payment = new PayPalPayment(window.ppInfo.amount.total, window.ppInfo.amount.currency, window.ppInfo.description, 'Services', paymentDetails);
		return payment;
	}

	$scope.pay = function (paymentInfo, successCb, cancelledCb) {
		// single payment
		init();
	};

	$scope.buyInFutureBtn = function (onAuthorizationCb, cancelledCb) {
		// future payment
		PayPalMobile.renderFuturePaymentUI(onAuthorizationCallback, onUserCanceled);
	};

	$scope.profileSharingBtn = function (onAuthorizationCb, cancelledCb) {
		// profile sharing
		PayPalMobile.renderProfileSharingUI([
			'profile', 
			'email', 
			'phone', 
			'address', 
			'futurepayments', 
			'paypalattributes'
		], onAuthorizationCallback, onUserCanceled);
	};
})