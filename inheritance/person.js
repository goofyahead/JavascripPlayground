var Human = require('./human');

function Person (name, age, sex) {
	Human.call(this, sex);
	this.name = name;
	this.age = age;
}

Person.prototype = Human.prototype;  //or Object.create(Human.prototype)
Person.prototype.constructor = Person;

Person.prototype.classShared = 1;

Person.prototype.getShared = function () {
	console.log('shared now is ' + this.classShared);
}

Person.prototype.setShared = function (something) {
	Person.prototype.classShared ++;
}

Person.prototype.talk = function (something) {
	console.log(this.name + ' says ' + something);
}

module.exports = Person;