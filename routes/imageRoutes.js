var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs');
var express = require('express');

var imageRouter = module.exports = express.Router();

imageRouter.post('/', function(req, res) {	

	console.log('hitting image upload endpoint.');
	var form = multiparty.Form();

    form.parse(req, function(err, fields, files) {
        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        var destPath = __dirname + '/images/' + fileName;

        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            return res.status(400).send('Unsupported file type.');
        }

        fs.rename(tmpPath, destPath, function(err) {
            if (err) {
                return res.status(400).send('Image is not saved:');
            }
            return res.json(destPath);
        });
    });


});


