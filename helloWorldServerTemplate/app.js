var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');

  var spawn = require('child_process').spawn,
    ls    = spawn('reboot');

	ls.stdout.on('data', function (data) {
	  console.log('stdout: ' + data);
	});

	ls.stderr.on('data', function (data) {
	  console.log('stderr: ' + data);
	});

	ls.on('close', function (code) {
	  console.log('child process exited with code ' + code);
	});
	});

app.listen(3000);