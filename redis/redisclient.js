var redis = require("redis"),
<<<<<<< HEAD

// TWEMPROXY CODE
// client = redis.createClient(22122, '127.0.0.1', {
// 	no_ready_check : true
// });

client = redis.createClient();
=======
     
client = redis.createClient(6379, '127.0.0.1', {
	no_ready_check : true
});
>>>>>>> 311502d7a010fb06f16688fb9763ff60f15ff28b

    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.sadd('heroes:a', 'batman', function (err, data) {
	console.log(data);
});
client.sadd('heroes:b', 'robin', redis.print);

client.sunion('myTestHeroes', 'myOtherHeroes', redis.print);

client.set('token:1234', "elefante verde", redis.print);

client.expire('token:1234', 100, redis.print);

client.get('token:1234', function (err, reply) {
	console.log('get');
    console.log(reply); // Will print `OK`
});

var object = {};
object.proxy = 'http://xxx';
object.token = '123123132132';
client.sadd('tokens', JSON.stringify(object), function (err, reply){
	console.log(reply);
});

client.smembers('tokens', function(err, reply){
	console.log(reply);
	var result = JSON.parse(reply);
	console.log(result.token);
});

/*client.set('token:count:1235', 1, function (err, reply){
	console.log(reply);
});*/

var object = {};
object.proxy = 'http://xxx';
object.token = '123123132132';

client.hset('htokens', 'token1',JSON.stringify(object), function (err, reply){
	console.log(reply);
});

client.hset('htokens', 'token2',JSON.stringify(object), function (err, reply){
	console.log(reply);
});

client.hset('htokens', 'token3',JSON.stringify(object), function (err, reply){
	console.log(reply);
});


client.hvals('htokens', function(err, reply){
	console.log(reply);
	var result = JSON.parse(reply);
	console.log(result.token);
});


client.get('token:count:1234', function (err, reply){
	if (reply) {
		client.decr('token:count:1234', function(err,reply){
			console.log('decrementing');
			console.log(reply);
		});
	}
});


