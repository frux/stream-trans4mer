# stream-transformer
NodeJS module allowing to preprocess stream data

## Usage
```js
var StreamTransformer = require('stream-transformer');
var transformedStdout = new StreamTransformer(process.stdout, function(data){
    return 'foo ' + data;
});

transformedStdout.write('bar'); //console: `foo bar`
```
