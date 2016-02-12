var mongoose = require('mongoose');
var userSchema = require('user');

var storeSchema = new mongoose.Schema({
  name: String,
  admin: {type: Schema.Types.ObjectId, ref: 'User'},
  lat: {type: Number, default: 0},
  lng: {type: Number, default: 0},
  city: String,
  lastOpen: {type: Date, default: Date.now()},
  inventory: Object
});

module.exports = monngoose.model('Storefront', storeSchema);
