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
/***/ function(module, exports) {

	var map = L.map('map').setView([39.8282, -98.5795], 4);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'dvicklund.p2no7d88',
	    accessToken: 'pk.eyJ1IjoiZHZpY2tsdW5kIiwiYSI6ImNpazllZzk3bTA3enF2OWt1cXRvbjVvdzEifQ.xZoxddPrFFB8m8za__Xa4A'
	}).addTo(map);

	var nuclearData;

	var nuclearIcon = L.icon({
	  iconUrl: 'img/Nuclear_symbol.svg',
	  iconSize: [40, 40],
	  iconAnchor: [20, 20],
	  popupAnchor: [0, -20]
	});

	$.ajax({
	  url: 'data/nuclearData.json',
	  dataType: 'json',
	  success: function(data) {
	    nuclearData = data;
	    nuclearData.features.forEach(function(curr, i, arr) {
	      var marker = L.marker([
	        curr.attributes.Latitude,
	        curr.attributes.Longitude
	      ], {
	        icon: nuclearIcon
	      }).bindPopup(
	        '<div>Transfer Year: ' + curr.attributes.TransferYear + '<br>' +
	        'Lat: ' + curr.attributes.Latitude +
	        ', Lng: ' + curr.attributes.Longitude + '<br>' +
	        '<a target="_blank" href="' + curr.attributes.PublicWebpageUrl + '">' +
	        curr.attributes.Name + '</a></div>'
	      ).on('mouseover', function(e) {
	        this.openPopup();
	      }).addTo(map);
	    });
	  },
	  error: function(xhr, textStatus, eThrown) {
	    console.log(xhr);
	    console.log(textStatus);
	    console.log(eThrown);
	  }
	});


/***/ }
/******/ ]);