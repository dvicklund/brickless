var mongoose = require('mongoose');
var express = require('express');
var Item = require(__dirname + '/../models/item');

var itemRouter = module.exports = express.Router();

itemRouter.get('/:item_id', function(req, res)
{

	Item.findById(req.params.item_id, function(err, item) {
		if (err) res.send(err);

		res.json(item);
	})
});

itemRouter.get('/', function(req, res, next) {
	Item.find(function(err, items){
		if (err) res.send(err);

		res.json(items);
	});
});

itemRouter.post('/', function(req, res) {

	var item = new Item();
	item.title = req.body.title;
	item.askingPrice = req.body.askingPrice;
	item.postDate = req.body.postDate;
	item.userName = req.body.userName;
	item.sellerRating = req.body.sellerRating;

	item.save(function(err)
	{
		if (err) res.send(err);

		res.json({message: 'Item posted!'});
	});
});