var assert = require('assert'),
	createTemplate = require('./index');

assert.ok(true);

var expected = "hello dude how is your tuesday going?";
var tpl = createTemplate("hello {{ world }} how is your {{ weekday }} going?");
var actual = tpl({
	world: 'dude'
	, weekday: 'tuesday'
});

assert.equal(expected, actual);

expected = "hello ya goof how is your year going?";
actual = tpl({
	world: 'ya goof'
	, weekday: 'year'
});

expected = "hello ya goof how is your {{ weekday }} going?";
actual = tpl({
	world: 'ya goof'
});

expected = "hello ya goof how is your year going?";
actual = tpl({
	world: 'ya goof'
	, weekday: 'year'
	, cereal: 'cornflakes'
});

assert.equal(expected, actual);
