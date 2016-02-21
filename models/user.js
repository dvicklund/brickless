var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

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
  phoneNumbers: [{name: String, number: String}],
  locationCity: String,
  locationState: String,
  locationLat: Number,
  locationLng: Number,
  sellerRating: Number,
  buyerRating: Number,
  sellerHistory: Number,
  buyerHistory: Number,
  itemsForSale: Number,
  averageResponseInMinutes: Number,
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
    //item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  receivedOffers: [{
    date: Date,
    message: String,
    offerAmount: Number,
    read: Boolean,
    //item: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  averageResponseMinutes: Number,
  sellerRatings: [Number],
  sellerHistory: [{
    saleDate: Date,
    itemSold: String,
    buyer: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
  buyerRatings: [Number],
  buyerHistory: [{
    purchaseDate: Date,
    itemBought: String,
    seller: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }],
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
