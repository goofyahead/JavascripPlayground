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

client.zremrangebyscore('zset', '-inf', 3, function (err, data) {
	console.log('deleted ' + data + ' from zset');
});

client.sadd('array', [1,2,3,4,5], redis.print);

store and clean likes
var likes = [1,2,3,4,5,6,7,8,9];
var responded = false;

likes.forEach( function (elem) {
	
		client.zadd('brand:ids:zara', 0, elem, function (err, data) {
			client.zcard('brand:ids:zara', function (err, data){
			if (data >= 5 && !responded) {
				client.zrange('brand:ids:zara', 0, -1, function (err, data){
					if (!responded) console.log(data);
					responded = true;

				});
			}
			});
		});

});

likes = [];

var likes = [1,1,1,4,5,6,7,8,9];
var response = false;

client.sadd('temp:comparator', likes, function (err, data) {
	client.sdiff('temp:comparator', 'set:zara', function (err, data) {
		console.log(data);
		if (data.length > 0) {
			client.sadd('set:zara', data, redis.print);
			client.del('temp:comparator', redis.print);
			data.forEach(function (elem) {
				client.rpush('brand:ids:list:zara', elem, function (err, data) {
					if (data >= 5 && ! response) {
						response = true;
						client.lrange('brand:ids:list:zara', 0, 4, function (err, data) {
							console.log(data);
						});
					}
				});
			});
		}
	});
});
likes = [];

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

client.set('token:count:1235', 1, function (err, reply){
	console.log(reply);
});

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