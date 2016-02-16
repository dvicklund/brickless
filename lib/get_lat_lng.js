var http = require('http');

// Given the string (address), parse and submit to Google's api.
exports.getLatLng = function (address, callback)
{
	// Modify the string to remove invalid characters from URL.
	var pathEncodedAddress = encodeURI(address);
	console.log('debug');

	var options = {
		host: 'maps.googleapis.com',
		path: '/maps/api/geocode/json?address=' + pathEncodedAddress
	};

	var req = http.get(options, function(res)
	{
		var bodyChunks = [];

		res.on('data', function(chunk) {

			bodyChunks.push(chunk);
		}).on('end', function() {
			body = Buffer.concat(bodyChunks);

			var result = JSON.parse(body);

			var lat = result.results[0].geometry.location.lat;
			var lng = result.results[0].geometry.location.lng;

			callback(lat,lng);
		});
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

	req.end();
};