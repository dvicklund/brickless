var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/catch_dev');

//var dataRouter = require(__dirname + '/routes/dataRoutes');
var authRouter = require(__dirname + '/routes/authRoutes');

app.use('/auth', authRouter);
process.env.APP_SECRET = process.env.APP_SECRET || 'suchmysterynoonewilleverknow';

app.use(express.static(__dirname + '/build'));


var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + (port || 3000));
});
