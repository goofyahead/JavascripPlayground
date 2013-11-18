var request = require('request');
var cheerio = require('cheerio');

request('http://klout.com/samnoland', 
	function (err, response, body) {
		$ = cheerio.load(body);
		var kloutScore = $('.user-profile-header-container .user-score-flag').text().trim();
		console.log(kloutScore);
});