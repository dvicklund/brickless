var mongoose = require('mongoose');
var ItemDetail = require('./itemDetail');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
	itemDetail: {type: Schema.Types.ObjectId, ref: "ItemDetail"},
	linkId: String,
	title: String,
	displayPhoto: String,
	askingPrice: Number,
	postDate: Date,
	userName: String,
	sellerRating: Number
});

module.exports = mongoose.model('Item', ItemSchema);
