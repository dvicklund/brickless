var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	title: String,
	// displayPhoto: , // working on this.
	askingPrice: Number,
	postDate: Date,
	userName: String,
	sellerRating: Number
});

module.exports = mongoose.model('Item', ItemSchema);