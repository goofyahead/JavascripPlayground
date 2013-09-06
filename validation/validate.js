var check = require('validator').check;
var sanitize = require('validator').sanitize;

console.log(sanitize('**\n\nSi no ves correctamente es').trim());