var request = require('request');
var lazy = require("lazy"),
    fs  = require("fs");
var results = [];

new lazy(fs.createReadStream('./input.txt'))
 .lines
 .forEach(function(line){
 	var fbHandle = line.toString().split('/')[3];
 	var options = {
 		url : 'https://testapi.ark.com/network/fb:' + fbHandle,
 		strictSSL : false,
		headers : {
			api_token : '0b1c2fa1-364b-46a9-95e4-84b05f2eeaf6'
		}
 	};
 	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			results.push(body);
			console.log(results.length);
			fs.appendFileSync('./result.txt',body);
		}
	});
 	//console.log(line.toString().split('/')[3]); //'",\n';
    //fs.appendFileSync('./result.txt',proxyString);
 });