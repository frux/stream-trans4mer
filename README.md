# stream-trans4mer
NodeJS module allowing to preprocess stream data

## Usage
```js
var StreamTransformer = require('stream-trans4mer');
var transformedStdout = new StreamTransformer(process.stdout, function(data){
    return 'foo ' + data;
});

transformedStdout.write('bar'); //console: `foo bar`
```
