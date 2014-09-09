
// var array = [2,3,4,5,6];

// array.forEach( function (elem) {
// 	console.log(elem);
// });

// console.log('finished');

var os = require( 'os' );

var networkInterfaces = os.networkInterfaces( );

// console.log( networkInterfaces );

for (property in networkInterfaces) {
	// console.log(networkInterfaces[property]);
	// console.log(networkInterfaces[property].length);
	for (var x = 0; x < networkInterfaces[property].length; x++){
		if (networkInterfaces[property][x].internal == false && networkInterfaces[property][x].family == 'IPv4'){
			console.log(networkInterfaces[property][x].address);
		}
	}
}