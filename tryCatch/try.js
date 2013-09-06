


function test (cb) {
	try {
		JSON.parse('asdfasdf');
	} catch (error) {
		console.log(error);
		cb();
		return;
	}

	console.log('dont go here');
}


test(function (){
	console.log('callback called');
});