'use strict';

angular.module('myApp.controllers', [])

.controller('paypal', function($scope) {
	$scope.init = function () {
		var clientIDs = {
			// /'PayPalEnvironmentProduction': 'AZrRDYyU01FEHsmEx-cDCvuljfbQZBuQD5Zw0AVq59C8Mbtc4ngl16a8DZwhRW5KQqJBvicJaxmWWkV0',
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
		});
	};

	// ## example
	function createPayment() {
		// for simplicity use predefined amount
		// optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
		var paymentDetails = new PayPalPaymentDetails('50.00', '0.00', '0.00');
		var payment = new PayPalPayment('50.00', 'USD', 'Awesome Sauce', 'Sale', paymentDetails);
		return payment;
	}

	function onSuccesfulPayment (payment) {
		console.log('payment success: ' + JSON.stringify(payment, null, 4));
	}

	function onAuthorizationCallback (authorization) {
		console.log('authorization: ' + JSON.stringify(authorization, null, 4));
	}

	function onUserCanceled(result) {

	}

	// ##

	$scope.buyNowBtn = function (paymentInfo, successCb, cancelledCb) {
		// single payment
		PayPalMobile.renderSinglePaymentUI(createPayment(), onSuccesfulPayment, onUserCanceled);
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