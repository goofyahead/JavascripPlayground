var fs = require('fs');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var favicon = require('static-favicon');
var crypto = require('crypto');

// app.use(favicon());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cookieParser());

// {\"device_uuid\":\"FAMOCO\",\"transactions\":[{\"made_at\":\"2014-07-18T15:06Z\",\"ticket_number\":\"C438B0D6\",\"token_currency\":\"lkr\",\"token_value_cents\":-300}],\"line_items\":[{\"currency_code\":\"lkr\",\"item_id\":25,\"quantity\":2,\"unit_price\":100.0},{\"currency_code\":\"lkr\",\"item_id\":12,\"quantity\":1,\"unit_price\":100.0}],\"synced\":false,\"id\":3}

var text = '{"device_uuid":"28cfe91a19c1","line_items":[{"item_id":12,"quantity":1,"unit_price":100.0,"currency_code":"eurx"},{"item_id":11,"quantity":1,"unit_price":200.0,"currency_code":"eurx"},{"item_id":8,"quantity":1,"unit_price":300.0,"currency_code":"eurx"}],"transactions":[{"token_value_cents":-600.0,"token_currency":"eurx","ticket_number":"04B0BD7AE02B80","made_at":"2014-07-17T15:59:53.214Z"}]}';

	var md51 = crypto.createHash('md5').update(new Buffer(text)).digest('base64');
	var md52 = crypto.createHash('md5').update(text).digest('base64');
	
	console.log('1: ' + md51 + ' 2: ' + md52);

app.post('/hmac', function (req, res){
	console.log(req.headers);
	console.log(req.body);

	var contentType = req.header('Content-Type');
	var date = req.header('Date');
	var md5Header = req.header('Content-MD5');
	var expectedSignature = req.header('Authorization');
	var key = 'j79HiJPyo9D7m/NEasbJ61/A3Jrif0nZDG0idb82HPdyzRin01Deix7J6cIo6G3gUfwS0HNbmS2EwI54LppGuA==';
	var accessId = 2;

	
	var bodyTest = '{"device_uuid":"28cfe91a19c1","line_items":[{"item_id":12,"quantity":1,"unit_price":100.0,"currency_code":"eurx"},{"item_id":11,"quantity":1,"unit_price":200.0,"currency_code":"eurx"},{"item_id":8,"quantity":1,"unit_price":300.0,"currency_code":"eurx"}],"transactions":[{"token_value_cents":-600.0,"token_currency":"eurx","ticket_number":"04B0BD7AE02B80","made_at":"2014-07-17T15:59:53.214Z"}]}';
	var bodyTest2 = "hola";
	var testHash = crypto.createHash('md5').update(bodyTest).digest('base64');

	console.log('expected md5 is: ' + testHash);
	var obj = req.body;
	obj.line_items[0]
	var body = JSON.stringify(req.body);
	var reg = /"/gi;
	var body = body.replace(reg,'\\\"');

	var md5 = crypto.createHash('md5').update(body).digest('base64');

	console.log('md5 of body: ' + md5 + ' expected: ' + md5Header);

	var textToSh1 = contentType + ',' + md5Header + ',' + '/hmac' + ',' + date;
	console.log('pre encoded: ' + textToSh1);

	var hash = crypto.createHmac('sha1', key).update(new Buffer(textToSh1)).digest('base64');

	console.log('signature generated: ' + hash);
	console.log('signature expected : ' + expectedSignature)

	res.send(200, {message : "everything is ok"});
});

app.listen(3000);