var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/brickless');
process.env.APP_SECRET = process.env.APP_SECRET || 'suchmysterynoonewilleverknow';

var authRouter = require(__dirname + '/routes/authRoutes');
var itemRouter = require(__dirname + '/routes/itemRoutes');
var imgRouter = require(__dirname + '/routes/imgRoutes');

app.use(bodyParser.json());
app.use('/item', itemRouter);
app.use('/auth', authRouter);
app.use('/img', imgRouter);

var router = express.Router();

app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/images'));

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + (port || 3000));
});
