/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var app = angular.module('bricks', [
	  'ngRoute'
	]);

	__webpack_require__(1)(app);

	app.config(['$routeProvider', function($routeProvider) {
	  $routeProvider
	  .when('/', {
	    templateUrl: "html/login.html",
	    controller: "PageCtrl"
	  })
	  .when('/shop', {
	    templateUrl: 'html/shop.html',
	    controller: 'PageCtrl'
	  })
	  // .when('/pickups', {
	  //   templateUrl: 'html/pickups.html',
	  //   controller: 'PickupCtrl'
	  // })
	  // .when('/account', {
	  //   templateUrl: 'html/account.html',
	  //   controller: 'AccountCtrl'
	  // })
	  // .when('/cart', {
	  //   templateUrl: 'html/cart.html',
	  //   controller: 'CartCtrl'
	  // })
	}])


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(app) {
	  __webpack_require__(2)(app);
	}


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(app) {
	  app.controller('PageCtrl', function($scope, $location, $http) {
	    console.log('Page controller activated');

	  });
	}


/***/ }
/******/ ]);