var Person = require('./person');
var Human = require('./human');

var p1 = new Person('Alex','28', 'male');
var p2 = new Person('Zoid', '12', 'female');

p1.talk(' ey');
p2.talk(' woof!');

p1.getShared();
p1.setShared('changed');
p1.getShared();

console.log(p1.sex);

p1.noise();
p2.noise();

console.log(p1 instanceof Person);
console.log(p1 instanceof Human);

var check = require('./check');

check.echo('Alex');
