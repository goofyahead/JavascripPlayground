var express = require('express');
var app = express();
var ping = require('net-ping');
var session = ping.createSession ();
var config = require('./config');
var HOTSPOTMODE = "HOTSPOTMODE";
var redis = require("redis"),
client = redis.createClient();
var colors = require ('colors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');



setTimeout(function () {
	//check if its on hotstpot mode
	client.get(HOTSPOTMODE, function (err, reply) {
		if (reply && reply == 1) {
			console.log('STARTING SERVER FOR CONFIG NETWORK');
			// in hotspot mode wait for config and reboot on click
			app.set('views', __dirname + '/views');
			app.use(favicon());
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded());
			app.use(cookieParser());
			app.engine('.html', require('ejs').renderFile);
			app.set('view engine', 'html');

			app.post('/config', function (req, res) {
				var ssid = req.param('ssid');
				var password = req.param('pass');

				console.log('configuration received: '.yellow + password + ' ssid ' + ssid);
				config.toConnected(ssid, password);
			});

			app.get('/', function (req, res){
				res.render('form');
			});

			app.listen(3000);

		} else {
			console.log('CHECKING CONNECTION');
			// if not in hotspot, check if internet, if not internet go to hotspot and reboot
			session.pingHost ('8.8.8.8', function (error, target) {
				if (error) {
					console.log('No internet, changing files and rebooting on HOTSPOT'.green);
					config.toHotspot();
				}
				else {
					console.log('RASPBERRY PI ONLINE'.green);
					console.log (target + ": Alive");
				}
			});
		}
	});

}, 1000);



