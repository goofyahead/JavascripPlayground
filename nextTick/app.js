
var element {};

for (var x = 0 ; x < 500000 ; x++) {
	setImmediate(function (z) {
		console.log(z);
	}, x);
}

console.log('done');