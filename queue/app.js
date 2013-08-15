var async = require('async');
var arrayTask = [{type: 'email', id: 'goof'},{type: 'email', id: 'roof'},{type: 'email', id: 'puf'}];

var q = async.queue(function (task, callback) {
	if (task.name == 'foo') q.push({name: 'amazing'});
    console.log('hello ' + task.id);
    callback();
}, 2);

q.drain = function() {
    console.log('all items have been processed');
}

q.push(arrayTask);
// assign a callback

q.unshift({name: 'bar'}, function (err) {
    console.log('finished processing bar');
});