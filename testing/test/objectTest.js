var should = require('should');

describe('object testing', function (){
	var object = {};
	this.timeout(4000);

	before (function () {
		object.name = 'alex';
		object.size = 3;
		object.array = [1,2,3,4];
	});
	
	it('should have an alex name', function(done){

		object.should.have.property('name','alex');
		setTimeout (function () {
			object.size = 4;
			done();
		}, 2000);
	});

	it('should return a valid token', function(done){
		object.should.have.property('size', 4);
		done();
	});

});