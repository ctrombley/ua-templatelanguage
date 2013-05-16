module.exports = function dotpath(str) {
	var props = str.split('.');

	function find(obj, props) {
		var next = props.shift();

		if (next === undefined || !obj.hasOwnProperty(next)) {
			return undefined;
		}

		if (typeof obj[next] === 'object' && props.length) {
			return find(obj[next], props);
		}
		else {
			return obj[next];
		}
	}

	return function(obj) {
		return find(obj, props);
	}
}
