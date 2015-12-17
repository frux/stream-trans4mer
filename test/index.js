var assert = require('assert');
var stream = require('stream');
var StreamTransformer = require('../');

it('should throws on wrong destStream', function(){
	assert.throws(function(){
		new StreamTransformer('not-a-stream');
	}, Error);
});

it('should throws on wrong transformFunc', function(){
	assert.throws(function(){
		new StreamTransformer(new stream.Writable(), 'not-a-function');
	}, Error);
});

it('should transform stream', function(done){
	var destStream = new stream.Transform({
		transform: function(chunk, enc, cb){
			cb(null, chunk);
		}
	});

	var transformedStream = new StreamTransformer(destStream, function(data){
		return 'foo' + data;
	});

	transformedStream.write('bar');

	destStream.on('data', function(chunk){
		assert.equal('foobar', chunk.toString());
		done();
	});
});