var mongoose = require('mongoose');
var uuid = require('node-uuid');
var express = require('express');
var Item = require(__dirname + '/../models/item');
var ItemDetail = require(__dirname + '/../models/itemDetail');
var User = require(__dirname + '/../models/user');

var itemRouter = module.exports = express.Router();

// This route gets the details on an item.
// Call this route with the detailId of any posted item.
// GET /item/{itemDetailId}
itemRouter.get('/:item_id', function(req, res)
{
	ItemDetail.findById(req.params.item_id, function(err, item) {
		if (!item) res.status(404).json({msg: 'Item doesn\'t exist.'});
		else res.json(item);
	});
});

// This is the update endpoint.
// PUT /item/{itemDetailId}
itemRouter.put('/:item_id', function(req, res)
{
	ItemDetail.findById(req.params.item_id, function(err, itemDetail) {
		if (err) res.send(err);
		else if (!itemDetail) res.status(404).json({ msg: 'Item doesn\'t exist.' });
		else
		{
			Item.findOne({'linkId': itemDetail.linkId}, function(err, item)
			{
				if (!item) 
				{
					res.status(404).json({ msg: 'Item doesn\'t exist.' });
					return;
				}

				if (req.body.title) 	  
				{
					itemDetail.title = req.body.title; 
					item.title = req.body.title;
				}
				if (req.body.description) itemDetail.description = req.body.description;
				if (req.body.askingPrice)
				{ 
					itemDetail.askingPrice = req.body.askingPrice; 
					item.askingPrice = req.body.askingPrice; 
				}
				if (req.body.postDate) {
					  itemDetail.postDate = req.body.postDate;
					  item.postDate = req.body.postDate;
				}
				if (req.body.displayPhoto) item.displayPhoto = req.body.displayPhoto;	
				if (req.body.morePhotos)  itemDetail.morePhotos = req.body.morePhotos;
				if (req.body.preferredMethodOfContact) itemDetail.preferredMethodOfContact = req.body.preferredMethodOfContact;

				itemDetail.save(function(err) {
					if (err) res.send(err);
					else
					{
						item.save(function(err)
						{
							if (err)
								res.send(err);

							else
								res.status(200).json({ msg: 'Item detail updated.'});

						})
					}
				});
			});
		}
	});
});

// DELETE /item/{detailId}
itemRouter.delete('/:item_id', function(req, res) {
	ItemDetail.findById(req.params.item_id, function(err, itemDetail) {
		if (!itemDetail) res.status(404).json({msg: 'Item doesn\'t exist.'});
		else if (err) res.send(err); 
		else {
			User.findOne({'username': itemDetail.sellerUserName}, function(err, foundUser) {
				if (!foundUser) res.status(404).json({ msg: 'The user is missing for this item.'});
				else if (err) res.send(err);
				else {
					foundUser.itemsForSale --;
					foundUser.save(function(err){
						if (err) {
							res.send(err);
							return;
						}
					});
				}

			});

			Item.findOne({'linkId': itemDetail.linkId }, function(err, item) {
				if (!item) res.status(404).json({ msg: 'Item not found.'});
				else if (err) res.send(err);
				else {
					Item.remove({ _id: item._id}, function(err, item) {
						if (err) res.send(err);
						else
						{
							ItemDetail.remove({ _id: req.params.item_id}, function(err, itemDetail){
								if (err) res.send(err);

								res.json({ msg: 'Item deleted.'});
							})
						}
					});
				}
			});
		}
	});
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
// Successfully calling this route will create an object for an item's details as well as the item's posting.
itemRouter.post('/', function(req, res) {

	User.findOne({'username': req.body.sellerUserName}, function(err, foundUser) {
		if (!foundUser) res.status(404).json({ msg: 'User doesn\'t exist.' });
		else if (err) res.send(err);
		else
		{
			var dateOfPost = Date.now(); // Get the date at the time of post.

			var linkId = uuid.v4(); // Use this ID to link 


			// Create the detailed post.
			var itemDetail = new ItemDetail();
			itemDetail.title = req.body.title;
			itemDetail.linkId = linkId;
			itemDetail.displayPhoto = req.body.displayPhoto;
			itemDetail.description = req.body.description;
			itemDetail.askingPrice = req.body.askingPrice;
			itemDetail.postDate = dateOfPost;
			itemDetail.sellerUserName = req.body.sellerUserName;
			itemDetail.sellerRating = foundUser.sellerRating;
			if (!foundUser.sellerTransHistory || foundUser.sellerTransHistory === "") 
				itemDetail.sellerTransHistory = 0; // Was an empty string.
			else itemDetail.sellerTransHistory = foundUser.sellerHistory;
			itemDetail.sellerAverageResponse = foundUser.averageResponseInMinutes;
			itemDetail.sellerOtherItems = foundUser.itemsForSale + 1;
			itemDetail.latitude = foundUser.locationLng;
			itemDetail.longitude = foundUser.locationLat;
			itemDetail.morePhotos = req.body.morePhotos;
			itemDetail.noOfInquiries = 0; // Starts at zero at the time of posting.
			itemDetail.preferredMethodOfContact = req.body.preferredMethodOfContact;

			itemDetail.save(function(err)
			{
				if (err) res.send(err);

					res.status(201).json({ msg: 'Item created with ID ' + itemDetail._id });
			});

			// Create the light-weight version for searching that links to the details.
			var item = new Item();
			item.detailId = itemDetail._id; // Keeping detail ID for fast lookup.
			item.linkId = linkId; // We can index on the linkId once we create the index on the DB.
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

			// Increment itemsForSale
			if (!foundUser.itemsForSale)
				foundUser.itemsForSale = 1;
			else 
				foundUser.itemsForSale ++;

			foundUser.save(function(err){
				if (err) console.log(err);
			});
		}
	});
});
