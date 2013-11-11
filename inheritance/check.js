var x = 3;

exports.echo = function (name) {
	this.callPrint(name, console.log);
}

exports.callPrint = function (name, cb) {
	console.log(name);
	cb();
}