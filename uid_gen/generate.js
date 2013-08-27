var uuid = require('node-uuid');
var colors = require('colors');

var api_token = uuid.v4();

console.log(api_token.toString().green);
//ea11649b-7b1f-4ac9-b0c3-1a2fc967e31e