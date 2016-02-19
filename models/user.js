var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');
var itemSchema = require('./item');

var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  firstName: String,
  lastName: String,
  addresses: [{
    name: String,
    street: String,
    city: String,
    state: String,
    zip: Number,
    lat: Number,
    lng: Number
  }],
  phoneNumbers: [String],
  locationCity: String,
  locationState: String,
  locationLat: Number,
  locationLng: Number,
  lastLogin: {
    type: Date,
    default: Date.now()
  },
  responseRequested: Boolean,
  preferenceFlags: Number,
  sentOffers: [{
    date: Date,
    message: String,
    offerAmount: Number,
    read: Boolean,
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  receivedOffers: [{
    date: Date,
    message: String,
    offerAmount: Number,
    read: Boolean,
    item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  averageResponseMinutes: Number,
  sellerRating: Number,
  sellerHistory: [{
    saleDate: Date,
    itemSold: String,
    buyingUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  buyerRating: Number,
  auth: {
  	basic: {
  		username: String,
  		password: String
  	}
  }
});

userSchema.methods.hashPW = function(pw) {
	var hash = this.auth.basic.password = bcrypt.hashSync(pw, 8);
	return hash;
};

userSchema.methods.checkPW = function(pw) {
	return bcrypt.compareSync(pw, this.auth.basic.password);
};

userSchema.methods.genToken = function(cb) {
	var id = this._id;
	eat.encode({id: id}, process.env.APP_SECRET, cb);
};

module.exports = mongoose.model('User', userSchema);
