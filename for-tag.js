module.exports = function(parser, contents) { 
	var bits = contents.split(/\s+/),  // ["for", "item", "in", "items" "reversed"]
		contextTarget = bits[1],
		lookupContextVariable = parser.lookup(bits[3]),
		reversed = bits[4] === 'reversed',
		forBody,
		emptyBody;

	parser.parse({
		'endfor': endfor,
		'empty': empty
	})

	return function(context) {
		var target = lookupContextVariable(context),
			output = [],
			merged = [],
			loopContext,
			len = target.length,
			i = loopStart = reversed ? len-1 : 0,
			loopCondition = reversed 
				? function() { return i >= 0 } 
				: function() { return i < len },
			loopDone = reversed 
				? function() { i-- } 
				: function() { i++ };

		if (!target || !len) {
			return emptyBody ? emptyBody(context) : ''
		}

		for ( ; loopCondition(); loopDone() ) {
			loopContext = Object.create(context);
			loopContext[contextTarget] = target[i];
			loopContext.forloop = {
				parent: loopContext.forloop
				, index: i
				, isfirst: i === 0
				, islast: i === len - 1
				, length: len
			};
			output.push(forBody(loopContext));
		}

		// flatten nested arrays
		return merged.concat.apply(merged, output);
	}

	function empty(tpl) {
		forBody = tpl;
		parser.parse({'endfor': endfor});
	}

	function endfor(tpl) {
		if(forBody) {
			emptyBody = tpl;
		} else {
			forBody = tpl;
		}
	}
}
