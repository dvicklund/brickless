var express = require('express');
var bodyParser = require('body-parser');
var User = require(__dirname + '/../models/user');
var decryptUser	= require(__dirname + '/../lib/decrypt_user');
var handleError = require(__dirname + '/../lib/handle_server_error');
var basicHttp = require(__dirname + '/../lib/basic_http_auth');

var authRouter = module.exports = express.Router();

authRouter.post('/signup', bodyParser.json(), function(req, res) {
	User.findOne({'auth.basic.username': req.body.auth.username}, function(err, foundUser) {
		if(!foundUser) {
			var user = new User();
			user.auth.basic.username = req.body.auth.username;
			user.username = req.body.auth.username;
			user.hashPW(req.body.auth.password);

			user.save(function(err, savedUser) {
				if(err) return handleError(err, res);
				savedUser.genToken(function(err, token) {
					res.json({token: token});
				});
			});
		} else {
			res.status(401).json({msg: 'User already exists!'});
		}
	});
});

authRouter.post('/signin', basicHttp, bodyParser.json(), function(req, res) {
	if(!(req.auth.username && req.auth.password)) {
		console.log('no authentication found on request object');
		return res.status(401).json({
			msg: 'Authentication failed'
		});
	}

	User.findOneAndUpdate({'auth.basic.username': req.auth.username}, {deviceId: req.body.deviceId}, {new: true}, function(err, foundUser) {
		if(err) {
			console.log('user lookup error');
			console.log(err);
			return res.status(401).json({
				msg: 'Authentication failed, what\'s your REAL name?'
			});
		}

		if(!foundUser) {
			console.log('user: ' + req.auth.username + ' not found');
			return res.status(401).json({
				msg: 'User not found!'
			});
		}

		if(!foundUser.checkPW(req.auth.password)) {
			console.log('incorrect password provided');
			return res.status(401).json({
				msg: 'Incorrect password!'
			});
		}

		foundUser.genToken(function(err, token) {
			res.set('token', token);
			res.json({token: token});
		});
	});
});

// Requests to /user should contain a token in either the headers or body -
// otherwise this will reject with a 401
authRouter.get('/user', decryptUser, function(req, res) {
	res.json({
		username: req.user.username,
		deviceId: req.user.deviceId,
		lat: req.user.lat,
		lng: req.user.lng,
		contacts: req.user.contacts,
		lastCheckin: req.user.lastCheckin,
		id: req.user._id
	});
});

authRouter.post('/user', bodyParser.json(), function(req, res) {
	User.findOneAndUpdate({'_id': req.body.id}, req.body, {}, function(err, foundUser) {
		if(err) res.status(401).json({msg: 'Query unsuccessful!\n' + err});
		res.json({msg: 'Query successful for ' + foundUser.username});
	});
});
