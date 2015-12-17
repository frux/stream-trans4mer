var stream = require('stream');

function StreamTransformer(destStream, transformFunc){
	if(!(typeof destStream === 'object' && destStream.writable)){
		throw Error('Destination stream must implements writable stream');
	}

	if(typeof transformFunc !== 'function'){
		throw Error('Transform function must be a function');
	}

	stream.Transform.call(this);
	this._transformFunc = transformFunc;
	this.pipe(destStream);
}

StreamTransformer.prototype = new stream.Transform();

StreamTransformer.prototype._transform = function(chunk, enc, cb){
	cb(null, this._transformFunc(chunk));
};

module.exports = StreamTransformer;