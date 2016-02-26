var uuid = require('node-uuid');
var multiparty = require('multiparty');
var fs = require('fs');
var express = require('express');

var imageRouter = module.exports = express.Router();

imageRouter.post('/upload', function(req, res) {	

	console.log('hitting image upload endpoint.');
	var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
    	if (err) res.send(err);

        var file = files.file[0];
        var contentType = file.headers['content-type'];
        var tmpPath = file.path;
        var extIndex = tmpPath.lastIndexOf('.');
        var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);

        // uuid is for generating unique filenames. 
        var fileName = uuid.v4() + extension;
        var destPath = __dirname + '/../images/' + fileName;

        // Server side file type checker.
        if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
            fs.unlink(tmpPath);
            console.log('contenttype');
            return res.status(400).send('Unsupported file type.');
        }

        var is = fs.createReadStream(tmpPath);
        var os = fs.createWriteStream(destPath);

        if (is.pipe(os)) {
        	fs.unlink(tmpPath, function (err) { 
        		if (err) {
        			console.log(err);
        		}
        	});
        	return res.status(200).json({ path: fileName });
        }
        else
        {
        	console.log('not piped');
        	return res.json('File not uploaded.');
        }
    });
});


