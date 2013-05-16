# ua-simpletemplate

A simple template parser written for a technical evaluation.

```javascript
var simpletemplate = require('ua-simpletemplate')
var tpl = simpletemplate("hello {{ world }} how is your {{ weekday }} going?")
tpl({
  world: 'dude'
, weekday: 'tuesday'
})  // == "hello dude how is your tuesday going?"
```

## LICENSE 

MIT
