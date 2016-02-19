var mongoose = require('mongoose');
var itemDetail = require('./itemDetail');
var user = require('./user');

var itemSchema = new mongoose.Schema({
  date: Date,
  name: String,
  detail: {type: mongoose.Schema.Types.ObjectId, ref: 'ItemDetail'},
  photo: String, //URL String
  askingPrice: Number,
  seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Item', itemSchema);
