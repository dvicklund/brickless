var http = require('http');

// Given the string (zipcode), parse and submit to Ziptastic's api.
exports.getCityState = function (zipcode, callback)
{
	// Modify the string to remove invalid characters from URL.
	var pathEncodedAddress = encodeURI(zipcode);

	var options = {
		host: 'ziptasticapi.com',
		path: '/' + pathEncodedAddress
	};

	var req = http.get(options, function(res) {
		var bodyChunks = [];
		res.on('data', function(chunk) {
			bodyChunks.push(chunk);
		}).on('end', function() {
			body = Buffer.concat(bodyChunks);
			var result = JSON.parse(body);
			callback(result.country, result.state, result.city);
		});
	});

	req.on('error', function(e) {
		console.log('ERROR: ' + e.message);
	});

	req.end();
};
