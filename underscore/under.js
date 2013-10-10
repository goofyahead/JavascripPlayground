var _ = require('underscore');

var object = {};

object['em'] = 'em/fog@ac.com';
object['fb'] = 'fb/alex.vidal';

console.log(_.toArray(object));

var array = ['a', 'b'];

if (_.contains(array, 'a')) console.log('contains a');

for (var x = 0; x < 10; x+=2) {
	setTimeout(function (){
		console.log(x);
	}, 1000);
}

var object1 = {a : 1, b : 2};
var object2 = {t : 2, r : 3};
var object3 = {s : 3, g : 3};

var array =[object2, object1];
var array2 = [object2, object3];

console.log(_.union(array2,array));