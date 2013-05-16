var dotpathlookup = require('ua-dotpathlookup');
var simpletemplate = require('ua-simpletemplate');

module.exports = function(parseFns) { 

	function Parser(template, parseFns) {
		this.tokens = typeof template === 'object' ? template : tokenize(template);
		this.parseFns = parseFns;
		this.currentTokenIndex = 0;
		this.currentToken = function() {
			return this.tokens[this.currentTokenIndex];
		};
	}

	Parser.prototype.lookup = function (str) { 
		return dotpathlookup(str);
	};

	Parser.prototype.tokenLength = function() { 
		return this.tokens.length 
	} 

	Parser.prototype.hasMoreTokens = function() {
		return this.currentTokenIndex < this.tokenLength();
	}

	Parser.prototype.solve = function (context) {
		while (this.hasMoreTokens()) {
			if (typeof this.currentToken() === 'object') {
				this.solveForTag(this.currentToken(), context);
			}

			this.currentTokenIndex++;
		}

		return simpletemplate(this.tokens.join(''))(context);
	}

	Parser.prototype.parse = function (endTokens) {
		var i = this.currentTokenIndex,
			tagBodyTokens,
			endToken,
			self = this;

		for ( ; !isEndToken(this.tokens[i], endTokens) && i < this.tokens.length; i++) {
			continue;
		}

		if (isEndToken(this.tokens[i], endTokens)) {
			tagBodyTokens = this.tokens.splice(this.currentTokenIndex, i - this.currentTokenIndex + 1);

			endToken = tagBodyTokens.pop().contents;
			tagBodyTokens.shift();

			endTokens[endToken](function(context){ 
				return self.substitute(tagBodyTokens.slice(0), context) 
			});
		}
	}

	Parser.prototype.solveForTag = function(tag, context) {
		var bits = tag.contents.split(/\s+/),
			merged = [],
			newTokens;

		if (this.parseFns.hasOwnProperty(bits[0])) {
			// call into parse fn
			newTokens = this.parseFns[bits[0]](this, tag.contents)(context);
			this.tokens.splice(this.currentTokenIndex, 0, newTokens);

			// flatten nested arrays
			this.tokens = merged.concat.apply(merged, this.tokens);
		}
	}

	Parser.prototype.substitute = function(tagBodyTokens, context) {
		var parser;

		if (context.substitute && typeof context.substitute === 'function') {
			tagBodyTokens = context.substitute(tagBodyTokens);

			if (typeof tagBodyTokens === 'string') {
				return tagBodyTokens;
			}
		}

		//http://www.youtube.com/watch?v=d2yD4yDsiP4
		parser = new Parser(tagBodyTokens, this.parseFns);
		return parser.solve(context);
	}


	function isEndToken (token, endTokens) {
		if (typeof token === 'object') {
			if (token.contents in endTokens) {
				return true;
			}
		}

		return false;
	}


	function tokenize(templateStr) {
		var tokens = [],
			re = /{%\s*([\w\d\s\-\.]*)\s*%}/,
			text,
			tag;

		if (templateStr === undefined) {
			return tokens;
		}

		while (templateStr.length > 0) {
			tag = {} 
			match = templateStr.match(re);

			if (!match) {
				text = templateStr.slice(0, templateStr.length);
				tokens.push(text);
				return tokens;
			}

			text = templateStr.slice(0, match.index);
			tokens.push(text);

			tag.contents = match[1].trim();
			tokens.push(tag);

			templateStr = templateStr.slice(match.index + match[0].length, templateStr.length);
		}
	}

	return function(template) {
		var parser = new Parser(template, parseFns);

		return function(context) {
			return parser.solve(context);
		}
	}
}
