var mongoose = require('mongoose');
var express = require('express');
var Item = require(__dirname + '/../models/item');
var ItemDetail = require(__dirname + '/../models/itemDetail');
var User = require(__dirname + '/../models/user');

var itemRouter = module.exports = express.Router();

// This route gets the details on an item.
// Call this route with the detailId of any lightweight item.
itemRouter.get('/:item_id', function(req, res)
{
	ItemDetail.findById(req.params.item_id, function(err, item) {
		if (!item) res.status(404).json({msg: 'Item doesn\'t exist!'});

		res.json(item);
	})
});

// This route gets all lightweight items.
// This would eventually be built out for searching.
itemRouter.get('/', function(req, res) {
	Item.find(function(err, items){
		if (err) res.send(err);

		res.json(items);
	});
});

// Used to create an item advertisement.
// Successfully calling this route will create an itemDetail and a searchable truncated item.
itemRouter.post('/', function(req, res) {

	User.findOne({'username': req.body.sellerUserName}, function(err, foundUser) {
		if (err) res.send(err);

		var dateOfPost = Date.now(); // Get the date at the time of post.

		// Create the detailed post.
		var itemDetail = new ItemDetail();
		itemDetail.title = req.body.title;
		itemDetail.displayPhoto = req.body.displayPhoto;
		itemDetail.description = req.body.description;
		itemDetail.askingPrice = req.body.askingPrice;
		itemDetail.postDate = dateOfPost;
		itemDetail.sellerUserName = req.body.sellerUserName;
		itemDetail.sellerRating = foundUser.sellerRating;
		itemDetail.sellerTransHistory = foundUser.sellerHistory;
		itemDetail.sellerAverageResponse = foundUser.averageResponseInMinutes;
		itemDetail.sellerOtherItems = foundUser.itemsForSale;
		itemDetail.latitude = foundUser.locationLng;
		itemDetail.longitude = foundUser.locationLat;
		itemDetail.morePhotos = req.body.morePhotos;
		itemDetail.noOfInquiries = 0; // Starts at zero at the time of posting.
		itemDetail.preferredMethodOfContact = req.body.preferredMethodOfContact;

		itemDetail.save(function(err)
		{
			if (err) res.send(err);

				res.status(200).json({ msg: 'Item posted.'});
		});

		// Create the light-weight version for searching that links to the details.
		var item = new Item();
		item.detailId = itemDetail._id;
		item.title = req.body.title;
		item.displayPhoto = req.body.displayPhoto;
		item.askingPrice = req.body.askingPrice;
		item.postDate = dateOfPost;
		item.userName = req.body.userName;
		item.sellerRating = req.body.sellerRating;

		item.save(function(err)
		{
			if (err) res.send(err);
		});

		foundUser.itemsForSale ++;
		foundUser.save(function(err){
			if (err) res.send(err); // I'm not sure if this will cause a problem if the response is already sent.
		});
	});
});
