var assert = require('assert'),
	fs = require('fs'),
	language = require('./index'),
	if_tag = require('./if-tag'), 
	for_tag = require('./for-tag'),
	compile,
	template;

var compile = language({
	'if': if_tag
  , 'for': for_tag
})

var templateStr = fs.readFileSync('./test.htm.tmpl', 'utf8');
var expected = fs.readFileSync('./test.htm', 'utf8');

var template = compile(templateStr);
var actual = template({
	items: [{okay: true}, {okay: false}],
  	message: "hello world"
});

assert.equal(actual, expected);
