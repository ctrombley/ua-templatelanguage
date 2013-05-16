module.exports = function createTemplate(tpl) {

	function replaceToken(str, key, val) {
		var re = new RegExp('\\{\\{\\s*' + key + '\\s*\\}\\}', 'g');

		str =  str.replace(re, val);
		return str;
	}

	return function(obj) {
		var str = tpl;

		for (var key in obj) {
			str = replaceToken(str, key, obj[key]);
		}

		return str;
	}
}
