var fs = require('fs');

fs.watch('files', function (event, filename) {
  console.log('event is: ' + event);
  if (filename) {
    console.log('filename provided: ' + filename);
  } else {
    console.log('filename not provided');
  }
});

var ping = require('net-ping');
var session = ping.createSession ();

session.pingHost ('192.168.1.99', function (error, target) {
    if (error)
        console.log (target + ": " + error.toString ());
    else
        console.log (target + ": Alive");
});
// Require
// var watchr = require('watchr');

// // Watch a directory or file
// console.log('Watch our paths');
// watchr.watch({
//     path: 'files',
//     listeners: {
//         log: function(logLevel){
//             console.log('a log message occured:', arguments);
//         },
//         error: function(err){
//             console.log('an error occured:', err);
//         },
//         watching: function(err,watcherInstance,isWatching){
//             if (err) {
//                 console.log("watching the path " + watcherInstance.path + " failed with error", err);
//             } else {
//                 console.log("watching the path " + watcherInstance.path + " completed");
//             }
//         },
//         change: function(changeType,filePath,fileCurrentStat,filePreviousStat){
//             console.log('a change event occured:',arguments);
//         }
//     },
//     next: function(err,watchers){
//         if (err) {
//             return console.log("watching everything failed with error", err);
//         } else {
//             console.log('watching everything completed', watchers);
//         }
//     }
// });