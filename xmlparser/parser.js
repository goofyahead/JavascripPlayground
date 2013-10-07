var fs = require('fs'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();
fs.readFile(__dirname + '/data.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
    	console.log(result.RRML.TeamDetail[0].Team[1].Player[10]);
    	console.log(result.RRML.TeamDetail[0].Team[1].Player[10].PlayerStats[0].PlayerStat);
    	var playersA = result.RRML.TeamDetail[0].Team[0].Player;
    	var playersB = result.RRML.TeamDetail[0].Team[1].Player;

    	// playersA.forEach( function (player) {
    	// 	console.log(player.$.player_name);
    	// 	console.log(player.PlayerStats[0].PlayerStat[10].$.metres);
    	// })
        console.log('Done');
    });
});