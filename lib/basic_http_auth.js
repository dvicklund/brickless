var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = function(req, res, next) {
	var token = req.headers.token;
	var bodyToken = (req.body)? req.body.token : '';
	token = token || bodyToken;
	try {
		var authString = req.headers.authorization;
		var basicString = authString.split(' ')[1];
		var basicBuffer = new Buffer(basicString, 'base64');
		var authArray = basicBuffer.toString().split(':');
		req.auth = {
			username: authArray[0],
			password: authArray[1]
		};
		next();
	} catch(err) {
		console.log(err);
		return res.status(401).json({
			msg: 'Cannot Authenticate, I hate you.'
		});
	}
};
