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
	if(this._lineMode){
		this._lineData = '';

		for(var i = 0; i < chunk.length; i++){
			if(chunk[i] !== '\n'){
				this._lineData += chunk[i];
			}else{
				this.push(this._transformFunc(this._lineData + '\n'));
				this._lineData = '';
			}
		}

		if(this._lineData){
			this.push(this._transformFunc(this._lineData + '\n'));
			this._lineData = '';
		}

		cb();
	}else{
		cb(null, this._transformFunc(chunk));
	}
};

module.exports = StreamTransformer;