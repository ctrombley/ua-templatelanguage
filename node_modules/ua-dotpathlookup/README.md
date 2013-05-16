
# ua-dotpathlookup

A simple function to convert a dot notation string to its corresponding value on an object, written as part of a technical evaluation.

```javascript
var dotpath = require('ua-dotpathlookup')
var find = dotpath('part.key.attribute')

var found = find({part: {key: {attribute: "woop woop"} }})
console.log(found) // outputs "woop woop"

var not_found = find({}) || find() || find(null)
console.log(not_found) // outputs undefined
```

## LICENSE 

MIT
