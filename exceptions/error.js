
function error () {

	try {
		console.log('oh my code');
		throw new Error ('evil error inside');
	} catch (err) {
		console.log(err);
	}

	console.log('i keep working');

	try {
		async('hola', function (param){
			console.log('returned async call');
		});
	} catch (err) {
		console.log(err);
	}
}

function async (param, cb) { //callback with param
	process.nextTick(function (){
		async2('hey', function (param) {
			console.log('not called');
		});
		//throw new Error ('error inside asyn code');
		cb(param);
	});
}

function async2 (param, cb) {
	process.nextTick(function () {
		throw new Error ('error inside async2 code');
		cb(param);
	});
}

error();