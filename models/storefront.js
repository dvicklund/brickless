var mongoose = require('mongoose');

var storeSchema = new mongoose.Schema({
  name: String,
  admin:
  lat: {type: Number, default: 0},
  lng: {type: Number, default: 0},
  city: String,
  lastOpen: {type: Date, default: Date.now()},
  inventory: Object
});

module.exports = monngoose.model('Storefront', storeSchema);
