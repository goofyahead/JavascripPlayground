var request = require('request');
var fs = require('fs');
var colors = require('colors');
var _ = require('underscore');
var gm = require('gm');
var http = require('http');
var easyimg = require('easyimage');
var async = require('async');

var imageMagick = gm.subClass({ imageMagick: true });

var images = ['http://files.softicons.com/download/tv-movie-icons/futurama-icons-by-rich-d/png/128/Zoidberg.png',
			'http://www.veryicon.com/icon/png/Movie%20%26%20TV/Futurama%20Vol.%201/Zoidberg.png',
			  'http://www.piczotube.co.uk/index_files/futurama_zoidberg.jpg' ];
// var max = _.max(images, function (image) {
// 	var array = image.split('/');
// 	var namefile = array[array.length -1];

// 	var returnfunc = function (amount) {
// 		console.log('called return ' + amount);
// 		return amount;
// 	}

// 	request.head(image, function(err, res, body){
// 		if (err){
// 			returnfunc(0);
// 		} else {
// 			console.log(res.headers['content-length']);
// 			returnfunc(res.headers['content-length']);
// 		}
// 	});


// an example using an object instead of an array
var results = [];
async.each(images, function (image, cb) {
	request.head(image, function(err, res, body){
		if (err){
			results.push({image: image, score: 0});
			cb(null);
		} else {
			console.log(res.headers['content-length']);
			results.push({image: image, score: parseInt(res.headers['content-length'])});
			cb(null);
		}
	});
}, function (err) {
	console.log('called ended');
	console.log(_.max(results, function (elem) { return elem.score }));
});

	// var request = http.get(image, function(res){
	//     var imagedata = '';
	//     res.setEncoding('binary');

	//     res.on('data', function(chunk){
	//         imagedata += chunk
	//     })

	//     res.on('end', function(){
	//         fs.writeFileSync('./' + namefile, imagedata, 'binary');

	//   //       easyimg
	//   //       imageMagick(__dirname + '/' + namefile).size(function (err, size) {
	// 		//   if (err) console.log(err);
	// 		//     console.log(size);
	// 		// 	return size.width * size.height;
	// 		// });

	//         });
	//     })



	// request('http://files.softicons.com/download/tv-movie-icons/futurama-icons-by-rich-d/png/128/Zoidberg.png', function (error, response, body) {
	//   if (!error && response.statusCode == 200) {
	//     console.log(body) // Print the google web page.
	//     fs.writeFileSync('./' + namefile, body);
	//   }
	// });
	// gm('./' + namefile).size(function (err, size) {
	//   if (!err)
	//     console.log(size.width > size.height ? 'wider' : 'taller than you');
	// 	return size.width * size.height;
	// });
	// fs.unlink('./' + namefile), function (err) {
	//   if (err) throw err;
	//   console.log('successfully deleted /tmp/hello');
	// };

