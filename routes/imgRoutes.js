var mongoose = require('mongoose');
var express = require('express');
var multiparty = require('connect-multiparty')();
var Image = require(__dirname + '/../models/image');

var imgRouter = module.exports = express.Router();

imgRouter.get('/:id', function(req, res) {

})

imgRouter.post('/upload', multiparty, function(req, res) {
  var file = req.files.file;
  console.log(file);
  console.log(file.name);
  console.log(file.type);
})
