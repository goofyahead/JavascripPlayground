var other = require('./other');

console.log(other.constant);
other.constant = 2;
console.log(other.constant);

other.other(3, 2,
	function c () { 
		console.log('function c');},
	function d () {
		console.log('function d');
});