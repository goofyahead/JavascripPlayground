var request = require('request');
var async = require('async');
var fs = require('fs');

var set = [0, 100, 200, 300, 400, 500, 600, 700,800, 900];
var count = 0;
var profiles = [];

async.each(set, function (elem, cb){
	request(
		{
			url : 'https://testapi.ark.com/strong-search',
			strictSSL : false,
			method: 'GET',
			qs : {
				other : 'loreal'
			},
			headers : 
			{
				from : elem,
				size : 100,
				api_token : ''
			}
		},
		function (err, response, body) {
			console.log('response ' + response.statusCode);
			
			if (err) throw err;

			var anObject = JSON.parse(body);
			anObject.results.forEach(function (elem) {
				if (elem.links.length >= 2) {
					//console.log(elem);
					profiles.push(elem);
					count++;
				}
			});
			cb();
		});
}, function (){
	console.log('a total of: ' + count);
	fs.writeFileSync('loreal.txt', JSON.stringify(profiles));
});
