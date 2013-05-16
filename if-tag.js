module.exports = function(parser, contents) { 
	var bits = contents.split(/\s+/),  // ["if", "expr"]
		contextTarget = bits[1],
		lookupContextVariable = parser.lookup(bits[1]),
		ifBody,
		emptyBody;

	parser.parse({
		'endif': endif,
		'empty': empty
	})

	return function(context) {
		var target = lookupContextVariable(context),
			output = [],
			ifContext;

		if (target === undefined) {
			return emptyBody ? emptyBody(context) : '';
		}

		ifContext = Object.create(context);
		ifContext[contextTarget] = target;

		// this is not my favorite
		ifContext.substitute = function(tokens) {
			return target ? tokens[0] : tokens[2];
		}

		return ifBody(ifContext);
	}

	function empty(tpl) {
		ifBody = tpl;
		parser.parse({'endif': endif});
	}

	function endif(tpl) {
		if(ifBody) {
			emptyBody = tpl;
		} else {
			ifBody = tpl;
		}
	}
}
