var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var eat = require('eat');

var userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
	username: String,
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
  checkInRequested: Boolean,
  sentRequests: Array,
  receivedRequests: Array,
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
