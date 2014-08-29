var fs = require('fs');

fs.watch('files', function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }
});

var proc = require('child-process').spawn;

var ping = require('net-ping');
var session = ping.createSession ();

session.pingHost ('192.168.1.99', function (error, target) {
    if (error) {
    	var reboot = proc('reboot');
    	console.log('No internet, changing files and rebooting on HOTSPOT'.green);
    }
    else
        console.log (target + ": Alive");
});

