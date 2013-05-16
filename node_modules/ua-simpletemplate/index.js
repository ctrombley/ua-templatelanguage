module.exports = function createTemplate(tpl) {
	var re = /\{\{\s*(\w+)\s*\}\}/g;

    return function(obj){
        return tpl.replace(re, function(match, name){
            return obj[name];
        })
    }
}
