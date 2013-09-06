var uuid = require('node-uuid');
var colors = require('colors');

var object = require('./data.json');

var lazy = require("lazy"),
    fs  = require("fs");

//if data file line to lines
// from 108.62.71.39:80:2ndary:len999 to "http://2ndary:len999@173.0.55.171:80",
new lazy(fs.createReadStream('./data.txt'))
 .lines
 .forEach(function(line){
 	var proxyString = '"http://2ndary:len999@' + line.toString().split(':')[0] + ':' + line.toString().split(':')[1] + '",\n';
    fs.appendFileSync('./result.txt',proxyString);
 }
);


//if jason
// for (var obj in object) {
// 	console.log(object[obj].name + ' : ' + object[obj].code);
// }
//ea11649b-7b1f-4ac9-b0c3-1a2fc967e31e