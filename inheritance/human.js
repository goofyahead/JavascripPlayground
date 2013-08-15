
function Human (sex) {
	this.species = 'human';
	this.sex = sex;
	console.log('human created, mankind has now ' + Human.prototype.mankind++);
}

Human.prototype.noise = function () {
	console.log('I do exist!');
}

Human.prototype.mankind = 1;

module.exports = Human;
