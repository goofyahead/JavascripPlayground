
function error () {
	try {
		console.log('oh my code');
		throw (new Error ('evil error inside'));
	} catch (err) {
		console.log(err);
	}
}