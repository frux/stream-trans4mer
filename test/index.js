var assert = require('assert');
var stream = require('stream');
var fs = require('fs');
var StreamTrans4m = require('../');

it('should throws on wrong destStream', function(){
	assert.throws(function(){
		new StreamTrans4m('not-a-stream');
	}, Error);
});

it('should throws on wrong transformFunc', function(){
	assert.throws(function(){
		new StreamTrans4m(new stream.Writable(), 'not-a-function');
	}, Error);
});

it('should transform stream', function(done){
	var destStream = new stream.Transform({
		transform: function(chunk, enc, cb){
			cb(null, chunk);
		}
	});

	var transformedStream = new StreamTrans4m(destStream, function(data){
		return 'foo' + data;
	});

	transformedStream.write('bar');

	destStream.on('data', function(chunk){
		assert.equal('foobar', chunk.toString());
		done();
	});
});

it('should add trailing \\n if lineMode is on', function(done){
	var destStream = new stream.Transform({
		transform: function(chunk, enc, cb){
			cb(null, chunk);
		}
	});

	var transformedStream = new StreamTrans4m(destStream, function(data){
		return 'foo' + data;
	}, true);

	transformedStream.write('bar');

	destStream.on('data', function(chunk){
		assert.equal('foobar\n', chunk.toString());
		done();
	});
});

it('should triggers once when piping', function(done){
	var readStream = fs.ReadStream(__dirname + '/bigfile'),
		writeStream = new stream.Writable({ write: function(){} }),
		stampsCounter = 0;

	var transformedStream = new StreamTrans4m(writeStream, function(data){
		stampsCounter++;
		return data;
	});

	readStream.pipe(transformedStream);

	readStream.on('end', function(){
		assert.equal(stampsCounter, 1);
		done();
	});
});