var stream = require('stream');

function StreamTransformer(destStream, transformFunc, lineMode){
	if(!(typeof destStream === 'object' && destStream.writable)){
		throw Error('Destination stream must implements writable stream');
	}

	if(typeof transformFunc !== 'function'){
		throw Error('Transform function must be a function');
	}

	this._lineMode = !!lineMode;

	stream.Transform.call(this, {objectMode: true});
	this._transformFunc = transformFunc;
	this.pipe(destStream);
}

StreamTransformer.prototype = new stream.Transform({objectMode: true});

StreamTransformer.prototype._transform = function(chunk, enc, cb){
	this.push(this._transformFunc(chunk));
	cb();
};

module.exports = StreamTransformer;