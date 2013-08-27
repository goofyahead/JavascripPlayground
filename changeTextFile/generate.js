var uuid = require('node-uuid');
var colors = require('colors');

var object = require('./data.json');

for (var obj in object) {
	console.log(object[obj].name + ' : ' + object[obj].code);
}
//ea11649b-7b1f-4ac9-b0c3-1a2fc967e31e