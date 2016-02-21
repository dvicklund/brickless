var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemDetailSchema = new Schema({
	title: String,
	linkId: String,
	description: String,
	askingPrice: Number,
	postDate: Date,
	sellerUserName: String,
	sellerRating: Number,
	sellerTransHistory: Number,
	sellerAverageResponse: Number,
	sellerOtherItems: Number,
	latitude: Number,
	longitude: Number,
	morePhotos: [String],
	noOfInquiries: Number,
	preferredMethodOfContact: String

});

module.exports = mongoose.model('ItemDetail', ItemDetailSchema);
