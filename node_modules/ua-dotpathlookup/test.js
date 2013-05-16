var assert = require('assert')
var dotpath = require('./index.js')

var find = dotpath('part.key.attribute')

var found = find({part: {key: {attribute: "woop woop"} }})
assert.equal(found, "woop woop")

var not_found = find({}) || find() || find(null)
assert.equal(not_found, undefined)
