var PRIVATE_CONSTANT = 3;

exports.constant = 12;

exports.other = function (a, b ,c ,d) {
	this.another(a);
	 if (a == 3) {
		c();
	 } else {
	 	if (d) d();
	 	else console.log('function not given');
	 }
}

exports.another = function (a) {
	console.log(a + ' from another');
}