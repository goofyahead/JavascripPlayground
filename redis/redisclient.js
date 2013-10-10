var redis = require("redis"),

// TWEMPROXY CODE
// client = redis.createClient(22122, '127.0.0.1', {
// 	no_ready_check : true
// });

client = redis.createClient();

client = redis.createClient(6379, '127.0.0.1', {
	no_ready_check : true
});

    // if you'd like to select database 3, instead of 0 (default), call
    // client.select(3, function() { /* ... */ });

client.on("error", function (err) {
    console.log("Error " + err);
});

client.zadd('zset', new Date().getTime(), 'epa', redis.print);

client.zrange('zset', '-inf', '+inf', redis.print);

client.zremrangebyscore('zset', '-inf', 3, function (err, data) {
	console.log('deleted ' + data + ' from zset');
});

client.sadd('heroes:a', 'batman', function (err, data) {
	console.log(data);
});
client.sadd('heroes:a', 'robin', redis.print);

client.smembers('heroes:a', function(err, reply){
	console.log(reply);
});

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
});


client.get('token:count:1234', function (err, reply){
	if (reply) {
		client.decr('token:count:1234', function(err,reply){
			console.log('decrementing');
			console.log(reply);
		});
	}
});


