var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/brickless');
process.env.APP_SECRET = process.env.APP_SECRET || 'suchmysterynoonewilleverknow';


var authRouter = require(__dirname + '/routes/authRoutes');
var itemRouter = require(__dirname + '/routes/itemRoutes');

app.use(bodyParser.json());
app.use('/item', itemRouter);


var router = express.Router();

app.use(express.static(__dirname + '/build'));

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log('Server listening on port ' + (port || 3000));
});
