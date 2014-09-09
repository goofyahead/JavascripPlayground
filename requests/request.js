var request = require('request');
var _ = require('underscore');
var baseURL = 'http://v4:doyjod134u@elasticsearch-a-1184289202.us-east-1.elb.amazonaws.com:2013/profiles_demo/a/_search';
var FormData = require('form-data');
var request = require('request');
var http = require('http');
var fs = require('fs');
var path = require('path');
http.post = require('http-post');
var uuid = require('node-uuid');

// var files =
// {
// 	param: "file",
// 	path: "./1.jpg"
// };

// http.post('http://localhost:3000/upload', [], files, function(res){
// 	console.log('response');
// });

// var r = request.post('http://localhost:3000/upload', function optionalCallback (err, httpResponse, body) {
//   if (err) {
//     return console.error('upload failed:', err);
//   }
//   console.log(httpResponse);
//   console.log('Upload successful!  Server responded with:', body);
// });

var r = request.post({
			url : 'http://localhost/api/video-upload',
			headers : {
				authorization : '003467c7d1854d460821f55a202e013dbe1b9e428b344f0f38d1580805b80240'
			}
		}, function optionalCallback (err, httpResponse, body) {
  if (err) {
    return console.error('upload failed:', err);
  }
  console.log('Upload successful!  Server responded with:', body);
})
var form = r.form()
form.append('filename', 'auto_' + uuid.v4());
form.append('uploadingVideo', fs.createReadStream(path.join(__dirname, 'first.h264')))

// request(
// 		{
// 			url : 'https://testapi.ark.com/email/goofyahead@gmail.com',
// 			headers : {
// 				api_token : '0b1c2fa1-364b-46a9-95e4-84b05f2eeaf6'
// 			}
// 		},
// 		function (err, response, body) {
// 			if (err) throw err;
// 			console.log(body); //response object is printed
// 		});

// function mustQuery (from, perPage) {
// 	var from = from || 0;
// 	var perPage = perPage || 5;

// 	if (from % perPage != 0) {
// 		res.send(404, {message : 'from should be multiple of size'});
// 		return;
// 	}

// 	var query = {name : 'Alex'};
// 	var termsQuery = '';
// 	for (var key in query) {
// 		termsQuery = termsQuery + '{"match" : {"' + key + '" : {"query" :"' + query[key] +'", "operator" : "and"}}},';
// 	}

// 	termsQuery = termsQuery.substring(0, termsQuery.length -1).toLowerCase();
// 	console.log(termsQuery);

// 	var opts = {
// 		url: baseURL,
// 		method: 'post',
// 		encoding: 'utf-8',
// 		body: '{ "from" : ' + from + ', "size" : ' + perPage + ', "query" : {"bool" : {"must" : [ ' + termsQuery + ' ] } } }'
// 	};

// 	request(opts, function (error, response, body) {
// 		if (!error && response.statusCode == 200) {
// 			var result = JSON.parse(body);
// 			console.log(result.hits.total);
// 			var responseArray = result.hits.hits;
// 			_.each(responseArray, function (profile, index, list) {
// 				var correctProfile = profile._source;
// 				correctProfile.location = correctProfile.place;
// 				delete correctProfile.place;
// 				correctProfile.links = correctProfile.networks;
// 				delete correctProfile.networks;

// 				var links = [];
// 	            //console.log('HIT ON ES'.green);
// 	            if (! correctProfile.is_organisation){
// 	                _.each(correctProfile.links, function (link, index, list) {
// 	                    delete link.provider;
// 	                    if (link.name == 'Klout' || link.name == 'About.me' 
// 	                        || link.name == 'Flavours.me') {
// 	                        //console.log('a network should be deleted');
// 	                        // delete merged.links[index];
// 	                    } else {
// 	                        links.push(link);
// 	                    }
// 	                });
// 	            }
// 	            correctProfile.links = links;
// 	            responseArray[index] = correctProfile;
// 			});
// 			console.log(Array.isArray(result.hits));
// 			var pages = result.hits.total % perPage != 0 ? parseInt(result.hits.total/perPage) + 2 : parseInt(result.hits.total/perPage) + 1;
// 			var resultWithParams = { page : ((from/perPage) + 1), total : result.hits.total,
// 			 pages :  pages,from : from, to : (from + perPage), results : responseArray };
// 			console.log (resultWithParams);
// 		} else {
// 			console.log(error);
// 			console.log ('error retrieving data');
// 		}
// 	});
// }

// mustQuery();