var stream = require('stream');

function StreamTransformer(destStream, transformFunc){
	stream.Transform.call(this);
	this._transformFunc = transformFunc;
	this.pipe(destStream);
}

StreamTransformer.prototype = new stream.Transform();

StreamTransformer.prototype._transform = function(chunk, enc, cb){
	cb(null, this._transformFunc(chunk));
};

StreamTransformer.wrap = function(sourceStream, transformFunction){
	return new StreamTransformer(sourceStream, transformFunction);
};

module.exports = StreamTransformer;