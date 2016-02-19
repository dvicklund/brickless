var mongoose = require('mongoose');
var userSchema = require('./user');

var itemDetailSchema = new mongoose.Schema({
  title: String,
  mainPhoto: String, // URL String (or actual pictures maybe someday but probably not)
  morePhotos: [String],
  lat: Number,
  lng: Number,
  askingPrice: Number,
  date: Date,
  description: String,
  preferredContactMethod: String,
  seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('ItemDetail', itemDetailSchema);
