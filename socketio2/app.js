var fs = require('fs');
var colors = require('colors');
var redis = require("redis");
     
client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

var express = require('express');
var app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);


app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use('/images', express.static(__dirname + '/public/images'));
  app.use('/videos', express.static(__dirname + '/public/videos'));
});

server.listen(80);

io.set('log level', 1);

io.sockets.on('connection', function (socket) {

  socket.emit('hello', { message: 'welcome to rugby 2' });

  socket.on('join', function (field, user, players) {
    console.log('connected: ' + user + ' to a match on: ' + 
    	field + ' with players: ' + players.players);
    console.log(socket.id);
    client.sadd('field:' + field, socket.id);
    client.smembers('field:' + field, function (err, data) {
    	console.log('on this field ' + data);
    });
  });

  socket.on('play', function (data){

  });

  socket.on('disconnect', function () {
  	console.log('someone got disconnected ' + socket.id);
  });
});
