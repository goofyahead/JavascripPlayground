var _ = require('underscore');

var object = {};

object['em'] = 'em/fog@ac.com';
object['fb'] = 'fb/alex.vidal';

console.log(_.toArray(object));

var array = ['a', 'b'];

if (_.contains(array, 'a')) console.log('contains a');

for (var x = 0; x < 100; x+=2) {
	setTimeout(function (){
		console.log(x);
	}, 1000);
}